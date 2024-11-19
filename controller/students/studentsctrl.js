const AsyncHandler = require("express-async-handler");
const Student = require("../../model/Academic/Student");
const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const Exam = require("../../model/Academic/Exam");
const ExamResult = require("../../model/Academic/ExamResults");
const Admin = require("../../model/Staff/Admin");

exports.adminRegisterStudent = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const adminFound = await Admin.findById(req.userAuth._id);
    if(!adminFound){
      throw new Error('Admin not found   ')
    }
    const student = await Student.findOne({ email });
    if ( student) {
        throw new Error("student already exist");
    }

    const hashedPassword = await hashPassword(password);

    const studentCreated = await Student.create({
        name,
        email,
        password:hashedPassword,
        
    });
    adminFound.students.push(studentCreated?._id);
    await adminFound.save();
    res.status(201).json({
        status: "success",
        message: "student registered successfully",
        data: studentCreated,
    });
});

exports.loginStudent = AsyncHandler(async(req, res)=>{
    const {email, password} = req.body;
    const student = await Student.findOne({email})
    if(!student){
        return res.json({ message: "Invalid login credentials"});
    }

    const isMatched = await isPassMatched(password, student?.password);
    if(!isMatched){
        return res.json({ message: "Invalid login credentials"});

    }else{
        res.status(200).json({
          status:  'success',
          message:"student logged in successfully",
          data: generateToken(student?._id)

        });

    }
});

