import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [tbName, setTbName] = useState('');
  const [tbNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    personsService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      });
  }, [])

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: tbName.trim(),
      number: tbNumber.trim()
    }

    if (newPerson.name != '') {

      const foundPerson = persons.find(p => p.name.toLowerCase() === newPerson.name.toLowerCase());
      const message = `${newPerson.name} is already added to phonebook. Replace the old number with a new one?`;

      if (foundPerson != null && confirm(message)) {
        personsService
          .update(foundPerson.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== foundPerson.id ? p : returnedPerson));
          });
      }

      if (foundPerson == null) {
        personsService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
          });
      }
      
      setTbName('');
      setNewNumber('');
    }
  }

  const deletePerson = (id) => {
    personsService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id));
      });
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  }

  const handleNameChange = (event) => {
    setTbName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h2>Add contact</h2>
      <PersonForm
        addPerson={addPerson}
        newName={tbName}
        handleNameChange={handleNameChange}
        newNumber={tbNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        filter={filter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App