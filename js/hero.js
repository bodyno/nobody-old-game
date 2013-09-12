/// <reference path="adv.js" />
/// <reference path="team.js" />
/// <reference path="LvUp.js" />
/// <reference path="public.js" />
/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />
//英雄json
var heroJson = { "data": [{ "g": "1761,19,2,孙尚香,778,571,6,4,2,0,20245,576,1,0,25,1761,1,106000" }, { "g": "5404,25,101,程银,800,574,6,3,2,0,20338,0,1,0,25,5404,2,25368" }, { "g": "5106,25,101,邴原,913,529,6,6,2,0,20336,0,1,0,25,5106,2,25368" }, { "g": "1400,1,1,荀彧,324,188,2,6,1,0,20296,0,1,0,15,1400,1,0" }, { "g": "5108,25,101,严白兴,663,704,6,4,2,0,20335,0,1,0,25,5108,2,25368" }, { "g": "9003,1,0,仙灵,188,185,50,2,4,0,20397,0,1,0,1,9003,3,0" }, { "g": "9003,1,0,仙灵,188,185,50,2,4,0,20398,0,1,0,1,9003,3,0" }, { "g": "9003,1,0,仙灵,188,185,50,2,4,0,20399,0,1,0,1,9003,3,0" }, { "g": "9003,1,0,仙灵,188,185,50,2,4,0,20400,0,1,0,1,9003,3,0" }, { "g": "5702,1,121,庞德,3818,353,18,2,4,0,20342,0,1,0,70,5702,2,0" }, { "g": "5608,17,111,张昭,1356,1006,10,5,3,0,20249,2256,1,0,40,5608,2,20336" }, { "g": "1322,1,3,夏侯惇,1842,309,10,2,3,0,20339,0,1,0,40,1322,1,0" }, { "g": "5560,1,111,程昱,891,516,10,6,3,0,20337,0,1,0,40,5560,2,0" }, { "g": "5402,25,101,韩遂,1740,287,6,2,2,0,20340,0,1,0,25,5402,2,25368" }, { "g": "1621,25,2,吕蒙,2220,233,6,2,2,0,20341,0,1,0,25,1621,1,25368" }], "resert": 1 };

//var heroJson;


//设置英雄JSON
var setHero = function () {
    showHeroDialog();
}

var nowHeroNum = 0;

var changeHero = false;

var showHeroAll = false;

var sellHeroFlag = false;

var usePage = 0;

var useLength;

var usePageAll;


//获取英雄数量
var getTeamHeroNum = function () {
    nowHeroNum = 0;
    for (var i = 0; i < 5; i++) {
        if (teamJson.data[i].g != "")
            nowHeroNum++;
    }
    nowHeroNum--;
}

var heroSwiper;
var thispage;

