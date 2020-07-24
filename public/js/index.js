$(function () {
  $('#twoStockToggle').on('click', function () {
    $('#twoStockToggle').addClass('focus');
    $('#oneStockToggle').removeClass('focus');
    $('#checkOneStock').removeClass('show');
  });
  $('#oneStockToggle').on('click', function () {
    $('#oneStockToggle').addClass('focus');
    $('#twoStockToggle').removeClass('focus');
    $('#compareTwoStocks').removeClass('show');
  });
  $('#twoStockForm').submit(function (e) {
    $.ajax({
      url: '/api/stock-prices',
      type: 'get',
      data: $('#twoStockForm').serialize(),
      beforeSend: function () {
        // show the loader
        $('#stock-result').html(
          ['<div class="loader">Loading...</div>'].join('')
        );
      },
      success: function (data) {
        if (data.stockData) {
          const single = [
            '<div class="col-12 col-lg-6 col-xl-6">',
            '<div class="card mb-4 stockCard">',
            '<div class="card-body">',
            '<h3 class="card-title">' + data.stockData[0].companyName + '</h3>',
            '<ul class="list-group list-group-flush">',
            '<li class="list-group-item">Stock: ' +
              data.stockData[0].stock +
              '</li>',
            '<li class="list-group-item">Price: $' +
              data.stockData[0].price +
              '</li>',
            '<li class="list-group-item">Relative Likes: ' +
              data.stockData[0].rel_likes +
              '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>',
            '<div class="col-12 col-lg-6 col-xl-6">',
            '<div class="card mb-4 stockCard">',
            '<div class="card-body">',
            '<h3 class="card-title">' + data.stockData[1].companyName + '</h3>',
            '<ul class="list-group list-group-flush">',
            '<li class="list-group-item">Stock: ' +
              data.stockData[1].stock +
              '</li>',
            '<li class="list-group-item">Price: $' +
              data.stockData[1].price +
              '</li>',
            '<li class="list-group-item">Relative Likes: ' +
              data.stockData[1].rel_likes +
              '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>',
          ];
          $('#stock-result').html(single.join(''));
        } else {
          const html = [
            '<div class="col-12 mx-auto">',
            '<h3>Error: ' + data.message + '</h3>',
            '</div>',
          ];
          $('#stock-result').html(html.join(''));
        }
      },
    });
    e.preventDefault();
  });
  $('#oneStockForm').submit(function (e) {
    $.ajax({
      url: '/api/stock-prices',
      type: 'get',
      data: $('#oneStockForm').serialize(),
      beforeSend: function () {
        // show the loader
        $('#stock-result').html(
          ['<div class="loader">Loading...</div>'].join('')
        );
      },
      success: function (data) {
        if (data.stockData) {
          const single = [
            '<div class="col-12 mx-auto">',
            '<div class="card stockCard mx-auto">',
            '<div class="card-body">',
            '<h3 class="card-title">' + data.stockData.companyName + '</h3>',
            '<ul class="list-group list-group-flush">',
            '<li class="list-group-item">Stock: ' +
              data.stockData.stock +
              '</li>',
            '<li class="list-group-item">Price: $' +
              data.stockData.price +
              '</li>',
            '<li class="list-group-item">Likes: ' +
              data.stockData.likes +
              '</li>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>',
          ];
          $('#stock-result').html(single.join(''));
        } else {
          const html = [
            '<div class="col-12 mx-auto">',
            '<h3>Error: ' + data.message + '</h3>',
            '</div>',
          ];
          $('#stock-result').html(html.join(''));
        }
      },
    });
    e.preventDefault();
  });
});
