
 const users = [];

 // addUser, removeUser, getUser, getUsersInRoom

 const addUser = ({id,username,room})=>{

 	 username = username.trim().toLowerCase();

 	 room = room.trim().toLowerCase();

 	 if (!username || !room) {

 	 	 return {

 	 	 	 error:'Username or room is required'
 	 	 }
 	 }
 }