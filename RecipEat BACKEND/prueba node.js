const eventEmitter = require ('events');
const emitter = new eventEmitter

emitter.on ('saludo', () => {
    console.log('Hola Otero'); 
});

emitter.emit('saludo');