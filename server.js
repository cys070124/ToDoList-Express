const express = require('express')
const app = express()
const {MongoClient , ObjectId} = require('mongodb')

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let db
const url = ''
new MongoClient(url).connect().then((client)=>{
  console.log('DB연결성공')
  db = client.db('todolist_express')
}).catch((err)=>{
  console.log(err)
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

//조회
app.get('/list', async (req, res) => {
  let result = await db.collection('list').find().toArray()
  res.render('index.ejs', { posts : result })
})

//추가
app.post('/add', async (req, res) => {
  try{
    if(req.body.content==''){
      res.send('내용을 입력하지 않았습니다.')
    }
    else{
      await db.collection('list').insertOne({content : req.body.content})
      res.redirect('/list')
    }
  }
  catch(e){
    res.status(500).send('Server error')
  }
})
/*
app.get('/detail/:id', async (req, res) => {
  let result = await db.collection('list').findOne({_id : new ObjectId(req.params.id)}) 
  console.log(result)
  res.render('detail.ejs')
})
*/
//삭제
app.get('/delete/:id', async (req, res) => {
  let result = await db.collection('list').deleteOne({_id : new ObjectId(req.params.id)})
  res.redirect('/list')
})