/// <reference path="public.js" />
/// <reference path="json.js" />
/// <reference path="jquery-1.5.1.min.js" />

//var taskJson = { "data": [{ "mid": 2000, "isover": 0 }, { "mid": 8012, "isover": 1 }, { "mid": 2003, "isover": 1 }, { "mid": 1004, "isover": 1 }], "resert": 1 };
var taskJson;

var showTask = function () {
    $("#dialog").html("<div id='task'><div id='title'><div id='titleLeft'></div><div id='titleCenter'><div id='titleContext'style='background-image:url(res/public/title/30.png);'></div></div><div id='titleRight'></div></div><div id='waikuan'><div id='shangjiao'class='jiao shangjiao'></div><div id='xiajiao'class='jiao xiajiao'></div><div id='zuojiao'class='jiao zuojiao'></div><div id='youjiao'class='jiao youjiao'></div><div class='shangwaibian'></div><div class='xiawaibian'></div><div class='zuowaibian'></div><div class='youwaibian'></div></div><div id='close'></div><div id='rope'></div><div id='taskMain'><div id='task_left'><div class='taskSwiper'><div class='swiper-wrapper'></div></div></div><div id='task_middle'></div><div id='task_right'><div id='taskName'></div><div id='task_detail_juti'><br/><font style='color:red;'></font></div><div id='task_detail_mubiao'></div><div id='task_detail_jiangli'><div class='task_detail_item'></div><div class='task_detail_item'></div><div class='task_detail_item'></div></div></div></div><div id='task_btn'class='ShopBtn'><div class='btn'><div class='btn1'></div><div class='btn2'>领取</div><div class='btn3'></div></div></div><div id='taskIcon'class='hero_icon hero_icon_select'></div></div>");

    $("#mask").show();
    $("#task").css({ "top": (height - 460) / 2 - 10 });
    if (pad)
        $("#task").css({ "top": ((height - 470 * sp) / 2) / sp });

    //加载任务列表
    loadTaskList();

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

    //领取任务奖励事件
    $("#task_btn").bind("touchend", function () {
        $(this).css({ "-webkit-transform": "scale(1)" });
        if (cancel())
            return;
        if ($(this).attr("can") == "true") {
            window.GameMainClass.sendRequestJson(130, "{\"mid\":" + $(this).attr("mid") + "}", "taskReward");
            window.GameMainClass.playEffectSound("icon");
        }
    }).bindAnimate();
}

//加载任务列表
var loadTaskList = function () {
    $("#task_left .swiper-wrapper").html("");

    if (!taskJson.data)
        return;


    //按是否完成排序
    taskJson.data.sort(function (a, b) {
        return a.isover == 1 ? 0 : 1;
    })
    
    for (var x = 0; x < taskJson.data.length; x++) {
        for (var i = 0; i < localTaskJson.data.length; i++) {
            if (localTaskJson.data[i].mid == taskJson.data[x].mid) {

                if (localTaskJson.data[i].name.indexOf("更多任务")!=-1)
                    continue;

                //将本地index保存起来
                var div = document.createElement("div");
                div.className = "swiper-slide";
                
                var arr = new Array();
                arr.push("<div class='task_select'></div><div class='taskItem'");
                if (taskJson.data[x].isover)
                    arr.push(">" + localTaskJson.data[i].name + "</div><div class='taskFinish'></div>");
                else
                    arr.push(">" + localTaskJson.data[i].name + "</div>");
                arr.push("</div>");

                $(div).html(arr.join(""));
                $(div).attr("localindex", i);
                $(div).attr("index", x);
                $("#task_left .swiper-wrapper").append(div);
                break;
            }
        }
    }

    //滑动
    var TaskSwiper = new Swiper('.taskSwiper', {
        mode: 'vertical',
        slidesPerSlide: 6
    });

    //绑定列表事件
    $(".taskItem").bind("touchend", function () {
        if (cancel())
            return;
        $(".task_select").hide();
        $(".taskItemSelect").removeClass("taskItemSelect");
        var tempDiv = $(this).parent();
        $(".taskItem").css("color", "white");
        $(this).css("color", "orange").addClass("taskItemSelect").siblings(".task_select").show();
        loadTaskDetail(tempDiv.attr("localindex"), tempDiv.attr("index"));
    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })



    //默认加载第一个任务的具体
    var tempFirstDiv=$(".taskItem").eq(0);
    if (tempFirstDiv) {
        tempFirstDiv.css("color", "orange");
        tempFirstDiv.addClass("taskItemSelect").siblings(".task_select").css("display", "block");
        loadTaskDetail(tempFirstDiv.parent().attr("localindex"), tempFirstDiv.parent().attr("index"));
    }

}

