
console.log("Version 1.07");
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
			var first_hrs = parseInt(first/100);
			var first_mins = first%100;
			var frequency = parseInt(val['frequency']);
			var name = val['name'];
			var next_hrs = first_hrs;
			var next_mins = first_mins;
			var date = new Date();

			console.log("Time is " + now);
			var now_hrs = parseInt(date.getHours());
			var now_mins = parseInt(date.getMinutes());
			var now = 100*now_hrs + now_mins;
			while(next_hrs*100+next_mins < now) //next train can't be before now, impossible.
			{	
				console.log("Advancing " + frequency);
				console.log("Next " + next_hrs + ":" + next_mins);
				next_mins += frequency;
				console.log("Next mins: " + next_mins);
				while(next_mins >= 60) //more than an hour from now, for example
				{
					next_hrs += 1;
					next_mins -= 60;
					console.log("Next " + next_hrs + ":" + next_mins);
				}
				while(next_hrs >= 24) //tomorrow, for example
				{
					next_hrs -= 24;
					console.log("Next " + next_hrs + ":" + next_mins);
				}
			}
			var minutes_away = 60*(next_hrs-now_hrs) + (next_mins-now_mins); //how far away?
			console.log("Minutes way: " + minutes_away);
			if(next_mins < 10)
			{
				next_mins = '0' + next_mins; //left fill zero
			}
			console.log("Train " + name + " going to " + destination + " from " + first + " every " + frequency + " minutes");
			table_contents += "<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + next_hrs + ":" + next_mins + "</td><td>" + minutes_away + "</td></tr>";
		}
		$("#table_body").html(table_contents);
	});

	//adding a train will trigger a change to trainsRef, running the code ABOVE only AFTER what's below
	$("#add-train-btn").click(function() {
		var train_name = $("#train-name-input").val();
		$("#train-name-input").css("border-color", "lightgrey");
		if(train_name == "")
		{
			$("#train-name-input").focus();
			$("#train-name-input").css("border-color", "orange");
			return;
		}

		var train_destination = $("#destination-input").val();
		$("#destination-input").css("border-color", "lightgrey");
		if(train_destination == "")
		{
			$("#destination-input").focus();
			$("#destination-input").css("border-color", "orange");
			return;
		}

		var train_first = $("#first-train-time-input").val();
		var clean_time = "";
		for(var i=0;i<train_first.length;i++)
		{
			if(train_first[i] != ':')
			{
				clean_time += train_first[i];
			}
		}
		train_first = clean_time;
		$("#first-train-time-input").css("border-color", "lightgrey");
		if(train_first == "" || train_first == 0)
		{
			$("#first-train-time-input").focus();
			$("#first-train-time-input").css("border-color", "orange");
			return;			
		}

		var train_frequency = $("#frequency-input").val();
		$("#frequency-input").css("border-color", "lightgrey");
		if(train_frequency == "" || train_frequency == 0)
		{
			$("#frequency-input").focus();
			$("#frequency-input").css("border-color", "orange");
			return;			
		}


		//console.log("Logging " + train_name);
		//console.log(trainsRef);
		$("#train-name-input").val("");		
		$("#destination-input").val("");
		$("#first-train-time-input").val("");
		$("#frequency-input").val("");

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