/// <reference path="team.js" />
/// <reference path="jquery-1.5.1.min.js" />
/// <reference path="json.js" />

var formIndex;

//var userFormJson = { "Client": [{ "warid": 1000, "warlv": 1, "nick": "颛孙霞" }], "form": [{ "fid": 1000, "flv": 1, "gstr": "2,4,5,1,3" }], "gold": 10, "resert": 1, "usedFormID": 1000 };
var userFormJson;


var loadLineup = function () {
    if (userFormJson == null) {
        window.GameMainClass.sendRequestJson(146, "", "setFormJson");
    } else {
        showLineup();
    }
}

var setFormJson = function (json) {
    userFormJson = JSON.parse(json);
    showLineup();
}

//布阵界面
var showLineup = function () {

    if (userFormJson.resert == 0) {
        window.GameMainClass.sendRequestJson(146, "", "setFormJson");
        return;
    }

    $("#dialog").html("<div id='hero'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='teamChange'><div id='lineupLeft'><div id='lineup_name'></div><div id='lineup_lv'></div><div id='lineup_jiacheng'></div><div id='lineup_content'></div><div id='lineup_need'></div><div id='lineup_btn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>升级阵形</div><div class='btn3'></div></div></div></div><div id='lineupCenter'><div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup'id='lineup0'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup1'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup2'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup3'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup4'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div></div><div id='lineupRight'><div class='lineup_small'><div class='lineup_icon'index='1000'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div><div class='lineup_small'><div class='lineup_icon'index='1001'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div><div class='lineup_small'><div class='lineup_icon'index='1002'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div><div class='lineup_small'><div class='lineup_icon'index='1003'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div><div class='lineup_small'><div class='lineup_icon'index='1004'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div><div class='lineup_small'><div class='lineup_icon'index='1005'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div><div class='lineup_small'><div class='lineup_icon'index='1006'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div><div class='lineup_small'><div class='lineup_icon'index='1007'></div><div class='lineup_small_select'></div><div class='lineup_use'></div></div></div></div><div id='lineupbtn'class='hero_icon hero_icon_select'></div><div id='heroequip_something'style='font-size: 16px;top: 86px;'><img src='res/public/care.png'style='vertical-align:middle;float:left;top:-6px;position: relative;margin-right: 7px;'/><div style='float:left;'>阵型等级越高，对应属性增幅越大。</div></div><div id='lineupBtn'class='LvUpBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>更换阵型</div><div class='btn3'></div></div></div></div>");
    $("#mask").show();
    $("#hero").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#hero").css({ "top": ((height - 470 * sp) / 2) / sp });

    $("#lineupBtn").show();

    setTitle(17);

    var smallDiv = $(".lineup_icon");
    for (var i = 0; i < userFormJson.form.length; i++) {
        smallDiv.eq(i).css("background-image", "url(res/lineup/small/" + smallDiv.eq(i).attr("index") + ".png)");

        if ((i + 1000) == userFormJson.usedFormID) {
            var tempUseDiv = smallDiv.eq(i);
            tempUseDiv.siblings(".lineup_use").show();
            $(".lineup_smallSelect").removeClass("lineup_smallSelect");
            tempUseDiv.parent().addClass("lineup_smallSelect");
            tempUseDiv.siblings(".lineup_small_select").show();
            formIndex = i;
        }
    }
    for (var i = userFormJson.form.length; i < 8; i++) {
        smallDiv.eq(i).parent().hide();
    }
    //formIndex = 0;
    //$(".lineup_small:first").addClass("lineup_smallSelect").children(".lineup_small_select").show();


    $(".lineup_small").bind("touchend", function () {
        $(".lineup_smallSelect").removeClass("lineup_smallSelect");
        $(this).addClass("lineup_smallSelect");
        $(".lineup_small_select").hide();

        $(this).children(".lineup_small_select").show();
    });

    showLineupDetail();

    //布阵点击事件
    $(".lineup_small").bind("touchend", function () {
        formIndex = $(this).children(".lineup_icon").attr("index") - 1000;
        //判断是否已开启
        if (formjson.data[formIndex].openlv > userJson.lv)
            showTextMess("需要等级" + formjson.data[formIndex].openlv + "才能开启", 2);
        else {
            showLineupDetail();
        }
    })

    //关闭事件
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

    //阵形升级事件
    $("#lineup_btn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        window.GameMainClass.sendRequestJson(148, "{\"formid\":" + (formIndex + 1000) + "}", "upLineupBack");
    }).bindAnimate();

    //保存阵形事件
    $("#lineupBtn").bind("touchend", function () {
        $(this).css("-webkit-transform", "scale(1)");
        if (cancel())
            return;
        if ((formIndex + 1000) == userFormJson.usedFormID) {
            showTextMess("您没有更换阵形", 2);
            return;
        }
        //{"formid":阵型id,"gsidstr":"阵型武将序号 逗号分隔"}
        var sendJson = [];
        sendJson.push("{\"formid\":" + (formIndex + 1000) + ",\"gsidstr\":\"")

        for (var i = 0; i < 5; i++) {
            var tempLineUpDiv = $("#lineup" + i);
            if (tempLineUpDiv.attr("index")) {
                sendJson.push(heroJson.data[tempLineUpDiv.attr("index")].g.split(",")[10] + ",");
            }
            else {
                sendJson.push("0,");
            }
        }
        sendJson[sendJson.length - 1] = sendJson[sendJson.length - 1].substr(0, sendJson[sendJson.length - 1].length - 1);

        sendJson.push("\"}");

        window.GameMainClass.sendRequestJson(147, sendJson.join(""), "lineupOkBack");
    }).bindAnimate();

}

