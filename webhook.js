#!/usr/bin/env node

// https://www.digitalocean.com/community/tutorials/how-to-use-node-js-and-github-webhooks-to-keep-remote-projects-in-sync
const secret = process.env.WEBHOOK_SECRET;
const port = process.env.WEBHOOK_BACKEND_PORT || 9000;
console.info(`app started with secret: ${secret}, port: ${port}`);

const http = require('http');
const crypto = require('crypto');
const exec = require('child_process').exec;
const {join} = require('path');

http.createServer(function (req, res) {
    req.on('data', function(chunk) {
        let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
	    console.info(`sig: ${sig}, req.headers['x-hub-signature']: ${req.headers['x-hub-signature']}`);
        if (req.headers['x-hub-signature'] == sig) {
            console.info('Webhook received!');
            // execute update.sh script in the current directory (where this script is located)
            exec(`cd ${__dirname} && ${join(__dirname, 'update.sh')}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`exec error: ${error}`);
                    return;
                }
                console.info(`stdout: ${stdout}`);
                console.info(`stderr: ${stderr}`);
            });
        }
        else {
            console.info('Not a valid webhook request!');
        }
    });

    res.end();
}).listen(port);