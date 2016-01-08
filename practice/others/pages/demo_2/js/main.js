// Common
var requestAnimationFrame = (window.requestAnimationFrame && window.requestAnimationFrame.bind(window))       ||
                            (window.mozRequestAnimationFrame && window.mozRequestAnimationFrame.bind(window)) ||
                            (window.webkitRequestAnimationFrame && window.webkitRequestAnimationFrame.bind(window));

var cancelAnimationFrame = (window.cancelAnimationFrame && window.cancelAnimationFrame.bind(window))       ||
                           (window.mozCancelAnimationFrame && window.mozCancelAnimationFrame.bind(window)) ||
                           (window.webkitCancelAnimationFrame && window.webkitCancelAnimationFrame(window));
// End of common

// Pendulum
var showPendulum = function(duration) {

    var Pendulum = function(duration) {
        this.box = document.querySelector('#pendulum .p-stick-wrap');
        this.startTime = null;
        this.begAngle = this.pGetAngle();
        this.duration = duration || 3000;
        this.anReq = null;
        this.aniamteFcn = this.pSwing.bind(this);

        this.pAnimate();
    };

    Pendulum.prototype.pSwing = function(timeStamp) {
        var drawStart = Date.now();
        var diff = drawStart - this.startTime;

        var angle = this.pGetAngle();
        var newAngle = Easing.easeOutElastic(diff, this.begAngle, 0 - this.begAngle, this.duration);

        if (diff <= this.duration) {
            this.box.style.transform = 'rotate(' + newAngle + 'deg)';
            this.anReq = requestAnimationFrame(this.aniamteFcn);
        }
        else {
            this.pStop();
        }
    };

    Pendulum.prototype.pStart = function() {
        this.startTime = Date.now();
        this.anReq || requestAnimationFrame(this.aniamteFcn);
    };

    Pendulum.prototype.pStop = function() {
        cancelAnimationFrame(this.anReq);
        this.anReq = null;

        clearTimeout(this.timer);
        this.timer = null;

        var self = this;
        this.timer = setTimeout(function() {
            self.box.style.transform = 'rotate(' + self.begAngle + 'deg)';
        }, 1500);
    };

    Pendulum.prototype.pGetAngle = function() {
        var trans = window.getComputedStyle(this.box, null)
                          .getPropertyValue('transform');

        var val = trans.split('(')[1].split(')')[0].split(',');
        var a = val[0],
            b = val[1],
            c = val[2],
            d = val[3];

        var scale = Math.sqrt(a*a + b*b);
        var sin = b / scale;

        return Math.round(Math.atan2(b, a) * (180 / Math.PI));
    };

    Pendulum.prototype.pAnimate = function() {
        this.pStart();

        var self = this;
        setInterval(function() {
            self.pStart();
        }, 5000);
    };

    return new Pendulum(duration);
};
// End of Pendulum

window.onload = function() {
    showPendulum(3000);
}
