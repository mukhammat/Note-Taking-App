const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const authMiddleware = require('../middleware/auth');

// Получение всех заметок для текущего пользователя
router.get('/', authMiddleware, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.render('notes', { notes });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Создание новой заметки
router.post('/', authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new Note({ user: req.user.id, title, content });
        await note.save();
        res.redirect('/notes');
    } catch (err) {
        res.status(400).send(err);
    }
});

// Удаление заметки
router.post('/delete/:id', authMiddleware, async (req, res) => {
    try {
        await Note.deleteOne({ _id: req.params.id, user: req.user.id });
        res.redirect('/notes');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
