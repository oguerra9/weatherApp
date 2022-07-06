//var weathHeadEl = $('.weathHead');
//var searchBtnEl = $('.searchBtn');
var weathHeadEl = document.getElementsByClassName('weathHead');
var searchBtnEl = document.getElementsByClassName('searchBtn');


var searchCity = ''; //get value from search bar form
var weatherKey = '7b1fd29f4dfe960f408499a3ed912ad0';
var weatherLink = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchCity + '&appid=' + weatherKey;





function searchCity () {

    searchCity = $('#searchForm :input');
    weathHeadEl.text(searchCity + ' ' + moment());
    getWeather(weatherLink);
    console.log (searchCity);
    console.log(getWeather(weatherLink));

}


function getWeather (weatherLink) {
    fetch(weatherLink)
        .then(function (response) {
            console.log(response);
            if (response.status === 200) {
                responseText.textContent = response.status;
            }
            return response.json();
       });
}

//getWeather(weatherLink);
$('#searchForm').on('click', '.searchBtn', searchCity);