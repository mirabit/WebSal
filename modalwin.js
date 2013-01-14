var winModalWindow;
 
function ShowWindow(str,w,h,t,l)
{

var param1="dialogWidth= "+w+"px;dialogHeight= "+h+"px;dialogTop= "+t+"px;dialogLeft= " +l;
var param2="dependent=yes,width= "+w+",height= "+h+",top= "+t+",left= " +l+",scrollbars=yes,resizable=no";

  if (window.showModalDialog)
  {
    window.showModalDialog(str,"",param1);
    }
  else
  {
	//  window.top.addEventListener();
	//  var el = document.getElementById("t"); 
	//  el.addEventListener("click", modifyText, false);
    window.top.captureEvents (Event.CLICK|Event.FOCUS);//
  //  window.top.addEventListener("click", modifyText, false);
    window.top.onclick=IgnoreEvents;
    window.top.onfocus=HandleFocus ;
    winModalWindow =  window.open (str,"ModalChild",param2);
    //winModalWindow.focus()
  }
}

  
function IgnoreEvents(e)
{
  return false;
}

function HandleFocus()
{
  if (winModalWindow)
  {
    if (!winModalWindow.closed)
    {
      winModalWindow.focus();
    }
    else
    {
      window.top.releaseEvents (Event.CLICK|Event.FOCUS);
      window.top.onclick = "";
    }
  }
  return false;
}

function IncModal(){
	if ((winModalWindow) &&  (!winModalWindow.closed)){
		winModalWindow.window.close();
	}
}
