var jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

var baconPattern = "https://rawgit.com/pennlabs/gcal2when2meat/master/img/bacon.png"
var meatyGif = "https://rawgit.com/pennlabs/gcal2when2meat/master/img/meaty.gif"

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getIntensityFromStyle(styvarext) {
  if (styvarext.includes("background: rgb")) {
      var substring = styvarext.substring(styvarext.indexOf("background: rgb") + 15);
      substring = substring.substring(0, substring.indexOf(")"))
      var rgb = substring.split(",")
      return rgb[1];
  } else if (styvarext.includes("background-color:")) {
      var substring = styvarext.substring(styvarext.indexOf("background-color: rgb") + 22)
      substring = substring.substring(0, substring.indexOf(";"))
      return substring.split(",")[1];
  } else if (styvarext.includes("background: #")) {
      var substring = styvarext.substring(styvarext.indexOf("background: #") + 13)
      substring = substring.substring(0, substring.indexOf(";"))
      return hexToRgb(substring).g;
  } else {
    return 255;
  }
}

const when2Meat = function() {
  $("#MainBody").css("background", "linear-gradient(rgba(255, 255, 255, 0.85),rgba(255, 255, 255, 0.85)),url('" + meatyGif  + "')")
  $("[bgcolor='#ffdede']").css("background", "#ffffff")
  $("[bgcolor='#339900']").css("background", "url('" + baconPattern + "')")
  $("#GroupGrid > div:last-child").css("background", "url('" + baconPattern + "')")
  var slider = $("#GroupKey > table > tbody > tr > [bgcolor]")
  slider.each(function(index, elem) {
    whiteness = (1 - index/(slider.length-1)).toFixed(2)
    $(elem).css("background", "linear-gradient(rgba(255,255,255,"+ whiteness  +"), rgba(255,255,255,"+ whiteness  +")), url('" + baconPattern + "')")
  })
  $("#GroupGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")

  list = $("[id*='GroupTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']").not("[style*='background-color: rgb(255, 255, 255)']")
  list.each(function(index, elem) {
    var g = getIntensityFromStyle($(elem).attr("style"));
    var i = ((g-187)*0.01470588235).toFixed(2); 
    $(elem).css({"background": "rgba(" + g + "," + g + "," + g + "," + i + ")"})
    $(elem).css({"background-color": "rgba(" + g + "," + g + "," + g + "," + i +")"})
  });
}

setTimeout(when2Meat, 500);
setTimeout(
  function(){
    $(document).mouseup(function() {when2Meat();});
    setInterval(
      function(){
        $("#YouGrid > div:last-child").css("background", "url('" + baconPattern  + "')")
        $("#YouGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")
        $("[id*='YouTime'][style*='background: #339900']").css("background", "rgba(0,0,0,0)")
        $("[id*='YouTime'][style*='background: rgb(51, 153, 0)']").css("background", "rgba(0,0,0,0)")
        $("[id*='YouTime'][style*='background: rgb(255, 222, 222)']").css("background", "rgb(255,255,255)")

        $("[id*='YouTime'][style*='background-color: #339900']").css("background-color", "rgba(0,0,0,0)")
        $("[id*='YouTime'][style*='background-color: rgb(51, 153, 0)']").css("background-color", "rgba(0,0,0,0)")
        $("[id*='YouTime'][style*='background-color: rgb(255, 222, 222)']").css("background-color", "rgb(255,255,255)")
      }, 20);
    $('body').prepend('<img style="position: absolute" id="saucy" src="https://www.i2clipart.com/cliparts/7/0/d/e/clipart-sausage-70de.png" />')
    $(document).mousemove(function(e){
        $("#saucy").css({left:e.pageX + 10, top:e.pageY + 10});
    });
    var fileref = document.createElement('link');
    fileref.setAttribute('rel', 'stylesheet');
    fileref.setAttribute('type', 'text/css');
    fileref.setAttribute('href', 'https://kaibrueckers.github.io/comicsansit/comicsansit.css');
    document.getElementsByTagName('head')[0].appendChild(fileref);
    $("[content='NO-CACHE'] > div:last-child").html("<center style='color:white;'>~ Developed by Penn Labs ~ <br> Adam, Tiffany, Young</center>")
  }, 1000);
