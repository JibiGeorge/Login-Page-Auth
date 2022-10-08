var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var userHelper = require('../helpers/user-helpers')

const JWT_SECRET = 'jvbfjkvbsbvnJKIUYT$%&^^&*IUGUY%^$&FG$'

router.get('/', function (req, res) {
    res.render('Pages/login');
});

router.get('/signup', (req, res) => {
    res.render('Pages/signup')
})

router.post('/user-login', async (req, res) => {
    console.log(req.body);
    const { userName, password } = req.body
	const user = await userHelper.findOne({ userName }).lean()
    if (!user) {
        return res.send("Invalid username/password")
	}
    if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign(
			{
				id: user._id,
				userName: user.userName
			},
			JWT_SECRET
		)
        return res.render('Pages/home')
	}
	res.json({ status: 'error', error: 'Invalid username/password' })
})

router.post('/user-signup', async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, userName, password: plainTextPassword } = req.body
    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await userHelper.create({
            firstName,
            lastName,
            userName,
            password
        })
        console.log("User Created Successfully " + response);
    } catch (error) {
        console.log(error)
        return res.json({ status: 'error' })
    }
    res.json({ status: 'ok' })
})

module.exports = router;