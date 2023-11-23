import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter.jsx'
import Countries from './components/Countries.jsx';

function App() {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(countries => {
        const data = countries.data;
        setCountries(data);
      })
  }, [])

  return (
    <>
      <Filter setFilter={setFilter} />
      <Countries countries={countries} filter={filter} setFilter={setFilter} />
    </>
  )

}

export default App
