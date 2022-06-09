// npm install soap
const soap = require('soap');

const url = 'https://lalu-soap-dot-lalu-storage.uc.r.appspot.com/wsdl?wsdl';
// const url = 'http://localhost:8000/wsdl?wsdl';

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