//var weathHeadEl = $('.weathHead');
//var searchBtnEl = $('.searchBtn');
var weathHeadEl = document.querySelector('.weathHead');
var searchBtnEl = document.querySelector('.searchBtn');
var weatherDisplayEl = document.querySelector('.weatherDisplay');
var currWeathEl = document.querySelector('.currWeather');
var forecastEl = document.querySelector('.forecast');

var searchCity = ''; //get value from search bar form
var weatherKey = '7b1fd29f4dfe960f408499a3ed912ad0';
var weatherLink = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=' + weatherKey + '&units=imperial';


searchCityTest = 'Atlanta';
weatherLinkTest = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCityTest + '&appid=' + weatherKey + '&units=imperial';
var weathHeadTxt = document.createElement('h2');
weathHeadTxt.textContent = searchCityTest;
weathHeadEl.appendChild(weathHeadTxt);
// var iconUrl = 'http://openweathermap.org/img/w/04n.png';
// var iconImg = document.createElement('img');
// iconImg.setAttribute('src',iconUrl);
// weathHeadEl.appendChild(iconImg);

getWeather(weatherLinkTest);
console.log (searchCityTest);



function searchCity () {

    searchCity = $('#searchForm :input');
    weathHeadEl.text(searchCity + ' ' + moment());
    getWeather(weatherLink);
    console.log (searchCity);
    console.log(getWeather(weatherLink));
    weathHeadEl.textContent = searchCity;

}


function getWeather (weatherLink) {
    fetch(weatherLink)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                console.log('success');
                //responseText.textContent = response.status;
            }
            return response.json();
       })
       .then(function (data) {
            console.log(data);
            displayCurrWeather(data);
       });
}

function displayCurrWeather (data) {
    var currDate = new Date(data.dt * 1000);
    var dateLine = currDate.getMonth() + '/' + currDate.getDate() + '/' + currDate.getFullYear();
    weathHeadTxt.textContent += ' (' + dateLine + ')';
    //var weathDate = document.createElement('h2');
    //weathDate.textContent = dateLine;
    //weatherDisplayEl.appendChild(weathDate);
    console.log(dateLine);

    //temp
    var tempF = parseInt(data.main.temp);
    console.log(tempF);
    //display Temp
    var currTemp = document.createElement('p');
    currTemp.textContent = 'Temp: ' + tempF + ' F'; 
    currWeathEl.appendChild(currTemp);
    
    //wind speed
    var windSpeed = data.wind.speed;
    console.log(windSpeed);
    //display wind speed
    var currWind = document.createElement('p');
    currWind.textContent = 'Wind: ' + windSpeed + ' MPH'; 
    currWeathEl.appendChild(currWind);

    //humidity
    var humidity = data.main.humidity;
    console.log(humidity);
    //display humidity
    var currHumidity = document.createElement('p');
    currHumidity.textContent = 'Humidity: ' + humidity + '%'; 
    currWeathEl.appendChild(currHumidity);
    
    //icon
    var iconID = data.weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconID + '.png';
    var iconImg = document.createElement('img');
    iconImg.setAttribute('src',iconUrl);
    weathHeadEl.appendChild(iconImg);

    var coord = 'lat=' + data.coord.lat + '&lon=' + data.coord.lon;
    getForecast(coord);
}

function getForecast (coord) {
    var forecastLink = 'https://api.openweathermap.org/data/2.5/onecall?' + coord + '&appid=' + weatherKey + '&units=imperial';
    fetch(forecastLink)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                console.log('success');
                //responseText.textContent = response.status;
            }
            return response.json();
       })
       .then(function (data) {
            console.log(data);
            displayForecast(data);
       });

}

function displayForecast (data) {
    //curent UV index
    var uvi = data.current.uvi;
    //display UV index
    var currUVI = document.createElement('p');
    var uviValueEl = document.createElement('data');
    uviValueEl.className = 'd-inline-flex p-1';
    if (uvi >= 0 && uvi <=2) {
        uviValueEl.style.background = 'green';
        uviValueEl.style.color = 'white';
    }
    if (uvi > 2 && uvi <= 5)
        uviValueEl.style.background = 'yellow';
    if (uvi > 5) {
        uviValueEl.style.background = 'red';
        uviValueEl.style.color = 'white';
    }

    currUVI.textContent = 'UV Index: ';
    uviValueEl.textContent = uvi;
    currUVI.appendChild(uviValueEl); 
    currWeathEl.appendChild(currUVI);

    //daily forecast
    for (var i = 1; i <= 5; i++) {
        //create card
        var dayCard = document.createElement('div');
        dayCard.className = 'dayCard card';


        //forecast date
        var futDate = new Date(data.daily[i].dt * 1000);
        var futDateLine = futDate.getMonth() + '/' + futDate.getDate() + '/' + futDate.getFullYear();
        console.log(futDateLine);
        var foreDate = document.createElement('h4');
        foreDate.setAttribute('class','card-title');
        foreDate.textContent = futDateLine;
        dayCard.appendChild(foreDate);

        //forecast icon
        var futIcon = data.daily[i].weather[0].icon;
        var iconSpace = document.createElement('i');
        var iconUrl = 'http://openweathermap.org/img/w/' + futIcon + '.png';
        var iconImg = document.createElement('img');
        iconImg.setAttribute('src',iconUrl);
        iconSpace.appendChild(iconImg);
        dayCard.appendChild(iconSpace);
        
        //forecast temp
        var futTempF = data.daily[i].temp.day;
        var tempLine = document.createElement('p');
        tempLine.textContent = 'Temp: ' + futTempF + ' F';
        dayCard.appendChild(tempLine);
               

        //forecast wind
        var futWind = data.daily[i].wind_speed;
        var windLine = document.createElement('p');
        windLine.textContent = 'Wind: ' + futWind + ' MPH';
        dayCard.appendChild(windLine);

        //forecast humidity
        var futHumidity = data.daily[i].humidity;
        var humidLine = document.createElement('p');
        humidLine.textContent = 'Humidity: ' + futHumidity + '%';
        dayCard.appendChild(humidLine);


        forecastEl.appendChild(dayCard);
    }

}

//getWeather(weatherLink);
$('#searchForm').on('click', '.searchBtn', searchCity);

