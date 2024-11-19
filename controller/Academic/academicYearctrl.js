const AsyncHandler = require("express-async-handler");
const AcademicYear = require("../../model/Academic/AcademicYear");
const Admin = require("../../model/Staff/Admin");
exports.createAcademicYear = AsyncHandler(async (req, res) => {
    const {name,fromYear, toYear,  } = req.body;
    const academicYear = await AcademicYear.findOne({ name });
    if (academicYear) {
        throw new Error("Academic year already exists");
    }

    const academicYearCreated = await AcademicYear.create({
        name,
        fromYear,
        toYear,
        createdBy: req.userAuth._id
    });
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicYears.push(academicYearCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic year created successfully",
        data: academicYearCreated,

    });
});


exports.getAcademicYears = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.find( );
   
    res.status(201).json({
        status: "success",
        message: "Academic years fetched successfully",
        data: academicYears,

    });
});


exports.getAcademicYear = AsyncHandler(async (req, res) => {
    const academicYears = await AcademicYear.findById(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "Academic years fetched successfully",
        data: academicYears,

    });
}); 



exports.UpdateAcademicYear = AsyncHandler(async (req, res) => {
    const {name,fromYear, toYear,  } = req.body;
    const createAcademicYearFound = await AcademicYear.findOne({name})
    if(createAcademicYearFound)
        throw new Error("Academic year already exists");
    const academicYears = await AcademicYear.findByIdAndUpdate(
    req.params.id,
   {
    name,
    fromYear,
    toYear,
    createdBy: req.userAuth._id,
   },
   {

    new: true,
   }
);
    res.status(201).json({
        status: "success",
        message: "Academic years updated successfully",
        data: academicYears,

    });
}); 

exports.DeleteAcademicYear = AsyncHandler(async (req, res) => {
     await AcademicYear.findByIdAndDelete(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "Academic year deleted successfully",
 
    });
}); 