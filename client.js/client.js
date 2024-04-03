const socket = io(`http://127.0.0.1:8000`);

//get DOM element in respective js variable
const form = document.getElementById('message-send');
const messageInput = document.getElementById('messageinput');   
const messageContainer = document.querySelector(".container");

//audio that will paly on reciveng message
var audio = new Audio('notice.wav');

//function ehich will append event enfo to container
const append =(message, position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();

    }
    

};


//Ask new user joined let the server know
const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

//if the new user joined recive the event from server
socket.on('user-joined', name=>{
    append(`${name} joined the chat`, `right`)

})

//if the user send message recive it from server
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, `left`)

})


//if user left recive message from server
socket.on('left', name=>{
    append(`${name}: left the chat`, `left`)

})


//if the form get submitted send the message to server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = ''

});
