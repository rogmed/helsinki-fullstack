import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123123' }
  ])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault();
    const newName = event.target[0].value;
    const newNumber = event.target[1].value;

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

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>number: <input /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(
        person => <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App