!function(e,i){if(e.layui,!layui.define)throw new ReferenceError("找不到layui，请检查layui是否存在");layui.extend({setter:"../config"}).define(["jquery","setter","view"],function(e){e("vispa",function(e,i,r){"use strict";var t=i.header;function a(e){layui.link(layui.cache.base+e+".css?v="+layui.cache.version)}return e(document).ajaxSend(function(e,i){if("object"!=typeof t||t.constructor!==Object)throw new TypeError("config.header类型错误，需要的是Array");for(var r in t)i.setRequestHeader(r,t[r])}),a("css/vispa-layout"),a("css/vispa-icon"),r.init(),{addcss:a,v:"1.0.0"}}(layui.jquery,layui.setter,layui.view))})}(this);