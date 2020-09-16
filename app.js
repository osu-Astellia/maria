//#region modules
const express = require('express');
const parser = require('body-parser');
const mysql2 = require('mysql2');
//#endregion modules


//#region server

class Server {
    constructor(options){
        this.app = express(options || {});
        this.db = mysql2.createPool(options.db);

        //#region app use
        this.app.use(parser.json());
        this.app.use((req,res,next) => {
            try {
                next()
            }catch(e){
                res.status(500).json({
                    code: 500,
                    message: "Internal Server Error"
                })
            }
        })
        this.app.use('/api/mania', require('./routes/mania'));

        this.app.use((req,res,next) => {
            res.status(404).json({
                code: 404,
                message: 'Not found, try check our documentation in discord!'
            })
        })


       
        //#endregion
    }
}


new Server(require('./config')).app.listen(23140, () => {
    console.log('[I] Started Maria server on port 23140!');
});