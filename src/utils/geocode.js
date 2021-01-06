const request = require('../../node_modules/request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2FkZXJkZXNpZ25lciIsImEiOiJja2poMDNhbWcxY2x0MnRwZGRicTF1NDg4In0.8Sj8QbGAbsnZVLfskKbbkA&limit=1'
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to services server!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find this location. Please try another search.', undefined)
        } else {
            callback(undefined, {
                longtitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode