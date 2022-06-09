// const { default: request } = require('graphql-request');
const soap = require('soap');
const axios = require('axios');

// const url = 'http://34.123.106.254:3009/wsdl?wsdl';
const url = "https://api.skillsly.app/soap/ws"

async function requestFunc(req, res) {
    const id = req.params.id;

    // return res.json({
    //     user: {
    //         name: 'mock-name',
    //         id: 'mock-id',
    //         email: 'mock-email'
    //     }
    // })

    let xmls = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:gs="http://spring.io/guides/gs-producing-web-service">\
    <soapenv:Header/>\
    <soapenv:Body>\
       <gs:getUserRequest>\
          <gs:userId>${id}</gs:userId>\
       </gs:getUserRequest>\
    </soapenv:Body>\
 </soapenv:Envelope>`;

    axios.post(url,
            xmls, {
                headers: { 'Content-Type': 'text/xml' }
            })
        .then(data => {
            let dataArray = data.data.split('<ns2:id>');
            dataArray = dataArray[1].split('</ns2:id>');
            const id = dataArray[0];
            dataArray = dataArray[1].split('<ns2:name>');
            dataArray = dataArray[1].split('</ns2:name>');
            const user = dataArray[0];
            dataArray = dataArray[1].split('</ns2:email>');
            const email = dataArray[0].split('<ns2:email>')[1];
            console.log(id, user, email);

            const response = {
                user: {
                    id: id,
                    name: user,
                    email: email
                }
            }
            return res.json(response);
        })
        .catch(err => { console.log(err) });

    // soap.createClient(url, function(err, client) {
    //     if (err) {
    //         throw err;
    //     }
    //     /* 
    //      * Parameters of the service call: they need to be called as specified
    //      * in the WSDL file
    //      */
    //     var args = {
    //         userId: id
    //     };
    //     // call the service
    //     client.getUser(args, function(err, response) {
    //         if (err)
    //             throw err;
    //         // print the service returned result
    //         return res.json(response);
    //     });
    // });
};

module.exports = requestFunc;