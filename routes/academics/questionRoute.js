const express = require("express");
const isTeacher =  require("../../middleware/isTeacher");
const isTeacherLogin =  require("../../middleware/isTeacherLogin");

const questionsRouter = express.Router();

const {
    createQuestion,
    getQuestions,
    getQuestion,
    updateQuestion,
    Deletequestion

} = require("../../controller/Academic/questionsctrl");

questionsRouter
.route('/:examID')
.post(isTeacherLogin, isTeacher, createQuestion)
.get(isTeacherLogin, isTeacher, getQuestions)

questionsRouter
.route("/:id")
.get(isTeacherLogin, isTeacher,getQuestion )
.put(isTeacherLogin, isTeacher,updateQuestion )
.delete(isTeacherLogin, isTeacher,Deletequestion )
module.exports = questionsRouter