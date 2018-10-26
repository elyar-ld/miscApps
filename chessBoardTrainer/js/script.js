//var board = document.getElementById('board');

var letters = ['A','B','C','D','E','F','G','H'];

var lightTile = true;
for(var i = 8; i >= 1; i--){
	for(var j = 0; j < 8; j++){
		var x = parseInt(Math.random()*90);
		var y = parseInt(Math.random()*90);
		var tile = document.getElementById(letters[j]+i);
		if(lightTile) tile.style.setProperty("background-image","url('img/light.jpg')");
		else tile.style.setProperty("background-image","url('img/dark.jpg')");
		tile.style.setProperty("background-position", x+"% "+y+"%");
		lightTile = !lightTile;
		if(j==7) lightTile = !lightTile;
	}
}

var mainCounter = 0, correctCounter = 0;
var playing = false;
var coordinate = "";
var time = 0;
var clock;

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

function openNav() {
    document.getElementById("mySidenav").style.width = "100%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}