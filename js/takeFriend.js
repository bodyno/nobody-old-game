/// <reference path="public.js" />
/// <reference path="jquery-1.5.1.min.js" />
var fighttype = 0; //0为普通战斗，1为世界boss,2为英雄志
var nowwarid = 0;

//var takeFriendJson = { "Client": [{ "warid": 1001, "warlv": 3, "friendid": 10171975 }], "data": [{ "glv": 70, "img": 5550, "isf": 0, "nick": "危茜", "post": 4, "q": 4, "uid": 10151752, "ulv": 48, "work": "7级暴击强化" }, { "glv": 1, "img": 1680, "isf": 0, "nick": "裘璐", "post": 1, "q": 1, "uid": 10160760, "ulv": 28, "work": "1级法攻强化" }, { "glv": 1, "img": 1680, "isf": 0, "nick": "倪娴", "post": 1, "q": 1, "uid": 10168116, "ulv": 1, "work": "1级法攻强化" }, { "glv": 1, "img": 1680, "isf": 0, "nick": "钮裕芬", "post": 1, "q": 1, "uid": 10140403, "ulv": 54, "work": "1级法攻强化" }, { "glv": 1, "img": 1680, "isf": 0, "nick": "乐华保", "post": 1, "q": 1, "uid": 10139740, "ulv": 68, "work": "1级法攻强化" }, { "glv": 1, "img": 1680, "isf": 0, "nick": "DM16", "post": 1, "q": 1, "uid": 10160757, "ulv": 77, "work": "1级法攻强化" }, { "glv": 1, "img": 1680, "isf": 0, "nick": "DM18", "post": 1, "q": 1, "uid": 10150416, "ulv": 79, "work": "1级法攻强化" }, { "glv": 15, "img": 1680, "isf": 0, "nick": "宰 父艺弘", "post": 1, "q": 1, "uid": 10140922, "ulv": 7, "work": "2级法攻强化" }] };
var takeFriendJson;


var loadTake = function () {
    if (takeFriendJson == null) {
        window.GameMainClass.sendRequestJson(169, '{"wartype":' + fighttype + ',"warid":' + nowwarid + '}', "setTakeJson");
    } else {
        showTake();
    }
}

var setTakeJson = function (json) {
    var tempJson = JSON.parse(json);
    switch (tempJson.resert) {
        case 1:
            takeFriendJson = tempJson;
            showTake();
            break;
        case 0:
            showTextMess(tempJson.info, 2);
            break;
        case 20:
            shopBugStrength("just");
            break;
        case 30:
            shopBugHero("just");
            break;
        case 40:
            shopBugBag("just");
            break;
    }
    
}

