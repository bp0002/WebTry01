//高亮突出当前页的导航元素
function highlightPage(){
	if (!document.getElementsByTagName) { return false; };
	if (!document.getElementById) { return false; };
	var headers = document.getElementsByTagName('header');
	if (headers.length == 0) { return false; };
	var navs = headers[0].getElementsByTagName('nav');
	if (navs.length == 0 ) { return false; };
	
	var links = navs[0].getElementsByTagName('a');
	var linkurl;
	for (var i=0; i<links.length; i++){
		linkurl = links[i].getAttribute('href');
		if (window.location.href.indexOf(linkurl) != -1 ){
			addClass(links[i], "here");
			
			var linktxt = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktxt);
		};
	};
};
//元素幻灯
function moveElement(eleID,final_x,final_y,interval){
	if (!document.getElementById) { return false; };
	if (!document.getElementById(eleID)) { return false; };
	var elem = document.getElementById(eleID);
	if (elem.movement) { clearInterval(elem.movement); };
	if (!elem.style.left) { elem.style.left = "0px"; };
	if (!elem.style.top) { elem.style.top = "0px"; };
	
	var xpos = parseInt(elem.style.left);
	var ypos = parseInt(elem.style.top);
	if (xpos == final_x && ypos == final_y) {
		return true;
	};
	var dist;
	if (xpos < final_x) {
		dist = Math.ceil( (final_x - xpos)/10 );
		xpos = xpos + dist;
	};
	if (xpos > final_x) {
		dist = Math.ceil( (final_x - xpos)/10 );
		xpos = xpos - dist;
	};
	if (ypos < final_y) {
		dist = Math.ceil( (final_y - ypos)/10 );
		ypos = ypos + dist;
	};
	if (ypos > final_y) {
		dist = Math.ceil( (final_y - ypos)/10 );
		ypos = ypos - dist;
	};
	elem.style.left = xpos + "px";
	elem.style.top = ypos + "px";
	var repeat = "moveElement('"+elementID+"', "+final_x+", "+final_y+", "+interval+")";
	elem.movement = setTimeout(repeat, interval);
};

function prepareSlideshow(){
	if (!document.getElementsByTagName) { return false; };
	if (!document.getElementById) { return false; };
	if (!document.getElementById("intro")) { return false; };
	
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id","slideshow");
	
	var fram = document.createElement("img");
	fram.setAttribute("src", "/img/002.jpg");
	fram.setAttribute("alt", "");
	fram.setAttribute("id", "frame");
	slideshow.appendChild(fram);
	
	var preview = document.createElement("img");
	preview.setAttribute("src", "img/003.jpg");
	preview.setAttribute("alt", "a glimpse of what awaits you.");
	preview.setAttribute("id", "preview");
	
	slideshow.appendChild(preview);
	myInsertAfter(slideshow, intro);
	
	var links = document.getElementsByTagName("a");
	var dest ;
	for (var i=0; i<links.length; i++){
		links[i].onmouseover = function(){
			dest = this.getAttribute("href");
			if (dest.indexOf("index.html") != -1 ) {
				moveElement("preview", 0, 0, 5);
			};
			if (dest.indexOf("about.html") != -1 ) {
				moveElement("preview", -200, 0, 5);
			};
			if (dest.indexOf("photos.html") != -1 ) {
				moveElement("preview", -400, 0, 5);
			};
			if (dest.indexOf("live.html") != -1 ) {
				moveElement("preview", -600, 0, 5);
			};
			if (dest.indexOf("contact.html") != -1 ) {
				moveElement("preview", -800, 0, 5);
			};
		};
	};
};

//指定显示section
function showSection(id){
	var sections = document.getElementsByTagName("section");
	for (i =0; i<sections.length; i++) {
		if (sections[i].getAttribute("id") != id){
		sections[i].style.display = "none";
	    }else{
		sections[i].style.display = "block";
		};
	};
};
//根据点击的导航，指定显示section
function prepareInternalnav(){
	if (!document.getElementsByTagName) { return false; };
	if (!document.getElementById) { return false; };
	var article = document.getElementsByTagName("article");
	if (article.length == 0 ) { return false; };
	var navs = article[0].getElementsByTagName("nav");
	if (navs.length == 0) { return false; };
	
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for (var i=0; i<links.length; i++){
		var sectionID = links[i].getAttribute("href").split("#")[1];
		if (!document.getElementById(sectionID) ) { continue; };
		document.getElementById(sectionID).style.display = "none";
		links[i].destination = sectionID;
		links[i].onclick = function(){
			showSection(this.destination);
			return false;
		};
	};
};


function addDIV(parent, txt){
	var div0 = document.createElement("div");
	parent.appendChild(div0);
	var txt0 = document.createTextNode(txt);
	div0.appendChild(txt0);
};

function add0(){
	var parent = document.getElementsByTagName("article")[0];
	addDIV(parent, "动态添加的第一个DIV");
}

