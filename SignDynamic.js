//author = MM && YY

var randomSignInMinute = 0;
var randomSignOutMinute = 0;
var randomSignSecond = 0;

var signInHour = 8;
var signOutHour = 17;

function getRandomNumber(min,max) {	//get random number between min and max
	var range = max - min;
	var rand = Math.random();
	var num = min + Math.round(rand * range);
	return num;
}

function getSignInMinute() {
	setTimeout(getSignInMinute,1000*60*60*24);		//get random sign in minute in 24 hours
	randomSignInMinute = getRandomNumber(0,25);		//set sign in minute range
}
//console.log(getSignInMinute());

function getSignOutMinute() {
	setTimeout(getSignOutMinute,1000*60*60*24);		//get random sign out minute in 24 hours
	randomSignOutMinute = getRandomNumber(25,40);	//set sign out minute range
}

function getSignSecond() {
	setTimeout(getSignSecond,1000*60*60*12);		//get randomw sign second in 12 hours
	randomSignSecond = getRandomNumber(0,59);		//set sign second range
	var date = new Date();
	console.log("Now Time is:",date.toString());
	console.log("Estimate Sign In Time is:",date.toLocaleDateString(),signInHour,":",randomSignInMinute,":",randomSignSecond);		//out put sign time
	console.log("Estimate Sign Out Time is:",date.toLocaleDateString(),signOutHour,":",randomSignOutMinute,":",randomSignSecond);
}

function doClickWindow() {
	$("div.messager-body > div.messager-button > a")[0].click();	//Click OK
	//$("div.messager-body > div.messager-button > a")[1].click();	//Click Cancel
}

function doSignIn(hour,minute) {			//do sign in action
	if(hour <= signInHour && minute <= 34) {
		$("#signIn").click();
		var id = window.setTimeout(doClickWindow,3000);		//Click window after 3000 milliseconds
		document.onclick=function() {
			window.clearTimeout(id);	//Cancel time delays before delay time arrives
		}
	}
}

function doSignOut(hour,minute) {			//do sign out action
	if(hour >= signOutHour && minute >= 25) {
		$("#signOut").click();
		var id = window.setTimeout(doClickWindow,3000);		//Click window after 3000 milliseconds
		document.onclick=function() {
			window.clearTimeout(id);	//Cancel time delays before delay time arrives
		}
	}
}


function loopGetTime() {		//get time recursively
	var date = new Date();
	var hour = date.getHours();		//get time
	var minute = date.getMinutes();
	var second = date.getSeconds();
	var day = date.getDay();
	if(day >= 1 && day <= 5) { 		//judge if it's a weekday
		//console.log(date.format("HH:mm:ss")); 
		if(hour == signInHour && minute == randomSignInMinute && second == randomSignSecond) {
			//console.log(date.format("HH:mm:ss")); 
			doSignIn(hour,minute);
			console.log("Actual Sign In Time is:",date.toString());
		}
		if(hour == signOutHour && minute == randomSignOutMinute && second == randomSignSecond) {
			//console.log(date.format("HH:mm:ss")); 
			doSignOut(hour,minute);
			console.log("Actual Sign Out Time is:",date.toString());
		}
		//setTimeout(loopGetTime,1000);		//recursive, there has a bug.
	}
	setTimeout(loopGetTime,1000);		//recursive every second
}

getSignInMinute()
getSignOutMinute()
getSignSecond()

loopGetTime()