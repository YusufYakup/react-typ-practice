import { useState } from "react"
import axios from "axios"
import Head from "next/head"
import Image from "next/legacy/image"
import { BsSearch } from "react-icons/bs"
import { Weather } from "../components/Weather"
import Spinner from "../components/Spinner"

export default function Home() {
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState({})
  const [loading, seLoading] = useState(false)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`

  const feathWeather = (e) => {
    e.preventDefault()
    seLoading(true)
    axios.get(url).then((res) => {
      setWeather(res.data)
      // console.log(res.data)
    })
    setCity("")
    seLoading(false)
  }

  if (loading) {
    return <Spinner />
  } else {
    return (
      <div>
        <Head>
          <title>Weather App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Overlay */}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/40 z-[1]" />
        <Image
          src="https://images.unsplash.com/photo-1587713714775-fa70364f6445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1082&q=80"
          layout="fill"
          className="object-cover"
          alt="weather"
        />
        {/* Search */}

        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 text-white z-10">
          <form
            onSubmit={feathWeather}
            className=" flex justify-between items-center w-full m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <div>
              <input
                type="text"
                placeholder="Enter city name"
                onChange={(e) => setCity(e.target.value)}
                className="bg-transparent text-white outline-none focus:outline-none text-2xl placeholder:text-gray-300"
              />
            </div>
            <button
              onClick={feathWeather}
              className=" hover:bg-gray-400 p-2 rounded-full"
            >
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {/* Weather */}
        {weather.main && <Weather data={weather} />}
      </div>
    )
  }
}
