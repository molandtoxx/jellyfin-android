﻿(function(){if(jQuery.widget){return;}
(function($,undefined){var uuid=0,slice=Array.prototype.slice,_cleanData=$.cleanData;$.cleanData=function(elems){for(var i=0,elem;(elem=elems[i])!=null;i++){try{$(elem).triggerHandler("remove");}catch(e){}}
_cleanData(elems);};$.widget=function(name,base,prototype){var fullName,existingConstructor,constructor,basePrototype,proxiedPrototype={},namespace=name.split(".")[0];name=name.split(".")[1];fullName=namespace+"-"+name;if(!prototype){prototype=base;base=$.Widget;}
$.expr[":"][fullName.toLowerCase()]=function(elem){return!!$.data(elem,fullName);};$[namespace]=$[namespace]||{};existingConstructor=$[namespace][name];constructor=$[namespace][name]=function(options,element){if(!this._createWidget){return new constructor(options,element);}
if(arguments.length){this._createWidget(options,element);}};$.extend(constructor,existingConstructor,{version:prototype.version,_proto:$.extend({},prototype),_childConstructors:[]});basePrototype=new base();basePrototype.options=$.widget.extend({},basePrototype.options);$.each(prototype,function(prop,value){if(!$.isFunction(value)){proxiedPrototype[prop]=value;return;}
proxiedPrototype[prop]=(function(){var _super=function(){return base.prototype[prop].apply(this,arguments);},_superApply=function(args){return base.prototype[prop].apply(this,args);};return function(){var __super=this._super,__superApply=this._superApply,returnValue;this._super=_super;this._superApply=_superApply;returnValue=value.apply(this,arguments);this._super=__super;this._superApply=__superApply;return returnValue;};})();});constructor.prototype=$.widget.extend(basePrototype,{widgetEventPrefix:existingConstructor?(basePrototype.widgetEventPrefix||name):name},proxiedPrototype,{constructor:constructor,namespace:namespace,widgetName:name,widgetFullName:fullName});if(existingConstructor){$.each(existingConstructor._childConstructors,function(i,child){var childPrototype=child.prototype;$.widget(childPrototype.namespace+"."+childPrototype.widgetName,constructor,child._proto);});delete existingConstructor._childConstructors;}else{base._childConstructors.push(constructor);}
$.widget.bridge(name,constructor);return constructor;};$.widget.extend=function(target){var input=slice.call(arguments,1),inputIndex=0,inputLength=input.length,key,value;for(;inputIndex<inputLength;inputIndex++){for(key in input[inputIndex]){value=input[inputIndex][key];if(input[inputIndex].hasOwnProperty(key)&&value!==undefined){if($.isPlainObject(value)){target[key]=$.isPlainObject(target[key])?$.widget.extend({},target[key],value):$.widget.extend({},value);}else{target[key]=value;}}}}
return target;};$.widget.bridge=function(name,object){var fullName=object.prototype.widgetFullName||name;$.fn[name]=function(options){var isMethodCall=typeof options==="string",args=slice.call(arguments,1),returnValue=this;options=!isMethodCall&&args.length?$.widget.extend.apply(null,[options].concat(args)):options;if(isMethodCall){this.each(function(){var methodValue,instance=$.data(this,fullName);if(options==="instance"){returnValue=instance;return false;}
if(!instance){return $.error("cannot call methods on "+name+" prior to initialization; "+"attempted to call method '"+options+"'");}
if(!$.isFunction(instance[options])||options.charAt(0)==="_"){return $.error("no such method '"+options+"' for "+name+" widget instance");}
methodValue=instance[options].apply(instance,args);if(methodValue!==instance&&methodValue!==undefined){returnValue=methodValue&&methodValue.jquery?returnValue.pushStack(methodValue.get()):methodValue;return false;}});}else{this.each(function(){var instance=$.data(this,fullName);if(instance){instance.option(options||{})._init();}else{$.data(this,fullName,new object(options,this));}});}
return returnValue;};};$.Widget=function(){};$.Widget._childConstructors=[];$.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",defaultElement:"<div>",options:{disabled:false,create:null},_createWidget:function(options,element){element=$(element||this.defaultElement||this)[0];this.element=$(element);this.uuid=uuid++;this.eventNamespace="."+this.widgetName+this.uuid;this.options=$.widget.extend({},this.options,this._getCreateOptions(),options);this.bindings=$();this.hoverable=$();this.focusable=$();if(element!==this){$.data(element,this.widgetFullName,this);this._on(true,this.element,{remove:function(event){if(event.target===element){this.destroy();}}});this.document=$(element.style?element.ownerDocument:element.document||element);this.window=$(this.document[0].defaultView||this.document[0].parentWindow);}
this._create();this._trigger("create",null,this._getCreateEventData());this._init();},_getCreateOptions:$.noop,_getCreateEventData:$.noop,_create:$.noop,_init:$.noop,destroy:function(){this._destroy();this.element.unbind(this.eventNamespace).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName));this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName+"-disabled "+"ui-state-disabled");this.bindings.unbind(this.eventNamespace);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus");},_destroy:$.noop,widget:function(){return this.element;},option:function(key,value){var options=key,parts,curOption,i;if(arguments.length===0){return $.widget.extend({},this.options);}
if(typeof key==="string"){options={};parts=key.split(".");key=parts.shift();if(parts.length){curOption=options[key]=$.widget.extend({},this.options[key]);for(i=0;i<parts.length-1;i++){curOption[parts[i]]=curOption[parts[i]]||{};curOption=curOption[parts[i]];}
key=parts.pop();if(value===undefined){return curOption[key]===undefined?null:curOption[key];}
curOption[key]=value;}else{if(value===undefined){return this.options[key]===undefined?null:this.options[key];}
options[key]=value;}}
this._setOptions(options);return this;},_setOptions:function(options){var key;for(key in options){this._setOption(key,options[key]);}
return this;},_setOption:function(key,value){this.options[key]=value;if(key==="disabled"){this.widget().toggleClass(this.widgetFullName+"-disabled",!!value);this.hoverable.removeClass("ui-state-hover");this.focusable.removeClass("ui-state-focus");}
return this;},enable:function(){return this._setOptions({disabled:false});},disable:function(){return this._setOptions({disabled:true});},_on:function(suppressDisabledCheck,element,handlers){var delegateElement,instance=this;if(typeof suppressDisabledCheck!=="boolean"){handlers=element;element=suppressDisabledCheck;suppressDisabledCheck=false;}
if(!handlers){handlers=element;element=this.element;delegateElement=this.widget();}else{element=delegateElement=$(element);this.bindings=this.bindings.add(element);}
$.each(handlers,function(event,handler){function handlerProxy(){if(!suppressDisabledCheck&&(instance.options.disabled===true||$(this).hasClass("ui-state-disabled"))){return;}
return(typeof handler==="string"?instance[handler]:handler).apply(instance,arguments);}
if(typeof handler!=="string"){handlerProxy.guid=handler.guid=handler.guid||handlerProxy.guid||$.guid++;}
var match=event.match(/^(\w+)\s*(.*)$/),eventName=match[1]+instance.eventNamespace,selector=match[2];if(selector){delegateElement.delegate(selector,eventName,handlerProxy);}else{element.bind(eventName,handlerProxy);}});},_off:function(element,eventName){eventName=(eventName||"").split(" ").join(this.eventNamespace+" ")+this.eventNamespace;element.unbind(eventName).undelegate(eventName);},_trigger:function(type,event,data){var prop,orig,callback=this.options[type];data=data||{};event=$.Event(event);event.type=(type===this.widgetEventPrefix?type:this.widgetEventPrefix+type).toLowerCase();event.target=this.element[0];orig=event.originalEvent;if(orig){for(prop in orig){if(!(prop in event)){event[prop]=orig[prop];}}}
this.element[0].dispatchEvent(new CustomEvent(event.type,{bubbles:true,detail:{data:data,originalEvent:event}}));return!($.isFunction(callback)&&callback.apply(this.element[0],[event].concat(data))===false||event.isDefaultPrevented());}};})(jQuery);(function($,undefined){$.extend($.Widget.prototype,{_getCreateOptions:function(){var option,value,elem=this.element[0],options={};if(!this.element.data("defaults")){for(option in this.options){value=this.element.data(option);if(value!=null){options[option]=value;}}}
return options;}});})(jQuery);(function($,undefined){var originalWidget=$.widget
$.widget=(function(orig){return function(){var constructor=orig.apply(this,arguments),name=constructor.prototype.widgetName;constructor.initSelector=((constructor.prototype.initSelector!==undefined)?constructor.prototype.initSelector:"*[data-role='"+name+"']:not([data-role='none'])");$.mobile.widgets[name]=constructor;return constructor;};})($.widget);$.extend($.widget,originalWidget);})(jQuery);})();(function($,window,undefined){var rbrace=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/;$.extend($.mobile,{getAttribute:function(element,key){var data;element=element.jquery?element[0]:element;if(element&&element.getAttribute){data=element.getAttribute("data-"+key);}
try{data=data==="true"?true:data==="false"?false:data==="null"?null:+data+""===data?+data:rbrace.test(data)?JSON.parse(data):data;}catch(err){}
return data;}});})(jQuery,this);(function($,undefined){$.widget("mobile.table",{options:{enhanced:false},_create:function(){if(!this.options.enhanced){this.element.addClass("ui-table");}
$.extend(this,{headers:undefined,allHeaders:undefined});this._refresh(true);},_setHeaders:function(){var trs=this.element.find("thead tr");this.headers=this.element.find("tr:eq(0)").children();this.allHeaders=this.headers.add(trs.children());},refresh:function(){this._refresh();},rebuild:$.noop,_refresh:function(){var table=this.element,trs=table.find("thead tr");this._setHeaders();trs.each(function(){var columnCount=0;$(this).children().each(function(){var span=parseInt(this.getAttribute("colspan"),10),selector=":nth-child("+(columnCount+1)+")",j;this.setAttribute("data-colstart",columnCount+1);if(span){for(j=0;j<span-1;j++){columnCount++;selector+=", :nth-child("+(columnCount+1)+")";}}
$(this).data("cells",table.find("tr").not(trs.eq(0)).not(this).children(selector));columnCount++;});});}});})(jQuery);(function($,undefined){$.widget("mobile.table",$.mobile.table,{options:{mode:"reflow"},_create:function(){this._super();if(this.options.mode!=="reflow"){return;}
if(!this.options.enhanced){this.element.addClass("ui-table-reflow");this._updateReflow();}},rebuild:function(){this._super();if(this.options.mode==="reflow"){this._refresh(false);}},_refresh:function(create){this._super(create);if(!create&&this.options.mode==="reflow"){this._updateReflow();}},_updateReflow:function(){var table=this,opts=this.options;$(table.allHeaders.get().reverse()).each(function(){var cells=$(this).data("cells"),colstart=$.mobile.getAttribute(this,"colstart"),hierarchyClass=cells.not(this).filter("thead th").length&&" ui-table-cell-label-top",contents=$(this).clone().contents(),iteration,filter;if(contents.length>0){if(hierarchyClass){iteration=parseInt(this.getAttribute("colspan"),10);filter="";if(iteration){filter="td:nth-child("+iteration+"n + "+(colstart)+")";}
table._addLabels(cells.filter(filter),"ui-table-cell-label"+hierarchyClass,contents);}else{table._addLabels(cells,"ui-table-cell-label",contents);}}});},_addLabels:function(cells,label,contents){if(contents.length===1&&contents[0].nodeName.toLowerCase()==="abbr"){contents=contents.eq(0).attr("title");}
cells.not(":has(b."+label+")").prepend($("<b class='"+label+"'></b>").append(contents));}});})(jQuery);