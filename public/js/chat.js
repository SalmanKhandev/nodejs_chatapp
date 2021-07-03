const socket = io();

const messageForm = document.getElementById('message-form');

const messageFormInput = document.querySelector("#sendMessage");

const messageFormButton = document.querySelector("#messageButton");

const messages = document.querySelector("#messages");

const messageTemplate = document.querySelector("#message-template").innerHTML;

const locationmessageTemplate = document.querySelector("#location-message-template").innerHTML;

// Options

const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true});



messageForm.addEventListener('submit', (e)=>{


 const message = document.getElementById("sendMessage").value;

 socket.emit('sendMessage', message, (error)=>{

 	  messageFormButton.removeAttribute("disabled");

 	  messageFormInput = "";

 	  messageFormInput.focus();

 	  if (error) {

 	  	return  console.log(error);
 	  }
 });
 
 e.preventDefault();
});


socket.on('message', (message)=>{

   console.log(message);

   const html = Mustache.render(messageTemplate, {

   	  message:message.text,

        createdAt:moment(message.createdAt).format('h:mm a')
   });

   messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', (message)=>{

   const html = Mustache.render(locationmessageTemplate, {

   	 url:message.url,

       createdAt:moment(message.createdAt).format('h:mm a')

   });

   messages.insertAdjacentHTML('beforeend', html);
});

document.querySelector("#send-location").addEventListener("click", ()=>{

 if (!navigator.geolocation) {

 	return  alert('Geolocation is not supported by your browser');
 }

 navigator.geolocation.getCurrentPosition((position)=>{

   socket.emit('sendLocation',{

   	  latitude:position.coords.latitude,
   	  longitude:position.coords.longitude
   });

 });


});


socket.emit('join', {username, room});