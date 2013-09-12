/// <reference path="refine.js" />
/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="json.js" />
/// <reference path="heroEquip.js" />

//var shopJson = {"Client":[{"content":"hello"}],"data":[{"cutid":600,"cutnum":4888,"itemid":8150,"left":3,"num":1,"show":2,"yuanjia":6400},{"cutid":600,"cutnum":4500,"itemid":8151,"left":725516,"num":1,"show":2,"yuanjia":6400},{"cutid":600,"cutnum":4500,"itemid":8152,"left":811916,"num":1,"show":2,"yuanjia":6400},{"cutid":600,"cutnum":9888,"itemid":8153,"left":898316,"num":1,"show":2,"yuanjia":12100},{"cutid":600,"cutnum":400,"itemid":2004,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":400,"itemid":2015,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":400,"itemid":2026,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":400,"itemid":2037,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":400,"itemid":2048,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":400,"itemid":2059,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":400,"itemid":2070,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":30,"itemid":2002,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":30,"itemid":2013,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":30,"itemid":2024,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":30,"itemid":2035,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":30,"itemid":2046,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":30,"itemid":2057,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":600,"cutnum":30,"itemid":2068,"left":0,"num":1,"show":1,"yuanjia":0},{"cutid":200,"cutnum":5000,"itemid":1001,"left":0,"num":1,"show":3,"yuanjia":0},{"cutid":200,"cutnum":5000,"itemid":1002,"left":0,"num":1,"show":3,"yuanjia":0},{"cutid":200,"cutnum":5000,"itemid":1003,"left":0,"num":1,"show":3,"yuanjia":0},{"cutid":200,"cutnum":5000,"itemid":1004,"left":0,"num":1,"show":3,"yuanjia":0},{"cutid":200,"cutnum":10000,"itemid":1005,"left":0,"num":1,"show":3,"yuanjia":0},{"cutid":200,"cutnum":10000,"itemid":1006,"left":0,"num":1,"show":3,"yuanjia":0},{"cutid":200,"cutnum":10000,"itemid":1007,"left":0,"num":1,"show":3,"yuanjia":0},{"cutid":200,"cutnum":10000,"itemid":1008,"left":0,"num":1,"show":3,"yuanjia":0}],"discount":100}

//var shopEventJson = { "Client": [{ "warid": 1005, "warlv": 3, "mineid": 101 }], "data": [{ "event": "alert('123')", "url": "http://www.play824.com:1089/apk/zjtl/ad001.png" }, { "event": "alert('124')", "url": "http://www.play824.com:1089/apk/zjtl/ad002.png" }], "resert": 1 };
var shopEventJson;

var shopJson;

var shopTime = null;

var shopBase = function () {
    $("#dialog").html("<div id='shop'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='heroPageData'style='bottom:32px;left:104px;'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='shopDialog'></div><div id='shop_server'class='hero_icon hero_icon_select'></div><div id='shop_list'class='hero_icon'></div><div id='shop_coin'class='hero_icon'></div><div id='RechargeBtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>充值</div><div class='btn3'></div></div></div><div id='shopserver_something'style='font-size: 16px;top: 86px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:-6px;position: relative;margin-right: 7px;'/><div style='float:left;'>充值兑换比例,1人民币=10萌币,首次充值有双倍奖励.</div></div><div id='heroequip_something'style='font-size: 16px;top: -310px;left:40px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:-6px;position: relative;margin-right: 7px;'/><div style='float:left;'><font style='color:#26E50E;'>V3</font>商城道具全部<font style='color:#F2E234;font-weight:bold;'>8折</font>优惠.</div></div></div>");
    $("#mask").show();
    $("#shop").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#shop").css({ "top": ((height - 470 * sp) / 2) / sp });
    shopServer();


    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
            window.GameMainClass.playEffectSound("close");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    var heroIcon = $(".hero_icon");
    heroIcon.bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        switch ($(this).attr("id")) {
            case "shop_server":
                shopServer();
                $("#heroPageData,#pagePrevBtn,#pageNextBtn").hide();
                heroIcon.removeClass("hero_icon_select");
                $(this).addClass("hero_icon_select");
                break;
            case "shop_list":
                heroIcon.removeClass("hero_icon_select");
                $("#heroPageData,#pagePrevBtn,#pageNextBtn").show();
                $(this).addClass("hero_icon_select");
                loadShop();
                break;
            case "shop_coin":
                if (userJson.lv < 8) {
                    showTextMess("主公8级开启", 2);
                    return;
                }
                $("#heroPageData,#pagePrevBtn,#pageNextBtn").show();
                loadCoinShop();
                heroIcon.removeClass("hero_icon_select");
                $(this).addClass("hero_icon_select");
                break;
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

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
}

var loadShop = function () {
    window.GameMainClass.sendRequestJson(141, "", "setShopJson");
    //if (shopJson == null) {
    //    window.GameMainClass.sendRequestJson(141, "", "setShopJson");
    //}
    //else {
    //    showShop();
    //}
}

var setShopJson = function (json) {
    shopJson = JSON.parse(json);
    showShop();
}

var shopServer = function () {
    $("#shopDialog").html("<div id='shop_friend'class='shop_item'></div><div id='shop_bag'class='shop_item'></div><div id='shop_ship'class='shop_item'></div><div id='shop_gold'class='shop_item'></div><div id='shop_hero'class='shop_item'></div><div id='shop_strength'class='shop_item'></div><div id='ad1'class='ad'></div><div id='ad2'class='ad'></div>");
    $("#heroPageData,#pagePrevBtn,#pageNextBtn").hide();
    setTitle(18);


    //商城图片
    $("#ad1").css("background-image", "url(" + shopEventJson.data[0].url + ")").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        eval("(" + shopEventJson.data[0].event + ")")();
        //"$(\"#shop_list\").trigger(\"touchend\")"
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
    });
    $("#ad2").css("background-image", "url(" + shopEventJson.data[1].url + ")").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        eval("(" + shopEventJson.data[1].event + ")")();
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
    });


    $("#RechargeBtn").show();

    $("#shopserver_something").show();
    $("#heroequip_something").hide();


    //绑定服务事件
    $(".shop_item").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        switch ($(this).index()) {
            case 0:
                shopBugFriend();
                break;
            case 1:
                shopBugBag();
                break;
            case 2:
                shopFriendDetail();
                break;
            case 3:
                shopGoldDetail();
                break;
            case 4:
                shopBugHero();
                break;
            case 5:
                shopBugStrength();
                break;
        }
    }).bind("touchmove", function () {
        $(this).css("-webkit-transform", "scale(1)");
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css("-webkit-transform", "scale(0.8)");
    })

}

