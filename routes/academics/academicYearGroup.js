const express = require('express');

const {
    createYearGroup,
    getYearGroups,
    getYearGroup,
    updateYearGroup,
    deleteYearGroup,

} = require("../../controller/Academic/YearGroupctrl");

const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");



const academicYearGroupRouter = express.Router();

// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/",  isLogin, isAdmin, getAcademicYears); 

academicYearGroupRouter
.route("/")
.post( isLogin, isAdmin, createYearGroup)
.get(isLogin, isAdmin, getYearGroups)

academicYearGroupRouter
.route("/:id")
.get(isLogin, isAdmin,  getYearGroup)
.put(isLogin, isAdmin,  updateYearGroup)
.delete(isLogin, isAdmin,  deleteYearGroup)
// academicYearRouter.get("/:id", isLogin, isAdmin,  getAcademicYear); 
// academicYearRouter.put("/:id", isLogin, isAdmin,  UpdateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin,  DeleteAcademicYear);

module.exports = academicYearGroupRouter