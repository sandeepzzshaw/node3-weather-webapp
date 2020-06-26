const request= require('request')

const forcast=(Latitude,Longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=8c264edc844300b49be66feef6a3cab5&query='+Latitude+','+Longitude+'&unit=f'
    request ({url,json:true},(error,{ body }={})=>{
        if(error){
            callback('Unable to connect to weather server!!',undefined)
        }else if(body.error){
            callback('Unable to find the location',undefined)
        }else{
            callback(undefined, body.current.weather_descriptions +' .It is currently ' + body.current.temperature +' degree out. It feels like '+ body.current.feelslike+' degree. Humidity ='+body.current.humidity)

        }
        
    })
}

module.exports = forcast