const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : 'dpg-cg9h529mbg54mbf1o6jg-a.frankfurt-postgres.render.com',
    user : 'postgresql_e2xo_user',
    port: 5432,
    password : '6dw8uxjGOUvD7A28i5PnCJRyiJY3tMUf',
    database : 'postgresql_e2xo'
  }
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send('success') })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3001, ()=>{
	console.log(`app is running on port 3001 ${process.env.PORT}`);
})

/* --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/


