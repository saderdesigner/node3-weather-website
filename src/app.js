const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

const app = express()
const port = process.env.PORT || 3000


const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sader'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Sader'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help text contents',
        title: 'Help',
        name: 'Sader'
    })
})





app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide an address!'
        })
    }

    address = req.query.address

    geocode(address, (error, data) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        
        forecast(data.longtitude, data.latitude, (error, dataForecast) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                location: data.location,
                forecast: dataForecast,
                address: address
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        errorMessage: '404 error',
        name: 'Sader'
    })
})

app.listen(port, () => {
    console.log('Server is running at port ' + port +'...')
})