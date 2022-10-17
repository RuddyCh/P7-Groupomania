const jwt = require('jsonwebtoken');
const { users, prisma } = require('../db/db.js');
const bcrypt = require('bcrypt');

async function logUser(req, res) {
    const { email, password } = req.body
    try {
        const user = await getUser(email);
        if (user == null) return res.status(400).send({ error: "User doesn't exist" });
        
        const isPasswordCorrect = await checkPassword(user, password)
        if (!isPasswordCorrect) return res.status(401).send({error:"Wrong password"});

        const token = makeToken(email);
        res.send({ token: token, email: email })
    } catch (error) {
        res.status(500).send({error})
    }
}

function makeToken(email) {
    return jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
}

function getUser(email) {
    return prisma.user.findUnique({ where: { email: email } })
}

function checkPassword(user, password) {
    return bcrypt.compare(password, user.password);
}

async function signupUser(req,res) {
    const { email, password, confirmPassword } = req.body
    try {
        if (password !== confirmPassword) return res.status(400).send({ error: "Passwords don't match" });
        const userInDb = await getUser(email);
        if (userInDb != null) return res.status(400).send({ error: "User already exists" });
    
        const hash = await hashPassword(password)
        const user = await saveUserInDatabase({ email, password: hash })
        res.send({ user })
    } catch(error) {
        res.status(500).send({error})
    }
}

function saveUserInDatabase(user) {
    return prisma.user.create({ data: user })
}

function hashPassword(password) {
    const SALT_ROUNDS = 10;
    return bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = { logUser, signupUser };