function isPlaceholder(){
	var input0 = document.createElement('input');
	var body0 = document.getElementsByTagName('body')[0];
	body0.appendChild(input0);
    if('placeholder' in input0.style) {
    	body0.removeChild(input0);
    	return true;
    }else{
    	body0.removeChild(input0);
    	return false;
    };
};

function resetFields(tForm){
	if (isPlaceholder()) return false;
	for (var i=0; i< tForm.elements.length; i++) {
		var ele = tForm.elements[i];
		if (ele.type == "submit") { continue; };
		
		var check = ele.placeholder || ele.getAttribute("placeholder");
		if (!check) { continue; };
		
		ele.onfocus = function(){
			var txt = this.placeholder || this.getAttribute("placeholder");
			if (this.value == txt) {
				this.className = '';
				this.value = "";
			};
		};
		ele.onblur = function(){
			if (this.value == "") {
				this.className = "placeholder";
				this.value = this.placeholder || this.getAttribute("placeholder");
			};
		};
		ele.onblur();
	};
};


//输入是否为空
function isFill(tField){
	if (tField.value.replace(' ', '').length == 0 ) { return false; };
	var placeholder = tField.placeholder || tField.getAttribute("placeholder");
	return (tField.value != placeholder);
};

//输入是否为 邮箱
function isEmail(tField){
	return (tField.value.indexOf("@") != -1  
	     && tField.value.indexOf(".") != -1 );
};

function validateForm(tForm){
	for (var i=0; i<tForm.elements.length; i++){
		var ele = tForm.elements[i];
		console.log(ele.required);
//		if (ele.required == "required") {
		if (ele.required == true) {
			if ( !isFill(ele) ) {
				alert("Please fill in " + ele.name + ".");
				return false;
			};
		};
		if (ele.type == "email") {
			if ( !isEmail(ele) ) {
				alert("The " + ele.value + " not avlid email address.");
				return false;
			};
		};
	};
	return true;
};


function prepareForms(){
	for (var i=0; i<document.forms.length; i++) {
		var tForm = document.forms[i];
		resetFields(tForm);
		tForm.onsubmit = function(){
			if (!validateForm(this)) { return false; };
			var article = document.getElementsByTagName("article")[0];
			if (submitFromWithAjax(this, article)) {return false;};
			return true;
		};
	};
};

addOnLoadEvent(prepareForms);

function displayAjaxLoading(ele){
	while ( ele.hasChildNodes() ) {
		ele.removeChild(ele.lastChild);
	};
	var content = document.createElement("div");
	content.setAttribute("id", "loading");
	content.setAttribute("background-image", "url(../img/photos/1.jpg)");
	var img = document.createElement("img");
	img.setAttribute("src", "img/photos/1.jpg");
	img.setAttribute("alt", "Loading...");
	content.appendChild(img);
	ele.appendChild(content);
};

function submitFromWithAjax(tagForm, tagEle){
	var request = getHTTPObject();
	if ( !request ) { return false; };
	displayAjaxLoading(tagEle);
	
	var datas = [];
	var ele;
	for (var i=0; i<tagForm.elements.length; i++) {
		ele = tagForm.elements[i];
		datas[i] = ele.name + "=" + encodeURIComponent(ele.value);
	};
	
	var data = datas.join('&');
	//向表单 action（指定处理函数） 发送post请求
	request.open("POST", tagForm.getAttribute("action"), true);
	//在请求中添加 application/x-www-form-yrlencoded 头部 
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	
	request.onreadystatechange = function(){
		if (request.readyState == 4) {
			if (request.status == 200 || request.status ==0 ){
				var matches = request.responseText.match( /<article>([\s\S]+)<\/article>/ );
				console.log(matches);
				if (matches.length > 0) {
					tagEle.innerHTML = matches[1];
				}else{
					tagEle.innerHTML = "<p>Ooops, there were some errors.</p>"
				};
			}else{
				tagEle.innerHTML = "<p>" + request.statusText + "</p>";
			};
		};
	};
	
	request.send(data);
	return true;
};
