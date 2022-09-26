
import React from 'react'
import { useState } from 'react'
import {BiWind} from "react-icons/bi"
import {FaCloud,FaRulerVertical,FaThermometer,FaTint,FaTemperatureLow,FaTemperatureHigh} from "react-icons/fa"

const WeatherCard = ({ weather, temperature ,temp_min, temp_max}) => {

  const [isCelsius, setIsCelsius] = useState(true)

  const changeTemperature = () => setIsCelsius(!isCelsius)

  const date = new Date()

  const hour = new Date()

  return (
    <article className='Box'>

      <h1 className='title'>Weather App</h1>
      
     
        <h2 className='subtitle'>{weather.name}, {weather.sys.country}</h2>
        <h2 className='date'>{date.toLocaleDateString("en-us", {weekday:"long",year:"numeric",month:"short",day:"numeric"})}</h2>
        <h2 className='hour'id='time'>{hour.toLocaleTimeString("en-US")}</h2>
     
      <div className='Box-img'>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
      </div>

      <div className='details'>
        <h2 className='details-description'>"{weather.weather[0].description}"</h2>
        <ol>
          <li><span> <BiWind/> Wind Speed: </span>{weather.wind.speed} m/s</li>
          <li><span> <FaCloud/> Clouds: </span>{weather.clouds.all} %</li>
          <li><span><FaRulerVertical/>Pressure: </span>{weather.main.pressure} hPa</li>
          <li><span><FaTint/>Humidity: </span>{weather.main.humidity} %</li>
          <li><span><FaTemperatureLow/>Temp-min: </span>{isCelsius ? `${temp_min.temp_minC} °C` : `${temp_min.temp_minF} °F`}</li>
          <li><span><FaTemperatureHigh/>Temp-max: </span>{isCelsius ? `${temp_max.temp_maxC} °C` : `${temp_max.temp_maxF} °F`}</li>
        </ol>
      </div>

      <h2 className='temperature'><FaThermometer/>{isCelsius ? `${temperature.celsius} °C` : `${temperature.farenheit} °F`}</h2>
      <button className='btn-change' onClick={changeTemperature}>{isCelsius ? "Change to °F" : "Change to °C"}</button>

    </article>
  )
}

export default WeatherCard


