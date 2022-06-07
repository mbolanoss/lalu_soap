import soap from 'soap';

const url = 'http://34.123.106.254:3009/wsdl?wsdl';

export default async(req, res) => {
    const id = req.params.id;

    return res.json({ 'data': id });

    soap.createClient(url, function(err, client) {
        if (err) {
            throw err;
        }
        /* 
         * Parameters of the service call: they need to be called as specified
         * in the WSDL file
         */
        var args = {
            id: '6285787584a4c87434cd2985'
        };
        // call the service
        client.MessageSplitter(args, function(err, res) {
            if (err)
                throw err;
            // print the service returned result
            console.log(res);
        });
    });
};