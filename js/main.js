$(document).ready(function(){
 // Aquí va nuestro código para manipular el DOM
 
 $('.select').on('change', function(){

  var $topNews = $('.topNews');
  $topNews.empty();
  var $selecting = $('.select').val();
  //aqui ajax toma nyt info
  $.ajax({
    method: 'GET',
    dataType:'Json',
    url:'https://api.nytimes.com/svc/topstories/v2/' + $selecting + '.json?api-key=f7c8f05f4bcb4d3d9957fd20748d7c93'
  })
  .done(function(response){
      
      var $dataResults = response.results.filter(function(item){ 
        return item.multimedia.length;
      }).splice(0, 12); 
      
      var newInfo ='';

      $.each($dataResults, function(item, value){

          
          var $abstract =value.abstract;
          var $images =value.multimedia[4].url;
          var $url =value.url;

          newInfo += '<li class="picture" style="background-image: url(' + value.multimedia[4].url + ')">';
          newInfo += '<a href="' + value.url + '"></a>';
          newInfo +='<p class="abstract">' + value.abstract + '</p>' + '</li>';
     
      });

      $topNews.append(newInfo);

    }).always(function(){
      
    });

  });

});