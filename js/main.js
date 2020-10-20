$(document).ready(function() {
    var values = [];
    updateTable();
    var json_fields = '{"Name": "Grootan","Age": "23", "Country": ["India", "Australia", "Kenya"], "DOB": "yyyy/mm/dd", "Gender": "male/female", "Languages Known": "Java, Ruby and Python", "Favourite Color": "#000", "Upload photograph": "file (only png)", "Email": "foo@bob.in", "Start Time": "10:30 AM", "Website Address": "URL", "Title": "Grootan Test", "Sub Title": "Round 2",  "CGPA": "1-10" }';

    var obj = JSON.parse(json_fields);

    for (x in obj) {
        var label = "<label>"+x+"</label>";
        var value = '';
        if(typeof(obj[x])=='string'){
            value="<input required placeholder='"+obj[x]+"' type='text' name='"+x+"'/>"
        }
        else if(Array.isArray(obj[x]))
        {
            value = "<select required><option value=''>Select</option>";
            for(var i=0; i<obj[x].length; i++){
                value+="<option value='"+obj[x][i]+"'>"+obj[x][i]+"</option>"
            }
            value+="</select>"
        }
        var row = "<div>"+label+" : "+value+"</div>"
      
        $("#web_form").append(row + "<br>");
      }
      var submit = "<div class='row'><input type='submit' name='Submit'/></div>";
      $("#web_form").append(submit + "<br>");

      $("form").submit(function(e){
        e.preventDefault();
        var formData =  $("form").serializeArray();

        var _temp={};
        for(var i=0; i<formData.length; i++)
        {
            _temp[formData[i]['name']] = formData[i]['value'];
        }
        values.push(_temp);
        var _index = "WPIndex";
        localStorage.setItem(_index, JSON.stringify(values));
        location.reload();
        
      });

    function updateTable(){
        var _list = localStorage.getItem("WPIndex");
        var _list_item = JSON.parse(_list);
        var k = 1;
        var html="";
        if(_list_item != null){
            for(var i=0;i<_list_item.length; i++){
                values.push(_list_item[i]);
                html += (i+1)+")";
                for (x in _list_item[i]) 
                {
                    html+= x+" : "+_list_item[i][x]+"<br>";
                }
            }
            
            $("#my_list").append("<br>"+html);
        }

    }

});