/*jslint node: true */
"use strict";

import soap from 'soap';
import express from 'express';
import fs from 'fs';

import { request, gql } from 'graphql-request'

import requestFunc from './request.js'

const url = "http://34.117.100.225/graphql";

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
    console.log(id);
    request(url, getQueryForId(id))
        .then((data) => {
            const title = data.getSongById.title;
            callback({
                song_title: title
            })
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

// root handler
app.get('/', function(req, res) {
    res.send('Node Soap Example!<br /><a href="/wsdl?wsdl">Wsdl endpoint</a>');
})

//routes
app.get('/consume/:id', requestFunc);

// Launch the server and listen
const port = 8000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
    const wsdl_path = "/wsdl";
    soap.listen(app, wsdl_path, serviceObject, xml);
    console.log("Check port " + port + " to see if the service is working");
});