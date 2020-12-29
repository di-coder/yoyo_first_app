







var shut = null;
var spd = null;
var level_ins = null;
var shuttle_ins = null;
var speed_ins = null;
var data_count = null;
var no = null;
var element = [];
var local_data = null;
function createfunction(data) {
     local_data = data
    // UI Design(CountDown Timer)
     var split_time = local_data[local_data.length - 1].commulativeTime.split(":")
     var minutes = Number((split_time[0]*60))
     var seconds = Number(split_time[1])
     var after_split = minutes + seconds
     var counter = document.getElementById('counter').getContext('2d');
     no = after_split;
     var no1 = after_split;
     var pointToFill = 4.72;
     var cw = counter.canvas.width;
     var ch = counter.canvas.height;
     var diff;
    function fillCounter() {
        diff = ((no / no1) * Math.PI * 2 * 10);
        counter.clearRect(0, 0, cw, ch);
        counter.lineWidth = 5;
        counter.fillStyle = '#000';
        counter.strokeStyle = '#f699cd';
        counter.textAlign = 'center';
        counter.font = "12px monospace";
        counter.fillText(level_ins, 100, 42);
        counter.fillText(shuttle_ins, 100, 56);
        counter.fillText(speed_ins, 100, 70);
        counter.beginPath();
        counter.arc(100, 50, 40, pointToFill, diff / 10 + pointToFill);
        counter.stroke();
        if (no == 0) {
            clearTimeout(fill);
            counter.fillStyle = '#e3e5de';
            counter.fillRect(0, 0, cw, ch);
            counter.fillStyle = '#000';
            counter.fillText("Test Completed", 50, 80);
        }
        no--;
    }
     fill = setInterval(fillCounter, 1000);
    // Process starts
    looping(0);
    
}



function looping(a) {
    //if (a == 1) {
    //    console.log("aaaaa")
    //}
    //else {
    for (var i = 0; i < local_data.length; i++) {
        if (i == 1) {
            break;
        }
            if (i == 0) {
                task(i, local_data, 0)
            }
            else {
                var r = local_data[i - 1].commulativeTime.split(":")
                var min = Number((r[0] * 60) * 1000)
                var sec = Number(r[1] * 1000)
                var total = min + sec
                task(i, local_data, total)
            }

        }
    //}
    
}


function task(i, data, time) {
    var time = time
    var Next_shuttle = null;
    if ((data.length - 1) == i) {
        Next_shuttle = "00:00"
    }
    else {
        Next_shuttle = Next_Shuttle_difference(data[i].commulativeTime, data[i + 1].commulativeTime)
    }
    setTimeout(function () {
        level_ins = "Level " + String(data[i].speedLevel);
        shuttle_ins = "Shuttle " + String(data[i].shuttleNo);
        speed_ins = " " + String(data[i].speed) + " Km/hr"
        document.getElementById('next_shuttle').innerHTML = Next_shuttle;
        document.getElementById('total_time').innerHTML = data[i].commulativeTime;
        document.getElementById('total_distance').innerHTML = data[i].accumulatedShuttleDistance;
        shut = String(data[i].shuttleNo);
        spd = String(data[i].speedLevel);
    }, time);
}


function Next_Shuttle_difference(currentTime, nextTime) {
    curr_time = Time_Splitter(currentTime)
    nxt_time = Time_Splitter(nextTime)
    difference = nxt_time - curr_time;
    result = Time_formatter(difference)
    return result
}
function Time_formatter(milliseconds) {
    minutes = Math.round(milliseconds / (60 * 60));
    seconds = milliseconds % 60;
    return String(minutes) + ":" + String(seconds)+" S"
} 
function Time_Splitter(time) {
    var split_time = time.split(":");
    var minutes = Number((split_time[0] * 60));
    var seconds = Number(split_time[1]);
    var after_split = minutes + seconds;
    return after_split;
}


function closefunction(user) {
    document.getElementById(user.id).remove();
    Test(user);
}

function Test(user) {
    document.getElementById(user.id).remove();
    var data = spd + "-" + shut
    document.getElementById(user.name).innerHTML = data;
    console.log(document.getElementsByTagName("button").length);
    if (document.getElementsByTagName("button").length == 1) {
        no = 0;
        local_data = 0;
    }
    console.log(stop)
    
}

function cntFunction(user) {
    var count = 0;
    if (element.length != 0) {
        for (var i = 0; i < element.length; i++) {
            if (element[i].name == user.name) {
                element[i].count += 1;
                console.log(element)
            }
            else {
                count += 1
                
            }
        }
        if (count == element.length) {
            element.push({ name: user.name, id: user.id, count: 1 })
            document.getElementById(user.id).style.backgroundColor = "#313131"
        }
    }
    else {
        element.push({ name: user.name, id: user.id, count: 1 });
        document.getElementById(user.id).style.backgroundColor = "#313131"
    }

    for (var j = 0; j < element.length; j++) {
        if (user.name == element[j].name) {
            if (element[j].count == 2) {
                closefunction(element[j])
            }
        }

    }
}