var showShop = function () {
    $("#shopDialog").html("<div class='swiper-container shopSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='shopPage'></div></div></div></div>");

    showShopItem();

    $("#shopserver_something").hide();
    $("#heroequip_something").show();

    

}

//显示商城具体的物品
var showShopItem = function () {

    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < shopJson.data.length; x++) {

        if (shopJson.data[x].cutid != 600)
            continue;

        tempMemoryJson.data.push(shopJson.data[x]);
        tempUseIndex.push(x);
    }


    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + (usePageAll + 1) + "</font></font>");

    showShopGoldPage();

    //倒计时
    if (shopTime == null) {
        shopTime = setInterval(function () {
            for (var i = 0; i < shopJson.data.length; i++) {
                if (shopJson.data[i].show == 2) {
                    if (tempMemoryJson.data[i].left == 0) {

                    } else {
                        tempMemoryJson.data[i].left--;
                        $("#bagItem" + i).find(".goodDetail_valueTime").text("限时:" + expireTime(tempMemoryJson.data[i].left));
                    }
                }
            }
        }, 1000)
    }


    $("#pagePrevBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pagePrevBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //上一页
        if (usePage == 0 && usePageAll > -1) {
            usePage = usePageAll;
        }
        else {
            usePage--;
        }
        showShopGoldPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#pageNextBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //下一页
        if (usePage == usePageAll) {
            usePage = 0;
        }
        else {
            usePage++;
        }
        showShopGoldPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
}

