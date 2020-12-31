import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const chatSchema = new Schema({
  members: Array,
  chat: [messageSchema],
});
const messageSchema = new Schema({
  sender: String,
  messaage: String,
  time: Date
}); 
const Chat = model('chat', chatSchema);

export default Chat;