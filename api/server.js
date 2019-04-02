const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
// STEP 2 bring in library
const session = require('express-session')
// Step 5 bring in connect session store and pass it session
const KnexSessionStore = require('connect-session-knex')(session);


const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const configureKnex = require('../database/dbConfig')

const server = express();

//STEP 2.2 Set up session config
const sessionConfig = {
  name: 'monster',
  secret: 'keep it secret, keep it safe!',
  cookie: {
    maxAge: 1000 * 60 * 10, // milliseconds
    secure: false,// use cookie over https
    httpOnly: true,// false means js can access the cookie on client
  },
  resave: false,// avoid recreating unchanged sessions
  saveUninitialized: false,// GDPR compliance - READ ABOUT THIS
  // STEP 5.1 set up store
  store: new KnexSessionStore({
    knex: configureKnex,
  })
}

server.use(helmet());
server.use(express.json());
server.use(cors());
//STEP 2.1 use session on server
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;
