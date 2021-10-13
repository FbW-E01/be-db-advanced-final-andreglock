import express from 'express';
import { Score } from '../models/score.js';
const router = express.Router();

// Get 10 scores or Get a given page with query string parameter
router.get("/", async (req,res,next) => {
    if (req.query.page) {
        try {
            const scoresQuery = Score.find();
            scoresQuery.select('total');
            scoresQuery.sort({ total: 'asc' });
            scoresQuery.skip(req.query.page * 10).limit(10);
            const scores = await scoresQuery.exec()
            res.send(scores);
        } catch (error) {
            next(error);
        }
    } else {
        try {
            const scoresQuery = Score.find();
            scoresQuery.select('total');
            scoresQuery.sort({ total: 'asc' });
            scoresQuery.limit(10);
            const scores = await scoresQuery.exec()
            res.send(scores);
        } catch (error) {
            next(error);
        }
    }
});

// Get a given page
router.get("/page/:nbr", async (req,res,next) => {
    try {
        const scoresQuery = Score.find();
        scoresQuery.select('total');
        scoresQuery.sort({ total: 'asc' });
        scoresQuery.skip(req.params.nbr * 10).limit(10);
        const scores = await scoresQuery.exec()
        res.send(scores);
    } catch (error) {
        next(error);
    }
});

// Get single score
router.get("/:id", async (req,res,next) => {
    try {
        const score = await Score.findById(req.params.id);
        if (!score) {
            const error = new Error("Score not found");
            error.status = 404;
            return next(error);
        }
        res.send(score);
    } catch (error) {
        next(error);
    }
});

export default router;