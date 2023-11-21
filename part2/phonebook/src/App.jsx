import { useState, useEffect } from 'react'
import Filter from './components/Filter.jsx'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
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

    if (newName != '') {
      if (persons.map(p => p.name).includes(newName)) {
        alert(`${newName} is already added to phonebook.`);
      } else {
        const newPerson = { name: newName, number: newNumber };
        personsService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
            setNewName('');
            setNewNumber('');
          });

      }
    }
  }

  const deletePerson = (id) => {
    console.log(`App: Delete ${id}`);
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
    setNewName(event.target.value);
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
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
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