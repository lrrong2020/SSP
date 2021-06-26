
        /*There are for index.html */

        /*This function is to know which style device that users use.*/
        function browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
                var judge = "phone";
            } else {
                var judge = "pc";
            }
            return judge;
        }
        var judge = browserRedirect();

        function click1() {
            if(judge == "phone"){
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/basement.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";
                }
            else{
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/basement_pc.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";
                }
        
        }

        function click2() {
            if(judge == "phone"){
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/Ground-floor.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";
            }
            else{
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/Ground-floor_pc.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";

            }
        }
    
        function click3() {
            if(judge == "phone"){
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/floor1.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";
        }        
            else{
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/floor1_pc.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";
   
            }
        }

        function click4() {
            if(judge == "phone"){
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/floor2.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";
            }
            else{
                document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/floor2_pc.html'" + "style='width: 100%;height: 1000px;'" + "></iframe>";

            }
        
        function click5() {
            document.getElementById('desdiv').innerHTML = "<iframe src='childWebpage/xmlfile/timetable.html'" + "style='width: 100%;height:100%"+"></iframe>";
        }
        }
