const path = require("path");
const fs = require("fs");
const inputFile = fs.readFileSync("./input.txt", "utf-8");
const AfterSplit = inputFile.split(`\n`);
var endresult = AfterSplit.reduce(
  (acc, value) => {
    const splitedArray = value.split(`   `);
    acc.leftMostArray.push(splitedArray[0]);
    acc.rightMostArray.push(splitedArray[1]);
    return acc;
  },
  { leftMostArray: [], rightMostArray: [] }
);


function numberOfOccurence(number) { 
    let count = 0
    for(let i=0;i<endresult.rightMostArray.length;i++){
        if(number == endresult.rightMostArray[i]){
            count = count + 1
        }
    }
    return {
        _number:number,
        occurence:count
    }
}
var findOccurenceProblem =[ ]
endresult.leftMostArray = endresult.leftMostArray.sort();
endresult.rightMostArray = endresult.rightMostArray.sort();

for (let i = 0; i < endresult.leftMostArray.length; i++) {
    findOccurenceProblem.push(numberOfOccurence(endresult.leftMostArray[i])
)
//   resultAfterArraySub =resultAfterArraySub +Math.abs(endresult.leftMostArray[i] - endresult.rightMostArray[i]);
}
var endGame  = 0 


for(let i =0 ; i<findOccurenceProblem.length;i++){
    endGame  = endGame + findOccurenceProblem[i]["_number"] * findOccurenceProblem[i]['occurence']
}

console.log(endGame)
