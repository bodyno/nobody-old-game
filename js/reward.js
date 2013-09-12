/// <reference path="jquery.js" />
/// <reference path="public.js" />


var showRewardDialog = function () {
    $("#dialog").html("<div id='heroEquip'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='equipDialog'><div id='rewardInfo'></div><div id='equipDialog_Hero'><div class='swiper-container'style='width:156px;'id='rewardSwiper'><div class='swiper-wrapper'style='width:156px;'id='rewardwrapper'></div></div></div></div><div id='hero_equip'class='hero_icon hero_icon_select'style='background-image:url(res/reward/icon.png);'></div><div id='heroequip_hr'class='equip_hr'></div><div id='RechargeBtn'class='LvUpBtn'style='display:block;right:60px;bottom:24px;'><div class='btn'><div class='btn1'></div><div class='btn2' style='padding-left:3px;'>充值</div><div class='btn3'></div></div></div></div>");
    $("#mask").show();

    $("#heroEquip").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#heroEquip").css({ "top": ((height - 470 * sp) / 2) / sp });
    HeroEquipData.flag = true;

    setTitle(40);

    //第一个选择武将
    var div = document.createElement("div");
    div.className = "swiper-slide";
    $(div).css({ "width": "156px" });
    //构建HTML
    var arr = [];
    if (nowActivity.godStatu) {
        arr.push("<div ontouchmove='move();'ontouchstart='begin();'ontouchend='if (!cancel()) {CheckReward(5);}'class='rewardMune'id='rm5'>财神来了</div>");
    }
    arr.push("<div class='rewardMune'ontouchmove='move();'ontouchstart='begin();'ontouchend='if (!cancel()) {CheckReward(0);}'id='rm0'>冲级拿大奖</div>");
    if (nowActivity.fristStatu) {
        arr.push("<div class='rewardMune'ontouchmove='move();'ontouchstart='begin();'ontouchend='if (!cancel()) {CheckReward(1);}'id='rm1'>首充奖励</div>");
    }
    arr.push("<div ontouchmove='move();'ontouchstart='begin();'ontouchend='if (!cancel()) {CheckReward(2);}'class='rewardMune'id='rm2'>累充奖励</div>");

    if (nowActivity.fallStatu) {
        arr.push("<div ontouchmove='move();'ontouchstart='begin();'ontouchend='if (!cancel()) {CheckReward(6);}'class='rewardMune'id='rm6'>中秋大福利</div>");
    }


    $(div).html(arr.join(""));
    arr = null;
    $("#rewardwrapper").append(div);

    var heroEquipSwiper = new Swiper('#rewardSwiper', {
        mode: 'vertical',
        slidesPerSlide: 6
    });

    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#heroEquip").remove();
            $("#mask").hide();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    });

    $("#RechargeBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        loadRecharge();
        //showTextMess("充值暂未开启", 2);
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })

    //CheckReward(6)
    if (arguments[0]) {
        CheckReward(arguments[0]);
    } else {
        if (nowActivity.fallStatu) {
            CheckReward(6);
            return;
        }
        if (nowActivity.godStatu)
            CheckReward(5);
        else
            CheckReward(0);
    }
    
}

