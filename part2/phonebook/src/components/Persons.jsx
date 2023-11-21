import Person from './Person.jsx'

const Persons = (props) => {
    const filterName = props.filter;
    const persons = props.persons.filter(
        person => person.name.toLowerCase().includes(filterName.toLowerCase()));

    return (
        <table>
            <tbody>
                {persons.map(p => <Person key={p.id} person={p} />)}
            </tbody>
        </table>
    )

}

export default Persons