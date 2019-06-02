
$(window).on('load', function(){
$(window).on('resize', function(){

    var winHeight = $(window).height();

});


function randOrder() {
    return (Math.round(Math.random()) - 0.5);
}

var soundOn = false;

$(document).ready(function () {


var loop = new Audio('./audio/moon.mp3');
loop.loop = true;



    $('.play-button').click(function() {
        
        soundOn = !soundOn;

        if(soundOn === true){
            $(this).children('span').removeClass( 'icon-volume-mute2' ).addClass( 'icon-volume-high' );
            loop.play();

        }
        else {
            $(this).children('span').removeClass( 'icon-volume-high' ).addClass( 'icon-volume-mute2' );
            loop.pause();
        }
        

    });

    animateDiv();
    var winHeight = $(window).height();

    var classes = ['buddy'];
    classes.sort(randOrder);
    $('body').each(function (i, val) {
        $('#little_buddy').addClass(classes[i]);
    });

    cloudlg1 = $('.cloud-lg-1');
    cloudlg2 = $('.cloud-lg-2');

    cloudFloat(cloudlg1, cloudlg2);

});

var SineWave = function() {
  this.css = function(p) {
    var s = Math.sin(p*20)
    var x = 500 * 300
    var y = s * 50 + 150
    var o = ((s+2)/4+0.1)
    return {top: y + 'px', left: x + 'px', opacity: o}
  }
};


function makeNewPosition() {

    var h = $('.butt-wrapper').height() - $('#little_buddy').height();
    var w = $('.butt-wrapper').width() - $('#little_buddy').width();
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    return [nh, nw];

}

function animateDiv() {
    console.log(soundOn);
    var hop = new Audio('./audio/hop.mp3');

    if (soundOn === true) {
        hop.play();
    }
    

    var newq = makeNewPosition();
    var oldq = $('#little_buddy').offset();
    var p = $("p");
    var direction = oldq.left - newq[1];
    var speed = calcSpeed([oldq.top, oldq.left], newq);
    var bezier_params = {
        start: {
          x: oldq.left,
          y: oldq.top,
          angle: 40
        },
        end: {
          x: newq[1],
          y:newq[0],
          angle: -40,
          length: 0.25
        }
      }
    $('#little_buddy').animate({path : new $.path.bezier(bezier_params)}, speed, function () {
        animateDiv();

    });
    if (direction > 0) {
        $("#little_buddy").removeClass('flipped');
    } else {
        $("#little_buddy").addClass('flipped');
    };
    

};

function calcSpeed(prev, next) {

    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;

    var speedModifier = 0.2;

    var speed = Math.ceil(greatest / speedModifier);

    return speed;

}

function cloudFloat(first, second) {
    first.animate({
        left: '-100%',
    }, 3000, 'linear', function() {
        first.css('left', '100%');
        move(second, first);
    });
    second.animate({
        left: 0
    }, 3000, 'linear');
}


});