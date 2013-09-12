/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="hero.js" />
var advHero = false;
var advEatClick;

var advHeroData = { "gsid": 0, "index": 0, "changeHero": ""};

//显示升级界面
var showAdv = function (json) {
    $("#LvUpMain").html("<div id='adv_condition'></div><div id='adv_heronow_name'class='hero_name_bg'><div id='LvUp_Hero_Name_Font'></div></div><div id='adv_heronext_name'class='hero_name_bg'><div id='LvUp_Hero_Name_Font2'></div></div><div id='manNowStar'></div><div id='advNowType'></div><div id='manNextStar'></div><div id='advNextType'></div><div id='advManNow'><div id='advManSelect'></div><div class='adv_Hero'></div><div class='adv_shidi'></div><div class='adv_shangdi'></div><div class='adv_job'></div><div id='advManDetail'></div></div><div id='advHeroDetail'><div class='advManNextDetail_left'></div><div class='advManNextDetail_right'></div><div class='advManNextDetail_result'></div></div><div id='advManNext'><div class='advNext_Hero'></div><div class='advNext_shidi'></div><div class='advNext_shangdi'></div><div class='advNext_job'></div></div><div id='advManNeed'><div id='advItem0'class='advManNeed'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='advManNeedNum'></div><div class='advManNeedNumBg'></div></div><div id='advItem1'class='advManNeed'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='advManNeedNum'></div><div class='advManNeedNumBg'></div></div><div id='advItem2'class='advManNeed'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='advManNeedNum'></div><div class='advManNeedNumBg'></div></div><div id='advItem3'class='advManNeed'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='advManNeedNum'></div><div class='advManNeedNumBg'></div></div><div id='advItem4'class='advManNeed'><div class='heroHeadColor'></div><div class='heroHead'></div><div class='advManNeedNum'></div><div class='advManNeedNumBg'></div></div></div><div id='advManGold'></div>");
    $("#mask").show();

    setTitle(7);
    $(".LvUpBtn").hide();
    $("#advManBtnOK").show();

    $("#advManNow").bind("touchend", function () {
        if (!cancel())
        {
            event.stopPropagation();
            showAdvChooseDialog();
        }
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
    })

    //升级按钮
    $("#advManBtnOK").bind("touchend", function () {
        if ($(this).attr("can")=="true") {
            var sendJson=new Array();
            sendJson.push("{\"gsid\":" + $("#advManNow").attr("gsid") + "");
            if ($("#advItem0").attr("gsid")) {
                sendJson.push(",\"eatgsid1\":" + $("#advItem0").attr("gsid") + "");
            }
            if ($("#advItem1").attr("gsid")) {
                sendJson.push(",\"eatgsid2\":" + $("#advItem1").attr("gsid") + "");
            }
            sendJson.push("}");
            window.GameMainClass.sendRequestJson(119,sendJson.join("") , "advHeroOk");
        } else {
            showTextMess("条件不满足", 2);
        }
    })
}

