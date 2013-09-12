/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />

//var messageJson = {"data":[{"id":5596,"isrecv":0,"msg":"88888","rwid":"1000,1001,1001,200","rwnum":"4,5,1,10","rwtype":"2,4,3,1","time":"09/09 16:19","type":2}],"resert":1}
var messageJson;

var messageClickElement;

//加载消息界面
var showMessage = function () {
    $("#dialog").html("<div id='message'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='messageDialog'><div class='swiper-container messageSwiper'><div class='swiper-wrapper'><div id='m_page0'class='swiper-slide message-slide'></div></div></div></div><div id='messagebtn'class='hero_icon hero_icon_select'></div></div>");

    $("#message").css("top", (height - 480) / 2);
    if (pad)
        $("#message").css({ "top": ((height - 470 * sp) / 2) / sp });
    $("#mask").show();

    //关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            messageClickElement = null;
            $("#dialog").html("");
            $("#mask").hide();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    if (!messageJson.data) {
        showTextMess("您还没有任何消息", 2);
        return;
    }

    showMessageList();

    setTitle(15);

    var messageSwiper = new Swiper('.messageSwiper', {
        mode: "horizontal"
    });

    //领取事件
    $(".m_item").bind("touchend", function () {
        if (cancel())
            return;
        //$(this).children(".m_btn").css("background-image", "url(res/message/btn.png)").removeAttr("can").removeAttr("type");
        window.GameMainClass.playEffectSound("icon");
        messageClickElement = $(event.srcElement);

        showReward($(this).children(".m_btn").attr("id"));
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    
}

//加载消息列表
var showMessageList = function () {
    var index = 0;
    var page = 0;
    for (var i = 0; i < messageJson.data.length; i++) {
        if (index == 8) {
            page++;
            var divnode = document.createElement("div");
            divnode.className = "swiper-slide message-slide";
            divnode.id = "m_page" + page;
            $("#messageDialog .swiper-wrapper").append(divnode);
            index = 0;
        }
        

        var div = document.createElement("div");
        div.className = "m_item";
        div.id = "m_item" + messageJson.data[i].id;
        $(div).html("<div class='m_box'></div><div class='m_type'></div><div class='m_time'>" + messageJson.data[i].time + "</div><div class='m_detail'>" + messageJson.data[i].msg + "</div><div class='m_btn'></div>");
        
        $(div).children(".m_box").css("background-image", "url(res/message/" + messageJson.data[i].type + ".png)");
        $(div).children(".m_type").text(getMessageTitle(messageJson.data[i].type));

        //系统则没有奖励

        if (messageJson.data[i].isrecv == 1 )
            $(div).children(".m_btn").attr("can", true).attr("id", messageJson.data[i].id).css("background-image", "url(res/message/btn.png)");
        else
            $(div).children(".m_btn").attr("can", true).attr("id", messageJson.data[i].id);

        if (messageJson.data[i].type == 2)
            $(div).children(".m_btn").attr("type", 2);
        $("#m_page"+page).append(div);
        index++;
    }
}

var loadMessage = function () {
    if (messageJson == null) {
        window.GameMainClass.sendRequestJson(1081, "", "setMessageJson");
    }
    else {
        showMessage();
    }
}

//设置消息json
var setMessageJson = function (json) {
    messageJson = JSON.parse(json);
    showMessage();
}

//领取奖励
var getMessageWare = function (json) {
    //var tempJson = { "Client": [{ "msgid": 96 }], "data": [{ "id": 200, "num": 10000, "str": "", "type": 1 }, { "id": 600, "num": 100, "str": "", "type": 1 }], "info": "银币+10000 萌币+100", "resert": 1 };
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    }
    else {

        //改本地json
        for (var j = 0; j < messageJson.data.length; j++) {
            if (messageJson.data[j].id == tempJson.Client[0].msgid) {
                messageJson.data[j].isrecv = 1;

                //改领取标签
                $("#m_item" + tempJson.Client[0].msgid).children(".m_btn").attr("can", true).css("background-image", "url(res/message/btn.png)");
                break;
            }
        }

        showGetItemAnimate2(tempJson);
        //showTextMess(tempJson.info, 1);

        $("#shopCancelBtn").attr("close", true);
        $("#shopCancelBtn").find(".btn2").text("关闭");

        iGetReward(tempJson);

        changeRemain("msg", -1);
    }
}

//奖励界面
var showReward = function (messageId) {
    //遮层
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);


    $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/15.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='message_wrapper'><div id='message_scroller'><ul><li><div id='tempMessTitle'></div><div id='tempMessContent'></div><div id='tempMessageAll'></div></li></ul></div></div></div></div>");
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 280) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 280 * sp) / 2 / sp });

    var tempStr = "";
    //加载奖励的物品
    
    var tempMessage;
    for (var i = 0; i < messageJson.data.length; i++) {
        if (messageJson.data[i].id == messageId) {
            tempMessage = messageJson.data[i];
            break;
        }

    }

    var tempType=tempMessage.rwtype.split(",");
    var tempNum=tempMessage.rwnum.split(",");
    var tempId = tempMessage.rwid.split(",");

    $("#tempMessContent").text(tempMessage.msg);

    if (tempMessage.isrecv == 1 || tempMessage.type==1) {
        $("#mess3").append("<div id='shopCancelBtn' close='true' class='ShopBtn'style='right:194px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div>");
    }
    else {
        $("#mess3").append("<div id='shopCancelBtn' msgid=" + messageId + " class='ShopBtn'style='right:194px;'><div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div></div>");
    }
    
    for (var i = 0; i < tempType.length; i++) {
        switch (Number(tempType[i])) {
            case 1:
                switch (Number(tempId[i])) {
                    case 200:
                        tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/200.png);'></div>银币+" + tempNum[i] + "</div>";
                        break;
                    case 600:
                        tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/600.png);'></div>萌币+" + tempNum[i] + "</div>";
                        break;
                    case 500:
                        tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/600.png);'></div>体力回满</div>";
                        break;
                    case 800:
                        tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/800.png);'></div>万能将魂+" + tempNum[i] + "</div>";
                        break;
                    case 105:
                        tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/105.png);'></div>荣誉+" + tempNum[i] + "</div>";
                        break;
                    case 400:
                        tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/400.png);'></div>声望+" + tempNum[i] + "</div>";
                        break;
                    default:
                        tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/other.png);'></div>物品+" + tempNum[i] + "</div>";
                        break;
                }
                break;
            case 2:
                var tempName;
                for (var m = 0; m < localHeroJson.data.length; m++) {
                    if (localHeroJson.data[m].gid == tempId[i]) {
                        tempName = localHeroJson.data[m].name;
                        break;
                    }
                }
                tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/a1.png);'></div>" + tempName + " +" + tempNum[i] + "</div>";
                break;
            case 3:
                var tempName;
                for (var m = 0; m < GoodsJson.data.length; m++) {
                    if (GoodsJson.data[m].ItemID == tempId[i]) {
                        tempName = GoodsJson.data[m].Name;
                        break;
                    }
                }
                tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:5px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/other.png);'></div>" + tempName + " +" + tempNum[i] + "</div>";
                break;
            case 4:
                var tempName;
                for (var m = 0; m < localPieceJson.data.length; m++) {
                    if (localPieceJson.data[m].gid == tempId[i]) {
                        tempName = localPieceJson.data[m].name;
                        break;
                    }
                }
                tempStr += "<div class='wardDivTemp' style='margin-right:0;margin-top:10px;margin-left:10px;'><div class='wardItem' style='background-image:url(res/ward/800.png);'></div>" + tempName + "将魂 +" + tempNum[i] + "</div>";
                break;
        }
    }

    $("#tempMessageAll").append(tempStr);
    
    //绑定事件
    $("#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#tempMask").remove();
        $("#temp").html("");
    }).bind("touchstart", function () {
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#shopCancelBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if ($(this).attr("close")) {
            window.GameMainClass.playEffectSound("close");
            $("#tempMask").remove();
            $("#temp").html("");
            return;
        }
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(1080, "{\"msgid\":" + $(this).attr("msgid") + "}", "getMessageWare");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
    
    $("#message_scroller").height($("#message_wrapper li").height() + Math.ceil(tempType.length / 2) * 42 + 40);
    
    messageScroll = new iScroll('message_wrapper');
}

