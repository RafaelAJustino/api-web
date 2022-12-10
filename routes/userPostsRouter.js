const router = require('express').Router();
const UserPost = require('../models/UserPostModel');

// CREATE POST

router.post('/create/', async (req, res) => {
    const { message } = req.body;

    if ( !message ) {
        res.status(422).json({ error: 'ERRO!\nPublicação deve conter no mínimo 10 caracteres!' });
        return;
    }

    const user = {
        message,
    };

    try {
        await UserPost.create(user);

        res.status(201).json({ message: 'Post criado com sucesso!' })
        return;
    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

// FIND A USER POST

router.post('/get/', async (req, res) => {
    const {message} = req.body;

    try {
        const userPost = await UserPost.find({message: {$regex: message, $options: 'i'}});

        if (!userPost) {
            res.status(404).json({ message: 'Publicação não encontrado!' });
            return;
        }

        res.status(201).json(userPost);
        return;
    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

router.get('/get-all', async (req, res) => {
    try {
        const users = await UserPost.find();

        res.status(201).json(users);
        return;
    } catch (error) {
        res.status(500).json({ error })
        return;
    }
})

module.exports = router;