var CheckReward = function (index) {
    $(".rewardMuneShow").removeClass("rewardMuneShow");
    $("#rewardClick").remove();

    switch (index) {
        case 0:
            $("#rm0").addClass("rewardMuneShow");
            $("#rm0").html("<div id='rewardClick'></div>冲级拿大奖");
            if (CjRewardData.resert == 1)
                LoadCJReward();
            else
                window.GameMainClass.sendRequestJson(177, '', "LoadCJReward");
            $("#goldGoldBg").remove();
            $("#fallDiv").remove();
            break;
        case 1:
            $("#rm1").addClass("rewardMuneShow");
            $("#rm1").html("<div id='rewardClick'></div>首充奖励");
            if (ScRewardData.data.resert)
                LoadSCReward();
            else
                window.GameMainClass.sendRequestJson(179, '', "LoadSCReward");
            $("#goldGoldBg").remove();
            $("#fallDiv").remove();
            break;
        case 2:
            $("#rm2").addClass("rewardMuneShow");
            $("#rm2").html("<div id='rewardClick'></div>累充奖励");
            //LoadLCReward()
            //return;
            if (LcRewardData.resert)
                LoadLCReward();
            else
                window.GameMainClass.sendRequestJson(181, '', "LoadLCReward");
            $("#goldGoldBg").remove();
            $("#fallDiv").remove();
            break;
        case 4:
            $("#rm4").addClass("rewardMuneShow");
            $("#rm4").html("<div id='rewardClick'></div>封测奖励");
            if (FcReward.resert)
                LoadFcReward();
            else
                window.GameMainClass.sendRequestJson(191, '', "LoadFcReward");
            $("#goldGoldBg").remove();
            $("#fallDiv").remove();
            break;
        case 5:
            $("#rm5").addClass("rewardMuneShow");
            $("#rm5").html("<div id='rewardClick'></div>财神来了");
            LoadGoldGod();
            $("#fallDiv").remove();
            break;
        case 6:
            $("#rm6").addClass("rewardMuneShow");
            $("#rm6").html("<div id='rewardClick'></div>中秋大福利");
            LoadFallReward();
            $("#goldGoldBg").remove();
            break;
    }
}

var CjRewardData =
{
    "data": [
      { "lv": 5, "status": 2, "str": "VIP1礼盒+1、银币+1W" },
      { "lv": 10, "status": 1, "str": "VIP2礼盒+1、萌币+50" },
      { "lv": 20, "status": 1, "str": "萌币+100、银币+5W" },
      { "lv": 30, "status": 0, "str": "萌币+150、银币+10W" },
      { "lv": 40, "status": 0, "str": "萌币+300、银币+20W" }], "resert": 0
};

var ScRewardData = { "data": { "resert": 0, "status": 2, "rewardtype": "1,2,2", "rewardid": "200,1701,9003", "rewardnum": "88888,1,1" } };

//加载冲级奖励
var LoadCJReward = function (json) {
    if (json != null)
        CjRewardData = JSON.parse(json);

    $("#rewardInfo").html("<div class='swiper-container' style='width:480px;height:330px;' id='CjRewardSwiper'><div class='swiper-wrapper' id='CjReward_wrapper'></div></div>");

    var len = 0, page = 0;
    var hisindex = -1, warindex = 0;
    div = document.createElement("div");
    var ss = "";
    div.className = "swiper-slide";
    div.id = "cj" + page;
    $("#CjReward_wrapper").append(div);
    var index = 0;
    for (var i = 0; i < CjRewardData.data.length; i++) {
        div = document.createElement("div");
        div.className = 'RewardItem';
        div.id = "cjItem" + i;
        $("#cj" + page).append(div);

        div = document.createElement("div");
        div.className = "lv";
        $(div).html(CjRewardData.data[i].lv + "级");
        $("#cjItem" + i).append(div);

        div = document.createElement("div");
        div.className = "icon";
        $(div).css({ "left": 110, "font-size": "17px" });
        $(div).html(CjRewardData.data[i].str);
        $("#cjItem" + i).append(div);

        if (CjRewardData.data[i].vip > 0) {
            div = document.createElement("div");
            div.className = "vip";
            $(div).css({ "background-position": "0 -" + ((CjRewardData.data[i].vip - 1) * 30) + "px" });
            $("#cjItem" + i).append(div);
        }

        div = document.createElement("div");
        switch (CjRewardData.data[i].status) {
            case 0: //不可领
                div.className = "abtn";
                $(div).css({ "position": "absolute", "left": 384, "top": 17 });
                $(div).html("<div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div>");
                break;
            case 1: //未领取
                div.className = "LvUpBtn";
                $(div).css({ "display": "block", "right": 6, "bottom": 14 });
                $(div).html("<div id='cjRwardBtn" + i + "' ontouchmove='move();' ontouchstart='begin();window.GameMainClass.playEffectSound('close');$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchend='if (!cancel()) {window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });GetCjRewardSubmit(" + i + ");}' class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div>");
                break;
            case 2: //已领取
                div.className = "StateLabel";
                $(div).css({ "left": 392 });
                $(div).css({ "background": "url(res/message/btn.png) no-repeat" });
                break;
        }
        $("#cjItem" + i).append(div);

        len++;
        if (len == 4) {
            if (i < CjRewardData.data.length - 1) {
                len = 0;
                page += 1;
                div = document.createElement("div");
                div.className = "swiper-slide";
                div.id = "cj" + page;
                $("#CjReward_wrapper").append(div);
            }
        }
    }

    var battleSwiper2 = new Swiper('#CjRewardSwiper', {
        mode: "vertical",
        followFinger: 1,
        speed: 500
    });
}

