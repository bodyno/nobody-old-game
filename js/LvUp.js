/// <reference path="team.js" />
/// <reference path="team.js" />
/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="hero.js" />
var LvUpHero = false;
var LvTime;
var LvUpEat = false;
var LvUpData = { "index": 0, "gsid": 0, "s": "", "c": "" };
var EatHero = [];
var EatHero2 = [];
var tempSkillId = 0;

var usePage = 0;

var loadLvUpFirst = function () {
    $("#dialog").html("<div id='LvUp'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='LvUpMain'></div><div id='LvUpBtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定升级</div><div class='btn3'></div></div></div><div id='advManBtnOK'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>开始转生</div><div class='btn3'></div></div></div><div id='hero_icon_lv'class='hero_icon hero_icon_select'></div><div id='hero_icon_adv'class='hero_icon'></div><div id='hero_icon_skill'class='hero_icon'></div><div id='heroequip_something'style='font-size: 16px;top: 72px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:4px;position: relative;margin-right: 7px;'/><div style='float:left;'>满级的武将可以提供双倍EXP。<br/>武将品质越低技能提升的需求越低。</div></div></div>");

    $("#LvUp").css({ "top": (height - 460) / 2 - 10 });
    if(pad)
        $("#LvUp").css({ "top": ((height - 470 * sp) / 2 )/sp });

    var tempIcon = $(".hero_icon");
    //绑定icon事件
    tempIcon.bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("menu");
        switch ($(this).attr("id")) {
            case "hero_icon_lv":
                LvUpData = { "index": 0, "gsid": 0, "s": "", "c": "" };
                $("#heroequip_something").css("top", "72px").find("img").css("top", "4px").siblings("div").html("满级的武将可以提供双倍EXP。<br/>武将品质越低技能提升的需求越低。");
                EatHero.length = 0;
                EatHero2.length = 0;
                LvUpEat = false;
                teamLockAll = false;
                showLvUp();
                break;
            case "hero_icon_adv":
                $("#heroequip_something").css("top", "86px").find("img").css("top", "-6px").siblings("div").html("点击转生需求图标可查看转生资料。");
                LvUpData = { "index": 0, "gsid": 0, "s": "", "c": "" };
                EatHero.length = 0;
                EatHero2.length = 0;
                LvUpEat = false;
                teamLockAll = false;
                showAdv();
                break;
            case "hero_icon_skill":
                showTextMess("暂末开放!", 2);
                return;
                break;
        }
        tempIcon.removeClass("hero_icon_select");
        $(this).addClass("hero_icon_select");
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    //关闭事件
    $("#close").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (!cancel()) {
            window.GameMainClass.playEffectSound("close");
            $("#dialog").html("");
            $("#mask").hide();
            LvUpData = { "index": 0, "gsid": 0, "s": "", "c": "" };
            LvUpEat = false;
            EatHero.length = 0;
            EatHero2.length = 0;
            nowHeroNum = 0;
            teamLockAll = false;
            //升级关闭
            advDialogClose();
        }
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    showLvUp();
}

