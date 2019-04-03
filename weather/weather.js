const request = require('request');

const getWeather = (latitude,longitude, callback)=>{
    request({
        url: `https://api.darksky.net/forecast/[key]/${latitude},${longitude}`,
        json: true
    }, (error, response, body)=>{
        if(error){
            callback('Unable to connect to forecast.io server')
            // console.log();
        }
        else if(response.statusCode==400){
            callback('Unable to fetch Weather')
            // console.log();
        }
        else if(!error && response.statusCode===200){
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            })
        }
    })    
}

module.exports = {
    getWeather
}

