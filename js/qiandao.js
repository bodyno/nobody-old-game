/// <reference path="public.js" />
/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />

var qianDaoJson;
//var qianDaoJson = {"canRecv":1,"day":4,"resert":1};

var loadQianDao = function () {
    if (qianDaoJson == null) {
        window.GameMainClass.sendRequestJson(156, '', "setQianDaoJson");
    }
    else {
        QianDao();
    }
}

var setQianDaoJson = function (json) {
    qianDaoJson = JSON.parse(json);
    QianDao();
}

//连续登录奖励
var QianDao = function () {
    $("#dialog").html("<div id='hero'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='loginReward'><div id='l_left'><div id='l_data'>您已登录:<font style='color:#26E50E;'>5</font><br/>还需登录:<font style='color:#26E50E;'>15</font></div><div id='l_some'>每月登录20次即可免费获取全部奖励,累计登录每月重新计算.</div><div id='l_reward'></div></div><div id='l_center'><div id='l_day'></div><div id='l_select'></div><div id='l_clickArea'></div><div id='l_item1'class='l_item'></div><div id='l_item2'class='l_item'></div><div id='l_item3'class='l_item'></div><div id='l_item4'class='l_item'></div><div id='l_item5'class='l_item'></div><div id='l_item6'class='l_item'></div><div id='l_item7'class='l_item'></div><div id='l_item8'class='l_item'></div><div id='l_item9'class='l_item'></div><div id='l_item10'class='l_item'></div><div id='l_item11'class='l_item'></div><div id='l_item12'class='l_item'></div><div id='l_item13'class='l_item'></div><div id='l_item14'class='l_item'></div><div id='l_item15'class='l_item'></div><div id='l_item16'class='l_item'></div><div id='l_item17'class='l_item'></div><div id='l_item18'class='l_item'></div><div id='l_item19'class='l_item'></div><div id='l_item20'class='l_item'></div></div></div><div id='LoginRewardBtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div></div><div id='LoginRewardIcon'class='hero_icon hero_icon_select'></div></div>");
    $("#mask").show();
    $("#hero").css("top", (height - 480) / 2);
    if (pad)
        $("#hero").css({ "top": ((height - 470 * sp) / 2) / sp });

    setTitle(20)

    //加载那些已经被点击了
    for (var i = 0; i < 20; i++) {
        $("#l_item" + (i + 1)).append("<div class='l_box1'></div>");
    }
    for (var i = 0; i < qianDaoJson.day - 1 ; i++) {
        $("#l_item" + (i + 1)).find(".l_box1").css("background-position-x", "78px").append("<div class='l_item_select'></div>");
    }
    if (qianDaoJson.canRecv == 0) {
        $("#l_item" + qianDaoJson.day).find(".l_box1").css("background-position-x", "78px").append("<div class='l_item_select'></div>");
    }

    //登录天数
    $("#l_data").html("您已签到:<font style='color:#26E50E;'>" + qianDaoJson.day + "</font>天<br/>还需签到:<font style='color:#26E50E;'>" + (20 - qianDaoJson.day) + "</font>天")

    //三个英雄
    if (qianDaoJson.day > 7 || (qianDaoJson.day == 7 && qianDaoJson.canRecv == 0)) {
        $("#l_item7").html("<div class='bagHeadBg'><div class='bagHead' style='background-image:url(res/loginReward/1.png);'></div><div class='bagHeadColor' style='top:-1px;background-image:url(res/head/3.png)'></div><div class='l_item_select' style='position:absolute;'></div></div>");
    }
    else {
        $("#l_item7").html("<div class='bagHeadBg'><div class='bagHead' style='background-image:url(res/loginReward/1.png);'></div><div class='bagHeadColor' style='top:-1px;background-image:url(res/head/3.png)'></div></div>");
    }

    //三个英雄
    if (qianDaoJson.day > 14 || (qianDaoJson.day == 14 && qianDaoJson.canRecv == 0)) {
        $("#l_item14").html("<div class='bagHeadBg'><div class='bagHead' style='background-image:url(res/loginReward/2.png);'></div><div class='bagHeadColor' style='top:-1px;background-image:url(res/head/3.png)'></div><div class='l_item_select' style='position:absolute;'></div></div>");
    }
    else {
        $("#l_item14").html("<div class='bagHeadBg'><div class='bagHead' style='background-image:url(res/loginReward/2.png);'></div><div class='bagHeadColor' style='top:-1px;background-image:url(res/head/3.png)'></div></div>");
    }
    //三个英雄
    if (qianDaoJson.day > 20 || (qianDaoJson.day == 20 && qianDaoJson.canRecv == 0)) {
        $("#l_item20").html("<div class='bagHeadBg'><div class='bagHead' style='background-image:url(res/loginReward/3.png);'></div><div class='bagHeadColor' style='top:-1px;background-image:url(res/head/4.png)'></div><div class='l_item_select' style='position:absolute;'></div></div>");
    }
    else {
        $("#l_item20").html("<div class='bagHeadBg'><div class='bagHead' style='background-image:url(res/loginReward/3.png);'></div><div class='bagHeadColor' style='top:-1px;background-image:url(res/head/4.png)'></div></div>");
    }

    //二十个点击区域
    for (var i = 0; i < 20; i++) {
        $("#l_clickArea").append("<div class='l_click' index='" + i + "'></div>");
    }

    //初始选中

    var tempId = qianDaoJson.day - 1;

    if (qianDaoJson.canRecv == 0) {
        tempId = qianDaoJson.day;
        qiandaoSelect((qianDaoJson.day));
        $("#LoginRewardBtn").children().addClass("abtn");
    }
    else {
        qiandaoSelect((qianDaoJson.day - 1));
    }
    //初始详情
    $("#l_reward").html(localQiandaoJson.data[tempId].reward);


    //点击
    $(".l_click").bind("touchend", function () {
        if (cancel())
            return;
        qiandaoSelect($(this).attr("index"));
        var tempId = $(this).attr("index");
        $("#l_reward").html(localQiandaoJson.data[$(this).attr("index")].reward);
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#LoginRewardBtn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        if (qianDaoJson.canRecv == 1) {
            window.GameMainClass.sendRequestJson(157, '', "qiandaoRewardResert");
        }
        else {
            showTextMess("今日已领取!", 2);
        }
    }).bindAnimate();

    //关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
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
}

//选中框
var qiandaoSelect = function (index) {
    var tempTop = parseInt(index / 5) * 82;
    var tempLeft = index % 5 * 82;
    $("#l_select").stop().animate({ "top": tempTop, "left": tempLeft }, "fast","linear");

}

//领取
var qiandaoRewardResert = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson={"id":700,"num":"100","g":"","info":"获得友情点100","resert":1,"data":[{"p":"xxx"}]};
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    } else {
        showTextMess(tempJson.info,1);
        updateUserJson(String(tempJson.id), tempJson.num);

        if (tempJson.data) {
            heroJson.data.push(tempJson.data[0]);
        }

        //改变箱子的样子
        $("#l_item" + qianDaoJson.day).find(".l_box1").css("background-position-x", "78px").append("<div class='l_item_select'></div>");
        $("#l_item" + qianDaoJson.day).find(".bagHeadBg").append("<div class='l_item_select' style='position:absolute;'></div>");
        qianDaoJson.canRecv = 0;
        $("#LoginRewardBtn").children().addClass("abtn");
        changeRemain("sign", -1);
        
    }
}