// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=9b7c8a0aa1821a598968dfd5196ae74e&units=imperial";
const baseURL = "http://api.openweathermap.org/geo/1.0/zip?zip=";

let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();


// Event listener to add function to existing HTML DOM element (generate button)
const generate = document.getElementById("generate");
generate.addEventListener("click", start);


/* The function which will be called by event listener */
function start() {
    
    // first we use the Geocoding API to get the coordinates using zip code
    const zipField = document.getElementById("zip").value;
    const geocodingApiUrl = baseURL + zipField + apiKey;

    getInfoUsingUrl(geocodingApiUrl)

    // second we use the coordinates to get the weather data using current weather data API
    .then((value) => {
        
        console.log(value.name);
        const currentWeatherDataApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${value.lat}&lon=${value.lon}${apiKey}`;
        return getInfoUsingUrl(currentWeatherDataApiUrl);
        
    })

    // third we post the data to the server 
    .then((value) => {
        const data = {};
        data.temp = value.main.temp;
        data.feelings = document.getElementById("feelings").value;
        data.date = newDate;
        return postData("/add", data);
    })
    
    // then retrieve data from server
    .then(() => {
        return getInfoUsingUrl("/retrieve");
    })
    // finally we use the retrieved data to update the DOM
    .then((value) => {
        updateUI(value);
    })
}


/* Function to GET Web API Data*/
async function getInfoUsingUrl(url) {
    const response = await fetch(url);

    try{
        const newResponse = await response.json();
        console.log("geting information was a success");
        return newResponse;
    }catch(error) {
        console.log("There is an error with geting information");
    }
}


/* Function to POST data */
async function postData(url, data) {
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try{
        const newResponse = await response.json();
        console.log("posting data was a success");
        return newResponse;
    } catch(error) {
        console.log("There is an error with posting data");
    }
}


/* Function to update the ui with Project Data */
async function updateUI(data) {
    document.getElementById("date").innerHTML = "Today " + data.date;
    document.getElementById("temp").innerHTML = "temperature is " + Math.round(data.temp) + " degree";
    document.getElementById("content").innerHTML = data.feelings;
    console.log("updating the ui was a success")

}