const express = require('express');
const router = express();
const adminMiddleware = require('../middlewares/admin.middleware');
const courseController = require('../controllers/course.controller')

router.get('/all-courses',courseController.getAllCourses);

router.get('/course/:courseId',courseController.getCourse);

router.post('/create-course',adminMiddleware,courseController.create);

router.get('/delete-course/:courseId',adminMiddleware,courseController.deleteCourse);

router.put('/update-course/:courseId',adminMiddleware,courseController.updateCourse)

module.exports = router;