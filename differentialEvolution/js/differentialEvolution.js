const helpers ={
	findBest : function(population){
		var bestVal = 1.7976931348623157e+308;
		var bestIndex = 0;
		for (var i = 0; i < population.length; i++){
			if(population[i].val < bestVal){
				bestVal = population[i].val;
				bestIndex = i;
			}
		}
		return population[bestIndex];
	},
	copyArray : function(array){
		let newArray = [];
		for(let i = 0 , length = array.length; i < length; i++)
			newArray[i] = array[i];
		return newArray;
	}
}


function initialization(size, bounds){
	let population = [];
	for(var i = 0; i < size; i++){
		var varsVals = [];
		population[i] = {};
		for(var j = 0; j < bounds.length; j++)
			varsVals[j] = rand.nextFloat() * (bounds[j].max - bounds[j].min) + bounds[j].min;
		population[i].vars = helpers.copyArray(varsVals);
		population[i].val = of(varsVals);
	}
	return population;
}

function mutationSingle(population, individual, F, vector, numberOfVectors, firstElement, p){
	let randomIndexes = [];
	let index = 0;
	while(randomIndexes.length < (numberOfVectors*2)+(vector === "rand" ? 1 : 0)){
		randomIndex = parseInt(rand.nextFloat()*population.length);
		if(randomIndex === p) continue;
		let contained = false;
		for(let i = 0, length = randomIndexes.length; i < length; i++){
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
	let mutant = [];
	if(vector === "rand") firstElement = helpers.copyArray(population[randomIndexes[randomIndexes.length-1]].vars);
	else if(vector === "current-to-best"){
		for (var i = 0; i < individual.length; i++)
			firstElement[i] = individual[i] + F*(firstElement[i] - individual[i]);
	}
	for (var i = 0; i < individual.length; i++){
		var sumRand = 0.0;
		for (var j = 0; j < randomIndexes.length-1; j += 2)
			sumRand += F*(population[randomIndexes[j]].vars[i] - population[randomIndexes[j+1]].vars[i]);
		mutant[i] = firstElement[i] + sumRand;
	}
	return helpers.copyArray(mutant);
}

function mutation(population, F, vector, numberOfVectors){
	let mutants = [];
	let firstElement = [];
	if(vector !== "rand")
		firstElement = helpers.copyArray(helpers.findBest(population).vars);
	for(let p = 0, length = population.length; p < length; p++)
		mutants[p] = mutationSingle(helpers.copyArray(population), helpers.copyArray(population[p].vars), F, vector, numberOfVectors, helpers.copyArray(firstElement), p);
	return mutants;
}

function recombinationSingle(trial, mutant, Cr, type, limits){
	if (type === "bin"){
		var K = parseInt(rand.nextFloat()*trial.length);
		for (var j = 0; j < trial.length; j++)
			if(j === K || rand.nextFloat() <= Cr) trial[j] = mutant[j];	
	}
	else if(type === "exp"){
		var n = parseInt(rand.nextFloat()*trial.length);
		for (var L = 0; L < trial.length-1 && rand.nextFloat() < Cr; L++)
			trial[(n+L)%(trial.length)] = mutant[(n+L)%(trial.length)];
	}
	for(let i = 0, length1 = trial.length; i < length1; i++){
		if(trial[i] < limits[i].min) trial[i] = limits[i].min;
		else if(trial[i] > limits[i].max) trial[i] = limits[i].max;
	}
	return helpers.copyArray(trial);
}

function recombination(population, mutants, Cr, type, limits){
	var trials = [];
	for(var i = 0; i < population.length; i++)
		trials[i]= recombinationSingle(helpers.copyArray(population[i].vars), helpers.copyArray(mutants[i]), Cr, type, limits);
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
	
	if (s === "synch") {
		for (var g = 0; g < GEN; g++){
			var mutants = mutation(population, F, x, y);
			var trials = recombination(population, mutants, Cr, z, bounds);
			population = selection(population, trials);
		}
	}
	else if (s === "asynch") {
		for (var g = 0; g < GEN; g++){
			for(let i = 0, length1 = population.length; i < length1; i++){
				let firstElement = [];
				if(x !== "rand")
					firstElement = helpers.copyArray(helpers.findBest(population).vars);
				var mutant = mutationSingle(helpers.copyArray(population), helpers.copyArray(population[i].vars), F, x, y, firstElement, i);
				var trial = recombinationSingle(helpers.copyArray(population[i].vars), helpers.copyArray(mutant), Cr, z, bounds);
				var ofValue = of(trial);
				if(ofValue <= population[i].val){
					population[i].val = ofValue;
					population[i].vars = helpers.copyArray(trial);
				}
			}
		}
	}
	console.log(population);
	console.log(helpers.findBest(population));
}

function of(vars){
	/*//cross-leg table
	return (-1*(Math.abs(Math.sin(vars[0])*Math.sin(vars[1])*Math.E**Math.abs(100-((vars[0]**2+vars[1]**2)**0.5)/Math.PI))+1)**(-0.1));*/
	
	/*//rosenbrock
	let sum = 0.0;
	for(let i = 0, length1 = vars.length; i < length1; i++)
		sum += vars[i]**2 - 10*Math.cos(2*Math.PI*vars[i]);
	return (10*vars.length + sum);*/
	
	/*//sphere
	return (vars[0]**2+vars[1]**2);*/
	return (-(vars[1]+47)*Math.sin(Math.sqrt(Math.abs( (vars[0]/2)+(vars[1]+47)))) -vars[0]*Math.sin(Math.sqrt(Math.abs(vars[0]-(vars[1]+47) ))));
}

function Random(seed) {
  this._seed = seed % 2147483647;
  if (this._seed <= 0) this._seed += 2147483646;
}
Random.prototype.next = function () {
  return this._seed = this._seed * 16807 % 2147483647;
};
Random.prototype.nextFloat = function (opt_minOrMax, opt_max) {
	return (this.next() - 1) / 2147483646;
};

var rand = null;