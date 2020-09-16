const router = require('express').Router();


router.post('/update/pp', async(req,res) => {

    if(!req.body || !req.body.key) return res.status(400).json({
        code: 400,
        message: 'No key or no body'
    });


    let key = req.body.key;


    if(key !== require('../config').server.key) return res.status(401).json({
        code: 401,
        message: 'invalid api key'
    });



    let keys = req.body.keys || 4;
    if(![4,7,10].includes(parseInt(keys))) return res.status(400).json({
        code: 400,
        message: 'not well-formed keys value'
    });

    let userid = req.body.userid;
    if(!userid) return res.status(400).json({
        code: 400,
        message: 'not valid userid'
    });

    let pp = req.body.pp;
    if(!pp) return res.status(400).json({
        code: 400,
        message: 'not provided pp to add'
    });


    let response = require('../functions/addKeysPP')(keys,pp,userid);


    res.status(204);

    
});




router.get('/pp', async(req,res) => {
     if(!req.query || !req.query.key) return res.status(401).json({
         code: 401,
         message: 'Not provided key in query or invalid key'
     });

     if(req.query.key !== require('../config').server.key) return res.status(401).json({
        code: 401,
        message: 'Not provided key in query or invalid key'
    });


    let userid = req.query.userid;

    if(!userid) return res.status(400).json({
        code: 400,
        message: 'not valid userid'
    });

    let response = await require('../functions/getKeyPP')(userid);

    res.status(200).json(response)
    
    



    
})



module.exports = router;