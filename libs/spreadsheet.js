/*spreadsheet.js
  using 
  jquery.jexcel.js
  jquery.jcalendar.js
  Chart.bundle.min.js
  jquery.print.js*/

window.onload = init;



var labelsArr = [];
var dataArr = [];
var colorDict = {};

function getColors(){
    var colorArray = [];
    for (var i=0; i<labelsArr.length; i++){
        colorArray.push(colorDict[labelsArr[i]]);
    }
}


function redraw(){
    console.log("inhere");
    /*avoid showing old data*/
    $("#chart-container").empty();
    $("#chart-container").html("<canvas id='myChart'>Your browser does not support HTML5</canvas>");
    ctx = document.getElementById("myChart");

    var data = $('#my').jexcel('getData', false);
    labelsArr = [];
    dataArr = [];
    data.forEach(function(item){
      labelsArr.push(item[0]);
      dataArr.push(item[1]);
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
                fontColor: 'black',
                fontSize: 24,
                text: $('#title').val(),
            },
            showTooltips: false,
            scales: {
                yAxes: [{
                    gridLines: {//lineWidth: 5,
                                color: 'black'},
                    ticks: {
                        beginAtZero:true,
                        
                    }
                }],
                xAxes: [{
                    gridLines: {color: 'black'},
                    ticks: {fontColor: 'black'},

                }]
            }
        }
    });

}

function init(){
    data = [
        [' ', 0],
    ];

    $('#my').jexcel({
        data:data,
        //onchange: function(){redraw();},
        colHeaders:  ['Είδος', 'Ποσότητα'],
        colWidths: [ 320, 80 ],
        columns: [
            { type: 'text'},
            { type: 'numeric' },
        ]
    });
    redraw();
}
$('#title').change(function(){//redraw();
  });

function insertRow(){
    $('#my').jexcel('insertRow', 1);
}

function deleteRow(){
    var data = $('#my').jexcel('getData', false);
    $('#my').jexcel('deleteRow', data.length-1);
    //redraw();
}

function sortAsc(){
    $('#my').jexcel('orderBy',1,2);
    //redraw();
}

function sortDesc(){
    $('#my').jexcel('orderBy',1,1);
    //redraw();
}

function printDiv(){
    $('#printArea').css("display","block");
    newWin = window.open("");
    newWin.document.write($('#printArea').html());
    $('#printArea').css("display","none");
}

function redojexcel(){
    $('#my').jexcel('redo');
    //redraw();
}
function undojexcel(){
    $('#my').jexcel('undo');
    //redraw();
}