//选择英雄后加载下一个英雄界面
var showAdvDetail = function (json) {
    $("#advManNowDetail").show();
    $("#advManNextDetail").show();
    $("#advManNow").children().show();
    $("#advManNext").children().show();
    var tempJson = JSON.parse(json);
    
    //重置材料
    for (var i = 0; i < 5; i++) {
        var tempAdvDiv = $("#advItem" + i);
        tempAdvDiv.children(".heroHeadColor").css({ "background-image": "" })
        tempAdvDiv.children(".heroHead").css({ "background-image": "" });
        tempAdvDiv.children(".advManNeedNum").text("");
        tempAdvDiv.children(".advManNeedNumBg").hide();
        tempAdvDiv.unbind("touchend").unbind("touchmove").unbind("touchstart");

    }
    $("#advHeroDetail .advManNextDetail_left").html("");
    $("#advHeroDetail .advManNextDetail_right").html("");
    $("#advHeroDetail .advManNextDetail_result").html("");
    $("#advManGold").text("");
    //var tempJson = { "Client": [{ "gsid": 299 }], "atk": 267, "canAdv": 0, "coin": 2000, "g": "", "hp": 1932, "info": "等级不够", "maxlv": 40, "nextgid": 1002, "p": [{ "eatnum": 1, "id": 9005, "num": 0 }, { "eatnum": 1, "id": 9006, "num": 0 }, { "eatnum": 1, "id": 9007, "num": 0 }, { "eatnum": 1, "id": 9008, "num": 0 }, { "eatnum": 1, "id": 9009, "num": 0 }], "resert": 1 };
    //现在武将信息
    var nowAdvTempData = heroJson.data[$("#advManNow").attr("index")].g.split(",");
    //本地武将信息
    var nowAdvHeroData = getLocalHeroDetail(nowAdvTempData[0]);

    //加载当前英雄具体形象
    $("#LvUpHero #LvUpLight").remove();

    $("#advManNow .adv_Hero").css({ "background-image": "url(res/man/" + nowAdvTempData[15] + ".png)" });
    $("#advManNow .adv_job").css({ "background-position": getJobSamll(nowAdvHeroData.job,nowAdvHeroData.gclass) });
    $("#advManNow .adv_shangdi").css({ "background-image": "url(res/man/q" + nowAdvHeroData.q + ".png)" });
    $("#advNowType").css("background-position", -(nowAdvHeroData.gclass - 1) * 41).show();
    if (IsSuperHero(parseInt(nowAdvTempData[2]))) {
        $("#advManNow .adv_shidi").css("background-image", "url(res/man/sdbg2.png)");
    }
    else {
        $("#advManNow .adv_shidi").css("background-image", "url(res/man/sdbg1.png)");
    }
    $("#advManSelect").hide();

    //进化英雄详情
    var tempActiveSkillName;
    for (var i = 0; i < skillJson.data.length; i++) {
        if (skillJson.data[i].skillid == nowAdvHeroData.activeskill) {
            tempActiveSkillName = skillJson.data[i].name;
            break;
        }
    }
    var tempNowHeroName = "等 级<br/>生 命<br/>攻 击<br/>" + tempActiveSkillName + "";

    var tempLv;
    if (parseInt(nowAdvTempData[1]) < parseInt(nowAdvTempData[14])) {
        tempLv = "<font style='color:red;'>" + nowAdvTempData[1] + "/" + nowAdvTempData[14] + "</font>"
    }
    else
        tempLv = "" + nowAdvTempData[1] + "/" + nowAdvTempData[14] + "";
    var tempNowHeroDetail = "<font class='advManFont'>" + tempLv + "</font><br/>" + nowAdvTempData[4] + "<br/>" + nowAdvTempData[5] + "<br/>" + nowAdvTempData[12] + "/" + getSkillLv(nowAdvHeroData.q) + "</div>";
    $("#advHeroDetail .advManNextDetail_left").html(tempNowHeroName);
    $("#advHeroDetail .advManNextDetail_right").html(tempNowHeroDetail);
    $("#manNowStar").css("height", nowAdvHeroData.q * 30);
    $("#adv_heronow_name #LvUp_Hero_Name_Font").text(nowAdvTempData[3]).css("color", getColor(nowAdvTempData[8]));

    //加载下一个英雄具体形象
    var nextAdvHeroDetail = getLocalHeroDetail(tempJson.nextgid);
    //var nextAdvHeroDetail = getLocalHeroDetail(nowAdvHeroData.nextGid);
    $("#advManNext .advNext_Hero").css({ "background-image": "url(res/man/" + nextAdvHeroDetail.ImgID + ".png)" });
    $("#advManNext .advNext_job").css({ "background-position": getJobSamll(nextAdvHeroDetail.job, nextAdvHeroDetail.gclass) });
    $("#advManNext .advNext_shangdi").css({ "background-image": "url(res/man/q" + nextAdvHeroDetail.q + ".png)" });
    $("#advNextType").css("background-position", -(nextAdvHeroDetail.gclass - 1) * 41).show();
    if (IsSuperHero((parseInt(nowAdvTempData[2]) + 1))) {
        $("#advManNext .advNext_shidi").css("background-image", "url(res/man/sdbg2.png)");
    } else {
        $("#advManNext .advNext_shidi").css("background-image", "url(res/man/sdbg1.png)");
    }

    //下个英雄的技能
    var nextActiveSkillName;
    for (var i = 0; i < skillJson.data.length; i++) {
        if (skillJson.data[i].skillid == nextAdvHeroDetail.activeskill) {
            nextActiveSkillName = skillJson.data[i].name;
            break;
        }
    }
    var tempNowHeroName = "等 级<br/>生 命<br/>攻 击<br/>" + nextActiveSkillName + "";
    //技能等级是否变化
    var tempNowHeroDetail = "<font class='advManFont'>" + nowAdvTempData[14] + "/" + tempJson.maxlv + "</font><br/>" + tempJson.hp + "<br/>" + tempJson.atk + "<br/>" + (nowAdvHeroData.activeskill == nextAdvHeroDetail.activeskill ? nowAdvTempData[12] : 1) + "/"+getSkillLv(nextAdvHeroDetail.q)+"</div>";
    $("#advHeroDetail .advManNextDetail_result").html(tempNowHeroDetail);

    $("#manNextStar").css("height", nextAdvHeroDetail.q * 30);

    $("#adv_heronext_name #LvUp_Hero_Name_Font2").text(tempJson.nextgname).css("color", getColor(String(nextAdvHeroDetail.q)));

    //按钮可用

    if (tempJson.canAdv == 0) {
        $("#advManBtnOK").children().addClass("abtn");
        $("#advManBtnOK").attr("can", false);
    } else {
        $("#advManBtnOK").children().removeClass("abtn");
        $("#advManBtnOK").attr("can", true);
    }

    //消耗金币
    $("#advManGold").text("消耗银币:" + tempJson.coin);

    //加载需要的材料
    if (tempJson.p.length <= 2) {
        //英雄
        for (var i = 0; i < tempJson.p.length; i++) {
            advHeroData.changeHero = tempJson.g;
            //advHeroData.changeHero = "1,2,3";
            if (tempJson.g.split(",").length > 1) {
                $("#advItem" + i).append("<div class='advHeroChange'></div>");
            }
            var tempAdvDiv = $("#advItem" + i);
            if (tempJson.p[i].num >= 1) {
                tempAdvDiv.children(".advManNeedNum").css("color", "#26E50E").text("" + tempJson.p[i].num + "/1");
                tempAdvDiv.children(".advManNeedNumBg").show().css("background-position-y", "-18px");
            }
            else {
                tempAdvDiv.children(".advManNeedNum").css("color", "red").text("" + tempJson.p[i].num + "/1");
                tempAdvDiv.children(".advManNeedNumBg").show().css("background-position-y", "-36px");
            }
            for (var y = 0; y < localHeroJson.data.length; y++) {
                if (localHeroJson.data[y].gid == tempJson.p[i].id) {
                    if (localHeroJson.data[y].phase==2)
                        tempAdvDiv.children(".heroHeadColor").css({ "background-image": "url(res/head/s" + localHeroJson.data[y].q + ".png)" })
                    else
                        tempAdvDiv.children(".heroHeadColor").css({ "background-image": "url(res/head/" + localHeroJson.data[y].q + ".png)" })


                    tempAdvDiv.children(".heroHead").css({ "background-image": "url(res/head/" + localHeroJson.data[y].ImgID + ".png)" })
                    tempAdvDiv.attr("gid", localHeroJson.data[y].gid);
                    break;
                }
            }
            tempAdvDiv.bind("touchstart", function () {
                begin();
            }).bind("touchmove", function () {
                move();
            }).bind("touchend", function () {
                if ($(this).children(".advHeroChange").length > 0) {
                    advEatClick = $(this);
                    showAdvEatDialog();
                } else {
                    showHeroDetailNormal($(this).attr("gid"));
                }
            })

        }
    } else {
        for (var i = 0; i < 5; i++) {
            var tempAdvDiv = $("#advItem" + i);
            tempAdvDiv.children(".advManNeedNum").text("" + tempJson.p[i].num + "/1");
            if (tempJson.p[i].num >= 1) {
                tempAdvDiv.children(".advManNeedNum").css("color", "#26E50E").text("" + tempJson.p[i].num + "/1");
                tempAdvDiv.children(".advManNeedNumBg").show().css("background-position-y", "-18px");
            }
            else {
                tempAdvDiv.children(".advManNeedNum").css("color", "red").text("" + tempJson.p[i].num + "/1");
                tempAdvDiv.children(".advManNeedNumBg").show().css("background-position-y", "-36px");
            }

            for (var y = 0; y < GoodsJson.data.length; y++) {
                if (GoodsJson.data[y].ItemID == tempJson.p[i].id) {
                    tempAdvDiv.children(".heroHeadColor").css({ "background-image": "url(res/head/" + GoodsJson.data[y].Q + ".png)" });
                    tempAdvDiv.children(".heroHead").css({ "background-image": "url(res/goods/" + GoodsJson.data[y].ImgID + ".png)" });

                    tempAdvDiv.attr("itemid", tempJson.p[i].id);
                    //点击详情事件
                    tempAdvDiv.bind("touchstart", function () {
                        begin();
                    }).bind("touchmove", function () {
                        move();
                    }).bind("touchend", function () {
                        if ($(this).attr("itemid")) {
                            advGoodDetail(tempJson);
                        }
                    })

                    break;
                }
            }
            
        }
    }
}

