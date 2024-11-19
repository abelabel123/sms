const AsyncHandler = require("express-async-handler");
const AcademicTerm = require("../../model/Academic/AcademicTerm");
const Admin = require("../../model/Staff/Admin");
exports.createAcademicTerm= AsyncHandler(async (req, res) => {
    const {name, description, duration  } = req.body;
    const academicTerm = await AcademicTerm.findOne({ name });
    if (academicTerm) {
        throw new Error("Academic Term already exists");
    }

    const academicTermCreated = await AcademicTerm.create({
        name,
        description,
        duration,
        createdBy: req.userAuth._id,
    });
    const admin = await Admin.findById(req.userAuth._id);
    admin.academicTerms.push(academicTermCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Academic Term created successfully",
        data: academicTermCreated,

    });
});


exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find( );
   
    res.status(201).json({
        status: "success",
        message: "Academic Terms fetched successfully",
        data: academicTerms,

    });
});

exports.getAcademicTerms = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.find( );
   
    res.status(201).json({
        status: "success",
        message: "Academic terms fetched successfully",
        data: academicTerms,

    });
});


exports.getAcademicTerm = AsyncHandler(async (req, res) => {
    const academicTerms = await AcademicTerm.findById(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "Academic terms fetched successfully",
        data: academicTerms,

    });
}); 





exports.UpdateAcademicTerms = AsyncHandler(async (req, res) => {
    const {name,description,duration } = req.body;
    const createAcademicTermFound = await AcademicTerm.findOne({name})
    if(createAcademicTermFound)
        throw new Error("Academic terms = already exists");
    const academicTerms = await AcademicTerm.findByIdAndUpdate(
    req.params.id,
   {
    name,
    description,
    duration,
    createdBy: req.userAuth._id,
   },
   {

    new: true,
   }
);
    res.status(201).json({
        status: "success",
        message: "Academic years updated successfully",
        data: academicTerms,

    });
}); 

exports.DeleteAcademicTerms = AsyncHandler(async (req, res) => {
     await AcademicTerm.findByIdAndDelete(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "Academic term deleted successfully",
 
    });
}); 