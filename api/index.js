import express from 'express'
import dotenv from 'dotenv';
import userFunctions from './users';

// Server EXPRESS
const app = express();

// Comunicating with JSON
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// Enviroment Variables
dotenv.config()

// API home route, static message
app.get('/api', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.json({success: true,data: "Hello im the API"});
  });

// API routes for users
app.use('/api/users', async() => {
    await userFunctions()
})

// Serving
const port = process.env.PORT || 4477
app.listen(port, () => {
    console.log('Serving at '+port)
})
