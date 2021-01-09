const request = require('postman-request')


const forecast = (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=ec4f18182a02c9ff64f7b70efa96ea3e&query=' + 
    longitude + ',' + latitude + '&units=f'  

    request({ url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }
        else if(body.error){
            callback('Invalid coordinates. Try another search.', undefined)
        }
        else{
            callback(undefined, body.current.weather_descriptions[0] + 
                 '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' 
                 + body.current.feelslike + ' degrees. The daily humidity is ' + body.current.humidity
                 + '.')
        }
    })
}

module.exports = forecast