var showLvUp = function () {
    $("#LvUpMain").html("<div id='LvUp_Hero_Name'><div id='LvUp_Hero_Name_Font'></div></div><div id='LvUpHero'><div id='LvUpLight'></div><div class='LvUp_Hero'></div><div id='LvUp_star'></div><div id='LvUp_type'></div><div class='LvUp_shidi'></div><div class='LvUp_shangdi'></div><div class='LvUp_job'></div></div><div class='LvUpEat'id='LvUpEat1'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='LvUpEat_font'></div></div><div class='LvUpEat'id='LvUpEat2'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='LvUpEat_font'></div></div><div class='LvUpEat'id='LvUpEat3'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='LvUpEat_font'></div></div><div class='LvUpEat'id='LvUpEat4'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='LvUpEat_font'></div></div><div class='LvUpEat'id='LvUpEat5'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='LvUpEat_font'></div></div><div class='LvUpEat'id='LvUpEat6'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='LvUpEat_font'></div></div><div id='LvUpHeroDetail'><div id='LvUpHeroDetail_Name'>生命:<br/>攻击:</div><div id='LvUpHeroDetail_Value'></div><div id='LvUpHeroDetail_ValuePlu'></div><div id='LvUpHeroDetail_LvBg'><div id='LvUpHeroDetail_Lv'></div><div id='LvUpHeroDetail_ResultLv'></div></div><div id='LvUpHeroDetail_ExpContent'>经验:</div><div id='LvUpHeroDetail_Exp'></div><div id='LvUpHeroDetail_ExpBg'></div><div id='LvUpHeroDetail_SkillName'></div><div id='LvUpHeroDetail_SkillValue'></div></div><div id='LvUpPanel'><div id='LvUpHeroDetail_Gold'>消耗银币:<font class='LvUpHeroDetail_Num'></font></div><div id='LvUpHeroDetail_Exp2'>获得经验:<font class='LvUpHeroDetail_Num'></font></div><div id='LvUpHeroDetail_Much'>技能升级几率:<font class='LvUpHeroDetail_Num'></font></div><div id='LvUpHeroDetail_Exp3'>满级还需经验:<font class='LvUpHeroDetail_Num'></font></div></div>");
    $("#mask").show();

    setTitle(6);
    $("#LvUpHeroDetail div").hide();
    $("#LvUpPanel div").hide();

    $(".LvUpBtn").hide();
    $("#LvUpBtn").show();

    $("#LvUpHero").bind("touchend", function () {
        if (cancel())
            return;
        showLvUpChooseDialog();
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $(".LvUpEat").bind("touchend", function () {
        if (cancel())
            return;
        if (LvUpData.gsid != 0) {
            LvUpEat = true;
            showLvUpChooseDialog();
        }
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    $("#LvUpBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (LvUpData.c == "") {
            showTextMess("请选择吞噬英雄!", 2);
            return;
        }
        if (LvUpData.gsid == 0) {
            showTextMess("请选择升级英雄!", 2);
            return;
        }
        //{"gsid":1, "g":"2,3,4,5"}

        var tempUse = LvUpData.c.split(",");
        for (var i = 0; i < tempUse.length; i++) {
            if (heroJson.data[tempUse[i]].g.split(",")[16] == 1) {
                showLvUpStill();
                return;
            }
        }
        
        var sendJson = "{\"gsid\":" + heroJson.data[LvUpData.index].g.split(",")[10] + ",\"g\":\"" + LvUpData.s + "\"}";
        window.GameMainClass.sendRequestJson(111, sendJson, "UpLvEatBack");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })
}

//升级成功
var UpLvEatBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "gsid": 275 }], "data": [{ "g": "1004,2,8,赵云,2928,406,5,2,4,1,275,440,2,0,70,1004" }], "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2)
        return;
    }

    window.GameMainClass.playEffectSound("heroLvup");

    heroJson.data[LvUpData.index].g = tempJson.g;
    $("#dialog #LvUpHeroDetail_ValuePlu").html("");
    updateUserJson("200", 0 - tempJson.coin);
    loadUpLvHeadDetail();

    //删除吃掉的武将
    var deleteHero = LvUpData.s.split(",");
    for (var i = 0; i < deleteHero.length; i++) {
        for (var j = 0; j < heroJson.data.length; j++) {
            if (heroJson.data[j].g.split(",")[10] == deleteHero[i]) {
                heroJson.data.splice(j, 1);
                break;
            }
        }
    }

    //关闭闪动
    //$("#LvUpHeroDetail_Exp").hide();

    $("#dialog #LvUpHeroDetail_Gold .LvUpHeroDetail_Num").text("");
    $("#dialog #LvUpHeroDetail_Exp2 .LvUpHeroDetail_Num").text("");
    $("#dialog #LvUpHeroDetail_Much .LvUpHeroDetail_Num").text("");
    $("#dialog #LvUpHeroDetail_Exp3 .LvUpHeroDetail_Num").text("");

    LvUpData.s = "";
    LvUpData.c = "";

    var sendJson = "{\"gsid\":" + LvUpData.gsid + "}";
    window.GameMainClass.sendRequestJson(113, sendJson, "UpLvHeroBack");

}

