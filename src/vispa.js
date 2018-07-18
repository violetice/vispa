/**
 * Vispa 启动引擎
 * 
 * @author Violet_Ice紫冰 <violetice@aliyun.com>
 * @start 2018-7-8 13:54:23
 * @end 
 * @see https://www.vlice.cn
 */

(function (root, factroy) {
    if (typeof root.layui && layui.define) {
        layui.extend({ setter: '../config' }).define(['jquery', 'setter', 'view'], function (mods) {
            mods('vispa', factroy(layui.jquery, layui.setter, layui.view));
        });
    } else {
        throw new ReferenceError('找不到layui，请检查layui是否存在');
    }
}(this, function ($, config, view) {
    "use strict";

    var header = config.header;     // 全局header头

    // 全局ajax添加头
    $(document).ajaxSend(function (el, xhr) {
        // 检查头部
        if (typeof header !== 'object' || header.constructor !== Object) throw new TypeError('config.header类型错误，需要的是Object');

        for (var i in header) {
            xhr.setRequestHeader(i, header[i]);
        }
    });

    // 内部css加载器
    function addcss(path){
        layui.link(layui.cache.base + path + '.css?v=' + layui.cache.version);
    }

    // 引入css文件
    addcss('css/vispa-layout');
    addcss('css/vispa-icon');

    // 载入layout布局
    view.init();

    return {
        addcss:addcss,
        v: '1.0.0'
    };
}));