var setMessageJsonJust = function (json) {
    messageJson = JSON.parse(json);
    remainJson.msg = 0;
    for (var i = 0; i < messageJson.data.length; i++) {
        if (messageJson.data[i].type == 1) {
            remainJson.msg++;
        }
    }

    if (remainJson.msg != 0) {
        $("#Message").html("").append("<div class='iconLightSmall'></div>")
    }
}

//消息回满体力
var fullStrengthFromMessage = function (json) {
    //var tempJson = { "Client": [{ "msgid": 96 }], "data": [{ "id": 200, "num": 10000, "str": "", "type": 1 }, { "id": 600, "num": 100, "str": "", "type": 1 }], "info": "银币+10000 萌币+100", "resert": 1 };
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {

        showTextMess("体力已回满", 1);

        //改本地json
        for (var j = 0; j < messageJson.data.length; j++) {
            if (messageJson.data[j].id == tempJson.msgid) {
                messageJson.data[j].isrecv = 1;

                //改领取标签
                $("#m_item" + tempJson.msgid).children(".m_btn").attr("can", true).css("background-image", "url(res/message/btn.png)");
                break;
            }
        }

        $("#shopCancelBtn").attr("close", true);
        $("#shopCancelBtn").find(".btn2").text("关闭");

        userJson.strength = userJson.smax;
        var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? 122 : parseInt((userJson.strength / userJson.smax) * 122);
        $("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");

        changeRemain("msg", -1);
    }
}

//消息类型
var getMessageTitle = function (i) {
    return ["", "系统公告", "系统奖励", "每日体力", "兵临城下军费", "矿区信息"][i];
}