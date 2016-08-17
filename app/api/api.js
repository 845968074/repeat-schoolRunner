import express from 'express';
import loginApi from './login-router.js';
const router = express.Router();
router.use('/sessions', loginApi);
export default router;