//升级阵形返回

var upLineupBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "Client": [{ "formid": 1000 }], "gold": 10, "info": "up ok", "resert": 1 }
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        userFormJson.form[tempJson.Client[0].formid - 1000].flv++;

        //扣钱
        updateUserJson("600", 0 - tempJson.gold);

        showLineupDetail();
    }
}

var showLineupDetail = function () {
    $("#lineupCenter").html("<div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup_shou'></div><div class='lineup'id='lineup0'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup1'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup2'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup3'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div><div class='lineup'id='lineup4'><div class='lineup_heroHeadBg'><div class='heroHeadColor'></div><div class='heroHead'></div></div></div>");
    //重置数据
    //$("#lineup_lead").remove();
    //for (var i = 0; i < 5; i++) {
    //    var tempDiv = $("#lineup" + i);
    //    tempDiv.removeAttr("index");
    //    tempDiv.children(".lineup_heroHeadBg").css("background-image", "");
    //    tempDiv.find(".heroHeadColor").css("background-image", "");
    //    tempDiv.find(".heroHead").css("background-image", "");

    //}

    var index = 0;
    var tempSplit = formjson.data[formIndex].warpos.split(",");

    $("#lineupCenter").css("background-image", "url(res/lineup/f/" + (formIndex + 1000) + ".png)");

    //左边信息
    $("#lineup_name").css("background-position-y", -28 * formIndex);
    $("#lineup_lv").html(getCityLv(userFormJson.form[formIndex].flv));
    $("#lineup_jiacheng").html(formjson.data[formIndex].plustype + "提升<font style='color:#F2E234'>"+formjson.data[formIndex].value*userFormJson.form[formIndex].flv+"%</font>");
    $("#lineup_content").text(formjson.data[formIndex].descript);

    //按钮
    if (userFormJson.form[formIndex].flv == 20) {
        $("#lineup_btn").children().attr("class", "abtn");
        $("#lineup_need").html("<font style='color:#F2E234;'>已达最高等级</font>")
    }
    else {
        $("#lineup_btn").children().attr("class", "btn");
        $("#lineup_need").html("消耗 <font style='color:#F2E234;'> " + userFormJson.gold * userFormJson.form[formIndex].flv + "萌币</font>")
    }


    for (var i = 0; i < 9; i++) {

        if (tempSplit[i] == "0") {
            var tempLeft = Math.floor(i / 3);
            var tempTop = Math.floor(i - tempLeft * 3);

            var nowDiv = $("#lineup" + index)
            nowDiv.css({ "top": tempTop * 109 + 1, "right": tempLeft * 109 + 1 });
            
            $(".lineup_shou").eq(index).css({ "top": tempTop * 109 + 1, "right": tempLeft * 109 + 1, "background-image": "url(res/lineup/" + (index + 1) + ".png)" });

            for (var j = 0; j < heroJson.data.length; j++) {
                var heroSplit = heroJson.data[j].g.split(",");
                if (teamJson.data[userFormJson.form[formIndex].gstr.split(",")[index] - 1].g == heroSplit[10]) {
                    nowDiv.attr("index", j);
                    nowDiv.children(".lineup_heroHeadBg").css("background-image", "url(res/head/headBg.png)");
                    nowDiv.find(".heroHeadColor").css("background-image", "url(res/head/" + heroSplit[8] + ".png)");
                    nowDiv.find(".heroHead").css("background-image", "url(res/head/" + heroSplit[15] + ".png)");
                    nowDiv.append("<div class='lineup_job' style='background-position:" + getJobSamll(heroSplit[7], heroSplit[16]) + "'></div>")


                    if (userFormJson.form[formIndex].gstr.split(",")[index]==3) {
                        nowDiv.append("<div id='lineup_lead'></div>")
                    }

                    break;
                }
            }
            index++;
            new Drag(nowDiv.get(0));
        }

        posArr.length = 0;
        $(".lineup").each(function () {
            posArr.push({ "l": this.offsetLeft, "t": this.offsetTop });
        })
    }
}

