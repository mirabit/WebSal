
//***************functii particulare pt instanta sal*****************//

//incarcare in instanta sal din local storage, la pagina index
function loadSalIndex() {
	var doc=localStorage.getItem("salxml");
	//alert(" doc = " + doc);
	if (!doc){
		alert("Nu am gasit date memorate!");
	}else{
		var model = document.getElementById("SAL").xfElement;
		var inst = document.getElementById("sal").xfElement;
		inst.setDoc(doc, false, true);
		//xforms.addChange(model);
		XsltForms_globals.addChange(model);
		//XMLEvents.dispatch(model, "xforms-rebuild");
		XsltForms_xmlevents.dispatch(model, "xforms-rebuild");				
		//xforms.refresh();
		XsltForms_globals.refresh();
	}
	//return doc;	
}

//verificare instanta sal din local storage, spre Index01
function intrIndex01() {
	var doc=localStorage.getItem("salxml");
	if (!doc){
		alert("Nu s-au găsit date memorate local! Creați o firmă nouă sau alegeți un fișier salvat anterior.");
	}else{
		location='index01.xhtml'
	}	
}

//verificare instanta sal din local storage, spre Lună nouă
function intrLN() {
	var doc=localStorage.getItem("salxml");
	if (!doc){
		alert("Nu s-au găsit date memorate local! Creați o firmă nouă sau alegeți un fișier salvat anterior.");
	}else{
		location='adsln.xhtml'
	}	
}

//incarcare in instanta sal din local storage   --  deprecated
var startLS;
function loadSal() {
	startLS = new Date();
	//alert("time= " + start);
	var doc=localStorage.getItem("salxml");
	if (!doc){
		alert("Nu s-au găsit date memorate local! Încărcați un set de date existente salvate anterior sau creați o firmă nouă.");
	}else{
		var model = document.getElementById("SAL").xfElement;
		var inst = document.getElementById("sal").xfElement;
		inst.setDoc(doc, false, true);
		//xforms.addChange(model);
		XsltForms_globals.addChange(model);
		//XMLEvents.dispatch(model, "xforms-rebuild");
		XsltForms_xmlevents.dispatch(model, "xforms-rebuild");				
		//xforms.refresh();
		XsltForms_globals.refresh();
	}	
}
//incarcare in instanțe din local storage
function loadInstFromLocal(idinst) {
	var nameForLoad=idinst+"xml";
	var doc=localStorage.getItem(nameForLoad);	
	if (!doc){
		alert(" Nu s-au găsit date memorate local! Încărcați dintr-un fișier sau creați firmă noă.");
	}else{
		var model = document.getElementById("SAL").xfElement;
		var inst = document.getElementById(idinst).xfElement;
		inst.setDoc(doc, false, true);
		//xforms.addChange(model);
		XsltForms_globals.addChange(model);
		//XMLEvents.dispatch(model, "xforms-rebuild");
		XsltForms_xmlevents.dispatch(model, "xforms-rebuild");				
		//xforms.refresh();
		XsltForms_globals.refresh();
	}	
}
//salveaza date inst.sal in localStorage--deprecated-indicat sa se foloseasca saveDataLocal('sal') 
function saveSal(){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument("sal") ;
	var doc = getValue(inst, false, true);
	alert(" Datele s-au salvat cu succes ");
	localStorage.setItem("salxml", doc);
}

//***************functii generalizate*****************//