//英雄吞噬成功后返回
var UpLvHeroBack = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    } else {

        //clearInterval(LvTime);

        for (var i = 0; i < heroJson.data.length; i++) {
            var tempSplit = heroJson.data[i].g.split(",");
            if (tempSplit[10] == LvUpData.gsid) {
                heroJson.data[i].g = tempJson.data[0].g;
                LvUpData.index = i;
                $("#LvUpHeroDetail_Lv").text(tempSplit[1])/*.removeClass("light")*/;
                //是否在队形上 如果在 则重新加载队形
                if (isHeroInTeam(LvUpData.gsid)) {
                    showTeam();
                }
                break;
            }
        }



        //还原吃的武将
        $(".LvUpEat").each(function () {
            if ($(this).children(".heroHead").css("background-image") != "none") {
                $(this).append("<div class='eatAnimate'></div>");
                $(this).children(".heroHead").animate({ "opacity": 0 }, 1800);
                var tempIndex = 0;
                var eatTime = setInterval(function () {
                    $(".eatAnimate").css("background-position-x", -180 * tempIndex);
                    tempIndex++;
                    if (tempIndex == 12) {
                        clearInterval(eatTime);
                        $(".eatAnimate").remove();
                        $(".heroHeadColor").css({ "background-image": "" });
                        $(".heroHead").css({ "background-image": "", "opacity": 1 });
                        $(".expDouble").remove();
                        $(".LvUpEat_font").show();
                    }
                }, 160)

            }
        })

        setTimeout(function () {
            $("#LvUpHero").append("<div id='lvupAnimate'></div>");
            var tempFlag = 0;
            var eatTime2 = setInterval(function () {
                $("#lvupAnimate").css("background-position-x", tempFlag * 346);
                tempFlag++;
                if (tempFlag == 12) {
                    clearInterval(eatTime2);
                    $("#lvupAnimate").remove();
                }
            }, 160)
        }, 1800)

        EatHero.length = 0;
        EatHero2.length = 0;
        teamLockAll = false;
        nowHeroNum = 0;


        window.GameMainClass.sendRequestJson(106, "", "setTeamJson");
    }
}

//显示英雄信息
var loadUpLvHeadDetail = function () {
    $("#LvUpHero").children().show();
    $("#LvUpHeroDetail div").show();

    var nowTempData = heroJson.data[LvUpData.index].g.split(",");

    //本地武将具体信息
    var localHeroData = getLocalHeroDetail(nowTempData[0]);

    //加载英雄具体形象
    $("#LvUpHero #LvUpLight").remove();
    $("#LvUpHero .LvUp_Hero").css({ "background-image": "url(res/man/" + localHeroData.ImgID + ".png)" });
    $("#LvUpHero .LvUp_job").css({ "background-position": getJobSamll(localHeroData.job, localHeroData.gclass) });
    $("#LvUpHero .LvUp_shangdi").css({ "background-image": "url(res/man/q" + localHeroData.q + ".png)" });
    $("#LvUp_star").css("height", localHeroData.q * 30);
    $("#LvUp_type").css("background-position", -(localHeroData.gclass - 1) * 41).show();

    //名字
    $("#LvUp_Hero_Name_Font").text(nowTempData[3]).css("color", getColor(nowTempData[8]));

    if (IsSuperHero((parseInt(nowTempData[2]) + 1))) {
        $("#LvUpHero .LvUp_shidi").css("background-image", "url(res/man/sdbg2.png)");
    } else {
        $("#LvUpHero .LvUp_shidi").css("background-image", "url(res/man/sdbg1.png)");
    }

    //生命
    var hp = localHeroData.initHP + localHeroData.HPplus * nowTempData[1];
    var atk = localHeroData.initATK + localHeroData.ATKplus * nowTempData[1];
    $("#dialog #LvUpHeroDetail_Value").html(hp + "<br/>" + atk);

    //lv
    $("#dialog #LvUpHeroDetail_Lv").text(nowTempData[1]);

    //技能
    var skillName;
    for (var i = 0; i < skillJson.data.length; i++) {
        if (localHeroData.activeskill == skillJson.data[i].skillid) {
            skillName = skillJson.data[i].name;
            break;
        }
    }
    $("#dialog #LvUpHeroDetail_SkillName").text(skillName);

    //技能等级
    $("#dialog #LvUpHeroDetail_SkillValue").text("等级:" + nowTempData[12] + "/" + getSkillLv(nowTempData[8]) + "");

}

