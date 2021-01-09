const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const { json } = require('express')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Load a dynamic page
app.get('', (req, res) => {
    res.render('index', {
        title: 'Home',
        name: 'Yuvraj Sreepathi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yuvraj Sreepathi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is the help page.',
        title: 'Help Page',
        name: 'Yuvraj Sreepathi'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if(error){
            return res.send({ error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404 Page',
        name: 'Yuvraj Sreepathi',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Yuvraj Sreepathi',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => {
    console.log('Server is up on ' + port)
})