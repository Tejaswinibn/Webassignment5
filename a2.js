/********************************************************************************* 
 * WEB700 – Assignment 02** I declare that this assignment is my own work in accordance with 
 * Seneca's* Academic Integrity Policy:
 * ** https://www.senecacollege.ca/about/policies/academic-integrity-policy.html** 
 * Name: Tejaswini Bengaluru Narsimha Murthy Student ID: 155228224 Date: 13th Oct 2023
 * *********************************************************************************/

const collegeData = require("./modules/collegeData");

collegeData
.initialize()
  .then(() => {
    console.log("Initialization successful");
    
  })
  .catch((error) => {
    console.error("Initialization failed:", error);
  });


  collegeData
  .getAllStudents()
  .then((students) => {
    console.log(`Successfully retrieved ${students.length} students`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

collegeData
  .getTAs()
  .then((tas) => {
    console.log(`Successfully retrieved ${tas.length} TAs`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

collegeData
  .getCourses()
  .then((courses) => {
    console.log(`Successfully retrieved ${courses.length} courses`);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
