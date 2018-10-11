$(function() {
    $(".animate").find(".loading").fadeOut(1e3, function() {}),
        // $(".kuai3Animate").on("click", ".kaimodule", function() {
        //     k3v.tryPlay()
        // }),
        $("#soundBtn").on("click", "#spanbtn", function() {
            document.getElementById("audio");
            if($("#spanbtn").hasClass('sounds')){
                ifopen = false;
                $("#soundBtn").children().removeClass("sounds").addClass("sounds2");
                k3v.sound.stop("");
                window.localStorage.setItem('ifopen','false');
            }else{
                ifopen = true;
                $("#soundBtn").children().removeClass("sounds2").addClass("sounds");
                k3v.sound.play("all");
                window.localStorage.setItem('ifopen','true');
            }
        })
});
var k3v = {}
    , tryflag = !0
    , timer = null
    , ifpaused = ""
    , animateId = {};
k3v.startGame = function(t) {
    var e = this;
    e.codePlay = function() {
        var t = $("#code").find("li");
        e.run(2, "80", "0", t),
            e.run(1, "80", "1", t),
            e.run(8, "80", "2", t)
    }
        ,
        e.run = function(t, e, n, a) {
            var i = setInterval(function() {
                $(a).eq(n).attr("class", "k3v0" + t),
                ++t >= 8 && (t = 1)
            }, e);
            animateId[n] = i
        }
        ,
    t && e.codePlay(),
        $(".linelist").find("li").addClass("redli"),
        ifpaused = "audioidB",
    ifopen && $("#spanbtn").hasClass("sounds") && k3v.sound.play("audioidR"),
        k3v.bressBG(10)
}
    ,
    k3v.stopGame = function(t) {
        this.stop = function(t, e) {
            setTimeout(function() {
                clearInterval(animateId[t]);
                var n = $("#code").find("li");
                $(n).eq(t).attr("class", "k3v" + (e == '0' ? 1 : e))
            }, 1000 * t)
        }
        ;
        for (var e = 0; e < 3; e++)
            this.stop(e, t[e])
    }
