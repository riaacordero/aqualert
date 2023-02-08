const nuisanceWords = ["test", "sure", "ye"];
console.log(nuisanceWords);

const form = document.getElementById("myForm");
const inputValue = document.getElementById("inputValue");
const tableBody = document.getElementById("tableBody");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // @ts-ignore
    const value = inputValue.value;

    let isBottom = false;
    for (const nuisanceWord of nuisanceWords) {
        if (value.includes(nuisanceWord)) {
            isBottom = true;
            break;
        }
    }

    // @ts-ignore
    let rowIndex = isBottom ? tableBody.rows.length : 0;
    // @ts-ignore
    let row = tableBody.insertRow(rowIndex);
    let cell = row.insertCell(0);
    cell.innerHTML = value;
});