var showShopGoldPage = function () {

    $("#bagPage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var detail = tempMemoryJson.data[i].itemid;

        //此物品的详细信息

        var localDetail;
        var j = 0
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }

        var div = document.createElement("div");
        div.className = "bagItem";
        div.id = "bagItem" + tempUseIndex[i];
        if (tempMemoryJson.data[i].show == 2) {
            div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='shopGoodDetailClick(this)'><div class='bagHeadColor' style='background-image:url(res/head/" + localDetail.Q + ".png);'></div><div class='bagHead' style='background-image:url(res/goods/" + localDetail.ImgID + ".png);'></div></div><div class='goodDetail' style='background-image:url(res/shop/slideBg.png);background-position-y:-234px'><div class='goodDetail_name'></div><div class='goodDetail_value' style='width:140px;'></div><div class='goodDetail_valueTime'></div><div class='goodDetail_cast' style='left:102px;top:37px;'></div></div>";
        } else {
            div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='shopGoodDetailClick(this)'><div class='bagHeadColor' style='background-image:url(res/head/" + localDetail.Q + ".png);'></div><div class='bagHead' style='background-image:url(res/goods/" + localDetail.ImgID + ".png);'></div></div><div class='goodDetail' style='background-image:url(res/shop/slideBg.png);background-position-y:0px'><div class='goodDetail_name'></div><div class='goodDetail_value' style='width:140px;'></div><div class='goodDetail_cast'></div></div>";
        }

        div.setAttribute("itemId", detail);
        div.setAttribute("gold", shopJson.data[tempUseIndex[i]].cutnum);
        div.setAttribute("nick", localDetail.Name);

        $(div).find(".good_gold").text(shopJson.data[tempUseIndex[i]].cutnum);
        if (tempMemoryJson.data[i].show==2) {
            $(div).find(".goodDetail_cast").html("<table style='width:220px;'><tr><td style='color:rgb(207, 206, 206);text-decoration:line-through;'>" + shopJson.data[tempUseIndex[i]].yuanjia + "</td><td style='color:#F2E234;width:76px;'>" + shopJson.data[tempUseIndex[i]].cutnum + "</td><td style='color:#F2E234;width:43px;'>" + parseInt(shopJson.data[tempUseIndex[i]].cutnum * 0.8) + "</td></tr></table>")
            $(div).find(".goodDetail_valueTime").text("限时:" + expireTime(tempMemoryJson.data[i].left));
        } else {
            $(div).find(".goodDetail_cast").html("<font style='color:#F2E234;'>" + shopJson.data[tempUseIndex[i]].cutnum + "</font><br/><font style='color:#F2E234;text-align:center;'>" + parseInt(shopJson.data[tempUseIndex[i]].cutnum * 0.8) + "</font>");
        }

        $(div).find(".goodDetail_name").text(localDetail.Name).css("color", getColor(String(localDetail.Q)));
        switch (localDetail.Type) {
            case 6:
            case 1:
                $(div).find(".goodDetail_value").html("攻击:<font style='color:#F2E234;'>" + localDetail.ATK + "</font>");
                break;
            case 7:
            case 2:
                $(div).find(".goodDetail_value").html("生命:<font style='color:#F2E234;'>" + localDetail.HP + "</font>");
                break;
            case 8:
            case 3:
                $(div).find(".goodDetail_value").html("防御:<font style='color:#F2E234;'>" + localDetail.DEF + "</font>");
                break;
            case 9:
                $(div).find(".goodDetail_value").html("命中:<font style='color:#F2E234;'>" + localDetail.hit + "</font>");
                break;
            case 10:
            case 5:
                $(div).find(".goodDetail_value").html("暴击:<font style='color:#F2E234;'>" + localDetail.baoji + "</font>");
                break;
            case 4:
            case 11:
                $(div).find(".goodDetail_value").html("闪避:<font style='color:#F2E234;'>" + localDetail.miss + "</font>");
                break;
            case 12:
                $(div).find(".goodDetail_value").html("韧性:<font style='color:#F2E234;'>" + localDetail.renxing + "</font>");
                break;
            case 13:
            case 14:
            case 30:
                $(div).find(".goodDetail_value").html(localDetail.detail);
                break;

        }
        $("#bagPage0").append(div);

    }

    //绑定购买事件
    $(".goodDetail").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        shopChooseNum($(this).parent().attr("itemid"), $(this).parent().attr("gold"), $(this).parent().attr("nick"), "gold");
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })
}

//萌币抽奖
var shopGoldDetail = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":4 });
    document.body.appendChild(maskDiv);


    $("#temp").html("<div id='mess'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'><div id='t_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'><div id='lottery_content'>必会出现<font style='color:#26E50E'>2</font>星以上的卡牌<br/>一次抽奖需消耗<font style='color:#26E50E'>280</font>萌币<br/><br/>您现在萌币数是:<font id='lottery_gold'>" + userJson.gold + "</font><br/>您的萌币可进行<font id='lottery_num'>" + Math.floor(userJson.gold / 280) + "</font>次抽奖<br/>十连抽更划算,只需消耗2500萌币<br/><font style='color:#26E50E'>每次抽奖赠送万能碎片一个</font></div></div><div id='onebtn'  style='width:112px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>抽一次</div><div class='btn3'></div></div></div><div id='tenbtn' style='width:112px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>抽十次</div><div class='btn3'></div></div></div></div>");
    $("#mess").css({"z-index":5,"left": (width - 476) / 2, "top": (height - 352) / 2 });

    if (pad) {
        $("#mess").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 352 * sp) / 2 / sp });
        //$(".t_xiawaibian,.t_shangwaibian").css({ "width": 251 });
    }

    //绑定关闭事件
    $("#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

    //抽一次
    $("#onebtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (userJson.gold < 280)
            showTextMess("萌币不足", 2);
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(143, "{\"usualID\":600,\"num\":1}", "showLotteryResult");
    }).bindAnimate();

    //抽十次
    $("#tenbtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (userJson.gold < 2500)
            showTextMess("萌币不足", 2);
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(143, "{\"usualID\":600,\"num\":10}", "showLotteryResult");
    }).bindAnimate();
}

