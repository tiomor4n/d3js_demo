$(document).ready(function(){

       

    console.log("ready");

$.getJSON("data_json.json",function(result){

            var dataset2 = result;

       

                



        var w = 800;

            var h = 400;

                    var h2 = 350;

            var barPadding = 10;

            var padding = 50

            var w_big = w + padding;      

            var h_big = h + padding;

                    var h2_big = h2 + padding;

           

                //var dw = document.write;

        document.write("write by javascript");

                    //document.my_form.my_name.value = "He is here";

                    document.write("<br>" + "Document URL" + document.URL);

                    //document.fgColor = 'black';

                   

           

               //var aarray = [3,4,5,6,7,8];

               //var aa = (d3.bisector(function(d) { return d; }).left)

               //alert(aa(aarray,5.2));

              

               

           

               var parseDate = d3.time.format("%d-%b-%y").parse;

    

                   

               //dataset2.sort((function(a,b) { return b.date - a.date; }));

              

               dataset2.forEach(function(d) {

                       //document.write("<br>" + parseDate(d.date));

                       d.date = parseDate(d.date);

           });

                      

           var bisectDate = d3.bisector(function(d) { return d.date; }).right;

             

               

                       

               document.write("<br>");

               //document.write("<br>" + dataset2[dataset2.length - 1].date);

               document.write("<br>");

              

               var xScale = d3.time.scale()

                 .domain([dataset2[0].date, dataset2[dataset2.length - 1].date])

         .range([padding, w-padding]);

                   

               var yScale = d3.scale.linear()

                 //.domain([0, d3.max(dataset2, function(d) { return d.y; })])

                    .domain([d3.min(dataset2, function(d) { return d.y; }), d3.max(dataset2, function(d) { return d.y; })])

         .range([h-padding, padding]);

                   

                    var yScaleRev = d3.scale.linear()

                 //.domain([0, d3.max(dataset2, function(d) { return d.y; })])

                    .domain([d3.min(dataset2, function(d) { return d.y; }), d3.max(dataset2, function(d) { return d.y; })])

         .range([padding, h-padding]);

                   

                     

               var yScale2 = d3.scale.linear()

           .domain([0,100])                 

                       .range([h2-padding,padding])

              

               var svg = d3.select("body")

                   .append("svg")

                               .attr("width",w_big)

                               .attr("height",h_big);

                              

               var svg2 = d3.select("body")

                       .append("svg")

                               .attr("width",w_big)

                               .attr("height",h2_big);

                              

                               

                     

               var xAxis = d3.svg.axis()

        .scale(xScale)

                    .tickSize(1)

                    .ticks(10)

        .orient("bottom")

                   

               var yAxis = d3.svg.axis()

           .scale(yScale)

                       .ticks(10)

                       .orient("left")

                       .tickSize(1)

                      

               var yAxis2 = d3.svg.axis()

                    .scale(yScale2)

                            .ticks(2)

                            .orient("left")

                            .tickSize(1)

                

         var line = d3.svg.line()

                .x(function(d){

                        return xScale(d.date);

                    })

                    .y(function(d){

                        return yScale(d.y)

                    })

                    .interpolate('linear')      

                   

            var axisXGrid = d3.svg.axis()

       .scale(xScale)

       .orient("bottom")

       .ticks(10)

       .tickFormat("")

       .tickSize(-h + padding,0);

              

             var axisYGrid = d3.svg.axis()

       .scale(yScale)

       .orient("left")

       .ticks(10)

       .tickFormat("")

       .tickSize(-w + padding,0);

           

                   

            svg.append('path')

               .attr({

                 'd':line(dataset2),

                    'y':0,

                    'class':'line',

                    'stroke':'#08e',

                    'stroke-width': '3px',

                    'fill':'none',

                    //'transform':'translate(' + 0 +',0)'

               }); 

               

             svg.append("rect")

                        .attr("class", "overlay")

            .attr("width", function(d){return xScale(dataset2[dataset2.length - 1].date)})

            .attr("height", function(d){return yScaleRev(dataset2[dataset2.length - 1].y)})

                            .attr("transform", "translate(" + padding + "," + padding+ ")")

                            .on("mouseout", function() { focus.style("display", "none"); })

                            .on("mouseover", function() { focus.style("display", null); })

                        .on("mousemove", mousemove)

   

           

             svg.append("text")

                .attr("x", 9)

        .attr("dy", ".35em")

                .attr("transform", "translate(" + padding + "," + (h) + ")")

           

             var focus = svg.append("g")

         .attr("class", "focus")

         .style("display", "none");

    

     focus.append("circle")

          .attr("r", 4.5)

                         

     

     focus.append("text")

          .attr("x", 9)

          .attr("dy", ".35em")

           

   

      

      

      

           

           

             svg.append("g")

       .attr("class", "xaxis")

               .attr("transform", "translate(0," + ( h - padding ) + ")")

       .call(xAxis);

              

              svg.append("g")

       .attr("class", "yaxis")

               .attr("transform", "translate(" + padding + "," + ( 0 ) + ")")

       .call(yAxis);

              

              svg.append('g')

       .call(axisXGrid)

       .attr({

            'fill':'none',

            //'stroke':'rgba(0,0,0,.1)',

            'transform':'translate(0,'+(h-padding)+')'

           });

           

          svg.append('g')

       .call(axisYGrid)

       .attr({

              'fill':'none',

             // 'stroke':'rgba(0,0,0,.1)',

              'transform':'translate(50,0)'

             });

              

               svg2.append("g")

                 .attr("class","yaxis2")

                    .attr("transform", "translate(" + padding + "," + ( 0 ) + ")")

                    .call(yAxis2)

                   

               svg2.append("g")

          .attr("class", "xaxis")

                  .attr("transform", "translate(0," + ( h2 - padding ) + ")")

          .call(xAxis);

                   

                   

                    function mousemove(){

                    focus.attr("transform", "translate(" + (d3.mouse(this)[0] + padding)  + "," + (d3.mouse(this)[1] + padding)  + ")")

                    //focus.select("text").text(d3.mouse(this)[0] + "," + d3.mouse(this)[1]);

                   

                     

                     var x0 = xScale.invert(d3.mouse(this)[0]);

                 //var i = bisectDate(dataset2, x0,1);  

                     //var d0 = dataset2[i-1]['date'];

                    //var d1 = dataset2[i]['date'];

                    //var d = x0 - d0 > d1 - x0 ? d1 : d0;

                    //alert (d0);

                   

                    //focus.select("text").text(x0);

                    //svg.select("text").text(d);

        

                    };



               

                for (var j in result){

                    console.log(result[j].date + result[j].y);



            }

});
});