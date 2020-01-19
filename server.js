require('dotenv').config({ path: './sample.env' });
const { connectDB } = require('./src/scripts/connection.js'); 
const { runAPI } = require('./src/api_apollo_server.js')
const bodyParser = require('body-parser')

const cors = require('cors');
const helmet = require('helmet')

const express = require('express');
const app = express();

const port = process.env.PORT || 3001;


const corsOptions = {
  origin: 'https://text-videoblog.herokuapp.com',
  credentials: true
}

//MIDDLEWARES
app.use(bodyParser.json()) // for parsing application/json
app.use(cors());
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