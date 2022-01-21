// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

let jsonObject = {}
// your first API endpoint... 
app.get("/api/:time", function (req, res) {
  let time = req.params.time;
  let date = new Date(time)

  if(!time.match(/\d{5,}/)) {
    jsonObject.unix = new Date(time).getTime();
    jsonObject.utc = new Date(time).toUTCString();
    // console.log(jsonObject)
    
  }
  else{
    time = parseInt(time);
    jsonObject.unix = new Date(time).getTime();
    jsonObject.utc = new Date(time).toUTCString();
    // res.json(jsonObject);
  }

  if(!jsonObject.unix || !jsonObject.utc)
    res.json({'error': 'Invalid Date'})

  // res.json({unix: '', utc: date.toUTCString()});
  res.json(jsonObject)
  
});

app.get('/api/', (req,res)=> {
  // console.log(req.path);
  res.json({unix: new Date().getTime(),utc: new Date().toUTCString()})
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
