/**
 * Vispa 配置文件
 * 
 * @author Violet_Ice紫冰 <violetice@aliyun.com>
 * @start 2018-7-8 14:58:58
 * @end 
 * @see https://www.vlice.cn
 */

(function (root, factroy) {
    typeof root.layui && layui.define ? layui.define(function (mods) {
        mods('setter', factroy());
    }) : null;
}(this, function () {
    "use strict";

    var $ = layui.$;
    return {
        /**
         * 文字logo，可以直接修改layout.html换成图片logo
         */
        text_logo: 'Violet_Ice紫冰',

        /**
         * 视图前置路径 可以使用url
         * 
         * 例：http://xxx.com/vispa
         * (必填)
         */
        view: layui.cache.base + 'view',

        /**
         * url原始参数 PATH_INFO模式留空即可
         * 
         * 例：xxx.com/?m=index&c=vispa&a=index
         * urlfix:{m:'index',c:'vispa',a:'index'}
         * (选填)
         */
        url_param: {},

        /**
         * 是否自定义模板配色
         * true则下方三项必填 false可以删除下方三项，填了也没用
         * (必填)
         */
        vispa_style: false,

        /**
         * 导航栏的配色 1背景色 2字体色 3游标色 字体色必须16进制，且不支持透明通道
         * 字体色会自动加入透明通道，以此区分是否选中
         */
        nav_color: ['#3d6aff', '#fff', '#fff'],

        /**
         * Error弹窗模板配色(任意色制) 1标题背景色 2标题字体色
         */
        error_color: ['#3d6aff', '#fff'],

        /**
         * 全局背景色(任意色制)
         */
        body_color: '#fafafa',

        /**
         * hreader头 根据后台业务配置
         * 
         * 例：{'X-CSRF-TOKEN':'xxxxxxxxxxxxx'}
         * (选填)
         */
        header: {
            'X-CSRF-TOKEN': $('meta[name="csrf"]').attr('content'),
        },

        /**
         * ajax请求设置
         * (必填)
         */
        req: {
            code: 'code',
            ok: 0,
            logout: 1001
        },

        /**
         * 导航获取路径
         * (必填)
         */
        nav_url: layui.cache.base + 'menu.json',
    };
}));