//显示吞噬后的信息
var loadUpLvHeroDetail = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "coin": 18000,"rate":80, "exp": 1178, "info": "OK", "lv": 2, "max": 0, "odd": 30, "resert": 1 };
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
        EatHero.length = 0;
        EatHero2.length = 0;
        LvUpData.s = "";
        LvUpData.c = "";
        nowHeroNum = 0;
        teamLockAll = false;
        return;
    }

    $("#LvUpPanel div").show();

    //还原吃的武将
    $(".LvUpEat").each(function () {
        $(this).children(".heroHeadColor").css({ "background-image": "" });
        $(this).children(".heroHead").css({ "background-image": "" });
        $(this).children(".LvUpEat_font").show();
        $(this).children(".expDouble").remove();
    })

    var localHeroData;
    var nowTempData = heroJson.data[LvUpData.index].g.split(",");
    for (var i = 0; i < localHeroJson.data.length; i++) {
        if (localHeroJson.data[i].gid == nowTempData[0]) {
            localHeroData = localHeroJson.data[i];
            break;
        }
    }

    $("#LvUpPanel").show();
    var clientLvUpHero = LvUpData.c.split(",");
    for (var i = 0; i < EatHero2.length; i++) {
        var nowTempHero = heroJson.data[clientLvUpHero[i]].g.split(",");
        var tempDiv = $("#LvUpEat" + (i + 1));

        if (nowTempHero[1] == nowTempHero[14])
            tempDiv.append("<div class='expDouble'></div>");

        tempDiv.children(".heroHeadColor").css({ "background-image": "url(res/head/" + nowTempHero[8] + ".png)" });
        tempDiv.children(".heroHead").css({ "background-image": "url(res/head/" + nowTempHero[15] + ".png)" });

        $("#LvUpEat" + (i + 1)).children(".LvUpEat_font").hide();
    }

    //生命攻击加成
    $("#dialog #LvUpHeroDetail_ValuePlu").html("+" + (tempJson.lv - nowTempData[1]) * localHeroData.HPplus + "<br/>+" + (tempJson.lv - nowTempData[1]) * localHeroData.ATKplus);
    //消耗
    $("#dialog #LvUpHeroDetail_Gold .LvUpHeroDetail_Num").text(tempJson.coin);
    $("#dialog #LvUpHeroDetail_Exp2 .LvUpHeroDetail_Num").text(tempJson.exp);
    $("#dialog #LvUpHeroDetail_Much .LvUpHeroDetail_Num").text(tempJson.odd + "%");
    $("#dialog #LvUpHeroDetail_Exp3 .LvUpHeroDetail_Num").text(tempJson.max);

    //显示动态的等级变化
    var tempFlag = false;
    var tempLvDiv = $("#LvUpHeroDetail_Lv");
    $("#LvUpHeroDetail_Exp").css({ "display": "block", "width": (164 * tempJson.rate / 100) });
    //tempLvDiv.addClass("light");
    tempLvDiv.html(nowTempData[1] + " → <font style='color:#26E50E;'>" + tempJson.lv + "</font>");
    //clearInterval(LvTime);
    //LvTime= setInterval(function () {
    //    if (tempFlag) {
    //        tempLvDiv.text(tempJson.lv);
    //        tempFlag = false;
    //    }
    //    else {
    //        tempLvDiv.text(nowTempData[1]);
    //        tempFlag = true;
    //    }
    //}, 4000)
}

