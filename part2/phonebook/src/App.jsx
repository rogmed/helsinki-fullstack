import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  const addName = (event) => {
    event.preventDefault();

    if (newName != '') {
      if (persons.map(p => p.name).includes(newName)) {
        alert(`${newName} is already added to phonebook.`);
      } else {
        setPersons(persons.concat(
          { name: newName, number: newNumber }));
        setNewName('');
      }
    }
  }

  const handleFilterChange = (event) => {
    const newFilter = event.target.value;
    setFilter(newFilter);

    if (newFilter === '') {
      setFilteredPersons(persons);
    } else {
      let temp = [];
      persons.forEach(person => {
        if (person.name.toLowerCase().includes(newFilter.toLowerCase())) {
          temp = temp.concat(person);
        }
      });

      setFilteredPersons(temp);
    }
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
      <p>Filter shwon with
        <input
          value={filter}
          onChange={handleFilterChange} />
      </p>
      <h2>Add contact</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <p>debug name: {newName}</p>
      <p>debug number: {newNumber}</p>
      <p>debug filter: {filter}</p>

      <h2>Numbers</h2>
      {filteredPersons.map(
        person => <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App