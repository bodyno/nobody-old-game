/// <reference path="public.js" />
/// <reference path='jquery-1.5.1.min.js' />
/// <reference path="json.js" />

//var vipJson = { "canPR": 1, "paid": 50 };
var vipJson;

var loadVip = function () {
    if (vipJson == null) {
        window.GameMainClass.sendRequestJson(171, "", "setVipJson");
    }
    else {
        vipBase();
    }
}

var goToVip = function (json) {
    vipJson = JSON.parse(json);
    vipBase();
    $("#vipIcon").trigger("touchend");
}

var setVipJson = function (json) {
    vipJson = JSON.parse(json);
    vipBase();
}

var vipBase = function () {
    $("#dialog").html("<div id='arena'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/36.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='ceoDialog'></div><div id='ceoIcon'class='hero_icon hero_icon_select'></div><div id='vipIcon'class='hero_icon'></div><div id='vipMoneyBtn' style='width:91px;' class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>充值</div><div class='btn3'></div></div></div></div>");
    $("#mask").show();
    
    $("#arena").css("top", (height - 480) / 2);
    if (pad)
        $("#arena").css({ "top": ((height - 470 * sp) / 2) / sp });

    //绑定列表图标
    var heroIcon = $(".hero_icon");
    heroIcon.bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        heroIcon.removeClass("hero_icon_select");
        $(this).addClass("hero_icon_select");
        switch ($(this).attr("id")) {
            case "vipIcon":
                showVipLv();
                break;
            case "ceoIcon":
                showVip();
                break;
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })


    //关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            window.GameMainClass.playEffectSound("close");
            $("#dialog").html("");
            $("#mask").hide();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //充值
    $("#vipMoneyBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        loadRecharge();
        window.GameMainClass.playEffectSound("icon");
        //showTextMess("充值暂未开启", 2);
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })

    showVip();
}

var showVip = function () {
    $("#ceoDialog").html("<div id='vipBg'><div id='vip_name'></div><div id='vip_vipLv'></div><div id='vip_lv'>等级:<font style='color: #26E50E;'></font></div><div id='vip_exp'>经验:<font style='color: #26E50E;'></font></div><div id='vip_lead'>统帅:<font style='color: #26E50E;'></font></div><div id='vip_strength'>体力:<font style='color: #26E50E;'></font></div><div id='vip_strengthClick'></div><div id='vip_time'>体力恢复时间:<font style='color: #26E50E;'></font></div><div id='vip_time_info'>(每5分钟回一点)</div></div><div id='vip_reward'><div id='vip_posBox'></div><div id='vip_reward_detail'></div><div id='vipRewardBtn' style='width:91px;' class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div></div></div><div id='vip_pos'><div id='vip_posImg'></div><div id='vip_posContent'></div><div id='vip_posDetail'></div><div id='vip_nowHeroNum'>主公当前声望:<font style='color: #26E50E;'>151651</font></div><div id='vip_pop'>提示:<font style='color: gray;'>官职附加生命,攻击值战斗时才有效果</font></div><div id='vip_btnReward'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>升官发财</div><div class='btn3'></div></div></div></div>");

    //加载数据
    $("#vip_name").text(userJson.nick);
    $("#vip_vipLv").css("background-position-y", -15 * userJson.vip);
    $("#vip_lv>font").text(userJson.lv);

    $("#vip_exp>font").html(userJson.exp + "/" + lvUpJson.data[userJson.lv - 1].exp + "<font style='color:gray;'> (" + parseInt((userJson.exp / lvUpJson.data[userJson.lv - 1].exp) * 100) + "%)</font>");

    $("#vip_lead>font").html(teamJson.usedleader + "/" + userJson.leader);


    $("#vip_strength>font").html(userJson.strength + "/" + userJson.smax);

    var posDetail2;
    if (userJson.position == 1) {
        posDetail2 = { "posid": 1, "name": "士卒", "fame": 0, "coin": 0, "leader": 0, "strength": 0, "hp": 0, "atk": 0, "gold": 0, "wnpiece": 0 };
    }
    else {
        posDetail2 = localPosReward.data[userJson.position - 2];
    }
    var posDetail = localPosReward.data[userJson.position - 1];

    $("#vip_reward_detail").html("萌币:<font style='color: #26E50E;'>" + posDetail.gold + "</font><br>万能将魂:<font style='color: #26E50E;'>" + posDetail.wnpiece + "</font>")

    $("#vip_posDetail").html("统帅上限:<font style='color: #26E50E;'>" + posDetail2.leader + "</font><br>体力上限:<font style='color: #26E50E;'>" + posDetail2.strength + "</font><br>生命提升:<font style='color: #26E50E;'>" + posDetail2.hp + "%</font><br>攻击提升:<font style='color: #26E50E;'>" + posDetail2.atk + "%</font>");

    $("#vip_nowHeroNum>font").text(userJson.fame);

    $("#vip_posImg").css("background-image", "url(res/vip/print/" + userJson.position + ".png)");
    $("#vip_posContent").css("background-position-y", -(userJson.position - 1) * 30);

    $("#vip_time>font").text(expireTime(userJson.stime));

    //领取按钮
    if (vipJson.canPR==0) {
        $("#vipRewardBtn").html("").css({ "background-image": "url(res/message/btn.png)", "width": 73, "height": 58, "bottom": 19, "left": 287 })

    } else {
        $("#vipRewardBtn").bind("touchend", function () {
            if (cancel())
                return;
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (vipJson.canPR == 1) {
                if (userJson.lv >= 5) {
                    window.GameMainClass.playEffectSound("icon");
                    window.GameMainClass.sendRequestJson(172, "", "posRewardBack");
                }
                else {
                    showTextMess("5级开启", 2);
                }
            }

        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })
    }
    
    if (userJson.position == 16)
        $("#vip_btnReward").children().addClass("abtn");

    $("#vip_btnReward").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (userJson.position == 16) {
            showTextMess("您已最高官职,不能再升了!", 1);
            return;
        }
        window.GameMainClass.playEffectSound("icon");
        showPos();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

}

var posRewardBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info);
    }
    else {
        var tempId = tempJson.reward.item.split(",");
        var tempNum = tempJson.reward.num.split(",");
        for (var i = 0; i < tempId.length; i++) {
            updateUserJson(tempId[i], tempNum[i]);
        }
        showGetItemAnimate(tempJson);

        vipJson.canPR = 0;

        $("#vipRewardBtn").html("").css({ "background-image": "url(res/message/btn.png)", "width": 73, "height": 58, "bottom": 19, "left": 287 })
    }
}

var showVipLv = function () {
    $("#ceoDialog").html("<div id='vip_lvBg'><div id='vip_lvContent'></div><div id='vip_lvPen'></div><div id='vip_slide'><div id='vip_slideimg'></div></div><div id='vip_lvNeed'></div><div id='ac_left' style='left:346px;top:145px;'></div><div id='ac_right' style='left:620px;top:145px;'></div><div class='swiper-container vipSwiper'id='vipSwiper' style='width: 304px;height: 312px;left: 172px;'><div class='swiper-wrapper'id='vipWrapper'></div></div><div id='vip_rewardImg'></div></div>");

    $("#vip_lvContent").text("您当前是VIP" + userJson.vip);

    var vipDetail;
    if (userJson.vip == 0) {
        vipDetail = { "money": 1 };
    } else {
        vipDetail = localVipJson.data[userJson.vip];
    }
    
    
    if (userJson.vip == 10) {
        $("#vip_lvPen").text(vipJson.paid + "/????");
        $("#vip_slideimg").css("width", 272);
        $("#vip_lvNeed").html("你已达vip最高上限!");
    }
    else {
        $("#vip_lvPen").text(vipJson.paid + "/" + vipDetail.money);

        $("#vip_lvNeed").html("再充值" + (vipDetail.money - vipJson.paid) * 10 + "萌币( " + (vipDetail.money - vipJson.paid) + "元 )<font style='color:yellow;'> 荣升VIP" + (userJson.vip + 1) + "</font>")

        $("#vip_slideimg").css("width", (vipJson.paid / vipDetail.money) * 272);
    }

    var tempStr = "";
    for (var i = 0; i < localVipJson.data.length; i++) {
        var tempReward = localVipJson.data[i].intro.split(",");
        tempStr = "";

        for (var j = 0; j < tempReward.length; j++) {
            tempStr += "<p class='vip_margin'>" + (j + 1) + "." + tempReward[j] + "</p>";
        }
        $("#vipWrapper").append("<div class='swiper-slide vip-slide'style='position:relative;'><div class='vip_nowVip'><font style='color:#F2E234;'>VIP" + (i + 1) + "</font>享受特权</div><div class='vip_Something1'>" + tempStr + "</div></div>");
    }

    var vipSwiper = new Swiper('#vipSwiper', {
        mode: "horizontal"
    });

    $("#vip_rewardImg").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        showRewardDialog();
    }).bindAnimate();
}