//citire din fis ales, salvare in localStorage si incarcare in instanta parametrizat
function readFile(idinst,upl) {
  	var model = document.getElementById("SAL").xfElement;
	var inst = document.getElementById(idinst).xfElement;
    var file = document.getElementById(upl).files[0];
    //alert('file:'+file);
    if (file) {
		var reader = new FileReader();
	    reader.onloadend = function(evt) {
	        if (evt.target.readyState == FileReader.DONE) { 
	        	var doc = evt.target.result;
				inst.setDoc(doc, false, true);
				//xforms.addChange(model);
				XsltForms_globals.addChange(model);
				//XMLEvents.dispatch(model, "xforms-rebuild");
				XsltForms_xmlevents.dispatch(model, "xforms-rebuild");				
				//xforms.refresh();
				XsltForms_globals.refresh();
				//model.rebuild();
				//model.recalculate();
				//model.refresh();
				alert(" Datele din instanța "+idinst+" s-au salvat cu succes ! ");
				if(idinst=='sal'){
					localStorage.setItem("salxml", doc);
	        	}
	        }
	    };
		reader.readAsText(file);
	}
}
//salvare date din instanta 'idinst' in localstorage cu numelede 'idinst'xml
function saveDataLocal(idinst){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument(idinst) ;
	//var doc = getValue(inst, false, true);
	var doc = XsltForms_browser.getValue(inst, true, true);	
	//alert(" Datele din instanța "+idinst+" s-au salvat cu succes ! ");
	var nameForSave=idinst+"xml";
	localStorage.setItem(nameForSave, doc);
}
// salvare date din instanța 'idinst' în fișier extern (fără applet) 
function saveToFile(idinst){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument(idinst) ;
	//var doc = getValue(inst, false, true);
	var doc = XsltForms_browser.getValue(inst, true, true);	
	//var serializer = new XMLSerializer();
	//var doc = XML(serializer.serializeToString(inst)).toXMLString();	
	var docindent = formatXml(doc);
	//var docindent = dumpObj(doc, "XmlReport", "1", 1);
	//alert(" Doc ind \n"+docindent);
	window.location.href = "data:application/x-download;charset=utf-8," + encodeURIComponent(docindent);
}
// vizualizare date din instanța 'idinst' într-o fereastră/pagină 
function viewXml(idinst){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument(idinst) ;
	//var doc = getValue(inst, false, true);
	var doc = XsltForms_browser.getValue(inst, true, true);
	//var serializer = new XMLSerializer();
	//var doc = XML(serializer.serializeToString(inst)).toXMLString();	
	var docindent = formatXml(doc);
	//var docindent = dumpObj(doc, "XmlReport", "1", 1);
	//alert(" \n"+doc);
	alert(" \n"+docindent);
	//document.getElementById("view").innerHTML = docindent;
}
// salvare date din instanța 'idinst' în localstorage + în fișier extern (fără applet) 
function saveLocalPlusFile(idinst){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument(idinst) ;
	//var doc = getValue(inst, false, true);
	var doc = XsltForms_browser.getValue(inst, true, true);	
	var nameForSave=idinst+"xml";
	localStorage.setItem(nameForSave, doc);	
	window.location.href = "data:application/x-download;charset=utf-8," + encodeURIComponent(doc);
}		
//citire din local storage variabila item
function loadFromLocal(item) {
	var doc="";
	doc=localStorage.getItem(item);
	if (doc==""){
		alert("Nu am gasit date memorate cu numele "+item+" !");
	}
	return doc;
}

////////////////////////////////////////////////////////////

//initializare pontaj pt.fiecare angajat cu zilele nelucratoare din luna de lucru