//冲级奖励领取提交
var GetCjRewardSubmit = function (index) {
    window.GameMainClass.sendRequestJson(178, '{"lv":' + CjRewardData.data[index].lv + ',"index":' + index + '}', "CjRewardResult");
}
//冲级奖励领取结果
var CjRewardResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert) {
        //改变状态
        CjRewardData.data[BackJson.Client[0].index].status = 2;
        $("#cjRwardBtn" + BackJson.Client[0].index).remove();
        var div = document.createElement("div");
        div.className = "StateLabel";
        $(div).css({ "left": 392 });
        $(div).css({ "background": "url(res/message/btn.png) no-repeat" });
        $("#cjItem" + BackJson.Client[0].index).append(div);


        //加物品
        if (BackJson.data.length > 0) {
            iGetReward(BackJson);
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//加载首充奖励
var LoadSCReward = function (json) {
    if (json != null) {
        ScRewardData = JSON.parse(json);
    }
    var str = new Array();
    str.push("<img src='res/reward/sc.png' style='position:absolute;left:-50px;top:-5px;' alt='' />");
    str.push("<div class='RewardItem ScItem' id='ScRewardItem' style='top:247px;'>");
    var rlist = ScRewardData.data.rewardtype.split(",");
    for (var i = 0; i < rlist.length; i++) {
        switch (Number(rlist[i])) {
            case 2:
                str.push("<div class='icon' style='background:url(res/ward/a1.png) no-repeat;'>");
                //获取武将数据
                for (var j = 0; j < localHeroJson.data.length; j++) {
                    if (localHeroJson.data[j].gid == Number(ScRewardData.data.rewardid.split(",")[i])) {
                        str.push("<font style='color:" + getColor(String(localHeroJson.data[j].q)) + ";'>" + localHeroJson.data[j].name + "×" + ScRewardData.data.rewardnum.split(",")[i] + "</font>");
                        break;
                    }
                }
                str.push("</div>");
                break;
            case 1:
                str.push("<div class='icon' style='background:url(res/ward/" + ScRewardData.data.rewardid.split(",")[i] + ".png) no-repeat;'>×" + ScRewardData.data.rewardnum.split(",")[i] + "</font></div>");
                break;
        }
    }
    switch (ScRewardData.data.status) {
        case 0: //不可领
            str.push("<div class='abtn' style='position:absolute;left:384px;top:17px;'><div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div></div>");
            break;
        case 1: //未领取
            str.push("<div id='ScRewardBtn'  ontouchstart='begin();window.GameMainClass.playEffectSound('close');$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchend='if (!cancel()) {window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });ScRewardSubmit();}' class='LvUpBtn' style='display:block;right:6px;bottom:14px;'><div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div></div>");
            break;
        case 2: //已领取
            str.push("<div class='StateLabel' style='left:392px;background:url(res/message/btn.png) no-repeat;'></div>");
            break;
    }
    str.push("</div>");
    $("#rewardInfo").html(str.join(""));
}

//领取首充奖励
var ScRewardSubmit = function () {
    window.GameMainClass.sendRequestJson(180, '', "ScRewardResult");
}

//领取首充奖励结果
var ScRewardResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert) {
        ScRewardData.data.status = 2;
        iGetReward(BackJson);
        $("#ScRewardBtn").remove();

        var div = document.createElement("div");
        div.className = 'StateLabel';
        $(div).css({ "left": 392, "background": "url(res/message/btn.png) no-repeat" });
        $("#ScRewardItem").append(div);

        nowActivity.fristStatu = false;
        $("#FristIcon").remove();
        $("#iconRT").append("<div id='TotleIcon' style='background-image:url(res/city/icon/Totle.png);' class='iconItem_RT'></div>");
        $("#TotleIcon").bind("touchend", function () {
            $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            showRewardDialog(2);
            window.GameMainClass.playEffectSound("icon");
        }).bind("touchmove", function () {
            move();
            $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
        }).bind("touchstart", function () {
            begin();
            $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(1.2)" });
        })

    }
    showTextMess(BackJson.info, BackJson.resert);
}

