//  names.js
//  sep 2024    Jorge A. Garcia

const searchWrapper = document.querySelector(".search-input");
const genselect = searchWrapper.querySelector('select');
const inputBox = searchWrapper.querySelector("input");
const suggBox = searchWrapper.querySelector(".autocom-box");
var myChart;

main();

async function main() {
    // 1. GET DATA
    maledata = await getData("data/male.json");
    femaledata = await getData("data/female.json");
    maleunique = getUnique(maledata);
    femaleunique = getUnique(femaledata);
    ismale = true;
    //const maledata = await getData("data/male.json");
    //const femaledata = await getData("data/female.json");
    //const maleunique = getUnique(maledata);
    //const femaleunique = getUnique(femaledata);
    //var ismale = true;

    // 2. IS MALE?
    genselect.onchange = async (elem) => {
        ismale = elem.target.value == 'male';
        inputBox.value = "";
        inputBox.setAttribute("placeholder", "Type name...");
        console.log("Is male: " + ismale);
    }

    // 3. SEARCH BAR
    inputBox.onkeyup = async (elem) => {
        const value = elem.target.value;
        const names_shown = [];
        var names_filtered = [];

        if (value) {
            // FILTER
            if (ismale) {
                names_filtered = maleunique.filter((entry) => {
                    return entry.toLowerCase().startsWith(value.toLowerCase());
                })
            } else {
                names_filtered = femaleunique.filter((entry) => {
                    return entry.toLowerCase().startsWith(value.toLowerCase());
                })
            }
            names_filtered.sort();

            // ADD LIST
            names_filtered.forEach((name) => {
                names_shown.push(`<li>${name}</li>`);
            });

            // ACTIVE SEARCH
            searchWrapper.classList.add("active");

            // Show autocomplete box
            showSuggestions(names_shown);

            let allList = suggBox.querySelectorAll("li");

            for (let i = 0; i < allList.length; i++) {
                // Adding onclick attribute in all li tag
                if (allList[i].textContent != 'No results :(') {
                    allList[i].setAttribute("onclick", "select(this)");
                }
            }

        } else {
            searchWrapper.classList.remove("active");
        }
    };
}

async function getData(filepath) {
    const response = await fetch(filepath);
    const data = await response.json();
    return data.records;
};


function createPlot(name) {
    // GET DATA
    if (ismale) {
        var data = maledata.filter((elem) => (elem[2].trim() == name));
    } else {
        var data = femaledata.filter((elem) => (elem[2].trim() == name));
    }
    // PLOT
    const ctx = document.getElementById('myChart');
    myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map((elem) => elem[1]),
            datasets: [{
                label: '# Baby Names',
                data: data.map((elem) => elem[3]),
                borderWidth: 1
            }]
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

function getUnique(myarray) {
    const mynewarray = myarray.map((entry) => entry[2].trim())
    return mynewarray.filter(onlyUnique);
}
function onlyUnique(value, index, array) {
    return array.indexOf(value) === index;
}

// SHOW SUGGESTIONS
function showSuggestions(list) {
    let listData;
    if (!list.length) {
        // if empty
        listData = `<li>No results :(</li>`;
    } else {
        // join array elements
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
};

// SELECT ELEMENT
function select(element) {
    const nameSelected = element.textContent;
    if (nameSelected) {
        if (myChart) {
            myChart.destroy();
        }
        inputBox.value = nameSelected;
        searchWrapper.classList.remove("active");
        createPlot(nameSelected);
    }
};