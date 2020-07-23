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
                $('#stock-result').html(['<div class="col loadDiv"></div><div id="loadingDiv" class="col loadDiv"><div class="loader">Loading...</div></div><div class="col loadDiv"></div>'].join(''));
            },
            success: function (data) {
                if (data.stockData) {
                    const single = [
                        '<div class="col-12 col-md-3 col-lg-3 col-xl-3"></div>',
                        '<div class="col-12 col-md-3 col-lg-3 col-xl-3">',
                        '<div class="card mb-4 stockCard">',
                        '<div class="card-body">',
                        '<h3 class="card-title">' + data.stockData[0].companyName + '</h3>',
                        '<ul class="list-group list-group-flush">',
                        '<li class="list-group-item">Stock: ' + data.stockData[0].stock + '</li>',
                        '<li class="list-group-item">Price: $' + data.stockData[0].price + '</li>',
                        '<li class="list-group-item">Relative Likes: ' + data.stockData[0].rel_likes + '</li>',
                        '</ul>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '<div class="col-12 col-md-3 col-lg-3 col-xl-3">',
                        '<div class="card mb-4 stockCard">',
                        '<div class="card-body">',
                        '<h3 class="card-title">' + data.stockData[1].companyName + '</h3>',
                        '<ul class="list-group list-group-flush">',
                        '<li class="list-group-item">Stock: ' + data.stockData[1].stock + '</li>',
                        '<li class="list-group-item">Price: $' + data.stockData[1].price + '</li>',
                        '<li class="list-group-item">Relative Likes: ' + data.stockData[1].rel_likes + '</li>',
                        '</ul>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '<div class="col-12 col-md-3 col-lg-3 col-xl-3"></div>'
                    ];
                    $('#stock-result').html(single.join(''));
                } else {
                    const html = [
                        '<div class="col-12 col-md-4 col-lg-4 col-xl-4"></div>',
                        '<div class="col-12 col-md-3 col-lg-4 col-xl-4">',
                        '<h3>Error: ' + data.message + '</h3>',
                        '</div>',
                        '<div class="col-12 col-md-3 col-lg-4 col-xl-4"></div>'
                    ];
                    $('#stock-result').html(html.join(''));
                }
            }
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
                $('#stock-result').html(['<div class="col loadDiv"></div><div id="loadingDiv" class="col loadDiv"><div class="loader">Loading...</div></div><div class="col loadDiv"></div>'].join(''));
            },
            success: function (data) {
                if (data.stockData) {
                    const single = [
                        '<div class="col-12 col-md-4 col-lg-4 col-xl-4"></div>',
                        '<div class="col-12 col-md-4 col-lg-4 col-xl-4">',
                        '<div class="card stockCard">',
                        '<div class="card-body">',
                        '<h3 class="card-title">' + data.stockData.companyName + '</h3>',
                        '<ul class="list-group list-group-flush">',
                        '<li class="list-group-item">Stock: ' + data.stockData.stock + '</li>',
                        '<li class="list-group-item">Price: $' + data.stockData.price + '</li>',
                        '<li class="list-group-item">Likes: ' + data.stockData.likes + '</li>',
                        '</ul>',
                        '</div>',
                        '</div>',
                        '</div>',
                        '<div class="col-12 col-md-4 col-lg-4 col-xl-4"></div>'
                    ];
                    $('#stock-result').html(single.join(''));
                } else {
                    const html = [
                        '<div class="col-12 col-md-4 col-lg-4 col-xl-4"></div>',
                        '<div class="col-12 col-md-3 col-lg-4 col-xl-4">',
                        '<h3>Error: ' + data.message + '</h3>',
                        '</div>',
                        '<div class="col-12 col-md-3 col-lg-4 col-xl-4"></div>'
                    ];
                    $('#stock-result').html(html.join(''));
                }
            }
        });
        e.preventDefault();
    });
});