//累充数据
var LcRewardData =
{
    "data": [
      { "amount": 50, "id": "9002,8002", "num": "1,1", "status": 2, "type": "2,3", "vip": 3 },
      { "amount": 100, "id": "9002,8003", "num": "2,1", "status": 2, "type": "2,3", "vip": 4 },
      { "amount": 200, "id": "1302,9002", "num": "1,3", "status": 2, "type": "2,2", "vip": 0 },
      { "amount": 500, "id": "1062,9002,8004", "num": "1,5,1", "status": 2, "type": "2,2,3", "vip": 5 },
      { "amount": 1000, "id": "1685,9003,8005", "num": "1,1,1", "status": 2, "type": "2,2,3", "vip": 6 },
      { "amount": 1500, "id": "3000,9003", "num": "1,2", "status": 2, "type": "2,2", "vip": 0 },
      { "amount": 2000, "id": "3020,9003,8006", "num": "1,3,1", "status": 2, "type": "2,2,3", "vip": 7 },
      { "amount": 3500, "id": "3020,9003,8007", "num": "1,4,1", "status": 2, "type": "2,2,3", "vip": 8 },
      { "amount": 4000, "id": "3020,9003", "num": "1,5", "status": 2, "type": "2,2", "vip": 0 },
      { "amount": 5000, "id": "3020,9003,8008", "num": "1,6,1", "status": 2, "type": "2,2,3", "vip": 9 },
      { "amount": 6000, "id": "3020,9003,8009", "num": "1,7,1", "status": 2, "type": "2,2,3", "vip": 10 }],
    "paid": 90000, "resert": 0
};

