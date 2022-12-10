const router = require('express').Router();
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken')
const jwtKey = 'chavedificilima';

// LOGIN USER

router.post('/login/', async (req, res,) => {
    const { email, password } = req.body;
    let decPass;
    let token;

    if (!email || !password) {
        res.status(422).json({ error: 'Todos os campos são obrigatórios' });
        return;
    }

    try {
        const user = await User.findOne({
            email,
        });

        if (!!user) {
            decPass = jwt.verify(user.password, jwtKey);
            token = jwt.sign({ email, password }, jwtKey);
        }

        if (!user || !decPass || decPass.password != password) {
            res.status(404).json({ message: 'Usuário não encontrado!' });
            return;
        }

        res.status(201).json({ token });
        return;
    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

// CREATE USER

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

router.post('/create/', async (req, res) => {
    const { email, password } = req.body;
    console.log(!email || !validateEmail(email))

    if (!email || !validateEmail(email) || password.length < 3) {
        res.status(422).json({ error: 'Insira um E-mail e uma senha válida' });
        return
    }
    // if (password.length < 3) {
    //     res.status(422).json({ error: 'Insira um E-mail e uma senha válida' });
    // }


    const user = {
        email,
        password: jwt.sign({ password }, jwtKey)
    };

    console.log(user);

    try {
        await User.create(user);

        res.status(201).json({ message: 'Usuario criado com sucesso!' })
        return;
    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

// FIND USERS

router.get('/get-all', async (req, res) => {
    try {
        const users = await User.find();

        res.status(201).json(users);
        return;
    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

// FIND A USER

router.get('/get/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findOne({
            _id: id
        });


        if (!user) {
            res.status(404).json({ message: 'Usuário não encontrado!' });
            return;
        }

        res.status(201).json(user);
        return;
    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

module.exports = router;