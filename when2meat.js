let jq = document.createElement('script');
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(jq);

const baconPattern = "https://rawgit.com/pennlabs/gcal2when2meat/master/img/bacon.png"
const meatyGif = "https://rawgit.com/pennlabs/gcal2when2meat/master/img/meaty.gif"

function hexToRgb(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getIntensityFromStyle(styleText) {
  if (styleText.includes("background: rgb")) {
    let substring = styleText.substring(styleText.indexOf("background: rgb") + 4);
    substring = substring.substring(0, substring.indexOf(")"))
      let rgb = substring.split(",")
      return rgb[1];
  } else if (styleText.includes("background: #")) {
    let substring = styleText.substring(styleText.indexOf("background: #") + 13)
      substring = substring.substring(0, substring.indexOf(";"))
      return hexToRgb(substring).g;
  } else {
    return 255;
  }
}

const when2Meat = function() {

  $("#MainBody").css("background", "linear-gradient(rgba(255, 255, 255, 0.85),rgba(255, 255, 255, 0.85)),url('" + meatyGif  + "')")
    $("[bgcolor]").css("background", "rgb(255,255,255)")
    $("[bgcolor='#339900']").css("background", "url('" + baconPattern + "')")

    $("#GroupGrid > div:last-child").css("background", "url('" + baconPattern + "')")
    $("#GroupGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")

    list = $("[id*='GroupTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']")
    list.each(function(index, elem) {
      let g = getIntensityFromStyle($(elem).attr("style"));
      let i = ((g-187)*0.01470588235).toFixed(2); 
      $(elem).css({"background": "rgba("+g+","+g+","+g+","+i+")"})
    });
}

setTimeout(when2Meat, 500);
setTimeout(
    function(){
      $(document).click(function() {
        when2Meat();
        setInterval(
            function(){
              $("#YouGrid > div:last-child").css("background", "url('" + baconPattern  + "')")
                $("#YouGrid > div:last-child > div[id!='GroupSlots']").css("background", "rgb(255,255,255)")
                list = $("[id*='YouTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']")
                list.each(function(index, elem) {
                  let g = getIntensityFromStyle($(elem).attr("style"));
                  let i = ((g-187)*0.01470588235).toFixed(2); 
                  $(elem).css({"background": "rgba("+g+","+g+","+g+","+i+")"})
                });
              $("[id*='YouTime']").not("[style*='background: #ffffff']").not("[style*='background: rgb(255, 255, 255)']").css("background", "rgba(0,0,0,0)")
            }, 50);
      });
    }, 500);
