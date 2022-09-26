import { useState, useEffect } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Loading from "./components/Loading"
import axios from 'axios'

function App() {
  const [coords, setCoords] = useState()
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [temp_min,setTemp_min] = useState()
  const [temp_max,setTemp_max] = useState()

  useEffect(() => {
    const ubi = (cor) => {
      const obj = {
        lat: cor.coords.latitude,
        lon: cor.coords.longitude
      }
      setCoords(obj);
    }
    navigator.geolocation.getCurrentPosition(ubi)
  }, [])

  useEffect(() => {
    if (coords) {
      const APIKEY = "2276971d6d436e0f429b683180b420b7"
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${APIKEY}`
      axios.get(URL)
        .then(res => {
          const celsius = (res.data.main.temp - 273.15).toFixed(0)
          const farenheit = (celsius * 9 / 5 + 32).toFixed(0)
          setTemperature({ celsius, farenheit })

          const temp_minC = (res.data.main.temp_min - 273.15).toFixed(0)
          const temp_minF = (temp_minC * 9 / 5 + 32).toFixed(0)
          setTemp_min({temp_minC,temp_minF})

          const temp_maxC = (res.data.main.temp_max - 273.15).toFixed(0)
          const temp_maxF = (temp_minC * 9 / 5 + 32).toFixed(0)
          setTemp_max({temp_maxC,temp_maxF})

          setWeather(res.data)
        })
        .catch(error => console.log(error))
    }
  }, [coords])
  console.log(weather)
  return (
    <div className="App">
      {
      weather ?
      <WeatherCard weather={weather} temperature={temperature} temp_min={temp_min} temp_max={temp_max}/>
      :
      <Loading />
      }
    </div>
  )
}

export default App