//加载累充奖励
var LoadLCReward = function (json) {
    if (json != null)
        LcRewardData = JSON.parse(json);
    var str = new Array();
    $("#rewardInfo").html("<div id='leichongAll'>累计充值:<font id='leichongMoney' style='color:#26E50E;'>" + LcRewardData.paid + "</font></div><div class='swiper-container' style='width:480px;height:330px;' id='CjRewardSwiper'><div class='swiper-wrapper' id='CjReward_wrapper'></div></div>");

    var len = 0, page = 0;
    var hisindex = -1, warindex = 0;
    div = document.createElement("div");
    var ss = "";
    div.className = "swiper-slide  battle-slide";
    div.id = "cj" + page;
    $("#CjReward_wrapper").append(div);
    var templist;
    var index = 0;
    for (var i = 0; i < LcRewardData.data.length; i++) {
        div = document.createElement("div");
        div.className = 'RewardItem LcItem';
        div.id = "cjItem" + i;
        $(div).css({ "background": "url(res/reward/bg.png)", "height": "104px", "margin-bottom": "6px" });
        $("#cj" + page).append(div);

        //充值金额
        div = document.createElement("div");
        div.className = "amount";
        $(div).html(LcRewardData.data[i].amount + "元");
        $("#cjItem" + i).append(div);

        if (LcRewardData.data[i].vip > 0) {
            div = document.createElement("div");
            div.className = "vip";
            $(div).css({"top":"65px", "background-position": "0 -" + ((LcRewardData.data[i].vip - 1) * 30) + "px" });
            //$(div).html("<div class='gift'></div>");
            $("#cjItem" + i).append(div);
        }


        templist = LcRewardData.data[i].type.split(",");
        for (var j = 0; j < templist.length; j++) {
            switch (Number(templist[j])) {
                case 1: //消耗品
                    div = document.createElement("div");
                    div.className = "icon";
                    $(div).css({"top":31,"left":138})
                    $(div).css({ "background": "url(res/ward/" + LcRewardData.data[i].id.split(",")[j] + ".png) no-repeat" });
                    $(div).html("×" + LcRewardData.data[i].num.split(",")[j]);
                    $("#cjItem" + i).append(div);
                    break;
                case 2: //武将
                    //获取武将数据
                    for (var m = 0; m < localHeroJson.data.length; m++) {
                        if (localHeroJson.data[m].gid == Number(LcRewardData.data[i].id.split(",")[j])) {
                            div = document.createElement("div");
                            div.className = "icon";
                            $(div).css({ "width": "78px", "height": "78px", "left": 84, "top": 11, "margin-right": -36 })
                            $(div).append("<div gid=" + localHeroJson.data[m].gid + " style='top:1px;left:0px;background-image:url(res/head/headBg.png)' class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='if(cancel()) return;showHeroDetailNormal(this.getAttribute(\"gid\"))'><img class='heroHeadColor' style='z-index:2;left:0px' src='res/head/" + localHeroJson.data[m].q + ".png' ></img><img style='z-index:1;left:0px' class='heroHead' src='res/head/" + localHeroJson.data[m].ImgID + ".png'></img><div class='bagNum' style='z-index:1;color:#26E50E;right:7px;bottom:-2px;'>" + LcRewardData.data[i].num.split(",")[j] + "</div></div>");
                            //$(div).html("<font style='color:" + getColor(String(localHeroJson.data[m].q)) + ";'>" + localHeroJson.data[m].name + "×" + LcRewardData.data[i].num.split(",")[j] + "</font>");
                            $("#cjItem" + i).append(div);
                            break;
                        }
                    }
                    break;
                case 3: //物品
                    for (var m = 0; m < GoodsJson.data.length; m++) {
                        if (GoodsJson.data[m].ItemID == Number(LcRewardData.data[i].id.split(",")[j])) {
                            div = document.createElement("div");
                            div.className = "icon";
                            $(div).css({ "width": "78px", "height": "78px", "left": 84, "top": 11, "margin-right": -36 })
                            $(div).append("<div itemid=" + GoodsJson.data[m].ItemID + " class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='if(cancel()) return;showLocalNormalGoodDetail(this.getAttribute(\"itemid\"))' style='background-image:url(res/head/headBg.png)'><div class='bagHeadColor' style='background-image:url(res/head/" + GoodsJson.data[m].Q + ".png)'></div><div class='bagHead'  style='background-image:url(res/goods/" + GoodsJson.data[m].ImgID + ".png)'></div><div class='bagNum' style='z-index:1;color:#26E50E;right:7px;bottom:-2px;'>" + LcRewardData.data[i].num.split(",")[j] + "</div></div>");
                            $("#cjItem" + i).append(div);
                            break;
                        }
                    }
                    break;
            }
        }

        div = document.createElement("div");
        switch (LcRewardData.data[i].status) {
            case 0: //不可领
                div.className = "abtn";
                $(div).css({ "position": "absolute", "left": 384, "bottom": 33 });
                $(div).html("<div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div>");
                break;
            case 1: //未领取
                div.className = "LvUpBtn";
                $(div).css({ "display": "block", "right": 6, "bottom": 33 });
                $(div).html("<div id='LcRewardBtn" + i + "'  ontouchstart='begin();window.GameMainClass.playEffectSound('close');$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchend='if (!cancel()) {window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });LcRewardSubmit(" + i + ");}' class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div>");
                break;
            case 2: //已领取
                div.className = "StateLabel";
                $(div).css({ "left": 392,"top":26 });
                $(div).css({ "background": "url(res/message/btn.png) no-repeat" });
                break;
        }
        $("#cjItem" + i).append(div);

        len++;
        if (len == 3) {
            if (i < LcRewardData.data.length - 1) {
                len = 0;
                page += 1;
                div = document.createElement("div");
                div.className = "swiper-slide  battle-slide";
                div.id = "cj" + page;
                $("#CjReward_wrapper").append(div);
            }
        }
    }

    var RewardSwiper2 = new Swiper('#CjRewardSwiper', {
        mode: "vertical",
        followFinger: 1,
        speed: 500
    });
}
//领取累充奖励提交
var LcRewardSubmit = function (index) {
    window.GameMainClass.sendRequestJson(182, '{"amount":' + LcRewardData.data[index].amount + ',"index":' + index + '}', "LcRewardResult");
}
//领取累充奖励结果
var LcRewardResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert) {
        //改变领取状态
        LcRewardData.data[BackJson.Client[0].index].status = 2;

        //添加奖励物品
        iGetReward(BackJson);

        $("#LcRewardBtn" + BackJson.Client[0].index).remove();
        var div = document.createElement("div");
        div.className = "StateLabel";
        $(div).css({ "left": 392 });
        $(div).css({ "background": "url(res/message/btn.png) no-repeat" });
        $("#cjItem" + BackJson.Client[0].index).append(div);
    }
    showTextMess(BackJson.info, BackJson.resert);
}

