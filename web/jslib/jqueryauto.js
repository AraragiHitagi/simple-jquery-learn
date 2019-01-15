var highlightindex = -1;
$(document).ready(function () {
    var wordInput = $("#word");
    var wordInputOffset = wordInput.offset();
    $("#auto").hide().css("border","1px black solid").css("position","absolute")
        .css("top",wordInputOffset.top + wordInput.height() + 5 + "px")
        .css("left",wordInputOffset.left + "px").width(wordInput.width() + 2);

    //按钮事件
    $("#word").keyup(function (event) {
        //处理文本框中的键盘事件
        var myEvent = event || window.event;
        var keyCode = myEvent.keyCode;
        //如果输入的是字母，应该将文本框中最新的信息发送给服务器
        //如果输入的是退格键或删除键，也应该将文本框中的最新信息发送给服务器
        if (keyCode >= 65 && keyCode <= 90 || keyCode == 8 || keyCode == 46) {
            //得到文本框的值
            var wordText = $("#word").val();
            var autoNode = $("#auto");
            //文本框不为空才调用servlet
            if(wordText != ""){
                //延时查询
                var timeout = setTimeout(function () {
                    //调用servlet
                    $.get("AutoComplete",wordText,function (data) {
                        //获得返回页面的word标签节点集合
                        var jqueryObj = $(data);
                        var wordNodes = jqueryObj.find("word");
                        //将xml中的内容全部添加入autoNode
                        //清空原来内容 刷新 添加
                        autoNode.html("");
                        wordNodes.each(function () {
                            var wordNode = $(this);
                            $("<div>").html(wordNode.text()).appendTo(autoNode);
                        });

                        //显示提示框
                        if (wordNodes.length>0){
                            autoNode.show();
                        } else {
                            autoNode.hide();
                            highlightindex = -1
                        }
                    },"xml");
                },500);

            } else {
                autoNode.html("");
                autoNode.hide();
            }

        } else if(keyCode == 38 || keyCode == 40) {
            //上下键的高亮键
            //如果输入的是向上38向下40按键
            if (keyCode == 38) {
                //向上
                var autoNodes = $("#auto").children("div");
                if (highlightindex != -1) {
                    //如果原来存在高亮节点，则将背景色改称白色
                    autoNodes.eq(highlightindex).css("background-color", "white");
                } else {
                    //若初始等于-1时，先指向最后一个
                    highlightindex = autoNodes.length - 1;
                }
                highlightindex--; //关键
                if (highlightindex == -1) {
                    //如果修改索引值以后index变成-1，则将索引值指向最后一个元素
                    highlightindex = autoNodes.length - 1;
                }
                //让现在高亮的内容变成红色
                autoNodes.eq(highlightindex).css("background-color", "red");
            }
            if (keyCode == 40) {
                //向下
                var autoNodes = $("#auto").children("div");
                if (highlightindex != -1) {
                    //如果原来存在高亮节点，则将背景色改称白色
                    autoNodes.eq(highlightindex).css("background-color", "white");
                }
                highlightindex++;  //关键
                if (highlightindex == autoNodes.length) {
                    //如果修改索引值以后index变成-1，则将索引值指向最后一个元素
                    highlightindex = 0;
                }
                //让现在高亮的内容变成红色
                autoNodes.eq(highlightindex).css("background-color", "red");
            }
        } else if (keyCode == 13) {
            //如果输入的是回车
            //下拉框有高亮内容
            if (highlightindex != -1) {
                //取出高亮节点的文本内容
                var comText = $("#auto").hide().children("div").eq(highlightindex).text();
                highlightindex = -1;
                //文本框中的内容变成高亮节点的内容
                $("#word").val(comText);
            } else {
                //下拉框没有高亮内容
                alert("文本框中的[" + $("#word").val() + "]被提交了");
                $("#auto").hide();
                $("#word").get().blur();
            }
        }

    });

    $("input[type='button']").click(function () {
       alert("文本框中的["+$("#word").val()+"]被提交了！")
    });
});