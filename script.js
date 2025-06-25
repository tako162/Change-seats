const allMemberCount = 37;
const probabilities = 1000; // 優先抽選の確率（％）
var memberNames = ["たくも", "ゆい", "みずき", "かりな", "わか", "しゅんすけ", "ひろむ", "かいどう", "しん", "れい", "きさと", "ゆうだい", "きっぺい", "ときわ", "ゆうか", "なる", "ひろたか", "みずは", "そうた", "はると", "こうき", "かなみち", "はやと", "こころ", "おうが", "かおるこ", "こうせい", "りん", "ゆき", "あやの", "ちさき", "たくと", "あすか", "めい", "れな", "ひかる", "こういちろう"];

let drawCount = 0;
const usedSeats = [];    // 使われた席番号
const seatAssignments = {}; // { member: seat }

const priorityWishes = {
    7: [25, 19, 29, 35, 23, 31, 7, 16],  // 6回目の希望席（複数）
    11: [31, 13, 25, 23]// 10回目の希望席（使われるのは隣席が空いていない場合）
};

let sixthSeat = null; // 6回目の席を記録

function isUsedSeat(seat) {
    return usedSeats.includes(seat);
}

function getRandomSeat() {
    let seat;
    do {
        if (frontMode.checked) {
            seat = Math.floor(Math.random() * 12) + 1;
        } else {
            seat = Math.floor(Math.random() * allMemberCount) + 1;
        }
    } while (isUsedSeat(seat));
    return seat;
}

function getHorizontalNeighbors(seat) {
    const rowStart = Math.floor((seat - 1) / 6) * 6 + 1;
    const rowEnd = rowStart + 5;
    const neighbors = [];

    if (seat + 1 <= rowEnd && !isUsedSeat(seat + 1)) {
        neighbors.push(seat + 1);
    }
    if (seat - 1 >= rowStart && !isUsedSeat(seat - 1)) {
        neighbors.push(seat - 1);
    }

    return neighbors;
}

function drawNextMember() {
    if (drawCount >= allMemberCount) {
        console.log("全員抽選済みです！");
        return null;
    }

    drawCount++;
    const member = drawCount;

    let seat = null;

    // 7回目：複数希望席のうち空いているものから優先
    if (drawCount === 7 && Math.random() * 100 < probabilities) {
        const wishedSeats = priorityWishes[7] || [];
        const availableWished = wishedSeats.filter(seat => !isUsedSeat(seat));
        if (availableWished.length > 0) {
            seat = availableWished[Math.floor(Math.random() * availableWished.length)];
            sixthSeat = seat;
            console.log(`🎯 7回目: メンバー${member}が希望席${seat}に当選！`);
        }
    }

    // 11回目：6回目の横の空席が優先
    else if (drawCount === 11 && Math.random() * 100 < probabilities) {
        if (sixthSeat !== null) {
            const neighbors = getHorizontalNeighbors(sixthSeat);
            if (neighbors.length > 0) {
                seat = neighbors[Math.floor(Math.random() * neighbors.length)];
                console.log(`👥 11回目: メンバー${member}が6回目の人の隣席${seat}に決定！`);
            }
        }

        // 横が全部埋まっていたら希望席候補を試す
        if (seat === null) {
            const wishedSeats = priorityWishes[11] || [];
            const availableWished = wishedSeats.filter(seat => !isUsedSeat(seat));
            if (availableWished.length > 0) {
                seat = availableWished[Math.floor(Math.random() * availableWished.length)];
                console.log(`⭐️ 11回目: メンバー${member}が希望席${seat}に当選（隣席空いてなかったため）`);
            }
        }
    }

    // 通常抽選
    if (seat === null) {
        seat = getRandomSeat();
        console.log(`🎲 ${drawCount}回目: メンバー${member}がランダム席${seat}に決定`);
    }

    usedSeats.push(seat);
    seatAssignments[member] = seat;

    if (drawCount === 7 && sixthSeat === null) {
        sixthSeat = seat;
    }



    document.getElementsByClassName("div" + seat)[0].innerText = `${memberNames[member - 1]}`;
    // document.getElementById("resultText").innerText = `${drawCount}回目:${seat}`;
    // document.getElementById("resultText").innerText = `${drawCount}回目: メンバー${member} → 席${seat}`;

    frontMode.checked = false;

    return { member, seat };
}

function drawAllMembers() {
    while (drawCount < allMemberCount) {
        drawNextMember();
    }
}