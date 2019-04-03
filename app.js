const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, result)=>{
    if(errorMessage){
        console.log(errorMessage);
    }else{
        var parameterString = result;
        console.log(parameterString)
        // console.log(parameterString.latitude);
        weather.getWeather(parameterString.latitude,parameterString.longitude,(errorMessage, weatherresult)=>{
        if(errorMessage){
            console.log(errorMessage)
        }
        else{
            console.log(`it Currently ${weatherresult.temperature}. it feels like ${weatherresult.apparentTemperature}`)
        }
        })
    }
})
