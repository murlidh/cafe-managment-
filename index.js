const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
// create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});


// connect to the MySQL database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error);
    } else {
        console.log('Connected to MySQL database!');
    }
});


app.get("/test", (req, res) => {

    let sql = `SELECT * FROM user_info`;
    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
        res.end()
    });  
});

app.put("/update/:id",(req,res)=>{
    let data =req.params
    console.log(data)
    let sql= `UPDATE user_info
    SET lastName = 'singh', City = 'india'
    WHERE PersonID='${data.id}';`
    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        console.log(results);
        res.send(results);
        res.end()
    }); 
})

app.delete("/delete/:id",(req,res)=>{
    let data= req.params
    console.log(data)
    let sql = `DELETE FROM user_info WHERE PersonID='${data.id}';`
    
    connection.query(sql,(error,results,fields)=>{
        if(error){
            return console.error(error.message);
        }
        else{
            console.log(results);
            res.send(results);
            res.end()
        }
    })
})


app.post("/create", (req, res) => {
 console.log(req.body)
 let data=req.body
    let sql = 
    `INSERT INTO user_info ( LastName, FirstName, Address, City)
     VALUES ('${data.LastName}','${data.FirstName}', '${data.Address}', '${data.City}');`


    connection.query(sql, (error, results, fields) => {
        if (error) {
            return console.error(error.message);
        }
        else{
            console.log(results);
             res.send(results);
              res.end()
        }
       
    });
   // res.send(results);
     // res.end()
    
});
// close the MySQL connection

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//connection.end();