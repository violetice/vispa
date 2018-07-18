/**
 * Vispa 全局指令文件
 * 
 * @author Violet_Ice紫冰 <violetice@aliyun.com>
 * @start 2018-7-15 15:03:28
 * @end 
 * @see https://www.vlice.cn
 */

(function (root, factroy) {
    typeof root.layui && layui.define ? layui.define(['layer'], function (mods) {
        mods('command', factroy(layui.layer));
    }) : null;
}(this, function (layer) {
    "use strict";

    var $ = layui.$,
        layer = layui.layer;

    return {
        /**
         * 退出
         */
        logout: function () {
            layer.msg('你退出了');
        },

        /**
         * Error模板
         */
        Error: function (title, contentArray) {
            layer.open({
                title: title,
                skin: 'vispa-layer-error',
                content: contentArray.join('<br>'),
                btn: false,
                shade: 0.05,
                shadeClose: true,
                closeBtn: false,
                offset: '30px',
                anim: 6,
            });
        }
    };
}));