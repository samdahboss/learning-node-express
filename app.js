import express from 'express'
import { config } from 'dotenv';

config()
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/courses',(req, res) =>{
  res.send([1,2,3,4,5])
});

app.get('/api/courses/:id', (req, res)=>{
  res.send(req.params)
})

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))