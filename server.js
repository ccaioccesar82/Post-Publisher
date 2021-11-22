import dotenv from 'dotenv';
import express, { urlencoded } from 'express';
import { resolve } from 'path';
import routes from './routes';
import  mongoose  from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
const flash = require('connect-flash')
const { middlewareGlobal } = require('./middleware')

dotenv.config()

const app = express();
const port = 3002;


mongoose.connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
   

}).then(()=>{
console.log('conectei na base de dados');
    app.emit('Pronto');
})
.catch(e => {
console.log(e);

});


app.use(urlencoded({extended: true}));
app.use(express.static(resolve(__dirname, 'public')));

const sessionOptions = session({

    secret: 'sjsaoasmasmasmsasm',
    store:  MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
    resave: false,
    saveUninitialized: false,
    cookie:{
    
    maxAge: 1000*60*60*24*7,
    httpOnly: true
    
    }
    })
    
    app.use(sessionOptions);
    app.use(flash());


app.set('views', resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(middlewareGlobal);
app.use(routes);

app.on('Pronto', ()=>{

    app.listen(port, ()=>{
    console.log(`Acessar http://localhost:${port}`)
    });
})
