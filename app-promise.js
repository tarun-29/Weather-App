//You Have to take your own geocoding api key and Weather api key to fetch some data
//this is same as app.js but by using axios and promise handeling
const yargs = require('yargs');
const axios = require('axios')

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

    console.log(argv)

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeurl=`https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=[]`

axios.get(geoCodeurl).then((response)=>{
    if(response.data.status==="ZERO_RESULTS"){
        throw new Error('Unable to find that address');//if this block will run then the below catch function will run
    }
        var address =  response.data.results[0].formatted_address,
            latitude = response.data.results[0].geometry.location.lat,
            longitude = response.data.results[0].geometry.location.lng
    var weatherUrl = `https://api.darksky.net/forecast/[key]/${latitude},${longitude}`
    console.log(address);
    return axios.get(weatherUrl)
}).then((response)=>{
    var temperature = response.data.currently.temperature
    var apparentTemperature = response.data.currently.apparentTemperature
    console.log(`It's Currently ${temperature} but it feels like ${apparentTemperature}`)
}).catch((e)=>{
    if(e.code=== "ENOTFOUND"){
        console.log('Unable to connect to API Servers');
    }else{
        console.log(e);
    }
})