var loadHeroBase = function () {
    $("#dialog").html("<div id='hero'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='teamChange'></div><div id='heroPageData'>页数<font id='pageNow'>2</font>/2<br/>英雄数:20/26</div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='hero_all'class='hero_icon hero_icon_select'></div><div id='hero_sell'class='hero_icon'></div><div id='hero_adv'class='hero_icon'></div><div id='sellBtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>出售</div><div class='btn3'></div></div></div></div>");
    $("#mask").show();
    $("#hero").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#hero").css({ "top": ((height - 470 * sp) / 2) / sp });
    //绑定列表图标
    var heroIcon = $(".hero_icon");
    heroIcon.bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        heroIcon.removeClass("hero_icon_select");
        $(this).addClass("hero_icon_select");
        switch ($(this).attr("id")) {
            case "hero_all":
                showHeroDialog();
                break;
            case "hero_sell":
                showSellHeroDialog();
                break;
            case "hero_adv":
                loadPieceFrist();
                break;
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    });

    showHeroDialog();

    //绑定关闭事件
    $("#close").bind("touchend", function () {
        if (!cancel()) {
            heroDialogClose();
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

//加载英雄界面
var showHeroDialog = function () {


    var str = "<div class='swiper-container heroSwiper' id='heroSwiper'><div class='swiper-wrapper' id='heroWrapper'></div></div>";
    $("#teamChange").html(str);

    showAllHeroList();

    setTitle(5);

    //隐藏按钮
    $(".LvUpBtn").hide();

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
        showAllHeroPage();
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
        showAllHeroPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    //英雄详情信息
    $("#teamChange .heroChange .heroHeadBg").bind("touchstart", function (e) {
        begin();
    }).bind("touchmove", function () {
        move();
    }).bind("touchend", function (e) {
        if (!cancel()) {
            event.stopPropagation();
            $(this).siblings(".heroChangeDetail").css("background-position", "0px 0px");
            showHeroDetail($(this).parent().attr("gsid"));
        }
    });
}

//设置英雄JSON返回
var setHeroJson = function (json) {
    heroJson = JSON.parse(json);
    //加载队伍
    window.GameMainClass.sendRequestJson(106, "", "setTeamJson");
    //showHeroDialog();
}

//加载英雄列表
var loadHeroList = function () {
    if (sellHeroFlag) {
        $(".hero-slide").children().children().remove();
        $(".hero-slide:not(:first)").remove();
    }
    var heroLength = heroJson.data.length;
    var heroNowPage = 0;
    var tempFlag = 0;
    var i = 0;

    //更换英雄
    if (advHeroData.changeHero != "") {
        var tempSplit = advHeroData.changeHero.split(",");
        for (var x = 0; x < tempSplit.length; x++) {
            if (tempFlag == 8) {
                heroNowPage++;
                $(".swiper-wrapper").append("<div class='swiper-slide hero-slide'><div id='heroChangePage" + heroNowPage + "' class='heroChangePage'></div></div>");
                tempFlag = 0;
            }
            var NowHeroData = getHeroDetailByGsid(tempSplit[x]).split(",");
            var NowHeroDetail = getLocalHeroDetail(NowHeroData[0]);
            if (advHeroData.eat1 == NowHeroData[10]) {
                continue;
            }
            if (advHeroData.eat2 == NowHeroData[10]) {
                continue;
            }

            var heroDiv = document.createElement("div");
            heroDiv.className = "heroChange";
            heroDiv.setAttribute("gsid", NowHeroData[10]);
            heroDiv.setAttribute("imgId", NowHeroDetail.ImgID);

            var arr = new Array();
            arr.push("<div class='heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div><div class='heroChangeDetail'></div><div class='heroStar'></div><div class='heroList_Gold'></div>");


            //var heroDetail = "职业名称:欧阳<br/>生命:5000攻击:1726统帅:12";
            var heroDetail = "<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7],NowHeroData[16]) + "px'></div><font class='heroListName' style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</font><font class='heroLv'>" + getLv(NowHeroData[1]) + "</font><div class='heroLock'></div><font class='LvUpHeroCan'></font>" + "<br/>生命:" + NowHeroData[4] + " 攻击:" + NowHeroData[5] + " 统帅:" + NowHeroData[6];
            heroDiv.innerHTML = arr.join("");
            $("#teamChange #heroChangePage" + heroNowPage + "").append(heroDiv);

            //加载武将具体信息
            $(heroDiv).children(".heroChangeDetail").html(heroDetail);
            $(heroDiv).find(".heroHeadColor").css({ "background-image": "url(res/head/" + NowHeroData[8] + ".png)" });
            $(heroDiv).find(".heroHead").css({ "background-image": "url(res/head/" + NowHeroData[15] + ".png)" });

            tempFlag++;
        }
        return;
    }
    //heroJson.data.sort(function (a, b) {
    //    return a.g.split(",")[1] > b.g.split(",")[1] ? -1 : 1;
    //});
    var lastIndex = heroLength > 24 ? 24 : heroLength;
    for (; i < lastIndex; i++) {
        if (tempFlag == 8) {
            heroNowPage++;
            $(".swiper-wrapper").append("<div class='swiper-slide hero-slide'><div id='heroChangePage" + heroNowPage + "' class='heroChangePage'></div></div>");
            tempFlag = 0;
        }
        var NowHeroData = heroJson.data[i].g.split(",");
        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("gsid", NowHeroData[10]);
        heroDiv.setAttribute("index", i);

        var arr = new Array();
        arr.push("<div class='heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div><div class='heroChangeDetail'></div><div class='check'></div><div class='heroStar'></div><div class='heroList_Gold'></div>");


        //var heroDetail = "职业名称:SB欧阳<br/>生命:5000攻击:1726统帅:12";

        var arr2 = new Array();
        arr2.push("<div class='jobSamll' style='background-position-x:");
        arr2.push(getJobSamll(NowHeroData[7], NowHeroData[16]));
        arr2.push("px'></div><div class='heroNameBg'></div><div class='heroHp'></div><div class='heroAtk'></div><div class='heroLead'></div><font class='heroListName' style='color:");
        arr2.push(getColor(NowHeroData[8]));
        arr2.push("'>");
        arr2.push(NowHeroData[3]);
        arr2.push("</font>");
        arr2.push("<div class='heroLv'>");
        arr2.push(getLv(NowHeroData[1]));
        arr2.push("</div><div class='heroLock'></div><font class='LvUpHeroCan'></font>" + "<br/><div class='hero_Detail_Hp'>");
        arr2.push(NowHeroData[4]);
        arr2.push("</div><div class='hero_Detail_Atk'>");
        arr2.push(NowHeroData[5] + "</div><div class='hero_Detail_Lead'>" + NowHeroData[6]);
        arr2.push("</div>");

        heroDiv.innerHTML = arr.join("");
        $("#teamChange #heroChangePage" + heroNowPage + "").append(heroDiv);

        //加载武将具体信息
        $(heroDiv).children(".heroChangeDetail").html(arr2.join(""));

        //锁图标
        if (showHeroAll && !advHero) {
            if (NowHeroData[13] == 1) {
                $(heroDiv).find(".heroLock").css("width", "15px");
            }
        }
        $(heroDiv).find(".heroHeadColor").css({ "background-image": "url(res/head/" + NowHeroData[8] + ".png)" });
        $(heroDiv).find(".heroHead").css({ "background-image": "url(res/head/" + NowHeroData[15] + ".png)" });
        if (sellHeroFlag) {
            for (var x = 0; x < localHeroJson.data.length; x++) {
                if (localHeroJson.data[x].gid == NowHeroData[0]) {
                    $(heroDiv).find(".heroList_Gold").text(localHeroJson.data[x].sellprice);
                    break;
                }
            }
        } else {
            $(heroDiv).find(".heroList_Gold").remove();
        }
        if (!LvUpHero) {
            //星级
            if (showHeroAll) {
                $(heroDiv).find(".check").hide();
                var width = NowHeroData[8] * 20;
                $(heroDiv).find(".heroStar").css({ "width": width, "left": (320 - width) })
            } else {
                if (teamJson.data[2].g == NowHeroData[10])
                    $(heroDiv).find(".check").removeClass(".checkHover").addClass("checkForeverLock").parent().children(".heroChangeDetail").css("background-position", "0px -148px");

                for (var m = 0; m < teamJson.data.length; m++) {
                    if (NowHeroData[10] == teamJson.data[m].g && m != 2) {
                        $(heroDiv).find(".check").addClass("checkHover");
                        break;
                    }
                }
                //if (NowHeroData[9] == 1)
                //    $(heroDiv).find(".check").addClass("checkHover");
            }
            //出售
            if (sellHeroFlag) {
                $(heroDiv).find(".heroStar").remove();
                $(heroDiv).find(".check").show();
                $(".heroStar").css({ "left": "210px", "margin-top": "-20px" });
            }
        }
        if ((LvUpHero == true && changeHero == false) || sellHeroFlag) {
            //如果已经在队伍中 不显示
            for (var y = 0; y < 5; y++) {
                if (teamJson.data[y].g == NowHeroData[10]) {
                    $(heroDiv).remove();
                    tempFlag--;
                    break;
                };
            }
            //英雄升级 不能自己吃自己
            if (NowHeroData[10] == LvUpData.gsid) {
                $(heroDiv).remove();
                tempFlag--;
            }
        }

        //英雄升级 不能升级的不显示
        if (advHero) {
            var tempHeroDetail = getLocalHeroDetail(NowHeroData[0]);
            if (NowHeroData[2] == 12 || NowHeroData[2] == 117 || NowHeroData[2] == 127 || NowHeroData[2] == 102 || tempHeroDetail.gclass == 3) {
                $(heroDiv).remove();
                tempFlag--;
            } else {
                var LvUpTempHeroDetail = getLocalHeroDetail(NowHeroData[0]);
                if (NowHeroData[1] != NowHeroData[14]) {
                    $(heroDiv).find(".LvUpHeroCan").text("等级不足").show();
                }
                else {
                    //材料是否足够
                }
                $(heroDiv).find(".heroStar").remove();
            }
        }
        tempFlag++;
    }
}

//换队长
var changeLeader = function (ev) {
    window.GameMainClass.sendRequestJson(107, "{\"gsid\":" + $(ev).parent().attr("gsid") + "}", "changeLeaderBack");
}

//换队长返回
var changeLeaderBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert == 1) {
        $("#dialog").html("");
        $("#mask").hide();
        //重新设置队伍
        window.GameMainClass.sendRequestJson(106, "", "setTeamJson");
        if (userFormJson) {
            userFormJson.resert = 0;
        }
    } else {
        showTextMess(tempJson.info, 2);
    }
}

//关闭窗口
var heroDialogClose = function () {
    getTeamHeroNum();
    $("#hero").remove();
    $("#mask").hide();
    if (advHero) {
        advHeroData = { "gsid": 0, "index": 0, "changeHero": "", "eat1": "", "eat2": "", "eat1Img": "", "eat2Img": "" };
    }
    EatHero.length = 0;
    advHero = false;
    showHeroAll = false;
    changeHero = false;
    LvUpHero = false;
    sellHeroFlag = false;
}

//换队员(或选择升级武将)
var changeTeam = function () {
    var sendJson = new Array();
    sendJson.push("{\"team\":\"");
    //5种情况(写死)
    switch ($(".checkHover").length) {
        case 0:
            sendJson.push("0,0,0,0");
            break;
        case 1:
            sendJson.push("0,");
            $(".checkHover").each(function () {
                sendJson.push($(this).parent().attr("gsid"));
            })
            sendJson.push(",0,0");
            break;
        case 2:
            sendJson.push("0,");
            $(".checkHover").each(function () {
                sendJson.push($(this).parent().attr("gsid") + ",");
            })
            sendJson.push("0");
            break;
        case 3:
            $(".checkHover").each(function () {
                sendJson.push($(this).parent().attr("gsid") + ",");
            })
            sendJson.push("0");
            break;
        case 4:
            $(".checkHover").each(function () {
                sendJson.push($(this).parent().attr("gsid") + ",");
            })
            sendJson[sendJson.length - 1] = sendJson[sendJson.length - 1].substr(0, sendJson[sendJson.length - 1].length - 1);
            break;
    }
    sendJson.push("\"}");
    window.GameMainClass.sendRequestJson(108, "" + sendJson.join("") + "", "changeTeamBack");
}

//换队员返回
var changeTeamBack = function (json) {
    if (JSON.parse(json).resert == 1) {
        heroDialogClose();
        //重新设置队伍
        window.GameMainClass.sendRequestJson(106, "", "setTeamJson");
        if (userFormJson) {
            userFormJson.resert = 0;
        }
    } else {
        showTextMess(JSON.parse(json).info, 2);
        showTeamChange();
    }
}

//请求显示英雄详情
var showHeroDetail = function (gsid, just) {
    if (just) {
        window.GameMainClass.sendRequestJson(109, "{\"gsid\":" + gsid + ",\"just\":\"just\"}", "showHeroDetailBack");
    }
    else
        window.GameMainClass.sendRequestJson(109, "{\"gsid\":" + gsid + "}", "showHeroDetailBack");
    //showHeroDetailBack();
}

//显示英雄信息详情
var showHeroDetailBack = function (json) {
    var heroDetailJson = JSON.parse(json);
    //var heroDetailJson = { "Client": [{ "gsid": 1908 }], "g": "1680,1,258,208,2,1,2,1908,0,1", "resert": 1 };
    if (heroDetailJson.resert != 1) {
        showTextMess(heroDetailData.info, 2);
        return;
    }

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 19 });
    document.body.appendChild(maskDiv);

    $("body").append("<div id='d_bg'><div id='close' style='right:10px;'></div><div id='d_btn'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div><div id='d_equip0'><div class='d_equipImg'></div></div><div id='d_equip1'><div class='d_equipImg'></div></div><div id='d_equip2'><div class='d_equipImg'></div></div><div id='d_equip3'><div class='d_equipImg'></div></div><div id='dDialog_man'><div class='heroequip_heroDetail'style='left:0px;top:-122px;'></div><div class='heroEquipshidi'></div><div class='shangdi'></div><div class='d_man'></div><div class='d_man_job'></div><div id='d_star'></div><div id='d_type'></div></div><div id='d_left'><div id='detail_skillNormal'><div class='detail_skillTitle'>普通技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div></div><div id='detail_skillActive'><div class='detail_skillTitle'>武将技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div><div class='detail_skillLv'></div></div><div id='detail_skillPassive'><div class='detail_skillTitle'>被动技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div></div><div id='detail_skillLeader'><div class='detail_skillTitle'>统帅技能</div><div class='detail_skillName'style='color:#26E50E;'></div><div class='detail_skillDetail'></div></div><div id='detail_something'></div><div id='detail_Come'></div></div><div id='detail_lv'></div><div id='detail_hp'></div><div id='detail_atk'></div><div id='detail_lead'></div></div>");

    $("#d_bg").css({ "left": (width - 650) / 2, "top": (height - 440) / 2 });

    if (pad) $("#d_bg").css({ "zoom": sp, "left": (width - 650 * sp) / 2 / sp, "top": (height - 440 * sp) / 2 / sp });

    if (heroDetailJson.Client[0].just) {
        $("#d_bg").css("left", (width - 650) / 2 + 55);
    }

    var detailDiv = $("#d_bg");


    var x = 0;
    var j = localHeroJson.data.length;
    var heroDetailData = heroDetailJson.g.split(",");
    for (; x < j ; x++) {
        if (localHeroJson.data[x].gid == heroDetailData[0])
            break;
    }


    //装备
    for (var s = 0; s < equipJson.data.length ; s++) {
        var tempFlagIndex = 0;
        if (equipJson.data[s].gsid == heroDetailData[7]) {
            //四个装备
            if (equipJson.data[s].atk) {
                for (var y = 0; y < bagJson.data.length; y++) {
                    var tempSplit = bagJson.data[y].p.split(",");
                    if (tempSplit[0] == equipJson.data[s].atk) {
                        $("#d_equip0").css("background-image", "url(res/head/" + tempSplit[7] + ".png)").children().css("background-image", "url(res/goods/" + tempSplit[2] + ".png)");
                        if (tempSplit[4] != 0) {
                            $("#d_equip0").append("<div style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit[4]) + "</div>").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        else {
                            $("#d_equip0").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        break;
                    }
                }
            }

            if (equipJson.data[s].def) {
                for (var y = 0; y < bagJson.data.length; y++) {
                    var tempSplit2 = bagJson.data[y].p.split(",");
                    if (tempSplit2[0] == equipJson.data[s].def) {
                        $("#d_equip2").css("background-image", "url(res/head/" + tempSplit2[7] + ".png)").children().css("background-image", "url(res/goods/" + tempSplit2[2] + ".png)");
                        if (tempSplit2[4] != 0) {
                            $("#d_equip2").append("<div style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit2[4]) + "</div>").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit2[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        else {
                            $("#d_equip2").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit2[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        break;
                    }
                }

            }

            if (equipJson.data[s].hp) {
                for (var y = 0; y < bagJson.data.length; y++) {
                    var tempSplit3 = bagJson.data[y].p.split(",");
                    if (tempSplit3[0] == equipJson.data[s].hp) {
                        $("#d_equip1").css("background-image", "url(res/head/" + tempSplit3[7] + ".png)").children().css("background-image", "url(res/goods/" + tempSplit3[2] + ".png)");
                        if (tempSplit3[4] != 0) {
                            $("#d_equip1").append("<div style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit3[4]) + "</div>").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit3[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        else {
                            $("#d_equip1").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit3[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        break;
                    }
                }

            }

            if (equipJson.data[s].jew) {
                for (var y = 0; y < bagJson.data.length; y++) {
                    var tempSplit4 = bagJson.data[y].p.split(",");
                    if (tempSplit4[0] == equipJson.data[s].jew) {
                        $("#d_equip3").css("background-image", "url(res/head/" + tempSplit4[7] + ".png)").children().css("background-image", "url(res/goods/" + tempSplit4[2] + ".png)");
                        if (tempSplit4[4] != 0) {
                            $("#d_equip3").append("<div style='position: absolute;right: 8px;bottom: 8px;'>" + getRefineLv(tempSplit4[4]) + "</div>").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit4[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        else {
                            $("#d_equip3").bind("touchend", function () {
                                window.GameMainClass.sendRequestJson(176, '{"itemsid":' + tempSplit4[0] + ',"just":"1"}', "showGoodDetail");
                            })
                        }
                        break;
                    }
                }

            }

            break;
        }
    }

    $(detailDiv).find(".d_man").css({ "background-image": "url(res/man/" + localHeroJson.data[x].ImgID + ".png)" })
    $(detailDiv).find(".d_man_job").css("background-position", getJobSamll(localHeroJson.data[x].job, localHeroJson.data[x].gclass));
    $(detailDiv).find("#d_type").css("background-position", -(localHeroJson.data[x].gclass - 1) * 41);

    if (IsSuperHero(heroDetailData[9])) {
        $(detailDiv).find(".heroEquipshidi").css("background-image", "url(res/man/sdbg2.png)");
    }
    else {
        $(detailDiv).find(".heroEquipshidi").css("background-image", "url(res/man/sdbg1.png)");
    }

    $(detailDiv).find(".shangdi").css({ "background-image": "url(res/man/q" + localHeroJson.data[x].q + ".png)" })

    $(detailDiv).find("#detail_start").text(localHeroJson.data[x].q);

    $(detailDiv).find("#d_star").css("height", localHeroJson.data[x].q * 30);


    $(detailDiv).find(".heroequip_heroDetail").css("color", getColor(String(localHeroJson.data[x].q))).text(heroDetailData[10]);

    $(detailDiv).find("#detail_lv").html("等级:<font style='color:#26E50E;'>" + heroDetailData[1] + "/" + heroDetailData[11] + "<font>");
    $(detailDiv).find("#detail_hp").html("生命:<font style='color:#26E50E;'>" + heroDetailData[2] + "<font>");
    $(detailDiv).find("#detail_atk").html("攻击:<font style='color:#26E50E;'>" + heroDetailData[3] + "<font>");
    $(detailDiv).find("#detail_lead").html("统帅:<font style='color:#26E50E;'>" + heroDetailData[4] + "<font>");

    var tempStr;
    var tempStr2;
    for (var i = 0; i < skillJson.data.length; i++) {
        if (skillJson.data[i].skillid == localHeroJson.data[x].usualskill) {
            tempStr = skillJson.data[i].name;
            tempStr2 = skillJson.data[i].intro;
            break;
        }
    }


    $(detailDiv).find("#detail_skillNormal .detail_skillName").text(tempStr).next().text(tempStr2);

    for (var i = 0; i < skillJson.data.length; i++) {
        if (skillJson.data[i].skillid == localHeroJson.data[x].activeskill) {
            tempStr = skillJson.data[i].name;
            tempStr2 = skillJson.data[i].intro;
            break;
        }
    }

    $(detailDiv).find("#detail_skillActive .detail_skillName").text(tempStr).next().text(tempStr2);
    $(detailDiv).find("#detail_skillActive .detail_skillLv").text("等级:" + heroDetailData[5] + "/" + getSkillLv(localHeroJson.data[x].q) + "");


    //被动技能 
    if (localHeroJson.data[x].passiveskill == 0) {
        tempStr = "无";
        tempStr2 = "无";
    }
    else {
        for (var i = 0; i < passiveSkillJson.data.length; i++) {
            if (passiveSkillJson.data[i].skillid == localHeroJson.data[x].passiveskill) {
                tempStr = passiveSkillJson.data[i].name;
                tempStr2 = passiveSkillJson.data[i].intro;
                break;
            }
        }
    }



    $(detailDiv).find("#detail_skillPassive .detail_skillName").text(tempStr).next().text(tempStr2);

    if (heroDetailData[6] == "0") {
        tempStr = "无";
        tempStr2 = "无";
    }
    else {
        for (var i = 0; i < localLeadSkillJson.data.length; i++) {
            if (localLeadSkillJson.data[i].skillid == heroDetailData[6]) {
                tempStr = localLeadSkillJson.data[i].name;
                tempStr2 = localLeadSkillJson.data[i].intro;
                break;
            }
        }
    }


    $(detailDiv).find("#detail_skillLeader .detail_skillName").text(tempStr).next().text(tempStr2);


    $(detailDiv).find("#detail_something").text(localHeroJson.data[x].intro);

    $(detailDiv).find("#detail_Come").text("获得:" + localHeroJson.data[x].source);

    //绑定关闭事件
    $(detailDiv).find("#close,#d_btn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#d_bg").remove();
        $("#tempMask").remove();
    }).bind("touchstart", function () {
        begin();
        $(this).css("-webkit-transform", "scale(0.8)");
    }).bind("touchmove", function () {
        $(this).css("-webkit-transform", "scale(1)");
        move();
    });

    
}

//关闭英雄详情
var closeHeroDetail = function () {
    $("#detail_mask").remove();
    $("#detail_dialog").remove();
}

//保护事件
var protectHero = function () {
    var flag = 1;
    if ($(event.srcElement).text() == "取消保护")
        flag = 0;
    var sendJson = "{\"gsid\":" + $(event.srcElement).attr("gsid") + ",\"flag\":" + flag + "}";
    window.GameMainClass.sendRequestJson(110, sendJson, "protectHeroBack");
}

//保护事件返回
var protectHeroBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(JSON.parse(json).info, 2);
    } else {
        var tempHeroData;
        var i = 0;
        for (; i < heroJson.data.length; i++) {
            if (heroJson.data[i].g.split(",")[10] == tempJson.Client[0].gsid) {
                tempHeroData = heroJson.data[i].g.split(",");
                break;
            }
        }
        tempHeroData[13] = tempJson.Client[0].flag;
        heroJson.data[i].g = tempHeroData.join(",");
        $(".heroChange").each(function () {
            if ($(this).attr("gsid") == tempJson.Client[0].gsid) {
                $(this).find(".heroLock").css("width", "15px");
            }
        })


        if ($("#detail_dialog #detail_protect").text() == "取消保护") {
            $("#detail_dialog #detail_protect").text("神棋保护");
        }
        else {
            $("#detail_dialog #detail_protect").text("取消保护");
        }
    }
}

//出售英雄
var sellHero = function () {
    if (EatHero.length == 0) {
        showTextMess("请选择出售英雄", 2);
        return;
    }

    window.GameMainClass.sendRequestJson(114, '{"g":"'+EatHero.join(",")+'"}', "sellHeroBack");
}

//出售英雄
var sellHeroBack = function (json) {
    //var tempJson = { "Client": [{ "g": "47,49" }], "coin": 2000, "info": "OK", "resert": 1 };
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    } else {

        window.GameMainClass.playEffectSound("sell");

        $("#tempMask").remove();
        $("#temp").html("");

        showTextMess(tempJson.info, 1);
        var tempDeleteHeroData = tempJson.Client[0].g.split(",");
        for (var i = 0; i < tempDeleteHeroData.length; i++) {
            for (var x = 0; x < heroJson.data.length; x++) {
                if (heroJson.data[x].g.split(",")[10] == tempDeleteHeroData[i]) {
                    heroJson.data.splice(x, 1);
                    break;
                }
            }
        }

        //加钱
        updateUserJson("200", tempJson.coin);


        showSellHeroDialog();
    }
}

//显示所有武将
var showAllHeroList = function () {

    usePage = 0;

    useLength = heroJson.data.length;

    usePageAll = Math.ceil(useLength / 8)-1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    showAllHeroPage();

}

//显示武将价格界面
var showSellHeroDialog = function () {
    $("#teamChange").html("<div class='swiper-container heroSwiper'><div class='swiper-wrapper'><div class='swiper-slide hero-slide'><div id='heroChangePage0'class='heroChangePage'></div></div></div></div>");

    showSellHeroList();

    $("#sellBtn").show();

    setTitle(1);

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
        showSellHeroPage();
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
        showSellHeroPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    //绑定确定按钮
    $("#sellBtn").unbind("touchstart").unbind("touchmove").unbind("touchend")
    $("#sellBtn").bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        //出售确认框
        var maskDiv = document.createElement("div");
        maskDiv.id = "tempMask";
        $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":4 });
        document.body.appendChild(maskDiv);

        $("#temp").html("<div id='mess2'><div id='m_title'><div id='m_titleLeft'></div><div id='m_titleCenter'><div id='m_titleContext'></div></div><div id='m_titleRight'></div></div><div id='m_waikuan'><div class='m_jiao m_shangjiao'></div><div class='m_jiao m_xiajiao'></div><div class='m_jiao m_zuojiao'></div><div class='m_jiao m_youjiao'></div><div class='m_shangwaibian'></div><div class='m_xiawaibian'></div><div class='m_zuowaibian'></div><div class='m_youwaibian'></div></div><div id='dialogclose'></div><div id='tempDialog2'><div id='friendFont'style='color:#26E50E;'>您确定要出售吗?</div></div><div id='friendDelete'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='friendCancel'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div></div>");
        $("#mess2").css({ "left": (width - 476) / 2, "top": (height - 279) / 2, "z-index": 5 });

        if (pad) $("#mess2").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": (height - 279 * sp) / 2 / sp });

        var tempSend = $(this).attr("sid");

        //绑定确定
        $("#friendDelete").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            sellHero();
            window.GameMainClass.playEffectSound("icon");
        }).bindAnimate();

        //绑定关闭
        $("#dialogclose,#friendCancel").bind("touchend", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            if (cancel())
                return;
            $("#tempMask").remove();
            $("#temp").html("");
            window.GameMainClass.playEffectSound("close");
        }).bindAnimate();


    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
}

//显示武将的价格
var showSellHeroList = function () {

    //筛选

    //在队伍上的不显示
    var tempUseJson = [];
    for (var i = 0; i < 5; i++) {
        if (teamJson.data[i].g != "0")
            tempUseJson.push(teamJson.data[i].g);
    }

    var tempFlag3 = false;

    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var i = 0; i < heroJson.data.length; i++) {
        var tempSplit = heroJson.data[i].g.split(",");

        tempFlag3 = false;
        for (var j = 0; j < tempUseJson.length; j++) {
            if (tempSplit[10] == tempUseJson[j]) {
                tempFlag3 = true;
                tempUseJson.splice(j, 1);
                break;
            }
        }
        if (tempFlag3)
            continue;

        if (tempSplit[13] == 1)
            continue;

        tempMemoryJson.data.push(heroJson.data[i]);
        tempUseIndex.push(i);
    }

    EatHero.length = 0;
    usePage = 0;

    if (tempMemoryJson.data.length == 0) {
        showTextMess("没有任何可出售的武将", 2);
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>武将数:<font style='color:#26E50E'>0/" + userJson.gnum + "</font>");
        return;
    }

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    showSellHeroPage();

}

