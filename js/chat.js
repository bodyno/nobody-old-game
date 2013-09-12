/// <reference path="jquery-1.5.1.min.js" />
var chatjson = {
    "data": [
            //{ "chattype": 2, "vip": 1, "nick": "大咪咪", "words": "有没有sb在啊#23##" },
            //{ "chattype": 3, "vip": 2, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 2, "vip": 3, "nick": "大咪咪", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊" },
            //{ "chattype": 1, "vip": 0, "nick": "大咪咪", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 0, "nick": "大咪咪", "words": "有没有sb在啊" },
            //{ "chattype": 2, "vip": 1, "nick": "大咪咪", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 2, "nick": "大咪咪", "words": "有没有sb在啊" },
            //{ "chattype": 2, "vip": 3, "nick": "大咪咪", "words": "有没有sb在啊#23" },
            //{ "chattype": 1, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#23" },
            //{ "chattype": 2, "vip": 5, "nick": "大咪咪", "words": "有没有sb在啊#23" },
            //{ "chattype": 3, "vip": 6, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 2, "vip": 1, "nick": "大咪咪", "words": "有没有sb在啊#23" },
            //{ "chattype": 3, "vip": 2, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 3, "vip": 3, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "有没有sb在啊" },
            //{ "chattype": 3, "vip": 4, "nick": "大咪咪", "words": "有没有sb在啊#21" },
            //{ "chattype": 1, "vip": 5, "nick": "", "words": "111111有没有sb在啊" }
    ], "resert": 0
};


var haschat = true;
var chattype = 2;
var canchat = 0;
var ischatcooling = false;
var myScroll1;

//加载聊天窗口
var loadChat = function () {
    $("#chatdivsmall").css("display", "none");
    //document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=100)"; //for IE	
    //document.getElementById("chatdivsmall").style.opacity = 1; //for FF
    $("#chatdiv2").html("");
    $("#chatdiv1").html("");
    ischatcooling = false;
    $("body").stopTime("chatcooling");

    if (chatjson.resert == 0)
        window.GameMainClass.sendRequestJson(1219, '', "ShowChat");
    else
        ShowChat("");
}
var showchattype = 0;

//切换聊天类型(json中的chattype) 改变样式
//加滚动事件
var CheckChatTypeDia = function (type) {
    if (type == 3) {
        showTextMess("暂未开放", 2);
        return;
    }
    if (type == showchattype)
        return;
    //$(".ChatShow").addClass("chatActive");
    $("#chattb" + showchattype).removeClass("chatActive");
    $("#chattb" + type).addClass("chatActive");

    showchattype = type;

    return;


    var str = new Array();
    str.push("<div id='chatscroller' style='width:" + width + "px;'><ul><li>");
    str.push("<table id='chattable' cellpadding='0' cellspacing='0' style='line-height:20px;font-size:20px;font-weight:bold;padding:0; line-height:16px;'>");
    

    var ihtml = "", ihtml1 = "";
    var temp = "";
    var hasface = "margin-top:12px;";
    for (var i = 0; i < chatjson.data.length; i++) {
        if (type != 0) {
            if (chatjson.data[i].chattype != type && chatjson.data[i].chattype != 1)
                continue;
        }
        hasface = "margin-top:12px;";
        ihtml = chatjson.data[i].words;
        ihtml1 = "";
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 64) {
                            ihtml1 += "<img src='res/chat/" + temp + ".png' />";
                            hasface = "margin-top:12px;";
                            j += 2;
                            continue;
                        }
                    }
                }
            }
            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[i].chattype) {
            case 1:
                str.push("<tr><td width='82px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + ihtml1 + "</font></td></tr>");
                break;
            case 2:
                str.push("<tr><td style='vertical-align:top;' width='82px;'><font style='color:#66ccff'>【世界】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='margin-top:12px;margin-left:-12px;width:34px;height:15px;background:url(res/city/vip.png) no-repeat 0 -" + (chatjson.data[i].vip * 15) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
            case 3:
                str.push("<tr><td style='vertical-align:top;' width='82px;'><font style='color:#00ff00'>【组队】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='margin-top:12px;margin-left:-12px;width:34px;height:15px;background:url(res/city/vip.png) no-repeat 0 -" + (chatjson.data[i].vip * 15) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
        }
    }
    str.push("</table></li></ul></div>");
    $("#chatwrapper").html(str.join(""));
    var h = $("#chattable").height();
    if (h < height) {
        $("#chatscroller").css({ "top": height - h - 115 });
        myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });

    }
    else {
        $("#chatscroller").css({ "top": 0, "height": h });
        myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
        myScroll1.scrollTo(0, 0 - h + height - 115, 0);
    }
}

