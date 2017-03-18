let jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

const baconPattern = "https://rawgit.com/pennlabs/gcal2when2meat/master/img/bacon.png"
const meatyGif = "https://rawgit.com/pennlabs/gcal2when2meat/master/img/meaty.gif"

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getIntensityFromStyle(styleText) {
  if (styleText.includes("background: rgb(")) {
    substring = styleText.substring(styleText.indexOf("rgb(") + 4);
    substring = substring.substring(0, substring.indexOf(")"))
    rgb = substring.split(",")
    return rgb[1];
  } else if (styleText.includes("background: #")) {
      substring = styleText.substring(styleText.indexOf("background: #") + 13)
      substring = substring.substring(0, substring.indexOf(";"))
      return hexToRgb(substring).g;
  } else {
    return 255;
  }
}

const when2Meat = function(){
  $("#MainBody").css("background", "url('" + meatyGif  + "')")
  
  
  $("[bgcolor]").css("background", "rgb(255,255,255)")
  $("[bgcolor='#339900']").css("background", "url('" + baconPattern + "')")

  setInterval(function(){
    $("#GroupGrid > div:last-child").css("background", "url('" + baconPattern + "')")
    $("#GroupGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")

    $("[id*='GroupTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']").css("background", "rgba(255,255,255,"+ (getIntensityFromStyle(this.css())/255).toFixed(2)  +")")
  
    $("#YouGrid > div:last-child").css("background", "url('" + baconPattern  + "')")
    $("#YouGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")
  
    $("[id*='YouTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']").css("background", "rgba(0,0,0,0)")
  }, 10);
}

setTimeout(when2Meat, 500);
