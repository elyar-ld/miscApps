var mainCounter = 0, correctCounter = 0;
var playing = false;
var coordinate = "";
var time = 0;
var clock;
var letters = ['A','B','C','D','E','F','G','H'];
var numbers = ['8','7','6','5','4','3','2','1'];

function initBoard(){
	let board = document.getElementById("board");
	board.innerHTML = "<div id='letters'></div><div id='numbers'></div>";
	for(var i = 0; i < 8; i++){
		var newLine = "";
		newLine += "<div class='row'>";
		for(var j = 0; j < 8; j++)
			newLine += "<div class='tile' id='"+(letters[j]+numbers[i])+"'onclick='"+"checa(&apos;"+(letters[j]+numbers[i])+"&apos;)''></div>";
		newLine += "</div>";
		board.innerHTML += newLine;
	}
	var lettersDiv = document.getElementById("letters");
	var numbersDiv = document.getElementById("numbers");
	for(var i = 0; i < 8; i++){
		lettersDiv.innerHTML += "<div class='tile'>"+letters[i]+"</div>";
		numbersDiv.innerHTML += "<div class='tile'>"+numbers[i]+"</div>";
	}
	var coordinateTags = document.getElementById("coordinatesTags");
	if(coordinateTags.checked){
		document.getElementById("letters").style.setProperty("display","initial");
		document.getElementById("numbers").style.setProperty("display","initial");
	}
	else{
		document.getElementById("letters").style.setProperty("display","none");
		document.getElementById("numbers").style.setProperty("display","none");
	}
	var lightTile = true;
	for(var i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			var x = parseInt(Math.random()*90);
			var y = parseInt(Math.random()*90);
			var tile = document.getElementById(letters[j]+numbers[i]);
			if(lightTile) tile.style.setProperty("background-image","url('img/light.jpg')");
			else tile.style.setProperty("background-image","url('img/dark.jpg')");
			tile.style.setProperty("background-position", x+"% "+y+"%");
			lightTile = !lightTile;
			if(j==7) lightTile = !lightTile;
		}
	}
}

function myTimer(){
	time -= 1;
	document.getElementById('clock').innerHTML = time+"s";
}

function startGame(){
	document.getElementById('start').value = "Playing...";
	document.getElementById('start').disabled = true;
	document.getElementById('conf').disabled = true;
	document.getElementById('score').innerHTML = "0/0";
	playing = true;
	coordinate="";
	time = parseInt(document.getElementById("time").value);

	clock = setInterval(myTimer, 1000);
	document.getElementById('clock').innerHTML = time+"s";

	setTimeout(function(){endGame()}, time*1000);
	var row = parseInt(Math.random()*8)+1;
	var letter = letters[parseInt(Math.random()*8)];
	if(document.getElementById("askColumns").checked) coordinate += letter;
	if(document.getElementById("askRows").checked) coordinate += row;
	document.getElementById('coordinate').innerHTML = coordinate;
}

function endGame(){
	clearInterval(clock);
	playing = false;
	document.getElementById('start').value = "START";
	document.getElementById('start').disabled = false;
	document.getElementById('conf').disabled = false;
	document.getElementById('coordinate').innerHTML = "";
	document.getElementById('score').innerHTML = correctCounter+"/"+mainCounter;
	mainCounter = 0;
	correctCounter = 0;
}

function checa(id){
	console.log(id);
	if(playing){
		mainCounter += 1;
		document.getElementById("answerImage").classList.toggle("fadeOut");
		if(id.indexOf(coordinate)>=0){
			correctCounter += 1;
			document.getElementById("answerImage").src = "img/right.png";
		}
		else document.getElementById("answerImage").src = "img/wrong.png";
		document.getElementById("answerImage").classList.toggle("fadeIn");
		setTimeout(function(){disappearAnswer()},250);
		document.getElementById('score').innerHTML = correctCounter+"/"+mainCounter ;
		var row = parseInt(Math.random()*8)+1;
		var letter = letters[parseInt(Math.random()*8)];
		coordinate="";
		if(document.getElementById("askColumns").checked) coordinate += letter;
		if(document.getElementById("askRows").checked) coordinate += row;
		document.getElementById('coordinate').innerHTML = coordinate;
	}
}

function disappearAnswer(){
	document.getElementById("answerImage").classList.toggle("fadeIn");
	document.getElementById("answerImage").classList.toggle("fadeOut");
	setTimeout(function(){disappearAnswer2()},250);
}
function disappearAnswer2(){
	document.getElementById("answerImage").src = "";
}

//#################### INIT #####################
initBoard();
//###############################################

document.getElementById("coordinatesTags").addEventListener("click", function(){
	if(this.checked){
		document.getElementById("letters").style.setProperty("display","initial");
		document.getElementById("numbers").style.setProperty("display","initial");
	}
	else{
		document.getElementById("letters").style.setProperty("display","none");
		document.getElementById("numbers").style.setProperty("display","none");
	}
});

document.getElementById("askPerspective").addEventListener("click", function(){
	numbers = numbers.reverse();
	letters = letters.reverse();
	initBoard();
});

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


//SW
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('../service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }
