/// <reference path="public.js" />
/// <reference path="jquery-1.5.1.min.js" />

//中秋活动

var middleJson = { "data": [{ "canswap": 0, "leftsecs": 617713, "name": "中秋1", "objid": "2001", "objnum": "1", "objown": "0,137499", "objtype": "3", "srcid": "3800,200", "srcnum": "5,1000", "srctype": "3,1", "swapid": 101, "swaptype": 1 }, { "canswap": 0, "leftsecs": 617713, "name": "中秋2", "objid": "2023", "objnum": "1", "objown": "0,137499", "objtype": "3", "srcid": "3800,200", "srcnum": "5,1000", "srctype": "3,1", "swapid": 102, "swaptype": 1 }, { "canswap": 0, "leftsecs": 617713, "name": "中秋3", "objid": "2002", "objnum": "1", "objown": "0,137499", "objtype": "3", "srcid": "3800,200", "srcnum": "20,10000", "srctype": "3,1", "swapid": 103, "swaptype": 1 }, { "canswap": 0, "leftsecs": 617713, "name": "中秋4", "objid": "2024", "objnum": "1", "objown": "0,137499", "objtype": "3", "srcid": "3800,200", "srcnum": "20,10000", "srctype": "3,1", "swapid": 104, "swaptype": 1 }], "info": "ok", "resert": 1 };
var middleTime;

var loadFall = function () {
    showFallBase();
}

var setFallJson = function (json) {
    middleJson = JSON.parse(json);
    loadFallDetail();
}

