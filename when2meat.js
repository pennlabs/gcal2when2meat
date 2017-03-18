let jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

const baconPattern = "https://s3.amazonaws.com/spoonflower/public/design_thumbnails/0196/0562/rrbacon_1_shop_thumb.png"
const meatyGif = "https://3.bp.blogspot.com/-0aphAH5D7DA/V5-0Y9b14oI/AAAAAAAABTI/sUU1fwneTtI8GmI0H8aT00AIe-dzJrGmACLcB/s1600/Web-Article-Chef-Marcus-Samuelsson-Streetbird-Red-Rooster-Harlem-Tips-on-Roasting-Brining-a-Perfect-Chicken-Rotisserie-Recipe1.gif"

const when2Meat = function(){
  $("#MainBody").css("background", "linear-gradient(rgba(255, 255, 255, 0.85),rgba(255, 255, 255, 0.85)),url('" + meatyGif  + "')")
  
  
  $("[bgcolor]").css("background", "rgb(255,255,255)")
  $("[bgcolor='#339900']").css("background", "url('" + baconPattern + "')")

  setInterval(function(){
    $("#GroupGrid > div:last-child").css("background", "url('" + baconPattern + "')")
    $("#GroupGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")

    $("[id*='GroupTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']").css("background", "rgba(0,0,0,0)")
  
    $("#YouGrid > div:last-child").css("background", "url('" + baconPattern  + "')")
    $("#YouGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")
  
    $("[id*='YouTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']").css("background", "rgba(0,0,0,0)")
  }, 10);
}

setTimeout(when2Meat, 500);