//聊天窗口
var ShowChat = function (json) {
    window.GameMainClass.onChating(1);
    showchattype = 0;
    if (json != "") {
        var BackJson = eval("(" + json + ")");
        if (BackJson.resert != 1)
            return;
        for (var j = 0; j < BackJson.json.length; j++) {
            chatjson.data.push(BackJson.json[j]);
        }
        chatjson.resert = 1;
    }
    var str = new Array();
    $("#mask").show().css({ "opacity": "0.7" });
    str.push("<div id='ChatDia' style='position:absolute;z-index:601;top:0px;left:0'>");
    str.push("<div class='ChatShow chatActive' id='chattb0' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CheckChatTypeDia(0);' style='top:9px;left:21px;'><div class='chat_text'></div></div>");
    str.push("<div class='ChatTabBtn' id='chattb2' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CheckChatTypeDia(2);' style='top:9px;left:131px;'><div class='chat_text' style='background-position-y:-33px;'></div></div>");
    str.push("<div class='ChatTabBtn' id='chattb3' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) CheckChatTypeDia(3);' style='top:9px;left:241px;'><div class='chat_text' style='background-position-y:-66px;'></div></div>");
    //关闭小窗提示

    str.push("<div class='chatClose' ontouchmove='$(this).css({ \"-webkit-transform\": \"scale(1)\" });move()' ontouchstart='$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });begin()' ontouchend='window.GameMainClass.playEffectSound(\"close\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });if (Math.abs(lastPosX - beforePosX) < 5) closechat();'  style='left:" + (width - 60) + "px;top:10px;z-index:10;'></div>");
    str.push("<div id='chatwrapper' style='width:" + width + "px;height:" + (height - 115) + "px;'><div id='chatscroller' style='width:" + width + "px;'><ul><li>");
    str.push("<table id='chattable' cellpadding='0' cellspacing='0' style='line-height:20px;font-size:20px;font-weight:bold;padding:0; line-height:16px;'>");
    var ihtml = "", ihtml1 = "";
    var temp = "";
    var hasface = "margin-top:12px;";
    for (var i = 0; i < chatjson.data.length; i++) {
        hasface = "margin-top:12px;";
        ihtml = chatjson.data[i].words;
        ihtml1 = "";
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 64) {
                            ihtml1 += "<img src='res/chat/" + temp + ".png' />";
                            j += 2;
                            hasface = "margin-top:12px;";
                            continue;
                        }
                    }
                }
            }

            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[i].chattype) {
            case 1:
                str.push("<tr><td width='82px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + ihtml1 + "</font></td></tr>");
                break;
            case 2:
                str.push("<tr><td style='vertical-align:top;' width='82px;'><font style='color:#66ccff'>【世界】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='margin-top:12px;margin-left:-12px;width:34px;height:15px;background:url(res/city/vip.png) no-repeat 0 -" + (chatjson.data[i].vip * 15) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
            case 3:
                str.push("<tr><td style='vertical-align:top;' width='82px;'><font style='color:#00ff00'>【组队】</font></td><td>" + (chatjson.data[i].vip > 0 ? "<div style='margin-top:12px;margin-left:-12px;width:34px;height:15px;background:url(res/city/vip.png) no-repeat 0 -" + (chatjson.data[i].vip * 15) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + chatjson.data[i].nick + ":</font>" + ihtml1 + "</td></tr>");
                break;
        }
    }
    str.push("</table></li></ul></div></div>")

    str.push("<div id='chatButton' class='ButtonSmall'ontouchmove='move()'ontouchstart='begin()'ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ChatTypeDivDisplay();'style='position:fixed;width:96px;height:49px;background:url(res/chat/button.png) no-repeat;top:" + (height - 60) + "px;left:2px;text-align:center;font-size:14px;line-height:30px;'><div class='chat_text' style='background-position:0px -33px;'></div></div>");

    str.push("<input id='chatText' style='top:" + (height - 53) + "px;' value='输入您想说的话，谨防充值中奖诈骗！'></input><div class='ButtonSmall' ><font id='ChatTxt' style=''></font></div>");
    str.push("<img id='chatImg' class='ButtonSmall'  ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) showFaceDiv();' style='width:50px;height:47px;top:" + (height - 57) + "px;left:" + (width - 200) + "px;' src='res/chat/face.png' />");
    str.push("<div id='FaceDiv' style='display:none;left:" + (width - 396) + "px;'>");
    for (var i = 0; i < 63; i++) {
        if (i < 9)
            str.push("<img src='res/chat/0" + (i + 1) + ".png' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) insertFace(\"0" + +String(i + 1) + "\");' />");
        else
            str.push("<img src='res/chat/" + (i + 1) + ".png' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) insertFace(" + (i + 1) + ");'/>");
    }

    str.push("</div>");
    str.push("<div id='chatFs' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (!cancel()) {PushChat();}'  class='bossBtn' style='position:fixed;width:94px;top:" + (height - 54) + "px;left:" + (width - 110) + "px;'><div class='btn'><div class='btn1'></div><div class='btn2'>发送</div><div class='btn3'></div></div></div>");


    str.push("</div>");
    $("#dialog").append(str.join("")).css("zoom", "1");

    if (pad) {
        $(".chatClose").css({ "zoom": padScale, "left": width / padScale - 60, "top": 0 });
        $("#chatText").css({ "zoom": padScale, "top": height / padScale - 53 });
        $("#chatButton").css({ "zoom": padScale, "top": height / padScale - 60 });
        $("#chatFs").css({ "zoom": padScale, "top": height / padScale - 54, "left": width / padScale - 110 });
        $("#chattb0,#chattb2,#chattb3").css({ "zoom": padScale })
        $("#chatwrapper").css({ "zoom": padScale, "top": 55 * padScale-20, "width": width / padScale, "height": height / padScale - 140 })
        $("#chatImg").css({ "zoom": padScale, "left": width / padScale - 200, "top": height / padScale-57 })
        $("#FaceDiv").css({ "zoom": padScale, "left": width / padScale - 396, "top": height / padScale - 357 });
    }


    var h = $("#chattable").height();
    if (h < height) {
        $("#chatscroller").css({ "top": height - h - 115 });
        if (pad) {
            $("#chatscroller").css({ "top": (height - h * padScale - 160 * padScale) / padScale });
        }
    }
    else {
        $("#chatscroller").css({ "top": 552 - h, "height": h });
        if (pad)
            $("#chatscroller").css({ "top": 0 });
    }
    

    $("#chatText").bind("focus", function () {
        if ($(this).offset().top > (height / 2)) {
            $(this).css("top", "-=400");
            $(this).val("");
        }
    });

    myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
    if (h > height) {
        myScroll1.scrollTo(0, 0 - h + height - 115, 0);
        if (pad)
            myScroll1.scrollTo(0, 0 - h * padScale + height - 115 * padScale, 0);
    }
}

//插入表情(选中后出现在聊天框->获取编号)
var insertFace = function (index) {
    if ($("#chatText").val().indexOf("输入您想") != -1) {
        $("#chatText").val("");
    }
    if (haschat)
        $("#chatText").val($("#chatText").val() + "#" + String(index));
    else {
        haschat = true;
        $("#chatText").val("#" + String(index))
    }
    $("#FaceDiv").css("display", "none");
}

//打开表情框(display)
var showFaceDiv = function () {
    if ($("#FaceDiv").css("display") == "none") {
        $("#FaceDiv").css("display", "").css("top", height - 360);
        if(pad)
            $("#FaceDiv").css({ "top": height / padScale - 357 });
    }
    else
        $("#FaceDiv").css("display", "none");
}

//关闭聊天窗口(改成聊天类型2->世界)
var closechat = function () {
    window.GameMainClass.onChating(0);
    $("#dialog").html("");

    if (pad) {
        $("#dialog").css({ "position": "relative", "zoom": padScale * 0.8 });
    }

    $("#mask").hide().css("opacity", "0.3");
    chattype = 2;
    haschat = false;
}

//改更聊天类型
var ChoseChatType = function (index) {
    switch (index) {
        case 2:
            $("#chattypetext").html("世 界");
            $("#chattypetext").css("color", "#66ccff");
            chattype = 2;
            break;
        case 3:
            $("#chattypetext").html("组 队");
            $("#chattypetext").css("color", "#00ff00");
            chattype = 3;
            break;
    }

    HideChatTypeDiv();
}

//选择框样式判断
var ChatTypeDivDisplay = function () {
    if ($("#ChatTypeDiv").css("display") == "none")
        ShowChatTypeDiv();
    else
        HideChatTypeDiv();
}

//弹出输入聊天类型选择框
var ShowChatTypeDiv = function () {
    $("body").stopTime("chattype");
    var h = 0;
    $("body").everyTime("10ms", "chattype", function () {
        if (h < 70) {
            h += 4;
            $("#ChatTypeDiv").css("display", "");
            $("#ChatTypeDiv").css({ "height": h, "top": height - 50 - h });
        }
        else {
            $("#ChatTypeDiv").css({ "height": 70, "top": height - 50 - h });
            $("body").stopTime("chattype");
            //AcceptChat('{"Client":[{"chattype":2,"words":"good luck"}],"chattype":2,"info":"say_ok","nick":"大咪咪","resert":1,"words":"good luck"}');
        }
    });
}

//消失输入聊天类型选择框
var HideChatTypeDiv = function () {
    $("body").stopTime("chattype");
    var h = 70;
    $("body").everyTime("10ms", "chattype", function () {
        if (h > 0) {
            h -= 4;
            $("#ChatTypeDiv").css({ "height": h, "top": height - 50 - h });
        }
        else {
            $("#ChatTypeDiv").css({ "display": "none" });
            $("body").stopTime("chattype");
        }
    });
}

//打开聊天输入法(调服务器方法->android输入)
var OpenChatText = function () {
    if (haschat)
        window.GameMainClass.openchat($("#ChatTxt").html());
    else
        window.GameMainClass.openchat("");
}

//设置输入框输入内容
var GetChatText = function (text) {
    if (text != "") {
        haschat = true;
        $("#ChatTxt").html(text);
    } else {
        haschat = false;
        //$("#ChatTxt").html("输入您想说的话（谨防充值、中奖诈骗）");
    }
}

//发送聊天内容
var PushChat = function () {

    if ($("#chatText").val().indexOf("输入您想说的话") != -1)
        return;

    //if (haschat == false)
    //    return;
    var str = "";
    //haschat = false;
    //判断允许发言
    if (userJson.vip<1) {
        str = "<td width='82px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>VIP1玩家才可在世界发言</font></td>";
    }
    else if (canchat != 0) {
        switch (canchat) {
            case 2:
                str = "<td width='82px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>您已被禁言</font></td>";
                break;
            case 3:
                str = "<td width='82px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>今日发言次数已尽</font></td>";
                break;
        }
    }
        //验证结束 发送至服务器
    else {
        window.GameMainClass.sendRequestJson(1217, '{"chattype":' + chattype + ',"words":"' + $("#chatText").val() + '"}', "");
    }

    //把输入的话提交上去
    if (str != "") {
        var trnode = document.createElement("tr");
        trnode.innerHTML = str;
        document.getElementById("chattable").appendChild(trnode);

        var h = $("#chattable").height();
        $("#chatscroller").css({ "height": h });
        if (h < height) {
            $("#chatscroller").css({ "top": height - h - 115 });
            if (pad) {
                $("#chatscroller").css({ "top": (height - h * padScale - 160 * padScale) / padScale });
            }
        }
        else {
            $("#chatscroller").css({ "top": 0 });
            myScroll1 = new iScroll('chatwrapper', { 'bounce': false, 'hScrollbar': false, 'vScrollbar': false });
            myScroll1.scrollTo(0, 0 - h + 225, 0);
            if (pad){
                $("#chatscroller").css({ "top": 0 });
                myScroll1.scrollTo(0, 0 - h * padScale + height - 115 * padScale, 0);
            }
        }
    }
    $("#chatText").val("输入您想说的话，谨防充值中奖诈骗！");
    if ($("#chatText").offset().top<300)
        $("#chatText").css("top", "+=400");
}

//聊天冷却时间
var ischatcooling = false;

//在主界面上显示新消息(小窗口->渐变消失)
var ShowSmallChat = function () {
    $("body").stopTime("chatcooling");
    //设置透明度
    document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=100)"; //for IE	
    document.getElementById("chatdivsmall").style.opacity = 1; //for FF
    var str = "";
    var ihtml = "";
    var ihtml1 = "", temp = "";
    if (ischatcooling == false) {
        $("#chatdivsmall").css("display", "");
        ihtml = chatjson.data[chatjson.data.length - 1].words;
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 64) {
                            ihtml1 += "<img style='position:relative;margin-top:-12px;' src='res/chat/" + temp + ".png' />";
                            j += 2;
                            continue;
                        }
                    }
                }
            }
            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[chatjson.data.length - 1].chattype) {
            case 1:
                str = "<font style='color:#ffff00'>【系统】</font><font style='color:#ffff00'>" + ihtml1 + "</font>";
                break;
            case 2:
                str = "<font style='color:#66ccff'>【世界】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
            case 3:
                str = "<font style='color:#00ff00'>【组队】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
        }
        $("#chatdiv1").html(str);
        ischatcooling = true;
    }
    else {
        if (chatjson.data.length > 1) {
            ihtml = chatjson.data[chatjson.data.length - 2].words;
            for (var j = 0; j < ihtml.length; j++) {
                temp = "";
                if (ihtml.charAt(j) == "#") {
                    if (j < ihtml.length - 2) {
                        temp = ihtml.substr(j + 1, 2);
                        if (!isNaN(temp)) {
                            if (parseInt(temp) < 64) {
                                ihtml1 += "<img style='position:relative;margin-top:-12px;' src='res/chat/" + temp + ".png' />";
                                j += 2;
                                continue;
                            }
                        }
                    }
                }
                ihtml1 += ihtml.charAt(j)
            }
            switch (chatjson.data[chatjson.data.length - 2].chattype) {
                case 1:
                    str = "<font style='color:#ffff00'>【系统】</font><font style='color:#ffff00'>" + ihtml1 + "</font>";
                    break;
                case 2:
                    str = "<font style='color:#66ccff'>【世界】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 2].nick + ":</font>" + ihtml1;
                    break;
                case 3:
                    str = "<font style='color:#00ff00'>【组队】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 2].nick + ":</font>" + ihtml1;
                    break;
            }
            $("#chatdiv1").html(str);
        }
        ihtml = chatjson.data[chatjson.data.length - 1].words;
        ihtml1 = "";
        for (var j = 0; j < ihtml.length; j++) {
            temp = "";
            if (ihtml.charAt(j) == "#") {
                if (j < ihtml.length - 2) {
                    temp = ihtml.substr(j + 1, 2);
                    if (!isNaN(temp)) {
                        if (parseInt(temp) < 64) {
                            ihtml1 += "<img style='position:relative;margin-top:-12px;' src='res/chat/" + temp + ".png' />";
                            j += 2;
                            continue;
                        }
                    }
                }
            }
            ihtml1 += ihtml.charAt(j)
        }
        switch (chatjson.data[chatjson.data.length - 1].chattype) {
            case 1:
                str = "<font style='color:#ffff00'>【系统】</font><font style='color:#ffff00'>" + ihtml1 + "</font>";
                break;
            case 2:
                str = "<font style='color:#66ccff'>【世界】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
            case 3:
                str = "<font style='color:#00ff00'>【组队】</font><font class='chatnick'>" + chatjson.data[chatjson.data.length - 1].nick + ":</font>" + ihtml1;
                break;
        }
        $("#chatdiv2").html(str);
    }
    //$("body").oneTime("5s", "chatcooling", function () {
    //    $("body").stopTime("chatcooling");
    //    var i = 100;
    //    //设置聊天小窗口 渐变消失
    //    $("body").everyTime("20ms", "chatcooling", function () {
    //        if (i > 0) {
    //            i--;
    //            document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=" + i + ")"; //for IE	
    //            document.getElementById("chatdivsmall").style.opacity = i / 100; //for FF
    //        }
    //        else {
    //            $("#chatdivsmall").css("display", "none");
    //            document.getElementById("chatdivsmall").style.filter = "Alpha(Opacity=100)"; //for IE	
    //            document.getElementById("chatdivsmall").style.opacity = 1; //for FF
    //            $("#chatdiv2").html("");
    //            $("#chatdiv1").html("");
    //            ischatcooling = false;
    //            $("body").stopTime("chatcooling");
    //        }
    //    });
    //});
}