//保存阵形
var lineupOkBack = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson={"Client":[{"formid":1000,"gsidstr":"808,864,863,865,858"}],"gpos":[{"gsid":808,"pos":1},{"gsid":858,"pos":5},{"gsid":863,"pos":3},{"gsid":864,"pos":2},{"gsid":865,"pos":4}],"info":"布阵OK","resert":1};
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess("布阵成功!", 1);
        userFormJson.form[formIndex].gstr = tempJson.newform;
        userFormJson.usedFormID = tempJson.Client[0].formid;

        var tempUseDiv = $(".lineup_icon").eq(formIndex);
        $(".lineup_use").hide();
        tempUseDiv.siblings(".lineup_use").show();
    }
}

//保存位置 不保存阵形
var lineupOKBackNotForm = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson={"Client":[{"formid":1000,"gsidstr":"808,864,863,865,858"}],"gpos":[{"gsid":808,"pos":1},{"gsid":858,"pos":5},{"gsid":863,"pos":3},{"gsid":864,"pos":2},{"gsid":865,"pos":4}],"info":"布阵OK","resert":1};
    if (tempJson.resert != 1) {
        showTextMess(tempJson.info, 2);
    }
    else {
        showTextMess(tempJson.info, 1);
        userFormJson.form[formIndex].gstr = tempJson.newform;
    }
}

var posArr = [];

