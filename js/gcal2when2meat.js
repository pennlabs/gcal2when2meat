(function () {

document.body.appendChild(document.createElement('script')).src =
  "http://code.jquery.com/jquery-1.9.0.min.js";
document.body.appendChild(document.createElement('script')).src =
  "https://apis.google.com/js/client.js?onload=GCAL";

// when2meet
var clientId = "928220966147.apps.googleusercontent.com";
// localhost
//var clientId = "928220966147-mt5jcobiop2nh0461sa5iochjslrjg8f.apps.googleusercontent.com";
var apiKey = "AIzaSyDSR5w4amX6UDxyuR0xylGj9hKh4jjKtZQ";
var scopes = "https://www.googleapis.com/auth/calendar.readonly";


/*
 *
 * WHEN2MEAT
 * A bookmarklet modified by Young Lee
 *
 */

// A new dank font
$(document.body).css({color: "#90292C", fontFamily: "Comic Sans MS", backgroundImage: "http://localhost:8888/meat-icon.png"});

// Navbar recoloring
$('#MenuTop').css({backgroundColor: "#90292C"});
$('#MenuTopLeft').children().css({color: "white"});
$('#MenuTopLeft').children().hover(function(){
    $(this).css({backgroundColor: "white", color: "#90292C"});
    }, function(){
    $(this).css({backgroundColor: "#90292C", color: "white"});
});

// Raining meat
if(!$('#meat-canvas').length){
  $('#MainBody').prepend( "<canvas id='meat-canvas-top' style='width: 100%; height: 50%'></canvas>" );
  $('#MainBody').append( "<canvas id='meat-canvas-bottom' style='width: 100%; height: 50%'></canvas>" );
}

rain('meat-canvas-top');
rain('meat-canvas-bottom');


// Footer styling
$( "div:has(ins)" ).css( "background-color", "#90292C" );
$( "div:has(ins)" ).find('div').append('Bookmarklet created by <a href="http://pennlabs.org" target="_blank" style="color: white">Penn Labs</a>');


// Green box restyling
$('*').filter(function() {
    return $(this).css('backgroundColor') == 'rgb(51, 153, 0)';
  }
)

$("div[id^='GroupTime']").each(function() {
  if($(this).css('backgroundColor') !== '#ffffff') {
    $(this).css({backgroundImage: "http://localhost:8888/meat-icon-mini.png"});
  }
});


// Original bookmarklet code
function load() {
  console.log("load");
  gapi.client.setApiKey(apiKey);
  gapi.auth.init(function () {
    gapi.client.load('calendar', 'v3', function () {
      reqCalendarList().then(function (calendars) {
        calendars = calendars.filter(function (c) { return c.selected; });
        return whenArray(calendars.map(reqEvents));
      }).done(function (events) {
        events = events.filter(function (es) { return es; });
        selectAll();
        if (events.length === 0) {
          alert("Didn't find any events in this time period." +
                " Note that when2meets that use days of the week instead of" +
                " specific dates are not yet supported.");
        } else {
          //console.log("events", flatten(events));
          flatten(events).forEach(deselectEvent);
        }
      });
    });
  });
}

function reqCalendarList() {
  var deferred = $.Deferred();

  gapi.client.calendar.calendarList.list().execute(function (res) {
    console.log(res);
    if (res.code === 401) {
      gapi.auth.authorize({
        client_id: clientId,
        scope: scopes
      }, function () {
        reqCalendarList().then(deferred.resolve);
      });
    } else {
      console.log("authorized!");
      deferred.resolve(res.items);
    }
  });

  return deferred.promise();
}

var events = [];

function reqEvents(calendar) {
  var deferred = $.Deferred();

  gapi.client.calendar.events.list({
    calendarId: calendar.id,
    singleEvents: true, // expand recurring events
    timeMin: new Date(TimeOfSlot[0] * 1000).toISOString(),
    timeMax: new Date(TimeOfSlot[TimeOfSlot.length-1] * 1000).toISOString()
  }).execute(function (res) {
    events.push(res);
    console.log(res);
    deferred.resolve(res.items);
  });

  return deferred.promise();
}

var errors = [];

function deselectEvent(event) {
  try {
    var startTime = convertTime(event.start.dateTime);
    var endTime = convertTime(event.end.dateTime) - 900;
    toggleRange(startTime, endTime, false);
  } catch (e) {
    errors.push(e);
  }
}

function selectAll() {
  toggleRange(TimeOfSlot[0], TimeOfSlot[TimeOfSlot.length-1], true);
}

function toggleRange(startTime, endTime, makeAvailable) {
  try {
    SelectFromHere(startTime);
    SelectToHere(endTime);
    ChangeToAvailable = makeAvailable;
    SelectStop();
  } catch (e) {
    errors.push(e);
  }
}

function flatten(arrs) {
  // reduce was overridden by Prototype.js so use reduceRight
  return arrs.reduceRight(function (a1, a2) { return a1.concat(a2); });
}

function whenArray(promiseArr) {
  return $.when.apply($, promiseArr).then(function () {
    return Array.prototype.slice.call(arguments);
  });
}

function convertTime(gcalTime) {
  var d = new Date(gcalTime);
  // if not on a quarter hour increment
  if (d.getMinutes() % 15 !== 0) {
    // round to the nearest half hour
    var m = (Math.round(d.getMinutes() / 30) * 30) % 60;
    var h = d.getMinutes() > 45 ? d.getHours() + 1 : d.getHours();
    d.setMinutes(m);
    d.setHours(h);
  }
  return d.getTime() / 1000;
}

window.GCAL = load;
window.GCAL.errors = errors;
window.GCAL.events = events;


// MAKE IT RAIN
// Adapted from http://jsfiddle.net/L4Qfb/21/ by John Koerner
function rain(canvasId) {
  var ctx;
  var imgBg;
  var imgDrops;
  var x = 0;
  var y = 0;
  var noOfDrops = 50;
  var fallingDrops = [];

      function drawBackground(){
          ctx.drawImage(imgBg, 0, 0); //Background
      }

      function draw() {
          drawBackground();

          for (var i=0; i< noOfDrops; i++)
          {
          ctx.drawImage (fallingDrops[i].image, fallingDrops[i].x, fallingDrops[i].y); //The rain drop

          fallingDrops[i].y += fallingDrops[i].speed; //Set the falling speed
          if (fallingDrops[i].y > $(window).height()) {  //Repeat the raindrop when it falls out of view
          fallingDrops[i].y = -25 //Account for the image size
          fallingDrops[i].x = Math.random() * 600;    //Make it appear randomly along the width
          }
          }
      }
      function setup() {
          var canvas = document.getElementById(canvasId);
          if (canvas.getContext) {
                  ctx = canvas.getContext('2d');
                  imgBg = new Image();
              imgBg.src = "http://localhost:8888/background.png";
          setInterval(draw, 36);
          for (var i = 0; i < noOfDrops; i++) {
              var fallingDr = new Object();
              fallingDr["image"] =  new Image();
          fallingDr.image.src = 'http://localhost:8888/meat-icon-mini.png';
              fallingDr["x"] = Math.random() * 600;
              fallingDr["y"] = Math.random() * 5;
              fallingDr["speed"] = 3 + Math.random() * 5;
              fallingDrops.push(fallingDr);
              }
          }
      }
  setup();
}

}());
