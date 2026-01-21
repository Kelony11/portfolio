import { Router } from "express";
import { createFeedBackController } from "../controller/feedback.controller";

const router = Router();

router.post("/", createFeedBackController);

export default router;