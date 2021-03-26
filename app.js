const mongoclient = require('mongodb').MongoClient
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }))
const port = process.env.PORT || 3000

mongoclient.connect('mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority', {
    useUnifiedTopology: true
})

    .then(client => {
        console.log('Connected to database')
        const db = client.db('AttendanceDB')
        const teachers = db.collection('Teachers')

        app.set('view engine', 'ejs')
        app.listen(port, function (req, res) {
            console.log('server is running')
        })
        app.get('/', function (req, res) {
            res.render('index.ejs')
        })
        app.get('/toys', function (req, res) {
            res.render('toys.ejs')
        })

        app.set('views', __dirname + '/views');
        app.get('/links', function (req, res) {
            teachers.find().toArray()
                .then(result => {
                   
                        console.log(result)
                        res.render('links.ejs', { Result: result })
         
                })
                .catch(error => {
                    console.error(error)
                })
        })

        app.post('/links', function (req, res) {
            if (req.body.code == "HIXS"){
                teachers.insertOne(req.body)
                .then(result => {
                    res.redirect('/links')
                })


                .catch(error => {
                    console.error(error)
                })
            }
            else{
                res.render('sos.ejs')
             }
            
        })
        app.post('/toys', function (req, res) {
            teachers.insertOne(req.body)
                .then(result => {
                    res.redirect('/cart')
                })


                .catch(error => {
                    console.error(error)
                })
        })
    })











