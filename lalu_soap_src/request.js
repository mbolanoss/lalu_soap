import soap from 'soap';

// const url = 'http://34.123.106.254:3009/wsdl?wsdl';
const url = "http://soap.skillsly.app:8080/ws/users.wsdl"

export default async(req, res) => {
    const id = req.params.id;

    soap.createClient(url, function(err, client) {
        if (err) {
            throw err;
        }
        /* 
         * Parameters of the service call: they need to be called as specified
         * in the WSDL file
         */
        var args = {
            userId: id
        };
        // call the service
        client.getUser(args, function(err, response) {
            if (err)
                throw err;
            // print the service returned result
            return res.json(response);
        });
    });
};