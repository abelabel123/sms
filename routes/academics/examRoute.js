const express = require("express");
const { createExam,
        getallexams,
        getexam,
        UpdateExam,
        DeleteExam,
 } = require("../../controller/Academic/examsCtrl");
const isTeacher =  require("../../middleware/isTeacher");
const isTeacherLogin =  require("../../middleware/isTeacherLogin");

const examRouter = express.Router();



examRouter
.route('/')
.post(isTeacherLogin, isTeacher, createExam)
.get(isTeacherLogin, isTeacher,getallexams)


examRouter
.route("/:id")
.get(isTeacherLogin, isTeacher,getexam)
.put(isTeacherLogin, isTeacher,UpdateExam)
.delete(isTeacherLogin,isTeacher,DeleteExam)
module.exports = examRouter;