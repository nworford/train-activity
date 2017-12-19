


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

	/* 	var trentonRef = firebase.database().ref("trains/Trenton");
	trentonRef.update ({
	   "frequency": 92.7
	});
	*/


/*
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

//this bulldozes previous pushed data with each user refresh.
	//when the user pushes submit, make one of these
	//(we will need trainsRef so that's from way up top)
	trainsRef.push ({
		name: "Kukamunga",
		destination: "(IS that a real place?)",
		frequency: 11,
		first: 1234
	});

	trainsRef.push ({
		name: "Midnight Carriage2",
		destination: "Philadelphia1",
		frequency: 16,
		first: 1734
	});
*/
	
/*
*/
	var trainsRef = firebase.database().ref('trains');
	var trainsKey = trainsRef.key();
	console.log(trainsKey);
	trainsRef.on('value', function(snap)  {
		console.log("SOMETHING HAPPENED");
		trainsRef = snap.val();
	});

	$("#add-train-btn").click(function() {
		var train_name = $("#train-name-input").val();
		console.log("Logging" + train_name);
		trainsRef.push ({
			name: train_name,
			destination: "Philadelphia1",
			frequency: 16,
			first: 1734
		});

	});

/*
//this requires the random hash be hard coded, thus is not useful
	var midnightRef = ref.child("trains").child("-L0KyYL0vIntr0Yjq0tW").child('frequency');
	midnightRef.transaction(function(currentFrq) {
		return currentFrz + 1;
	});
*/


	console.log("Version 1.03a");
});



