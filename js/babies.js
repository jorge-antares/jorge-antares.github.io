// JAN, 2024    Jorge A. Garcia
let isDarkMode = false;

// USER INPUT DIV
const genselect = document.getElementById('gendersel');
const inputMonths = document.getElementById('months');
const inputHeight = document.getElementById('height');
const inputWeight = document.getElementById('weight');
const calcButton = document.getElementById('generate-charts-btn');

// INITIALIZATION
let ismale = true;
let months = inputMonths.value;
let height = inputHeight.value;
let weight = inputWeight.value;
var myHeightChart;
var myHeightAcumChart;
var myWeightChart;
var myWeightAcumChart;

main();
async function main() {
    // 1. IS MALE?
    genselect.onchange = async (elem) => {
        ismale = elem.target.value == 'male';
        console.log("Is male? " + ismale);
    }

    // 2. MONTHS
    inputMonths.onkeyup = async (elem) => {
        months = elem.target.value;
        console.log("Months " + months);
    }

    // 3. HEIGHT
    inputHeight.onkeyup = async (elem) => {
        height = elem.target.value;
        console.log("Height " + height);
    }

    // 4. WEIGHT
    inputWeight.onkeyup = async (elem) => {
        weight = elem.target.value;
        console.log("Weight " + weight);
    }
}

async function getData(attribute) {
    let bias = 0;
    let heightfile = `data/${attribute}_girls.csv`;
    if (ismale) {
        heightfile = `data/${attribute}_boys.csv`;
    }
    if (attribute == 'weight') {
        bias = 1;
    }
    const Month = [];
    const P01 = [];
    const P1 = [];
    const P5 = [];
    const P10 = [];
    const P15 = [];
    const P25 = [];
    const P50 = [];
    const P75 = [];
    const P85 = [];
    const P90 = [];
    const P95 = [];
    const P99 = [];
    const P999 = [];
    const response = await fetch(heightfile);
    const tableraw = (await response.text())
        .split('\n')
        .slice(1)
        .forEach(row => {
            const column = row.split(',');
            Month.push(column[0]);
            P01.push(column[5 - bias]);
            P1.push(column[6 - bias]);
            P5.push(column[8 - bias]);
            P10.push(column[9 - bias]);
            P15.push(column[10 - bias]);
            P25.push(column[11 - bias]);
            P50.push(column[12 - bias]);
            P75.push(column[13 - bias]);
            P85.push(column[14 - bias]);
            P90.push(column[15 - bias]);
            P95.push(column[16 - bias]);
            P99.push(column[18 - bias]);
            P999.push(column[19 - bias]);
        });
    return { Month, P01, P1, P5, P10, P15, P25, P50, P75, P85, P90, P95, P99, P999 };
}

