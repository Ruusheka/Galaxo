import express from 'express';
import { awardBadge, getUserBadges, getBadgeById } from '../controllers/badgeController.js';

const badgeRouter = express.Router();

badgeRouter.post('/award', awardBadge);
badgeRouter.get('/user', getUserBadges);
badgeRouter.get('/:id', getBadgeById);

export default badgeRouter;
