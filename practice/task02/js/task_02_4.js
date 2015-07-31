var suggestData = ['Apple', 'Asian', 'Baby', 'Back', 'Banna', 'Cat',
                   'Cabbage', 'Doctor', 'Dog', 'Text1', 'Text23', 
                   'Txt1', 'Text1222', 'Text111', 'Tex22', 'Te11', 
                   'TextText', 'Text211', 'Tethwhwh'];
(function() {
    var wrap = document.getElementById('wrap'),
        content = wrap.getElementsByTagName('input')[0],
        rmd = wrap.getElementsByClassName('rmd')[0];
    
    _util.delegateEvent(wrap, 'Input', 'blur', function(evt) {
        rmd.style.display = 'none';
        rmd.innerHTML = '';
    });
     
    _util.delegateEvent(wrap, 'INPUT', 'keydown', function(evt) {
        var event = evt || window.event,
            val = this.value;
            
        if(!val || val.length === 0) return;
            
        var reg = new RegExp('^' + val, i);
        rmd.innerHTML = '';
        for(var i = 0, len = suggestData.length; i < len; i++) {
            if (reg.test(suggestData[i])) {
                var mstr = suggestData[i].match(reg),
                    rmdText = '<i style="color:red">' + mstr + 
                              '</i>' + suggestData[i].substring(mstr.length),
                    eLi = document.createElement('LI');
                    
                    eLi.innerHTML = rmdText;
                    rmd.appendChild(eLi);
            }    
        }
        
        if (rmd.lastChild) rmd.style.display = 'block';
    });
    
    
    _util.delegateEvent(rmd, 'LI', 'click', function(evt) {
        
        var val = this.textContent || this.innerText;
        content.value = val;
        rmd.style.display = 'none';
        rmd.innerHTML = '';
    });
    
}());