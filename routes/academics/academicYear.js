const express = require('express');

const {
    createAcademicYear,
    getAcademicYears,
    getAcademicYear,
    UpdateAcademicYear,
    DeleteAcademicYear,

} = require("../../controller/Academic/academicYearctrl");

const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");



const academicYearRouter = express.Router();

// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/",  isLogin, isAdmin, getAcademicYears); 

academicYearRouter
.route("/")
.post( isLogin, isAdmin, createAcademicYear)
.get(isLogin, isAdmin, getAcademicYears)

academicYearRouter
.route("/:id")
.get(isLogin, isAdmin,  getAcademicYear)
.put(isLogin, isAdmin,  UpdateAcademicYear)
.delete(isLogin, isAdmin,  DeleteAcademicYear)
// academicYearRouter.get("/:id", isLogin, isAdmin,  getAcademicYear); 
// academicYearRouter.put("/:id", isLogin, isAdmin,  UpdateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin,  DeleteAcademicYear);

module.exports = academicYearRouter