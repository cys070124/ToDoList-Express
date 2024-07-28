const express = require('express')
const app = express()
const { MongoClient } = require('mongodb')

let db
const url = ''
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('')
}).catch((err)=>{
  console.log(err)
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Test')
})