//封测奖励
var FcReward = {
    "data": [
        { "reward": "8月8日登陆奖励1000萌币", "rwstatus": 0 },
        { "reward": "8月9日登陆奖励1000萌币", "rwstatus": 0 },
        { "reward": "8月10日登陆奖励1000萌币", "rwstatus": 2 },
        { "reward": "8月11日登陆奖励1000萌币", "rwstatus": 0 },
        { "reward": "8月12日登陆奖励1500萌币", "rwstatus": 0 },
        { "reward": "8月13日登陆奖励1500萌币", "rwstatus": 0 },
        { "reward": "8月14日登陆奖励1500萌币", "rwstatus": 0 },
        { "reward": "8月15日登陆奖励1500萌币", "rwstatus": 0 },
        { "reward": "8月16日登陆奖励2000萌币", "rwstatus": 0 },
        { "reward": "8月17日登陆奖励2000萌币", "rwstatus": 0 }
    ], "resert": 0
};

var LoadFcReward = function (json) {
    if (json != null)
        FcReward = JSON.parse(json);
    $("#rewardInfo").html("<div class='swiper-container' style='width:480px;height:330px;' id='CjRewardSwiper'><div class='swiper-wrapper' id='CjReward_wrapper'></div></div>");

    var len = 0, page = 0;
    var hisindex = -1, warindex = 0;
    div = document.createElement("div");
    var ss = "";
    div.className = "swiper-slide";
    div.id = "cj" + page;
    $("#CjReward_wrapper").append(div);
    var index = 0;
    for (var i = 0; i < FcReward.data.length; i++) {
        div = document.createElement("div");
        div.className = 'RewardItem ScItem';
        div.id = "cjItem" + i;
        $(div).css({ "font-size": 18 });
        $("#cj" + page).append(div);

        div = document.createElement("div");
        div.className = "icon";
        $(div).css({ "background": "url(res/ward/600.png) no-repeat","font-size":"18px" });
        $(div).html(FcReward.data[i].reward);
        $("#cjItem" + i).append(div);

        div = document.createElement("div");
        switch (FcReward.data[i].rwstatus) {
            case 0: //不可领
                div.className = "abtn";
                $(div).css({ "position": "absolute", "left": 384, "top": 17 });
                $(div).html("<div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div>");
                break;
            case 1: //未领取
                div.className = "LvUpBtn";
                $(div).css({ "display": "block", "right": 6, "bottom": 14 });
                $(div).html("<div id='cjRwardBtn" + i + "' ontouchmove='move();' ontouchstart='begin();window.GameMainClass.playEffectSound('close');$(this).css({ \"-webkit-transform\": \"scale(0.8)\" });' ontouchend='if (!cancel()) {window.GameMainClass.playEffectSound(\"icon\");$(this).css({ \"-webkit-transform\": \"scale(1)\" });FcRewardSubmit(" + i + ");}' class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div>");
                break;
            case 2: //已领取
                div.className = "StateLabel";
                $(div).css({ "left": 392 });
                $(div).css({ "background": "url(res/message/btn.png) no-repeat" });
                break;
        }
        $("#cjItem" + i).append(div);

        len++;
        if (len == 4) {
            if (i < FcReward.data.length - 1) {
                len = 0;
                page += 1;
                div = document.createElement("div");
                div.className = "swiper-slide";
                div.id = "cj" + page;
                $("#CjReward_wrapper").append(div);
            }
        }
    }

    var battleSwiper2 = new Swiper('#CjRewardSwiper', {
        mode: "vertical",
        followFinger: 1,
        speed: 500
    });
}
//领取封测奖励提交
var FcRewardSubmit = function (index) {
    window.GameMainClass.sendRequestJson(192, '{"index":' + index + '}', "FcRewardResult");
}
//领取封测奖励结果
var FcRewardResult = function (json) {
    var BackJson = JSON.parse(json);
    if (BackJson.resert) {
        //改变领取状态
        FcReward.data[BackJson.Client[0].index].rwstatus = 2;

        iGetReward(BackJson);

        $("#cjRwardBtn" + BackJson.Client[0].index).remove();
        var div = document.createElement("div");
        div.className = "StateLabel";
        $(div).css({ "left": 392 });
        $(div).css({ "background": "url(res/message/btn.png) no-repeat" });
        $("#cjItem" + BackJson.Client[0].index).append(div);
    }
    showTextMess(BackJson.info, BackJson.resert);
}

