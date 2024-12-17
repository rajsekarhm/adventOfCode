const path = require("path");
const fs = require("fs");
var splitedInputByArray = fs.readFileSync("./input.txt", "utf-8").split(`\n`);
let ans = 0;
let anss = 0
const unsafe = [];

function removeIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

function isSafe(nums) {
  console.log(nums);
  const inc = nums[1] > nums[0];
  if (inc) {
    for (let i = 1; i < nums.length; i++) {
      const diff = nums[i] - nums[i - 1];
      if (!(1 <= diff && diff <= 3)) {
        return {numss:nums,anss:false};
      }
    }
    return  {numss:nums,anss:true};;
  } else {
    for (let i = 1; i < nums.length; i++) {
      const diff = nums[i] - nums[i - 1];
      if (!(-3 <= diff && diff <= -1)) {
        return {numss:nums,anss:false};
      }
    }
    return  {numss:nums,anss:true};;
  }
}

function isSafeByLevel(nums) {
    const inc = nums[1] > nums[0];
    if (inc) {
      for (let i = 1; i < nums.length; i++) {
        const diff = nums[i] - nums[i - 1];
        if (!(1 <= diff && diff <= 3)) {
          return false;
        }
      }
      return  true;;
    } else {
      for (let i = 1; i < nums.length; i++) {
        const diff = nums[i] - nums[i - 1];
        if (!(-3 <= diff && diff <= -1)) {
          return false;
        }
      }
      return true;;
    }
  }

// Process each line
for (const line of splitedInputByArray) {
  const nums = line.split(" ").map(Number);
  const {anss,numss} = isSafe(nums);
  if (!anss) {
    unsafe.push(numss);
    continue;
  }
  if (anss) {
    ans++;
  }
}

const arrayContainsTrue = (arr) => arr.includes(true);

for (const arey of unsafe) {
    const end = arey.map((ele,index)=>{
        return isSafeByLevel(removeIndex(arey,index))
    })
    if(arrayContainsTrue(end)){
        anss++
    }
}


console.log("ans",ans,"anss",anss)
console.log(ans+anss)
