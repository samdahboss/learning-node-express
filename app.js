import express from 'express'
const app = express()
import {env} from 'node:process'

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/api/courses',(req, res) =>{
  res.send([1,2,3,4,5])
});

//PORT
const port = env.PORT || 3000;
console.log(env.PORT);
app.listen(port, () => console.log(`Listening on port ${port}...`))