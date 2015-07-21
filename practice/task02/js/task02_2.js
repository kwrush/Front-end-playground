(function() {
    var dateInput = document.getElementsByClassName('date-input')[0],
        btn = document.getElementsByClassName('btn')[0],
        timer = null;
    
    // get the differences between two dates in different format
    var getDateGap = {
        
        // 1000*60*60*24
        dev: 86400000,
        
        getDays: function(d1, d2) {
            return parseInt((d1 - d2) / this.dev);
        },
        
        getHours: function(d1, d2) {
            return parseInt((d1 - d2) % this.dev / (1000 * 3600));
        },
        
        getMinutes: function(d1, d2) {
            return parseInt((d1 - d2) % this.dev % (1000 * 3600) / (60 * 1000));
        },
        
        getSeconds: function(d1, d2) {
            return parseInt((d1 - d2) % this.dev % (1000 * 3600) % (60 * 1000) / 1000);
        }
    };
    
    _util.addEvent(dateInput, 'blur', checkDate);
    _util.addEvent(btn, 'click', processDate);
    
    
    function checkDate(e) {
        var input = this.value,
            reg = /^((2[0-9][0-9][0-9])\-(1[0-2]|0[1-9]|[1-9])\-([0-9]|0[1-9]|1[0-9]|2[0-9]|3[01]))$/g;
        
        if (!reg.test(input)) {
            this.style.borderColor = 'red';
            btn.disabled = true;
        }
        else {
            this.style.borderColor = this.style.borderColor === 'red' ? '' : this.style.borderColor;
            btn.disabled = btn.disabled ? false : btn.disabled;
        }
    }
    
    function processDate(e) {
        var date = new Date(dateInput.value + ' 00:00:00'),
            curr = new Date(),
            show = document.getElementsByClassName('show')[0],
            content = '';
        
        clearInterval(timer);
        
        // reset current date to midnight(00:00:00)
        curr.setHours(0, 0, 0, 0);
        
        if (date.getTime() < curr.getTime()) {
            content = '<p>Oops, time has passed...</p>';
            show.innerHTML = content;
        }
        
        else if (date.getTime() === curr.getTime()) {
            content = '<p>' +
                      '0 Days 0 hours 0 minuts 0 seconds to ' + date.getFullYear() + 
                      '-' + (date.getMonth() + 1) + '-' + date.getDate() + '.'
                      '</p>';
            
            show.innerHTML = content;
        }
        
        else {
            timer = setInterval(function() {
                var now = new Date();

                content = '<p>' +
                          getDateGap.getDays(date, now) + ' Days ' + 
                          getDateGap.getHours(date, now) + ' hours ' +
                          getDateGap.getMinutes(date, now) + ' minuts ' +
                          getDateGap.getSeconds(date, now) + ' seconds to ' + 
                          date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '.'
                          '</p>';
                
                if (now.getTime() === date.getTime()) clearInterval(timer);
                
                show.innerHTML = content;
                
            }, 1000);
        }
    }
    
    
                   
}());