const express = require('express');

const {
    createSubject,
    getSubjects,
    getSubject,
    UpdateSubject,
    DeleteSubject,

} = require("../../controller/Academic/Subjectctrl");

const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");



const SubjectRouter = express.Router();

SubjectRouter.post("/:programID", isLogin, isAdmin, createSubject);

SubjectRouter.get("/", isLogin, isAdmin, getSubjects);

SubjectRouter.get("/:id", isLogin, isAdmin, getSubject);
SubjectRouter.put("/:id", isLogin, isAdmin, UpdateSubject);
SubjectRouter.delete("/:id", isLogin, isAdmin, DeleteSubject);

module.exports = SubjectRouter