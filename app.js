/*jslint node: true */
"use strict";

const soap = require('soap');
const express = require('express');
const fs = require('fs');

const cors = require('cors');

const { request, gql } = require('graphql-request');

const requestFunc = require('./request.js');

const url = "https://35.226.199.77.nip.io/graphql";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

function getQueryForId(id) {
    const query = gql `{
            getSongById(id: "${id}") {
                title
            }
        }`
    return query
}

// the splitter function, used by the service
function main(args, callback) {
    const id = args.id;
    request(url, getQueryForId(id))
        .then((data) => {
            const title = data.getSongById.title;
            callback({
                result: title
            });
        })
}

// the service
var serviceObject = {
    MessageSplitterService: {
        MessageSplitterServiceSoapPort: {
            MessageSplitter: main
        },
        MessageSplitterServiceSoap12Port: {
            MessageSplitter: main
        }
    }
};

const xml = fs.readFileSync('service.wsdl', 'utf8');
const app = express();

app.use(cors());

// root handler
app.get('/', function(req, res) {
    res.send('Node Soap Example!<br /><a href="/wsdl?wsdl">Wsdl endpoint</a>');
})

//routes
app.get('/consume/:id', requestFunc);

// Launch the server and listen
const port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
    const wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check port " + port + " to see if the service is working");
});