const express = require("express");

const { adminRegisterStudent,loginStudent,getStudentByprofile,getAllStudentsAdmin,getStudentByAdmin,StudentUpdateProfile, adminUpdateStudent, writeExam } = require("../../controller/students/studentsctrl");
const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");
const isStudentLogin = require("../../middleware/isStudentLogin ");
const isStudent = require("../../middleware/isStudent");
const isAuthenticated = require("../../middleware/isAuthenticated");
const Student = require("../../model/Academic/Student");
const roleRestriction = require("../../middleware/roleRestriction");

const StudentRouter = express.Router();

StudentRouter.post("/admin/register", isAuthenticated('admin'), roleRestriction("Admin"), adminRegisterStudent).post("/login", loginStudent)



StudentRouter.get("/profile",isAuthenticated(Student),roleRestriction("student"),getStudentByprofile);
StudentRouter.get("/admin",isAuthenticated(Student),roleRestriction("student"), getAllStudentsAdmin);
StudentRouter.get("/:studentID/admin",isAuthenticated('admin'), roleRestriction('Admin') ,getStudentByAdmin);
StudentRouter.post("/exam/:examID/write",isAuthenticated(Student),roleRestriction("student"),writeExam);
StudentRouter.put("/update",isAuthenticated(Student),roleRestriction("student"),StudentUpdateProfile);
StudentRouter.put("/:studentID/update/admin",isAuthenticated('admin'), roleRestriction("admin"),adminUpdateStudent);

module.exports=StudentRouter;

