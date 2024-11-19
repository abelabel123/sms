const AsyncHandler = require("express-async-handler");

const Teacher = require("../../model/Staff/Teacher");
const generateToken = require("../../utils/generateToken");
const { hashPassword, isPassMatched } = require("../../utils/helpers");
const Admin = require("../../model/Staff/Admin");


exports.adminRegisterTeacher = AsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const adminFound = await Admin.findById(req.userAuth._id);
    if(!adminFound){
      throw new Error('Admin not found   ')
    }
    const teacher = await Teacher.findOne({ email });
    if ( teacher) {
        throw new Error("Teacher already employed");
    }

    const hashedPassword = await hashPassword(password);

    const teacherCreated = await Teacher.create({
        name,
        email,
        password:hashedPassword,
    });
    adminFound.teachers.push(teacherCreated?._id);
    await adminFound.save();
    res.status(201).json({
        status: "success",
        message: "Teacher registered successfully",
        data: teacherCreated,
    });
});

exports.loginTeacher = AsyncHandler(async(req, res)=>{

    const {email, password} = req.body;
    const teacher = await Teacher.findOne({email})
    if(!teacher){
        return res.json({ message: "Invalid login credentials"});
    }

    const isMatched = await isPassMatched(password, teacher?.password);
    if(!isMatched){
        return res.json({ message: "Invalid login credentials"});

    }else{
        res.status(200).json({
          status:  'success',
          message:"Teacher logged in successfully",
          data: generateToken(teacher?._id)

        });

    }
});

exports.getAllTeachersAdmin = AsyncHandler(async(req, res)=>{
  
  
  res.status(200).json(res.results)
  
   
});

exports.getTeacherByAdmin = AsyncHandler(async(req, res)=>{
    const teacherID = req.params.teacherID;
    const teacher = await Teacher.findById(teacherID);
    if (!teacher){
        throw new Error("Teacher not found");
    }
    res.status(200).json({
      status: "success",
      message: "Teacher found",
      data: teacher,
    });  
  });
  exports.getTeacherprofile = AsyncHandler(async(req, res)=>{

    const teacher = await Teacher.findById(req.userAuth?._id).select(
        "-password -createAt -updatedAt"
    );
    if (!teacher){
        throw new Error("Teacher not found");
    }
    res.status(200).json({
      status: "success",
      message: "Teacher Profile fetched successfully",
      data: teacher,
    });  
  });

  exports.TeacherUpdateProfile = AsyncHandler(async (req, res) => {
    const { email, name, password } = req.body;
    const emailExist = await Teacher.findOne({ email });
    if (emailExist) {
      throw new Error("This email is taken/exist");
    }
  
    
  
    if (password) {
      
      const teacher = await Teacher.findByIdAndUpdate(
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
        data: teacher,
        message: "Teacher updated successfully",
      });
    } else {

      const teacher = await Teacher.findByIdAndUpdate(
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
        data: teacher,
        message: "Teacher updated successfully",
      });
    }
  });

  exports.adminUpdateTeacher = AsyncHandler(async (req, res) => {
    const { program, classLevel, academicyear, subject } = req.body;

    const teacherFound = await Teacher.findById(req.params.teacherID);
    if (!teacherFound) {
      throw new Error("Teacher not found");
    }

    if (teacherFound.isWitdrawn) {
      throw new Error("Action denied, teacher is withdraw");
    }

    if (program) {
      teacherFound.program = program;
      await teacherFound.save();
      res.status(200).json({
        status: "success",
        data: teacherFound,
        message: "Teacher updated successfully",
      });
    }
  

    if (classLevel) {
      teacherFound.classLevel = classLevel;
      await teacherFound.save();
      res.status(200).json({
        status: "success",
        data: teacherFound,
        message: "Teacher updated successfully",
      });
    }
  

    if (academicyear) {
      teacherFound.academicyear = academicyear;
      await teacherFound.save();
      res.status(200).json({
        status: "success",
        data: teacherFound,
        message: "Teacher updated successfully",
      });
    }
  
    if (subject) {
      teacherFound.subject = subject;
      await teacherFound.save();
      res.status(200).json({
        status: "success",
        data: teacherFound,
        message: "Teacher updated successfully",
      });
    }
  });
  
