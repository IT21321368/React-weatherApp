import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({})
    const [values, setValues] = useState([])
    const [place, setPlace] = useState('Colombo')
    const [thisLocation, setLocation] = useState('')

 // fetch api
 const fetchWeather = async () => {
    const options = {
        // method: 'GET',
        // url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
        // params: {
        //     aggregateHours: '24',
        //     location: place,
        //     contentType: 'json',
        //     unitGroup: 'metric',
        //     shortColumnNames: 0,
        // },
        // headers: {
        //     'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
        //     'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        // }
        method: 'GET',
        url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
        params: {
          aggregateHours: '24',
          location: place,
          contentType: 'json',
          unitGroup: 'metric',
          shortColumnNames: '0'
        },
        headers: {
          'X-RapidAPI-Key': '2df2394c51msh452fb3475a64c76p14e92djsne4bb08db0ae8',
          'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
        }
    }

    try {
        const response = await axios.request(options);
        // const response = await axios.get('https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=Colombo&contentType=json&unitGroup=metric&shortColumnNames=0');
        console.log(response.data)
        const thisData = Object.values(response.data.locations)[0]
        setLocation(thisData.address)
        setValues(thisData.values)
        setWeather(thisData.values[0])
    } catch (error) {
        // console.error(e);
        // // if the api throws error.
        // alert('This place does not exist')
        if (error.response && error.response.status === 429) {
            // Handle 429 error (rate limit exceeded)
            console.error('Rate limit exceeded. Please retry later.');
            // Optionally, implement a retry strategy with a delay before making the same request again.
          } else {
            // Handle other Axios errors
            console.error('An error occurred:', error.message);
    }
}
}

useEffect(() => {
    fetchWeather()
}, [place])

useEffect(() => {
    console.log(values)
}, [values])

return (
    <StateContext.Provider value={{
        weather,
        setPlace,
        values,
        thisLocation,
        // place
       
    }}>
        {children}
    </StateContext.Provider>
)
}

export const useStateContext = () => useContext(StateContext)

