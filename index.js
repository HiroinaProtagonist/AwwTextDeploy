const express = require('express');
const bodyParser = require('body-parser');

const request = require('request');
const requestPromise = require('request-promise');
const { response } = require('express');

require('dotenv').config()
const twilioSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAUTH = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(
    twilioSID,
    twilioAUTH
);

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const path = require('path');

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

//Send back index.html for requests not explicitly covered
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

//routes
// app.get('/hello', (req, res) => {
//   res.send('hello');
// });

app.post('/api/mmsmessages', (req, res) => {
    const options = {
        url: 'https://www.reddit.com/r/aww/top.json?t=day&limit=1',
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type':'application/json'
        }
    };

    return requestPromise(options)
        .then(function(body) {
            
            //Get reddit data
            let redditData = JSON.parse(body);
            console.log(redditData);

            console.log("Title: " + redditData.data.children[0].data.title + ' (' +
                redditData.data.children[0].data.permalink + ')');
            console.log("Image URL: " + redditData.data.children[0].data.url);
            console.log("Is Video: " + redditData.data.children[0].data.is_video);
            console.log("Permalink: " + redditData.data.children[0].data.permalink);
            
            let isVideo = redditData.data.children[0].data.is_video;

            // send message with reddit data
            res.header('Content-Type', 'application/json');
            client.messages
            .create({
                from: process.env.TWILIO_PHONE_NUMBER,
                to: req.body.to,
                body: redditData.data.children[0].data.title + ': ' +
                'https://www.reddit.com' + redditData.data.children[0].data.permalink,

                //don't send media if media is a video (too large for mms)
                if(isVideo){ mediaUrl: [redditData.data.children[0].data.url]}
            })
            .then(() => {
                res.send(JSON.stringify({ success: true }));
            })
            .catch(err => {
                console.log(err);
                res.send(JSON.stringify({ success: false }));
            })
    
    }).catch(function(err){
        console.log(err);
    });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Express server is running on port ${port}.`);
});
