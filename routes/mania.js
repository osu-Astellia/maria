const router = require('express').Router();
const fetch = require('../functions/fetch');
const wifipiano2 = require('wifipiano2');

router.get('/pp', async (req,res) => {
    

    if(!req.query.beatmap_id) return res.status(400).json({
        code: 400,
        message: 'Provide beatmap_id in query'
    });

    

    
    let bmData = await fetch(`https://hentai.ninja/api/b/${req.query.beatmap_id}`).then(d => d.data);


    let mods = req.query.mods || 'none';
    let score = req.query.score || 100000;
    if(bmData.Mode !== 3) return res.status(400).json({
        code: 400,
        message: 'This beatmap not for mania!'
    })
    let pp = {
        'score' : {
            score: Math.floor(wifipiano2.calculate({
                starRating: bmData.DifficultyRating,
                overallDifficulty: bmData.OD,
                objects: bmData.HitLength,
                mods: mods,
                score: parseInt(score),
                accuracy: 100.0
            }))
        }
    }

    res.json({
        beatmap: bmData,
        pp
    })
})

module.exports = router;