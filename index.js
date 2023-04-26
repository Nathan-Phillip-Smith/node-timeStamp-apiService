// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
let cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", (req, res) => {
  res.json({ greeting: 'hello API' });
});




app.get("/api/:date", (req, res) => {
  let timeStamp = req.params.date
  if (Number(timeStamp)) {
    return res.json({ unix: Number(timeStamp), utc: new Date(Number(timeStamp)).toUTCString() })
  }
  if (new Date(timeStamp).toUTCString() !== 'Invalid Date') {
    return res.json({ unix: new Date(timeStamp).getTime(), utc: new Date(timeStamp).toUTCString() })
  }
  if (new Date(timeStamp).toUTCString() == 'Invalid Date') {
    return res.json({ error: "Invalid Date" })
  }
});
app.get("/api/", (req, res) => {
  return res.json({ unix: new Date().getTime(), utc: new Date().toUTCString() })
});



// listen for requests :)
let listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
