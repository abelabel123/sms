const AsyncHandler = require("express-async-handler");
const Program = require("../../model/Academic/Program");
const Admin = require("../../model/Staff/Admin");
const Subject = require("../../model/Academic/Subject");
exports.createProgram= AsyncHandler(async (req, res) => {
    const {name, description,} = req.body;
    const programFound = await Program.findOne({ name });
    if (programFound) {
        throw new Error("program already exists");
    }
    console.log(programFound);
    const programCreated = await Program.create({
        name,
        description,
        createdBy: req.userAuth._id,
    });
    const admin = await Admin.findById(req.userAuth._id);
    admin.program.push(programCreated._id);
    await admin.save();
    res.status(201).json({
        status: "success",
        message: "Program created successfully",
        data: programCreated,

    });
});


exports.getPrograms = AsyncHandler(async (req, res) => {
    const program = await Program.find( );
   
    res.status(201).json({
        status: "success",
        message: "programs fetched successfully",
        data: program,

    });
});




exports.getprogram = AsyncHandler(async (req, res) => {
    const program = await Program.findById(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "program fetched successfully",
        data: program,

    });
}); 





exports.UpdateProgram = AsyncHandler(async (req, res) => {
    const {name,description, } = req.body;
    const createProgramFound = await Program.findOne({name})
    if(createProgramFound)
        throw new Error("program = already exists");
    const program = await Program.findByIdAndUpdate(
    req.params.id,
   {
    name,
    description,
    createdBy: req.userAuth._id,
   },
   {

    new: true,
   }
);
    res.status(201).json({
        status: "success",
        message: "Program updated successfully",
        data: program,

    });
}); 

exports.DeleteProgram = AsyncHandler(async (req, res) => {
     await Program.findByIdAndDelete(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "Program deleted successfully",
 
    });
}); 
