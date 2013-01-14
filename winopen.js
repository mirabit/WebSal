//deschide fereastra
function winopen(str, w, h, t, l){
var atrib = ""
atrib += "toolbar=no,location=no,directories=no,alwaysRaised=yes,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,"
atrib += "width=" + w + ","
atrib += "height=" + h + ","
atrib += "top=" + t + ","
atrib += "left=" + l
window.open(str,'window',atrib);
//winopen('AdaPart.jsp', 300, 370, 30, 350);
}