//进化成功
var advHeroOk = function (json) {
    var tempJson = JSON.parse(json);
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info,2);
    } else {
        showTextMess(tempJson.info, 1);

        window.GameMainClass.playEffectSound("heroLvup");

        $("#advManNow").append("<div id='lvupAnimate'></div>");
        $("#advManNow .adv_Hero").animate({ "opacity": "0" }, 2000, "linear", function () {
            $("#advManNow .adv_Hero").css("opacity", "1");
        });
        var tempFlag = 0;
        var advTime = setInterval(function () {
            $("#lvupAnimate").css("background-position-x", tempFlag * 346);
            tempFlag++;
            if (tempFlag == 12) {
                clearInterval(advTime);
                $("#lvupAnimate").remove();
                $("#advManNowDetail").hide();
                $("#advManNow").children().hide();
                $("#advNowType").hide();
                $("#advManNow").css("background-image", "");
                $("#manNowStar").css("height", "0px");
                $("#LvUp_Hero_Name_Font").text("");
                for (var i = 0; i < 5; i++) {
                    var tempAdvDiv = $("#advItem" + i);
                    tempAdvDiv.children(".advManNeedNumBg").hide();
                    tempAdvDiv.children(".advManNeedNum").text("");
                    tempAdvDiv.children(".heroHeadColor").css({ "background-image": "" })
                    tempAdvDiv.children(".heroHead").css({ "background-image": "" });
                    tempAdvDiv.children(".advHeroChange").remove();
                    $("#advHeroDetail .advManNextDetail_left").html("");
                    $("#advHeroDetail .advManNextDetail_right").html("");
                    $("#advHeroDetail .advManNextDetail_result").html("");
                    $("#advManGold").text("");
                }
                $("#advManBtnOK").children().addClass("abtn");
                $("#advManBtnOK").attr("can", false);
            }
        }, 160);

        setTimeout(function () {
            $("#advManNext").append("<div id='lvupAnimate2'></div>");
            $("#advManNext .advNext_Hero").css("opacity", 0).animate({ "opacity": "1" }, 2000,"linear");
            tempFlag2 = 0;
            var advTime2 = setInterval(function () {
                $("#lvupAnimate2").css("background-position-x", tempFlag2 * 346);
                tempFlag2++;
                if (tempFlag2 == 12) {
                    clearInterval(advTime2);
                    $("#lvupAnimate2").remove();
                }
            }, 160);
        }, 1000)

        //删除吞噬掉的武将
        if (tempJson.outeatgsid1 != 0) {
            for (var i = 0; i < heroJson.data.length; i++) {
                if (heroJson.data[i].g.split(",")[10] == tempJson.outeatgsid1) {
                    heroJson.data.splice(i, 1);
                    break;
                }
            }
        }
        if (tempJson.outeatgsid2 != 0) {
            for (var i = 0; i < heroJson.data.length; i++) {
                if (heroJson.data[i].g.split(",")[10] == tempJson.outeatgsid2) {
                    heroJson.data.splice(i, 1);
                    break;
                }
            }
        }

        //改变银币
        updateUserJson("200", 0 - tempJson.coin);

        //改变物品数量
        if (tempJson.p) {
            for (var i = 0; i < tempJson.p.length; i++) {
                for (var j = 0; j < bagJson.data.length; j++) {
                    var tempSplit = bagJson.data[j].p.split(",");
                    if (tempSplit[2] == tempJson.p[i].id) {
                        if (tempSplit[5] > 1) {
                            tempSplit[5] = Number(tempSplit[5]) - 1;
                            bagJson.data[j].p = tempSplit.join(",");
                        }
                        else {
                            bagJson.data.splice(j, 1);
                        }
                        break;
                    }
                }
            }
        }

        //新武将更改
        for (var i = 0; i < heroJson.data.length; i++) {
            if (heroJson.data[i].g.split(",")[10] == tempJson.Client[0].gsid) {
                heroJson.data[i].g = tempJson.g;
                //增加现有统帅力
                //teamJson.usedleader += Number(tempJson.g.split(",")[6]) - Number(heroJson.data[i].g.split(",")[6]);
                break;
            }
        }

        //是否在队形上
        
        if (tempJson.Client[0].gsid != 0) {
            if (isHeroInTeam(tempJson.Client[0].gsid)) {
                showTeam();
            }
        }

        
    }
}

