// File for interacting with the API's

const key = 'MmZdfc1peND3n4QaFUl62YrTcdKAw1da';

// get City Information
const getCity = async (city) => {

    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const query = `?apikey=${key}&q=${city}`;

    const response = await fetch(base + query);
    const data = await response.json();                             // extracted data (cityCode / locationKey) from citySearch API endpoint to get the weather information from the below weather API
    
    return data[0];                              // [0] coz the above citySearch API gives an array of most matching results for a city name, hence the 1st element in that array is the closest one for a particular city name
};

// get Weather Information
const getWeather = async (locationKey) => {

    const base = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`;
    const query = `?apikey=${key}`;

    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
};





// getCity('new york')                                          // So we used the getCity func to fetch the city data (basically city code i.e. location key) from API calling
//     .then(data => { return getWeather(data.Key)})           // Then we used this city code to fetch Weather API using getWeather func
//     .then(data => { console.log(data)})                     // The getWeather Promise returns the main required data to display Temp, status, etc.
//     .catch(err => { console.log(err)});