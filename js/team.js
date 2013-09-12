/// <reference path="public.js" />

//加载队伍
var teamJson;
//var teamJson = { "data": [{ "g": 19883 }, { "g": 18978 }, { "g": 18790 }, { "g": 19207 }, { "g": 18399 }], "resert": 1, "teampower": 0, "usedleader": 126 };

var teamMemory = [];
var teamLockAll = false;
var tempMemoryJson = { "data": [] };
var tempUseIndex = [];

var showTeam = function () {
    $("#flagData1").html("<font id='teamLead'>" + teamJson.usedleader + "</font>/" + userJson.leader);
    $("#team .man2").each(function () {
        var heroDiv = $(this).parent();
        var heroId = heroDiv.index();
        heroDiv.children(".man2").css("background-image", "");
        heroDiv.children(".heroDetail2").text("");
        heroDiv.children(".cityHeroLv").html("");
        heroDiv.children(".shidi").css("background-image", "url(res/man/sdbg1.png)");
        heroDiv.children(".shangdi").show();
        heroDiv.find(".man_job2").show();
        if (teamJson.data[$(this).parent().index()].g != 0) {
            var heroDetail = getHeroDetailByGsid(teamJson.data[heroId].g).split(",");
            heroDiv.children(".man2").css("background-image", "url(res/man/" + heroDetail[15] + ".png)");
            heroDiv.find(".heroDetail2").css("color", getColor(heroDetail[8])).text(heroDetail[3]);
            heroDiv.children(".cityHeroLv").html(getLv(heroDetail[1]));


            heroDiv.children(".shangdi").css("background-image", "url(res/man/q" + heroDetail[8] + ".png)");
            heroDiv.find(".man_job2").css("background-position", getJobSamll(heroDetail[7], heroDetail[16]));
            if (IsSuperHero(parseInt(heroDetail[2]))) {
                heroDiv.children(".shidi").css("background-image", "url(res/man/sdbg2.png)");
            }
            else {
                heroDiv.children(".shidi").css("background-image", "url(res/man/sdbg1.png)");
            }
        } else {
            heroDiv.children(".shangdi").hide();
            heroDiv.find(".man_job2").hide();
            heroDiv.find(".heroDetail2").html("");
        }
    })
}

var setTeamJson = function (json) {
    teamJson = JSON.parse(json);

    showTeam();
}

