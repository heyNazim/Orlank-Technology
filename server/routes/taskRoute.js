import express from 'express'
import { createTask, deleteTask, getAllTasks, updateTask } from '../controllers/taskController.js';
import { isAdmin, requireSignIn } from '../middlewares/userMiddleware.js';


const router = express.Router()

router.post('/createtask',  createTask);
router.get('/gettasklist',  getAllTasks);
router.delete('/deletetask/:id',  deleteTask);
router.put('/updatetask/:id',  updateTask);


export default router;
