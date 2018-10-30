function findBest(population){
	var bestVal = 0.0.MAX_VALUE;
	var bestIndex = 0;
	for (var i = 0; i < population.length; i++){
		if(population[i].val < bestVal){
			bestVal = population[i].val;
			bestIndex = i;
		}
	}
	return population[bestIndex].vars;
}



function initialization(size, bounds){
	var population = [];
	for(var i = 0; i < size; i++){
		var varsVals = [];
		population[i] = {};
		for(var j = 0; j < bounds.length; j++){
			varsVals[j] = rand.nextFloat() * (bounds[j].max - bounds[j].min) + bounds[j].min;
		}
		population[i].vars = varsVals;
		population[i].val = of(varsVals);
	}
	return population;
}

function mutation(population, F, vector, numberOfVectors){
	var mutants = [];
	var bestVector = [];
	var randNum = 1;
	if(vector !== "rand"){
		bestVector = findBest(population);
		randNum = 0;
	}
	for(var p = 0; p < population.length; p++){
		var randomIndexes = [];
		var index = 0;
		while(randomIndexes.length < (numberOfVectors*2)+randNum){
			randomIndex = parseInt(rand.nextFloat()*population.length);
			if(randomIndex === p) continue;
			var contained = false;
			for(var i = 0; i < randomIndexes.length; i++){
				if (randomIndexes[i] === randomIndex){
					contained = true;
					break;
				}
			}
			if(!contained){
				randomIndexes[index] = randomIndex;
				index += 1;
			}
		}
		var mutant = [];
		var firstElement = [];
		if(vector === "rand"){
			for(var i = 0; i < population[randomIndexes[randomIndexes.length-1]].vars.length; i++)
				firstElement[i]= population[randomIndexes[randomIndexes.length-1]].vars[i];
		} 
		else if(vector === "best"){
			for(let i = 0, length1 = bestVector.length; i < length1; i++)
				firstElement[i] = bestVector[i];
		} 
		else if(vector === "current-to-best"){
			for (var i = 0; i < population[p].vars.length; i++)
				firstElement[i] = population[p].vars[i] + F*(bestVector[i] - population[p].vars[i]);
		}
		for (var i = 0; i < population[0].vars.length; i++){
			var sumRand = 0.0;
			for (var j = 0; j < randomIndexes.length-1; j += 2)
				sumRand += F*(population[randomIndexes[j]].vars[i] - population[randomIndexes[j+1]].vars[i]);
			mutant[i] = firstElement[i] + sumRand;
		}
		mutants[p] = mutant;
	}
	return mutants;
}

function recombination(population, mutants, Cr, type){
	var trials = [];
	if (type === "bin"){
		for(var i = 0; i < population.length; i++){
			var K = parseInt(rand.nextFloat()*population[i].vars.length);
			var trial = [];
			for (var j = 0; j < population[i].vars.length; j++){
				if(j === K || rand.nextFloat() <= Cr) trial[j] = mutants[i][j];
				else trial[j] = population[i].vars[j];
			}
			trials[i]= trial;
		}	
	}
	else if(type === "exp"){
		for(var i = 0; i < population.length; i++){
			var trial = []
			for (var j = 0; j < population[i].vars.length; j++)
				trial[j] = population[i].vars[j];
			var n = parseInt(rand.nextFloat()*population[i].vars.length);
			for (var L = 0; L < population[i].vars.length-1 && rand.nextFloat() < Cr; L++){
				trial[(n+L)%(trial.length)] = mutants[i][(n+L)%(trial.length)];
			}
			trials[i]= trial;
		}	
	}
	
	return trials;
}

function selection(population, trials){
	for (var i = 0; i < population.length; i++) {
		var ofValue = of(trials[i]);
		if(ofValue <= population[i].val){
			population[i].vars = trials[i];
			population[i].val = ofValue;
		}
	}
	return population;
}

function DE(size, F, Cr, GEN, bounds, x, y, z, s, seed = Math.floor(Math.random()*2147483647)){
	rand = new Random(seed);
	var population = initialization(size, bounds);
	
	for (var g = 0; g < GEN; g++){
		var mutants = mutation(population, F, x, y);
		var trials = recombination(population, mutants, Cr, z);
		population = selection(population, trials);
	}
	console.log(findBest(population));
}

function of(vars){
	/*var phi = ((5*Math.sqrt(200)-50)/2);
	var value = Math.sqrt(phi**2+vars[0]**2)/10 + 
		Math.sqrt(100+(vars[1]-vars[0])**2)/9 + 
		Math.sqrt(100+(vars[2]-vars[1])**2)/8 + 
		Math.sqrt(100+(vars[3]-vars[2])**2)/7 + 
		Math.sqrt(100+(vars[4]-vars[3])**2)/6 + 
		Math.sqrt(100+(vars[5]-vars[4])**2)/5 +
		Math.sqrt(phi**2+(5*Math.sqrt(200)-vars[5])**2)/10;
	return value;*/
	//return -1*Math.cos(vars[0])*Math.cos(vars[1])*Math.exp(-1*((vars[0]-Math.PI)**2+(vars[1]-Math.PI)**2));
	//return Math.sin(3*Math.PI*vars[0])**2+((vars[0]-1)**2)*(1+Math.sin(3*Math.PI*vars[1])**2)+((vars[1]-1)**2)*(1+Math.sin(2*Math.PI*vars[1])**2);
	return (vars[0]**2+vars[1]**2);
}

function Random(seed) {
  this._seed = seed % 2147483647;
  if (this._seed <= 0) this._seed += 2147483646;
}
Random.prototype.next = function () {
  return this._seed = this._seed * 16807 % 2147483647;
};
Random.prototype.nextFloat = function (opt_minOrMax, opt_max) {
	return (this.next() - 1) / 2147483646;;
};

var rand = null;