const express = require('express');


const { 
    registerAdminCtrl,
    loginAdminctrl,
    getAdminsctrl,
    SingleAdminProfilectrl,
    UpdateAdminctrl,
    DeleteAdminctrl,
    adminSuspendTeacherctrl,
    adminUnsuspendTeacherctrl,
    adminWithdrawTeacher,
    adminUnwithdrawTeacher,
    adminPublishResult,
    adminUnpublishResult,
} = require("../../controller/Staff/adminCtrl");

const isLogin = require("../../middleware/isLogin")

const isAdmin = require("../../middleware/isAdmin");
const advancedResults = require('../../middleware/advancedResult');
const Admin = require('../../model/Staff/Admin');
const isAuthenticated = require('../../middleware/isAuthenticated');
const roleRestriction = require('../../middleware/roleRestriction');



const adminRouter = express.Router();

adminRouter.post("/register", registerAdminCtrl );

adminRouter.post("/login",loginAdminctrl);

adminRouter.get("/", isLogin, advancedResults(Admin,), getAdminsctrl);

adminRouter.get("/profile",isAuthenticated(Admin),roleRestriction('admin') ,isAdmin,SingleAdminProfilectrl);

adminRouter.put("/", isLogin, roleRestriction('admin'), UpdateAdminctrl );

adminRouter.delete("/:id", DeleteAdminctrl);

adminRouter.put("/suspend/teacher/:id", adminSuspendTeacherctrl);

adminRouter.put("/unsuspend/teacher/:id", adminUnsuspendTeacherctrl);

adminRouter.put("/withdraw/teacher/:id", adminWithdrawTeacher);

adminRouter.put("/unwithdraw/teacher/:id", adminUnwithdrawTeacher);

adminRouter.put("/publish/exam/:id", adminPublishResult);

adminRouter.put("/unpublish/exam/:id", adminUnpublishResult );

module.exports = adminRouter