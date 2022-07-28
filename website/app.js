

const apiKey = '&appid=787af776a608e4e74df00f3b4b2fdfa3&units=imperial';

// Generate button
const generate = document.getElementById('generate');
generate.addEventListener('click', getWeatherData);
function getWeatherData () {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    // API to get latitude and longitude from zipcode
    const latLonBaseUrl = `http://api.openweathermap.org/geo/1.0/zip?zip=`;
    // API to get the temp
    const tempBaseUrl = `https://api.openweathermap.org/data/2.5/weather?`;
    getData(latLonBaseUrl, zipCode, apiKey)
    .then(data => {
        // consume latitude and longitude info
        const lat = data.lat;
        const lon = data.lon;
        // use lat and lon data to get temp info from the API
        getData(tempBaseUrl, `lat=${lat}&lon=${lon}`, apiKey)
        .then(tempData => {
            // create a new Date Obj and take date info from it
            const today = new Date();
            const date = `${today.getDay()}/${today.getMonth() + 1 >= 10 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`}/${today.getFullYear()}`;
            // get temp data in fahrenheit convert it to celsius
            const celsiusTemp = Math.round((tempData.main.temp - 32) * 5/9);
            console.log(celsiusTemp);
            postData('/postWeatherData', {date: date, temp: celsiusTemp, feeling: feelings});
        })
    })

}
// getData from API method
const getData = async (url = '', data = '', apiKey = '') => {
    const response = await fetch(url + data + apiKey);
    try {
    const data = await response.json();
    return data;
    } catch (error) {
        throw new Error(error);
    }
};
// postData from API method
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        throw new Error(error);
    }
}