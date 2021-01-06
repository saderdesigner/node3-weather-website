const request = require('../../node_modules/request')


const forecast = (longtitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6be8548a558cf8cb4796bb2181ef021e/' + latitude + ',' + longtitude
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to server!', undefined)
        } else if (response.body.error) {
            callback('Unable to find this location.', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.currently.summary + '. There is ' + response.body.currently.precipProbability + '% to rain.')
        }
    })
}

module.exports = forecast