//出售武将点击事件
var sellHeroClick = function (ev) {
    if (cancel())
        return;
    var tempCheck = $(ev).children(".check");
    if (tempCheck.hasClass("checkHover")) {
        tempCheck.removeClass("checkHover");
        for (var x = 0; x < EatHero.length; x++) {
            if (EatHero[x] == $(ev).parent().attr("gsid")) {
                EatHero.splice(x, 1);
                break;
            }
        }
    } else {
        tempCheck.addClass("checkHover");
        EatHero.push($(ev).parent().attr("gsid"));
    }
}

//武将详情点击事件
var showHeroDetailClick = function (ev) {
    if (cancel())
        return;
    showHeroDetail($(ev).parent().attr("gsid"));
}

//显示武将信息(不发送数据)
var showHeroDetailNormal = function (gid) {
    if (cancel())
        return;

    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask";
    $(maskDiv).css({ "width": width, "height": height, "top": "0","z-index":19 });
    document.body.appendChild(maskDiv);

    $("body").append("<div id='d_bg'><div id='close' style='right:10px;'></div><div id='d_btn'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div><div id='d_equip0'><div class='d_equipImg'></div></div><div id='d_equip1'><div class='d_equipImg'></div></div><div id='d_equip2'><div class='d_equipImg'></div></div><div id='d_equip3'><div class='d_equipImg'></div></div><div id='dDialog_man'><div class='heroequip_heroDetail'style='left:0px;top:-120px;'></div><div class='heroEquipshidi'></div><div class='shangdi'></div><div class='d_man'></div><div class='d_man_job'></div><div id='d_star'></div><div id='d_type'></div></div><div id='d_left'><div id='detail_skillNormal'><div class='detail_skillTitle'>普通技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div></div><div id='detail_skillActive'><div class='detail_skillTitle'>武将技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div><div class='detail_skillLv'></div></div><div id='detail_skillPassive'><div class='detail_skillTitle'>被动技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div></div><div id='detail_skillLeader'><div class='detail_skillTitle'>统帅技能</div><div class='detail_skillName'style='color:#26E50E;'></div><div class='detail_skillDetail'></div></div><div id='detail_something'></div><div id='detail_Come'></div></div><div id='detail_lv'></div><div id='detail_hp'></div><div id='detail_atk'></div><div id='detail_lead'></div></div>");

    $("#d_bg").css({ "left": (width - 650) / 2, "top": (height - 440) / 2 });

    if (pad) $("#d_bg").css({ "zoom": sp, "left": (width - 650 * sp) / 2 / sp, "top": (height - 440 * sp) / 2 / sp });

    var detailDiv = $("#d_bg");


    var x = 0;
    var j = localHeroJson.data.length;

    for (; x < j ; x++) {
        if (localHeroJson.data[x].gid == gid)
            break;
    }

    $(detailDiv).find(".d_man").css({ "background-image": "url(res/man/" + localHeroJson.data[x].ImgID + ".png)" })
    $(detailDiv).find(".d_man_job").css("background-position", getJobSamll(localHeroJson.data[x].job, localHeroJson.data[x].gclass));
    $(detailDiv).find("#d_type").css("background-position", -(localHeroJson.data[x].gclass - 1) * 41);

    $(detailDiv).find(".heroEquipshidi").css("background-image", "url(res/man/sdbg1.png)");

    $(detailDiv).find(".shangdi").css({ "background-image": "url(res/man/q" + localHeroJson.data[x].q + ".png)" })

    $(detailDiv).find("#detail_start").text(localHeroJson.data[x].q);

    $(detailDiv).find("#d_star").css("height", localHeroJson.data[x].q * 30);


    $(detailDiv).find(".heroequip_heroDetail").css("color", getColor(String(localHeroJson.data[x].q))).text(localHeroJson.data[x].name);

    $(detailDiv).find("#detail_lv").html("等级:<font style='color:#26E50E;'>1/" + localHeroJson.data[x].max + "<font>");
    $(detailDiv).find("#detail_hp").html("生命:<font style='color:#26E50E;'>" + localHeroJson.data[x].initHP + "<font>");
    $(detailDiv).find("#detail_atk").html("攻击:<font style='color:#26E50E;'>" + localHeroJson.data[x].initATK + "<font>");
    $(detailDiv).find("#detail_lead").html("统帅:<font style='color:#26E50E;'>" + localHeroJson.data[x].lead + "<font>");

    var tempStr;
    var tempStr2;
    for (var i = 0; i < skillJson.data.length; i++) {
        if (skillJson.data[i].skillid == localHeroJson.data[x].usualskill) {
            tempStr = skillJson.data[i].name;
            tempStr2 = skillJson.data[i].intro;
            break;
        }
    }


    $(detailDiv).find("#detail_skillNormal .detail_skillName").text(tempStr).next().text(tempStr2);

    for (var i = 0; i < skillJson.data.length; i++) {
        if (skillJson.data[i].skillid == localHeroJson.data[x].activeskill) {
            tempStr = skillJson.data[i].name;
            tempStr2 = skillJson.data[i].intro;
            break;
        }
    }

    $(detailDiv).find("#detail_skillActive .detail_skillName").text(tempStr).next().text(tempStr2);
    $(detailDiv).find("#detail_skillActive .detail_skillLv").text("等级:1/" + getSkillLv(localHeroJson.data[x].q) + "");


    //被动技能 
    if (localHeroJson.data[x].passiveskill == 0) {
        tempStr = "无";
        tempStr2 = "无";
    }
    else {
        for (var i = 0; i < passiveSkillJson.data.length; i++) {
            if (passiveSkillJson.data[i].skillid == localHeroJson.data[x].passiveskill) {
                tempStr = passiveSkillJson.data[i].name;
                tempStr2 = passiveSkillJson.data[i].intro;
                break;
            }
        }
    }



    $(detailDiv).find("#detail_skillPassive .detail_skillName").text(tempStr).next().text(tempStr2);


    //领导技能

    if (localHeroJson.data[x].sLeader == 0) {
        tempStr = "无";
        tempStr2 = "无";
    }
    else {
        for (var i = 0; i < localLeadSkillJson.data.length; i++) {
            if (localLeadSkillJson.data[i].skillid == localHeroJson.data[x].sLeader) {
                tempStr = localLeadSkillJson.data[i].name;
                tempStr2 = localLeadSkillJson.data[i].intro;
                break;
            }
        }
    }

    $(detailDiv).find("#detail_skillLeader .detail_skillName").text(tempStr).next().text(tempStr2);


    $(detailDiv).find("#detail_something").text(localHeroJson.data[x].intro);

    $(detailDiv).find("#detail_Come").text("获得:" + localHeroJson.data[x].source);

    //绑定关闭事件
    $(detailDiv).find("#close,#d_btn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#d_bg").remove();
        $("#tempMask").remove();
    }).bind("touchstart", function () {
        begin();
        $(this).css("-webkit-transform", "scale(0.8)");
    }).bind("touchmove", function () {
        $(this).css("-webkit-transform", "scale(1)");
        move();
    });
    return;
}