function iniPontaj(){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument("sal");
	var lunaluc=inst.getElementsByTagName("LunaLucru")[0].childNodes[0].nodeValue;
	var year=lunaluc.substr(0,4);
	var month=lunaluc.substr(4);
	//citesc nr zile din luna
	var totzile=new Date(year, month, 0).getDate();
	//citesc zile nelucratoare din luna
	var azinl=new Array();
	var nrel=0;
	for(var i=1;i<=totzile;i++){
		var d = new Date(year,month-1,i);
		if(d.getDay()==0||d.getDay()==6){
			azinl[nrel]=i;
			nrel=nrel+1;
		}
	}
	for (var i=totzile+1;i<=31;i++){
		azinl[nrel]=i;
		nrel=nrel+1;
	}
	///modificare ore lucrate  pt. fiecare salariat din luna de lucru
	var luni=inst.getElementsByTagName("DateLunare")[0].getElementsByTagName("Luna");
	for (var l=0;l<luni.length;l++){//caut luna de lucru intre lunile din DateLunare
		var luna=luni[l];
		if(luna.getAttribute('AnLuna')==lunaluc){//gasita luna de lucru
			//alert(" lunaluc= " + lunaluc);
			var salariat=luna.getElementsByTagName("Salariat");//lista de salariati din DateLunare/Luna de lucru
			//alert(" Salariati= " + salariat.length);							
			for (var i=0;i<salariat.length;i++){
				var sal=salariat[i];//salariatul curent din  DateLunare/Luna de lucru
				//citire norma 
				var norma=8;
				var salariatp=inst.getElementsByTagName("Personal")[0].getElementsByTagName("Salariat");//lista de salariati din Personal/Salariat 
				for (var l1=0;l1<salariatp.length;l1++){
					sal1=salariatp[l1];//salariatul curent din  Personal/Salariat
					if(sal1.getAttribute('id')==sal.getAttribute('id')){
						norma=sal1.getElementsByTagName("Contract")[0].getElementsByTagName("TimpMuncaNorma")[0].childNodes[0].nodeValue;
						break;
					}
				}
				var sapt=sal.getElementsByTagName("Sapt");//lista de saptamani din salariat
				for (var j=0;j<sapt.length;j++){//pt.fiecare saptamana
					var saptamana=sapt[j];
					var zile=saptamana.getElementsByTagName("Zile")[0].getElementsByTagName("Ziua");//lista de zile din saptamana
					for (var k=0;k<zile.length;k++){//pt.fiecare zi
						var ziua=zile[k];
						var nrzi=ziua.getAttribute("nr");
						var orezi=ziua.getElementsByTagName("OreZi")[0];
						var gasit=0;
						for(var n=0;n<azinl.length;n++){//verific existenta in lista zilelor nelucratoare
							if(nrzi==azinl[n]){//zi nelucratoare
								orezi.childNodes[0].nodeValue=0;
								gasit=1;
								break;
							}
						}
						if(gasit==0){
							orezi.childNodes[0].nodeValue=norma;

						}
					}
				}
			}
			break;
		}
	}
	////refresh model
	XsltForms_globals.addChange(model);
	XsltForms_xmlevents.dispatch(model, "xforms-rebuild");				
	XsltForms_globals.refresh();
}
function iniPontajSalariatNou(){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument("salsablon");
	//var inst = model.getInstanceDocument("sal");
	//citire luna inceput, norma pt.salariat nou
	var salariat=inst.getElementsByTagName("Personal")[0].getElementsByTagName("Salariat")[0];
	var norma=salariat.getElementsByTagName("Contract")[0].getElementsByTagName("TimpMuncaNorma")[0].childNodes[0].nodeValue;
	//alert("norma= "+norma);
	var dataini=salariat.getElementsByTagName("Contract")[0].getElementsByTagName("DataInceputContract")[0].childNodes[0].nodeValue;
	var year=dataini.substr(0,4);
	var month=dataini.substr(5,2);
	//alert("dataini"+dataini+"-luna:"+month+"-anul:"+year);
	//citesc nr zile din luna
	var totzile=new Date(year, month, 0).getDate();
	//alert("total zile luna "+month+"/"+year+" = "+totzile);
	//citesc zile nelucratoare din luna
	var azinl=new Array();
	var nrel=0;
	for(var i=1;i<=totzile;i++){
		var d = new Date(year,month-1,i);
		if(d.getDay()==0||d.getDay()==6){
			azinl[nrel]=i;
			nrel=nrel+1;
		}
	}
	for (var i=totzile+1;i<=31;i++){
		azinl[nrel]=i;
		nrel=nrel+1;
	}
	
	///modificare ore lucrate  pt. fiecare salariat din luna de lucru
	var sal=inst.getElementsByTagName("DateLunare")[0].getElementsByTagName("Luna")[0].getElementsByTagName("Salariat")[0];
	var sapt=sal.getElementsByTagName("Sapt");//lista de saptamani din salariat
	for (var j=0;j<sapt.length;j++){//pt.fiecare saptamana
		var saptamana=sapt[j];
		var zile=saptamana.getElementsByTagName("Zile")[0].getElementsByTagName("Ziua");//lista de zile din saptamana
		for (var k=0;k<zile.length;k++){//pt.fiecare zi
			var ziua=zile[k];
			var nrzi=ziua.getAttribute("nr");
			var orezi=ziua.getElementsByTagName("OreZi")[0];
			var gasit=0;
			for(var n=0;n<azinl.length;n++){//verific existenta in lista zilelor nelucratoare
				if(nrzi==azinl[n]){//zi nelucratoare
					orezi.childNodes[0].nodeValue=0;
					gasit=1;
					break;
				}
			}
			if(gasit==0){
				orezi.childNodes[0].nodeValue=norma;

			}
		/*	for (var i=totzile+1;i<=31;i++){
				orezi.childNodes[0].nodeValue='';
			}*/
		}
	}
	////refresh model
	XsltForms_globals.addChange(model);
	XsltForms_xmlevents.dispatch(model, "xforms-rebuild");				
	XsltForms_globals.refresh();
}

