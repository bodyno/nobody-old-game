/// <reference path="json.js" />

//var LoginJson = { "LotterItem": "1003", "LotterItemNum": "1", "LotteryHisPos": "0", "RemainingNum": 1, "lDays": 2 };
var LoginJson;

//连续登录奖励
var LoginReward = function (json) {
    LoginJson = JSON.parse(json);
    var str = new Array();
    $("#mask").show();

    divnode = document.createElement("div");
    divnode.className = 'dialogMain';
    divnode.id = "dialogMain";
    document.getElementById("dialog").appendChild(divnode);

    $("#dialogMain").css({ "position": "absolute", "z-index": "1", "top": (height - 460) / 2, "left": (width - 658) / 2 + "px", "width": 658, "height": 460, "background": "url(res/loginReward/bg.png) no-repeat" });

    if (pad)
        $("#dialogMain").css({ "left": (width - 658 * sp) / 2 / sp, "top": ((height - 470 * sp) / 2) / sp });
        //$("#dialogMain").css({ "zoom": sp, "left": (width - 658 * sp) / 2 / sp, "top": (height - 460 * sp) / 2 / sp });

    var top = 121, left = 135;
    for (var i = 0; i < 3; i++) {
        if (i < LoginJson.lDays) {
            str.push("<div class='LoginReLight LightOn' style='top:" + top + "px;left:" + left + "px;'></div>");
        }
        else {
            str.push("<div class='LoginReLight' style='top:" + top + "px;left:" + left + "px;'></div>");
        }

        top += 96;
    }

    top = 110; left = 218;

    for (var i = 0; i < 9; i++) {
        str.push("<div class='L_R_I_Bg0' id='lritem" + i + "' style='top:" + top + "px;left:" + left + "px;' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) LoginLottery(" + i + ");'></div>");

        left += 104;
        if ((i + 1) % 3 == 0) {
            top += 96;
            left = 218;
        }
    }

    str.push("<div class='ButtonSmall' id='clolseLoginReDg' style='display:none;width:53px;height:53px;right:10px;top:20px;background:url(res/dialog/close.png);'></div>");
    var divnode = document.createElement("div");
    divnode.innerHTML = str.join("");
    document.getElementById("dialogMain").appendChild(divnode);

    if (LoginJson.LotteryHisPos != "") {
        var itemlist = LoginJson.LotteryHisPos.split(",");
        for (var i = 0; i < itemlist.length; i++) {
            $("#lritem" + itemlist[i]).attr("class", "L_R_I_Bg1");
            //$("#lritem" + itemlist[i]).html("<div class='Skill' id='' ontouchmove='move()' ontouchstart='begin()' ontouchend='if (Math.abs(lastPosX - beforePosX) < 5) ' style='height:60px;top:14px;left:14px;background:url(res/goods/" + LoginJson.LotterItem.split(",")[i] + ".png) no-repeat;'><div class='rewardNum'>" + LoginJson.LotterItemNum.split(",")[i] + "</div></div>");
            $("#lritem" + itemlist[i]).html("<div class='RewardHeadBg' style='left:6px;top:6px'><div class='bagHeadColor'></div><div class='bagHead' style='background-image:url(res/goods/" + LoginJson.LotterItem.split(",")[i] + ".png);'></div><div class='rewardNum'>" + LoginJson.LotterItemNum.split(',')[i] + "</div></div>");
        }
    }

    //绑定关闭事件
    $("#clolseLoginReDg").bind("touchend", function () {
        if (!cancel()) {
            if (LoginJson.RemainingNum > 0)
                return;
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

var isSubmit = false;

//连续登录抽奖
var LoginLottery = function (index) {
    if (LoginJson.RemainingNum < 1) {
        $("#clolseLoginReDg").css("display", "");
        return;
    }
    if (LoginJson.LotteryHisPos != "") {
        var poslist = LoginJson.LotteryHisPos.split(",");
        for (var i = 0; i < poslist.length; i++) {
            if (poslist[i] == index)
                return;
        }
    }
    if (isSubmit)
        return;
    isSubmit = true;
    //提交抽奖
    window.GameMainClass.sendRequestJson(1113, '{"pos":' + index + '}', "LoginLotteryResert");
    //LoginLotteryResert();
}

//登录抽奖结果
var LoginLotteryResert = function (json) {
    isSubmit = false;
    //var BackJson = { "Client": [{ "pos": 1 }], "info": "银币+5000", "other": [{ "id": 9000, "num": 1, "type": 3 }, { "id": 5454, "num": 1, "type": 2 }, { "id": 5508, "num": 1, "type": 4 }, { "id": 9005, "num": 1, "type": 4 }, { "id": 5360, "num": 1, "type": 2 }, { "id": 8022, "num": 1, "type": 2 }, { "id": 9002, "num": 1, "type": 4 }, { "id": 8020, "num": 1, "type": 2 }], "resert": 1, "reward": { "item": 9004, "num": 1, "type": 3 }, "data": [{ "p": "3086,0,9004,30,0,1,0,2,0,0,0" }] };
    //var BackJson = { "Client": [{ "pos": 3 }], "info": "ok", "other": [{ "id": 5454, "num": 1, "type": 2 }, { "id": 3108, "num": 2, "type": 3 }, { "id": 5208, "num": 1, "type": 2 }, { "id": 4021, "num": 1, "type": 4 }, { "id": 9001, "num": 1, "type": 3 }, { "id": 8028, "num": 1, "type": 2 }, { "id": 9002, "num": 1, "type": 3 }, { "id": 9000, "num": 1, "type": 3 }], "resert": 1, "reward": { "item": 200, "num": 3000, "type": 1 }, "str": "" };
    var BackJson = JSON.parse(json);
    if (BackJson.resert == 1) {
        $("#lritem" + BackJson.Client[0].pos).attr("class", "L_R_I_Bg1");

        switch (BackJson.reward.type) {
            case 1:
                updateUserJson(String(BackJson.reward.item), BackJson.reward.num);
                $("#lritem" + BackJson.Client[0].pos).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='bagHead' style='background-image:url(res/ward/s" + BackJson.reward.item + ".png);'></div><div class='rewardNum'>" + BackJson.reward.num + "</div></div>").children().animate({ "opacity": "1" }, 3000,"linear")
                break;
            case 2:
                heroJson.data.push(BackJson.data[0]);

                var tempHeroDetail;
                for (var x = 0; x < localHeroJson.data.length; x++) {
                    if (localHeroJson.data[x].gid == BackJson.reward.item) {
                        tempHeroDetail = localHeroJson.data[x];
                        break;
                    }
                }

                $("#lritem" + BackJson.Client[0].pos).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='bagHeadColor' style='z-index:1;background-image:url(res/head/" + tempHeroDetail.q + ".png);'></div><div class='bagHead' style='background-image:url(res/head/" + tempHeroDetail.ImgID + ".png);'></div><div class='rewardNum'>" + BackJson.reward.num + "</div></div>").children().animate({ "opacity": "1" }, 3000);
                break;
            case 3:
                bagJson.data.push(BackJson.data[0]);
                $("#lritem" + BackJson.Client[0].pos).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='bagHeadColor'></div><div class='bagHead' style='background-image:url(res/goods/" + BackJson.reward.item + ".png);'></div><div class='rewardNum'>" + BackJson.reward.num + "</div></div>").children().animate({ "opacity": "1" }, 3000, "linear")
                break;
            case 4:
                if (pieceJson != null)
                    pieceJson.data.push(BackJson.data[0]);

                var tempHeroDetail;
                for (var x = 0; x < localPieceJson.data.length; x++) {
                    if (localPieceJson.data[x].gid == BackJson.reward.item) {
                        tempHeroDetail = localPieceJson.data[x];
                        break;
                    }
                }
                $("#lritem" + BackJson.Client[0].pos).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='pieceBg'></div><div class='bagHeadColor' style='z-index:1;background-image:url(res/head/" + tempHeroDetail.q + ".png);'></div><div class='bagHead' style='background-image:url(res/head/" + tempHeroDetail.imgid + ".png);'></div><div class='rewardNum'>" + BackJson.reward.num + "</div></div>").children().animate({ "opacity": "1" }, 3000, "linear");
                break;
        }

        //$("#lritem" + BackJson.Client[0].pos).html("<div class='Skill' id='' ontouchmove='move()' ontouchstart='begin()' onclick='if (!cancel())' style='height:68px;top:14px;left:14px;background:url(res/goods/" + BackJson.reward.item + ".png) no-repeat;'><div class='rewardNum'>X" + BackJson.reward.num + "</div></div>");

        //更改登录json
        if (LoginJson.LotteryHisPos != "") {
            LoginJson.LotteryHisPos += ",";
            LoginJson.LotterItem += ",";
            LoginJson.LotterItemNum += ",";
        }

        LoginJson.LotteryHisPos += String(BackJson.Client[0].pos);
        LoginJson.LotterItem += String(BackJson.reward.item);
        LoginJson.LotterItemNum += String(BackJson.reward.num);

        LoginJson.RemainingNum -= 1;
        if (LoginJson.RemainingNum < 1) {
            $("#clolseLoginReDg").css("display", "");
            var len = 0;

            var i = 0;
            var rewardTime = setInterval(function () {
                if ($("#lritem" + i).attr("class") == "L_R_I_Bg0") {

                    $("#lritem" + i).attr("class", "L_R_I_Bg2");
                    //$("#lritem" + i).html("<div class='RewardHeadBg' style='opacity:0;left:7px;top:8px'><div class='bagHeadColor'></div><div class='bagHead' style='background-image:url(res/goods/" + BackJson.other[len].id + ".png);'></div><div class='rewardNum'>" + BackJson.other[len].num + "</div><div class='rewardMask'></div></div>").children().animate({ "opacity": 1 }, 1000);
                    switch (BackJson.other[len].type) {
                        case 1:
                            $("#lritem" + i).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='bagHead' style='background-image:url(res/ward/s" + BackJson.other[len].id + ".png);'></div><div class='rewardNum'>" + BackJson.other[len].num + "</div><div class='rewardMask'></div></div>").children().animate({ "opacity": "1" }, 1000, "linear")
                            break;
                        case 2:
                            var tempHeroDetail;
                            for (var x = 0; x < localHeroJson.data.length; x++) {
                                if (localHeroJson.data[x].gid == BackJson.other[len].id) {
                                    tempHeroDetail = localHeroJson.data[x];
                                    break;
                                }
                            }
                            $("#lritem" + i).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='bagHeadColor' style='z-index:1;background-image:url(res/head/" + tempHeroDetail.q + ".png);'></div><div class='bagHead' style='background-image:url(res/head/" + tempHeroDetail.ImgID + ".png);'></div><div class='rewardNum'>" + BackJson.other[len].num + "</div><div class='rewardMask'></div></div>").children().animate({ "opacity": "1" }, 1000)
                            break;
                        case 3:
                            $("#lritem" + i).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='bagHeadColor'></div><div class='bagHead' style='background-image:url(res/goods/" + BackJson.other[len].id + ".png);'></div><div class='rewardNum'>" + BackJson.other[len].num + "</div><div class='rewardMask'></div></div>").children().animate({ "opacity": 1 }, 1000);
                            break;
                        case 4:
                            var tempHeroDetail;
                            for (var x = 0; x < localPieceJson.data.length; x++) {
                                if (localPieceJson.data[x].gid == BackJson.other[len].id) {
                                    tempHeroDetail = localPieceJson.data[x];
                                    break;
                                }
                            }
                            $("#lritem" + i).html("<div class='RewardHeadBg' style='opacity:0;left:6px;top:6px'><div class='pieceBg'></div><div class='bagHeadColor' style='z-index:1;background-image:url(res/head/" + tempHeroDetail.q + ".png);'></div><div class='bagHead' style='background-image:url(res/head/" + tempHeroDetail.imgid + ".png);'></div><div class='rewardNum'>" + BackJson.other[len].num + "</div><div class='rewardMask'></div></div>").children().animate({ "opacity": "1" }, 1000, "linear");
                            break;
                    }
                    len++;
                }
                i++;
                if(i==9)
                    clearInterval(rewardTime)
            },300)
        }
    }
    showTextMess(BackJson.info, BackJson.resert);
}
