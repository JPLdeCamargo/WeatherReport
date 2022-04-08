const express = require("express");
const https = require("https");
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){

    res.sendFile(`${__dirname}/index.html`)
    
})

app.post("/return", function(req, res){
    res.redirect("/")
})

app.post("/", function(req, res){
    const config = require('/config')
    console.log(req.body.cityName)
    city = req.body.cityName
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${config.key}&units=metric`
    https.get(url, function(response){

        if (Math.floor(response.statusCode/100) === 4){
         res.sendFile(`${__dirname}/notFound.html`)
        }
        else{
            response.on("data", function(data){
                const weatherData = JSON.parse(data);
                console.log(weatherData);
                const temp = weatherData.main.temp;
                const description = weatherData.weather[0].description;
                const imgid = weatherData.weather[0].icon;
                const imgUrl = `http://openweathermap.org/img/wn/${imgid}@2x.png`;
                
                
                res.render("weather", {weatherDescription: description, cityName: city, tempCelcius: temp, imgLink: imgUrl});
           })
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000.");
})
