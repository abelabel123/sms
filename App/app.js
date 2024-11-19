const express = require('express');
const {globalErrHandler,notFoundErr} = require('../middleware/globalErrHandler');
const academicYearRouter = require('../routes/academics/academicYear');
const adminRouter = require("../routes/staff/adminRouter");
const academicTermRouter = require('../routes/academics/academicTerm');
const ClassLevelRouter = require('../routes/academics/ClassLevel');
const ProgramRouter = require('../routes/academics/Program');
const SubjectRouter = require('../routes/academics/Subject');
const academicYearGroupRouter = require('../routes/academics/academicYearGroup');
const teachersRouter = require('../routes/staff/teachers');
const examRouter = require('../routes/academics/examRoute');
const questionsRouter = require('../routes/academics/questionRoute');
const StudentRouter = require('../routes/staff/student');
const examResultsRouter = require('../routes/academics/ExamResultsRoute');










const app = express(); 

app.use(express.json());

app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/academic-years', academicYearRouter)
app.use('/api/v1/academic-terms', academicTermRouter)
app.use('/api/v1/class-levels', ClassLevelRouter)
app.use('/api/v1/program', ProgramRouter)
app.use('/api/v1/subjects', SubjectRouter)
app.use('/api/v1/academic-year-group', academicYearGroupRouter)
app.use('/api/v1/teachers', teachersRouter);
app.use('/api/v1/exam', examRouter)
app.use('/api/v1/exam-results', examResultsRouter)
app.use('/api/v1/students', StudentRouter)
app.use('/api/v1/questions', questionsRouter )
app.use(notFoundErr);
app.use(globalErrHandler);


module.exports = app;
 