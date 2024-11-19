const AsyncHandler = require("express-async-handler");
const YearGroup = require("../../model/Academic/YearGroup");
const Admin = require("../../model/Staff/Admin");




exports.createYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;


  const yeargroup = await YearGroup.findOne({ name });
  if (yeargroup) {
    throw new Error("Year Group/Graduation   already exists");
  }

  const yearGroup = await YearGroup.create({
    name,
    academicYear,
    createdBy: req.userAuth._id,
  });

  const admin = await Admin.findById(req.userAuth._id);
  if (!admin) {
    throw new Error("Admin not found");
  }

  admin.yearGroups.push(yearGroup._id);

  await admin.save();
  res.status(201).json({
    status: "success",
    message: "Year Group created successfully",
    data: yearGroup,
  });
});



exports.getYearGroups = AsyncHandler(async (req, res) => {
  const groups = await YearGroup.find();
  res.status(201).json({
    status: "success",
    message: "Year Groups fetched successfully",
    data: groups,
  });
});



exports.getYearGroup = AsyncHandler(async (req, res) => {
  const group = await YearGroup.findById(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Year Group fetched successfully",
    data: group,
  });
});


exports.updateYearGroup = AsyncHandler(async (req, res) => {
  const { name, academicYear } = req.body;

  const yearGroupFound = await YearGroup.findOne({ name });
  if (yearGroupFound) {
    throw new Error("year Group already exists");
  }
  const yearGroup = await YearGroup.findByIdAndUpdate(
    req.params.id,
    {
      name,
      academicYear,
      createdBy: req.userAuth._id,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    message: "Year Group  updated successfully",
    data: yearGroup,
  });
});


exports.deleteYearGroup = AsyncHandler(async (req, res) => {
  await YearGroup.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: "success",
    message: "Year Group deleted successfully",
  });
});
