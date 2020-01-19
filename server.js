require('dotenv').config({ path: './sample.env' });
const { connectDB } = require('./src/scripts/connection.js'); 
const { runAPI } = require('./src/api_apollo_server.js')
const bodyParser = require('body-parser')

const cors = require('cors');
const helmet = require('helmet')

const express = require('express');
const app = express();

const port = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL | "http://localhost:3000";
var whitelist = [FRONTEND_URL]
const corsOptions = {
  origin:  function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}

//MIDDLEWARES
app.use(bodyParser.json()) // for parsing application/json
app.use(cors(corsOptions));
app.use(helmet.frameguard({ action: 'sameorigin' }))

runAPI(app);

(async function startConnection() {
    try {
      await connectDB();
      app.listen(port, () => {
        console.log(`API listen by port ${port}`);
      });
    } catch (err) {
      console.log('Error', err);
    }
  }());