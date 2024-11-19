const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const adminSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        
        },
        role: {
            type: String,
            default: "admin",
        },

        academicTerms: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicTerm",
        },
],

        academicYears: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AcademicYear",
        },
],

       program: [
       {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Program",
       },
],
       yearGroups: [
       {
       type: mongoose.Schema.Types.ObjectId,
       ref: "YearGroup",
       },
],

ClassLevels: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClassLevel",
    },
],

teachers: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
],

students: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
],

    },

    {
        timestamps: true,
    }
);
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;