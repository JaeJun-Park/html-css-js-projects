var my_singleNumber = function (nums) {
    const counts = {};
    for (let num of nums) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return Object.entries(counts).filter(entry =>
        entry[1] === 1 ? true : false)[0][0];
}

var singleNumber = function (nums) {
    var hash = new Object();
    for (num of nums) {
        if (hash[num] === 1) hash[num]++;
        else hash[num] = 1;
    }
    for (key in hash) {
        if (hash[key] === 1) return key;
    }
}