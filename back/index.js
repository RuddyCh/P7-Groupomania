require('dotenv').config();
const express = require('express');
const port = process.env.PORT || 3000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const {logUser, signupUser} = require('./controllers/users.js');
const {postRouter} = require('./routes/posts.js');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const allUsers = prisma.user.findMany().then(console.log).catch(console.error)

app.use('/posts', postRouter);
app.use('/images', express.static('images'));

app.post("/auth/login", logUser)
app.post("/auth/signup", signupUser)

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});