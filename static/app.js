let dropdown = $('#selDataset');

dropdown.empty();

dropdown.append('<option selected="true" disabled>Choose Company</option>');
dropdown.prop('selectedIndex', 0);


const jsonurl = '/stock/ibm';

$.getJSON(jsonurl, function (data) {
  $.each(data, function (key, entry) {
    dropdown.append($('<option></option>').attr('value', entry.symbol).text(entry.name));
  })
});

var tbody = $("<tbody />"), tr;


function unpack(rows, index) {
  return rows.map(function (row) {
    return row[index];
  });
}

function buildPlot(stock) {


  var openelement = d3.select("#openoption");
  var openelementvalue = openelement.property("value");

  var inputElement = d3.select("#stockticker");
  var inputValue = inputElement.property("value");
  if (inputValue === ""){
    return;
  } 
  var today = new Date();
  var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


  url = `/stock/${inputValue}`
  d3.json(url).then(function (data) {
    

    var name = data['Meta Data']['2. Symbol'];
    var stock = data['Meta Data']['2. Symbol'];
   
    var dates = [] 
    var closingPrices = [] 
    var OpeningPrices = [] 

    for (const [key, value] of Object.entries(data["Time Series (Daily)"])) {
    //   if (key >= dateentered) {
      dates.push(key);
      closingPrices.push(value['4. close']);
      OpeningPrices.push(value['1. open']);
    // }
    }
   



    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: "Closing",
      x: dates,
      y: closingPrices,
      line: {
        color: "blue"
      }
    };
    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: "Opening",
      x: dates,
      y: OpeningPrices,
      line: {
        color: "orange"
      }
    };
    var data = []
    if (document.getElementById("openoption").checked){
        data.push(trace2)
    }
    if (document.getElementById("closeoption").checked){
        data.push(trace1)
    }
    var layout = {
      title: `${stock} prices`,
      xaxis: {
        range: d3.extent(dates),
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };


    Plotly.newPlot("first-dopdown-plot", data, layout);
  });
}

buildPlot();


//-------------------------------
//-------------------------------Button Below
//-------------------------------

// var people = data;

// var button = d3.select("#button");

// button.on("click", function() {


//   var inputElement = d3.select("#selDataset");


//   var inputValue = inputElement.property("value");

//   console.log(inputValue);


//   var filteredData = people.filter(person => person.symbol === inputValue);


//   if (inputValue=filteredData) {
//     console.log(filteredData)

//     var list = d3.select(".summary");

//     list.html("");

//     var name = filteredData.map(a => a.name);
//     var symbol = filteredData.map(a => a.symbol);
//     var sectors = filteredData.map(a => a.sectors);
//     var esg_per = filteredData.map(a => a.esg_per);
//     var stock_price = filteredData.map(a => a.stock_prices);
//     var annual_sales = filteredData.map(a => a.annual_sales);
//     var hq_location = filteredData.map(a => a.hq_location);
//     var website = filteredData.map(a => a.website);
//     var pe_growth = filteredData.map(a => a.pe_growth);
//     var market_cap = filteredData.map(a => a.market_cap);
//     var ptc_flow = filteredData.map(a => a.ptc_flow);
//     var employees = filteredData.map(a => a.employees);

//     list.append("li").text(`Name: ${name}`);
//     list.append("li").text(`Symbol: ${symbol}`);
//     list.append("li").text(`Sector: ${sectors}`);
//     list.append("li").text(`ESG Rating: ${esg_per}`);
//     list.append("li").text(`Stock Price: ${stock_price}`)
//     list.append("li").text(`Annual Sales: ${annual_sales}`);
//     list.append("li").text(`HQ Location: ${hq_location}`);
//     list.append("li").text(`Website: ${website}`);
//     list.append("li").text(`P/E Growth: ${pe_growth}`);
//     list.append("li").text(`Market Cap: ${market_cap}`)
//     list.append("li").text(`PTC Flow: ${ptc_flow}`);
//     list.append("li").text(`Employees: ${employees}`)
//   }

// });