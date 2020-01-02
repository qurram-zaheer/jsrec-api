const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const entries = require('./controllers/entries')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'qurramzaheer',
      password : '',
      database : 'jsrec'
    }
  });

const app = express();

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors());

app.get('/',(req,res) => {res.send(database.users)})
app.post('/signin',(req,res) => {signin.signInHandle(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res) => {profile.profileHandle(req,res,db)})
app.post('/register',(req,res) => {register.handleRegister(req,res,db,bcrypt)})
app.put('/image',(req,res) => {entries.entryHandler(req,res,db)})
app.post('/imageurl',(req,res) => {entries.handleApiCall(req,res)})

app.listen(process.env.PORT|| 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`)
})