//所有武将翻页
var showAllHeroPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex  = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {


        var NowHeroData = heroJson.data[i].g.split(",");

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("index", i);
        heroDiv.setAttribute("gsid", NowHeroData[10]);

        arr.length = 0;
        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + NowHeroData[1] + "/" + NowHeroData[14] + " </td></tr></table></div>")
        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        for (var z = 0; z < EatHero.length; z++) {
            if (EatHero[z] == NowHeroData[10]) {
                $(heroDiv).find(".check").addClass("checkHover");
                continue;
            }
        }

        //已选的英雄打勾
        if (LvUpData.s != "") {
            var tempSplit = LvUpData.s.split(",");
            for (var j = 0; j < tempSplit.length; j++) {
                if (NowHeroData[10] == tempSplit[j]) {
                    $(heroDiv).find(".check").addClass("checkHover");
                    continue;
                }
            }
        }
        //"战"字
        for (var m = 0; m < 5; m++) {
            if (NowHeroData[10] == teamJson.data[m].g) {
                $(heroDiv).children(".heroChangeDetail").append("<div class='heroZhan'></div>");
                break;
            }
        }

    }
}

//出售武将翻页
var showSellHeroPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex  = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var NowHeroData = tempMemoryJson.data[i].g.split(",");
        var tempHeroDetail = getLocalHeroDetail(NowHeroData[0]);

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("index", i);
        heroDiv.setAttribute("gsid", NowHeroData[10]);

        arr.length = 0;

        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='sellHeroClick(this)' style='background-position-y:-234px'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='sellHeroClick(this)'  style='background-position-y:-234px'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        var tempFlag=false;
        //是否已经被选中
        for (var z = 0; z < EatHero.length; z++) {
            if (EatHero[z] == NowHeroData[10]) {
                tempFlag = true;
                break;
            }
        }

        if (tempFlag) {
            arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + (tempHeroDetail.sellprice + getSellBaseNum(NowHeroData[8]) * Number(NowHeroData[1])) + " </td></tr></table><div class='check checkHover'></div></div>");
        }
        else {
            arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + (tempHeroDetail.sellprice + getSellBaseNum(NowHeroData[8]) * Number(NowHeroData[1])) + " </td></tr></table><div class='check'></div></div>");
        }
        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);
    }
}