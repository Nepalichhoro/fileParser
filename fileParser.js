/*
    Goes through a text file line by line and prints some statistical information regarding the data.

    Author: BigyanDahal

*/

const fs = require('fs'); 

fs.readFile('test-data-10-exp-5.list', 'utf8', (err, data)=> {
  if (err) throw err;
  let lines = data.split('\n'); 
  let wellFormattedLines = []; 
  let firstNameContainer = []; 
  let secondNameContainer = []; 

  let linesLength = lines.length;
  for(var line = 0; line<linesLength; line++){
      if(lines[line][0] !== ' '){
      	wellFormattedLines.push(lines[line]); 
      	// work on pulling the second names
        let secondName = lines[line].split(',')[0];
      	if(secondName){
      		secondNameContainer.push(secondName); 
      	}; 

      	// work on the first names next
      	let firstName = lines[line].split(',')[1];
      	if(firstName){
      		    let dashIndex = firstName.indexOf('-');  
      		    let cleanName = firstName.slice(1, dashIndex); 
      		   let spaceIndex = firstName.indexOf(' '); 
      		let formattedName = cleanName.slice(0, spaceIndex-1); 
      		firstNameContainer.push(formattedName); 
      	}; 
      }; 
  }; 

  // Get the unique first names via set object
  let firstNameSet = new Set(); 
  firstNameContainer.forEach(element=>{
  	firstNameSet.add(element); 
  }); 
  // Get the unique first names
  let secondNameSet = new Set(); 
  secondNameContainer.forEach(element=>{
  	secondNameSet.add(element); 
  }); 
  // Get the unique combined names
  let firstNameContainerLength  = firstNameContainer.length; 
  let secondNameContainerLength = secondNameContainer.length;
  let combinedNames = []; 
  for(let i=0;i<firstNameContainerLength; i++){
  	let combinedName = firstNameContainer[i].concat(secondNameContainer[i]); 
  	combinedNames.push(combinedName); 
  }; 

  let fullNameSet = new Set(); 
  combinedNames.forEach(element=>{
  	fullNameSet.add(element); 
  }); 

  // Question 1: 
  console.log('There are '+ fullNameSet.size + ' unique full names.'); 
	console.log('There are '+ firstNameSet.size + ' unique first names.'); 
	console.log('There are '+ secondNameSet.size + ' unique last names.'); 

	let firstNameObjects  ={}; 
	let secondNameObjects ={}; 
	for(let i=0; i<firstNameContainerLength; i++){
		if(!firstNameObjects[firstNameContainer[i]]){
			firstNameObjects[firstNameContainer[i]] = 1; 
		}; 
		if(firstNameObjects[firstNameContainer[i]]){
			firstNameObjects[firstNameContainer[i]]++; 
		}; 
	}; 

	for(let i=0; i<secondNameContainerLength; i++){
		if(!secondNameObjects[secondNameContainer[i]]){
			secondNameObjects[secondNameContainer[i]] = 1; 
		}; 
		if(secondNameObjects[secondNameObjects[i]]){
			secondNameObjects[secondNameObjects[i]]++; 
		}; 
	}; 

	// sortable objects
	let sortableFirstNames = [];
	for (var fn in firstNameObjects){
	    sortableFirstNames.push([fn, firstNameObjects[fn]]);
	};

	let sortableSecondNames = []; 
	for (var sn in secondNameObjects){
	    sortableSecondNames.push([sn, secondNameObjects[sn]]);
	};

	sortableFirstNames.sort((a, b)=>{
	    return a[1] - b[1];
	});
  
  sortableSecondNames.sort((a, b)=>{
      return a[1] - b[1];
  });

	// Q2. Q3
  let sortableFirstNamesLength = sortableFirstNames.length; 
  let sortableSecondNamesLength = sortableSecondNames.length;
	for(let i=sortableFirstNamesLength-1; i>(sortableFirstNamesLength)-11; i--){
		console.log('The ten most common first names are: ' + sortableFirstNames[i][0]+'['+sortableFirstNames[i][1] +']'); 
	}; 

	for(let i=sortableSecondNamesLength-1; i>(sortableSecondNamesLength)-11; i--){
		console.log('The ten most common second names are: ' + sortableSecondNames[i][0]+'['+sortableSecondNames[i][1] +']'); 
	}; 
});