function showPic(whichPic){
	if (!document.getElementById("imgPreview0") ) { return false; };
				
	var source = whichPic.getAttribute("href");
	var showEle = document.getElementById("imgPreview0");
	if (showEle.nodeName != "IMG") { return false; };
				
	showEle.setAttribute("src", source);
	if (document.getElementById("imgDescrip0")){
		var txt = whichPic.getAttribute("title") ? whichPic.getAttribute("title") : "";
		var desc = document.getElementById("imgDescrip0");
		if (desc.firstChild.nodeType == 3){
			desc.firstChild.nodeValue = txt;
		};
	};
	return true;
};

function prepareGallery(){
	if (!document.getElementsByTagName) { return false; };
	if (!document.getElementById) { return false; };
	if (!document.getElementById("imageGallery")) { return false; };
				
	var gallery = document.getElementById("imageGallery");
	var links = gallery.getElementsByTagName("a");
	for (var i=0; i < links.length; i++){
		links[i].onclick = function(){
			return showPic(this) ? false : true;
		};
	};
};
			
function addPreview(){
	if (!document.createElement) { return false; };
	if (!document.createTextNode) { return false; };
	if (!document.getElementById) { return false; };
	if (!document.getElementById("imageGallery") ) { return false; };
	
	var preview = document.createElement("div");
	var imgPre = document.createElement("img");
	var pDescrip = document.createElement("p");
	var txtDescrip = document.createTextNode("Image Description.");
	preview.setAttribute("id", "preview0");
	imgPre.setAttribute("id", "imgPreview0");
	imgPre.setAttribute("src", "");
	imgPre.setAttribute("alt", "Image");
	pDescrip.setAttribute("id", "imgDescrip0");
	pDescrip.appendChild(txtDescrip);

	preview.appendChild(pDescrip);	
	preview.appendChild(imgPre);
	
	var links = document.getElementById("imageGallery");
	myInsertAfter(preview, links);
	
	prepareGallery();
};

addOnLoadEvent(highlightPage);
addOnLoadEvent(prepareSlideshow);
addOnLoadEvent(prepareInternalnav);

addOnLoadEvent(addPreview);

//表格单双不同设置
function stripeTable(){
	if (!document.getElementsByTagName) { return false; };
	var tables = document.getElementsByTagName("table");
	
	for (var i=0; i<tables.length; i++) {
		var odd = false;
		var rows =tables[i].getElementsByTagName("tr");
		for (var j=0; j<rows.length; j++) {
			if (odd == true){
				addClass(rows[j], "odd");
				odd = false;
			}else{
				odd = true;
			};
		};
	};
};

function highlightRows(){
	if (!document.getElementsByTagName) { return false; };
	var rows = document.getElementsByTagName("tr");
	for (var i=0; i<rows.length; i++) {
		rows[i].oldClassName = rows[i].className;
		rows[i].onmouseover = function(){
			addClass(this, "highlight");
		};
		rows[i].onmouseout = function(){
			this.className = this.oldClassName;
		};
	};
};

function displayAbbreviations(){
	if (!document.getElementsByName || !document.createElement || 
		!document.createTextNode) { return false; };
	var abbrs = document.getElementsByTagName("abbr");
	if (abbrs.length < 1) { return false; };
	var defs = new Array();
	for (var i=0;i<abbrs.length; i++) {
		var current_abbr = abbrs[i];
		if (current_abbr.childNodes.length <1 ) { continue; };
		var definition = current_abbr.getAttribute("title");
		var key0 = current_abbr.lastChild.nodeValue;
		defs[key0] = definition;
	};
	
	var dlist = document.createElement("dl");
	for (key0 in defs) {
		var definition = defs[key0];
		var dtitle = document.createElement("dt");
		var dtitle_txt = document.createTextNode(key0);
		dtitle.appendChild(dtitle_txt);
		
		var ddesc = document.createElement("dd");
		var ddesc_txt = document.createTextNode(definition);
		ddesc.appendChild(ddesc_txt);
		
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	};
	
	if (dlist.childNodes.length < 1) {  return false; };
	var header = document.createElement("h3");
	var header_txt = document.createTextNode("Abbreviations");
	header.appendChild(header_txt);
	
	var articles = document.getElementsByTagName("article");
	if (articles.length  == 0 ) { return false; };
	
	var container = articles[0];
	container.appendChild(header);
	container.appendChild(dlist);
};


addOnLoadEvent(stripeTable);
addOnLoadEvent(highlightRows);
addOnLoadEvent(displayAbbreviations);

//for Contact.html
function focusLabels(){
	if (!document.getElementById) { return true; };
	if (!document.getElementsByTagName) { return false; };
	
	var labels = document.getElementsByTagName("label");
	
	for (var i=0; i<labels.length; i++) {
		if (!labels[i].getAttribute("for")) { continue; };
		labels[i].onclick = function(){
			var id = this.getAttribute("for");
			var ele = document.getElementById(id);
			ele.focus();
		};
	};
};

addOnLoadEvent(focusLabels);

