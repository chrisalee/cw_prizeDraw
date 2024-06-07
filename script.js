function rank(st, we, n) {
  const names = st.split(',');
  if(names.length === 0 || st === "") return 'No participants';
  if(n > names.length) return "Not enough participants";

  const alphabet = {
        A: 1, B: 2, C: 3, D: 4, E: 5,
        F: 6, G: 7, H: 8, I: 9, J: 10,
        K: 11, L: 12, M: 13, N: 14, O: 15,
        P: 16, Q: 17, R: 18, S: 19, T: 20,
        U: 21, V: 22, W: 23, X: 24, Y: 25, Z: 26
    };
  
  const participantNumbers = [];
  
  for(let i = 0; i < names.length; i++) {
    let currName = names[i].toUpperCase().split('')
    let currNameScore = 0;
    let weight = we[i];
    
    for(let letter = 0; letter < currName.length; letter++) {
      let currLetter = currName[letter];
      currNameScore += alphabet[currLetter];
    }
    participantNumbers.push((currNameScore + names[i].length) * weight);
  }
  
  const original = [...participantNumbers]
  let decreasingOrder = participantNumbers.sort((a, b) => b - a);
  let winnerNumber = decreasingOrder[n - 1];

  let possibleResults = [];
  for (let i = 0; i < original.length; i++) {
      if (original[i] === winnerNumber) possibleResults.push(names[i]);
  }

  let results = possibleResults.sort();
  let finalAns = results[0];
  
  if(results.length === n) return results[n - 1];
  return finalAns;
}

       ///////////////////////////////////////////////////////////////// solution i liked
function rank(st, we, n) {
  
  if (!hasParticipants(st)) {
    return 'No participants';
  }
  
  let firstnames = st.split(',');
  
  let computedWinningNumbers =  firstnames.map(function(firstname, index) {
    const rankOfName = computeRankOfFirstname(firstname);
    const winningNumber = we[index] * rankOfName;
    
    return {
      firstname: firstname,
      winningNumber: winningNumber
    };
  });
  
  const sorted = sortByWinningNumbers(computedWinningNumbers);
  
  if (n > firstnames.length) {
    return 'Not enough participants';
  }
  
  return sorted[n-1].firstname;
}

function sortByWinningNumbers(computedWinningNumbers) {
  return computedWinningNumbers.sort(function(a, b){
  		if (a.winningNumber > b.winningNumber) {
    		return -1 
      } else if (a.winningNumber < b.winningNumber) {
      	return 1;
      } else {
      	if (a.firstname < b.firstname) {
        	return -1;
        } else if (a.firstname > b.firstname){
        	return 1;
        } else {
          return 0;
        }
      }
  });
}

function getLetterValue(letter) {
  // Use the ASCII value to get the order position of letter.
  return letter.toLowerCase().charCodeAt(0) - 96;
}

function computeRankOfFirstname(firstname) {
  return firstname.length + firstname.split('').reduce(function(acc, letter) {
  	return acc + getLetterValue(letter);
  }, 0);
}

function hasParticipants(st) {
  const participants = st.split(',');
  return participants.length === 1 && participants[0] === '' ? false : true;
}
