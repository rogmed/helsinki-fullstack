const Notification = ({ message }) => {

    const notificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 5,
        marginBottom: 10
    }

    if (message === null) {
        return null
    }

    return (
        <div className='error' style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification;