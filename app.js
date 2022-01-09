const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");//1.pacote que foi intalado para pegar as info da form pelo nome do input.

const app = express();

app.use(bodyParser.urlencoded({ extended:true}));//2.pacote que foi intalado para pegar as info da form pelo nome do input.

app.get("/", function( req , res){
  //linka com a form que tem na index.html
  res.sendFile(__dirname + "/index.html");
});



//pegar a info que foi digitada na form(formulário)em index.html

app.post("/",  function(req, res ){

// link da API com info ao vivo
const query = req.body.cityName;
const apiKey = "1db01cd9a210e62c6cf93db5da1e60ff";
const unit = "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +" &units="+unit;

// https com os dados em formato de JSON
https.get(url, function(response){
  console.log(response.statusCode);

  response.on("data",function(data){

    //Dados em no formato JSON sendo transformado (parse) em Javascrip objeto para depois especificar as informações que quero(linhas abaixo)
    const weatherData = JSON.parse(data);

    //Dados especificos que quero da API
    const temp = weatherData.main.temp;
    const weatherDescription = weatherData.weather[0].description;
    const icon= weatherData.weather[0].icon;//1. desenho, icone
    const imageUrl= "http://openweathermap.org/img/wn/"+ icon + "@2x.png"; // é preciso da url do icone para que seja atualizado junto com o tempo.

    //enviando as info para o browser
    res.write("<p>The weather is currently " + weatherDescription + " </p>");
    res.write("<h1>A temperatura em " +query+ " é "+ temp + "celsus</h1>")
    res.write("<img src="+ imageUrl +" >");//colocar a tag img, ela é self closing tag.

    res.send()// só pode ter um send para cada app.get por esse motivo usa-se res.write

  })
})


})


app.listen(3000, function(){

  console.log("Server is running on port 3000")
});
