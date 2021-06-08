const users = []

const addUser = ({id, username, room}) => {
    username = username.trim().toUpperCase()
    room = room.trim().toUpperCase()

    if(!username || !room){
        return {error: 'Username and Room are required'}
    }
    if(username === 'ADMIN' || username === 'YOU'){
        return {error: 'This Username is reserved'}
    }
    const existingUser = users.find((user)=>{
        return user.room === room && user.username === username
    })
    if(existingUser){
        return {error: 'Username already taken'}
    }

    const user = {id, username, room}
    users.push(user)
    return {user}
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if(index !== -1){
        return users.splice(index, 1)[0]
    }
    else{
        return undefined
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}