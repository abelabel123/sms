const express = require("express");
const { adminRegisterTeacher, loginTeacher, getAllTeachersAdmin, getTeacherByAdmin, getTeacherprofile, TeacherUpdateProfile,adminUpdateTeacher } = require("../../controller/Staff/teachersctrl");
const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");
const isTeacher = require('../../middleware/isTeacher');
const isTeacherLogin = require('../../middleware/isTeacherLogin');
const advanceResults = require("../../middleware/advancedResult");
const Teacher = require("../../model/Staff/Teacher");

const teachersRouter = express.Router();

teachersRouter.post("/admin/register", isLogin, isAdmin, adminRegisterTeacher);
teachersRouter.post("/login", loginTeacher);

teachersRouter.get("/admin",isLogin,isAdmin, advanceResults(Teacher, {
    path: "examsCreated",
    populate:{
        path:"questions",
    }, 
}), getAllTeachersAdmin);

teachersRouter.get("/profile", isTeacherLogin,isTeacher,getTeacherprofile);
teachersRouter.get("/:teacherID/admin",isLogin,isAdmin,getTeacherByAdmin);
teachersRouter.put("/:teacherID/update", isTeacherLogin,isTeacher,TeacherUpdateProfile);
teachersRouter.put("/:teacherID/update/admin", isLogin,isAdmin,adminUpdateTeacher);
module.exports=teachersRouter;

