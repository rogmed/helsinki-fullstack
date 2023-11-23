const Country = ({ country }) => {

    const languages = Object.values(country.languages);
    console.log('languages :>> ', languages);

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
        </>
    )
}

export default Country;