const fetch = require('./functions/fetch');



fetch('http://0.0.0.0:23140/api/keymods/pp', {
    query: {
        userid: 1666,
        key: 'youshallnotpass'
    }
    
}).then(res => console.log(res.data))