var GoldGodJson = null;//  { "data": [{ "msg": "恭喜 <font style='color:#F9F900'>唐小十五</font> 招财获得 <font style='color:#F9F900'>706</font> 萌币" }, { "msg": "恭喜 <font style='color:#F9F900'>唐小十五</font> 招财获得 <font style='color:#F9F900'>706</font> 萌币" }, { "msg": "恭喜 <font style='color:#F9F900'>唐小十五</font> 招财获得 <font style='color:#F9F900'>706</font> 萌币" }, { "msg": "恭喜 <font style='color:#F9F900'>唐小十五</font> 招财获得 <font style='color:#F9F900'>706</font> 萌币" }], "info": "ok", "leftcnt": 5, "lefttime": 426403, "outgold": "582~776", "resert": 1, "rewardgold": 0, "usegold": 388 };
var GoldTime=null;

//财神来了
var LoadGoldGod = function () {
    if (GoldGodJson == null) {
        window.GameMainClass.sendRequestJson(202, "", "setGoldGodJson");
    }
    else {
        showGoldGod();
    }
}

var setGoldGodJson = function (json) {
    GoldGodJson = JSON.parse(json);
    showGoldGod();
}

var showGoldGod = function () {
    $("#goldGoldBg").remove();
    $("#rewardInfo").html("");
    var arr = [];
    arr.push("<div id='goldGoldBg'><div id='godList'>");

    //财神列表
    for (var i = 0; i < GoldGodJson.data.length; i++) {
        arr.push("<span>" + GoldGodJson.data[i].msg + "</span><br/>");
    }
        
    arr.push("</div><div id='nowGod'>目前萌币:<font style='color:#26E50E;'>" + userJson.gold + "</font> 累计奖励:<font style='color:#26E50E;'>" + GoldGodJson.rewardgold + "</font><br/>财神离开时间:<font id='goldGodTime' style='color:#26E50E;'>" + expireTime(GoldGodJson.lefttime) + "</font></div>");
    
    if (GoldGodJson.usegold == 0) {
        arr.push("<div id='myGod'><font style='color:orange;'>已招完</font><br/><font style='color:orange;'>已招完</font></div>");
    }
    else {
        arr.push("<div id='myGod'> <font style='color:orange;'>" + GoldGodJson.usegold + "</font><br/><font style='color:orange;'>" + GoldGodJson.outgold + "</font></div>");
    }

    if (GoldGodJson.leftcnt == 0 || GoldGodJson.lefttime==0) {
        arr.push("<div id='godBtn' style='background-position-y:-78px;'></div>");
    } else {
        arr.push("<div id='godBtn'></div>");
    }
    arr.push("<div id='godTimes'>可招财: <font style='color:#26E50E;'>" + GoldGodJson.leftcnt + "/5</font></div>");

    arr.push("</div>")
    $("#equipDialog").append(arr.join(""));

    if (GoldGodJson.lefttime <= 0) {
        $("#goldGodTime").text(expireTime(GoldGodJson.lefttime));
    }

    if (GoldGodJson.lefttime > 0) {
        if (GoldTime == null) {
            GoldTime = setInterval(function () {
                GoldGodJson.lefttime=GoldGodJson.lefttime-1;
                $("#goldGodTime").text(expireTime(GoldGodJson.lefttime));
                if (GoldGodJson.lefttime == 0) {
                    clearInterval(GoldTime);
                    $("#godBtn").css("background-position-y", "-78px");
                    GoldTime = null;
                }
            }, 1000)
        }
    }

    

    $("#godBtn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        if (GoldGodJson.leftcnt == 0) {
            showTextMess("招财次数不足", 2);
            return;
        }
        if (GoldGodJson.lefttime <= 0) {
            showTextMess("招财活动已结束", 2);
            return;
        }
        window.GameMainClass.sendRequestJson(203, "", "goldGodBack");
    }).bindAnimate();
}
var goldGodBack = function (json) {
    var tempJson = JSON.parse(json);
    //tempJson={"Client":[{"channelid":1000,"amount":100}],"addgold":351,"data":[],"info":"招财成功 萌币+739","outgold":"2363~2870","resert":1,"usegold":1688};
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        GoldGodJson.data = tempJson.data
        updateUserJson("600", tempJson.addgold);
        GoldGodJson.rewardgold += tempJson.addgold;
        GoldGodJson.outgold = tempJson.outgold;
        GoldGodJson.usegold = tempJson.usegold;
        GoldGodJson.leftcnt--;
        showGoldGod();
    }
}

