const testFunctions ={
	rastrigin : {
		name : "Rastrigin",
		nvars : -1,
		definition : function(vars){
			let sum = 0.0;
			for(let i = 0, length1 = vars.length; i < length1; i++)
				sum += vars[i]**2 - 10*Math.cos(2*Math.PI*vars[i]);
			return (10*vars.length + sum);
		},
		bounds : {
			min : -5.12,
			max : 5.12
		},
		globalMinimum : [
			{
				vars : [0.0],
				val : 0.0
			}
		]
	},
	ackley : {
		name : "Ackley",
		nvars : 2,
		definition : function(vars){
			return (-20 * Math.exp(-0.2 * Math.sqrt(0.5*(vars[0]**2 + vars[1]**2))) - Math.exp(0.5* (Math.cos(2*Math.PI*vars[0])+Math.cos(2*Math.PI*vars[1])))+Math.E+20);
		},
		bounds : {
			min : -5.0,
			max : 5.0
		},
		globalMinimum: [
			{
				vars : [0,0],
				val : 0.0
			}
		]
	},
	sphere : {
		name : "Sphere",
		nvars : -1,
		definition : function(vars){
			let sum = 0.0;
			for(let i = 0, length1 = vars.length; i < length1; i++)
				sum += vars[i]**2;
			return sum;
		},
		bounds : {
			min : -100.0,
			max : 100.0
		},
		globalMinimum: [
			{
				vars : [0.0],
				val : 0.0
			}
		]
	},
	rosenbrock : {
		name : "Rosenbrock",
		nvars : -1,
		definition : function(vars){
			let sum = 0.0;
			for(let i = 0, length1 = vars.length; i < length1-1; i++)
				sum += 100*(vars[i+1]-vars[i]**2)**2 + (1-vars[i])**2;
			return sum;
		},
		bounds : {
			min : -100.0,
			max : 100.0
		},
		globalMinimum: [
			{
				vars : [1.0],
				val : 0.0
			}
		]
	},
	beale : {
		name : "Beale",
		nvars : 2,
		definition : function(vars){
			return ((1.5-vars[0]+vars[0]*vars[1])**2 + (2.25 - vars[0] + vars[0]*vars[1]**2)**2 + (2.625 - vars[0]+vars[0]*vars[1]**3)**2);
		},
		bounds : {
			min : -4.5,
			max : 4.5
		},
		globalMinimum: [
			{
				vars : [3.0,0.5],
				val : 0.0
			}
		]
	},
	goldstein : {
		name : "Goldstein - Price",
		nvars : 2,
		definition : function(vars){
			return ((1+(vars[0]+vars[1]+1)**2 * (19-14*vars[0]+3*vars[0]**2-14*vars[1]+5*vars[0]*vars[1]+3*vars[1]**2))*(30+(2*vars[0]-3*vars[1])**2 * (18-32*vars[0]+12*vars[0]**2+48*vars[1]-36*vars[0]*vars[1]+27*vars[1]**2)));
		},
		bounds : {
			min : -2.0,
			max : 2.0
		},
		globalMinimum: [
			{
				vars : [0.0,-1.0],
				val : 3.0
			}
		]
	},
	booth : {
		name : "Booth",
		nvars : 2,
		definition : function(vars){
			return ((vars[0]+2*vars[1]-7)**2+(2*vars[0]+vars[1]-5)**2);
		},
		bounds : {
			min : -10.0,
			max : 10.0
		},
		globalMinimum: [
			{
				vars : [1.0,3.0],
				val : 0.0
			}
		]
	},
	bukin6 : {
		name : "Bukin No. 6",
		nvars : 2,
		definition : function(vars){
			return (100*Math.sqrt(Math.abs(vars[1]-0.01*vars[0]**2))+0.01*Math.abs(vars[0]+10));
		},
		bounds : [
			{
				min : -15.0,
				max : -5.0
			},
			{
				min : -3.0,
				max : 3.0
			}
		],
		globalMinimum: [
			{
				vars : [-10.0,1.0],
				val : 0.0
			}
		]
	},
	matyas : {
		name : "Matyas",
		nvars : 2,
		definition : function(vars){
			return (0.26*(vars[0]**2+vars[1]**2)-0.48*vars[0]*vars[1]);
		},
		bounds : {
			min : -10.0,
			max : 10.0
		},
		globalMinimum: [
			{
				vars : [0.0,0.0],
				val : 0.0
			}
		]
	},
	levi13 : {
		name : "Lévi No. 13",
		nvars : 2,
		definition : function(vars){
			return (Math.sin(3*Math.PI*vars[0])**2 + (vars[0]-1)**2 * (1+ Math.sin(3*Math.PI*vars[1])**2) + (vars[1]-1)**2 * (1+Math.sin(2*Math.PI*vars[1])**2));
		},
		bounds : {
			min : -10.0,
			max : 10.0
		},
		globalMinimum: [
			{
				vars : [1.0,1.0],
				val : 0.0
			}
		]
	},
	himmelblau : {
		name : "Himmelblau",
		nvars : 2,
		definition : function(vars){
			return ((vars[0]**2 + vars[1] - 11)**2 + (vars[0]+vars[1]**2-7)**2);
		},
		bounds : {
			min : -5.0,
			max : 5.0
		},
		globalMinimum: [
			{
				vars : [3.0,2.0],
				val : 0.0
			},
			{
				vars : [-2.805118,3.131312],
				val : 0.0
			},
			{
				vars : [-3.77931,-3.283186],
				val : 0.0
			},
			{
				vars : [3.584428,-1.848126],
				val : 0.0
			}
		]
	},
	threeHump : {
		name : "Three-hump camel",
		nvars : 2,
		definition : function(vars){
			return (2*vars[0]**2 - 1.05*vars[0]**4 + (vars[0]**6/6) + vars[0]*vars[1] + vars[1]**2);
		},
		bounds : {
			min : -5.0,
			max : 5.0
		},
		globalMinimum: [
			{
				vars : [0.0,0.0],
				val : 0.0
			}
		]
	},
	easom : {
		name : "Easom",
		nvars : 2,
		definition : function(vars){
			return (-Math.cos(vars[0])*Math.cos(vars[1])*Math.exp(-((vars[0]-Math.PI)**2 + (vars[1]-Math.PI)**2 )));
		},
		bounds : {
			min : -100.0,
			max : 100.0
		},
		globalMinimum: [
			{
				vars : [Math.PI,Math.PI],
				val : -1.0
			}
		]
	},
	crossInTray : {
		name : "Cross in tray",
		nvars : 2,
		definition : function(vars){
			return (-0.0001*(Math.abs( Math.sin(vars[0])*Math.sin(vars[1])*Math.exp( Math.abs( 100-(Math.sqrt(vars[0]**2+vars[1]**2)/Math.PI) ))))**0.1);
		},
		bounds : {
			min : -10.0,
			max : 10.0
		},
		globalMinimum: [
			{
				vars : [1.34941,1.34941],
				val : 2.06261
			},
			{
				vars : [-1.34941,1.34941],
				val : 2.06261
			},
			{
				vars : [1.34941,-1.34941],
				val : 2.06261
			},
			{
				vars : [-1.34941,-1.34941],
				val : 2.06261
			}
		]
	},
	eggholder : {
		name : "Eggholder",
		nvars : 2,
		definition : function(vars){
			return (-(vars[1]+47)*Math.sin(Math.sqrt(Math.abs( (vars[0]/2)+(vars[1]+47)))) -vars[0]*Math.sin(Math.sqrt(Math.abs(vars[0]-(vars[1]+47) ))));
		},
		bounds : {
			min : -100.0,
			max : 100.0
		},
		globalMinimum: [
			{
				vars : [Math.PI,Math.PI],
				val : -1.0
			}
		]
	},
	holderTable : {
		name : "Hölder table",
		nvars : 2,
		definition : function(vars){
			return (-Math.abs(Math.sin(vars[0])*Math.cos(vars[1])*Math.exp(Math.abs(1-(Math.sqrt(vars[0]**2 + vars[1]**2)/Math.PI)))));
		},
		bounds : {
			min : -10.0,
			max : 10.0
		},
		globalMinimum: [
			{
				vars : [8.05502,9.66459],
				val : -19.2085
			},
			{
				vars : [-8.05502,9.66459],
				val : -19.2085
			},
			{
				vars : [8.05502,-9.66459],
				val : -19.2085
			},
			{
				vars : [-8.05502,-9.66459],
				val : -19.2085
			}
		]
	},
	mcCormick : {
		name : "McCormick",
		nvars : 2,
		definition : function(vars){
			return (Math.sin(vars[0]+vars[1])+(vars[0]-vars[1])**2 - 1.5*vars[0] + 2.5*vars[1] +1);
		},
		bounds : [
			{
				min : -1.5,
				max : 4.0
			},
			{
				min : -3.0,
				max : 4.0
			}
		],
		globalMinimum: [
			{
				vars : [-0.54719,-1.54719],
				val : -1.9133
			}
		]
	},
	schaffer2 : {
		name : "Schaffer no. 2",
		nvars : 2,
		definition : function(vars){
			return (0.5 + ((Math.sin(vars[0]**2-vars[1]**2)**2-0.5)/(1+0.001*(vars[0]**2+vars[1]**2))**2));
		},
		bounds : {
			min : -100.0,
			max : 100.0
		},
		globalMinimum: [
			{
				vars : [0.0,0.0],
				val : 0.0
			}
		]
	},
	schaffer4 : {
		name : "Schaffer no. 4",
		nvars : 2,
		definition : function(vars){
			return (0.5 + ((Math.cos( Math.sin(Math.abs(vars[0]**2-vars[1]**2)) )**2-0.5)/(1+0.001*(vars[0]**2+vars[1]**2))**2));
		},
		bounds : {
			min : -100.0,
			max : 100.0
		},
		globalMinimum: [
			{
				vars : [0.0,1.25313],
				val : 0.292579
			}
		]
	},
	styblinskiTang : {
		name : "Styblinski - Tang",
		nvars : -1,
		definition : function(vars){
			let sum = 0.0;
			for(let i = 0, length1 = vars.length; i < length1; i++)
				sum += vars[i]**4 - 16*vars[i]**2 + 5*vars[i]
			return (sum/2.0);
		},
		bounds : {
			min : -5.0,
			max : 5.0
		},
		globalMinimum: [
			{
				vars : [-2.903534],
				val : -39.166165*nvars
			}
		]
	}
}