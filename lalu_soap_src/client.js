// npm install soap
import soap from 'soap';

const url = 'http://34.123.106.254:3009/wsdl?wsdl';

// Create client
soap.createClient(url, function(err, client) {
    if (err) {
        throw err;
    }
    /* 
     * Parameters of the service call: they need to be called as specified
     * in the WSDL file
     */
    var args = {
        id: '62718e54b9621e3a0066d49f'
    };
    // call the service
    client.MessageSplitter(args, function(err, res) {
        if (err)
            throw err;
        // print the service returned result
        console.log(res);
    });
});