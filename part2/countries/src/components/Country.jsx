import { useEffect, useState } from "react";
import axios from 'axios';
import Weather from "./Weather";

const Country = ({ country }) => {

    const languages = Object.values(country.languages);
    const [weather, setWeather] = useState(null);
    const apiKey = import.meta.env.VITE_SOME_KEY;
    const baseWeatherUrl = `https://api.openweathermap.org/data/2.5/weather`;
    const parameters = `?q=${country.capital}&appid=${apiKey}&units=metric`;

    useEffect(() => {
        axios
            .get(baseWeatherUrl + parameters)
            .then(response => {
                setWeather(response.data);
            })
    }, []);

    if (weather) {
        return (
            <>
                <h1>{country.name.common}</h1>
                <table>
                    <tbody>
                        <tr>
                            <td>Official name:</td>
                            <td>{country.name.official}</td>
                        </tr>
                        <tr>
                            <td>Capital:</td>
                            <td>{country.capital}</td>
                        </tr>
                        <tr>
                            <td>Population:</td>
                            <td>{country.population}</td>
                        </tr>
                    </tbody>
                </table>
                <p>Languages:</p>
                <ul>
                    {languages.map(language =>
                        <li key={language}>{language}</li>)}
                </ul>
                <h2>Flag</h2>
                <img src={country.flags.png} alt="flag" />
                <Weather weather={weather} />
            </>
        )
    }
}

export default Country;