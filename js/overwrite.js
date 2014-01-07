function addloadevent(func){
	var oldonload=window.onload;
	if(typeof window.onload!='function'){
		window.onload=func;
	}
	else{
		window.onload=function(){
			oldonload();
			func();
		}
	}
}
function addEvent(elem,action,handler){
    return elem.addEventListener(action,handler,false);
}
function delEvent(elem,action,handler){
    return elem.removeEventListener(action,handler,false);
}
function getId(elem){
	return document.getElementById(elem);
}
function getTag(elem){
	return document.getElementsByTagName(elem);
}
function getClass(elem){
    //return document.getElementsByClassName(elem);有bug
    var c='.'+elem;
    return document.querySelectorAll(c);
}
function obj_getTag(obj,elem){
	return obj.getElementsByTagName(elem);
}
function getStyle(elem,name){
	if(elem.style[name]){
		return elem.style[name];
	}
	else if(elem.currentStyle[name]){
		return elem.currentStyle[name];
	}
}
function setStyle(elem,name,value){
    elem.style[name] = value;
}
function hide(elem){
    elem.style.display = 'none';
}
function show(elem){
    elem.style.display = 'block';
}
function fullHeight(elem){
	if(getStyle(elem,'display')!="none"){
		return elem.offsetHeight||parseInt(getStyle(elem,'height'));
	}
	var h=elem.clientHeight||parseInt(getStyle(elem,'height'));
	return h;
}
function setOpacity(elem,level){
	if(elem.filters){
		elem.style.filters='alpha(opacity=' +level+ ')';
	}
	else{
		elem.style.opacity=level/100;
	}
}
function scrollTop(){
	if(document.documentElement.scrollTop){
		return document.documentElement.scrollTop;
	}
	if(document.body.scrollTop){
		return document.body.scrollTop;
	}
	else{
		 return window.pageYOffset;
	}
}
document.getElementsByClassName = function(){
	var tTagName ="*";
	if(arguments.length > 1){
	   tTagName = arguments[1];
	}
	if(arguments.length > 2){
	   var pObj = arguments[2]
	}
	else{
	   var pObj = document;
	}
	var objArr = pObj.getElementsByTagName(tTagName);
	var tRObj = new Array();
	for(var i=0; i<objArr.length; i++){
	   if(objArr[i].className == arguments[0]){
		tRObj.push(objArr[i]);
	   }
	}
	return tRObj;
}
function getChildNodes(){
      var node = new Array();
      if(arguments.length == 1 ){    //1.判断参数个数
            var temp = document.getElementById(arguments[0]).childNodes;     //2.获取ul下所有子节点（包括text节点、空格）
            for(var i=0;i<temp.length;i++){   
                  if(temp.nodeType == 1 && temp.tagName){    //3.判断节点类型
                         node.push(temp);    //4.节点压栈
                    }   
             }
            return node;     //5.返回节点列表（类似数组）
       }
       else if(arguments.length == 2){       //1.判断参数个数
            return document.getElementById(arguments[0]).getElementsByTagName(arguments[1]);    //2.返回节点列表（类似数组）
        }
}