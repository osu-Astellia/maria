

module.exports = function(url, options){
    return new Promise((resolve, reject) => {
        if(!options) options = {};
        if(!options.method) options.method = 'GET';
        if(!options.json) options.json = true;
        if(!options.headers) options.headers = {};
        if(options.body) options.headers['Content-Type'] = 'application/json';
        if(options.query) url = `${url}?${require('querystring').stringify(options.query)}`;
 
        if(options.body) options.headers['content-length'] = JSON.stringify(options.body).length;
        let req = require(url.split(':')[0]).request(url, options, res => {
            const responseChunks = [];

            res.on('data', d => responseChunks.push(d));
            res.on('end', () => {

                if(options || options.json || options.headers['Content-Type'] === 'application/json' || res.headers['content-type'].split(';')[0] === 'application/json'){
                    let response = Buffer.concat(responseChunks).toString('utf-8');
                    try{response = JSON.parse(response)}catch(e){}
                    resolve(new Response({
                        data: response,
                        headers: res.headers,
                        code: res.statusCode,
                        json: options.json
                    }));
                }else{
                    
                    resolve(new Response({
                        data: Buffer.concat(responseChunks).toString(),
                        headers: res.headers,
                        code: res.statusCode
                    }));
                }
                
            });

            res.on('error', reject);
        });

        if(options.body) req.write(JSON.stringify(options.body));
        req.end()
    })
}


class Response {
    constructor(options){

        this.data = options.data || {};
        this.headers = options.headers || {};
        this.code = options.code;
        this.status = require('http').STATUS_CODES[this.code];
        if(options.json && this.headers['content-type'] && this.headers['content-type'].toLowerCase() == 'application/json') Object.keys(this.data).forEach(e => this[e] = this.data[e]);

    }
}