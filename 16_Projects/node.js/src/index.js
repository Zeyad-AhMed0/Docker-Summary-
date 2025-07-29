const express = require('express');
const mongoose = require('mongoose');
const redis = require('redis');
const os = require('os');

// init app
const port = 3000;
const app = express();


// connect to redis
const Redis_Port = 6379;
const Redis_Host = 'redis';
const redisClient = redis.createClient({
  url: `redis://${Redis_Host}:${Redis_Port}`, 
  
});

redisClient.on('connect', () => {
  console.log('Connected to Redis...');
});

redisClient.on('error', (err) => {
  console.log('Error connecting to Redis:', err);
});
redisClient.connect();

 

// connect to MongoDB
const DB_User = 'root';
const DB_Pass = 'example';
const DB_Port =  27017;
const DB_Host='mongo';


const URI = `mongodb://${DB_User}:${DB_Pass}@${DB_Host}:${DB_Port}`;
mongoose
  .connect(URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.log('Error connecting to MongoDB:', err))   ;


  // connect to Postgres
const { Client } = require('pg');
const PG_User = 'root';
const PG_Pass = 'example';
const PG_Port = 5432;
const PG_Host = 'postgres';
const PG_URI = `postgresql://${PG_User}:${PG_Pass}@${PG_Host}:${PG_Port}/postgres`;
const pgClient = new Client({
  connectionString: PG_URI,
});
clientconnect = () => {
  pgClient
  .connect()
  .then(() => console.log('Connected to Postgres...'))
  .catch((err) => console.log('Error connecting to Postgres:', err));
};

pgClient.connect()
  .then(() => console.log('Connected to Postgres...'))
  .catch((err) => console.log('Error connecting to Postgres:', err));

app.get('/', (req, res) =>{
  redisClient.set('products', 'products....');

  res.send('<h1>Hello World! hi zeyad ahmed.Welcome to development mode hi iam ENG zeyad. </h1>');
  console.log(`traffic is comming from ${os.hostname()}`);
});


app.get('/data', async (req, res) =>{
  const products = await redisClient.get('products');
  res.send(`<h1>Hello World! hi zeyad ahmed.Welcome to development mode hi iam zeyad. </h1> <h2>${products}</h2>`);
});


app.listen(port, '0.0.0.0', () => {console.log(`Server is running on port ${port}`);})     