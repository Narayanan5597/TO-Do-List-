const express = require('express');
const webpush = require('web-push');

const app = express();
const port = 3001; 

let pushSubscription;


// Replace these with the VAPID keys you have generated and stored
const vapidPublicKey = 'BJR4KNzjQMX-usEn9bV_jbqAPPwkk5NiTRMEYAA4k9HVE94en-_vz2an6TTPUDmewurLrC7owdGUybm138DZ6Uk';
const vapidPrivateKey = 'pApGhcbGzaReujmTNDZJ-JnEm6AUxSLLXWhXfZhCc8k';

app.use(express.static('public'));
app.use(express.json()); // For parsing application/json

webpush.setVapidDetails(
    'mailto:chelseaindru@gmail.com',
    vapidPublicKey,
    vapidPrivateKey
);


app.post('/subscribe', (req, res) => {
  pushSubscription = req.body;
  res.status(201).json();
});

app.post('/notify', (req, res) => {
    const payload = JSON.stringify({ title: 'Test', body: 'This is a test notification' });
  
    webpush.sendNotification(pushSubscription, payload)
      .then(result => console.log(result))
      .catch(e => console.log(e.stack));
  
    res.status(200).json();
  });
  

// Add your routes here

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
