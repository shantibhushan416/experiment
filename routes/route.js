import express from "express";
import { deleteById, getCourse, getCoursebyId, postCourse, updateById } from "../controller/course-controller.js";
import { getBranch, postBranch, updateBranchbyId, } from "../controller/branch-controller.js";
import { paginationMiddleware } from "../middleware/pagination.js";
import { getProfile, postUser } from "../controller/user-controller.js";
import { authUser } from "../controller/auth-controller.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/isAdmin.js";
import { asyncMiddleWare } from "../middleware/async.js";


const router = express.Router();

// User
router.post('/api/user', postUser);
router.post('/api/user/login', authUser);
router.get('/api/me', authMiddleware(), getProfile);

// course routes

router.post("/api/courses", postCourse);
router.get('/api/courses', paginationMiddleware(), asyncMiddleWare(getCourse));
router.get("/api/courses/:id", getCoursebyId);
router.put("/api/courses/:id", updateById);
router.delete("/api/courses/:id", [authMiddleware(), adminMiddleware()], deleteById);

//Branch
router.post("/api/branch", postBranch)
router.get("/api/branch", authMiddleware(), getBranch);
router.put("/api/branch/:id", updateBranchbyId);



export default router;