const generateMessage = (username, text)=>{
    return {
        text,
        createdAt: new Date().getTime(),
        username
    }
}

const generateLocation = (username, coords)=>{
    return {
        link: `https://google.com/maps?q=${coords.latitude},${coords.longitude}`,
        createdAt: new Date().getTime(),
        username
    }
}

module.exports = {
    generateMessage,
    generateLocation
}