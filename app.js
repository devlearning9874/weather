const express = require("express");
const https   = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req,res){
  const apiKey = "3d45a98cae2f11aa3179ea0c4f95b960";
  const query = req.body.cityName;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const cityTemperature = weatherData.main.temp;
      console.log(cityTemperature);
      const weatherDescription = weatherData.weather[0].description;
      console.log(weatherDescription);
      const icon = weatherData.weather[0].icon;
      const imageUrl =  "http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature of"+" "+  query  + " "+ "is:" +cityTemperature +"degree celcius.</h1>");
      res.write("<h2>Weather description is:"+ weatherDescription+"</h2>");
      res.write("<img src="+ imageUrl +">");
      res.send();
    })
  })
});



app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
