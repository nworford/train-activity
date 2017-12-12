


console.log("LOADING...");
$(document).ready(function(){



	console.log("DONE LOADING!");
	//firebase.auth()
	//firebase.database()
	console.log(firebase);	
	var usersRef = firebase.database().ref('users');
	usersRef.set ({
		John: {
			number: 1,
			age: 30
		},		
		Amanda: {
			number: 2,
			age: 20
		}
	});



	console.log("PROGRAM COMPLETE");
});



