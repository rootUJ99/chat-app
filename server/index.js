import express from 'express';
import process from 'process';
import bodyParser from 'body-parser';
import http from 'http';
import * as io from 'socket.io';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authMiddleware from './middleware/auth.js';
import userRoutes from './routes/user.js';
import chatRoutes from './routes/chat.js';
import ChatModel from './models/chat.js';
dotenv.config()

const app = express();
const {createServer} = http;
const httpServer = createServer(app);

const socketIO = new io.Server(httpServer, {
  serveClient: false,
  cors: {origin: '*'}
});

const port = process.env.PORT || 5000;
const __dirname = new URL(import.meta.url).pathname;

const dataBaseURI = process.env.DB_URI 
mongoose.connect(dataBaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
}).then(()=>{
  console.log('database has been connected');
  httpServer.listen(port,()=>{
    console.log('server started at '+port);
  });
}).catch(err=> {
  console.log(err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const exceptPaths = (pathArr, middleware) => {
  return (req, res, next) => {
    if (!req.path.includes('/api')){
      return next();
    }
    if (pathArr.includes(req.path)) {
      return next();
    }
    return middleware(req, res, next);
  }
}
const excludedArr =['/api/user/token','/api/user/create'];
app.use(exceptPaths(excludedArr,authMiddleware));
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

socketIO.on('connection', (socket)=> {
  console.log('socket connetced');
  socket.on('create-room', (id)=> {
    socket.join(id);
    socket.on('typing', (userId) => {
      socketIO.to(id).emit('typing', userId);
    });
  
    socket.on('send-message', async ({message, sender})=> {
      try {
        socketIO.to(id).emit('typing', null);
        const findifexost = await ChatModel.findById(id);
        const messageAdded = await ChatModel.findByIdAndUpdate(id, {$push: {
          chat: { message, sender}
        }});
        console.log({id, messageAdded});
        socketIO.emit('recived-message', {message, sender});
      } catch(err) {
        console.log(err);
      }
    });

  })

});


if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, '../../', 'build')));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'));
  });
}


process.on('uncaughtException', function(err) {
  if(err.errno === 'EADDRINUSE') {
    process.kill();
    process.exit(0);
  }
  process.exit(1);
});  