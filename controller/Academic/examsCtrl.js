const AsyncHandler = require("express-async-handler");
const Teacher = require("../../model/Staff/Teacher");
const Exam = require("../../model/Academic/Exam");

exports.createExam = AsyncHandler(async(req, res)=>{
   const {
        name,
        description,
        subject,
        program,
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        createdBy,
        academicYear,
        classLevel,
    } = req.body; 
    const teacherFound = await Teacher.findById(req.userAuth?._id);
    if(!teacherFound){
        throw new Error ("Teacher not found");
    }

    const examExists = await Exam.findOne({ name });
    if(examExists){
        throw new Error ("Exam already exists");

    }

    const examCreated = await new Exam({
        name,
        description,
        academicTerm,
        academicYear,
        classLevel,
        createdBy,
        duration,
        examDate,
        examTime,
        examType,
        subject,
        program,
    });

    teacherFound.examsCreated.push(examCreated._id);

    await examCreated.save();
    await teacherFound.save();
    res.status(201).json({
        status: "sucess",
        message: "Exam created",
        data: examCreated,
    });



})


exports.getallexams = AsyncHandler(async (req, res) => {
    const exam = await Exam.find( ).populate({
        path:"questions",
        populate:{
            path:"createdBy",
        }
    });
   
    res.status(201).json({
        status: "success",
        message: "exams fetched successfully",
        data: exam,

    });

});

exports.getexam = AsyncHandler(async (req, res) => {
    const exam = await Exam.findById(req.params.id);
   
    res.status(201).json({
        status: "success",
        message: "exam fetched successfully",
        data: exam,

    });
}); 

exports.UpdateExam = AsyncHandler(async (req, res) => {
    const {
        name,
        description,
        subject,
        program,
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        createdBy,
        academicYear,
        classLevel,
    } = req.body; 
    const examFound = await Exam.findOne({name})
    if(examFound){
        throw new Error("Exam already exists");
    }
    const examupdated = await Exam.findByIdAndUpdate(
    req.params.id,
   {
        name,
        description,
        subject,
        program,
        academicTerm,
        duration,
        examDate,
        examTime,
        examType,
        createdBy,
        academicYear,
        classLevel,
        createdBy: req.userAuth._id,
   },
   {

    new: true,
   }
);
    res.status(201).json({
        status: "success",
        message: "Exam updated successfully",
        data: examupdated,

    });
});

exports.DeleteExam = AsyncHandler(async (req, res) => {
    await Exam.findByIdAndDelete(req.params.id);
  
   res.status(201).json({
       status: "success",
       message: "Exam deleted successfully",

   });
}); 


