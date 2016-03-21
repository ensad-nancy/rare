

$(document).ready( function() {
  var twitterApiUrl = "feed.php";
  var templates = getTemplates();

  $.getJSON(twitterApiUrl, function( data ) {

    console.log(data);

      $('#twitter').html(templates.tweetFeed( { elements:data } ));
  })


  var spreadsheet_url = 'https://docs.google.com/spreadsheets/d/10VU17g4lD4CwiECMWK_t36msAiwBRg7fiiMdiNMTNfk/pubhtml';

  Tabletop.init(
    {
      key: spreadsheet_url,
      callback: showInfo
    }
  )

  function showInfo(data){
    $('#contacts').html(templates.weMet( { elements:_.reverse(data.rep.elements) } ));
  }

    $("#pad-content").html(getText('https://lite6.framapad.org/p/BsOprKiKo9-vision-rare/export/txt'));
    $("#pad-content-TORRENT").html(getText('https://lite6.framapad.org/p/8Q2EvwdbMJ-TORRENT/export/txt'));
    $("#pad-content-AGORA").html(getText('https://lite6.framapad.org/p/8Q2EvwdbMJ-AGORA/export/txt'));


})


function getTemplates(){
  var t = [];
  $('script[type*=handlebars-template]').each(function(){
    t[$(this).attr('id')] = Handlebars.compile($(this).html());
  })
  return t;
}

Handlebars.registerHelper('debug', function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
});

function getText(myUrl){
    var result = null;
    $.ajax( { url: myUrl,
              type: 'get',
              dataType: 'html',
              async: false,
              success: function(data) { result = data; }
            }
    );
    FileReady = true;
    return result;
}
