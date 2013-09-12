/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="public.js" />

var rechargeJson = null; //{ "Client": [{ "warid": 1000, "warlv": 1, "nick": "颛孙霞" }], "data": [{ "gold": 100, "icon": 1, "intro": "无赠送优惠", "rmb": 10, "type": 0 }, { "gold": 300, "icon": 3, "intro": "每日领取100萌币(30天)", "rmb": 30, "type": 1 }, { "gold": 550, "icon": 2, "intro": "赠送萌币10%", "rmb": 50, "type": 0 }, { "gold": 1100, "icon": 3, "intro": "赠送萌币10%", "rmb": 100, "type": 0 }, { "gold": 2300, "icon": 4, "intro": "赠送萌币15%", "rmb": 200, "type": 2 }, { "gold": 6000, "icon": 5, "intro": "赠送萌币20%", "rmb": 500, "type": 0 }, { "gold": 25000, "icon": 6, "intro": "赠送萌币25%", "rmb": 2000, "type": 0 }, { "gold": 62500, "icon": 6, "intro": "赠送萌币25%", "rmb": 5000, "type": 0 }], "info": "ok", "leftdays": 0, "paid": 0, "resert": 1 };

var loadRecharge = function () {
    if (rechargeJson == null) {
        window.GameMainClass.sendRequestJson(199, "", "setRechargeJson");
    }
    else {
        showRecharge();
    }
}

var setRechargeJson = function (json) {
    rechargeJson = JSON.parse(json);
    showRecharge();
}

var showRecharge = function () {
    $("#dialog").html("<div id='bag'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/46.png);'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='bagDialog'><div class='swiper-container bagSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='bagPage'></div></div></div></div><div id='pieceHeroNum'>累计金额:<font id='pieceNowNum'style='color:#26E50E;'>" + rechargeJson.paid + "</font></div></div><div id='rechargeIcon'class='hero_icon hero_icon_select'></div><div id='heroequip_something'style='font-size: 16px;top: 72px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:4px;position: relative;margin-right: 7px;'/><div style='float:left;'>首次充值有双倍萌币奖励。(<font style='color:#26E50E;'>仅限第一次</font>)<br/>30元包月充值不参与首次充值双倍萌币奖励。</div></div><div id='rechargeVipBtn'class='bossBtn'style='width:144px;right:200px;'><div class='btn'><div class='btn1'></div><div class='btn2'>VIP特权</div><div class='btn3'></div></div></div><div id='rechargeBtn'class='bossBtn'style='width:144px;'><div class='btn'><div class='btn1'></div><div class='btn2'>累充奖励</div><div class='btn3'></div></div></div></div>")
    $("#mask").show();

    $("#bag").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#bag").css({ "top": ((height - 470 * sp) / 2) / sp });

    for (var i = 0; i < rechargeJson.data.length; i++) {
        if (rechargeJson.data[i].rmb == 30) {
            $("#bagPage0").append("<div class='bagItem'  money=" + rechargeJson.data[i].rmb + " ontouchstart='begin()' ontouchmove='move' ontouchend='callPay(this)'  style='margin-top:1px;'><div class='bagHead' style='z-index:1;background-image:url(res/recharge/" + rechargeJson.data[i].icon + ".png)'><div class='rechargeSmallIcon' style='background-image:url(res/recharge/i" + rechargeJson.data[i].type + ".png)'></div></div><div class='goodDetail' style='font-weight:normal;background:url(res/recharge/bg.png) no-repeat;'><div class='goodDetail_name' style='color:yellow;top:10px;'>" + rechargeJson.data[i].gold + "萌币</div><div class='goodDetail_value' style='overflow:visible;color:#26E50E;'>" + rechargeJson.data[i].intro + "</div><div class='rechargeMoney'>" + rechargeJson.data[i].rmb + "元</div><div class='rechargeLeft'>可取<font id='rechargeLeftDay' style='color:#26E50E;'>" + rechargeJson.leftdays + "</font>天</div></div></div>");
        } else {
            $("#bagPage0").append("<div class='bagItem'  money=" + rechargeJson.data[i].rmb + " ontouchstart='begin()' ontouchmove='move' ontouchend='callPay(this)'  style='margin-top:1px;'><div class='bagHead' style='z-index:1;background-image:url(res/recharge/" + rechargeJson.data[i].icon + ".png)'><div class='rechargeSmallIcon' style='background-image:url(res/recharge/i" + rechargeJson.data[i].type + ".png)'></div></div><div class='goodDetail' style='font-weight:normal;background:url(res/recharge/bg.png) no-repeat;'><div class='goodDetail_name' style='color:yellow;top:10px;'>" + rechargeJson.data[i].gold + "萌币</div><div class='goodDetail_value' style='overflow:visible;color:#26E50E;'>" + rechargeJson.data[i].intro + "</div><div class='rechargeMoney'>" + rechargeJson.data[i].rmb + "元</div></div></div>");
        }
    }

    //奖励
    $("#rechargeBtn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (!cancel()) {
            window.GameMainClass.playEffectSound("icon");
            showRewardDialog(2);
        }
    }).bindAnimate();

    //VIP
    $("#rechargeVipBtn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (!cancel()) {
            if (vipJson == null) {
                window.GameMainClass.playEffectSound("icon");
                window.GameMainClass.sendRequestJson(171, "", "goToVip");
            } else {
                vipBase();
                $("#vipIcon").trigger("touchend");
            }
        }
    }).bindAnimate();

    //关闭
    $("#close").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
            window.GameMainClass.playEffectSound("close");
        }
    }).bindAnimate();
}

