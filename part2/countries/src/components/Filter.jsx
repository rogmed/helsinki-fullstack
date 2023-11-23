const Filter = ({ setFilter }) => {

    const handleFilterCHange = (event) => {
        setFilter(event.target.value);
    }

    return (
        <>
            Find countries
            <input onChange={handleFilterCHange} />
        </>
    )
}

export default Filter;