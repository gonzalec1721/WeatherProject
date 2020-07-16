const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "23438516a57949fb3dddf76677439d6f"
  const unit = "imperial"
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + unit + "&appid=" + apiKey

  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data)
      const temp = Math.round(weatherData.main.temp)
      const description = weatherData.weather[0].description
      const icon = weatherData.weather[0].icon
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Fahrenheit</h1>")
      res.write("<i>The weather is currently " + description + "<br>")
      res.write("<img src=" + imageURL +">")
      res.send()
    })
  })

})




app.listen(3000, function(){
  console.log("Server is running on port 3000.")
})
