let TableValue = [
    [20.3, 30.5, 23.5, 40.3],
    [50.2, 40.63, 45.23, 39.3],
    [25.4, 30.2, 33.3, 36.7],
    [20.4, 15.6, 22.3, 29.3]
];

let labels = [
    "Microsoft",
    "Google",
    "Apple",
    "IBM"
];

let colors = [
    'rgba(4, 66, 0, 1)',
    'rgba(7, 37, 112, 1)',
    'rgba(82, 51, 13, 1)',
    'rgba(59, 14, 71, 1)'
];

let companyName;
for (let i = 0; i < TableValue.length; i++)
{
    for (let index = 0, numberChild = 3; index < TableValue[i].length; index++, numberChild += 2)
    {
        document.getElementById(labels[i]).childNodes[numberChild].textContent = TableValue[i][index];
    }
}

// По оси x
const tags = [document.getElementById("tableHead").childNodes[3].textContent, document.getElementById("tableHead").childNodes[5].textContent,
document.getElementById("tableHead").childNodes[7].textContent, document.getElementById("tableHead").childNodes[9].textContent]

const Microsoft = {
    label: labels[0],
    data: TableValue[0],
    backgroundColor: colors[0],
    borderColor: colors[0],
    borderWidth: 1,
};

const Google = {
    label: labels[1],
    data: TableValue[1],
    backgroundColor: colors[1],
    borderColor: colors[1],
    borderWidth: 1,
};

const Apple = {
    label: labels[2],
    data: TableValue[2],
    backgroundColor: colors[2],
    borderColor: colors[2],
    borderWidth: 1,
};

const IBM = {
    label: labels[3],
    data: TableValue[3],
    backgroundColor: colors[3],
    borderColor: colors[3],
    borderWidth: 1,
};

const data = {
    labels: tags,
    datasets: [
        Microsoft,
        Google,
        Apple,
        IBM,
    ]
};

const config = {
    type: 'line',
    data: data,
    options: {}
};

var myChart = new Chart(
    document.getElementById('myChart'),
    config
);

const popupLinks = document.querySelectorAll('.popup-link');
let currentPopup;

if (popupLinks.length > 0)
{
    for (let index = 0; index < popupLinks.length; index++)
    {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e){
           const popupName = popupLink.getAttribute('id').replace('#', '');
           currentPopup = document.getElementById(popupName);
           currentPopup.style.display = 'block';
        });
    }
}

const formValue = document.getElementById('formValue');
const inputsValue = formValue.querySelectorAll('input');

formValue.addEventListener('submit', getFormValue);
function getFormValue(event) {
      event.preventDefault();
      let companyInd;
      if(formValue.querySelector('[name="company"]').value == 'Microsoft') companyInd = 0;
      else if (formValue.querySelector('[name="company"]').value == 'Google') companyInd = 1;
      else if (formValue.querySelector('[name="company"]').value == 'Apple') companyInd = 2;
      else companyInd = 3;
      for (let index = 0, numberChild = 3; index < TableValue[companyInd].length; index++, numberChild += 2)
      {
          TableValue[companyInd][index] = inputsValue[index].value;
          document.getElementById(labels[companyInd]).childNodes[numberChild].textContent = TableValue[companyInd][index];
      }
      currentPopup.style.display = 'none';
      myChart.update();
}

const formColor = document.getElementById('formColor');

formColor.addEventListener('submit', getFormColor);

function getFormColor(event) {
    event.preventDefault();
    let companyInd;
    if (formColor.querySelector('[name="company"]').value == 'Microsoft') companyInd = 0;
    else if (formColor.querySelector('[name="company"]').value == 'Google') companyInd = 1;
    else if (formColor.querySelector('[name="company"]').value == 'Apple') companyInd = 2;
    else companyInd = 3;

    data.datasets[companyInd].backgroundColor = formColor.querySelector('input').value;
    data.datasets[companyInd].borderColor = formColor.querySelector('input').value;

    currentPopup.style.display = 'none';
    myChart.update();
}
