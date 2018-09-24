

var Module = (function(){
    
    var urlButton = $("#url_button");
    var showButton = $("#show_url_list");
    urlButton.on('click',shortUrl);
    showButton.on('click',showList);

    function shortUrl(){
         let url = $("#url").val();
            $.ajax({
                url: "http://localhost:3000/short",
                type: "GET",
                dataType: "json",
                data: {url:url},
                success:function(data,status){
                    if(data.status === "exist"){
                        $("#short_url").html('<div class="alert alert-info">'
                        +'<strong>Info!</strong> '+ data.message +' '
                        +'</div>');
                    }
                    else if(data.status === 'success'){
                        $("#short_url").html('<div class="alert alert-success">'
                        +'<strong>Success!</strong><a  target="_blank" href="'+ data.message +'"> '+ data.message +'</a> '
                        +'</div>');
                    }
                    else if(data.status === 'invalid'){
                        $("#short_url").html('<div class="alert alert-warning">'
                        +'<strong>Warning!</strong> '+ data.message +' '
                        +'</div>');
                    }
                    else if(data.status === 'problem'){
                        $("#short_url").html('<div class="alert alert-danger">'
                        +'<strong>Danger!</strong> '+ data.message +' '
                        +'</div>');
                    }
                }
            });
    }

    function showList(){
        $.ajax({
           url: "http://localhost:3000/list",
           type: "GET",
           dataType: "json",
           data: {},
           success:function(data){
               if(data.status === "success"){
                   let table = '<table style="width:100%" border="1"><tr>'
                               +'<th style="padding:5px">Original URL</th>'
                               +'<th style="padding:5px">Short URL</th>'
                               +'</tr>';
                   data.message.forEach(function(urls) {
                       table += '<tr>';
                       table += '<td style="padding:5px">'+urls.originalUrl+'</td>';
                       table += '<td style="padding:5px"><a href="http://localhost:3000/'+urls.shortUrl+'">http://localhost:3000/'+urls.shortUrl+'</a></td>';
                       table += '</tr>';
                   });

                   table += '</table>';
                   $("#short_url_list").html(table);
                      
               }
               else if(data.status === "problem"){
                   $("#short_url_list").html('<div class="alert alert-danger">'
                   +'<strong>Danger!</strong> '+ data.message +' '
                   +'</div>')
               }
           }
        });
    }

})();