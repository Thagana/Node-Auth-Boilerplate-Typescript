import express from 'express';
import controller from '../controllers/auth';

const router = express.Router();

router.post('/auth/register', controller.register);
router.get('/auth/login', controller.login);

export = router;