//加载换队员界面
var showTeamChange = function () {
    $("#dialog").html("<div id='hero'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='teamChange'><div id='heroSwiper'class='swiper-container heroSwiper'><div class='swiper-wrapper'id='heroWrapper'></div></div></div><div id='nowLeadValue'></div><div id='heroPageData'></div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='HeroChangeBtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定上阵</div><div class='btn3'></div></div></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>");

    $("#hero").css("top", (height - 480) / 2);
    if (pad)
        $("#hero").css({ "top": ((height - 470 * sp) / 2) / sp });
    $("#mask").show();
    setTitle(8)

    showTeamChangeList();

    $("#HeroChangeBtn").show();

    //统帅力
    $("#nowLeadValue").html("统帅力:<span style='color:#26E50E;'id='currentLead'>" + teamJson.usedleader + "</span><span style='color:#26E50E;'>/" + userJson.leader + "</span>");

    //获取上阵英雄数
    getTeamHeroNum();

    //英雄详情信息
    $("#teamChange .heroChange .heroHeadBg").bind("touchstart", function (e) {
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
        showTeamPage();
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
        showTeamPage();
    }).bind("touchstart", function () {
        $(this).css({ "-webkit-transform": "scale(0.8)" });
        begin();
    }).bind("touchmove", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        move();
    })


    //确定按钮
    $("#HeroChangeBtn").bind("touchend", function () {
        $(this).children().removeClass("btnDown");
        if (cancel())
            return;
        var oldTeam = [];
        oldTeam.push(teamJson.data[0].g);
        oldTeam.push(teamJson.data[1].g);
        oldTeam.push(teamJson.data[3].g);
        oldTeam.push(teamJson.data[4].g);

        var teamResult = [];
        for (var i = 0; i < oldTeam.length; i++) {
            var tempFlag = false;
            var tempIndex = 0;
            for (var m = 0; m < teamMemory.length; m++) {
                if (teamMemory[m] == oldTeam[i]) {
                    tempFlag = true;
                    tempIndex = m;
                    break;
                }
            }
            
            if (tempFlag) {
                teamResult.push(teamMemory[m]);
                teamMemory.splice(m, 1);
            }
            else {
                teamResult.push("0");
            }

        }


        for (var i = 0; i < teamMemory.length; i++) {
            for (var x = 0; x < teamResult.length; x++) {
                if (teamResult[x] == 0) {
                    teamResult[x] = teamMemory[i];
                    break;
                }
            }
        }
        teamResult.splice(2, 0, teamJson.data[2].g);

        window.GameMainClass.sendRequestJson(108, '{"team":"' + teamResult.join(",") + '"}', "changeTeamBack");




    }).bind("touchstart", function () {
        begin();
        $(this).children().addClass("btnDown");
    }).bind("touchmove", function () {
        move();
    })

    //绑定关闭事件
    $("#tempClose").bind("touchend", function () {
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

    //英雄详情信息
    $("#teamChange .heroChange .heroHeadBg").bind("touchstart", function (e) {
        begin();
    }).bind("touchmove", function () {
        move();
    }).bind("touchend", function (e) {
        if (!cancel()) {
            event.stopPropagation();
            showHeroDetail();
        }
    })
}

//换队员列表
var showTeamChangeList = function () {
    var i = 0;
    teamLockAll = false;


    teamMemory.length = 0;
    if(teamJson.data[0].g!=0)
        teamMemory.push(teamJson.data[0].g);
    if (teamJson.data[1].g != 0)
        teamMemory.push(teamJson.data[1].g);
    if (teamJson.data[3].g != 0)
        teamMemory.push(teamJson.data[3].g);
    if (teamJson.data[4].g != 0)
        teamMemory.push(teamJson.data[4].g);


    //如果已经有四个武将了 则直接锁住
    var tempTeamFlag = true;
    for (var i = 0; i < 5; i++) {
        if (teamJson.data[i].g == 0) {
            tempTeamFlag = false;
            break;
        }
    }
    if (tempTeamFlag) {
        teamLockAll = true;
    }


    usePage = 0;

    useLength = heroJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    showTeamPage();
}

var showTeamPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {

        var NowHeroData = heroJson.data[i].g.split(",");

        var tempHeroDetail = getLocalHeroDetail(NowHeroData[0]);

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("gsid", NowHeroData[10]);
        heroDiv.setAttribute("lead", NowHeroData[6]);

        arr.length = 0;

        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroChooseClick(this)' style='background-position-y:0px'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroChooseClick(this)' style='background-position-y:0px'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        if (NowHeroData[13] == 1)
            arr.push("<div class='heroLock' style='width:15px;'></div>");
        arr.push("<table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + NowHeroData[6] + " </td></tr></table><div class='check' ></div></div>")


        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        if (NowHeroData[10] == teamJson.data[2].g)
            $(heroDiv).children(".heroChangeDetail").css("background-position-y", "-78px").children(".check").removeClass(".checkHover").addClass("checkForeverLock");

        for (var m = 0; m < teamMemory.length; m++) {
            if (NowHeroData[10] == teamMemory[m]) {
                $(heroDiv).find(".check").addClass("checkHover");
                break;
            }
        }

        if (teamLockAll) {
            $("#heroChangePage0").find(".check:not(.checkHover,.checkForeverLock)").addClass("checkLock").parent().css("background-position-y", "-78px");
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

//加载换队长界面
var showLeadChange = function () {
    $("#dialog").html("<div id='hero'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='tempClose'></div><div id='rope'></div><div id='nowLeadValue'></div><div id='teamChange'><div id='heroSwiper'class='swiper-container heroSwiper'><div class='swiper-wrapper'id='heroWrapper'></div></div></div><div id='heroPageData'>页数1/2<br/>英雄数:20/26</div><div id='pagePrevBtn'></div><div id='pageNextBtn'></div><div id='HeroChangeBtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>确定上阵</div><div class='btn3'></div></div></div><div id='select_icon'class='hero_icon hero_icon_select'></div></div>");

    $("#hero").css("top", (height - 480) / 2);
    if (pad)
        $("#hero").css({ "top": ((height - 470 * sp) / 2) / sp });
    $("#mask").show();
    setTitle(9)

    showLeadList();

    //统帅力
    $("#nowLeadValue").html("统帅力:<span style='color:#26E50E;'id='currentLead'>" + teamJson.usedleader + "</span><span style='color:#26E50E;'>/" + userJson.leader + "</font>");

    //获取上阵英雄数
    getTeamHeroNum();

    //绑定选择事件
    $(".heroChangeDetail").bind("touchend", function () {
        if (cancel())
            return;
        var tempCheck = $(this).children(".check");

        if (tempCheck.hasClass("checkLock") || tempCheck.hasClass("checkForeverLock"))
            return;

        $(this).css("background-position", "0px 0px");

        changeLeader();


    })

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
        showLeadPage();
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
        showLeadPage();
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

    //英雄详情信息
    $("#teamChange .heroChange .heroHeadBg").bind("touchstart", function (e) {
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

//换队长列表
var showLeadList = function () {

    usePage = 0;

    useLength = heroJson.data.length;

    usePageAll = Math.ceil(useLength / 8) - 1;

    $("#heroPageData").html("页数:<font id='pageNow' style='color:#26E50E;'>1</font><font style='color:#26E50E;'>/" + Math.ceil(useLength / 8) + "</font><br/>武将数:<font style='color:#26E50E'>" + useLength + "/" + userJson.gnum + "</font>");

    $("#heroWrapper").append("<div class='swiper-slide hero-slide' id='heroside0'><div id='heroChangePage0' class='heroChangePage'></div></div>");

    showLeadPage();
}

var showLeadPage = function () {

    $("#heroChangePage0").html("");
    $("#pageNow").text(usePage + 1);

    var tempLastIndex = useLength > (usePage + 1) * 8 ? (usePage + 1) * 8 : useLength;

    var arr = new Array();

    for (var i = usePage * 8; i < tempLastIndex; i++) {


        var NowHeroData = heroJson.data[i].g.split(",");

        var tempHeroDetail = getLocalHeroDetail(NowHeroData[0]);

        var heroDiv = document.createElement("div");
        heroDiv.className = "heroChange";
        heroDiv.setAttribute("gsid", NowHeroData[10]);
        heroDiv.setAttribute("index", i);

        arr.length = 0;

        if (IsSuperHero(Number(NowHeroData[2]))) {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/s" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroLeadChooseClick(this)' style='background-position-y:0px'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        else {
            arr.push("<div class='noHeroHeadBg' ontouchstart='begin()' ontouchmove='move()' ontouchend='showHeroDetailClick(this)'><img class='heroHeadColor' style='z-index:2;left:3px' src='res/head/" + NowHeroData[8] + ".png' ></img><img style='z-index:1;left:3px' class='heroHead' src='res/head/" + NowHeroData[15] + ".png'></img></div><div class='heroChangeDetail' ontouchstart='begin()' ontouchmove='move()' ontouchend='heroLeadChooseClick(this)' style='background-position-y:0px'><div class='heroLv'>" + getLv(NowHeroData[1]) + "</div>");
            arr.push("<div class='jobSamll' style='background-position:" + getJobSamll(NowHeroData[7], NowHeroData[16]) + "'></div>");
        }
        if (NowHeroData[13] == 1)
            arr.push("<div class='heroLock' style='width:15px;'></div>");
        arr.push("<div class='check'></div><table class='heroTable'><tr><td style='color:" + getColor(NowHeroData[8]) + "'>" + NowHeroData[3] + "</td></tr><tr><td style='width:95px;'>" + NowHeroData[4] + "</td><td style='width:85px;'>" + NowHeroData[5] + "</td><td style='width:54px;'>" + NowHeroData[6] + " </td></tr></table><div class='check' ></div></div>")

        heroDiv.innerHTML = arr.join("");
        $("#heroChangePage0").append(heroDiv);

        //队长永久锁住
        if (teamJson.data[2].g == NowHeroData[10])
            $(heroDiv).children(".heroChangeDetail").css("background-position", "0px -78px").children(".check").removeClass(".checkHover").addClass("checkForeverLock");

        //"战"字
        for (var m = 0; m < 5; m++) {
            if (NowHeroData[10] == teamJson.data[m].g) {
                $(heroDiv).children(".heroChangeDetail").append("<div class='heroZhan'></div>");
                break;
            }
        }
    }
}

//点击事件
var heroMoveClick = function (ev) {
    move();
}

var heroStartClick = function (ev) {
    begin();
}

//选队员
var heroChooseClick = function (ev) {
    if (cancel())
        return;

    var tempCheck = $(ev).children(".check");

    if (tempCheck.hasClass("checkLock") || tempCheck.hasClass("checkForeverLock"))
        return;
    $(ev).css("background-position", "0px 0px");

    if (tempCheck.hasClass("checkHover")) {
        tempCheck.removeClass("checkHover");
        if (nowHeroNum >= 4) {
            $("#heroChangePage0").find(".check:not(.checkHover,.checkForeverLock)").removeClass("checkLock").parent().css("background-position-y", "0px");
            teamLockAll = false;
        }
        nowHeroNum--;
        for (var i = 0; i < teamMemory.length; i++) {
            if (teamMemory[i] == Number($(ev).parent().attr("gsid"))) {
                teamMemory.splice(i, 1);
                break;
            }
        }
        $("#currentLead").text(Number($("#currentLead").text()) - Number($(ev).parent().attr("lead")));
        if (Number($("#currentLead").text()) <= userJson.leader) {
            $("#currentLead").css("color", "#26E50E");
        }
    } else {
        nowHeroNum++;
        tempCheck.addClass("checkHover");
        if (nowHeroNum >= 4) {
            $("#heroChangePage0").find(".check:not(.checkHover,.checkForeverLock)").addClass("checkLock").parent().css("background-position-y", "-78px");
            teamLockAll = true;
        }
        $("#currentLead").text(Number($("#currentLead").text()) + Number($(ev).parent().attr("lead")));
        if (Number($("#currentLead").text()) > userJson.leader) {
            showTextMess("统帅力不足", 2);
            $("#currentLead").css("color", "red");
        }
        teamMemory.push($(ev).parent().attr("gsid"))
    }
}

//选队长
var heroLeadChooseClick = function (ev) {
    if (cancel())
        return;
    var tempCheck = $(ev).children(".check");

    if (tempCheck.hasClass("checkLock") || tempCheck.hasClass("checkForeverLock"))
        return;

    changeLeader(ev);
}

//队长详细
var showTeamInfoDetail = function () {
    window.GameMainClass.sendRequestJson(197, "", "showTeamPower");
    $("#mask").show().css("opacity","0");
}

var showTeamPower=function(json){
   var tempJson= JSON.parse(json);
    teamJson.teampower=tempJson.teampower;
    window.GameMainClass.sendRequestJson(109, "{\"gsid\":" + teamJson.data[2].g + ",\"just\":\"just\"}", "showTeamHeroDetailBack");
}

var teamDetailClick = function (ev) {
    if (cancel())
        return;
    if ($("#teamDetailSelect").is(":animated"))
        return; 
    $("#teamDetailSelect").animate({ "top": ($(ev).index() - 1) * 78 },"normal");
    window.GameMainClass.sendRequestJson(109, "{\"gsid\":" + $(ev).attr("gsid") + "}", "showTeamHeroDetailBack");
}

//显示队伍英雄详情
var showTeamHeroDetailBack = function (json) {
    var heroDetailJson = JSON.parse(json);
    //var heroDetailJson = { "Client": [{ "gsid": 1643 }], "g": "1680,1,258,208,2,1,2,1643,0,1", "resert": 1 };
    if (heroDetailJson.resert != 1) {
        showTextMess(heroDetailData.info, 2);
        return;
    }
    $("#mask").css("opacity","0.3");
    //$("#d_bg").remove();
    if (heroDetailJson.Client[0].just) {
        $("body").append("<div id='d_bg'><div id='close' style='right:10px;'></div><div id='d_btn'class='bossBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>关闭</div><div class='btn3'></div></div></div><div id='d_equip0'><div class='d_equipImg'></div></div><div id='d_equip1'><div class='d_equipImg'></div></div><div id='d_equip2'><div class='d_equipImg'></div></div><div id='d_equip3'><div class='d_equipImg'></div></div><div id='dDialog_man'><div class='heroequip_heroDetail'style='left:0px;top:-122px;'></div><div class='heroEquipshidi'></div><div class='shangdi'></div><div class='d_man'></div><div class='d_man_job'></div><div id='d_star'></div><div id='d_type'></div></div><div id='d_left'><div id='detail_skillNormal'><div class='detail_skillTitle'>普通技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div></div><div id='detail_skillActive'><div class='detail_skillTitle'>武将技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div><div class='detail_skillLv'></div></div><div id='detail_skillPassive'><div class='detail_skillTitle'>被动技能</div><div class='detail_skillName'></div><div class='detail_skillDetail'></div></div><div id='detail_skillLeader'><div class='detail_skillTitle'>统帅技能</div><div class='detail_skillName'style='color:#26E50E;'></div><div class='detail_skillDetail'></div></div><div id='detail_something'></div><div id='detail_Come'></div></div><div id='detail_lv'></div><div id='detail_hp'></div><div id='detail_atk'></div><div id='detail_lead'></div></div>");
        var str = [];

        //队长
        var tempJson = [];
        tempJson.push(teamJson.data[2].g);
        if (teamJson.data[0].g != 0)
            tempJson.push(teamJson.data[0].g);
        if (teamJson.data[1].g != 0)
            tempJson.push(teamJson.data[1].g);
        if (teamJson.data[3].g != 0)
            tempJson.push(teamJson.data[3].g);
        if (teamJson.data[4].g != 0)
            tempJson.push(teamJson.data[4].g);

        var tempSplit;
        for (var i = 0; i < tempJson.length; i++) {
            for (var x = 0; x < heroJson.data.length; x++) {
                tempSplit = heroJson.data[x].g.split(",");
                if (tempSplit[10] == tempJson[i]) {
                    str.push("<div ontouchstart='begin()' ontouchmove='move()' ontouchend='teamDetailClick(this)' gsid=" + tempSplit[10] + " style='left:20px;top:17px;' class='heroHeadBg'><img class='heroHeadColor' src='res/head/" + tempSplit[8] + ".png'></img><img class='heroHead' src='res/head/" + tempSplit[15] + ".png'></img><div class='heroLv'>" + getLv(tempSplit[1]) + "</div></div>")
                    break;
                }
            }
        }

        $("body").append("<div id='teamPower'><div id='tempPowerContent'>" + teamJson.teampower + "</div></div><div id='teamDetail' style=''><div id='teamDetailSelect'></div>" + str.join("") + "</div>");
        $("#teamDetail").css({ "left": (width - 650) / 2 - 47, "top": (height - 440) / 2 + 10 });
        $("#teamPower").css({ "left": (width - 650) / 2 + 60, "top": (height - 440) / 2 });

        //绑定关闭事件
        $("#close,#d_btn").bind("touchend", function () {
            $(this).css("-webkit-transform", "scale(1)");
            if (cancel())
                return;
            window.GameMainClass.playEffectSound("close");
            $("#d_bg").remove();
            $("#mask").hide();
            $("#teamDetail,#teamPower").remove();
        }).bind("touchstart", function () {
            begin();
            $(this).css("-webkit-transform", "scale(0.8)");
        }).bind("touchmove", function () {
            $(this).css("-webkit-transform", "scale(1)");
            move();
        });
    }
    else {
    }
    $("#d_bg").css({ "left": (width - 650) / 2 + 55, "top": (height - 440) / 2 });

    if (pad) {
        $("#d_bg").css({ "zoom": sp, "left": (width - 650 * sp) / 2 / sp + 55, "top": (height - 440 * sp) / 2 / sp });
        $("#teamDetail").css({ "left": (width - 650 * sp)/2 / sp - 47, "top": (height - 440 * sp) / 2 / sp + 10, "zoom": sp });
        $("#teamPower").css({ "left": (width - 650 * sp)/2 / sp + 60, "top": (height - 440 * sp) / 2 / sp, "zoom": sp });
    }

    var detailDiv = $("#d_bg");


    var x = 0;
    var j = localHeroJson.data.length;
    var heroDetailData = heroDetailJson.g.split(",");
    for (; x < j ; x++) {
        if (localHeroJson.data[x].gid == heroDetailData[0])
            break;
    }


    //重置装备数据
    for (var i = 0; i < 4; i++) {
        $("#d_equip" + i).html("<div class='d_equipImg'></div>").css("background-image","");
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
                        $("#d_equip0").unbind("touchend");
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
                        $("#d_equip2").unbind("touchend");
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
                        $("#d_equip1").unbind("touchend");
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
                        $("#d_equip3").unbind("touchend");
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
}