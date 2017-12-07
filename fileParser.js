/*
    Goes through a text file line by line and prints some statistical information regarding the data.

    Author: BigyanDahal

*/

const fs = require('fs'); 

fs.readFile('test-data-10-exp-5.list', 'utf8', (err, data)=> {
  if (err) throw err;

  const firstNameContainer  = separateFirstAndSecondNames(data).firstNameContainer; 
  const secondNameContainer = separateFirstAndSecondNames(data).secondNameContainer; 

  const uniqueNames = generateUniqueNames(firstNameContainer, secondNameContainer); 
  
  console.log('******************************************'); 
  // Question 1: 
  console.log('There are '+ uniqueNames.fullNameSet.size + ' unique full names.'); 
  console.log('There are '+ uniqueNames.firstNameSet.size + ' unique first names.'); 
  console.log('There are '+ uniqueNames.secondNameSet.size + ' unique last names.'); 

  // 2, 3
  generateMostCommonNames(firstNameContainer, secondNameContainer);

  // 4
  identify25UniqueNames(firstNameContainer, secondNameContainer, uniqueNames.firstNameSet, uniqueNames.secondNameSet); 
  
});

function separateFirstAndSecondNames(data){
  const lines = data.split('\n'); 
  const wellFormattedLines = []; 
  const namesContainerObject = {
    firstNameContainer: [], 
    secondNameContainer: []
  }; 
  let linesLength = lines.length;
  for(var line = 0; line<linesLength; line++){
      if(lines[line][0] !== ' '){
        wellFormattedLines.push(lines[line]); 
        // work on pulling the second names
        let secondName = lines[line].split(',')[0];
        if(secondName){
           namesContainerObject.secondNameContainer.push(secondName); 
        }; 

        // work on the first names next
        let firstName = lines[line].split(',')[1];
        if(firstName){
              let dashIndex = firstName.indexOf('-');  
              let cleanName = firstName.slice(1, dashIndex); 
             let spaceIndex = firstName.indexOf(' '); 
          let formattedName = cleanName.slice(0, spaceIndex-1); 
           namesContainerObject.firstNameContainer.push(formattedName); 
        }; 
      }; 
  }; 
  return namesContainerObject; 
}; 

function generateUniqueNames(firstNameContainer, secondNameContainer){
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
  
  let uniqueNames={
    firstNameSet: firstNameSet, 
    secondNameSet: secondNameSet, 
    fullNameSet: fullNameSet
  }; 

  return uniqueNames; 
}; 

function generateMostCommonNames(firstNameContainer, secondNameContainer){
  let firstNameObjects  ={}; 
  let secondNameObjects ={}; 
  let firstNameContainerLength=firstNameContainer.length;
  let secondNameContainerLength=secondNameContainer.length;

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

  let sortableFirstNamesLength = sortableFirstNames.length; 
  let sortableSecondNamesLength = sortableSecondNames.length;
    console.log('******************************************'); 

  for(let i=sortableFirstNamesLength-1; i>(sortableFirstNamesLength)-11; i--){
    console.log('The ten most common first names are: ' + sortableFirstNames[i][0]+'['+sortableFirstNames[i][1] +']'); 
  }; 

  for(let i=sortableSecondNamesLength-1; i>(sortableSecondNamesLength)-11; i--){
    console.log('The ten most common second names are: ' + sortableSecondNames[i][0]+'['+sortableSecondNames[i][1] +']'); 
  }; 
}; 

function identify25UniqueNames(firstNameContainer, secondNameContainer, firstNameSet, secondNameSet){
  // Part A
  let newfirstNameObj  = {};
  let newSecondNameObj = {}; 
  let uniqueNames = []; 
  let firstNameContainerLength = firstNameContainer.length; 
  for(let i = 0; i<firstNameContainerLength; i++){
    if(!newfirstNameObj[firstNameContainer[i]]){
      newfirstNameObj[firstNameContainer[i]] =  'Unique first name'; 
      if(!newSecondNameObj[secondNameContainer[i]]){
      newSecondNameObj[secondNameContainer[i]] =  'Unique last name'; 
      if(newfirstNameObj[firstNameContainer[i]] && newSecondNameObj[secondNameContainer[i]]){
          let uniqueName= {
            firstName: firstNameContainer[i], 
            secondName: secondNameContainer[i],
          }; 
          uniqueNames.push(uniqueName); 
       }; 
     }; 
    };
  }; 
  console.log('****************************************'); 
  // First 25 completely unique names in the list
  console.log('First completely unique names in the list are: '); 
  for(let i = 0; i<25; i++){
    console.log(uniqueNames[i].secondName + ', ' + uniqueNames[i].firstName)
  }; 

  // Part B
  let uniqueFirstNames = []; 
  let uniqueLastNames = []; 
  let newNames = []; 
  for(let ln of secondNameSet){
      uniqueLastNames.push(ln); 
  }; 
  for(let fn of firstNameSet){
   uniqueFirstNames.push(fn)
  }; 
  let j = 0; 
  for(let i = 0; i<25; i++){
    let name = {
      firstName: uniqueFirstNames[i], 
      secondName: uniqueLastNames[j]
    }; 
    newNames.push(name); 
    j++; 
  }; 
  console.log('****************************************'); 
  console.log('First 25 unique names in the list are: '); 
  for(let i = 0; i<25; i++){
    console.log(newNames[i].secondName + ', ' + newNames[i].firstName)
  };
};
