const Api_key = 'lpDRhW4f%5Bj|i8mB~BjlCD#Ve6wAi';

document.getElementById('formCompany').addEventListener('submit', sendForm)

$.ajax({
    url: 'https://sedelkin.ru/api/interval',
    method: 'get',
    dataType: 'json',
    success: (data) => {
        let inputsString = '';
        for (let i = 0; i<data.data.length; i++) {
            inputsString += `<option value='${data.data[i].value}'>${data.data[i].title}</option>`
        }
        document.getElementById('selectInterval').insertAdjacentHTML('afterbegin', inputsString)
    }
})


$.ajax({
    url: 'https://sedelkin.ru/api/security_list',
    method: 'get',
    dataType: 'json',
    success: (data) => {
        let inputsString = '';
        for (let i = 0; i<data.data.length; i++) {
            inputsString += `<option value='${data.data[i].secid}'>${data.data[i].title}</option>`
        }
        document.getElementById('selectCompany').insertAdjacentHTML('afterbegin', inputsString)
    }
})

function sendForm(e) {
    e.preventDefault();
    let date = new Date().toISOString().split('T')[0]
    $.ajax({
        url:'https://sedelkin.ru/api/history/get_data',
        method: 'post',
        dataType: 'json',
        data: {
            "app_key": Api_key,
            "secid": e.target[0].value,
            "interval": e.target[1].value,
            "limits": e.target[2].value,
            "start": e.target[3].value,
            "finish": date

        },
        success: (data) => {
            clearChartData();
            console.log(data)
            let dataCharts = [];
            for (let i = 0; i < data.data.length; i++) {
              labels.push(data.data[i].datetime);
              dataCharts.push(data.data[i].close);
            }
          
            let avg = 0;
            let avgDataCharts = [];
            let avgLabels = []
            if (data.data.length >= 500)
            {
              let stepI = Math.floor(data.data.length / 100);
              let value = 100;
              for (let i = 0; i < stepI; i++)
              {
                avg = 0;
               if (i == (stepI - 1)) value += data.data.length % 100;
                for(let j = 0; j < value; j++)
                {
                  avg += data.data[j+i*100].close;
                  if (j == 99) avgLabels.push(data.data[j+i*100].datetime);
                }
                avgDataCharts.push(avg/value);
              }
              labels = avgLabels;
              dataCharts = avgDataCharts;
            }

           let dataSend = {
                labels: labels,
                datasets: [{
                  label: data.secid,
                  data: dataCharts,
                  backgroundColor: 'rgb(118, 170, 187)',
                  fill: {
                    target: 'origin',
                    above: 'rgb(118, 170, 187)', 
                    below: 'rgb(118, 170, 187)'    
                  }
                }],
              };

            myChart.destroy();
            myChart = new Chart(ctx, {
                type: 'bar',
                data: dataSend,
                options: {}
            })

        }
    })
}
function clearChartData()
{
  labels = [];
  data.labels = [];
  data.datasets = [];
}

let labels = [];

let data = {
  labels: labels,
  datasets: [{
    label: 'Company',
    backgroundColor: 'rgb(118, 170, 187)',
  }]
}

let config = {
  type: 'bar',
  data: data,
  options: {}
}


var ctx = document.getElementById('chartApi').getContext('2d');

var myChart = new Chart(ctx, config)

