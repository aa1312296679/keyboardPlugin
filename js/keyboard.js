(function ($) {
    /**
     * 定义keyboard插件的构造函数
     * @element 调用该插件的HTML元素
     * @options 插件配置
     * @options.Ip 跨域提交的提交地址
     * @options.success 跨域提交的请求成功处理函数
     * @options.error 跨域提交的请求失败处理函数
     */
    function keyboardPlugin($element, options) {
        // 创建keyboard元素
        var $keyboard=$('<section id="keyboard" class="keyboard"></section>');
        $keyboard.html(" <!--密码框-->\n" +
            "        <div class=\"password\">\n" +
            "            <div class=\"password_tit\">\n" +
            "                <p>输入支付密码，确认身份</p>\n" +
            "            </div>\n" +
            "            <!--首次输入密码的密码框-->\n" +
            "            <div class=\"password_num\" id=\"Scpassword\">\n" +
            "                <ul>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                </ul>\n" +
            "            </div>\n" +
            "            <!--重复输入密码的密码框-->\n" +
            "            <div class=\"password_num\" id=\"Truepassword\" style=\"display: none;\">\n" +
            "                <ul>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                    <li></li>\n" +
            "                </ul>\n" +
            "            </div>\n" +
            "            <!--密码提示信息-->\n" +
            "            <div class=\"password_hint\">\n" +
            "                <p style=\"display: none\" id=\"pwd_infor\">4位密码和登录密码无关,用于解锁报表页面</p>\n" +
            "                <a href=\"#\">找回密码</a>\n" +
            "            </div>\n" +
            "            <i id=\"closeBtn\" class=\"iconfont closeBtn\">&#xe685;</i>\n" +
            "        </div>\n" +
            "        <!-- 键盘按钮 -->\n" +
            "        <div class=\"passub\">\n" +
            "            <div class=\"passub_num\">\n" +
            "                <ul>\n" +
            "                    <li class=\"subnum\" name=\"1\">1</li>\n" +
            "                    <li class=\"subnum\" name=\"2\">2</li>\n" +
            "                    <li class=\"subnum\" name=\"3\">3</li>\n" +
            "                    <li class=\"subnum\" name=\"4\">4</li>\n" +
            "                    <li class=\"subnum\" name=\"5\">5</li>\n" +
            "                    <li class=\"subnum\" name=\"6\">6</li>\n" +
            "                    <li class=\"subnum\" name=\"7\">7</li>\n" +
            "                    <li class=\"subnum\" name=\"8\">8</li>\n" +
            "                    <li class=\"subnum\" name=\"9\">9</li>\n" +
            "                    <li class=\"botcre\"></li>\n" +
            "                    <li class=\"subnum\" name=\"0\">0</li>\n" +
            "                    <li class=\"botcre del_subnum\" id=\"delcre\">\n" +
            "                        <img src=\"image/delete_btn.png\" />\n" +
            "                    </li>\n" +
            "                </ul>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <!-- 键盘按钮 结束-->");

        //将keyboard元素添加在按钮元素之后
        $element.after($keyboard);

        // 输入的密码的密码索引
        var pdIndex = 0;
        // 初次输入的所有密码
        var numArr = new Array();
        // 密码总数
        var pwdMax=6;
        //隐藏虚拟键盘
        $keyboard.hide();
        //设置虚拟键盘的支付按钮的点击事件
        $(".passub_num ul li.subnum").click(subnumClick)

        /**
         * 密码输入点击处理
         * */
        function subnumClick(){
            // 当前用户所输入的数字
            var index = $(this).attr("name");

            // 如果当前重复输入的密码的位数小于密码最大总数
            if(pdIndex<pwdMax){
                // 将当前重复输入的密码数字存入重复密码集合
                numArr.push(index);
                // 显示当前的密码所对应的密码框的密码视图
                $("#Scpassword ul li").eq(pdIndex).text('*');


                $("#Scpassword ul li").eq(pdIndex);
                if(pdIndex==pwdMax-1){
                    console.log(pdIndex);

                    // 将输入的所有密码拼接为字符串
                    var strNum = numArr.join(",");
                    //向后台发送密码进行验证
                    console.log('ajax提交密码');


                    console.log(options.ip);
                    options.success();
                    options.error();

                    //重置当前所输密码的密码索引
                    pdIndex=-1;
                    // 清空密码集合中的所有密码信息
                    numArr.splice(0,numArr.length);
                    //情况密码视图
                    $("#Scpassword ul li").each(function () {
                        $(this).text("");
                    })
                }
                // 递增重复输入的密码的密码位数
                pdIndex++;
            }else{
                return;
            }

        }


        /**
         * 设置数字按钮的鼠标按下和释放的事件处理
         */
        $(".subnum").on("mousedown",function (e) {
            $(e.target).addClass("active")
        }).on("mouseup",function (e) {
            setTimeout(function () {
                $(e.target).removeClass("active")
            },100)
        });

        /**
         * 设置删除数字按钮的事件监听
          */
        $(".del_subnum").click(delClick).on("mousedown",function () {
            $(this).addClass("active")
        }).on("mouseup",function () {
            var _self=this;
            setTimeout(function () {
                $(_self).removeClass("active")
            },100)
        });

        /**
         * 关闭虚拟键盘
         */
        $("#closeBtn").on("click",function () {
            $keyboard.hide();
        });

        /**
         * 显示虚拟键盘
         */
        $($element).on("click",function () {
            $keyboard.show();
        });

        /**
         *  数组类新增元素移除方法
         * @param obj 被删元素的元素索引
         */
        Array.prototype.remove=function(obj){
            // 删除当前数组对象中的指定元素
            this.splice(obj,1)
        }

        /**
         * 删除按钮监听处理
         */
        function delClick(){
            if(pdIndex==0){
                return;
            }
            // 根据当前所输密码的密码索引找到密码数字所对应的密码框并移除密码视图
            $("#Scpassword ul li").eq(pdIndex-1).text("");
            // 根据当前所输密码的密码位数删除密码集合中的指定索引的密码
            numArr.remove(pdIndex-1);
            // 对当前密码索引递减
            pdIndex--;
        }

    }

        /**
         * 1.创建keyboardPlugin插件的工厂函数
         * 2.将工厂函数挂载到jquery的fn中
         * fn为jq工厂函数获取的DOM元素
         * @param options 插件的配置
         */
        $.fn.extend({
            keyboardPlugin:function (options) {
                //创建swiperPlugin对象
                new keyboardPlugin(this, options)
            }
        })
})(jQuery);