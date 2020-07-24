// DOM elements selectors
const oneStockToggle = document.querySelector('#oneStockToggle');
const twoStockForm = document.querySelector('#twoStockForm');
const oneStockForm = document.querySelector('#oneStockForm');
const checkOneStock = document.querySelector('#checkOneStock');
const compareTwoStocks = document.querySelector('#compareTwoStocks');
const stockResult = document.querySelector('#stock-result');

// Handler functions
const toggleBtn = () => {
  if (oneStockToggle.innerText.trim() === 'Check one stock') {
    oneStockToggle.innerText = 'Compare two stocks';
  } else {
    oneStockToggle.innerText = 'Check one stock';
  }
  oneStockToggle.classList.toggle('focus');
  checkOneStock.classList.toggle('show');
  compareTwoStocks.classList.toggle('show');
};

const oneStockSubmit = async e => {
  e.preventDefault();
  const formData = serialize(oneStockForm);
  // Show spinner
  stockResult.innerHTML = '<div class="loader">Loading...</div>';
  // API call
  const res = await fetch(`/api/stock-prices?${formData}`);
  const data = await res.json();
  // Display result
  if (data.stockData) {
    stockResult.innerHTML = `
      <div class="col-12 mx-auto">
        <div class="card stockCard mx-auto">
          <div class="card-body">
            <h3 class="card-title">${data.stockData.companyName}</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Stock:
                ${data.stockData.stock}
              </li>
              <li class="list-group-item">Price:
                $${data.stockData.price}
              </li>
              <li class="list-group-item">Likes:
                ${data.stockData.likes}
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  } else {
    stockResult.innerHTML = `
      <div class="col-12 mx-auto">
        <h3>Error: ${data.message}</h3>
      </div>
    `;
  }
};

const twoStockSubmit = async e => {
  e.preventDefault();
  const formData = serialize(twoStockForm);
  // Show spinner
  stockResult.innerHTML = '<div class="loader">Loading...</div>';
  // API call
  const res = await fetch(`/api/stock-prices?${formData}`);
  const data = await res.json();
  // Display result
  if (data.stockData) {
    stockResult.innerHTML = `
      <div class="col-12 col-lg-6 col-xl-6">
        <div class="card mb-4 stockCard">
          <div class="card-body">
            <h3 class="card-title">${data.stockData[0].companyName}</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Stock:
                ${data.stockData[0].stock}
              </li>
              <li class="list-group-item">Price:
                $${data.stockData[0].price}
              </li>
              <li class="list-group-item">Relative Likes:
                ${data.stockData[0].rel_likes}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 col-lg-6 col-xl-6">
        <div class="card mb-4 stockCard">
          <div class="card-body">
            <h3 class="card-title">${data.stockData[1].companyName}</h3>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Stock:
                ${data.stockData[1].stock}
              </li>
              <li class="list-group-item">Price:
                $${data.stockData[1].price}
              </li>
              <li class="list-group-item">Relative Likes:
                ${data.stockData[1].rel_likes}
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  } else {
    stockResult.innerHTML = `
      <div class="col-12 mx-auto">
        <h3>Error: ${data.message}</h3>
      </div>
    `;
  }
};

// Event Listeners
oneStockToggle.addEventListener('click', toggleBtn);
oneStockForm.addEventListener('submit', oneStockSubmit);
twoStockForm.addEventListener('submit', twoStockSubmit);

// Serialize helper function (similar to jQuery .serialize())
function serialize(form) {
  if (!form || form.nodeName !== 'FORM') {
    return;
  }
  var i,
    j,
    q = [];
  for (i = form.elements.length - 1; i >= 0; i = i - 1) {
    if (form.elements[i].name === '') {
      continue;
    }
    switch (form.elements[i].nodeName) {
      case 'INPUT':
        switch (form.elements[i].type) {
          case 'text':
          case 'hidden':
          case 'password':
          case 'button':
          case 'reset':
          case 'submit':
            q.push(
              form.elements[i].name +
                '=' +
                encodeURIComponent(form.elements[i].value)
            );
            break;
          case 'checkbox':
          case 'radio':
            if (form.elements[i].checked) {
              q.push(
                form.elements[i].name +
                  '=' +
                  encodeURIComponent(form.elements[i].value)
              );
            }
            break;
        }
        break;
      case 'file':
        break;
      case 'TEXTAREA':
        q.push(
          form.elements[i].name +
            '=' +
            encodeURIComponent(form.elements[i].value)
        );
        break;
      case 'SELECT':
        switch (form.elements[i].type) {
          case 'select-one':
            q.push(
              form.elements[i].name +
                '=' +
                encodeURIComponent(form.elements[i].value)
            );
            break;
          case 'select-multiple':
            for (j = form.elements[i].options.length - 1; j >= 0; j = j - 1) {
              if (form.elements[i].options[j].selected) {
                q.push(
                  form.elements[i].name +
                    '=' +
                    encodeURIComponent(form.elements[i].options[j].value)
                );
              }
            }
            break;
        }
        break;
      case 'BUTTON':
        switch (form.elements[i].type) {
          case 'reset':
          case 'submit':
          case 'button':
            q.push(
              form.elements[i].name +
                '=' +
                encodeURIComponent(form.elements[i].value)
            );
            break;
        }
        break;
    }
  }
  return q.join('&');
}
