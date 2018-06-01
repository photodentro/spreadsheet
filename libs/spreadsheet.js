/*spreadsheet.js
  using 
  jquery.jexcel.js
  jquery.jcalendar.js
  Chart.bundle.min.js
  jquery.print.js*/

window.onload = init;



var labelsArr = [];
var dataArr = [];

function redraw(){
    /*avoid showing old data*/
    $("#chart-container").empty();
    $("#chart-container").html("<canvas id='myChart'>Your browser does not support HTML5</canvas>");
    ctx = document.getElementById("myChart");

    var data = $('#my').jexcel('getData', false);
    labelsArr = [];
    dataArr = [];
    data.forEach(function(item){
      labelsArr.push(item[1]);
      dataArr.push(item[2]);
    });

    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labelsArr,
            datasets: [{
                data: dataArr,
                backgroundColor: ["Red",
                                "Green",
                                "Yellow",
                                "Blue",
                                "Orange",
                                "Purple",
                                "Cyan",
                                "Magenta",
                                "Lime",
                                "Pink",
                                "Teal",
                                "Lavender",
                                "Brown",
                                "Beige",
                                "Maroon",
                                "Mint",
                                "Olive",
                                "Coral",
                                "Navy",
                                "Grey",],
                borderColor: [
                "Darkgray"
                ],
                borderWidth: 1
            }],
        },
        options: {
            animation:{
                onComplete: function(animation){
                        $("#printImg").attr('src', this.toBase64Image());
                }
            },
            legend: {
                display: false,
            },
            title: {
                display: true,

                text: $('#title').val(),
            },
            showTooltips: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                        stepSize:1,
                    }
                }]
            }
        }
    });

}

function init(){
    data = [
        [' ', ' ', 0],
    ];

    $('#my').jexcel({
        data:data,
        onchange: function(){redraw();},
        colHeaders:  [ 'α/α', 'Αντικείμενο', 'Τιμή'],
        colWidths: [ 20, 300, 80 ],
        columns: [
            { type: 'text'},
            { type: 'text'},
            { type: 'numeric' },
        ]
    });
    redraw();
}
$('#title').change(function(){redraw();});

function insertRow(){
    $('#my').jexcel('insertRow', 1);
}

function deleteRow(){
    var data = $('#my').jexcel('getData', false);
    $('#my').jexcel('deleteRow', data.length-1);
    redraw();
}

function sortAsc(){
    $('#my').jexcel('orderBy',2,2);
    redraw();
}

function sortDesc(){
    $('#my').jexcel('orderBy',2,1);
    redraw();
}

function printDiv(){
    $('#printImg').print();
}