//关闭事件
var advDialogClose = function (json) {
    $("#adv").remove();
    $("#mask").hide();
    advHero = false;
    advHeroData = { "gsid": 0, "index": 0, "changeHero": "", "eat1": "", "eat2": "", "eat1Img": "", "eat2Img": "", "tempJson": "" };
}

//加载升级选择英雄界面
var showAdvChooseDialog = function () {
    $("#temp").html("<div id='advChoose'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='teamChange'><div id='heroSwiper'class='swiper-container heroSwiper'><div class='swiper-wrapper'id='heroWrapper'></div></div></div><div id='heroPageData'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='LvUpEatOk'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>");
    $("#advChoose").css({ "top": (height - 460) / 2 - 10, "left": (width - 800) / 2 });

    if (pad) $("#advChoose").css({"z-index":5, "zoom": sp, "left": (width - 800 * sp) / 2 / sp, "top": ((height - 470 * sp) / 2 / sp) });

    $("#advChoose #titleContext").css("background-image", "url(res/public/title/10.png)");
    advHeroList();


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
        showHeroAdvPage();
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
        showHeroAdvPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })


    //绑定关闭事件
    $("#tempClose").bind("touchend", function () {
        if (!cancel()) {
            $("#temp").html("");
            window.GameMainClass.playEffectSound("close");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //英雄详情信息
    $("#teamChange .heroChange .heroHeadBg").bind("touchstart", function (e) {
        begin();
    }).bind("touchmove", function () {
        move();
    }).bind("touchend", function (e) {
        if (!cancel()) {
            event.stopPropagation();
            showHeroDetail($(this).parent().attr("gsid"));
        }
    })
}

//进化英雄选择
var advHeroList = function () {
    var arr = new Array();

    tempMemoryJson.data.length = 0;
    tempUseIndex.length = 0;
    for (var x = 0; x < heroJson.data.length; x++) {
        var NowHeroData = heroJson.data[x].g.split(",");
        //不可以转生的不显示
        if (NowHeroData[2] == "12" || NowHeroData[2] == "117" || NowHeroData[2] == "125" || NowHeroData[2] == "102" || NowHeroData[2] == "0") {
            continue;
        }
        tempMemoryJson.data.push(heroJson.data[x]);
        tempUseIndex.push(x);
    }

    usePage = 0;

    useLength = tempMemoryJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    showHeroAdvPage();
}

//英雄进化每页
var showHeroAdvPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var NowHeroData = tempMemoryJson.data[i].g.split(",");

        var tempHeroDetail = getLocalHeroDetail(NowHeroData[0]);


        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("index", tempUseIndex[i]);
        heroDiv.setAttribute("gsid", NowHeroData[10]);

        arr.length = 0;

        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='advHeroChooseClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='advHeroChooseClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        arr.push("<div class='check'></div><table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + NowHeroData[1] + "/" + NowHeroData[14] + "</td></tr></table><font class='LvUpHeroCan'>等级不足</font></div>")

        heroDiv.innerHTML = arr.join("");
        if (NowHeroData[1] == NowHeroData[14]) {
            isGoodEnough(NowHeroData, tempHeroDetail, heroDiv);
        }

        //"战"字
        for (var m = 0; m < 5; m++) {
            if (NowHeroData[10] == teamJson.data[m].g) {
                $(heroDiv).children(".heroChangeDetail").append("<div style='left:260px;' class='heroZhan'></div>");
                break;
            }
        }

        $("#heroChangePage0").append(heroDiv);
    }
}

//更换升级材料英雄列表
var showEatHeroList = function () {
    var heroNowPage = 0;
    var tempFlag = 0;

    var tempSplit = advHeroData.changeHero.split(",");
    var arr = [];

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(tempSplit.length / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + tempSplit.length + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    for (var x = 0; x < tempSplit.length; x++) {
        if (tempFlag == 8) {
            heroNowPage++;
            $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside" + heroNowPage + "'><div id='heroChangePage" + heroNowPage + "' class='heroChangePage'></div></div>");
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

        arr.length = 0;
        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='advHeroChooseEatClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='advHeroChooseEatClick(this)'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + NowHeroData[1] + "/" + NowHeroData[14] + "</td></tr></table></div>")

        heroDiv.innerHTML = arr.join("");
        $("#teamChange #heroChangePage" + heroNowPage + "").append(heroDiv);

        //加载武将具体信息
        tempFlag++;
    }
}

//更换升级材料英雄界面
var showAdvEatDialog = function () {
    $("#temp").html("<div id='hero'style='position:absolute;left:" + (width - 800) / 2 + "px;top:" + (height - 480) / 2 + "px'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/10.png);'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='teamChange'><div class='swiper-container heroSwiper'id='heroSwiper'><div class='swiper-wrapper'id='heroWrapper'></div></div></div><div id='heroPageData'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='LvUpEatOk'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>");
    $("#mask").show();
    $("#hero").css({ "top": (height - 460) / 2 - 10 });

    showEatHeroList();

    //绑定选择事件
    $(".heroChangeDetail").bind("touchend", function () {
        

    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

    heroSwiper = new Swiper('#heroSwiper', {
        mode: "horizontal"
    });

    $("#pagePrevBtn").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        heroSwiper.swipePrev();
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })

    $("#pageNextBtn").bind("touchend", function () {
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("icon");
        heroSwiper.swipeNext();
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })


    //绑定关闭事件
    $("#tempClose").bind("touchend", function () {
        if (!cancel()) {
            $("#temp").html("");
            window.GameMainClass.playEffectSound("close");
        }
        $(this).css({ "-webkit-transform": "scale(1)" });
    }).bind("touchmove", function () {
        move();
    }).bind("touchstart", function () {
        begin();
        $(this).css({ "-webkit-transform": "scale(0.8)" });
    })

    //英雄详情信息
    $("#teamChange .heroChange .heroHeadBg").bind("touchstart", function (e) {
        begin();
    }).bind("touchmove", function () {
        move();
    }).bind("touchend", function (e) {
        if (!cancel()) {
            event.stopPropagation();
            showHeroDetail($(this).parent().attr("gsid"));
        }
    })
}

//材料是否足够
var isGoodEnough = function (NowHeroData, tempHeroDetail, heroDiv) {
    //材料是否足够
    switch (tempHeroDetail.gclass) {
        case 1:
            switch (Number(NowHeroData[2])) {
                case 1:
                    //绿色 新兵一套
                    if (!hasSuit(1))
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 2:
                    //蓝色 精锐一套
                    if (!hasSuit(2))
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 3:
                    //蓝+ 禁甲一套
                    if (!hasSuit(4))
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 4:
                    //名将+1 吃蓝色一个(不能自己吃自己 所以所有的都+1)
                    var tempFlag = getHeroNumByGid(NowHeroData[0] - 1);
                    if (tempFlag > 0)
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    break;
                case 5:
                    //名将+2 吃任意等级自身卡两张
                    var tempFlag = getHeroNumByGid(NowHeroData[0] - 1);
                    if (tempFlag < 2)
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 6:
                    //名将+3 吃蓝+一个
                    var tempFlag = false;
                    for (var x = 0; x < heroJson.data.length; x++) {
                        var tempSplit = heroJson.data[x].g.split(",");
                        if (tempSplit[2] == 4 && tempSplit[0] == NowHeroData[0]) {
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag)
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 7:
                    //名将变紫 吃同技能小将卡
                    var tempFlag = false;
                    var tempNowHeroDetail = getLocalHeroDetail(NowHeroData[0]);
                    for (var i = 0; i < heroJson.data.length; i++) {
                        var tempSplit = heroJson.data[i].g.split(",");
                        if (tempSplit[8] == "4" && tempSplit[2]=="122") {
                            var tempHeroDetail = getLocalHeroDetail(heroJson.data[i].g.split(",")[0]);
                            if (tempHeroDetail.gclass == 2 && tempHeroDetail.activeskill == tempNowHeroDetail.activeskill) {
                                tempFlag = true;
                                break;
                            }
                        }
                    }
                    if (!tempFlag)
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 8:
                    //紫将军 玉玺一套
                    if (!hasSuit(5))
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 9:
                    //紫将 吃紫色一个
                    var tempFlag = false;
                    for (var x = 0; x < heroJson.data.length; x++) {
                        var tempSplit = heroJson.data[x].g.split(",");
                        if (tempSplit[0] == Number(NowHeroData[0]-1)) {
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag)
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 10:
                    //紫将+1 吃紫色两个
                    var tempFlag = 0;
                    for (var x = 0; x < heroJson.data.length; x++) {
                        var tempSplit = heroJson.data[x].g.split(",");
                        if ( tempSplit[0] == Number(NowHeroData[0]-1)) {
                            tempFlag++;
                        }
                    }
                    if (tempFlag < 2)
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
                case 11:
                    //紫将+2 吃紫+一个
                    var tempFlag = false;
                    for (var x = 0; x < heroJson.data.length; x++) {
                        var tempSplit = heroJson.data[x].g.split(",");
                        if (tempSplit[2] == "9" && tempSplit[0] == NowHeroData[0]) {
                            tempFlag = true;
                            break;
                        }
                    }
                    if (!tempFlag)
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                    break;
            }
            //小将
            break;
        case 2:
            //蓝小将和紫小将
            if (NowHeroData[8] == "3" || NowHeroData[8] == "4") {
                switch (parseInt(NowHeroData[2])) {
                    case 111:
                        //小将+ 装备
                        if (!hasSuit(4))
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 112:
                        //小将+1 吃普通小将一个
                        var tempFlag = false;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[0] == (NowHeroData[0] - 1)) {
                                tempFlag = true;
                                break;
                            }
                        }
                        if (!tempFlag)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 113:
                        //小将+2 吃普通小将2个
                        var tempFlag = 0;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[0] == (NowHeroData[0] - 1)) {
                                tempFlag++;
                            }
                        }
                        if (tempFlag < 2)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 114:
                        //小将+3 吃蓝+一个
                        var tempFlag = false;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[2] == "112" && tempSplit[0] == NowHeroData[0]) {
                                tempFlag = true;
                                break;
                            }
                        }
                        if (!tempFlag)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 115:
                        //小将+4 吃蓝+1一个
                        var tempFlag = false;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[2] == "112" && tempSplit[0] == NowHeroData[0]) {
                                tempFlag = true;
                                break;
                            }
                        }
                        if (!tempFlag)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 116:
                        //蓝小将+5 吃蓝+ 2个
                        var tempFlag = 0;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[2] == "112" && tempSplit[0] == NowHeroData[0]) {
                                tempFlag ++;
                            }
                        }
                        if (tempFlag<2)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 121:
                        //小将+ 装备
                        if (!hasSuit(5))
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 122:
                        //小将+1 吃普通小将一个
                        var tempFlag = false;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[0] == (NowHeroData[0] - 1)) {
                                tempFlag = true;
                                break;
                            }
                        }
                        if (!tempFlag)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 123:
                        //小将+2 吃普通小将2个
                        var tempFlag = 0;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[0] == (NowHeroData[0] - 1)) {
                                tempFlag++;
                            }
                        }
                        if (tempFlag < 2)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                    case 124:
                        //小将+3 吃将军一个
                        var tempFlag = false;
                        for (var x = 0; x < heroJson.data.length; x++) {
                            var tempSplit = heroJson.data[x].g.split(",");
                            if (tempSplit[2] == 122 && tempSplit[0] == NowHeroData[0]) {
                                tempFlag = true;
                                break;
                            }
                        }
                        if (!tempFlag)
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                        else
                            $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                        break;
                }
            }
            //绿小将
            if (NowHeroData[8] == "2") {
                if (NowHeroData[2] == "101") {
                    if (!hasSuit(3))
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#F2E234").text("材料不足");
                    else
                        $(heroDiv).find(".LvUpHeroCan").css("color", "#26E50E").text("可以进化");
                }
            }
            break;
    }
}

