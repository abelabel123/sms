const express = require("express");

const { checkExamResults, getAllExamResults ,adminToggleExamResult} = require("../../controller/Academic/examResultsctrl")

const isStudentLogin = require("../../middleware/isStudentLogin ");
const isStudent = require("../../middleware/isStudent");
const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");



const examResultsRouter = express.Router();
examResultsRouter.get("/",isStudentLogin,isStudent, getAllExamResults);
examResultsRouter.get("/:id/checking",isStudentLogin,isStudent, checkExamResults);
examResultsRouter.put("/:id/admin-toggle-publish",isLogin,isAdmin, adminToggleExamResult);
module.exports = examResultsRouter