var callPay = function (ev) {
    if (cancel())
        return;
    var tempMoney = Number($(ev).attr("money")) * 100;
    window.GameMainClass.pay(tempMoney);

    window.GameMainClass.sendRequestJson(201, '{"amount":' + tempMoney + '}', "amountBack");
}

var amountBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    } else {
        window.GameMainClass.payOrder(tempJson.Client[0].amount, tempJson.orderno, tempJson.title, tempJson.detail, tempJson.url);
        window.GameMainClass.OnChargeRequest(tempJson.orderno, tempJson.detail, Number(tempJson.Client[0].amount) / 100, "CNY", tempJson.gold, "AliPay");
        rechargeJson.noworderno = tempJson.orderno;
    }
}

var rechargeSuccessBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "amount":100,"gold": 10, "info": "充值1元成功 萌币+10", "resert": 1 };
    if (tempJson.resert != 1) {
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess3'><div id='q_title' style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>" + tempJson.info + "</div></div><div id='shopOkBtn'style='width:91px;left:190px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
        $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
        if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

        //绑定事件
        $("#shopOkBtn,#dialogclose").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            $("#temp").html("");
            $("#tempMask2").remove();
            window.GameMainClass.playEffectSound("close");
        }).bindAnimate();
    }
    else {
        updateUserJson("600", tempJson.gold);

        if (rechargeJson != null) {
            rechargeJson.paid += tempJson.amount / 100;
            $("#pieceNowNum").text(rechargeJson.paid);
        }
        //累充中的
        if (LcRewardData.resert == 1) {
            LcRewardData.resert = 0;
        }
        if (vipJson != null) {
            vipJson.paid += tempJson.amount / 100;
        }

        ScRewardData.data.resert = 0;

        //是否为30天
        if (rechargeJson != null) {
            if (tempJson.amount == 3000) {
                rechargeJson.leftdays = 30;
                $("#rechargeLeftDay").text("30");
            }
        }

        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>" + tempJson.info + "</div></div><div id='shopOkBtn'style='width:91px;left:190px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
        $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
        if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

        if (rechargeJson != null) {
            window.GameMainClass.onChargeSuccess(rechargeJson.noworderno);
        }

        //绑定事件
        $("#shopOkBtn,#dialogclose").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            $("#temp").html("");
            $("#tempMask2").remove();
            window.GameMainClass.playEffectSound("close");
        }).bindAnimate();
    }
}