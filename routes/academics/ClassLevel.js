const express = require('express');

const {
    createClassLevel,
    getClassLevels,
    getClassLevel,
    updateclassLevel,
    deleteClassLevel,

} = require("../../controller/Academic/classLevelctrl");

const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");



const ClassLevelRouter = express.Router();

// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/",  isLogin, isAdmin, getAcademicYears); 

ClassLevelRouter
.route("/")
.post( isLogin, isAdmin, createClassLevel)
.get(isLogin, isAdmin, getClassLevels)

ClassLevelRouter
.route("/:id")
.get(isLogin, isAdmin,  getClassLevel)
.put(isLogin, isAdmin,  updateclassLevel)
.delete(isLogin, isAdmin,  deleteClassLevel)
// academicYearRouter.get("/:id", isLogin, isAdmin,  getAcademicYear); 
// academicYearRouter.put("/:id", isLogin, isAdmin,  UpdateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin,  DeleteAcademicYear);

module.exports = ClassLevelRouter