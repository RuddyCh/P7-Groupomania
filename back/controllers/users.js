const jwt = require('jsonwebtoken');
const {users} = require('../db/db.js');
const bcrypt = require('bcrypt');

function logUser(req, res) {
    const { email, password } = req.body
    const user = getUser(email);
    if (user == null) return res.status(400).send({ error: "User doesn't exist" });
    checkPassword(user, password)
    .then((isPasswordCorrect) => {
        if (!isPasswordCorrect) return res.status(401).send({error:"Wrong password"});
        const token = makeToken(email);
        res.send({ token: token, email: email })
    })
    .catch((error) => res.status(500).send({error}));
}

function makeToken(email) {
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
}

function getUser(email) {
    return users.find(user => user.email === email);
}

function checkPassword(user, password) {
    return bcrypt.compare(password, user.password);
}

function signupUser(req,res) {
    const { email, password, confirmPassword } = req.body
    if (password !== confirmPassword) return res.status(400).send({ error: "Passwords don't match" });
    const user = getUser(email);
    if (user != null) return res.status(400).send({ error: "User already exists" });
    hashPassword(password)
    .then((hash) => {
        saveUserInDatabase({ email, password: hash });
        res.send("User created" + " - " + email);
    })
    .catch((error) => res.status(500).send({error}));
}

function saveUserInDatabase(user) {
    users.push(user);
}

function hashPassword(password) {
    const SALT_ROUNDS = 10;
    return bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = { logUser, signupUser };