//运营活动
var nowActivity = {
    nowActivityJson: { "actstr": "101,102", "info": "ok", "resert": 1 },
    godStatu: false,
    fristStatu: false,
    fallStatu:false,
    setJson: function (json) {
        nowActivity.nowActivityJson = JSON.parse(json);
        nowActivity.showActivity();
    },
    showActivity: function () {
        var tempData = nowActivity.nowActivityJson.actstr.split(",");
        for (var i = 0; i < tempData.length; i++) {
            switch (tempData[i]) {
                case "101":
                    $("#iconRT").append("<div id='FristIcon' class='iconItem_RT'></div>");
                    nowActivity.fristStatu = true;
                    $("#FristIcon").bind("touchend", function () {
                        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
                        if (cancel())
                            return;
                        showRewardDialog(1);
                        window.GameMainClass.playEffectSound("icon");
                    }).bind("touchmove", function () {
                        move();
                        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
                    }).bind("touchstart", function () {
                        begin();
                        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(1.2)" });
                    })
                    //首冲
                    break;
                case "102":
                    $("#iconRT").append("<div id='GodIcon' class='iconItem_RT'></div>");
                    nowActivity.godStatu = true;
                    $("#GodIcon").bind("touchend", function () {
                        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
                        if (cancel())
                            return;
                        showRewardDialog();
                        window.GameMainClass.playEffectSound("icon");
                    }).bind("touchmove", function () {
                        move();
                        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
                    }).bind("touchstart", function () {
                        begin();
                        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(1.2)" });
                    })
                    //招财
                    break;
                case "103":
                    //十一充值
                    break;
                case "104":
                    //累充
                    $("#iconRT").append("<div id='TotleIcon' style='background-image:url(res/city/icon/Totle.png);' class='iconItem_RT'></div>");
                    $("#TotleIcon").bind("touchend", function () {
                        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
                        if (cancel())
                            return;
                        showRewardDialog(2);
                        window.GameMainClass.playEffectSound("icon");
                    }).bind("touchmove", function () {
                        move();
                        $(this).css({ "background-position-x": "0", "-webkit-transform": "scale(1)" });
                    }).bind("touchstart", function () {
                        begin();
                        $(this).css({ "background-position-x": "-60px", "-webkit-transform": "scale(1.2)" });
                    })
                    break;
                case "105":
                    nowActivity.fallStatu = true;
                    break;
            }
        }
    }
}

var LoadFallReward = function () {
    $("#fallDiv").remove();
    $("#rewardInfo").html("");

    $("#equipDialog").append("<div id='fallDiv'><img src='res/fall/fallBg.png' style='left:3px;position:absolute;' /><div id='fallBtn'></div></div>");

    $("#fallBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        loadFall();
    }).bindAnimate();
}