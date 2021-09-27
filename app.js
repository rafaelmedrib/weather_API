const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

  var cityName = req.body.cityName;
  const query = cityName;
  const apiKey = "148bc02645ded7be731f0a25f412c4c1";
  const units = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<p>The current weather is " + description + "<p>");
      res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius.</h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    })
  });
})


app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