var showFallBase = function () {
    $("#dialog").html("<div id='bag'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/55.png);'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='bagDialog'></div><div id='fallicon1'class='hero_icon hero_icon_select'style='background-image:url(res/fall/fall1.png);'></div><div id='fallicon2'class='hero_icon'style='background-image:url(res/fall/fall2.png);top:167px;'></div><div id='heroequip_something'style='font-size: 16px;top: 86px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:-6px;position: relative;margin-right: 7px;'/><div style='float:left;'>满足全部条件直接点击兑换,每次兑换都会扣除兑换所需物品.</div></div></div>");
    $("#mask").show();
    $("#bag").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#bag").css({ "top": ((height - 470 * sp) / 2) / sp });


    $("#fallicon2").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        $(this).addClass("hero_icon_select");
        $("#fallicon1").removeClass("hero_icon_select");
        showFallShort();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#fallicon1").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        $(this).addClass("hero_icon_select");
        $("#fallicon2").removeClass("hero_icon_select");
        showFallForever();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    showFallForever();
    

    $("#close").bind("touchend", function () {
        if (!cancel()) {
            $("#dialog").html("");
            $("#mask").hide();
            window.GameMainClass.playEffectSound("close");
            clearInterval(middleTime);
            middleTime = null;
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })


    
}

var showFallShort = function () {
    window.GameMainClass.sendRequestJson(210, '', 'setFallJson');
}

var showFallForever = function () {
    window.GameMainClass.sendRequestJson(208, '', 'setFallJson');
}

var loadFallDetail = function () {

    $("#bagDialog").html("");

    $("#fallSwiper").children().html("");

    if (middleJson.data.length == 0) {
        showTextMess("没有此类型活动", 2);
        return;
    }


    $("#bagDialog").append("<div class='swiper-container'id='fallSwiper'><div class='swiper-wrapper'></div></div>");

    for (var i = 0; i < middleJson.data.length; i++) {

        var str = [];
        str.push("<div class='fallTitle'>" + middleJson.data[i].name + "</div>");

        str.push("<div class='fallTime'>" + (middleJson.data[i].leftsecs == 0 ? "长期有效" : "剩余时间: "+expireTime(middleJson.data[i].leftsecs)) + "</div>");

        str.push("<div class='fallRepeat'>" + (middleJson.data[i].swaptype == 1 ? "剩余" + middleJson.data[i].leftnum + "次" : "不限次数") + "</div>");

        str.push("<div id='bagSellBtn' fallid='" + middleJson.data[i].swapid + "' class='bossBtn " + (middleJson.data[i].canswap==0 ? "abtn" : "") + "'style='width:92px;right:20px;'><div class='btn'><div class='btn1'></div><div class='btn2'>兑换</div><div class='btn3'></div></div></div>");

        switch (middleJson.data[i].objtype) {
            case "2":
                var tempHero;
                for (var x = 0; x < localHeroJson.data.length; x++) {
                    if (localHeroJson.data[x].gid == middleJson.data[i].objid) {
                        tempHero = localHeroJson.data[x];
                        break;
                    }
                }
                str.push("<div class='fallObj' sid='" + middleJson.data[i].objid + "' ontouchstart='begin()' ontouchmove='move()' ontouchend='if(cancel()) return;showHeroDetailNormal($(this).attr(\"sid\"))'><img style='position:absolute;' src='res/head/" + tempHero.ImgID + ".png'/><img style='position:absolute;' src='res/head/" + tempHero.q + ".png'/><div class='fallNum'>" + middleJson.data[i].objnum + "</div></div>")
                break;
            case "3":
                var tempGood;
                for (var x = 0; x < GoodsJson.data.length; x++) {
                    if (GoodsJson.data[x].ItemID == middleJson.data[i].objid) {
                        tempGood = GoodsJson.data[x];
                        break;
                    }
                }
                str.push("<div class='fallObj' sid='" + tempGood.ItemID + "' ontouchstart='begin()' ontouchmove='move()' ontouchend='if(cancel()) return;showLocalNormalGoodDetail($(this).attr(\"sid\"))'><div style='background-repeat:no-repeat;background-position:center;width:78px;height:78px;position:absolute;background-image:url(res/goods/" + tempGood.ImgID + ".png);'></div><img style='position:absolute;' src='res/head/" + tempGood.Q + ".png'/><div class='fallNum'>"+middleJson.data[i].objnum+"</div></div>")
                break;
        }

        var tempSrc = middleJson.data[i].srcid.split(",");
        var tempSrcNum = middleJson.data[i].srcnum.split(",");
        var tempSrcType = middleJson.data[i].srctype.split(",");
        var tempSrcOwn = middleJson.data[i].objown.split(",");




        //奖励
        str.push("<div class='fallSrc'>");
        for (var j = 0; j < tempSrc.length; j++) {

            switch (tempSrcType[j]) {
                case "1":
                    str.push("<div class='fallSrcItem'><div style='background:url(res/ward/s" + tempSrc[j] + ".png)  no-repeat center;position:absolute;width:78px;height:78px;'></div><div class='fallNum' style='color:" + (Number(tempSrcOwn[j]) >= Number(tempSrcNum[j]) ? "#26E50E" : "red") + "' >" + tempSrcNum[j] + "</div><div class='canFall' style='background-position-y:" + (Number(tempSrcOwn[j]) >= Number(tempSrcNum[j]) ? "-18px" : "-36px") + "'></div></div>");
                    break;
                case "2":
                    var tempHero;
                    for (var x = 0; x < localHeroJson.data.length; x++) {
                        if (localHeroJson.data[x].gid == tempSrc[j]) {
                            tempHero = localHeroJson.data[x];
                            break;
                        }
                    }
                    str.push("<div class='fallSrcItem' sid='" + tempHero.gid + "' ontouchstart='begin()' ontouchmove='move()' ontouchend='if(cancel()) return;showHeroDetailNormal($(this).attr(\"sid\"))'><img style='position:absolute;' src='res/head/" + tempHero.ImgID + ".png'/><img style='position:absolute;' src='res/head/" + tempHero.q + ".png'/><div class='fallNum' style='color:" + (Number(tempSrcOwn[j]) >= Number(tempSrcNum[j]) ? "#26E50E" : "red") + "' >" + tempSrcOwn[j] + "/" + tempSrcNum[j] + "</div><div class='canFall' style='background-position-y:" + (Number(tempSrcOwn[j]) >= Number(tempSrcNum[j]) ? "-18px" : "-36px") + "'></div></div>");
                    break;
                case "3":
                    var tempGood;
                    for (var x = 0; x < GoodsJson.data.length; x++) {
                        if (GoodsJson.data[x].ItemID == tempSrc[j]) {
                            tempGood = GoodsJson.data[x];
                            break;
                        }
                    }
                    str.push("<div class='fallSrcItem' sid='" + tempGood.ItemID + "' ontouchstart='begin()' ontouchmove='move()' ontouchend='if(cancel()) return;showLocalNormalGoodDetail($(this).attr(\"sid\"))'><div style='background-repeat:no-repeat;background-position:center;width:78px;height:78px;position:absolute;background-image:url(res/goods/" + tempGood.ImgID + ".png);'></div><img style='position:absolute;' src='res/head/" + tempGood.Q + ".png'/><div class='fallNum' style='color:" + (Number(tempSrcOwn[j]) >= Number(tempSrcNum[j]) ? "#26E50E" : "red") + "' >" + tempSrcOwn[j] + "/" + tempSrcNum[j] + "</div><div class='canFall' style='background-position-y:" + (Number(tempSrcOwn[j]) >= Number(tempSrcNum[j]) ? "-18px" : "-36px") + "'></div></div>");
                    break;
            }
        }

        str.push("");

        $("#fallSwiper").children().append("<div class='swiper-slide fall-slide'><div id='fall" + i + "'class='fallBg'>" + str.join("") + "</div></div>")
    }

    clearInterval(middleTime);
    middleTime = setInterval(function () {
        for (var i = 0; i < middleJson.data.length; i++) {
            if (middleJson.data[i].leftsecs > 0) {
                middleJson.data[i].leftsecs--;
                $("#fall" + i + ">.fallTime").text("剩余时间: " + expireTime(middleJson.data[i].leftsecs));
            }
        }
    }, 1000);

    //操作
    $(".bossBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return
        window.GameMainClass.playEffectSound("icon");
        window.GameMainClass.sendRequestJson(209, '{"swapid":' + $(this).attr("fallid") + '}', 'fallOk');
    }).bindAnimate();

    var fallSwiper = new Swiper('#fallSwiper', {
        mode: 'vertical',
        slidesPerSlide: 2
    });
}

