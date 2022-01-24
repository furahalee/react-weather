import React from 'react';
import axios from 'axios';
import './Weather.css';
import RecipeReviewCard from './Card';
import Footer from './Footer';
import Search from './Search';

export default function Weather() {
    // 스테이트
    const [city, setCity] = React.useState('Milano');
    const [country, setCountry] = React.useState('');
    const [wind, setWind] = React.useState('');
    const [weather, setWeather] = React.useState({});
    const [temp, setTemp] = React.useState({});

    // console.log(process.env.REACT_APP_WEATHER_API_KEY)
    //*** 데이타 FETCH */
    let lang = 'it'
    let getWeather = async (searchedCity) => {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&lang=${lang}`

        try {
            let apiCall = await axios.get(url);
            let data = apiCall.data;
            // console.log(data);
            setWeather(data.weather[0]);
            setTemp(data.main);
            setCity(data.name);
            setCountry(data.sys.country);
            setWind(data.wind.speed);
        }
        catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        // Fetch one time
        getWeather(city);
    }, []);

    //*** CITY검색 */
    let searchCity = (searchInput) => {
        // console.log(searchInput)
        if (searchInput.length === 0) {
            setCity('Milano');
            getWeather('Milano');
        } else {
            setCity(searchInput);
            getWeather(searchInput);
        }

    }

    //*** RETURN  */
    return (
        <div className='alignCenter'>
            <h1 className='title'><span role="img" aria-label="sat">🛰️ </span> Today Wether </h1>
            <div><a href="/catalog"><span className='home-link' role='img' aria-label='home'>🏠</span></a></div>
            <Search searchCity={searchCity} />
            <RecipeReviewCard
                weather={weather}
                temp={temp}
                city={city}
                country={country}
                wind={wind}
            />
            <Footer />
        </div>
    )
}
