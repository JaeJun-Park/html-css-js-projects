/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let result;
    const triplets = []
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            for (let k = j + 1; k < nums.length; k++) {
                let triplet = [nums[i], nums[j], nums[k]];
                if (triplet.reduce((a, b) => a + b, 0) === 0) {
                    triplet.sort();
                    triplets.push(triplet);
                }
            }
        }
    }
    result = [...new Map(triplets.map(triplet => [JSON.stringify(triplet), triplet])).values()];
    return result;
};

const inputs = [];
inputs.push([0, 0, 0]);
inputs.push([-1, 0, 1, 2, -1, -4]);
inputs.push([0, 1, 1]);
for (input of inputs) {
    console.log(threeSum(input));
}

