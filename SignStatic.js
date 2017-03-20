//author = MM && YY

function doClickWindow() {
	//$("div.messager-body > div.messager-button > a")[0].click();	//Click OK
	$("div.messager-body > div.messager-button > a")[1].click();	//Click Cancel
}

function doSignIn(hour,minute) {			//do sign in action
	$("#signIn").click();
	var id = window.setTimeout(doClickWindow,3000);		//Click window after 3000 milliseconds
	document.onclick=function() {
		window.clearTimeout(id);	//Cancel time delays before delay time arrives
	}
}

function doSignOut(hour,minute) {			//do sign out action
	$("#signOut").click();
	var id = window.setTimeout(doClickWindow,3000);		//Click window after 3000 milliseconds
	document.onclick=function() {
		window.clearTimeout(id);	//Cancel time delays before delay time arrives
	}
}


function loopGetTime() {		//get time recursively
	var date = new Date();
	var hour = date.getHours();		//get time
	var minute = date.getMinutes();
	var second = date.getSeconds();
	if(date.getDay() <= 5 && date.getDay() >= 1) { 			//judge if it's a weekday
		if(hour == 9 && minute == 50 && second == 1) {	//judge sign in time, set static sign in time here!!!
				console.log(date.format("HH:mm:ss")); 
				doSignIn(hour,minute);
		}
		if(hour == 9 && minute == 50 && second == 8) {	//judge sign out time, set static sign in time here!!!
				console.log(date.format("HH:mm:ss")); 
				doSignOut(hour,minute);
		}
		//setTimeout(loopGetTime,1000);		//recursive, there has a bug.
	}
	setTimeout(loopGetTime,1000);		//recursive every second
}
loopGetTime()
