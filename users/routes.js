const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt');
const { toJWT } = require('../auth/jwt')

const router = new Router()

router.post('/users', (req, res) => {
    const { email, password, password_confirmation } = req.body;
    if (password !== password_confirmation)
        return res.status(400).send({
            message: 'Password does not match.'
        });
    User.findOne({
        where: { email }
    }).then(entity => {
        if (entity) {
            return res
                .status(400)
                .send({ message: 'Existing user.' });
        }
        if (email && password) {
            const user = {
                email,
                password: bcrypt.hashSync(password, 10)
            };
            return User.create(user).then(
                res.send({ token: toJWT({ userId: user.id }) })
            );
        } else {
            return res.status(400).send({
                message: 'Please enter a valid email and password'
            });
        }
    });
});

module.exports = router