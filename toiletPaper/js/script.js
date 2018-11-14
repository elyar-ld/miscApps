function el(id){
	return document.getElementById(id);
}

var mini = 0;
var minval = 213456789.0;
var items = document.getElementsByClassName("item");

function calculate(){
	var name = el("name");
	var sheets = el("sheets");
	var rolls = el("rolls");
	var price = el("price");
	if(isEmpty(name.value) || isEmpty(sheets.value) || isEmpty(rolls.value) || isEmpty(price.value)){
		alert("All fields required");
		return 0;
	}
	var sheets1k = (parseFloat(price.value)/(parseInt(sheets.value)*parseInt(rolls.value)))*1000;
	el("result-table").children[0].innerHTML += "<tr class='item'><td>"+name.value+"</td><td>$"+sheets1k.toFixed(3)+"</td></tr>";
	if (sheets1k < minval) {
		if(items.length > 1) items[mini].classList.toggle("min");
		mini = items.length-1;
		minval = sheets1k;
		items[mini].classList.toggle("min");
	}
	name.value = "";
	sheets.value = "";
	rolls.value = "";
	price.value = "";
	el("name").focus();
}

function passNext1(event){
	var char = event.which || event.keyCode;
    if(char === 13) el("sheets").focus();
}
function passNext2(event){
	var char = event.which || event.keyCode;
    if(char === 13) el("rolls").focus();
}
function passNext3(event){
	var char = event.which || event.keyCode;
    if(char === 13) el("price").focus();
}

el("name").focus();

function isEmpty(str){
    return !str.replace(/\s+/, '').length;
}