//加载选择英雄界面
var showLvUpChooseDialog = function () {
    $("#temp").html("<div id='advChoose'style='z-index:5;position:absolute;left:" + (width - 800) / 2 + "px;top:" + (height - 480) / 2 + "px'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/4.png);'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='teamChange'><div id='heroSwiper'class='swiper-container heroSwiper'><div class='swiper-wrapper'id='heroWrapper'></div></div></div><div id='heroPageData'>页数1/2<br/>英雄数:20/26</div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='LvUpEatOk'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>");
    $("#mask").show();

    if (pad) $("#advChoose").css({ "zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": ((height - 470 * sp) / 2 / sp) });

    var arr = [];

    if (LvUpEat) {
        nowHeroNum = 0;
        teamLockAll = false;
        showHeroLvUpEatList();
        //绑定吃英雄选择事件
        LvUpEatClick();

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
            showHeroEatPage();

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
            showHeroEatPage();
        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })
    }
    else {

        $("#advChoose #titleContext").css("background-image", "url(res/public/title/10.png)");

        showHeroLvUpList();

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
            showHeroLvUpPage();

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
            showHeroLvUpPage();
        }).bind("touchstart", function () {
            $(this).css({ "-webkit-transform": "scale(0.8)" });
            begin();
        }).bind("touchmove", function () {
            $(this).css({ "-webkit-transform": "scale(1)" });
            move();
        })
    }


    //绑定关闭事件
    $("#tempClose").bind("touchend", function () {
        if (!cancel()) {
            $("#temp").html("");
            LvUpEat = false;
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    }).bind("touchstart", function () {
        begin();
        window.GameMainClass.playEffectSound("close");
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //英雄详情信息
    $("#teamChange .heroChange .CC").bind("touchstart", function (e) {
        begin();
    }).bind("touchmove", function () {
        move();
    }).bind("touchend", function (e) {
        if (!cancel()) {
            showHeroDetail($(this).parent().attr("gsid"));
            event.stopPropagation();
            event.preventDefault();
        }
    })
}

//加载英雄升级选择界面
var showHeroLvUpList = function () {
    //英雄升级 不能自己吃自己

    var tempUseJson = [];
    for (var i = 0; i < EatHero.length; i++) {
        tempUseJson.push(EatHero[i]);
    }
    var tempFlag2;

    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < heroJson.data.length; x++) {
        var tempSplit = heroJson.data[x].g.split(",");

        if (LvUpData.gsid != 0) {
            if (tempSplit[10] == LvUpData.gsid) {
                continue;
            }
        }

        tempFlag2 = false;
        //已经选择的英雄不能再选择
        for (var j = 0; j < tempUseJson.length; j++) {
            if (tempUseJson[j] == tempSplit[10]) {
                tempUseJson.splice(j, 1);
                tempFlag2 = true;
            }
        }
        if (tempFlag2)
            continue;

        tempMemoryJson.data.push(heroJson.data[x]);
        tempUseIndex.push(x);
    }

    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    showHeroLvUpPage();
}

//英雄升级每页
var showHeroLvUpPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {


        var NowHeroData = tempMemoryJson.data[i].g.split(",");

        var tempHeroDetail = getLocalHeroDetail(NowHeroData[0]);

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("gsid", NowHeroData[10]);
        heroDiv.setAttribute("index", tempUseIndex[i]);

        arr.length = 0;

        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='LvUpChooseClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='LvUpChooseClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        arr.push("<div class='check'></div><table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + NowHeroData[1] + "/" + NowHeroData[14] + " </td></tr></table></div>")

        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        //"战"字
        for (var m = 0; m < 5; m++) {
            if (NowHeroData[10] == teamJson.data[m].g) {
                $(heroDiv).children(".heroChangeDetail").append("<div class='heroZhan'></div>");
                break;
            }
        }
    }
}

//加载英雄升级吃的英雄界面
var showHeroLvUpEatList = function () {
    nowHeroNum = EatHero.length;

    var tempUseJson = [];
    for (var j = 0; j < 5; j++) {
        if (teamJson.data[j].g != 0)
            tempUseJson.push(teamJson.data[j].g);
    }

    var tempTeamFlag;

    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < heroJson.data.length; x++) {
        var tempSplit = heroJson.data[x].g.split(",");
        if (tempSplit[10] == LvUpData.gsid)
            continue;

        tempTeamFlag = false;
        //如果已经在队伍中 不显示
        for (var y = 0; y < tempUseJson.length; y++) {
            if (tempUseJson[y] == tempSplit[10]) {
                tempUseJson.splice(y, 1);
                tempTeamFlag = true;
                break;
            };
        }
        if (tempTeamFlag) {
            continue;
        }

        tempMemoryJson.data.push(heroJson.data[x]);
        tempUseIndex.push(x);
    }

    if (tempMemoryJson.data.length == 0) {
        showTextMess("没有可吞噬的武将", 2);
        $("#pagePrevBtn,#pageNextBtn").unbind("touchstart").unbind("touchmove").unbind("touchend");
        $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>0</font><font style='color:#26E50E;'>/0</font><br/>武将数:<font style='color:#26E50E'>0/" + userJson.gnum + "</font>");
        return;
    }


    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    //取升级英雄的技能 判断技能是否相同
    for (var y = 0; y < localHeroJson.data.length; y++) {
        if (localHeroJson.data[y].gid == heroJson.data[LvUpData.index].g.split(",")[0]) {
            tempSkillId = localHeroJson.data[y].activeskill;
            break;
        }
    }

    showHeroEatPage();


}

