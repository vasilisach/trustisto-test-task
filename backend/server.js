const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccount/serviceAccountKey.json");

const app = express();
const port = process.env.PORT || "3000";

app.use(express.json());
app.use(cors());

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://stolen-bikes-57254.firebaseio.com"
});

const db = admin.firestore()

app.get("/notifications", (req, res) => {
    db.collection('notifications').orderBy('createdAt').get().then(result => {
        res.set("Access-Control-Allow-Origin", "*").status(200)
            .json(result.docs.map(doc => {
                let id = doc.id
                return {...doc.data(), id}
            }));
    }).catch((error) => {
        res.send(400).json(error);
    })
});

app.post('/add', (req, res) => {
    db.collection('notifications').doc().set({
        title: req.body.title,
        message: req.body.message,
        createdAt: req.body.createdAt
    }).then(() => {
        res.json('Notification added');
    }).catch((error) => {
        res.send(400).json(error);
    })
})

app.delete('/notifications/:id', (req, res) => {
    let id = req.params.id 
    db.collection('notifications').doc(id).delete().then(() => {
        res.json('Notification deleted')  
    }).catch((error) => {
        res.send(400).json(error);
    })
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});