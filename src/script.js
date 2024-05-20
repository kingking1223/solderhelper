document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const pauseBtn = document.getElementById('pauseBtn');
    const resumeBtn = document.getElementById('resumeBtn');
    const resetBtn = document.getElementById('resetBtn');
    const timeDiv = document.getElementById('time');
    const resultDiv = document.getElementById('result');

    let intervalId;
    let timerValue = 0;
    let isPaused = false;

    //////////////////////////////////////////
    
    const points = [
        [0, 20],
        [1.32137030995106,21.640625],
        [4.40456769983687,23.28125],
        [5.72593800978793,23.828125],
        [7.48776508972268,26.015625],
        [9.24959216965742,27.65625],
        [10.1305057096248,28.75],
        [11.4518760195759,29.84375],
        [12.3327895595432,32.03125],
        [14.5350734094617,33.125],
        [15.8564437194127,34.765625],
        [17.6182707993475,36.40625],
        [18.0587275693312,38.046875],
        [21.5823817292007,42.421875],
        [22.9037520391517,44.609375],
        [24.6655791190865,47.34375],
        [26.8678629690049,49.53125],
        [28.6296900489396,51.71875],
        [30.3915171288744,53.90625],
        [32.5938009787928,56.09375],
        [34.7960848287113,58.28125],
        [36.557911908646,61.015625],
        [38.7601957585644,64.296875],
        [40.9624796084829,67.03125],
        [42.7243066884176,69.21875],
        [45.3670473083197,71.953125],
        [48.0097879282219,75.234375],
        [50.2120717781403,77.96875],
        [51.973898858075,80.15625],
        [54.6166394779772,82.34375],
        [56.8189233278956,85.078125],
        [59.021207177814,87.8125],
        [61.6639477977162,90],
        [65.6280587275693,93.828125],
        [67.8303425774878,96.015625],
        [70.0326264274062,98.203125],
        [72.2349102773246,100.390625],
        [74.8776508972267,102.578125],
        [78.4013050570962,105.3125],
        [81.4845024469821,108.59375],
        [84.5676998368679,110.78125],
        [87.21044045677,112.421875],
        [89.8531810766721,114.0625],
        [92.4959216965742,116.25],
        [95.1386623164763,117.890625],
        [97.7814029363785,119.53125],
        [100.424143556281,120.625],
        [103.066884176183,121.71875],
        [107.911908646003,123.359375],
        [105.709624796085,122.265625],
        [110.554649265905,125],
        [114.518760195759,126.09375],
        [117.601957585644,126.640625],
        [120.68515497553,127.1875],
        [123.327895595432,127.734375],
        [126.411092985318,127.734375],
        [129.494290375204,129.375],
        [132.57748776509,130.46875],
        [136.101141924959,131.015625],
        [139.184339314845,131.015625],
        [142.267536704731,131.5625],
        [144.910277324633,131.5625],
        [148.433931484502,132.109375],
        [151.957585644372,132.109375],
        [155.921696574225,133.203125],
        [159.445350734095,133.75],
        [162.969004893964,133.75],
        [166.933115823817,134.84375],
        [170.456769983687,134.84375],
        [174.861337683524,134.84375],
        [177.944535073409,137.03125],
        [182.349102773246,138.671875],
        [185.432300163132,140.859375],
        [188.515497553018,144.140625],
        [192.479608482871,147.421875],
        [195.122349102773,149.0625],
        [197.324632952692,151.796875],
        [199.086460032626,154.53125],
        [200.848287112561,157.265625],
        [202.169657422512,160],
        [204.812398042414,163.28125],
        [207.455138662316,163.28125],
        [210.538336052202,164.921875],
        [214.061990212072,164.375],
        [217.145187601958,163.28125],
        [220.228384991843,160.546875],
        [222.871125611745,157.8125],
        [226.394779771615,155.078125],
        [228.15660685155,151.796875],
        [231.680261011419,149.0625],
        [234.323001631321,145.78125],
        [237.406199021207,143.046875],
        [240.048939641109,140.3125],
        [243.132137030995,137.578125],
        [246.215334420881,134.84375],
        [249.298531810767,131.5625],
        [252.381729200653,128.828125],
        [255.905383360522,126.640625],
        [258.548123980424,123.90625],
        [261.63132137031,121.171875],
        [264.714518760196,120.078125],
        [267.357259380098,117.34375],
        [270.880913539967,113.515625]

    ]
        

    /////////////////////////////////////////

    const updateTimer = () => {
        timerValue += 0.1;
        timeDiv.textContent = `t: ${timerValue.toFixed(2)}`
        resultDiv.textContent = `T: ${yourFunction(timerValue, points).toFixed(2)}`;
    };

    function yourFunction(value, csvData) {
        // Assuming csvData is an array of arrays where each sub-array contains [x, y] pairs
        const xValues = csvData.map(row => row[0]);
        const yValues = csvData.map(row => row[1]);
    
        let minIndex = 0;
        let maxIndex = xValues.length - 1;
    
        // Find the index of the closest x value to the input value
        for (let i = 0; i < xValues.length; i++) {
            if (value >= xValues[i]) {
                minIndex = i;
            } else {
                break;
            }
        }

        maxIndex = minIndex + 1
    
        // Linear interpolation formula
        const slope = (yValues[maxIndex] - yValues[minIndex]) / (xValues[maxIndex] - xValues[minIndex]);
        const intercept = yValues[minIndex] - slope * xValues[minIndex];
        const interpolatedValue = slope * value + intercept;
    
        return interpolatedValue;
    }

    // const yourFunction = (t) => {
    //     let result = 0;
    //     for (let i = 0; i < coe.length; i++) {
    //         result += coe[i] * Math.pow(t, i);
    //     }

    //     return result;
    // };

    startBtn.addEventListener('click', () => {
        if (!intervalId &&!isPaused) {
            intervalId = setInterval(updateTimer, 100);
        }
    });

    pauseBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
        isPaused = true;
    });

    resumeBtn.addEventListener('click', () => {
        if (!intervalId && isPaused) {
            intervalId = setInterval(updateTimer, 100);
        }
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(intervalId);
        intervalId = null;
        timerValue = 0;
        timeDiv.textContent = '';
        resultDiv.textContent = '';
        isPaused = false;
    });
});