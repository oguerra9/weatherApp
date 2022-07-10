var bodyEl = document.querySelector('body');
var weathHeadEl = document.querySelector('.weathHead');
var searchBtnEl = document.querySelector('.searchBtn');
var weatherDisplayEl = document.querySelector('.weatherDisplay');
var currWeathEl = document.querySelector('.currWeather');
var forecastEl = document.querySelector('.forecast');
var backImageEl = document.querySelector('.backImage');
var searchFormEl = document.getElementById('searchForm');
var cityInputEl = document.getElementById('cityInput');
var weathInfoEl = document.querySelector('.weathInfo');
var pastSearchesEl = document.querySelector('.pastSearches');

var searchCity = ''; //get value from search bar form
var weatherKey = '7b1fd29f4dfe960f408499a3ed912ad0';
var weatherLink = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=' + weatherKey + '&units=imperial';


searchCityStart = 'Atlanta';
weatherLinkStart = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCityStart + '&appid=' + weatherKey + '&units=imperial';

weathHeadEl.textContent = searchCityStart;

getWeather(searchCityStart);
console.log (searchCityStart);
pastSearchesEl.innerHTML = '';
displayCities();


var cities = [];


function citySearch(event) {

    event.preventDefault();
    searchCity = cityInputEl.value;

    //loading new searched city into local storage
    if ( localStorage.getItem('cities') == null ) {
        cities = [searchCity];
    }
    else {
        cities = JSON.parse(localStorage.getItem('cities'));
        cities.unshift(searchCity);
    }
    //max 5 past searches displayed at once
    if (cities.length > 5) {
        cities.pop();
    }
    localStorage.setItem('cities', JSON.stringify(cities));

    getWeather(searchCity);
}

function displayCities() {
    if ( localStorage.getItem('cities') == null) {
        return;
    }
    else {
        cities = JSON.parse(localStorage.getItem('cities'));
        for (var i = 0; i < cities.length; i++) {
            var cityBtn = document.createElement('button');
            cityBtn.className = 'pastBtn mb-2';
            cityBtn.innerHTML = cities[i];
            pastSearchesEl.appendChild(cityBtn);

            cityBtn.addEventListener("click", function(event) {
                var element = event.target;
                getWeather(element.innerHTML);
            });

        }
    }
}

// pastSearchesEl.addEventListener("click", function(event) {
//     var element = event.target;
//     getWeather(element.innerHTML);
// });