;
var trytime = [];
k3v.tryPlay = function() {
    var t = [];
    if (tryflag) {
        $("#timetitle").text("模拟开奖"),
            $("#hourtxt").hide(),
            $("#opening").show(),
            tryflag = !1,
            k3v.startGame(!0);
        var e = setTimeout(function() {
            for (var n = 0; n < 3; n++)
                t.push(Math.round(1 * Math.random() + 1));
            k3v.stopGame(t);
            var a = setTimeout(function() {
                for (var t = $("#codetop").find("li"), e = [], n = 0, a = t.length; n < a; n++)
                    e.push($(t).eq(n).text());
                k3v.stopGame(e),
                    setTimeout(function() {
                        tryflag = !0
                    }, 3e3)
            }, 8e3)
                , i = setTimeout(function() {
                $("#timetitle").text("倒计时"),
                    $("#hourtxt").show(),
                    $("#opening").hide();
                var t = $("#hourtxt").text().split(":")
                    , e = t[0]
                    , n = t[1]
                    , a = t[2]
                    , i = 3600 * (e = e < 10 ? e.substring(e.length - 1, e.length) : e) + 60 * (n = n < 10 ? n.substring(n.length - 1, n.length) : n) + 1 * (a = a < 10 ? a.substring(a.length - 1, a.length) : a);
                k3v.cutTime(i),
                    ifpaused = "audioidB",
                ifopen && $("#spanbtn").hasClass("sounds") && k3v.sound.play("audioidB"),
                    k3v.bressBG()
            }, 2e3);
            trytime.push(e),
                trytime.push(a),
                trytime.push(i)
        }, 1e3)
    } else
        $(".noinfor").fadeIn(200, "", function() {
            setTimeout(function() {
                $(".noinfor").fadeOut("300")
            }, 1e3)
        })
}
    ,
    k3v.playGame = function() {
        k3v.startGame(!0)
    }
    ,
    k3v.updateData = function(t) {
        var e = t.preDrawCode;
        $("#num1").text(e[0]),
            $("#num2").text(e[1]),
            $("#num3").text(e[2]),
            $("#sumNum").text(t.sumNum),
            $("#sumBigSmall").text(t.sumBigSmall),
            $("#sumDanShuang").text(t.danShuang),
            $("#drawIssue").text(t.drawIssue);
        var now = new Date().getTime();
        var needTime = now + t.seconds*1000;
        var time = new Date(needTime);
        var h = time.getHours(), m = time.getMinutes(),s = time.getSeconds(),str = "";
        str = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) ;
        $("#drawTime").text(str);
    }
    ,
    k3v.cutTime = function(t) {
        null != timer && clearInterval(timer);
        var t = t;
        t += 1
        timer = setInterval(function() {
            if (t >= 1) {
                t -= 1
                var e = Math.floor(t / 3600)
                    , n = Math.floor(t / 60 % 60)
                    , a = Math.floor(t % 60)
                    , i = "";
                if (i = (e < 10 ? "0" + e : e) + ":",
                        i = i + "" + (n < 10 ? "0" + n : n) + ":" + (a < 10 ? "0" + a : a),
                        $("#hourtxt").text(i),

                    t < 10) {
                    var s = $(".linelist").find("li");
                    $(s).eq(t).addClass("redli")
                }
                t < 20 && (tryflag = !1,
                    $(".noinfor").text("即将开奖"))

            } else
                $(".noinfor").text("正在开奖"),
                    clearInterval(timer),
                    k3v.playGame(),
                    $("#timetitle").text("正在开奖"),
                    $("#hourtxt").hide(),
                    $("#opening").show()
        }, 1e3)
    }
    ,
    // k3v.sound = {
    //     play: function(t) {
    //         "sounds" == $("#spanbtn").attr("class") && ifopen && ("all" == t ? document.getElementById(ifpaused).play() : (document.getElementById("audioidB").pause(),
    //             document.getElementById("audioidR").pause(),
    //             document.getElementById(t).play()))
    //     },
    //     stop: function(t) {
    //         var e = document.getElementById("audioidB");
    //         ifpaused = e.paused ? "audioidR" : "audioidB",
    //             document.getElementById("audioidB").pause(),
    //             document.getElementById("audioidR").pause(),
    //             document.getElementById("audioRing").pause()
    //
    //     }
    // },
    k3v.stopVideo = function(t,isNext) {
        console.log(t);
        k3v.stopGame(t.preDrawCode);
        if(isNext){
            setTimeout(function() {
                //t.seconds = t.seconds -3
                // djs(t.seconds);
                console.log('执行')
                $("#waiting").hide();
                $("#result").show();
                k3v.updateData(t)
                $("#timetitle").text("倒计时"),
                    $("#hourtxt").fadeIn(),
                    $("#opening").hide(),
                    $(".linelist").find("li").removeClass("redli"),
                    k3v.cutTime(t.seconds),
                    ifpaused = "audioidB",
                ifopen && $("#spanbtn").hasClass("sounds") && k3v.sound.play("audioidB"),
                    k3v.bressBG(),
                    tryflag = !0;
                if(!gameOpen){
                    gameOpen = true;
                    $('#headTwo').show()
                    $('#headOne').hide()
                }
            }, 3000);
        }else{
            k3v.updateData(t)
            $("#timetitle").text("倒计时"),
                $("#hourtxt").fadeIn(),
                $("#opening").hide(),
                $(".linelist").find("li").removeClass("redli"),
                k3v.cutTime(t.seconds),
                ifpaused = "audioidB",
            ifopen && $("#spanbtn").hasClass("sounds") && k3v.sound.play("audioidB"),
                k3v.bressBG(),
                tryflag = !0
        }
    }

    ,
    k3v.bressBG = function(t) {
        var e = 1
            , n = !1;
        void 0 != animateId.bressBG && clearInterval(animateId.bressBG),
        void 0 == t && (t = 80);
        // var a = setInterval(function() {
        //     $(".bodybg").find("img").stop().animate({
        //         opacity: "0." + e
        //     }, t),
        //         n ? (e -= 1) < 1 && (n = !1) : (e += 1) > 8 && (n = !0)
        // }, t);
        // animateId.bressBG = a
    }
;
