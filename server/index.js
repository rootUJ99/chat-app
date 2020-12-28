import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authMiddleware from './middleware/auth.js';
// import movieRoutes from './routes/movie.js';
import userRoutes from './routes/user.js';
dotenv.config()
const app = express();
const port = process.env.PORT || 5000;
const __dirname = new URL(import.meta.url).pathname;

const dataBaseURI = process.env.DB_URI 
mongoose.connect(dataBaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
  console.log('database has been connected');
  app.listen(port,()=>{
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
// app.use('/api/movie', movieRoutes);

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, '../../', 'build')));
  app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, '../../', 'build', 'index.html'));
  });
}