//友情抽奖
var shopFriendDetail = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 4 });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'><div id='t_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'><div id='lottery_content'>每次抽奖需花费<font style='color:#26E50E;'>100</font>点友情点数<br/>您现在的友情点数是:<font id='lottery_gold'>" + userJson.fspoint + "</font><br/>您的友情点可进行<font style='color:#26E50E;'>" + Math.floor(userJson.fspoint / 100) + "</font>次抽奖</div></div><div id='onebtn'  style='width:112px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>抽一次</div><div class='btn3'></div></div></div><div id='tenbtn'  style='width:112px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>抽十次</div><div class='btn3'></div></div></div></div>");
    $("#mess").css({"z-index":5, "left": (width - 476) / 2, "top": (height - 352) / 2 });

    if (pad) $("#mess").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 352 * sp) / 2 / sp });

    //绑定关闭事件
    $("#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

    //抽一次
    $("#onebtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (userJson.fspoint < 100)
            showTextMess("友情点不足", 2);
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(143, "{\"usualID\":700,\"num\":1}", "showLotteryResult");
    }).bindAnimate();

    //抽十次
    $("#tenbtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (userJson.fspoint < 1000)
            showTextMess("友情点不足", 2);
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(143, "{\"usualID\":700,\"num\":10}", "showLotteryResult");
    }).bindAnimate();
}

//抽奖结果
var showLotteryResult = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = {"Client":[{"usualID":600,"num":10}],"cutnum":2500,"data":[{"g":"5052,25,101,华雄,1740,287,6,2,2,0,5334,5000,1,0,25,5052","type":1},{"g":"1702,1,3,小乔,849,620,10,6,3,0,5335,400,1,0,40,1702","type":1},{"g":"5060,1,111,董卓,1275,398,10,1,3,0,5336,400,1,0,40,5060","type":1},{"g":"4015,1","type":2},{"g":"4011,1","type":2},{"g":"5256,25,101,阎圃,800,574,6,6,2,0,5337,5000,1,0,25,5256","type":1},{"g":"5456,25,101,朵思大王,750,581,6,5,2,0,5338,5000,1,0,25,5456","type":1},{"g":"5704,1,111,曹洪,1913,199,18,1,3,0,5339,400,1,0,40,5704","type":1},{"g":"1362,1,3,张辽,910,620,10,4,3,0,5340,400,1,0,40,1362","type":1},{"g":"5602,1,121,周泰,2989,503,18,2,4,0,5341,600,1,0,70,5602","type":1}],"info":"ok","resert":1,"rwItem":"5052,1702,5060,4015,4011,5256,5456,5704,1362,5602","rwNum":"1,1,1,1,1,1,1,1,1,1","rwType":"1,1,1,2,2,1,1,1,1,1"};
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);

        //领奖动画
        $("#temp").html("");

        if (tempJson.Client[0].usualID == 600) {
            showFindHeroAnimate(tempJson);
            //萌币抽奖
            updateUserJson("600", 0 - tempJson.cutnum);
            userJson.wn += tempJson.Client[0].num;
        }
        else {
            showFindHeroAnimate(tempJson,"myFriend");
            //友情抽奖
            updateUserJson("700", 0 - tempJson.cutnum);
        }

        for (var i = 0; i < tempJson.data.length; i++) {
            if (tempJson.data[i].type == 1) {
                heroJson.data.push(tempJson.data[i]);
            }
            else {
                if (pieceJson != null) {
                    var tempFlag = tempJson.data[i].g.split(",");
                    var tempFlag2 = false;
                    for (var x = 0; x < pieceJson.data.length; x++) {
                        var tempSplit=pieceJson.data[i].s.split(",");
                        if (tempSplit[0] == tempFlag[0]) {
                            tempSplit[1] = Number(tempSplit[1]) + Number(tempFlag[1]);
                            pieceJson.data[i].s = tempSplit.join(",");
                            tempFlag2 = true;
                            break;
                        }
                    }

                    if (!tempFlag2) {
                        pieceJson.data.push({ "s": tempJson.data[i].g });
                    }

                }
            }
            
        }
    }
}