//英雄吃每页
var showHeroEatPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var NowHeroData = tempMemoryJson.data[i].g.split(",");

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("gsid", NowHeroData[10]);
        heroDiv.setAttribute("index", tempUseIndex[i]);

        var tempHeroDetail;
        for (var j = 0; j < localHeroJson.data.length; j++) {
            if (localHeroJson.data[j].gid == Number(NowHeroData[0])) {
                tempHeroDetail = localHeroJson.data[j];
                break;
            }
        }

        arr.length = 0;

        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' style='background-image:url(res/adv/detail.png);' ontouchstart='begin()' ontouchmove='move()' ontouchend='LvUpEatChooseClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' style='background-image:url(res/adv/detail.png);' ontouchstart='begin()' ontouchmove='move()' ontouchend='LvUpEatChooseClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        var tempExp = "";
        //武将技能名称
        var tempSkillName;
        for (var j = 0; j < skillJson.data.length; j++) {
            if (skillJson.data[j].skillid == tempHeroDetail.activeskill) {
                tempSkillName = skillJson.data[j].name;
                break;
            }
        }
        if (NowHeroData[1] == NowHeroData[14])
            tempExp = "<font style='color:#26E50E;'> x2</font>";
        var tempSkill = "<font style='color:lightgray;'>"+tempSkillName+"(异)</font>";
        if (tempHeroDetail.activeskill == tempSkillId) {
            tempSkill = "<font style='color:#26E50E;'>" + tempSkillName + "(同)</font>";
        }

        var tempFlag = false;
        for (var x = 0; x < EatHero.length; x++) {
            if (EatHero[x] == NowHeroData[10]) {
                tempFlag = true;
                break;
            }
        }
        if (tempFlag) {
            arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:115px;'>经验:" + Math.floor((tempHeroDetail.makeexp*Number(NowHeroData[1]))) + "" + tempExp + "</td><td>" + tempSkill + "</td></tr></table><div class='check checkHover' ></div></div>")
        }
        else {
            arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:115px;'>经验:" + Math.floor((tempHeroDetail.makeexp*Number(NowHeroData[1]))) + "" + tempExp + "</td><td>" + tempSkill + "</td></tr></table><div class='check' ></div></div>")
        }
        
        heroDiv.innerHTML = arr.join("");
        $("#teamChange #heroChangePage0").append(heroDiv);

        if (nowHeroNum == 6) {
            teamLockAll = true;
            $("#heroChangePage0").find(".check:not(.checkHover)").addClass("checkLock").parent().css("background-position", "0px -78px");
        }

    }
}

//选择升级英雄事件
var LvUpEatClick = function () {

    $("#LvUpEatOk").show().bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if (EatHero.length == 0) {
            showTextMess("请选择吞噬武将");
            return;
        }
        var sendJson = new Array();
        var tempJson = new Array();
        sendJson.push(EatHero.join(","));
        tempJson.push(EatHero2.join(","));
        LvUpData.s = sendJson.join("");
        LvUpData.c = tempJson.join("");
        var sendJson = "{\"gsid\":" + heroJson.data[LvUpData.index].g.split(",")[10] + ",\"g\":\"" + LvUpData.s + "\"}";
        window.GameMainClass.sendRequestJson(112, sendJson, "loadUpLvHeroDetail");
        //loadUpLvHeroDetail();
        LvUpEat = false;
        $("#temp").html("");
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

}