//成功
var fallOk = function (json) {
    var tempJson = JSON.parse(json);

    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
        return;
    }

    showTextMess(tempJson.info, 1);

    iGetReward(tempJson);

    //删除
    var tempId=tempJson.cutsid.split(",");
    var tempNum = tempJson.cutnum.split(",");
    var tempType = tempJson.cuttype.split(",");

    for (var i = 0; i < tempId.length; i++) {

        switch (tempType[i]) {
            case "2":
                for (var x = 0; x < heroJson.data.length; x++) {
                    var tempSplit = heroJson.data[x].g.split(",");
                    if (tempSplit[10] == tempId[i]) {
                        heroJson.data.splice(x, 1);
                        break;
                    }
                }
                break;
            case "3":

                for (var x = 0; x < bagJson.data.length; x++) {
                    var tempSplit = bagJson.data[x].p.split(",");
                    if (tempSplit[0] == tempId[i]) {
                        if (tempSplit[5] == tempNum[i]) {
                            bagJson.data.splice(x, 1);
                        } else {
                            tempSplit[5] = Number(tempSplit[5] - tempNum[i]);
                            bagJson.data[x].p = tempSplit.join(",");
                        }
                        break;
                    }
                }
                break;
        }
    }

    if ($("#fallicon1").hasClass("hero_icon_select")) {
        showFallForever();
    } else {
        showFallShort();
    }

    
}