//购买背包
var shopBugBag = function (just) {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":"21" });
    document.body.appendChild(maskDiv);

    if (just) {
        $("#tempMask2").css("z-index", 110);
        $("#temp").html("<div id='mess3' style='z-index:120;'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'style='margin-top:5px;'>仓库容量不足<br/>是否花费<font style='color:#26E50E;'>50</font>萌币,增加<font style='color:#26E50E;'>5</font>个仓库容量?</div></div><div id='shopOkBtn' style='width:91px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    }
    else {
        $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>是否花费<font style='color:#26E50E;'>50</font>萌币,增加<font style='color:#26E50E;'>5</font>个仓库容量?</div></div><div id='shopOkBtn' style='width:91px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    }
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

    //绑定事件
    $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask2").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

    //绑定购买事件
    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        //判断萌币是否足够
        if (userJson.gold < 50) {
            showTextMess("萌币不足", 2);
            return;
        }
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(140, "{\"usualID\":102}", "shopBugBagResult");
    }).bindAnimate()
}

//购买背包结果
var shopBugBagResult = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        //扣钱 加数量 关闭
        userJson.pnum += tempJson.num;
        updateUserJson("600", 0 - tempJson.gold);
        $("#temp").html("");
        $("#tempMask2").remove();
    }
}

//购买体力
var shopBugStrength = function (just) {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);
    if (userJson.sleft == 0) {
        if (just) {
            $("#tempMask2").css("z-index", 110);
            $("#temp").html("<div id='mess3' style='z-index:120;'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'style='margin-top:5px;'>体力不足<br/>今日还可购买:<font style='color:#26E50E;'>" + userJson.sleft + "</font>次体力<br/>可购买次数不足,提升VIP等级可以购买更多次</div></div><div id='shopOkBtn'style='width:91px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        }
        else {
            $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>今日还可购买:<font style='color:#26E50E;'>" + userJson.sleft + "</font>次体力<br/>可购买次数不足,提升VIP等级可以购买更多次</div></div><div id='shopOkBtn'style='width:91px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>充值</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        }
    }
    else {
        $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>今日还可购买:<font style='color:#26E50E;'>" + userJson.sleft + "</font>次体力<br/>是否花费<font style='color:#26E50E;'>" + userJson.sbuy + "</font>萌币,购买满当前体力</div></div><div id='shopOkBtn'style='width:91px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    }
    
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });

    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

    //绑定事件
    $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask2").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate();

    //绑定购买事件
    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (userJson.sleft == 0) {
            loadRecharge();
            //showTextMess("充值暂未开启", 2);
            return;
        }
        //判断萌币是否足够
        if (userJson.gold < userJson.sbug) {
            showTextMess("萌币不足", 2);
            return;
        }
        if (userJson.sleft <= 0) {
            showTextMess("对不起,您的体力购买次数不足", 2);
            return;
        }
        if (userJson.strength >= userJson.smax) {
            //showShopPop("购买失败","对不起,您的体力已满,无需购买体力.");
            showTextMess("对不起,您的体力已满,无需购买体力.", 2);
            return;
        }
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(140, "{\"usualID\":500}", "shopBugStrengthResult");
    }).bindAnimate();
}

//购买体力结果
var shopBugStrengthResult = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        //扣钱 加数量 关闭
        userJson.strength = tempJson.num;
        userJson.sbuy = tempJson.sbuy;
        userJson.sleft--;
        var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? 122 : parseInt((userJson.strength / userJson.smax) * 122);
        $("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");
        updateUserJson("600", 0 - tempJson.gold);

        $("#temp").html("");
        $("#tempMask2").remove();
    }
}

//购买好友上限
var shopBugFriend = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>是否花费<font style='color:#26E50E;'>50</font>萌币,增加<font style='color:#26E50E;'>5</font>个好友容量?</div></div><div id='shopOkBtn'style='width:91px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

    //绑定事件
    $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask2").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate()

    //绑定购买事件
    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        //判断萌币是否足够
        if (userJson.gold < 50) {
            showTextMess("萌币不足", 2);
            return;
        }
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(140, "{\"usualID\":104}", "shopBugFriendResult");
    }).bindAnimate()
}

//购买好友结果
var shopBugFriendResult = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        //扣钱 加数量 关闭
        userJson.fnum += 5;
        updateUserJson("600", 0 - tempJson.gold);
        $("#temp").html("");
        $("#tempMask2").remove();
    }
}

//购买武将位
var shopBugHero = function (just) {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);

    if (just) {
        $("#tempMask2").css("z-index", 110);
        $("#temp").html("<div id='mess3' style='z-index:120;'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'style='margin-top:5px;'>武将容量不足<br/>是否花费<font style='color:#26E50E;'>50</font>萌币,增加<font style='color:#26E50E;'>5</font>个武将容量?</div></div><div id='shopOkBtn' style='width:91px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    }
    else {
        $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/31.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>是否花费<font style='color:#26E50E;'>50</font>萌币,增加<font style='color:#26E50E;'>5</font>个武将容量?</div></div><div id='shopOkBtn' style='width:91px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='shopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    }
    $("#mess3").css({ "left": (width - 476) / 2, "top": (height - 279) / 2 });
    if (pad) $("#mess3").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

    //绑定事件
    $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        $("#temp").html("");
        $("#tempMask2").remove();
        window.GameMainClass.playEffectSound("close");
    }).bindAnimate()

    //绑定购买事件
    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        //判断萌币是否足够
        if (userJson.gold < 50) {
            showTextMess("萌币不足", 2);
            return;
        }
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(140, "{\"usualID\":103}", "shopBugHeroResult");
    }).bindAnimate()
}