//选择升级英雄事件
var LvUpChooseClick = function (ev) {
    if (cancel())
        return;
    if (LvUpData.gsid != 0 && EatHero.length != 0) {
        LvUpData.index = $(ev).parent().attr("index");
        LvUpData.gsid = $(ev).parent().attr("gsid");
        var sendJson = new Array();
        var tempJson = new Array();
        sendJson.push(EatHero.join(","));
        tempJson.push(EatHero2.join(","));
        LvUpData.s = sendJson.join("");
        LvUpData.c = tempJson.join("");
        var sendJson = "{\"gsid\":" + heroJson.data[LvUpData.index].g.split(",")[10] + ",\"g\":\"" + LvUpData.s + "\"}";
        window.GameMainClass.sendRequestJson(112, sendJson, "loadUpLvHeroDetail");
        loadUpLvHeadDetail();
        //loadUpLvHeroDetail();
        LvUpEat = false;
        $("#temp").html("");
    }
    else {
        LvUpData.index = $(ev).parent().attr("index");
        LvUpData.gsid = $(ev).parent().attr("gsid");
        $("#temp").html("");
        $(".LvUpEat_font").show();

        loadUpLvHeadDetail();
    }
}

//选择吃的英雄事件
var LvUpEatChooseClick = function (ev) {
    if (cancel())
        return;

    var tempCheck = $(ev).children(".check");
    if (tempCheck.hasClass("checkLock"))
        return;

    if (tempCheck.hasClass("checkHover")) {
        tempCheck.removeClass("checkHover");
        if (nowHeroNum >= 6) {
            $("#heroChangePage0").find(".check:not(.checkHover)").removeClass("checkLock").parent().css("background-position-y", "-156px");
            teamLockAll = false;
        }
        nowHeroNum--;
        for (var x = 0; x < EatHero.length; x++) {
            if (EatHero[x] == $(ev).parent().attr("gsid")) {
                EatHero.splice(x, 1);
                EatHero2.splice(x, 1);
                break;
            }
        }
    } else {
        nowHeroNum++;
        tempCheck.addClass("checkHover");
        if (nowHeroNum >= 6) {
            teamLockAll = true;
            $("#heroChangePage0").find(".check:not(.checkHover)").addClass("checkLock").parent().css("background-position-y", "-78px");
        }
        EatHero.push($(ev).parent().attr("gsid"));
        EatHero2.push($(ev).parent().attr("index"));
    }
}

var showLvUpStill = function () {
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": "21" });
    document.body.appendChild(maskDiv);

    $("#temp").html("<div id='mess3'><div id='q_title'style='left:70px;'><div id='q_titleLeft'></div><div id='q_titleCenter'><div id='q_titleContext'style='background-image:url(res/public/title/28.png);'></div></div><div id='q_titleRight'></div></div><div id='t_waikuan'><div class='q_jiao q_shangjiao'></div><div class='q_jiao q_xiajiao'></div><div class='q_jiao q_zuojiao'></div><div class='q_jiao q_youjiao'></div><div class='q_shangwaibian'></div><div class='q_xiawaibian'></div><div class='q_zuowaibian'></div><div class='q_youwaibian'></div></div><div id='dialogclose'></div><div id='rope'></div><div id='tempDialog3'><div id='lottery_content3'>主公吞噬的武将里主帅品质的，是否确定继续吞噬升级武将？</div></div><div id='shopCancelBtn'style='width:91px;left:260px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>取消</div><div class='btn3'></div></div></div><div id='shopOkBtn'style='width:91px;left:130px;'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");
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

    //绑定事件
    $("#shopOkBtn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        $("#temp").html("");
        $("#tempMask2").remove();
        var sendJson = "{\"gsid\":" + heroJson.data[LvUpData.index].g.split(",")[10] + ",\"g\":\"" + LvUpData.s + "\"}";
        window.GameMainClass.sendRequestJson(111, sendJson, "UpLvEatBack");
    }).bindAnimate();
}