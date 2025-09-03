//  names.js
//  sep 2024    Jorge A. Garcia

const genselect = document.getElementById('gendersel');
const inputBox = document.getElementById('nameInput');
const suggBox = document.querySelector('.autocom-box');
let myChart;

let maledata, femaledata, maleunique, femaleunique, ismale = true;

main();

async function main() {
    // 1. GET DATA
    maledata = await getData("data/male.json");
    femaledata = await getData("data/female.json");
    maleunique = await getData("data/maleunique.json");
    femaleunique = await getData("data/femaleunique.json");
    ismale = true;

    // 2. IS MALE?
    genselect.onchange = (elem) => {
        ismale = elem.target.value == 'male';
        inputBox.value = "";
        inputBox.setAttribute("placeholder", "Type name...");
        suggBox.classList.remove("show");
    }

    // 3. SEARCH BAR
    inputBox.onkeyup = (elem) => {
        const value = elem.target.value;
        let names_filtered = [];

        if (value) {
            // FILTER
            if (ismale) {
                names_filtered = maleunique.filter((entry) => {
                    return entry.toLowerCase().startsWith(value.toLowerCase());
                });
            } else {
                names_filtered = femaleunique.filter((entry) => {
                    return entry.toLowerCase().startsWith(value.toLowerCase());
                });
            }
            names_filtered.sort();

            // ADD LIST
            let names_shown = names_filtered.map(name => `<li class="list-group-item list-group-item-action">${name}</li>`);
            showSuggestions(names_shown);

            suggBox.classList.add("show");

            let allList = suggBox.querySelectorAll("li");
            allList.forEach(li => {
                li.onclick = () => select(li);
            });

        } else {
            suggBox.classList.remove("show");
        }
    };

    // Hide suggestions when clicking outside
    document.addEventListener('click', function (event) {
        if (!inputBox.contains(event.target) && !suggBox.contains(event.target)) {
            suggBox.classList.remove("show");
        }
    });
}

async function getData(filepath) {
    const response = await fetch(filepath);
    const data = await response.json();
    return data.records;
};

function createPlot(name) {
    let data, bordercolor, backcolor;

    // GET DATA
    if (ismale) {
        data = maledata.filter((elem) => (elem[2].trim() == name));
        bordercolor = '#36A2EB';
        backcolor = '#9BD0F5';
    } else {
        data = femaledata.filter((elem) => (elem[2].trim() == name));
        bordercolor = '#FF6384';
        backcolor = '#FFB1C1';
    }

    let minyear = parseInt(data[0][1]);
    let maxyear = parseInt(data[data.length - 1][1]);
    let namecounts = {};
    for (let i = minyear; i <= maxyear; i++) {
        namecounts[i] = '0';
    }
    for (let i = 0; i < data.length; i++) {
        let domain = data[i][1];
        let count = data[i][3];
        namecounts[domain] = count;
    }

    if (myChart) {
        myChart.destroy();
    }

    const ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(namecounts),
            datasets: [{
                label: '# Baby Names',
                data: Object.values(namecounts),
                borderWidth: 1,
                borderColor: bordercolor,
                backgroundColor: backcolor
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function showSuggestions(list) {
    let listData;
    if (!list.length) {
        listData = `<li class="list-group-item">No results :(</li>`;
    } else {
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

function select(element) {
    const nameSelected = element.textContent;
    if (nameSelected) {
        inputBox.value = nameSelected;
        suggBox.classList.remove("show");
        createPlot(nameSelected);
    }
};