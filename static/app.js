const cityInput = document.querySelector('#city');
const btn = document.querySelector('#btn');
const resultDiv = document.querySelector('.result');
const form = document.querySelector('#my-form');

function getData() {
  const entry = {
    city: cityInput.value
  }

  fetch(`${window.origin}/result`, {
      method: "POST",
      body: JSON.stringify(entry),
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    .then(function(response) {
      if (response.status !== 200) {
        console.log(`Looks like there was a problem. Status code: ${response.status}`);
        return;
      }
      response.json().then(function(data) {
        console.log(data);
        printData(data);
      });
    })
    .catch(function(error) {
      console.log("Fetch error: " + error);
  });
};


function printData(data) {
  const temp = data.main.temp;
  const country = data.sys.country;
  const weather = data.weather[0].description;
  const name = data.name;
  const icon = data.weather[0].icon;
  resultDiv.innerHTML =
  `
  <h1>${name}, ${country}</h1>
  <h1>${temp} °C</h1>
  <img src="http://openweathermap.org/img/wn/${icon}@4x.png">
  <h1>${weather}</h1>
  `;
};

btn.addEventListener('click', getData);
form.addEventListener('keydown', (e) => {
  if (e.keyCode == 13){
    e.preventDefault();
    getData();
  }
})
