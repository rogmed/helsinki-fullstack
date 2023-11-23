const Weather = ({ weather }) => {

    const style = {
        background: 'lightblue',
        borderRadius: 5,
        padding: 5
    }

    if (weather) {
        return (
            <>
                <h2>Weather</h2>
                <p>Temperature {weather.main.temp} ºC</p>
                <p>{weather.weather[0].description}</p>
                <img style={style} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="icon" />
                <p>Wind {weather.wind.speed} m/s</p>
            </>
        )
    }
}

export default Weather;