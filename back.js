const express = require('express');
const path = require("path");
const fs=require("fs");
const app = express();
const port = 80;
//serving staaic file
app.use('/static', express.static('static'));
app.use(express.urlencoded())
const bodyParser = require('body-parser');
 app.use(bodyParser.json()) // for parsing application/json
 app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//set the templets engine at pug
app.set('view engine', 'pug')
//set viwes directry
app.set('views', path.join(__dirname, 'views'));

var db=require("./backend.js");

//our pug demo endpoint 
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game'}
    res.status(200).render('index.pug', params);

});
app.get('/insert', (req, res)=>{
     
    res.status(200).send('insert hello hfhgfhfhfdfhfdhgdgdgdg');
});
app.post('/insert', (req, res)=>{
      var t_i = req.body.Admin_id;
      var t_id = req.body.Admin_f_N;
    var t_date = req.body.Admin_m_N; 
    var t_dat = req.body.Admin_l_N;
    var t_amount = req.body.Admin_emailid;
    var p_id = req.body.Admin_contNo;
    var  ad_ad = req.body.Admin_add;
  

    var sql =` INSERT INTO Admin (Admin_id ,
        Admin_f_N ,
         Admin_m_N  ,
        Admin_l_N  ,
         Admin_emailid ,
         Admin_contNo ,
         Admin_add) VALUES ("${t_i}","${t_id}", "${t_date}", "${t_dat}","${t_amount}", "${p_id}","${ad_ad}")`;
    db.query(sql, function(err, result) {
      if (err) throw err;
      console.log('record inserted');
       
     res.render('index.pug');
    });
    // var sql =` INSERT INTO table1 (contact_id ,
    //     contact_N
    //     ) VALUES ("${t_i}","${t_id}")`;
    // db.query(sql, function(err, result) {
    //   if (err) throw err;
    //   console.log('record inserted');
    //   res.render('index.pug');
    // });
   
});
// app.post('/view', (req, res)=>{
   
//       res.render('view.pug');
//     });

app.post("/view", function (req, res) {
 
    var sql = `Select *from Admin`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("record  found");
      res.render('view.ejs',{data:result});
    });
  });


  app.post("/delete", function (req, res) {
    var t_i = req.body.Admin_id;
    var sql = `delete from admin where Admin_id = ${t_i}`;
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("record deleted");
      res.send(`rows deleted:${t_i}`);
    });
  });


  app.post("/update", function (req, res) {
    var t_i = req.body.New_Admin_id;
     
  var t_i1 = req.body.Previous_Admin_id;

  var sql = `update admin set  Admin_id =${t_i} where Admin_id = ${t_i1}`;
   
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("record updated.");
      res.send(`updated .....`);
    });
  });

  app.post("/update1", function (req, res) {

    var t_i1 = req.body.Pre_Admin_f_N;
    var t_i = req.body.New_Admin_f_N;

  var sql = `update admin set  Admin_f_N ="${t_i}" where Admin_f_N = "${t_i1}"`;
   
    db.query(sql, function (err, result) {
      if (err) throw err;
      console.log("record deleted");
      res.send(`updated .....`);
    });
  });


  app.post("/exports", function (req, res) {
    var file = req.body.set;
    console.log(file);
    exp_q = `SELECT * from  Admin 
    INTO OUTFILE 'C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${file}'
    FIELDS ENCLOSED BY '"'
    TERMINATED BY ';'
    ESCAPED BY '"'
    LINES TERMINATED BY '\r\n'
    `;
    db.query(exp_q, function (err, result) {
      if (err) throw err;
      else {
        res.send(
          `C:/ProgramData/MySQL/MySQL Server 8.0/Uploads/${file}`
        );
      }
    });
  });

 
  
 
 
     

app.listen(port, () => {
    console.log(`the application started succesfullay on port ${port}`);
});