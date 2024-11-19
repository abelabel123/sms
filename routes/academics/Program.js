const express = require('express');

const {
    createProgram,
    getPrograms,
    getprogram,
    UpdateProgram,
    DeleteProgram,

} = require("../../controller/Academic/programctrl");

const isAdmin = require("../../middleware/isAdmin");
const isLogin = require("../../middleware/isLogin");



const ProgramRouter = express.Router();

// academicYearRouter.post("/", isLogin, isAdmin, createAcademicYear);
// academicYearRouter.get("/",  isLogin, isAdmin, getAcademicYears); 

ProgramRouter
.route("/")
.post( isLogin, isAdmin, createProgram)
.get(isLogin, isAdmin, getPrograms)

ProgramRouter
.route("/:id")
.get(isLogin, isAdmin,  getprogram)
.put(isLogin, isAdmin,  UpdateProgram)
.delete(isLogin, isAdmin,  DeleteProgram)
// academicYearRouter.get("/:id", isLogin, isAdmin,  getAcademicYear); 
// academicYearRouter.put("/:id", isLogin, isAdmin,  UpdateAcademicYear);
// academicYearRouter.delete("/:id", isLogin, isAdmin,  DeleteAcademicYear);

module.exports = ProgramRouter