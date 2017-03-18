let jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

const baconPattern = "https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0196/0562/rrbacon_1_shop_thumb.png"

setInterval(function(){
  $("#GroupGrid > div:last-child").css("background", "url('" + baconPattern + "')")
  $("#GroupGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")
  $("[id*='GroupTime'][style*='51, 153, 0']").css("background", "rgba(0,0,0,0)")
  $("[id*='GroupTime'][style*='339900']").css("background", "rgba(0,0,0,0)")
  $("#YouGrid > div:last-child").css("background", "url('" + baconPattern  + "')")
  $("#YouGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")
  $("[id*='YouTime'][style*='51, 153, 0']").css("background", "rgba(0,0,0,0)")
  $("[id*='YouTime'][style*='339900']").css("background", "rgba(0,0,0,0)")
  $("[id*='YouTime'][style*='255, 222, 222']").css("background", "rgb(255,255,255)")
  $("td[bgcolor']").css("background", "rgb(255,255,255)")
  $("td[bgcolor='#339900']").css("background", "url('" + baconPattern + "')")
}, 10);

