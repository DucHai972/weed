var processingTimes = [];

function submitForm() {
    var temp = [];
    temp.push(parseInt(document.getElementById("a_tiendon").value, 10));
    temp.push(parseInt(document.getElementById("a_phay").value, 10));
    temp.push(parseInt(document.getElementById("a_bao").value, 10));

    temp.push(parseInt(document.getElementById("b_tiendon").value, 10));
    temp.push(parseInt(document.getElementById("b_phay").value, 10));
    temp.push(parseInt(document.getElementById("b_bao").value, 10));

    temp.push(parseInt(document.getElementById("c_tiendon").value, 10));
    temp.push(parseInt(document.getElementById("c_phay").value, 10));
    temp.push(parseInt(document.getElementById("c_bao").value, 10));

    temp.push(parseInt(document.getElementById("d_tiendon").value, 10));
    temp.push(parseInt(document.getElementById("d_phay").value, 10));
    temp.push(parseInt(document.getElementById("d_bao").value, 10));

    for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < 3; j++) {
            row.push(temp[i * 3 + j]);
        }
        processingTimes.push(row);
    }

    console.log(processingTimes);
}

class ProcessingTime {
    constructor() {
        this.steps = [];
    }
}

function calculateDelayTime(processingTimes, order) {
    let numSteps = 4;
    let machineTime = Array(numSteps).fill(0);
    let delay = 0;

    for (let i of order) {
        for (let j = 0; j < numSteps; ++j) {
            machineTime[j] = Math.max(machineTime[j], machineTime[j - 1] || 0) + processingTimes[i][j];
            for (let k = 0; k < j; ++k) {
                if (machineTime[j] > machineTime[k]) {
                    delay += (machineTime[j] - machineTime[k]);
                }
            }
        }
    }

    return delay;
}

function calculateTotalTime(processingTimes, order) {
    let numSteps = 4;
    let machineTime = Array(numSteps).fill(0);

    for (let i of order) {
        for (let j = 0; j < numSteps; ++j) {
            machineTime[j] = Math.max(machineTime[j], machineTime[j - 1] || 0) + processingTimes[i][j];
        }
    }

    return machineTime[numSteps - 1];
}


function main_() {
    let defaultOrder = [];
    for (let i = 0; i < 4; ++i) {
        defaultOrder[i] = i;
    }
    
    let minTotalTime = Infinity;
    let minOrder = [];
    let maxTotalTime = -Infinity;
    let maxOrder = [];
    
    
    function generatePermutations(arr) {
        const result = [];
    
        function permute(arr, start) {
            if (start === arr.length - 1) {
                result.push([...arr]);
                return;
            }
    
            for (let i = start; i < arr.length; ++i) {
                [arr[start], arr[i]] = [arr[i], arr[start]];
                permute(arr, start + 1);
                [arr[start], arr[i]] = [arr[i], arr[start]]; // Backtrack
            }
        }
    
        permute(arr, 0);
        return result;
    }
    
    const permutations = generatePermutations(defaultOrder);
    
    for (let order of permutations) {
        let totalTime = calculateTotalTime(processingTimes, order);
    
        if (totalTime < minTotalTime) {
            minTotalTime = totalTime;
            minOrder = order.slice();
        }
    
        if (totalTime > maxTotalTime) {
            maxTotalTime = totalTime;
            maxOrder = order.slice();
        }
    }
    
    /////
    var body = document.body;
    var result_append = document.createElement("p");
    var minTotalTime_append = "Thời gian nhỏ nhất là: " + minTotalTime;
    var minOrder_append = "Thứ tự tối ưu là: " + minOrder;
    var maxTotalTime_append = "Thời gian lớn nhất là: " + maxTotalTime;
    var maxOrder_append = "Thứ tự không tối ưu là: " + maxOrder;
    
    result_append.innerHTML = minOrder_append + "<br>" + minTotalTime_append + "<br>" + maxTotalTime_append + "<br>" + maxOrder_append;
    body.appendChild(result_append)
    console.log(minTotalTime, maxTotalTime)
    
}