//接收新的聊天信息(来了一条->push到最后->超过100条->删除最后一条)(未知)
var AcceptChat = function (json) {
    var BackJson = JSON.parse(json);
    //var BackJson = { "Client": [{ "chattype": 2, "words": "good luck" }], "chattype": 2, "info": "say_ok", "nick": "大咪咪", "resert": 1, "words": "大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了大家好 我来了v" };
    chatjson.data.push({ "chattype": BackJson.chattype, "nick": BackJson.nick, "words": BackJson.words, "vip": BackJson.vip });
    if (chatjson.data.length > 100) {
        chatjson.data.splice(0, 1);
    }
    if (document.getElementById("ChatDia") != null) {
        var str = "";
        switch (BackJson.resert) {
            case 1:
                if (BackJson.chattype != 1) {
                    if (BackJson.chattype != showchattype && showchattype != 0)
                        return;
                }
                var ihtml = BackJson.words;
                var ihtml1 = "", temp = "";
                var hasface = "margin-top:12px;";
                for (var j = 0; j < ihtml.length; j++) {
                    temp = "";
                    if (ihtml.charAt(j) == "#") {
                        if (j < ihtml.length - 2) {
                            temp = ihtml.substr(j + 1, 2);
                            if (!isNaN(temp)) {
                                if (parseInt(temp) < 64) {
                                    ihtml1 += "<img src='res/chat/" + temp + ".png' />";
                                    j += 2;
                                    hasface = "margin-top:12px;";
                                    continue;
                                }
                            }
                        }
                    }
                    ihtml1 += ihtml.charAt(j)
                }
                switch (BackJson.chattype) {
                    case 1:
                        str = "<td style='width:82px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + ihtml1 + "</font></td>";
                        break;
                    case 2:
                        str = "<td style='vertical-align:top;width:82px;'><font style='color:#66ccff'>【世界】</font></td><td>" + (BackJson.vip > 0 ? "<div style='margin-top:12px;margin-left:-12px;width:34px;height:15px;background:url(res/city/vip.png) no-repeat 0 -" + (BackJson.vip * 15) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + BackJson.nick + ":</font>" + ihtml1 + "</td>";
                        break;
                    case 3:
                        str = "<td style='vertical-align:top;width:82px;'><font style='color:#00ff00'>【组队】</font></td><td>" + (BackJson.vip > 0 ? "<div style='margin-top:12px;margin-left:-12px;width:34px;height:15px;background:url(res/chat/VipSmall.png) no-repeat 0 -" + (BackJson.vip * 15) + "px;" + hasface + "'></div>" : "") + "<font class='chatnick'>" + BackJson.nick + ":</font>" + ihtml1 + "</td>";
                        break;
                }
                break;
            default:
                canchat = BackJson.resert;
                str = "<td style='width:82px;'><font style='color:#ffff00'>【系统】</font></td><td><font style='color:#ffff00'>" + BackJson.words + "</font></td>";
                break;
        }

        var trnode = document.createElement("tr");
        trnode.innerHTML = str;
        $("#chattable").append(trnode);

        var h = $("#chattable").height();
        $("#chatscroller").css({ "height": h });
        if (h < height) {
            $("#chatscroller").css({ "top": height - h - 115 });
            if(pad)
                $("#chatscroller").css({ "top": (height - h * padScale - 160 * padScale) / padScale });
        }else {
            $("#chatscroller").css({ "top": 552 - h, "height": h });
            if (pad)
                $("#chatscroller").css({ "top": 0 });
        }
        if (h > height) {
            myScroll1.scrollTo(0, 0 - h + height - 115, 0);
            if (pad)
                myScroll1.scrollTo(0, 0 - h * padScale + height - 115 * padScale, 0);
        }
    }
    else {
        ShowSmallChat();
    }
}