var showTake = function () {
    
    if (fighttype != 2) {
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "10" });
        document.body.appendChild(maskDiv);
    }

    $("body").append("<div id='bag'style='z-index:100;position:absolute;left:" + (width - 800) / 2 + "px;top:" + (height - 480) / 2 + "px'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/32.png)'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='bagDialog'><div class='swiper-container bagSwiper'><div class='swiper-wrapper'><div class='swiper-slide bag-slide'><div id='bagPage0'class='bagPage'></div></div></div></div></div><div id='hero_icon'class='hero_icon hero_icon_select'></div></div>");

    

    if (pad) $("#bag").css({ "zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": (height - 480 * sp) / 2 / sp });

    //加载协战好友

    for (var i = 0; i < takeFriendJson.data.length; i++) {

        var NowHeroData = takeFriendJson.data[i];

        var heroDiv = document.createElement("div");
        heroDiv.className = "takeChange";
        heroDiv.setAttribute("uid", NowHeroData.uid);

        var arr = new Array();
        arr.push("<div class='heroHeadBg' style='left:5px;top:3px;'><div class='heroHeadColor'></div><div class='heroHead'></div></div><div class='heroChangeDetail' style='background-image:url(res/public/fBg.png);background-position-y:0px'></div>");
        

        var arr2 = new Array();
        arr2.push("<div class='takename' style='color:#F2E234;'>" + NowHeroData.nick + "</div><div class='friendLv'><font style='color:#F2E234;'>" + NowHeroData.ulv + "</font></div>");
        if (NowHeroData.isf) {
            arr2.push("<div class='take_f' style='color:#26E50E;'>小伙伴</div><div class='take_point' style='color:white;'>可获友情点:<font style='color:#26E50E;'>10</font></div>")
        }
        else {
            arr2.push("<div class='take_f' style='color:gray;'>过客</div><div class='take_point' style='color:white;'>可获友情点:<font style='color:#26E50E;'>5</font></div>")
        }
        //官职
        arr2.push("<div class='posSamll' style='background-position-x:");
        arr2.push(getPosSamll(NowHeroData.post));
        arr2.push("px'></div>");
        arr2.push("<div class='heroLv'>");
        arr2.push(getLv(NowHeroData.glv));
        arr2.push("</div><div class='take_skillname'>" + NowHeroData.work + "</div>");

        heroDiv.innerHTML = arr.join("");
        $("#bagPage0").append(heroDiv);

        //加载武将具体信息
        $(heroDiv).find(".heroChangeDetail").html(arr2.join(""));
        $(heroDiv).find(".heroHeadColor").css({ "background-image": "url(res/head/" + NowHeroData.q + ".png)" });
        $(heroDiv).find(".heroHead").css({ "background-image": "url(res/head/" + NowHeroData.img + ".png)" });

    }

    //事件
    $(".heroChangeDetail").bind("touchend", function () {

        if (cancel())
            return;
        if (nowwarid != 0) {
            switch (fighttype) {
                case 0:
                    window.GameMainClass.sendRequestJson(150, '{ "warid": ' + nowwarid + ',"warlv":1,"friendid":' + $(this).parent().attr("uid") + ' }', "canBattle");
                    break;
                case 1:
                    break;
                case 2:
                    window.GameMainClass.sendRequestJson(165, '{"warid":' + nowwarid + ',"warlv":1,"friendid":' + $(this).parent().attr("uid") + '}', "canYxz");
                    break;
            }
        }

        //关闭
        if (fighttype != 2) {
            $("#tempMask").remove();
        }
        $("#bag").remove();
        takeFriendJson = null;
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //关闭事件
    $("#tempClose").bind("touchend", function () {
        if (!cancel()) {

            if (fighttype != 2) {
                $("#tempMask").remove();
            }
            $("#bag").remove();
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

//征战
var canBattle = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        window.GameMainClass.startBattle(150, json, "FightResult");
    }
}

//英雄志
var canYxz = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        window.GameMainClass.startBattle(165, json, "YxzFightResult");
    }
}

//友情结算
var friendEnd = function (NowHeroData,win) {
    
    //NowHeroData = { "nick": "Nobody", "lv": 41, "gid": 5208, "glv": 52, "q": 3, "time": "当前在线", "resert": 1, "info": "ok", "isf": 0 };

    if (fighttype != 2) {
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask2";
        $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":"999" });
        document.body.appendChild(maskDiv);
    }

    

    var heroDiv = document.createElement("div");
    heroDiv.className = "takeChange";
    heroDiv.setAttribute("uid", NowHeroData.uid);
    heroDiv.setAttribute("style", "left:31px;top:8px;");

    if (NowHeroData.isf==0) {
        $("body").append("<div id='mess' style='z-index:999'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'style='left:66px;'><div id='t_titleContext'style='background-image:url(res/public/title/38.png);'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'></div><div id='shopOkBtn' style='width:91px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='shopCancelBtn' style='width:91px;' class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
    }
    else {
        $("body").append("<div id='mess' style='z-index:999'><div id='t_title'><div id='t_titleLeft'></div><div id='t_titleCenter'style='left:66px;'><div id='t_titleContext'style='background-image:url(res/public/title/39.png);'></div></div><div id='t_titleRight'></div></div><div id='t_waikuan'><div class='t_jiao t_shangjiao'></div><div class='t_jiao t_xiajiao'></div><div class='t_jiao t_zuojiao'></div><div class='t_jiao t_youjiao'></div><div class='t_shangwaibian'></div><div class='t_xiawaibian'></div><div class='t_zuowaibian'></div><div class='t_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog'></div><div id='shopOkBtn' style='width:91px;left:200px;' class='ShopBtn' style='left:194px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
    }

    
    $("#mess").css({ "left": (width - 476) / 2, "top": (height - 352) / 2 });

    if (pad) $("#mess").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 352 * sp) / 2 / sp });

    var arr = new Array();
    arr.push("<div class='heroHeadBg' style='left:5px;top:3px;'><div class='heroHeadColor'></div><div class='heroHead'></div></div><div class='heroChangeDetail' style='background-image:url(res/public/fBg.png);background-position-y:0px'></div>");


    var arr2 = new Array();
    arr2.push("<div class='takename' style='color:#F2E234;'>" + NowHeroData.nick + "</div><div class='friendLv'><font style='color:#F2E234;'>" + NowHeroData.lv + "</font></div>");
    if (NowHeroData.isf==1) {
        arr2.push("<div class='take_f' style='color:#26E50E;'>小伙伴</div><div class='friendTime'>" + NowHeroData.time + "</div>");
    }
    else {
        arr2.push("<div class='take_f' style='color:gray;'>过客</div><div class='friendTime'>" + NowHeroData.time + "</div>")
    }
    //官职
    arr2.push("<div class='posSamll' style='background-position-x:");
    arr2.push(getPosSamll(NowHeroData.post));
    arr2.push("px'></div>");
    arr2.push("<div class='heroLv'>");
    arr2.push(getLv(NowHeroData.glv));
    arr2.push("</div>");

    heroDiv.innerHTML = arr.join("");
    $("#tempDialog").append(heroDiv);
    if (NowHeroData.isf == 0) {
        var tempWin = (win == 1 ? 5 : 0);
        $("#tempDialog").append("<div id='takeEndBg'>获得友情点:<font style='color:#26E50E;'>" + tempWin + "</font><br/>当前友情点数:<font style='color:#26E50E;'>" + userJson.fspoint + "</font><br/><font style='color:red;'>他不是您的伙伴,是否添加他为伙伴?</font></div>")
    }
    else {
        var tempWin = (win == 1 ? 10 : 0);
        $("#tempDialog").append("<div id='takeEndBg' style='padding-top:18px;'>获得友情点:<font style='color:#26E50E;'>" + tempWin + "</font><br/>当前友情点数:<font style='color:#26E50E;'>" + userJson.fspoint + "</font></div>");
    }
    

    $(heroDiv).find(".heroChangeDetail").html(arr2.join(""));
    $(heroDiv).find(".heroHeadColor").css({ "background-image": "url(res/head/" + NowHeroData.q + ".png)" });
    $(heroDiv).find(".heroHead").css({ "background-image": "url(res/head/" + NowHeroData.gid + ".png)" });


    //绑定事件
    $("#shopCancelBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#mess").remove();
        $("#tempMask2").remove();
    }).bindAnimate();

    //绑定加好友事件
    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        if (NowHeroData.isf == 0) {
            window.GameMainClass.sendRequestJson(162, "{\"friendid\":" + NowHeroData.uid + "}", "findFriendOk");
        }
        $("#mess").remove();
        $("#tempMask2").remove();
    }).bindAnimate();
}