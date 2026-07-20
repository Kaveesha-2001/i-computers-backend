import express from "express";
import { sendMessage } from "../controllers/chatbotController.js";

const chatbotRouter = express.Router();

chatbotRouter.post("/", sendMessage)

export default chatbotRouter;