$(document).ready(function(){
    var t;
    var targetcity;
    var targetcitylist;
    var targetregion;
    var targetregionlist;
    var roadlist;
    var r;
    $('#scity option').remove();
    $('#scity').append($("<option></option>").attr("value", "").text('Select a city:'));
    $.getJSON("TaiwanAddressCityAreaRoadChineseEnglishJSON.txt",function(result){
                        for (var j in result){
                                $('#scity').append($("<option></option>").attr("value", result[j].CityEngName).text(result[j].CityName));
                        }
    });                 
    $('#scity').on('change',function(){
        $('#sregion option').remove();
        $('#sregion').append($("<option></option>").attr("value", "").text('Select a region:'));
        $('#sroad option').remove();
        $('#sroad').append($("<option></option>").attr("value", "").text('Select a road:'));
        $.ajax({
            type: 'GET',
                url:"TaiwanAddressCityAreaRoadChineseEnglishJSON.txt",
                cache: false,
                dataType : 'json',
                success: function(result){
                    for (var i in result){
                            t = $('#scity').val();
                            if (result[i].CityEngName == t){
                                    targetcitylist = result[i].AreaList
                                    for (r in targetcitylist){
                                            $("#sregion").append($("<option></option>").attr("value", targetcitylist[r].ZipCode).text(targetcitylist[r].AreaName));
                                    }
                                }
                        }
                    $('#demo').text(result[0].CityName) ;
                },
                error:function(result){},
                    complete:function(){},
                    statusCode:{
                        404:function(){
                            alert("page not found");
                        }
                    }
        });
    })

    $('#sregion').on('change',function(){
        $('#sroad option').remove();
        $('#sroad').append($("<option></option>").attr("value", "").text('Select a road:'));
        targetcity = $('#scity').val();
        targetregion = $('#sregion').val();
        $.getJSON("TaiwanAddressCityAreaRoadChineseEnglishJSON.txt",function(result){
            for (var k in result){
                    if (result[k].CityEngName == targetcity){
                            targetregionlist = result[k].AreaList
                            for ( var m in targetregionlist){
                                    if(targetregionlist[m].ZipCode == targetregion){
                                            roadlist = targetregionlist[m].RoadList;
                                            for (var n in roadlist){
                                                $('#sroad').append($("<option></option>").attr("value",roadlist[n].RoadName).text(roadlist[n].RoadName));
                                            }
                                    }
                            }
                    }
            }
        });
    })
});
