import express from "express";
import ChatModel from '../models/chat.js';
const router = express.Router();

router.post("/load", async (req, res) => {
  try {
    const {members} = req.body;
    const chat  = await ChatModel.findOne({members : { $in :[...members]}});
    console.log(members, chat);
    if (chat) return res.send({chat});
    const newChat = new ChatModel({members});
    const savedChat = await newChat.save();
    return res.send({chat: savedChat});
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
});

export default router;