//initializare pontaj diferențiat

function iniPontajSort(){
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument("sal");
	var lunaluc=inst.getElementsByTagName("LunaLucru")[0].childNodes[0].nodeValue;
	var year=lunaluc.substr(0,4);
	var month=lunaluc.substr(4);
	//citesc nr zile din luna
	var totzile=new Date(year, month, 0).getDate();
	//citesc zile nelucratoare din luna
	//var azinlw=new Array();
	var azinlw=[];
	var nrel=0;
	for(var i=1;i<=totzile;i++){
		var d = new Date(year,month-1,i);
		if(d.getDay()==0||d.getDay()==6){
			azinlw[nrel]=i;
			nrel=nrel+1;
		}
	}

	loadDgSarbJQ(year,month);

	var b = sarbatori;
	var a = azinlw;
	for (var i=0; i<b.length; i++) {
		if (a.indexOf(b[i])<0) { // element doesn't exist inside 'a' array
			a.push(b[i]);
		}		
	}
	//alert("a: " + a + "b: " + b); 
	//var azinlws = a; //  zile weekend + sărbători  ---- sortare
	//azinlws.sort(function(num1,num2){
	//        return num1-num2;
	//    });
	nrzilews=a.length;
	
	var nrZileLL = totzile - nrzilews; // nr zile lucrătoare rămase
	for (var i=totzile+1;i<=31;i++){
		azinlw[nrel]=i;
		nrel=nrel+1;
	}
	//alert("azinlw: " + azinlw + "sarbatori: " + sarbatori + "azinlws: " + a + "nrzweek: " + nrel + "nrzilews: " + nrzilews);
	
	// Scriere nr zile lucrătoare  în DateLunare/Luna/@NrZlucruL
	$(inst).find("DateLunare").find("Luna[AnLuna = '"+lunaluc+"']").attr("NrZlucruL", nrZileLL);
	
	var listaIdSalLL = [];  // array cu id (marca) ale salariaților din DateLunare/LunaLucru
	$(inst).find("DateLunare").find("Luna[AnLuna = '"+lunaluc+"']").find("Salariat").each(function(){
		var idsal=$(this).attr("id");					
		listaIdSalLL.push(idsal);
	});	
	//alert("listaIdSalLL= "+listaIdSalLL+"-luna:"+month+"-anul:"+year);
		//ciclare Salariati din Personal
	var salnou = false;
	$(inst).find("Personal").find("Salariat").each(function(){
		//alert("intrat " + $(this).attr("Nume") );
        if ($.inArray($(this).attr("id"), listaIdSalLL) == -1) {
        	salnou = true;
        //	alert("primul sal nou: " + $(this).attr("Nume"));
        	return false;
        }
	});	
	if (salnou == true){
		loadSablon();
		
		// înlocuit sablonsal din sablon.xml cu ultima înregistrare a acestui id în DateLunare, dacă există
		//if ...
	}		
	$(inst).find("Personal").find("Salariat").each(function(){
		//alert($(this).attr("Nume"));
        //if (this.find("Contract").find("StareCurentaId") = "ContractStareActiv") {
        //if ($(this).find("Contract").find("StareCurentaId").text() == "ContractStareActiv") {
        //	alert("Salariați activi: " + $(this).attr("Nume"));
		    if ($.inArray($(this).attr("id"), listaIdSalLL) == -1) {
		    	//var salUltL = $(inst).find("DateLunare").find("Luna[AnLuna &lt; '"+lunaluc+"']")).find("Salariat");
		    	$(sablonsal).attr("id", $(this).attr("id"));
		    	var normalucru=$(this).find("Contract").find('TimpMuncaNorma').text();
		    	iniPontajSalNou(normalucru,azinlw,sarbatori);
		    	$(sablonsal).find('Retineri').text($(this).find("Contract").find('Retineri').text());
		    	$(sablonsal).clone().appendTo($(inst).find("DateLunare").find("Luna[AnLuna = '"+lunaluc+"']"));
		    	//alert("nr sal după add: " + $(inst).find("DateLunare").find("Luna[AnLuna = '"+lunaluc+"']").find("Salariat").length);
		    } 
        //} else {alert("Salariați inactivi " + $(this).attr("Nume"));}
       // }
	});		
	

	XsltForms_globals.addChange(model);
	XsltForms_xmlevents.dispatch(model, "xforms-rebuild");				
	XsltForms_globals.refresh();
}
function iniPontajSalNou(norma,azinlw,sarbatori){
//	var sapt=sablonsal.getElementsByTagName("Sapt");
	$(sablonsal).find('Sapt').each(function(){
	//for (var j=0;j<sapt.length;j++){//pt.fiecare saptamana
	//	var saptamana=sapt[j];
	//	var zile=saptamana.getElementsByTagName("Zile")[0].getElementsByTagName("Ziua");//lista de zile din saptamana
		$(this).find('Zile').find('Ziua').each(function(){
	//	for (var k=0;k<zile.length;k++){//pt.fiecare zi
		//	var ziua=zile[k];
		//	var nrzi=ziua.getAttribute("nr");
			var ziua=$(this);
			var nrzi=$(this).attr("nr");
		//	var orezi=ziua.getElementsByTagName("OreZi")[0];
			var orezi=$(this).find("OreZi")[0];
			var gasit=0;
			for(var n=0;n<azinlw.length;n++){//verific existenta in lista zilelor nelucratoare
				if(nrzi==azinlw[n]){//zi nelucratoare
				//	orezi.childNodes[0].nodeValue=0;
					$(orezi).text(0);
					$(ziua).attr("tip", "w");
					gasit=1;
					break;
				}
			}
			for(var n=0;n<sarbatori.length;n++){//verific existenta in lista zilelor nelucratoare
				if(nrzi==sarbatori[n]){//zi nelucratoare
				//	orezi.childNodes[0].nodeValue=0;
					$(orezi).text(0);
					$(ziua).attr("tip", "s");
					gasit=1;
					break;
				}
			}
			if(gasit==0){
			//	orezi.childNodes[0].nodeValue=norma;
				$(orezi).text(norma);
				$(ziua).attr("tip", "l");
			}
		});
	});
}
var sablonsal;
function loadSablon() {
	$.ajax({
		type: "GET",
		url: "salsablon.xml",
		dataType: "xml",
		async: false,
		success: parseXml,
		error:function (jqXHR, textStatus, errorThrown){
			alert("status:"+textStatus+"- -"+errorThrown);
		},
		failure: function(data) {
			alert("XML File could not be found");
		}
	});	
	function parseXml(xml) {
		//sablonxml = xml;
		sablonsal = $(xml).find("DateLunare").find("Luna").find("Salariat");		
	}
	//return sablonsal;
}
//var sarbatori=[];
function loadDgSarbJQ(year,month) {
	sarbatori=[];
	$.ajax({
		type: "GET",
		url: "dategen.xml",
		dataType: "xml",
		async: false,
		success: parseXml,
		error:function (jqXHR, textStatus, errorThrown){
			alert("status:"+textStatus+"- -"+errorThrown);
		},
		failure: function(data) {
			alert("XML File could not be found");
		}
	});	
	function parseXml(xml) {
		//$(xml).find("ZileLibere").find("Anul[nr = '"+year+"']").find("Luna[nr = '"+month+"']").find("Ziua").each(function(){
		$(xml).find("ZileLibere").find("Anul[nr = '"+year+"']").find("Ziua[luna = '"+month+"']").each(function(){
			var nrzi=parseInt($(this).attr("nr"));					
			sarbatori.push(nrzi);
		});					
	}
	return sarbatori;
}

