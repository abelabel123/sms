 const Asynchandler =  require('express-async-handler')
 const bcrypt = require("bcryptjs");
 const Admin = require("../../model/Staff/Admin");
const generateToken = require("../../utils/generateToken");

const { hashPassword, isPassMatched } = require("../../utils/helpers");

 exports.registerAdminCtrl= Asynchandler(async (req,res)=>{
    const { name, email, password } = req.body;
    const adminFound = await Admin.findOne({ email });
        if(adminFound){
            throw new Error('Admin Exists')
        }

        const user = await Admin.create({
            name,
            email,
            password: await hashPassword(password),
        });
        res.status(201).json({
            status:'success',
            data: user,
            message: "Admin registered successfully", 
        });

});


exports.loginAdminctrl= Asynchandler(async(req,res)=>{
    const { email, password }= req.body;
        const user = await Admin.findOne({email});
        if(!user){
            return res.json({message: "Invalid login credentials"});
        }
        
        const isMatched = await isPassMatched(password, user.password)
        
        if (!isMatched) {
            return res.json({ message: "Invalid login credentials"})
        } else {
            return res.json({
                
                data: generateToken(user._id),
                message: "Admin logged in successfully"

             });
            }
        });
        

exports.getAdminsctrl= Asynchandler(async(req,res)=>{
    
    res.status(200).json(res.results)
        
   

});

exports.SingleAdminProfilectrl= Asynchandler(async(req,res)=>{
    const admin = await Admin.findById(req.userAuth._id)
    .select('-password -createdAt -updatedAt')
    .populate("academicYears")
    .populate("academicTerms")
    .populate("program")
    .populate("yearGroups")
    .populate("ClassLevels")
    .populate("teachers")
    .populate("students")

    if(!admin){
        throw new Error('Admin Not Found ')
    }else {
        res.status(200).json({
            status:'success',
            data:admin,
            message: "Admin Profile fetched successfully",
        });

    }
});

exports.UpdateAdminctrl = Asynchandler(async (req, res) => {
    const { email, name, password } = req.body;
    const emailExist = await Admin.findOne({ email });
    if (emailExist) {
      throw new Error("This email is taken/exist");
    }
  
    //hash password
    //check if user is updating password
  
    if (password) {
      //update
      const admin = await Admin.findByIdAndUpdate(
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
        data: admin,
        message: "Admin updated successfully",
      });
    } else {
      //update
      const admin = await Admin.findByIdAndUpdate(
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
        data: admin,
        message: "Admin updated successfully",
      });
    }
  });

   

exports.DeleteAdminctrl=(req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:'delete admins',
        });
    } catch (error) {
        res.json({
            status:'failed',
            error: error.message,
        });
    }
}

exports.adminSuspendTeacherctrl=(req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:' admin suspend teacher',
        });
    } catch (error) {
        res.json({
            status:'failed',
            error: error.message,
        });
    }
}

exports.adminUnsuspendTeacherctrl=(req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:' admin unsuspend teacher',
        });
    } catch (error) {
        res.json({
            status:'failed',
            error: error.message,
        });
    }
}

exports.adminWithdrawTeacher=(req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:' admin withdraw teacher',
        });
    } catch (error) {
        res.json({
            status:'failed',
            error: error.message,
        });
    }
}

exports.adminUnwithdrawTeacher=(req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:' admin Unwithdraw teacher',
        });
    } catch (error) {
        res.json({
            status:'failed',
            error: error.message,
        });
    }
}

exports.adminPublishResult=(req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:' admin publish exam',
        });
    } catch (error) {
        res.json({
            status:'failed',
            error: error.message,
        });
    }
}

exports.adminUnpublishResult=(req,res)=>{
    try {
        res.status(201).json({
            status:'success',
            data:' admin unpublish exam',
        });
    } catch (error) {
        res.json({
            status:'failed',
            error: error.message,
        });
    }
}