//购买武将位结果
var shopBugHeroResult = function (json) {
    var tempJson=JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        //扣钱 加数量 关闭
        userJson.gnum += tempJson.num;
        updateUserJson("600", 0 - tempJson.gold);

        $("#temp").html("");
        $("#tempMask2").remove();
    }
}

//商城购买数量
var shopChooseNum = function (itemid, gold, nick,coin) {

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 4 });
    document.body.appendChild(maskDiv);

    switch (coin) {
        case "gold":
            $("#temp").html("<div id='mess'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'><div id='t_titleContext'style='background-image:url(res/public/title/48.png);'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'><div id='goodnick'>" + nick + "</div><div id='goodChooseBg'></div><div id='chooseNumAdd'class='chooseNumBtn'></div><div id='chooseNumNow'>1</div><div id='chooseNumSub'class='chooseNumBtn'></div><div id='chooseNumGold'>花费萌币:<font style='color:#26E50E;'>" + gold + "</font></div><div id='VIPchooseNumGold'>VIP花费萌币:<font style='color:#26E50E;'>" + Math.floor(gold * 0.8) + "</font></div></div><div id='chooseBtn' style='left:190px;width:91px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div></div>");
            break;
        case "coin":
            $("#temp").html("<div id='mess'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'><div id='t_titleContext'style='background-image:url(res/public/title/47.png);'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'><div id='goodnick'>" + nick + "</div><div id='goodChooseBg'></div><div id='chooseNumAdd'class='chooseNumBtn'></div><div id='chooseNumNow'>1</div><div id='chooseNumSub'class='chooseNumBtn'></div><div id='chooseNumGold'style='left:145px;'>花费银币:<font style='color:#26E50E;'>" + gold + "</font></div></div><div id='chooseBtn'style='left:190px;width:91px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div></div>");
            break;
        case "honor":
            $("#temp").html("<div id='mess'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'><div id='t_titleContext'style='background-image:url(res/public/title/49.png);'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'><div id='goodnick'>" + nick + "</div><div id='goodChooseBg'></div><div id='chooseNumAdd'class='chooseNumBtn'></div><div id='chooseNumNow'>1</div><div id='chooseNumSub'class='chooseNumBtn'></div><div id='chooseNumGold'style='left:150px;'>消耗荣誉:<font style='color:#26E50E;'>" + gold + "</font></div></div><div id='chooseBtn'style='left:190px;width:91px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>购买</div><div class='btn3'></div></div></div></div>");
            break;
    }
    
    
    $("#mess").css({"z-index":5, "left": (width - 476) / 2, "top": (height - 352) / 2 });

    if (pad) $("#mess").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 352 * sp) / 2 / sp });

    //绑定事件
    $("#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#temp").html("");
        $("#tempMask").remove();
    }).bindAnimate()

    $("#chooseNumSub").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        var tempText = Number($(this).siblings("#chooseNumNow").text())+1;
        $(this).siblings("#chooseNumNow").text(tempText);

        $(this).siblings("#chooseNumGold").children("font").text(tempText * gold);
        $(this).siblings("#VIPchooseNumGold").children("font").text(parseInt(tempText * gold * 0.8));
    }).bindAnimate()
    
    $("#chooseNumAdd").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        var tempText = Number($(this).siblings("#chooseNumNow").text()) - 1;
        if (tempText == 0)
            return;
        $(this).siblings("#chooseNumNow").text(tempText);

        $(this).siblings("#chooseNumGold").children("font").text(tempText * gold);
        $(this).siblings("#VIPchooseNumGold").children("font").text(parseInt(tempText * gold * 0.8));
    }).bindAnimate()

    //绑定购买事件
    $("#chooseBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        //判断萌币是否足够

        if (itemid == 200) {
            if (userJson.coin < Number($(this).siblings("#chooseNumGold").children("font").text())) {
                showTextMess("银币不足", 2);
                return;
            }
        }
        if (itemid == 600) {
            if(userJson.gold < Number($(this).siblings("#chooseNumGold").children("font").text())) {
                showTextMess("萌币不足", 2);
                return;
            }
        }
        window.GameMainClass.playEffectSound("icon");
        if (coin == "honor")
            window.GameMainClass.sendRequestJson(138, "{\"itemid\":" + itemid + ",\"num\":" + $("#chooseNumNow").text() + "}", "honorBugResert");
        else
            window.GameMainClass.sendRequestJson(142, "{\"itemid\":" + itemid + ",\"num\":" + $("#chooseNumNow").text() + "}", "shopBugResert");
    }).bindAnimate()

}

