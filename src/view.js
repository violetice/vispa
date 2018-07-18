/**
 * Vispa 视图管理器
 * 
 * @author Viovar_Ice紫冰 <viovarice@aliyun.com>
 * @start 2018-7-15 16:23:46
 * @end 
 * @see https://www.vlice.cn
 */

(function (root, factroy) {
    typeof root.layui && layui.define ? layui.define(['layer', 'command', 'laytpl', 'element'], function (mods) {
        mods('view', factroy(layui.layer, layui.command, layui.laytpl, layui.element));
    }) : null;
}(this, function (layer, command, laytpl, element) {
    "use strict";

    var $ = layui.$,
        config = layui.setter,
        vispa = layui.vispa;


    // 对外接口
    var view = {};
    // 内部方法
    var func = {};

    // +===============
    // | view模块
    // +===============

    /**
     * 视图初始化
     */
    view.init = function () {
        func.color();
        view.req({
            url: config.view + '/layout.html',
            type: 'get',
            dataType: 'html',
            success: function (layout) {
                // 请求导航栏
                view.req({
                    url:layui.cache.base+'nav.json',
                    type:'get',
                    done:function(res){
                        laytpl(layout).render({config:config,nav:res.data}, function (html) {
                            $('.vispa-app').html(html);
                            element.render('nav', 'vispa-nav');
                            $('.vispa-nav-phone span.layui-nav-more').remove();
                        });
                    }
                });
            }
        });
    };

    /**
     * 封装ajax请求
     * @param {object} opt ajax请求参数
     */
    view.req = function (opt) {
        // 检查url
        if(typeof opt.url === 'string'){
            opt.url += '?v='+layui.cache.version;
        }else{
            throw TypeError('opt.url类型错误');
        }

        var req = config.req;
        if (typeof opt !== 'object') {
            throw new TypeError('opt参数必须是对象');
        } else {
            if (opt.constructor === Array) throw new TypeError('opt参数不能是数组');
        }

        if (typeof opt.error === 'function') {
            var error = opt.error;
            delete opt.error;
        }


        $.ajax($.extend({
            type: 'post',
            dataType: 'json',
            success: function (res) {
                // 正确
                if (res[req.code] === req.ok) {
                    typeof opt.done === 'function' && opt.done(res);
                }

                // 退出
                else if (res[req.code] === req.logout) {
                    command.logout();
                }

                // 其他错误码
                else if (/^\d+$/.test(res[req.code])) {
                    typeof opt.err === 'function' && opt.err(res);
                }

                // 没有code
                else {
                    var call = function () {
                        command.Error('VispaError', [
                            'Code：undefined',
                            'Error：code值不存在'
                        ])
                        throw Error('opt.success不存在，并且没有code值');
                    };
                    typeof opt.success === 'function' ? opt.success(res) : call();
                }
            },
            error: function (xhr) {
                error ? error(xhr) : command.Error('ajaxError', [
                    'Code：' + xhr.status,
                    'Error：' + xhr.statusText
                ]);
            }
        }, opt));
    };

    /**
     * url生成器
     * @param {string} pathinfo Vispa视图路由
     */
    view.url = function (pathinfo) {
        var arr = $.extend({
            vi: pathinfo
        }, config.url_param);

        var url = [];
        for (var i in arr) {
            url.push(i + '=' + arr[i]);
        }

        return location.origin + location.pathname + '?' + url.join('&');
    };



    // +===============
    // | func模块
    // +===============
    func.color = function () {
        var nav_color = config.nav_color, color = [];

        // 颜色缩写
        if (/^\#[\da-z]{3}$/i.test(nav_color[1])) {
            var arr = nav_color[1].substr(1, 3).split('');
            for (var i = 0, item; item = arr[i]; i++) {
                color.push(item + item);
            }
        }

        // 正常颜色
        else if (/^\#[\da-z]{6}$/i.test(nav_color[1])) {
            var arr = nav_color[1].substr(1, 6).split('');
            var j = 0;
            for (var i = 0, item; item = arr[i++];) {
                color.push(item + arr[i++]);
            }
        }

        // 非正常颜色
        else {
            throw new Error('导航栏字体颜色异常，请检查config.js是否正确配置');
        }

        // 计算rgba
        var rgba = [];
        for (var i = 0, item; item = color[i++];) {
            rgba.push(parseInt(item, 16));
        }
        rgba.push(0.8);

        config.nav_color.push('rgba(' + rgba.join(',') + ')');
    };

    return view;
}));