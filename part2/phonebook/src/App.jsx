import { useState, useEffect } from 'react'

import Filter from './components/Filter.jsx'
import Notification from './components/Notification.jsx'
import Persons from './components/Persons.jsx'
import PersonForm from './components/PersonForm.jsx'
import personsService from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [tbName, setTbName] = useState('');
  const [tbNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [message, setMessage] = useState(null);
  const [errorFlag, setErrorFlag] = useState(false);

  useEffect(() => {
    personsService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      });
  }, [])

  const showNotification = (message, errorFlag) => {
    setErrorFlag(errorFlag);
    setMessage(`${message}`);
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

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
          })
          .then(showNotification(
            `Changed number of ${foundPerson.name}`,
            false))
          .catch(error =>
            showNotification(
              `Information of ${foundPerson.name} has already
             been removed from server`,
             true)
          );
      }

      if (foundPerson == null) {
        personsService
          .create(newPerson)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson));
          })
          .then(showNotification(
            `Added ${newPerson.name}.`),
            false);
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
      <Notification message={message} error={errorFlag} />
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