//加载任务具体信息
var loadTaskDetail = function (localindex, index) {
    var detail = taskJson.data[index];
    var localDetail = localTaskJson.data[localindex];
    var div = $("#task_right");
    div.find("#taskName").text(localDetail.name);
    div.find("#task_detail_juti").html(localDetail.detail);
    div.find("#task_detail_mubiao").html(localDetail.object);

    var tempStr = "";
    //加载奖励的物品
    var wardStr = localDetail.rewardID.split(",");
    var wardNum = localDetail.rewardNum.split(",");
    for (var i = 0; i < wardStr.length; i++) {
        switch (wardStr[i]) {
            case "200":
                tempStr += "<div class='wardDiv'><div class='wardItem' style='background-image:url(res/ward/200.png);'></div>银币+" + wardNum[i] + "</div>";
                break;
            case "400":
                tempStr += "<div class='wardDiv'><div class='wardItem' style='background-image:url(res/ward/400.png);'></div>声望+" + wardNum[i] + "</div>";
                break;
            case "600":
                tempStr += "<div class='wardDiv'><div class='wardItem' style='background-image:url(res/ward/600.png);'></div>萌币+" + wardNum[i] + "</div>";
                break;
            case "800":
                tempStr += "<div class='wardDiv'><div class='wardItem' style='background-image:url(res/ward/800.png);'></div>万能将魂+" + wardNum[i] + "</div>";
                break;
            case "105":
                tempStr += "<div class='wardDiv'><div class='wardItem' style='background-image:url(res/ward/105.png);'></div>荣誉+" + wardNum[i] + "</div>";
                break;
            default:
                tempStr += "<div class='wardDiv'><div class='wardItem' style='background-image:url(res/ward/other.png);'></div>其它+" + wardNum[i] + "</div>";
                break;
        }
    }
    div.find("#task_detail_jiangli").html(tempStr);

    if (detail.isover) {
        $("#task_btn").attr("can", true).attr("mid", detail.mid).children().removeClass("abtn");
    }
    else {
        $("#task_btn").attr("can", false).attr("mid", detail.mid).children().addClass("abtn");
    }
        
}

//设置任务json(进游戏设置)
var setTaskJson = function (json) {
    taskJson = JSON.parse(json);
}

//任务完成
var taskOK = function (json) {
    var tempJson = JSON.parse(json);

    //后台统计
    window.GameMainClass.MissiononCompleted(String(tempJson.mid));

    for (var i = 0; i < taskJson.data.length; i++) {
        if (taskJson.data[i].mid == tempJson.mid) {
            taskJson.data[i].isover = 1;
            changeRemain("task", 1);
            break;
        }
    }
}

//领取任务奖励
var taskReward = function (json) {
    var tempJson = JSON.parse(json);
    //var tempJson = { "bag": [{ "p": "840,0,2003,6,0,1,0,1,0" }], "data": [{ "isover": 0, "mid": 1001 }, { "isover": 0, "mid": 1200 }, { "isover": 0, "mid": 3000 }], "info": "usp_MissionReward ok", "resert": 1, "reward": { "item": "100,200,2003", "num": "101,102,1" } };
    
    if (tempJson.resert == 1) {


        //后台统计 传入新的任务id
        for (var i = 0; i < tempJson.data.length; i++) {
            var tempFlag = false;
            for (var j = 0; j < taskJson.data.length; j++) {
                if (taskJson.data[j].mid == tempJson.data[i].mid) {
                    taskJson.data.splice(j, 1);
                    tempFlag = true;
                    break;
                }
            }
            if (tempFlag) {
                //传入
                window.GameMainClass.MissiononBegin(String(tempJson.data[i].mid));
                break;
            }
        }


        //替换
        taskJson.data = tempJson.data;

        //图标小图标
        var tempNum = 0;
        for (var i = 0; i < tempJson.data.length; i++) {
            if (tempJson.data[i].isover == 1)
                tempNum++;
        }
        changeRemain("task", tempNum - remainJson.task);

        showTaskReward(tempJson);

        loadTaskList();
    }
    else {
        showTextMess(tempJson.info, 2);
    }
}

//显示任务奖励窗口
var showTaskReward = function (tempJson) {
    //var tempJson = { "bag": [{ "p": "840,0,2003,6,0,1,0,1,0" }], "data": [{ "isover": 0, "mid": 1001 }, { "isover": 0, "mid": 1200 }, { "isover": 0, "mid": 3000 }], "info": "usp_MissionReward ok", "resert": 1, "reward": { "item": "100,200,2003", "num": "101,102,1" } };

    var tempItem = tempJson.reward.item.split(",");
    var tempNum = tempJson.reward.num.split(",");

    for (var i = 0; i < tempItem.length; i++) {
        updateUserJson(tempItem[i], tempNum[i]);
    }

    showGetItemAnimate(tempJson);

    //领取按钮
    $("#r_btn").bind("touchend", function () {
        if (cancel())
            return;
        //关闭窗口
        $("#rewardDialog").remove();
        $("#tempMask").remove();

    }).bind("touchstart", function () {
        begin();
    }).bind("touchmove", function () {
        move();
    })

}