var showPos = function () {
    $("#dialog").html("<div id='arena'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/35.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='ceoDialog'><div id='posBg'><div id='pos1Img'></div><div id='pos1Content'></div><div id='pos1Detail'></div><div id='pos1Fame'></div><div id='pos1NeedFame'></div><div id='pos1Coin'></div><div id='pos2Img'></div><div id='pos2Content'></div><div id='pos2Detail'></div><div id='pos2Fame'></div><div id='pos2NeedFame'></div><div id='pos2Coin'></div></div></div><div id='posIcon'class='hero_icon hero_icon_select'></div><div id='posUpBtn'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>升官</div><div class='btn3'></div></div></div></div>");

    $("#mask").show();

    $("#arena").css("top", (height - 480) / 2);
    if (pad)
        $("#arena").css({ "top": ((height - 470 * sp) / 2) / sp });


    //加载数据
    $("#pos1Img").css("background-image", "url(res/vip/print/" + userJson.position + ".png)");
    $("#pos2Img").css("background-image", "url(res/vip/print/" + (userJson.position+1) + ".png)");
    $("#pos1Content").css("background-position-y", -(userJson.position - 1) * 30);
    $("#pos2Content").css("background-position-y", -userJson.position * 30);

    if (userJson.position == 1) {
        var posPrev = { "fame": 0, "coin": 0,"leader":0,"strength":0,"hp":0,"atk":0 };
    }
    else
        var posPrev = localPosReward.data[userJson.position - 2];
    var posDetail = localPosReward.data[userJson.position - 1];

    //最后一个
    if (userJson.position == 16) {
        var posNext = { "fame": "已达最高", "coin": "已达最高", "leader": "已达最高", "strength": "已达最高", "hp": "已达最高", "atk": "已达最高" };
    } else {
        var posNext = localPosReward.data[userJson.position];
    }

    $("#pos1Detail").html("统帅上限:<font style='color:#26E50E;'>" + posPrev.leader + "</font><br/>体力上限:<font style='color:#26E50E;'>" + posPrev.strength + "</font><br/>生命提升:<font style='color:#26E50E;'>" + posPrev.hp + "%</font><br/>攻击提升:<font style='color:#26E50E;'>" + posPrev.atk + "%</font>");
    $("#pos2Detail").html("统帅上限:<font style='color:#26E50E;'>" + posDetail.leader + "</font><br/>体力上限:<font style='color:#26E50E;'>" + posDetail.strength + "</font><br/>生命提升:<font style='color:#26E50E;'>" + posDetail.hp + "%</font><br/>攻击提升:<font style='color:#26E50E;'>" + posDetail.atk + "%</font>");

    $("#pos1Fame").html("当前声望:<font style='color:#26E50E;'>" + userJson.fame + "</font>");
    $("#pos2Fame").html("当前声望:<font style='color:#26E50E;'>" + userJson.fame + "</font>");
    $("#pos1NeedFame").html("需求声望:<font style='color:#26E50E;'>" + posPrev.fame + "</font>");
    if (userJson.fame < posDetail.fame)
        $("#pos2NeedFame").html("需求声望:<font style='color:red;'>" + posDetail.fame + "</font>");
    else
        $("#pos2NeedFame").html("需求声望:<font style='color:#26E50E;'>" + posDetail.fame + "</font>");
    $("#pos1Coin").html("消耗银币:<font style='color:#26E50E;'>" + posPrev.coin + "</font>");
    if (userJson.coin < posDetail.coin)
        $("#pos2Coin").html("消耗银币:<font style='color:red;'>" + posDetail.coin + "</font>");
    else
        $("#pos2Coin").html("消耗银币:<font style='color:#26E50E;'>" + posDetail.coin + "</font>");

    $("#posUpBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (userJson.coin < posDetail.coin) {
            showTextMess("银币不足", 2);
            return;
        }
        if (userJson.fame < localPosReward.data[userJson.position - 1].fame) {
            showTextMess("声望不足", 2);
            return;
        }
        window.GameMainClass.sendRequestJson(158, "", "posUpBack");
    }).bindAnimate();


    //关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            window.GameMainClass.playEffectSound("close");
            $("#dialog").html("");
            $("#mask").hide();
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })
}

var posUpBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess("升级官职成功!", 1);
        updateUserJson("200", 0 - tempJson.cutcoin);
        userJson.position++;

        $("#u_position").css("background-position-x", -(userJson.position - 1) * 36);
        var lastLead = userJson.position >= 3 ? localPosReward.data[(userJson.position - 3)].leader : 0;
        userJson.leader += localPosReward.data[(userJson.position - 2)].leader - lastLead;
        $("#flagData1").text(teamJson.usedleader + "/" + userJson.leader);
        
        if (userJson.strength == userJson.smax )
            userJson.stime = 300;
        var lastStrength = userJson.position >= 3 ? localPosReward.data[(userJson.position - 3)].strength : 0;
        userJson.smax += localPosReward.data[(userJson.position - 2)].strength-lastStrength;
        var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? 122 : parseInt((userJson.strength / userJson.smax) * 122);
        $("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");

        //加载数据
        $("#pos1Img").css("background-image", "url(res/vip/print/" + userJson.position + ".png)");
        $("#pos2Img").css("background-image", "url(res/vip/print/" + (userJson.position + 1) + ".png)");
        $("#pos1Content").css("background-position-y", -(userJson.position - 1) * 30);
        $("#pos2Content").css("background-position-y", -userJson.position * 30);

        var posPrev = localPosReward.data[userJson.position - 2];
        var posDetail = localPosReward.data[userJson.position - 1];

        $("#pos1Detail").html("统帅上限:<font style='color:#26E50E;'>" + posPrev.leader + "</font><br/>体力上限:<font style='color:#26E50E;'>" + posPrev.strength + "</font><br/>生命上限:<font style='color:#26E50E;'>" + posPrev.hp + "%</font><br/>攻击提升:<font style='color:#26E50E;'>" + posPrev.atk + "%</font>");
        $("#pos2Detail").html("统帅上限:<font style='color:#26E50E;'>" + posDetail.leader + "</font><br/>体力上限:<font style='color:#26E50E;'>" + posDetail.strength + "</font><br/>生命上限:<font style='color:#26E50E;'>" + posDetail.hp + "%</font><br/>攻击提升:<font style='color:#26E50E;'>" + posDetail.atk + "%</font>");

        $("#pos1NeedFame").html("需求声望:<font style='color:#26E50E;'>" + posPrev.fame + "</font>");
        if (userJson.fame < posDetail.fame)
            $("#pos2NeedFame").html("需求声望:<font style='color:red;'>" + posDetail.fame + "</font>");
        else
            $("#pos2NeedFame").html("需求声望:<font style='color:#26E50E;'>" + posDetail.fame + "</font>");
        $("#pos1Coin").html("消耗银币:<font style='color:#26E50E;'>" + posPrev.coin + "</font>");
        if(userJson.coin<posDetail.coin)
            $("#pos2Coin").html("消耗银币:<font style='color:red;'>" + posDetail.coin + "</font>");
        else
            $("#pos2Coin").html("消耗银币:<font style='color:#26E50E;'>" + posDetail.coin + "</font>");
    }
}