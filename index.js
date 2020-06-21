const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL
  //'postgres://postgres:marian@localhost/users'
  
})

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));


app.get('/database',(req,res) => {
  var getUsersQuery = `SELECT * FROM person`;
  pool.query(getUsersQuery, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows':result.rows}
    res.render('pages/db', results);
    res.render('pages/displayall', results);
  })
  
});

app.get('/database/display',(req,res) => {
  var getUsersQuery = `SELECT * FROM person`;
  pool.query(getUsersQuery, (error, result) => {
    if (error)
      res.end(error);
    var results = {'rows':result.rows}
    res.render('pages/displayall', results);
  })
  
});

//Adding
app.get('/database/add', (req, res) => {
  console.log("post request for /add");
  res.render('pages/adduser');
});

//Saving add
app.post('/database/add', (req, res) => {
  console.log("saving to database");
  var data = [req.body.fname, req.body.location, req.body.shoetype, req.body.condition, req.body.sizetype, req.body.size, req.body.colour, req.body.price, req.body.uid];
  var insertUsers = `INSERT INTO person(fname, location, shoetype, condition, sizetype, size, colour, price, uid) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
  console.log("start of insert");
  pool.query(insertUsers, data, (error, result) => {
    if(error)
      res.end(error);
    console.log("saved!");  
    res.redirect('/database');
  })
});

//Edit
app.get('/database/edit/:id', (req, res) => {
  console.log("start edit");

  var uid = req.params.id;
  var editUsers = `SELECT * FROM person WHERE uid=$1`;
  console.log("before edit");
  pool.query(editUsers, [uid], (error, result) => {
    if (error){
      res.end(error);
      console.log("error");
    }
    console.log("post request for /edit");
    var results = {'rows':result.rows}
    res.render('pages/editusers', results);
  })

});

//Edit Save
app.post('/database/edit/:id', (req, res) => {

  var data = [req.body.fname, req.body.location, req.body.shoetype, req.body.condition, req.body.sizetype, req.body.size, req.body.colour, req.body.price, req.body.uid, req.params.id];

  pool.query(`UPDATE person SET fname=$1, location=$2, shoetype=$3, condition=$4, sizetype=$5, size=$6, colour=$7, price=$8, uid=$9 WHERE uid=$10`, data, (error, result) => {
      if (error) {
          console.log("Error happening", error);
      }
      res.redirect('/database');
  });

});

//Delete
app.get('/database/delete/:id', (req, res) => {
  var uid = req.params.id;
  var deleteUsers = `DELETE FROM person WHERE uid=$1`;
  pool.query(deleteUsers, [uid], (error, result) => {
    if(error)
      console.log("error");
    res.redirect('/database');
  });
});


app.post('/adduser', (req, res)=>{
  console.log("post request for /adduser");
  var uname = req.body.uname;
  var age = req.body.age;
  res.send(`username: ${uname}, age: ${age}`);
});

app.get('/users/:id', (req, res)=> {
  var uid = req.params.id;
  console.log(req.params.id);
  // search the database using the uid
  res.send("got it!");
})

app.get('/database/user/:id', (req, res) => {
  console.log("start user id");

  var uid = req.params.id;
  var getUsers = `SELECT * FROM person WHERE uid=$1`;
  console.log("user id");
  pool.query(getUsers, [uid], (error, result) => {
    if (error){
      res.end(error);
      console.log("error");
    }
    console.log("post request for /users");
    var results = {'rows':result.rows}
    res.render('pages/userpage', results);
  })

});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
