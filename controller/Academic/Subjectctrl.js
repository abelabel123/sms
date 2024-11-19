const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academic/Subject");
exports.createSubject= AsyncHandler(async (req, res) => {
    const {name, description, academicTerm} = req.body;
    const programFound = await Program.findById(req.params.programID);
    if (!programFound) {
        throw new Error("program not found");
    }

    const subjectFound = await Subject.findOne({ name });
    if (subjectFound) {
        throw new Error ("Subject already exists");
    }
    const subjectcreated = await Subject.create({
        name,
        description,
        academicTerm,
        createdBy: req.userAuth._id,
    });

    // programFound.subjects.push(subjectcreated._id);

    await programFound.save();
  
    res.status(201).json({
        status: "success",
        message: "Subject created successfully",
        data: subjectcreated,

    });
});


exports.getSubjects = AsyncHandler(async (req, res) => {
    const classes = await Subject.find( );
   
    res.status(201).json({
        status: "success",
        message: "subjects fetched successfully",
        data: classes,

    });
});




exports.getSubject = AsyncHandler(async (req, res) => {
    const subject = await Subject.findById(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "subject fetched successfully",
        data: subject,

    });
}); 





exports.UpdateSubject = AsyncHandler(async (req, res) => {
    const {name,description, academicTerm } = req.body;
    const subjectFound = await Subject.findOne({name})
    if(subjectFound){
        throw new Error("Subject already exists");
    }
    const subject = await Subject.findByIdAndUpdate(
    req.params.id,
   {
    name,
    description,
    academicTerm,
    createdBy: req.userAuth._id,
   },
   {

    new: true,
   }
);
    res.status(201).json({
        status: "success",
        message: "Subject updated successfully",
        data: subject,

    });
}); 

exports.DeleteSubject = AsyncHandler(async (req, res) => {
     await Subject.findByIdAndDelete(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "Subject deleted successfully",
 
    });
}); 