//购买结果
var shopBugResert = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "itemid": 1004, "num": 1 }], "cutid": 200, "cutnum": 10, "data": [{ "p": "1652,0,1004,1,0,1,0,2,0,20" }], "gold": 0, "info": " 购买碧水杖x1成功！", "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        //showShopPop("购买成功!","购买成功!体力已回满!")

        showTextMess(tempJson.info, 1);

        AddItem(tempJson.data);

        updateUserJson(String(tempJson.cutid), 0-tempJson.cutnum);

        $("#temp").html("");
        $("#tempMask").remove();
    }
}

var loadCoinShop = function () {
    if (shopJson == null) {
        window.GameMainClass.sendRequestJson(141, "", "setCoinShopJson");
    }
    else {
        showCoinShop();
    }
}

var setCoinShopJson = function (json) {
    shopJson = JSON.parse(json);
    showCoinShop();
}

var showCoinShop = function () {
    $("#shopDialog").html("<div class='swiper-container shopSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='shopPage'></div></div></div></div>");

    $("#shopserver_something").hide();
    $("#heroequip_something").hide();


    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < shopJson.data.length; x++) {
        
        if (shopJson.data[x].cutid != 200)
            continue;

        tempMemoryJson.data.push(shopJson.data[x]);
        tempUseIndex.push(x);
    }


    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + (usePageAll + 1) + "</font></font>");

    showShopCoinPage();

    $("#pagePrevBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
    $("#pagePrevBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //上一页
        if (usePage == 0 && usePageAll > -1) {
            usePage = usePageAll;
        }
        else {
            usePage--;
        }
        showShopCoinPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#pageNextBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //下一页
        if (usePage == usePageAll) {
            usePage = 0;
        }
        else {
            usePage++;
        }
        showShopCoinPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
}

var showShopCoinPage = function () {

    $("#bagPage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {


        var div = document.createElement("div");
        div.className = "bagItem";
        div.innerHTML = "<div class='bagHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='shopGoodDetailClick(this)'><div class='bagHeadColor'></div><div class='bagHead'></div></div><div class='goodDetail'style='background-image:url(res/shop/slideBg.png);'><div class='goodDetail_name'></div><div class='goodDetail_value'></div><div class='goodDetail_cast'></div><div class='goodDetail_coin'></div></div>";


        var detail = tempMemoryJson.data[i].itemid;

        //此物品的详细信息

        var localDetail;
        var j = 0;
        for (; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == detail) {
                localDetail = GoodsJson.data[j];
                break;
            }
        }

        div.setAttribute("itemId", detail);
        div.setAttribute("gold", shopJson.data[tempUseIndex[i]].cutnum);
        div.setAttribute("nick", localDetail.Name);

        $(div).find(".bagHeadColor").css("background-image", "url(res/head/" + localDetail.Q + ".png)");
        $(div).find(".bagHead").css("background-image", "url(res/goods/" + localDetail.ImgID + ".png)");

        $(div).find(".good_gold").text(shopJson.data[tempUseIndex[i]].cutnum);
        $(div).find(".goodDetail_coin").html("<font style='color:#F2E234;'>" + shopJson.data[tempUseIndex[i]].cutnum + "</font>");

        $(div).find(".goodDetail_name").text(localDetail.Name).css("color", getColor(String(localDetail.Q)));
        switch (localDetail.Type) {
            case 6:
            case 1:
                $(div).find(".goodDetail_value").html("攻击:<font style='color:#F2E234;'>" + localDetail.ATK + "</font>");
                break;
            case 7:
            case 2:
                $(div).find(".goodDetail_value").html("生命:<font style='color:#F2E234;'>" + localDetail.HP + "</font>");
                break;
            case 8:
            case 3:
                $(div).find(".goodDetail_value").html("防御:<font style='color:#F2E234;'>" + localDetail.DEF + "</font>");
                break;
            case 9:
                $(div).find(".goodDetail_value").html("命中:<font style='color:#F2E234;'>" + localDetail.hit + "</font>");
                break;
            case 10:
            case 5:
                $(div).find(".goodDetail_value").html("暴击:<font style='color:#F2E234;'>" + localDetail.baoji + "</font>");
                break;
            case 4:
            case 11:
                $(div).find(".goodDetail_value").html("闪避:<font style='color:#F2E234;'>" + localDetail.miss + "</font>");
                break;
            case 12:
                $(div).find(".goodDetail_value").html("韧性:<font style='color:#F2E234;'>" + localDetail.renxing + "</font>");
                break;
            case 13:
            case 14:
            case 30:
                $(div).find(".goodDetail_value").html(localDetail.detail);
                break;

        }
        $("#bagPage0").append(div);

    }

    //绑定购买事件
    $(".goodDetail").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        shopChooseNum($(this).parent().attr("itemid"), $(this).parent().attr("gold"), $(this).parent().attr("nick"), "coin");
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })
}