////////////////////////////////////////////////////////////
function indentObj(idinst) {
	var model = document.getElementById("SAL").xfElement;
	var inst = model.getInstanceDocument(idinst) ;
	var doc = getValue(inst, false, true);
	alert("neindentat:\n"+doc);
	//var serializer = new XMLSerializer();
	//var prettyString = XML(serializer.serializeToString(inst)).toXMLString();
	var doci=dumpObjWS(inst,"root","\t",1);
	alert("indentat:\n"+doci);
	//alert("indentat:\n"+prettyString);
}
function dumpObjWS(obj, name, indent, depth) {
//	alert("dumpObj pt obj:"+obj);
	if (depth >30) {
	 return indent + name + ": <Maximum Depth Reached>\n";
	}
	if (typeof obj == "object") {
		 var child = null;
		 var output = indent + name + "\n";
		 indent += "\t";
		 for (var item in obj) {
			 try {
							child = obj[item];
			 } catch (e) {
							child = "<Unable to Evaluate>";
			 }
			 if (typeof child == "object") {
							output += dumpObjWS(child, item, indent, depth + 1);
			 } else {
							output += indent + item + ": " + child + "\n";
			 }
		 }
		 return output;
	} else {
				 return obj;
	}
}

function formatXml(xml) {
        var reg = /(>)(<)(\/*)/g;
        var wsexp = / *(.*) +\n/g;
        var contexp = /(<.+>)(.+\n)/g;
        xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
        var pad = 0;
        var formatted = '';
        var lines = xml.split('\n');
        var indent = 0;
        var lastType = 'other';
        // 4 types of tags - single, closing, opening, other (text, doctype, comment) - 4*4 = 16 transitions 
        var transitions = {
            'single->single': 0,
            'single->closing': -1,
            'single->opening': 0,
            'single->other': 0,
            'closing->single': 0,
            'closing->closing': -1,
            'closing->opening': 0,
            'closing->other': 0,
            'opening->single': 1,
            'opening->closing': 0,
            'opening->opening': 1,
            'opening->other': 1,
            'other->single': 0,
            'other->closing': -1,
            'other->opening': 0,
            'other->other': 0
        };

        for (var i = 0; i < lines.length; i++) {
            var ln = lines[i];
            var single = Boolean(ln.match(/<.+\/>/)); // is this line a single tag? ex. <br />
            var closing = Boolean(ln.match(/<\/.+>/)); // is this a closing tag? ex. </a>
            var opening = Boolean(ln.match(/<[^!].*>/)); // is this even a tag (that's not <!something>)
            var type = single ? 'single' : closing ? 'closing' : opening ? 'opening' : 'other';
            var fromTo = lastType + '->' + type;
            lastType = type;
            var padding = '';

            indent += transitions[fromTo];
            for (var j = 0; j < indent; j++) {
                padding += '\t';
            }
            if (fromTo == 'opening->closing')
                formatted = formatted.substr(0, formatted.length - 1) + ln + '\n'; // substr removes line break (\n) from prev loop
            else
                formatted += padding + ln + '\n';
        }

        return formatted;
    };

