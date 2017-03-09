//author = Yuxiang Sun && Yue Yu

var randomSignInMinute = 0;
var randomSignOutMinute = 0;
var randomSignSecond = 0;

function getRandomNumber(min,max) {	//get random number between min and max
	var range = max - min;
	var rand = Math.random();
	var num = min + Math.round(rand * range);
	return num;
}

function getSignInMinute() {
	setTimeout(getSignInMinute,1000*60*60*24);		//get random sign in minute in 24 hours
	randomSignInMinute = getRandomNumber(0,34);
}
//console.log(getSignInMinute());

function getSignOutMinute() {
	setTimeout(getSignOutMinute,1000*60*60*24);		//get random sign out minute in 24 hours
	randomSignOutMinute = getRandomNumber(25,59);
}

function getSignSecond() {
	setTimeout(getSignSecond,1000*60*60*12);		//get randomw sign second in 12 hours
	randomSignSecond = getRandomNumber(0,59);
}

function doClickWindow() {
	$("div.messager-body > div.messager-button > a")[0].click();	//Click OK
	//$("div.messager-body > div.messager-button > a")[1].click();	//Click Cancel
}

function doSignIn(hour,minute) {			//do sign in action
	if(hour <= 8 && minute <= 34) {
		$("#signIn").click();
		var id = window.setTimeout(doClickWindow,3000);		//Click window after 3000 milliseconds
		document.onclick=function() {
			window.clearTimeout(id);	//Cancel time delays before delay time arrives
		}
	}
}

function doSignOut(hour,minute) {			//do sign out action
	if(hour >= 17 && minute >= 25) {
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
	
	if(date.getDay() <= 5 && date.getDay() >= 1) { 		//judge if it's a weekday
		//console.log(date.format("HH:mm:ss")); 
		if(hour == 8 && minute == randomSignInMinute && second == randomSignSecond) {
			console.log(date.format("HH:mm:ss")); 
			doSignIn(hour,minute);
		}
		if(hour == 17 && minute == randomSignOutMinute && second == randomSignSecond) {
			console.log(date.format("HH:mm:ss")); 
			doSignOut(hour,minute);
		}
		setTimeout(loopGetTime,1000);		//recursive
	}
}

getSignInMinute()
getSignOutMinute()
getSignSecond()
console.log("Sign In Time:",8,":",randomSignInMinute,":",randomSignSecond);
console.log("Sign Out Time:",17,":",randomSignOutMinute,":",randomSignSecond);
loopGetTime()