/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    const result = [];
    const hash = new Object();
    for (num of nums) {
        hash[num] = hash[num] ? hash[num] + 1 : 1;
    }
    for (key in hash) {
        if (hash[key] > nums.length / 2) {
            result.push(key);
        }
    }
    return result;
}

console.log(majorityElement([2, 2, 1, 1, 1, 2, 2, 2]));