function getWeather (cityName) {
    weathHeadEl.innerHTML = '';
    weathInfoEl.innerHTML = '';
    forecastEl.innerHTML = '';
    pastSearchesEl.innerHTML = '';
    weathHeadEl.textContent = cityName;
    weatherLink = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=' + weatherKey + '&units=imperial';
    displayCities();

    console.log(cityName);
    fetch(weatherLink)
        .then(function (response) {
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
    // weathHeadTxt.textContent += ' (' + dateLine + ')';
    weathHeadEl.textContent += ' (' + dateLine + ')   ';
    //var weathDate = document.createElement('h2');
    //weathDate.textContent = dateLine;
    //weatherDisplayEl.appendChild(weathDate);



    var weatherType = data.weather[0].main;
    console.log(weatherType);
    var currTime = parseInt(data.dt);
    var sunrise = parseInt(data.sys.sunrise);
    var sunset = parseInt(data.sys.sunset);
    if (currTime > sunrise && currTime < sunset) { //day time
        console.log('day time');
        if (weatherType == "Mist") {
            //currWeathEl.style.backgroundImage = "url('https://cloudfront-us-east-1.images.arcpublishing.com/gray/JFDZ7U577FFBTCTSLUKDQDSAYQ.png')";
            backImageEl.setAttribute('src','assets/images/mist.png');
            //bodyEl.className = 'misty';
        }
        if (weatherType == 'Thunderstorm') {
            //currWeathEl.style.backgroundImage = "url('assets/images/thunderstorm.jpg')";
            backImageEl.setAttribute('src','assets/images/thunderstorm2.gif');
        }
        if (weatherType == 'Fog') {
            backImageEl.setAttribute('src','assets/images/rolling-fog.gif');
        }
        if (weatherType == 'Clouds') {
            var cloudDescript = data.weather[0].description;
            console.log(cloudDescript);
            if (cloudDescript == 'few clouds') {
                backImageEl.setAttribute('src','assets/images/few-clouds.png');
                //backImageEl.setAttribute('src','https://mixkit.imgix.net/videos/preview/mixkit-clouds-in-a-clear-sky-9468-0.jpg?q=80&auto=format%2Ccompress');
            }
            if (cloudDescript == 'scattered clouds') {
                backImageEl.setAttribute('src','assets/images/scattered-clouds.jpg');
            }
            if (cloudDescript == 'broken clouds') {
                backImageEl.setAttribute('src','assets/images/broken-clouds.jpg');
            }
            if (cloudDescript == 'overcast clouds') {
                backImageEl.setAttribute('src','assets/images/overcast4.jpg');
            }
        }
        if (weatherType == 'Rain') {
            backImageEl.setAttribute('src', 'assets/images/rain4.gif');
        }
        if (weatherType == 'Drizzle') {
            backImageEl.setAttribute('src','assets/images/drizzle2.gif');
        }
        if (weatherType == 'Clear') {
            backImageEl.setAttribute('src','assets/images/clear-sky.jpg');
        }
        if (weatherType == 'Snow') {
            backImageEl.setAttribute('src','assets/images/snow.gif');
        }        
    }
    else { //night time
        console.log('night time');
        if (weatherType == "Mist") {
            //currWeathEl.style.backgroundImage = "url('https://cloudfront-us-east-1.images.arcpublishing.com/gray/JFDZ7U577FFBTCTSLUKDQDSAYQ.png')";
            backImageEl.setAttribute('src','assets/images/mist-night.jpg');
            //bodyEl.className = 'misty';
        }
        if (weatherType == 'Thunderstorm') {
            //currWeathEl.style.backgroundImage = "url('assets/images/thunderstorm.jpg')";
            backImageEl.setAttribute('src','assets/images/thunderstorm-night.jpg');
        }
        if (weatherType == 'Clouds') {
            var cloudDescript = data.weather[0].description;
            console.log(cloudDescript);
            if (cloudDescript == 'few clouds') {
                backImageEl.setAttribute('src','assets/images/few-clouds-night.jpg');
            }
            if (cloudDescript == 'scattered clouds') {
                backImageEl.setAttribute('src','assets/images/scattered-clouds-night.jpg');
            }
            if (cloudDescript == 'broken clouds') {
                backImageEl.setAttribute('src','assets/images/broken-clouds-night.jpg');
            }
            if (cloudDescript == 'overcast clouds') {
                backImageEl.setAttribute('src','assets/images/overcast-night.jpg');
            }
        }
        if (weatherType == 'Rain') {
            backImageEl.setAttribute('src', 'assets/images/rain-night.jpg');
        }
        if (weatherType == 'Drizzle') {
            backImageEl.setAttribute('src','assets/images/drizzle-night.jpg');
        }
        if (weatherType == 'Clear') {
            backImageEl.setAttribute('src','assets/images/clear-night.jpg');
        }
        if (weatherType == 'Snow') {
            backImageEl.setAttribute('src','assets/images/snow-night.gif');
        }

    }
    


    

    //temp
    var tempF = parseInt(data.main.temp);
    //display Temp
    var currTemp = document.createElement('p');
    currTemp.textContent = 'Temp: ' + tempF + ' F'; 
    weathInfoEl.appendChild(currTemp);
    
    //wind speed
    var windSpeed = data.wind.speed;
    //display wind speed
    var currWind = document.createElement('p');
    currWind.textContent = 'Wind: ' + windSpeed + ' MPH'; 
    weathInfoEl.appendChild(currWind);

    //humidity
    var humidity = data.main.humidity;
    //display humidity
    var currHumidity = document.createElement('p');
    currHumidity.textContent = 'Humidity: ' + humidity + '%'; 
    weathInfoEl.appendChild(currHumidity);
    
    //icon
    var iconID = data.weather[0].icon;
    var iconUrl = 'http://openweathermap.org/img/w/' + iconID + '.png';
    var iconImg = document.createElement('img');
    iconImg.setAttribute('src',iconUrl);
    iconImg.className = 'ml-1 mr-1';
    weathHeadEl.appendChild(iconImg);

    // //thunderstorm
    // if (iconID == '11d') {
    //     backImageEl.setAttribute('src','assets/images/thunderstorm.jpg');
    // }
    // //drizzle
    // if (iconID == '09d') {
    //     backImageEl.setAttribute('src','assets/images/thunderstorm.jpg');
    // }

    var weathCondition = document.createElement('h4');
    weathCondition.textContent = '   - ' + data.weather[0].description;
    weathCondition.className = 'm-0';
    weathHeadEl.appendChild(weathCondition);

    var coord = 'lat=' + data.coord.lat + '&lon=' + data.coord.lon;
    getForecast(coord);
}

function getForecast (coord) {
    var forecastLink = 'https://api.openweathermap.org/data/2.5/onecall?' + coord + '&appid=' + weatherKey + '&units=imperial';
    fetch(forecastLink)
        .then(function (response) {
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
    uviValueEl.className = 'd-inline-flex';
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
    weathInfoEl.appendChild(currUVI);

    //daily forecast
    for (var i = 1; i <= 5; i++) {
        //create card
        var dayCard = document.createElement('div');
        dayCard.className = 'dayCard card p-2';


        //forecast date
        var futDate = new Date(data.daily[i].dt * 1000);
        var futDateLine = futDate.getMonth() + '/' + futDate.getDate() + '/' + futDate.getFullYear();
        var foreDate = document.createElement('h4');
        foreDate.setAttribute('class','card-title pb-2 m-0');
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
searchFormEl.addEventListener('submit', citySearch);

