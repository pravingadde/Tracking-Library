(function(){

    "use strict";

    try{
        var script = document.createElement('script');
        script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
        script.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(script);
        
        var timescript = document.createElement('script');
        timescript.src = 'http://timemejs.com/timeme.min.js';
        timescript.type = 'text/javascript';
        document.getElementsByTagName('head')[0].appendChild(timescript);     
        
        var evnts=["click", "focus","blur","keyup","keydown","keypress","onmouseenter"];
        // You can also Use  mouseup/down, mousemove, resize, mouseover, scroll
        for(var i=0;i<evnts.length;i++){
            window.addEventListener(""+evnts[i]+"", function(e){ myFunction(e); }, false);
        }
        
        // myFuction Starts //
        function myFunction(e){
        var evt=e||window.event;
        if(evt){
        if(evt.isPropagationStopped&&evt.isPropagationStopped()){
            return;
        }
        else{
           
        }
        
        function formatAMPM(){
        var d = new Date(),
            minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
            hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
            ampm = d.getHours() >= 12 ? 'pm' : 'am',
            months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        return days[d.getDay()]+' | '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' | '+hours+': '+minutes+' '+ampm;
        }
        
        var hoverdata;
        var et=evt.type?evt.type:evt;
        var trgt=evt.target?evt.target:window;
        var time=formatAMPM();
        var x=0, y=0, scrolltop=0;
        if(evt.pageX){
        x=evt.pageX;
        }
        if(evt.pageY){
        y=evt.pageY;
        }
        if(trgt.scrollTop){
        scrolltop=trgt.scrollTop;
        }
        if(trgt.className&&trgt.id){
        trgt="#"+trgt.id+"."+trgt.className;
        }
        else if(trgt.className){
            trgt="."+trgt.className;
        }
        else if(trgt.id){
        trgt="#"+trgt.id;
        }        
        
        if(typeof(trgt)!="String"){
            if(trgt.tagName){
             trgt=trgt.tagName;
            }
            else{
            trgt=trgt.toString().toLowerCase();
            trgt=trgt.replace("[object ","");
            trgt=trgt.replace("]","");
            trgt=trgt.replace("htmlbodyelement","BODY");
            }
        }
        var xtra="";
        if(evt.keyCode){
        xtra+=" KeyCode: "+evt.keyCode;
        }
        if(evt.shiftKey){
        xtra+=" ShiftKey ";
        }
        if(evt.altKey){
        xtra+=" altKey ";
        }
        if(evt.metaKey){
        xtra+=" metaKey ";
        }
        if(evt.ctrlKey){
        xtra+=" ctrlKey ";
        }
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            xx = w.innerWidth || e.clientWidth || g.clientWidth,
            yy = w.innerHeight|| e.clientHeight|| g.clientHeight;
        xtra+="";
        
        $(document).ready(function(){
            $('div, li, p, span, a, label, tr, td, th, input').hover(function(){        
                console.log("hover data: " + this.textContent);
                hoverdata = this.textContent;
            });
        });
        
       document.getElementById("op").innerHTML+="<tr><td>"+et+"</td><td>"+trgt+"</td><td>"+x+"</td><td>"+y+"</td><td>"+scrolltop+"</td><td>"+time+"</td><td>"+xtra+"</td></tr>";
        
        var events={};
        events= {
           "event": et,
           "target":trgt,
           "x_co_ordinate":x,
           "y_co_ordinate": y,
           "scrolltop": scrolltop,
           "timestamp":time,
           "keycode": xtra,
           "hover_data": hoverdata
        }
            dopost(events);
        }
        
        
        }
        
        // myFuction Ends //
        
        var all = document.getElementsByTagName("*");
        for (var i=0, max=all.length; i < max; i++) {
             // Do something with the element here
             //all.addEventListener.hover.textContent
        
        }
        console.log(all);
        
        function dopost(events) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
                   if (xmlhttp.status == 200) {
                    console.log("data sent successfully");
                   }          
                   else {
                    console.log("data sending failed");
                   }
                }
            };
            xmlhttp.open("POST", "http://192.168.1.139:8080/saveHistory", true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.send(JSON.stringify(events));
        }       
        
        var startTime = (new Date()).getTime();
        window.onbeforeunload = function (event) {
            var timeSpent = (new Date()).getTime() - startTime,
            xmlhttp= new XMLHttpRequest();
            var logtime = ""
            logtime = {
                "time":timeSpent
            } 
            xmlhttp.open("POST", "http://192.168.1.139:8080/saveTime");
            xmlhttp.setRequestHeader("Content-type", "application/json");
            var timeSpentOnPage = TimeMe.getTimeOnCurrentPageInSeconds();    
            xmlhttp.send(JSON.stringify(logtime));    
        };
    }
    catch(error){
        console.log(error);
    }
})();