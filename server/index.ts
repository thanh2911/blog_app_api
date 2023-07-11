import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes/index';
import { Server, Socket} from 'socket.io';
import { createServer } from 'http'

import { SocketSever } from './config/socket'

// Middleware 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());



// Database
const {connect} = require('./config/database');
connect();

// Socket io
const http = createServer(app);
export const io = new Server(http);

io.on("connection", (socket: Socket) => {
    SocketSever(socket)    
})


// Routes 
app.use('/api', routes.authRouter);
app.use('/api', routes.useRouter);
app.use('/api', routes.categoryRouter);
app.use('/api', routes.blogRouter);
app.use('/api', routes.commentRouter);


// Server listen
const PORT = process.env.PORT || 5000 ;
http.listen(PORT, () => {
    console.log('Server running on port ', PORT);
    
})
