!function(n,i){n.layui,layui.define&&layui.define(["layer"],function(n){n("command",function(e){"use strict";layui.$;var e=layui.layer;return{logout:function(){e.msg("你退出了")},Error:function(n,i){e.open({title:n,skin:"vispa-layer-error",content:i.join("<br>"),btn:!1,shade:.05,shadeClose:!0,closeBtn:!1,offset:"30px",anim:6})}}}(layui.layer))})}(this);