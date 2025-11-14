import express from 'express';
import { saveMessage } from '../Controllers/ContactController.js';
const router = express.Router()

router.post('/createmessage', saveMessage)


export default router