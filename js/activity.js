/// <reference path="public.js" />
/// <reference path="json.js" />

var activityJson;
//var activityJson = {"data":[{"eid":3,"isopen":1},{"eid":4,"isopen":1},{"eid":5,"isopen":1},{"eid":1,"isopen":0},{"eid":2,"isopen":0}],"left":[{"leftNum":1,"warid":1007},{"leftNum":1,"warid":1006},{"leftNum":2,"warid":1005}],"resert":1};

var loadActivity = function () {
    if (activityJson == null) {
        window.GameMainClass.sendRequestJson(173, "", "setActivityJson");
    }
    else {
        showActivity();
    }
}

var setActivityJson = function (json) {
    activityJson = JSON.parse(json);
    showActivity();
}

var showActivity = function () {
    $("#dialog").html("<div id='ac_bg'><div id='ac_Name'></div><div id='ac_left'></div><div id='ac_right'></div><div id='close'style='right:10px;'></div><div class='swiper-container'id='acSwiper'style='top:70px;'><div class='swiper-wrapper'></div></div></div>");
    
    $("#ac_bg").css("top", (height - 460) / 2);
    if (pad)
        $("#ac_bg").css({ "top": ((height - 470 * sp) / 2) / sp });

    $("#mask").show();


    var tempPage = 0;
    //开启状态
    for (var i = 0; i < activityJson.data.length; i++) {
        var EventDetail;
        for (var j = 0; j < localEventJson.data.length; j++) {
            if (localEventJson.data[j].eventid == activityJson.data[i].eid) {
                EventDetail = localEventJson.data[j];
                break;
            }
        }

        if (i % 4 == 0) {
            tempPage++;
            $(".swiper-wrapper").append("<div class='swiper-slide ac-slide'><div class='acPage' id='acPage" + tempPage + "'></div></div>")
        }

        $("#acPage" + tempPage).append("<div class='acSlide' id='ac" + i + "'><div class='acHead'></div><div class='acName'></div><div class='acTime'></div><div class='acDetail'></div><div class='acState'></div>");

        var tempDiv = $("#ac" + i);
        if (activityJson.data[i].eid == 1) {
            if (activityJson.data[i].isopen != 1) {
                tempDiv.css("background-position-y", "-148px");
                tempDiv.children(".acHead").css({ "background-image": "url(res/activity/" + activityJson.data[i].eid + ".png)", "background-position-x": "-78px" });
            }
            else {
                tempDiv.children(".acHead").css({ "background-image": "url(res/activity/" + activityJson.data[i].eid + ".png)", "background-position-x": "0" });
            }
        }
        else {
            if (activityJson.data[i].isopen == 1) {
                tempDiv.children(".acHead").css("background-image", "url(res/activity/" + activityJson.data[i].eid + ".png)");
            } else {
                tempDiv.css("background-position-y", "-148px");
                tempDiv.children(".acHead").css({ "background-image": "url(res/activity/" + activityJson.data[i].eid + ".png)", "background-position-x": "-78px" });
            }
        }

        tempDiv.attr("evenid", activityJson.data[i].eid)
        tempDiv.attr("index", i)
        tempDiv.children(".acName").text(EventDetail.name);
        tempDiv.children(".acTime").text(EventDetail.time);
        tempDiv.children(".acDetail").text(EventDetail.intro);
        if (activityJson.data[i].eid == 1) {
            tempDiv.children(".acState").css("background-position-x", -69 * (activityJson.data[i].isopen - 1));
        }
        else {
            if (activityJson.data[i].isopen) {
                tempDiv.children(".acState").css("background-position-x", "0");
            }
            else {
                tempDiv.children(".acState").css("background-position-x", "-69px");
            }

        }
    }

    $(".acSlide").bind("touchend", function () {
        if (cancel())
            return;
        if ($(this).attr("evenid") == 1) {
            LoadBoss();
            return;
        }
        if ($(this).attr("evenid") == 5) {
            loadUnder();
            return;
        }
        if (!activityJson.data[$(this).attr("index")].isopen)
            return;
        loadActivityDetail($(this).attr("evenid"));
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
    })

    var arenaSwiper = new Swiper('#acSwiper', {
        mode: 'horizontal'
    });

    //绑定关闭事件
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

var loadActivityDetail = function (evenid) {
    

    var json;
    for (var i = 0; i < localEventJson.data.length; i++) {
        if (localEventJson.data[i].eventid == evenid) {
            json = localEventJson.data[i];
            break;
        }
    }

    $("#dialog").html("<div id='ac_bg'><div id='ac_Name'></div><div id='ac_left'></div><div id='ac_right'></div><div id='close'style='right:10px;background-image:url(res/activity/return.png)'></div><div class='swiper-container'id='acSwiper'style='top:70px;'><div class='swiper-wrapper'><div class='swiper-slide ac-slide'><div class='acPage'id='acPage0'><div class='acSlide2'id='ac0'><div class='acHead'></div><div class='acName'></div><div class='acTime'></div><div class='acDetail'></div><div id=''class='bossBtn'style='right: -57px;top: 14px;'><div class='btn'><div class='btn1'></div><div class='btn2'>战</div><div class='btn3'></div></div></div></div><div class='acSlide2'id='ac1'><div class='acHead'></div><div class='acName'></div><div class='acTime'></div><div class='acDetail'></div><div id=''class='bossBtn'style='right: -57px;top: 14px;'><div class='btn'><div class='btn1'></div><div class='btn2'>战</div><div class='btn3'></div></div></div></div><div class='acSlide2'id='ac2'><div class='acHead'></div><div class='acName'></div><div class='acTime'></div><div class='acDetail'></div><div id=''class='bossBtn'style='right: -57px;top: 14px;'><div class='btn'><div class='btn1'></div><div class='btn2'>战</div><div class='btn3'></div></div></div></div></div></div></div></div></div>");

    $("#ac_bg").css("top", (height - 460) / 2);
    if(pad)
        $("#ac_bg").css({ "top": ((height - 470 * sp) / 2) / sp });

    $("#ac_Name").css("background-position-y", -(json.eventid - 1) * 40);

    for (var i = 0; i < json.war.length; i++) {
        var EventDetail;
        var tempDiv = $("#ac" + i);
        tempDiv.show();

        tempDiv.attr("warid", json.war[i].warid);
        tempDiv.children(".acHead").css("background-image", "url(res/activity/" + (json.war[i].icon - 1000) + ".png)");
        tempDiv.children(".acName").text(json.war[i].name + " (" + json.war[i].lv + ")");
        tempDiv.children(".acTime").html("消耗体力:<font style='color:#26E50E;'>" + json.war[i].strength + "</font>");
        tempDiv.children(".acDetail").text(json.war[i].intro);

        if (json.eventid == 4) {
            tempDiv.append("<div class='ac_leftNum'>挑战次数:<font style='color:#26E50E;'>" + activityJson.left[i].leftNum + "</font></div>")
        }
    }

    $(".bossBtn").bind("touchend", function () {
        window.GameMainClass.playEffectSound("icon");
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.sendRequestJson(174, '{"warid":' + $(this).parent().attr("warid") + ',"warlv":1}', "canActivity");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            showActivity();
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

//可以打活动本
var canActivity = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        window.GameMainClass.startBattle(174, json, "fightActivityResert");
    }
}

//活动本结果
var fightActivityResert = function (json) {
    var BackJson = JSON.parse(json);
    //var BackJson = { "Client": [{ "cutcoin": 0, "die": [], "friendid": 0, "warid": 1001, "warlv": 3 }], "battlename": "猛将如云", "currUJson": { "coin": 1026300, "exp": 16815, "fnum": 33, "fspoint": 0, "gnum": 40, "leader": 67, "lv": 41, "pnum": 40, "smax": 153, "strength": 56 }, "cutS": 10, "gen": [{ "g": "1400,15,1,荀彧,520,300,2,6,1,0,6790,2250,1,0,15,1400" }], "getexp": 100, "isLvUp": 0, "iswin": 1, "upUJson": { "coin": 1026500, "exp": 16915, "fnum": 33, "fspoint": 0, "gnum": 40, "leader": 67, "lv": 41, "pnum": 40, "smax": 153, "strength": 56 }, "resert": 1 };
    if (BackJson.iswin == 1) {
        //更改用户数据
        userJson.lv = BackJson.upUJson.lv;
        if (userJson.lv != BackJson.upUJson.lv)
            $("#u_lv").html(getCityLv(userJson.lv));
        userJson.exp = BackJson.upUJson.exp;
        var tempExpWidth = (userJson.exp / lvUpJson.data[userJson.lv - 1].exp) * 96;
        $("#u_exp").css("width", parseInt(tempExpWidth)).children("#u_exp_content").text(parseInt(userJson.exp / lvUpJson.data[userJson.lv - 1].exp * 100) + "%");
        

        userJson.gnum = BackJson.upUJson.gnum;
        userJson.pnum = BackJson.upUJson.pnum;
        userJson.fspoint = BackJson.upUJson.fspoint;
        userJson.leader = BackJson.upUJson.leader;
        if (userJson.strength >= userJson.smax && BackJson.upUJson.strength < userJson.smax) {
            userJson.stime = 300;
        }
        userJson.strength = BackJson.upUJson.strength;
        var StrengWidth = parseInt((userJson.strength / userJson.smax) * 122) > userJson.smax ? userJson.smax : parseInt((userJson.strength / userJson.smax) * 122);
        $("#u_strength").css("width", StrengWidth).children("#u_strength_content").text(userJson.strength + "/" + userJson.smax + "");

        if (BackJson.isLvUp == 1)
            LvUpChange();

        //加物品
        if (BackJson.ware)
            AddItem(BackJson.ware);
        if (BackJson.gen) {
            for (var i = 0; i < BackJson.gen.length; i++)
                heroJson.data.push(BackJson.gen[i]);
        }
        if (pieceJson != null) {
            if (BackJson.piece) {
                for (var i = 0; i < BackJson.piece.length; i++) {
                    var tempPieceId = BackJson.piece[i].s.split(",")[0];
                    var tempFlag = false;
                    for (var j = 0; j < pieceJson.data.length; j++) {
                        if (pieceJson.data[j].s.split(",")[0] == tempPieceId) {
                            pieceJson.data[j].s = BackJson.piece[i].s;
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag) {
                        pieceJson.data.push(BackJson.piece[i]);
                    }
                }
            }
        }
        
        switch (BackJson.Client[0].warid) {
            case 1005:
                activityJson.left[2].leftNum--;
                loadActivityDetail(4);
                break;
            case 1006:
                activityJson.left[1].leftNum--;
                loadActivityDetail(4);
                break;
            case 1007:
                activityJson.left[0].leftNum--;
                loadActivityDetail(4);
                break
        }

    }

    userJson.coin = BackJson.coin;

    if (userJson.coin >= 1000000)
        $("#u_coin").text(parseInt(userJson.coin / 10000) + "万");
    else
        $("#u_coin").text(userJson.coin);
    
}