async function makeCharts() {
    data_height = await getData('height');
    data_weight = await getData('weight');

    const months_min = 0//Math.max(Math.round(months) - 30, 0);
    const months_max = 60//Math.min(Math.round(months) + 30, 60);
    const h_percentiles = interpolateSeries(data_height, months);
    const w_percentiles = interpolateSeries(data_weight, months);

    const ctx_height = document.getElementById('heightChart');
    const ctx_heightAcum = document.getElementById('heightAcum');
    const ctx_weight = document.getElementById('weightChart');
    const ctx_weightAcum = document.getElementById('weightAcum');

    if (myHeightChart) {
        myHeightChart.destroy();
    };
    if (myHeightAcumChart) {
        myHeightAcumChart.destroy();
    };
    if (myWeightChart) {
        myWeightChart.destroy();
    };
    if (myWeightAcumChart) {
        myWeightAcumChart.destroy();
    };

    if (height && months) {
        myHeightChart = new Chart(ctx_height, {
            data: {
                labels: data_height.Month,
                datasets: [
                    {
                        type: 'scatter',
                        label: 'Baby',
                        data: [{ x: months, y: height }],
                        pointStyle: 'triangle',
                        pointRadius: 7,
                        borderWidth: 2,
                        backgroundColor: '#CCFF66',
                        pointBorderColor: 'rgb(0, 0, 0)',
                        xAxisID: 'x2'
                    },
                    {
                        type: 'line',
                        label: '0.1%',
                        data: data_height.P01,
                        borderWidth: 1,
                        backgroundColor: '#e3f2fd',
                    },
                    {
                        type: 'line',
                        label: '1%',
                        data: data_height.P1,
                        borderWidth: 1,
                        backgroundColor: '#e3f2fd',
                    },
                    {
                        type: 'line',
                        label: '5%',
                        data: data_height.P5,
                        borderWidth: 1,
                        backgroundColor: '#bbdefb'
                    },
                    {
                        type: 'line',
                        label: '10%',
                        data: data_height.P10,
                        borderWidth: 1,
                        backgroundColor: '#64b5f6'
                    },
                    {
                        type: 'line',
                        label: '15%',
                        data: data_height.P15,
                        borderWidth: 1,
                        backgroundColor: '#2196f3'
                    },
                    {
                        type: 'line',
                        label: '25%',
                        data: data_height.P25,
                        borderWidth: 1,
                        backgroundColor: '#7b1fa2'
                    },
                    {
                        type: 'line',
                        label: '50%',
                        data: data_height.P50,
                        borderWidth: 1,
                        backgroundColor: '#e91e63'
                    },
                    {
                        type: 'line',
                        label: '75%',
                        data: data_height.P75,
                        borderWidth: 1,
                        backgroundColor: '#7b1fa2'
                    },
                    {
                        type: 'line',
                        label: '85%',
                        data: data_height.P85,
                        borderWidth: 1,
                        backgroundColor: '#2196f3'
                    },
                    {
                        type: 'line',
                        label: '90%',
                        data: data_height.P90,
                        borderWidth: 1,
                        backgroundColor: '#64b5f6'
                    },
                    {
                        type: 'line',
                        label: '95%',
                        data: data_height.P95,
                        borderWidth: 1,
                        backgroundColor: '#bbdefb'
                    },
                    {
                        type: 'line',
                        label: '99%',
                        data: data_height.P99,
                        borderWidth: 1,
                        backgroundColor: '#e3f2fd'
                    },
                    {
                        type: 'line',
                        label: '99.9%',
                        data: data_height.P999,
                        borderWidth: 1,
                        backgroundColor: '#e3f2fd',
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: "cm" }
                    },
                    x: {
                        min: months_min,
                        max: months_max,
                        title: { display: true, text: "Month" }
                    },
                    x2: {
                        min: months_min,
                        max: months_max,
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                plugins: {
                    //title: {
                    //    display: true,
                    //    text: 'Height in cm',
                    //    font: { size: 15 }
                    //}
                },
                maintainAspectRatio: false
            }
        });
    }
    if (height && months) {
        myHeightAcumChart = new Chart(ctx_heightAcum, {
            data: {
                labels: h_percentiles.X,
                datasets: [{
                    type: 'line',
                    label: `Height percentiles for month ${months}`,
                    data: h_percentiles.P,
                    borderWidth: 1,
                    borderColor: 'rgb(106, 90, 205)',
                    backgroundColor: 'rgb(106, 90, 205)',
                    tension: 0.
                },
                {
                    type: 'scatter',
                    label: 'Baby',
                    data: [{ x: height, y: getPercentile(h_percentiles, height) }],
                    pointStyle: 'triangle',
                    pointRadius: 7,
                    borderWidth: 2,
                    backgroundColor: '#CCFF66',
                    pointBorderColor: 'rgb(0, 0, 0)',
                    xAxisID: 'x2'
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        min: Math.min(Math.floor(h_percentiles.X[0]), height),
                        max: Math.max(Math.ceil(h_percentiles.X[h_percentiles.X.length - 1], height)),
                        title: { display: true, text: "cm" }
                    },
                    x2: {
                        type: 'linear',
                        min: Math.min(Math.floor(h_percentiles.X[0]), height),
                        max: Math.max(Math.ceil(h_percentiles.X[h_percentiles.X.length - 1], height)),
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: false
            }
        });
    }
    if (weight && months) {
        myWeightChart = new Chart(ctx_weight, {
            data: {
                labels: data_weight.Month,
                datasets: [
                    {
                        type: 'scatter',
                        label: 'Baby',
                        data: [{ x: months, y: weight }],
                        pointStyle: 'triangle',
                        pointRadius: 7,
                        borderWidth: 2,
                        backgroundColor: '#CCFF66',
                        pointBorderColor: 'rgb(0, 0, 0)',
                        xAxisID: 'x2'
                    },
                    {
                        type: 'line',
                        label: '0.1%',
                        data: data_weight.P01,
                        borderWidth: 1,
                        backgroundColor: '#ccfff2',
                    },
                    {
                        type: 'line',
                        label: '1%',
                        data: data_weight.P1,
                        borderWidth: 1,
                        backgroundColor: '#ccfff2',
                    },
                    {
                        type: 'line',
                        label: '5%',
                        data: data_weight.P5,
                        borderWidth: 1,
                        backgroundColor: '#99ffe6'
                    },
                    {
                        type: 'line',
                        label: '10%',
                        data: data_weight.P10,
                        borderWidth: 1,
                        backgroundColor: '#66ffd9'
                    },
                    {
                        type: 'line',
                        label: '15%',
                        data: data_weight.P15,
                        borderWidth: 1,
                        backgroundColor: '#1affc6'
                    },
                    {
                        type: 'line',
                        label: '25%',
                        data: data_weight.P25,
                        borderWidth: 1,
                        backgroundColor: '#00cc99'
                    },
                    {
                        type: 'line',
                        label: '50%',
                        data: data_weight.P50,
                        borderWidth: 1,
                        backgroundColor: '#e91e63'
                    },
                    {
                        type: 'line',
                        label: '75%',
                        data: data_weight.P75,
                        borderWidth: 1,
                        backgroundColor: '#00cc99'
                    },
                    {
                        type: 'line',
                        label: '85%',
                        data: data_weight.P85,
                        borderWidth: 1,
                        backgroundColor: '#1affc6'
                    },
                    {
                        type: 'line',
                        label: '90%',
                        data: data_weight.P90,
                        borderWidth: 1,
                        backgroundColor: '#66ffd9'
                    },
                    {
                        type: 'line',
                        label: '95%',
                        data: data_weight.P95,
                        borderWidth: 1,
                        backgroundColor: '#99ffe6'
                    },
                    {
                        type: 'line',
                        label: '99%',
                        data: data_weight.P99,
                        borderWidth: 1,
                        backgroundColor: '#ccfff2'
                    },
                    {
                        type: 'line',
                        label: '99.9%',
                        data: data_weight.P999,
                        borderWidth: 1,
                        backgroundColor: '#ccfff2',
                    }
                ]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: false,
                        title: { display: true, text: "kg" }
                    },
                    x: {
                        min: months_min,
                        max: months_max,
                        title: { display: true, text: "Month" }
                    },
                    x2: {
                        min: months_min,
                        max: months_max,
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    }
                },
                //plugins: {
                //    title: {
                //        display: true,
                //        text: 'Weight in kg',
                //        font: { size: 15 }
                //    }
                //},
                maintainAspectRatio: false
            }
        });
    }
    if (weight && months) {
        myWeightAcumChart = new Chart(ctx_weightAcum, {
            data: {
                labels: w_percentiles.X,
                datasets: [{
                    type: 'line',
                    label: `Weight percentiles for month ${months}`,
                    data: w_percentiles.P,
                    borderWidth: 1,
                    borderColor: 'rgb(60, 179, 113)',
                    backgroundColor: 'rgb(60, 179, 113)',
                    tension: 0.
                },
                {
                    type: 'scatter',
                    label: 'Baby',
                    data: [{ x: weight, y: getPercentile(w_percentiles, weight) }],
                    pointStyle: 'triangle',
                    pointRadius: 7,
                    borderWidth: 2,
                    backgroundColor: '#CCFF66',
                    pointBorderColor: 'rgb(0, 0, 0)',
                    xAxisID: 'x2'
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        min: Math.min(Math.floor(w_percentiles.X[0]), weight),
                        max: Math.max(Math.ceil(w_percentiles.X[w_percentiles.X.length - 1], weight)),
                        title: { display: true, text: "kg" }
                    },
                    x2: {
                        type: 'linear',
                        min: Math.min(Math.floor(w_percentiles.X[0]), weight),
                        max: Math.max(Math.ceil(w_percentiles.X[w_percentiles.X.length - 1], weight)),
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: { beginAtZero: true }
                },
                maintainAspectRatio: false
            }
        });
    }
}

function interpolateSeries(input_data, m) {
    const m0 = Math.floor(m);
    const m1 = m0 + 1;
    const alpha = m - m0;
    return {
        P: [0.1, 1, 5, 10, 15, 25, 50, 75, 85, 90, 95, 99, 99.9],
        X: [
            input_data.P01[m0] * (1 - alpha) + input_data.P01[m1] * alpha,
            input_data.P1[m0] * (1 - alpha) + input_data.P1[m1] * alpha,
            input_data.P5[m0] * (1 - alpha) + input_data.P5[m1] * alpha,
            input_data.P10[m0] * (1 - alpha) + input_data.P10[m1] * alpha,
            input_data.P15[m0] * (1 - alpha) + input_data.P15[m1] * alpha,
            input_data.P25[m0] * (1 - alpha) + input_data.P25[m1] * alpha,
            input_data.P50[m0] * (1 - alpha) + input_data.P50[m1] * alpha,
            input_data.P75[m0] * (1 - alpha) + input_data.P75[m1] * alpha,
            input_data.P85[m0] * (1 - alpha) + input_data.P85[m1] * alpha,
            input_data.P90[m0] * (1 - alpha) + input_data.P90[m1] * alpha,
            input_data.P95[m0] * (1 - alpha) + input_data.P95[m1] * alpha,
            input_data.P99[m0] * (1 - alpha) + input_data.P99[m1] * alpha,
            input_data.P999[m0] * (1 - alpha) + input_data.P999[m1] * alpha
        ]
    }
}

function getPercentile(percentiles, m) {
    for (let i = 0; i < percentiles.X.length - 1; i++) {
        if (percentiles.X[i] <= m && percentiles.X[i + 1] > m) {
            const x0 = parseFloat(percentiles.X[i]);
            const x1 = parseFloat(percentiles.X[i + 1]);
            const beta = (m - x0) / (x1 - x0);
            const f0 = parseFloat(percentiles.P[i]);
            const f1 = parseFloat(percentiles.P[i + 1]);
            return f0 + beta * (f1 - f0);
        }
    }
    return 0;
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    if (myHeightChart) makeCharts();
}
function getChartOptions(isDark) {
    return {
        plugins: {
            legend: {
                labels: {
                    color: isDark ? '#ffffff' : '#333333'
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: isDark ? '#404040' : '#ddd'
                },
                ticks: {
                    color: isDark ? '#ffffff' : '#333333'
                }
            },
            y: {
                grid: {
                    color: isDark ? '#404040' : '#ddd'
                },
                ticks: {
                    color: isDark ? '#ffffff' : '#333333'
                }
            }
        }
    };
}