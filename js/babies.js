// JAN, 2024    Jorge A. Garcia

// USER INPUT DIV
const searchWrapper = document.querySelector(".user-input");
const genselect = searchWrapper.querySelector('select');
const inputMonths = searchWrapper.querySelector("#months");
const inputHeight = searchWrapper.querySelector("#height");
const inputWeight = searchWrapper.querySelector("#weight");
const calcButton = searchWrapper.querySelector("button");

// INITIALIZATION
let ismale = true;
let months = inputMonths.value;
let height = inputHeight.value;
let weight = inputWeight.value;


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

async function getData() {
    let filename = "data/height_girls.csv";
    if (ismale) {
        filename = "data/height_boys.csv"
    }
    const Month = [];
    const P25 = [];
    const P50 = [];
    const P75 = [];
    const response = await fetch(filename);
    const tableraw = (await response.text())
        .split('\n')
        .slice(1)
        .forEach(row => {
            const column = row.split(',');
            Month.push(column[0]);
            P25.push(column[10]);
            P50.push(column[11]);
            P75.push(column[12]);
        });
    return { Month, P25, P50, P75 };
}

async function makeCharts() {
    data = await getData();
    const ctx = document.getElementById('heightChart');

    const myHeightChart = new Chart(ctx, {
        data: {
            labels: data.Month,
            datasets: [{
                type: 'line',
                label: 'Median',
                data: data.P50,
                borderWidth: 1
            },
            {
                type: 'line',
                label: 'P25%',
                data: data.P25,
                borderWidth: 1
            },
            {
                type: 'line',
                label: 'P75%',
                data: data.P75,
                borderWidth: 1
            },
            {
                type: 'scatter',
                label: 'Baby',
                data: [{ x: months, y: height }],
                xAxisID: 'x2'
            }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                },
                x2: {
                    min: 0,
                    max: 60,
                    ticks: {
                        display: false
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Height [cm]'
                }
            }
        }

    });
}