function Drag(div) {
    var _this = this;
    this.disX = 0;
    this.disY = 0;
    this.l = 0;
    this.t = 0;
    this.oldX = div.offsetLeft;
    this.oldY = div.offsetTop;
    this.oDiv = div;

    this.oDiv.ontouchstart = function () {
        _this.fnDown();
    }
}
Drag.prototype.fnDown = function (ev) {
    if (!$(this.oDiv).attr("index"))
        return;
    var _this = this;
    var touch = event.targetTouches[0];
    this.disX = touch.clientX - this.oDiv.offsetLeft;
    this.disY = touch.clientY - this.oDiv.offsetTop;
    this.oDiv.style.zIndex = "999";
    $(this.oDiv).css("-webkit-transform", "scale(1.2)");

    this.oDiv.ontouchmove = function (event) {
        _this.fnMove(event);
    }
    this.oDiv.ontouchend = function () {
        _this.fnUp();
    }
}
Drag.prototype.fnMove = function (event) {
    event.preventDefault();
    if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        this.l = this.oDiv.offsetLeft + 20;
        this.t = this.oDiv.offsetTop + 11;
        this.oDiv.style.left = touch.clientX - this.disX + "px";
        this.oDiv.style.top = touch.clientY - this.disY + "px";
    }
}
Drag.prototype.fnUp = function () {


    for (var i = 0; i < posArr.length; i++) {
        if (this.l >= (posArr[i].l - 54) && this.l <= (posArr[i].l + 54) && this.t >= (posArr[i].t - 54) && this.t <= (posArr[i].t + 54)) {
            this.oDiv.style.left = posArr[i].l + "px";
            this.oDiv.style.top = posArr[i].t + "px";

            var tempDiv = $("#lineup" + i);

            if (tempDiv.attr("index")) {
                var forSplit = heroJson.data[tempDiv.attr("index")].g.split(",");
                var nowSplit = heroJson.data[this.oDiv.getAttribute("index")].g.split(",");

                //临时记录index
                var tempIndex = $(this.oDiv).attr("index");

                $(this.oDiv).attr("index", tempDiv.attr("index"));
                $(this.oDiv).find(".heroHeadColor").css("background-image", "url(res/head/" + forSplit[8] + ".png)");
                $(this.oDiv).find(".heroHead").css("background-image", "url(res/head/" + forSplit[15] + ".png)");
                $(this.oDiv).find(".lineup_job").remove();
                $(this.oDiv).append("<div class='lineup_job' style='background-position:" + getJobSamll(forSplit[7], forSplit[16]) + "'></div>");

                //队长旗制
                if ($(this.oDiv).children("#lineup_lead").length != 0) {
                    $(this.oDiv).children("#lineup_lead").remove();
                    tempDiv.append("<div id='lineup_lead'></div>");
                }
                else if (tempDiv.children("#lineup_lead").length != 0) {
                    tempDiv.children("#lineup_lead").remove();
                    $(this.oDiv).append("<div id='lineup_lead'></div>");
                }

                tempDiv.attr("index", tempIndex);
                tempDiv.find(".heroHeadColor").css("background-image", "url(res/head/" + nowSplit[8] + ".png)");
                tempDiv.find(".heroHead").css("background-image", "url(res/head/" + nowSplit[15] + ".png)");
                tempDiv.find(".lineup_job").remove();
                tempDiv.append("<div class='lineup_job' style='background-position:" + getJobSamll(nowSplit[7], nowSplit[16]) + "'></div>");
                lineupSave();
            }
            else {
                tempDiv.attr("index", $(this.oDiv).attr("index"));

                var nowSplit = heroJson.data[this.oDiv.getAttribute("index")].g.split(",");
                tempDiv.children(".lineup_heroHeadBg").css("background-image", "url(res/head/headBg.png)");
                tempDiv.attr("index", tempIndex);
                tempDiv.find(".heroHeadColor").css("background-image", "url(res/head/" + nowSplit[8] + ".png)");
                tempDiv.find(".heroHead").css("background-image", "url(res/head/" + nowSplit[15] + ".png)");
                tempDiv.find(".lineup_job").remove();
                tempDiv.append("<div class='lineup_job' style='background-position:" + getJobSamll(nowSplit[7], nowSplit[16]) + "'></div>");
                tempDiv.css("z-index", "2");

                //队长旗制
                if ($(this.oDiv).children("#lineup_lead").length != 0) {
                    $(this.oDiv).children("#lineup_lead").remove();
                    tempDiv.append("<div id='lineup_lead'></div>");
                }
                else if (tempDiv.children("#lineup_lead").length != 0) {
                    tempDiv.children("#lineup_lead").remove();
                    $(this.oDiv).append("<div id='lineup_lead'></div>");
                }

                $(this.oDiv).css("z-index", "2");
                $(this.oDiv).children(".lineup_heroHeadBg").css("background-image", "");
                $(this.oDiv).removeAttr("index");
                $(this.oDiv).find(".heroHeadColor").css("background-image", "");
                $(this.oDiv).find(".heroHead").css("background-image", "");
                $(this.oDiv).find(".lineup_job").remove();
                lineupSave();
            }
        }
    }
    
    this.oDiv.style.left = this.oldX + "px";
    this.oDiv.style.top = this.oldY + "px";
    this.oDiv.style.zIndex = "2";
    $(this.oDiv).css("-webkit-transform", "scale(1)");

    document.onmousemove = null;
    document.onmouseup = null;
}

var lineupSave = function () {
    //{"formid":阵型id,"gsidstr":"阵型武将序号 逗号分隔"}
    var sendJson = [];
    sendJson.push("{\"formid\":" + (formIndex + 1000) + ",\"gsidstr\":\"")

    for (var i = 0; i < 5; i++) {
        var tempLineUpDiv = $("#lineup" + i);
        if (tempLineUpDiv.attr("index")) {
            sendJson.push(heroJson.data[tempLineUpDiv.attr("index")].g.split(",")[10] + ",");
        }
        else {
            sendJson.push("0,");
        }
    }
    sendJson[sendJson.length - 1] = sendJson[sendJson.length - 1].substr(0, sendJson[sendJson.length - 1].length - 1);

    sendJson.push("\"}");

    //判断是否保存阵形
    var tempPos = "";
    
    for (var i = 0; i < 5; i++) {
        tempPos += teamJson.data[userFormJson.form[formIndex].gstr.split(",")[i]-1].g + ",";
    }
    tempPos = tempPos.substr(0, tempPos.length - 1);
    if (sendJson.join("").indexOf(tempPos) == -1)
        window.GameMainClass.sendRequestJson(200, sendJson.join(""), "lineupOKBackNotForm");
}