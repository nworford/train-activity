
console.log("Version 1.06");
var trainsRef = 0;

$(document).ready(function(){
	var trainsRef = firebase.database().ref('trains');

	//every time trainsRef changes, pull & repopulate train data
	trainsRef.on('value', function(snap)  {
		var result = snap.val();

		var table_contents = "";
		for(var key in result) {
			console.log("Key " + key);
			var val = result[key];
			console.log("VALUE: " + val);
			var destination = val['destination'];
			var first = val['first'];
			var frequency = val['frequency'];
			var name = val['name'];
			console.log("Train " + name + " going to " + destination + " from " + first + " every " + frequency + " minutes");
			table_contents += "<tr><td>" + name + "</td><td>" + destination + "</td><td>" + first + "</td><td>" + frequency + "</td></tr>";
		}
		$("#table_body").html(table_contents);
	});

	//adding a train will trigger a change to trainsRef, running the code ABOVE only AFTER what's below
	$("#add-train-btn").click(function() {
		var train_name = $("#train-name-input").val();
		if(train_name == "")
		{
			alert("Please fill a train name!");
			//$("#train-name-input").focus();
			return;
		}
		var train_destination = $("#destination-input").val();
		if(train_destination == "")
		{
			alert("Please fill a train destination!");
			return;
		}
		var train_frequency = $("#frequency-input").val();
		if(train_frequency == "" || train_frequency == 0)
		{
			alert("Please fill a frequency!");
			return;			
		}
		var train_first = $("#first-train-time-input").val();
		if(train_first == "" || train_first == 0)
		{
			alert("Please fill a first train!");
			return;			
		}
		//console.log("Logging " + train_name);
		//console.log(trainsRef);
		trainsRef.push ({
			name: train_name,
			destination: train_destination,
			frequency: train_frequency,
			first: train_first
		});

	});
});

/*
//works, but bulldozes past user's data & nothing is permanent
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
//this requires the random hash be hard coded, thus is not useful
	var midnightRef = ref.child("trains").child("-L0KyYL0vIntr0Yjq0tW").child('frequency');
	midnightRef.transaction(function(currentFrq) {
		return currentFrz + 1;
	});
*/

/*
//works, but not practical because does not allow creation of new trains.
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
*/

/*
general notes/testing
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

	
/*
//not working
var trainsKey = trainsRef.key();
console.log(trainsKey);
*/

/* 	var trentonRef = firebase.database().ref("trains/Trenton");
trentonRef.update ({
   "frequency": 92.7
});
*/
