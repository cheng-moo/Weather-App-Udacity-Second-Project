
const apiKey = '&appid=787af776a608e4e74df00f3b4b2fdfa3&units=imperial';

// Generate button
const generate = document.getElementById('generate');
generate.addEventListener('click', getWeatherData);
function getWeatherData () {
        const zipCode = document.getElementById('zip').value;
        // API to get the temp from zipCode
        const tempBaseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=`;
        getData(tempBaseUrl, zipCode, apiKey)
        .then(data => {
            console.log(data);
            const today = new Date();
            const date = `${today.getDate()}/${today.getMonth() + 1 >= 10 ? `${today.getMonth() + 1}` : `0${today.getMonth() + 1}`}/${today.getFullYear()}`;
            const temp = Math.round((data.main.temp - 32) * 5/9);
            const feeling = document.getElementById('feelings').value;
            return {date, temp, feeling};
        }).then(data => {
        postData('/postWeatherData', data);
        updateUI();
    })
}


// getData from API method
const getData = async (url = '', data = '', apiKey = '') => {
    const response = await fetch(url + data + apiKey);
    if (response.status === 404) {
        document.getElementById('zip').classList.add('error');
    } else {

        document.getElementById('zip').classList.remove('error');
    }
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
// updateUI
const updateUI = async () => {
    const response = await fetch('/getWeatherData');
    try {
        const weatherData = await response.json();
        const date = document.getElementById('date');
        const temp = document.getElementById('temp');
        const content = document.getElementById('content');
        date.textContent = weatherData[weatherData.length - 1].date;
        temp.textContent =`${weatherData[weatherData.length - 1].temp}\u00B0C`;
        content.textContent = weatherData[weatherData.length - 1].feeling;
    } catch (error) {
        throw new Error(error);
    }
}
