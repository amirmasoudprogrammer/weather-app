import getweatherdata from "../utils/httpRes.js";
import {removemodal, showMOdal} from "../utils/modal.js";
const DAYS = [
    "Seturday",
    "Monday",
    "Thursday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Seturday"
];

const input = document.querySelector("input")
const button = document.querySelector("button")
const weathers = document.getElementById("weather")
const forecast = document.getElementById("forecast")
const locationimg = document.getElementById("location")
const modalbutton=document.getElementById("modal-button")


const renderapp = (data) => {
    const weatherJSX = `
  <h2>${data.name},   ${data.sys.country}</h2> 
  <div id="main">
  <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="weather-img">
  <span>${data.weather[0].main}</span>
  <span>${Math.round(data.main.temp)} °C</span>
</div>
<div id="info"> 
<p> Humidity</p>: <span>${data.main.humidity}%</span>
 <p> wind Speed</p>: <span>${data.wind.speed} m/s</span> 

</div> 

`
    weathers.innerHTML = weatherJSX
}


const startbutton = async () => {
    const inputValue = input.value

    if (!inputValue) {
        showMOdal("هیچ شهری را وارد نکردید")
        return
    }
    const dataApp = await getweatherdata("current",inputValue)
    renderapp(dataApp)
    const forecastdata = await getweatherdata("forecast",inputValue)
    renderfoercast(forecastdata)
}


const positioncallback = async (position) => {
    const {latitude, longitude} = position.coords
    const currentData = await getweatherdata("current",position.coords)
    renderapp(currentData)
    const datamap = getweatherdata("forecast",position.coords)
    renderfoercast(datamap)
}
const errorcallback = (error) => {
   showMOdal(error.message)
}


const locationhandlar = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(positioncallback, errorcallback)
    } else {
       showMOdal("your browser does  not support geolocation")
    }

}

const getweekdays = (data) => {

return DAYS[new Date(data * 1000).getDay()]

}

const renderfoercast = (data) => {
    forecast.innerHTML=""
    data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"))
    data.forEach((i) => {
        const foercastjsx =
            `
        <div>
       <img src="https://openweathermap.org/img/w/${i.weather[0].icon}.png" alt="weather-img">
       <h3>${getweekdays(i.dt)}</h3>
        <p>${Math.round(i.main.temp)} °C</p>
        <span>${i.weather[0].main}</span>
</div> 
        `
        forecast.innerHTML += foercastjsx
    })


}

button.addEventListener('click', startbutton)
locationimg.addEventListener("click", locationhandlar)
modalbutton.addEventListener("click",removemodal)