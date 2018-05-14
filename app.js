const express = require('express');
const path = require('path');
const http = require('http');
const port = 3000;
var app = express();

app.use(express.static(__dirname+"/public"));

app.get('/',(req,res) =>{
	res.sendFile(path.join(__dirname+'/views/index.html'));
});
app.get('/draw',(req,res) =>{
	res.sendFile(path.join(__dirname+'/views/draw/draw.html'));
});
app.get('/login',(req,res)=>{
	res.sendFile(path.join(__dirname+'/views/login.html'));
});
// // /bad - send back json with errorMessage
// app.get('/bad', (req, res) => {
// 	res.send({
// 		errorMessage: 'Unable to handle request'
// 	});
// });
app.get('*',(req,res)=>{
	res.status(404).send("Page not found :(");
});

app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});