import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const chatSchema = new Schema({
  members: {type:Array, unique:true},
  chat: [{
    sender: String,
    message: String,
    time: {type: Date, default: Date.now}
  }],
});
const Chat = model('chat', chatSchema);

export default Chat;