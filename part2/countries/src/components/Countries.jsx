import Country from './Country'

const Countries = ({ countries, filter }) => {

    if (countries) {
        countries = countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()));

        if (countries.length === 0) {
            return (
                <p>No results.</p>
            )
        }

        else if (countries.length === 1) {
            return (
                <Country country={countries[0]} />
            )
        }

        else if (countries.length > 10) {
            return (
                <p>Too many results ({countries.length}). Please, use the filter.</p>
            )

        } else {
            return (
                countries.map(c =>
                    <p key={c.name.common}>{c.name.common}</p>
                )
            )
        }

    } else {
        return (
            <p>Loading countries...</p>
        )
    }
}

export default Countries;