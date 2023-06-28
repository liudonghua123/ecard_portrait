import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import mustacheExpress from 'mustache-express';


import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cas from 'connect-cas';

import { find_by_id } from './db_helper.mjs';

import path from 'path'
import { fileURLToPath } from 'url'

const __filenameES = fileURLToPath(import.meta.url)
const __dirnameES = path.dirname(__filenameES)

config();

const app = express()
const port = process.env.PORT || 3000

cas.configure({
    protocol: 'https',
    host: 'ids.ynu.edu.cn',
    port: 80,
    paths: {
        validate: '/authserver/validate',
        serviceValidate: '/authserver/serviceValidate',
        login: '/authserver/login',
        logout: '/authserver/logout'
    }
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: 'ecard_portraits' }));


app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirnameES + '/public');

app.use(cors({
    origin: '*'
}));

app.use(express.static('public'))

app.get('/ecard_portraits', cas.ssout('/ecard_portraits'), cas.serviceValidate(), cas.authenticate(), async (req, res) => {
    try {
        if (req.session.cas && req.session.cas.attributes) {
            const { user: uid } = req.session.cas;
            if (!uid) {
                console.info(`req.session.cas.attributes.uid is null, req.session.cas: ${JSON.stringify(req.session.cas)}}`)
                return res.sendFile(__dirnameES + '/public/404.html');
            }
            const info = await find_by_id(uid);
            if (!info) {
                console.info(`info is null, uid: ${uid}, info: ${JSON.stringify(info)}`)
                return res.sendFile(__dirnameES + '/public/404.html');
            }
            // set info cookie
            console.info(`set info cookie to ${JSON.stringify(info)}`)
            res.cookie('info', JSON.stringify(info), { maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.sendFile(__dirnameES + '/public/ecard_portraits.html');
        }
    } catch (error) {
        console.error(error);
        res.sendFile(__dirnameES + '/public/error.html');
    }
})

// handle application logouts from the CAS logout page (in the browser)
app.get('/logout', function(req, res) {
    if (req.session.destroy) {
      req.session.destroy();
    } else {
      req.session = null;
    }
    res.redirect('/');
  });

app.listen(port, () => {
    console.log(`ecard_portraits app listening on port ${port}`)
})