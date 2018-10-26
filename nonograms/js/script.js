var instructions =[
	[
		[0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0],
		[0,0,1,4,0,0,0,0,3,0,0,0,0,0,3,2,1,0,0,0],
		[0,3,3,2,0,0,0,2,1,4,3,1,3,5,3,3,2,0,0,0],
		[2,1,1,3,10,8,4,1,1,2,5,2,1,1,1,2,3,6,4,2]
	],
	[
		[0,0,0,4],
		[0,0,2,3],
		[0,0,0,6],
		[0,4,1,1],
		[0,0,5,2],
		[0,6,1,4],
		[0,6,3,1],
		[1,2,3,2],
		[0,3,3,4],
		[0,0,3,10],
		[0,1,3,4],
		[0,0,3,3],
		[0,0,2,4],
		[0,1,1,4],
		[0,0,0,6]
	]
];

var w=20;
var h=15;

var upContent="";
var leftContent="";
var boardContent="";

for(var i = 0; i < instructions[0].length; i++){
	upContent += "<tr>";
	for(var j = 0; j < instructions[0][i].length; j++){
		var columnClass = "";
		if((j+1) % 5 == 0 && j+1 != w) columnClass += "fifthColumn";
		upContent += '<td class="'+columnClass+'">'+(instructions[0][i][j] == 0 ? "" : instructions[0][i][j])+"</td>";
	}
	upContent += "</tr>";
}
document.getElementById("up-instructions").innerHTML = upContent;

for(var i = 0; i < instructions[1].length; i++){
	leftContent += "<tr>";
	var rowClass = "";
	if((i+1) % 5 == 0 && i+1 != h) rowClass = "fifthRow ";
	for(var j = 0; j < instructions[1][i].length; j++)
		leftContent += '<td class="'+rowClass+'">'+(instructions[1][i][j] == 0 ? "" : instructions[1][i][j])+"</td>";
	leftContent += "</tr>";
}
document.getElementById("left-instructions").innerHTML = leftContent;

for(i = 0; i < h; i++){
	boardContent += "<tr>";
	var rowClass = "";
	if((i+1) % 5 == 0 && i+1 != h) rowClass = "fifthRow ";
	for(j = 0; j < w; j++){
		var columnClass = "";
		if((j+1) % 5 == 0 && j+1 != w) columnClass += "fifthColumn";
		boardContent += '<td class="dede '+rowClass+columnClass+'" id="c'+i+'-'+j+'"></td>';
	}
	boardContent += "</tr>";
}
document.getElementById("board").innerHTML = boardContent;

function getPixels() {
  
  //var img = new Image();
  var img = document.getElementById("img");
  //img.crossOrigin = 'anonymous';
  //img.src = isrc;
  console.log(img.width);
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d',img.width,img.height);
  context.drawImage(img, 0, 0);
  return context.getImageData(0, 0, canvas.width, canvas.height);
}

console.log(getPixels());