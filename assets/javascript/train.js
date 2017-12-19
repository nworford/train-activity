


console.log("LOADING...");
$(document).ready(function(){

	console.log("DONE LOADING!");
	//firebase.auth()
	//firebase.database()
	/*
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

	var usersRef2 = firebase.database().ref('users2');
	usersRef2.set ({
		John: {
			number: 1,
			age: 30
		},		
		Amanda: {
			number: 2,
			age: 20
		}
	});

	var fruitRef = firebase.database().ref('fruits');
	fruitRef.set ({
		0: {
			number: 1,
			age: 30
		},		
		1: {
			number: 2,
			age: 20
		}
	});
	*/

	var trainsRef = firebase.database().ref('trains');
	trainsRef.set ({
		Trenton: {
			number: 1,
			name: 'Trenton Express',
			frequency: 25
		},		
		Oregon: {
			number: 2,
			frequency: 3600
		}
	});

	var trentonRef = firebase.database().ref("trains/Trenton");
	trentonRef.update ({
	   "frequency": 92.7
	});

	//when the user pushes submit, make one of these
	//(we will need trainsRef so that's from way up top)
	trainsRef.push ({
		name: "Midnight Carriage",
		destination: "Philadelphia",
		frequency: 15,
		first: 1735
	});
	
/*
	var trainsKey = trainsRef.key();
	console.log(trainsKey);

	var midnightRef = ref.child("trains").child("-L0KyYL0vIntr0Yjq0tW").child('frequency');
	midnightRef.transaction(function(currentFrq) {
		return currentFrz + 1;
	});
*/

	console.log("Version 1.01");
});



