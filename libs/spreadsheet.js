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
      console.log(item[1],item[2]);
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
            }]
        },
        options: {

            animation:{
                onComplete: function(animation){
                        /*console.log(this.toBase64Image());*/
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
$('#drawBtn').click(
    function(){
        console.log(labelsArr);
        console.log(dataArr);
        console.log($("#canvas-container").value);
        redraw();
    });

$('#printBtn').click(
    function(){
        console.log($("#chart-container").printElement);
        $("#printImg").print();
    });
var newFile = 
    function(){
                data = [
                    [' ', ' ', 0],
                ];
    redraw();
    console.log('newFile');
}
$('#sortAscBtn').click(
    function(){
        var data = $('#my').jexcel('getData', false);
        data.sort(function(a, b) {
            return (parseInt(a[2]) < parseInt(b[2]) ? -1 : ((parseInt(a[2]) == parseInt(b[2])) ? 0 : 1));
        //Sort could be modified to, for example, sort on the age 
        // if the name is the same.
    });
$('#my').jexcel({
    data:data,
    colHeaders:  [ 'α/α', 'Αντικείμενο', 'Τιμή'],
    colWidths: [ 20, 300, 80 ],
    columns: [
        { type: 'text'},
        { type: 'text'},
        { type: 'text' },
    ]
});
redraw();
});
$('#sortDescBtn').click(
    function(){
        var data = $('#my').jexcel('getData', false);
        data.sort(function(a, b) {
            return (parseInt(a[2]) > parseInt(b[2]) ? -1 : ((parseInt(a[2]) == parseInt(b[2])) ? 0 : 1));
        //Sort could be modified to, for example, sort on the age 
        // if the name is the same.
    });
$('#my').jexcel({
    data:data,
    colHeaders:  [ 'α/α', 'Αντικείμενο', 'Τιμή'],
    colWidths: [ 20, 300, 80 ],
    columns: [
        { type: 'text'},
        { type: 'text'},
        { type: 'text' },
    ]
});
redraw();
});
function init(){
    data = [
        [' ', ' ', 0],
        [' ', ' ', 0],
        [' ', ' ', 0],
        [' ', ' ', 0],
    ];

    $('#my').jexcel({
        data:data,
        colHeaders:  [ 'α/α', 'Αντικείμενο', 'Τιμή'],
        colWidths: [ 20, 300, 80 ],
        columns: [
            { type: 'text'},
            { type: 'text'},
            { type: 'text' },
        ]
    });
    redraw();
}