//升级英雄点击事件
var advHeroChooseClick = function (ev) {
    if (cancel())
        return;
    $("#advManNow").attr("gsid", $(ev).parent().attr("gsid"));
    $("#advManNow").attr("index", $(ev).parent().attr("index"));

    $("#temp").html("");
    window.GameMainClass.sendRequestJson(118, "{\"gsid\":" + $(ev).parent().attr("gsid") + "}", "showAdvDetail");
}

//换吃的英雄事件
var advHeroChooseEatClick = function (ev) {
    if (cancel())
        return;
    $("#temp").html("");
    advEatClick.attr("gsid", $(ev).parent().attr("gsid"));
}

//吃的材料
var advGoodDetail = function (tempJson) {
    //tempJson = { "Client": [{ "gsid": 15322 }], "atk": 1054, "canAdv": 0, "coin": 2000, "g": "", "hp": 1484, "info": "等级不够", "maxlv": 40, "nextgid": 1762, "nextgname": "孙尚香", "p": [{ "eatnum": 1, "id": 9005, "num": 0 }, { "eatnum": 1, "id": 9006, "num": 0 }, { "eatnum": 1, "id": 9007, "num": 0 }, { "eatnum": 1, "id": 9008, "num": 0 }, { "eatnum": 1, "id": 9009, "num": 0 }], "resert": 1 };
    var maskDiv = document.createElement("div");
    maskDiv.id = "tempMask2";
    $(maskDiv).css({ "width": width, "height": height, "top": "0", "z-index": 20 });
    document.body.appendChild(maskDiv);

    var tempIndex = tempJson.p[0].id;

    var arr = [];

    var max=10000;

    arr.push("<div id='adv_bg' style='left:" + (width - 476) / 2 + "px;top:" + (height - 400) / 2 + "px;'>");


    switch (tempIndex) {
        case 9000:
            arr.push("<div id='adv_title' style='color:#00FF00;'>新兵令1~5</div>");
            arr.push("<div id='adv_src'>黄巾之乱~吴郡蛟龙掉落</div>");
            arr.push("<div id='adv_detail'>白帅转生绿帅专用</div>");
            break;
        case 9005:
            arr.push("<div id='adv_title' style='color:#00CCFF;'>精锐令1~5</div>");
            arr.push("<div id='adv_src'>辽东铁骑~联军皇城掉落</div>");
            arr.push("<div id='adv_detail'>绿帅转生蓝帅专用</div>");
            break;
        case 9010:
            arr.push("<div id='adv_title' style='color:#00FF00;'>羽林令1~5</div>");
            arr.push("<div id='adv_src'>精英关卡绿色武将BOSS掉落</div>");
            arr.push("<div id='adv_detail'>绿将转生绿将+专用</div>");
            break;
        case 9015:
            arr.push("<div id='adv_title' style='color:#00CCFF;'>禁甲令1~5</div>");
            arr.push("<div id='adv_src'>精英关卡蓝色武将BOSS掉落</div>");
            arr.push("<div id='adv_detail'>蓝帅、将转生蓝帅+、将+通用</div>");
            break;
        case 9020:
            arr.push("<div id='adv_title' style='color:#FF00FF;'>玉玺1~5</div>");
            arr.push("<div id='adv_src'>精英关卡紫色武将BOSS掉落</div>");
            arr.push("<div id='adv_detail'>紫帅、将转生紫帅+、将+通用</div>");
            break;
    }

    for (var i = 0; i < 5; i++) {
        var tempDetail;
        for (var j = 0; j < GoodsJson.data.length; j++) {
            if (GoodsJson.data[j].ItemID == tempIndex + i) {
                tempDetail = GoodsJson.data[j];
                break;
            }
        }
        arr.push("<div id='adv_head" + i + "' style='background-image:url(res/head/" + tempDetail.Q + ".png)'><div class='adv_img' style='background-image:url(res/goods/"+tempDetail.ImgID+".png);'></div><div class='adv_num'>" + tempJson.p[i].num + "</div></div>")
        if (max > tempJson.p[i].num)
            max = tempJson.p[i].num;
    }
    
    arr.push("<div id='adv_numAll'>已收集<font style='color:#26E50E'> " + max + " </font>套</div>")

    arr.push("<div id='dialogclose'></div><div id='lineupBtn'class='LvUpBtn'style='display:block;width:91px;left:200px;bottom:23px;'><div class='btn'><div class='btn1'></div><div class='btn2'>确定</div><div class='btn3'></div></div></div></div>");

    $("body").append(arr.join(""));

    if (pad) $("#adv_bg").css({ "zoom": sp, "left": (width - 476 * sp) / 2 / sp, "top": ((height - 400 * sp) / 2 / sp) });
    


    $("#lineupBtn,#dialogclose").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        window.GameMainClass.playEffectSound("close");
        $("#tempMask2").remove();
        $("#adv_bg").remove();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move()
    })
}