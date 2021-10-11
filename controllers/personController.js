import express from 'express';
import { Person } from '../models/person.js';

const router = express.Router();

// TODO
router.get("/:id", async (req, res, next) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            const error = new Error("Person not found");
            error.status = 404;
            return next(error);
        }
        res.send(person);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const person = await Person.findById( req.params.id );
        await Person.deleteOne({ _id: req.params.id });
        if (!person) {
            const error = new Error("Person not found");
            error.status = 404;
            return next(error);
        }
        res.send(`${person.name} was deleted`);
    } catch (error) {
        next(error);
    }
})

export default router;