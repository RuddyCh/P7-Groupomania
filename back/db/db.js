const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const user1 = { email: "abc@free.com", password: "$2b$10$YUHgJAN59R.GugQUmuJVCeEy6jqvZQBUwUsKQshX006jN9FHMui7e" }
const user2 = { email: "abcd@pouet.com", password: "$2b$10$YUHgJAN59R.GugQUmuJVCeEy6jqvZQBUwUsKQshX006jN9FHMui7e" }
const user3 = { email: "abcde@pouet.com", password: "$2b$10$YUHgJAN59R.GugQUmuJVCeEy6jqvZQBUwUsKQshX006jN9FHMui7e" }
const users = [user1, user2, user3];

module.exports = {users, prisma};