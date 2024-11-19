const express = require('express');

const {
    createAcademicTerm,
    
    getAcademicTerms,
    getAcademicTerm,
    UpdateAcademicTerms,
    DeleteAcademicTerms,

} = require("../../controller/Academic/academicTermctrl");

const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");



const academicTermRouter = express.Router();

// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/",  isLogin, isAdmin, getAcademicYears); 

academicTermRouter
.route("/")
.post( isLogin, isAdmin, createAcademicTerm)
.get(isLogin, isAdmin, getAcademicTerms)

academicTermRouter
.route("/:id")
.get(isLogin, isAdmin,  getAcademicTerm)
.put(isLogin, isAdmin,  UpdateAcademicTerms)
.delete(isLogin, isAdmin,  DeleteAcademicTerms)
// academicYearRouter.get("/:id", isLogin, isAdmin,  getAcademicYear); 
// academicYearRouter.put("/:id", isLogin, isAdmin,  UpdateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin,  DeleteAcademicYear);

module.exports = academicTermRouter