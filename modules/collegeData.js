//const courses = require("../data/courses.json");
//const students = require("../data/students.json");
//const dataCollection = require('../data/students.json');
//class Data {
   // constructor(students, courses) {
      //this.students = students;
      //this.courses = courses;
    //}
  //}
  const Sequelize = require('sequelize');


// set up sequelize to point to our postgres database
var sequelize = new Sequelize('SenecaDB','Tejaswinibn','rWe9CBmTUDE6', {
    host: 'ep-royal-rice-59801736-pooler.us-east-2.aws.neon.tech',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
  });

sequelize
    .authenticate()
    .then(function() {
        console.log('Connection has been established successfully.');
    })
    .catch(function(err) {
        console.log('Unable to connect to the database:', err);
    });

    // Define the Student model
const Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true 
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    addressStreet: {
        type: Sequelize.STRING
    },
    addressCity: {
        type: Sequelize.STRING
    },
    addressProvince: {
        type: Sequelize.STRING
    },
    TA: {
        type: Sequelize.BOOLEAN 
    },
    status: {
        type: Sequelize.STRING
    }
}, {
    // Additional model options
    tableName: 'students', 
    createdAt: false, 
    updatedAt: false 
});

// Define the Course model
const Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: {
        type: Sequelize.STRING
    },
    courseDescription: {
        type: Sequelize.STRING
    }
}, {
    tableName: 'courses',
    timestamps: false 
});

// Define the relationship between Course and Student
Course.hasMany(Student, {
    foreignKey: 'course', 
    onDelete: 'SET NULL'  
});

//Define Display messages 
const noResultReturnMessage = "No results returned";

// Initialize to sync database models
function initialize() {
    return new Promise((resolve, reject) => {
        sequelize.sync().then(() => {
            resolve(); 
        }).catch(err => {
            console.error("Failed to sync with database:", err);
            reject("Failed to sync with database");
        });
    });
}

// Function to return all students from student table
function getAllStudents() {
    return new Promise((resolve, reject) => {
        Student.findAll().then(data => {
            if (data) {
                resolve(data); 
            } else {
                reject("No results returned"); 
            }
        }).catch(err => {
            console.error("Failed to sync and get students:", err);
            reject("Failed to sync with database");
        });
    });
}


// Function to return students for a given course id
function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: { course: parseInt(course) } 
        }).then(data => {
            if (data && data.length > 0) {
                resolve(data); 
            } else {
                reject("No results returned"); 
            }
        }).catch(err => {
            console.error("Failed to sync and get students for the course:", err);
            reject("Failed to sync with database");
        });
    });
}

// Function to return student for the givens tudent Number
function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        Student.findAll({
            where: { studentNum: parseInt(num) } 
        }).then(data => {
            if (data && data.length > 0) {
                resolve(data[0]); 
            } else {
                reject("No results returned"); 
            }
        }).catch(err => {
            console.error("Failed to sync and get student for the student Number:", err);
            reject("Failed to sync with database");
        });
    });
}

// Function to return all courses
function getCourses() {
    return new Promise((resolve, reject) => {
        Course.findAll().then(data => {
            if (data && data.length > 0) {
                resolve(data); 
            } else {
                reject("No results returned"); 
            }
        }).catch(err => {
            console.error("Failed to sync and get courses:", err);
            reject("Failed to sync with database");
        });
    });
}

// Function to return  a course for given id
function getCourseById(id) {
    return new Promise((resolve, reject) => {
        Course.findAll({
            where: { courseId: parseInt(id)} 
        }).then(data => {
            if (data && data.length > 0) {
                resolve(data[0]); 
            } else {
                reject("No results returned"); 
            }
        }).catch(err => {
            console.error("Failed to sync and get course for a given id:", err);
            reject("Failed to sync with database");
        });
    });
}


// Function to add new student
function addStudent(studentData) {
    return new Promise((resolve, reject) => {

        if(studentData){
        if (studentData.TA === undefined) {
            studentData.TA = false;
          } else {
            studentData.TA = true;
          }
          
        studentData.course= parseInt(studentData.course);
        for (let property in studentData) {
            if (studentData.hasOwnProperty(property) && studentData[property] === "") {
                studentData[property] = null;
            }
        }

        Student.create(studentData).then(() => {
            resolve(); 
        }).catch(err => {
            console.error("Failed to sync and create new student:", err);
            reject("Unable to create student");
        });
    }else{
        reject("please provide valid input");
    }
    });
}

// Function to modify existing student details
function updateStudent(studentData) {
    return new Promise((resolve, reject) => {
        studentData.TA = studentData.TA === 'on' ? true : false;
        studentData.course= parseInt(studentData.course);

        // check for empty string values and replace with null value
        for (let property in studentData) {
            if (studentData.hasOwnProperty(property) && studentData[property] === "") {
                studentData[property] = null;
            }
        }
        const studentNum = studentData.studentNum;
        delete studentData.studentNum;

        Student.update(studentData, { where: { studentNum: parseInt(studentNum) } }).then(() => {
            resolve(); 
        }).catch(err => {
            console.error("Failed to sync and update student:", err);
            reject("Unable to update student");
        });
    });
}

// Function to add a new course
function addCourse(courseData) {
    return new Promise((resolve, reject) => {
        for (let property in courseData) {
            if (courseData.hasOwnProperty(property) && courseData[property] === "") {
                courseData[property] = null;
            }
        }
        Course.create(courseData).then(() => {
            resolve(); 
        }).catch(err => {
            console.error("Failed to sync and create new course:", err);
            reject("Unable to create course");
        });
    });
}

// Function to modify existing course based on the given input
function updateCourse(courseData) {
    return new Promise((resolve, reject) => {
        for (let property in courseData) {
            if (courseData.hasOwnProperty(property) && courseData[property] === "") {
                courseData[property] = null;
            }
        }

        // excludes the course Id from update operation as id does not change for course
        const courseId = courseData.courseId;
        delete courseData.courseId;
        Course.update(courseData, { where: { courseId: courseId } }).then(() => {
            resolve(); 
        }).catch(err => {
            console.error("Failed to sync and update course:", err);
            reject("Unable to update course");
        });
    });
}

// Function to delete course  based on the given course id
function deleteCourseById(id) {
    return new Promise((resolve, reject) => {
        Course.destroy({
            where: { courseId: parseInt(id) } 
        }).then(deleted => {
            if (deleted) {
                resolve(); 
            } else {
                reject("Course not found or already deleted"); 
            }
        }).catch(err => {
            console.error("Failed to sync and delete course:", err);
            reject("Unable to delete course"); 
        });
    });
}

// Function to delete a student based on the given student number
function deleteStudentByNum(studentNum) {
    return new Promise((resolve, reject) => {
        Student.destroy({
            where: { studentNum: parseInt(studentNum) } 
        }).then(deleted => {
            if (deleted) {
                resolve(); 
            } else {
                reject("Student not found or already deleted"); 
            }
        }).catch(err => {
            console.error("Failed to sync and delete student:", err);
            reject("Unable to delete student");
        });
    });
}

// Exporting all functions so they can be imported and used elsewhere.
module.exports = {
    Student,
    Course,
    initialize,
    getAllStudents,
    getStudentsByCourse,
    getStudentByNum,
    getCourses,
    addStudent,
    getCourseById,
    updateStudent,
    addCourse,
    updateCourse,
    deleteCourseById,
    deleteStudentByNum
};