//商城提示
var showShopPop = function (title,content) {

    $("#temp").html("<div id='mess'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'style='width:56px;left:100px;'><div id='t_titleContext'style='background-image:url(res/public/title/31.png);width:56px;'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'><div id='lottery_content'><div id='shopPopTitle'>" + title + "</div>" + content + "</div></div><div id='shopPopCancelBtn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
    $("#mess").css({ "left": (width - 476) / 2, "top": (height - 352) / 2 });

    //绑定事件
    $("#shopPopCancelBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#temp").html("");
        $("#tempMask").remove();
    }).bindAnimate();
}

//商城物品信息
var shopGoodDetail = function (itemid) {

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0" });
    document.body.appendChild(maskDiv);

    var tempDetail;
    for (var i = 0; i < GoodsJson.data.length; i++) {
        if (GoodsJson.data[i].ItemID == itemid) {
            tempDetail = GoodsJson.data[i];
            break;
        }
    }



    var arr = [];

    arr.push("<div id='b_bg'><div id='b_bg_s'></div><div id='b_bg_m'>");
    arr.push("<div class='bagHeadBg'style='background-image:url(res/adv/small.png);position:absolute;left:10px;top:10px'><div class='bagHeadColor' style='background-image:url(res/head/" + tempDetail.Q + ".png)'></div><div class='bagHead' style='background-image:url(res/goods/" + tempDetail.ImgID + ".png)'></div></div>")
    
    arr.push("<div id='b_detail1' style='color:" + getColor(String(tempDetail.Q)) + "'>" + tempDetail.Name + "</div>");
    
    arr.push("<div id='b_detail2'>类型: <font style='color:#F2E234;'>" + getGoodType(tempDetail.Type) + "</font><br/><br/></div>");
    
    if (tempDetail.Type <= 5) {

        arr.push("<div class='b_slide'></div>");

        var tempValue;
        var tempJobDetail;
        switch (tempDetail.Type) {
            case 1:
                tempValue = tempDetail.ATK;
                tempJobDetail = '攻击';
                break;
            case 2:
                tempValue = tempDetail.HP;
                tempJobDetail = '生命';
                break;
            case 3:
                tempValue = tempDetail.DEF;
                tempJobDetail = '防御';
                break;
            case 4:
                tempValue = tempDetail.miss;
                tempJobDetail = '闪避';
                break;
            case 5:
                tempValue = tempDetail.baoji;
                tempJobDetail = '暴击';
                break;
        }

        arr.push("<div id='b_detail3'>强化等级: <font style='color:#F2E234;'>0</font><br/>" + tempJobDetail + ": <font style='color:#F2E234;'>" + tempValue + "</font>");
        arr.push("<br/>职业限定: <font style='color:#F2E234;'>" + getJob(tempDetail.JobNeed) + "</font></div>");
        arr.push("<div class='b_slide'></div>");



        var tempStr = "";
        for (var i = 0; i < 4; i++) {
            if (i <= (tempDetail.HoleNum - 1))
                tempStr += "未镶嵌<br/>"
            else
                tempStr += "<font style='color:gray;'>未开启</font><br/>"
        }

        arr.push("<div id='b_detail4'>" + tempStr + "</div>");
    }
    arr.push("<div class='b_slide'></div>");
    arr.push("<div id='b_detail5'>" + tempDetail.detail + "</div></div><div id='b_bg_x'></div>");
    arr.push("<div id='b_close' class='bossBtn' style='right: 80px;width: 100px;bottom: -23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div></div>");
    
    

    $("body").append(arr.join(""));

    $("#b_close").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#b_bg").remove();
        $("#tempMask").remove();

    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    var tempDiv = $("#b_bg");
    tempDiv.css({ "left": 0, "top": (height - tempDiv.get(0).offsetHeight) / 2 });

    if (pad) tempDiv.css({ "zoom": sp, "top": (height - tempDiv.get(0).offsetHeight * sp) / 2 / sp });

}

//详细信息点击事件
var shopGoodDetailClick = function (ev) {
    if (cancel())
        return;
    shopGoodDetail($(ev).parent().attr("itemid"));
}

//商城点击事件
var setShopEventJson = function (json) {
    shopEventJson = JSON.parse(json);
    for (var i = 0; i < 2; i++) {
        shopEventJson.data[i].event = shopEventJson.data[i].event.replace(/-/gi, "'");
    }
}