exports.getStudentByprofile = AsyncHandler(async(req, res)=>{

    const student = await Student.findById(req.userAuth?._id).select(
        "-password -createAt -updatedAt"
    ).populate("examResults");
    if (!student){
        throw new Error("student not found");
    }
    const studentProfile = {
      name: student?.name,
      email: student?.email,
      currentClassLevel: student?.currentClassLevel,
      program: student?.program,
      dateAdmitted: student?.dateAdmitted,
      isSuspended: student?.isSuspended,
      isWithdrawn: student?.isWithdrawn,
      studentId: student?.studentId,
      perfectName: student?.perfectName,
    };

    const examResults = student?.examResults;
    const currentExamResult = examResults[examResults.length - 1];
   const isPublished = currentExamResult?.isPublished;
   console.log(currentExamResult);

    res.status(200).json({
      status: "success",
      data: {
        studentProfile,
        currentExamResult: isPublished ? currentExamResult : [],
      },
      message: "Student Profile fetched successfully",
      
    });  
  });

  exports.getAllStudentsAdmin = AsyncHandler(async(req, res)=>{
    const students = await Student.find();
    res.status(200).json({
      status: "success",
      message: "students fetched successfully",
      data: students,
    });  
  });

  exports.getStudentByAdmin = AsyncHandler(async(req, res)=>{
    const studentID = req.params.studentID;
    const student = await Student.findById(studentID);
    if (!student){
        throw new Error("student not found");
    }
    res.status(200).json({
      status: "success",
      message: "student found",
      data: student,
    });  
  });

  exports.StudentUpdateProfile = AsyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const emailExist = await Student.findOne({ email });
    if (emailExist) {
      throw new Error("This email is taken/exist");
    }
  
    
  
    if (password) {
      
      const student = await Student.findByIdAndUpdate(
        req.userAuth._id,
        {
          email,
          password: await hashPassword(password),
          name,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: student,
        message: "student updated successfully",
      });
    } else {

      const student = await Student.findByIdAndUpdate(
        req.userAuth._id,
        {
          email,
          name,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: student,
        message: "student updated successfully",
      });
    }
  });

  exports.adminUpdateStudent = AsyncHandler(async (req, res) => {
    const { classLevels, academicYear, program, name, email, perfectName,isSuspended,isWithdrawn } =
      req.body;
  
    //find the student by id
    const studentFound = await Student.findById(req.params.studentID);
    if (!studentFound) {
      throw new Error("Student not found");
    }
  
    //update
    const studentUpdated = await Student.findByIdAndUpdate(
      req.params.studentID,
      {
        $set: {
          name,
          email,
          academicYear,
          program,
          perfectName,
          isSuspended,
          isWithdrawn
        },
        $addToSet: {
          classLevels,
        },
      },
      {
        new: true,
      }
    );
    //send response
    res.status(200).json({
      status: "success",
      data: studentUpdated,
      message: "Student updated successfully",
    });
  });

  exports.writeExam = AsyncHandler(async (req, res) => {
    const studentFound = await Student.findById(req.userAuth?._id)  
  if (!studentFound) {
    throw new Error("Student not found");
  }
    const examFound = await Exam.findById(req.params.examID)
    .populate("questions")
    .populate("academicTerm");
    


    if (!examFound) {
      throw new Error("Exam not found");
    }
  const questions = examFound?.questions;
const studentAnswers = req.body.answers; 

if (studentAnswers.length !== questions.length) {
  throw new Error("You have not answered all the questions");

}
const studentFoundInResults = await ExamResult.findOne({
  student: studentFound?._id,
});
if(studentFoundInResults){
  throw new Error('You have already written this exam')
}

// if (studentFound.isWithdrawn || studentFound.isSuspended) {
//   throw new Error("You are suspended/withdrawn, you can't")
// }

let correctanswers = 0;
let wrongAnswers = 0;
let status = "";
let grade = 0;
let remarks = ''
let score = 0;
let answeredQuestions = [];



for (let i=0; i<questions.length; i++) {
  const question = questions [i]
  if(question.correctAnswer === studentAnswers[i]){
    correctanswers++;
    score++;
    question.isCorrect = true;
  }else{
    wrongAnswers++;
  }
}



grade = (correctanswers / questions.length) * 100;
answeredQuestions = questions.map(question =>{
  return {
    question: question.question,
    correctanswers: question.correctAnswer,
    isCorrect: question.isCorrect,
  };
});

if(grade >= 50) {
  status = "Pass";
} else {
  status = "Fail";
}

if(grade >= 80){
  remarks = 'Excellent'
}else if(grade >= 60){
  remarks = 'Good'
}else if(grade >= 50){
  remarks = "Fair";
} else {
  remarks = "Poor";
}

const examResults = await ExamResult.create({
  studentID: studentFound?.studentId,
  exam: examFound?._id,
  grade,
  score,
  status,
  remarks,
  classLevel: examFound?.classLevel,
  academicTerm: examFound?.academicTerm,
  academicYear: examFound?.academicYear,
  answeredQuestions: answeredQuestions,
});

studentFound.examResults.push(examResults?._id);
await studentFound.save()

if(examFound.academicTerm.name === '3rd term' && status === "Pass" &&
  studentFound?.currentClassLevel === "Level 100"
  
) {
  studentFound.classLevels.push("Level 200");
  studentFound.currentClassLevel = "Level 200";
  await studentFound.save();
}


if(examFound.academicTerm.name === '3rd term' && status === "Pass" &&
  studentFound?.currentClassLevel === "Level 200"
  
) {
  studentFound.classLevels.push("Level 300");
  studentFound.currentClassLevel = "Level 300";
  await studentFound.save();
}

if(examFound.academicTerm.name === '3rd term' && status === "Pass" &&
  studentFound?.currentClassLevel === "Level 300"
  
) {
  studentFound.classLevels.push("Level 400");
  studentFound.currentClassLevel = "Level 400";
  await studentFound.save();
}

if(examFound.academicTerm.name === '3rd term' && status === "Pass" &&
  studentFound?.currentClassLevel === "Level 400"
  
) {
  studentFound.isGraduated = true;
  studentFound.yearGraduated = new Date();
  await studentFound.save();
}
 res.status(200).json({
  status:"success",
  data: "You have submitted your exam. check later for the results"
 })
  });