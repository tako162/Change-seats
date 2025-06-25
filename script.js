const allMemberCount = 37;
const probabilities = 1000; // 優先抽選の確率（％）
var memberNames = ["たくも", "ゆい", "みずき", "かりな", "わか", "しゅんすけ", "ひろむ", "かいどう", "しん", "れい", "きさと", "ゆうだい", "きっぺい", "ときわ", "ゆうか", "なる", "ひろたか", "みずは", "そうた", "はると", "こうき", "かなみち", "はやと", "こころ", "おうが", "かおるこ", "こうせい", "りん", "ゆき", "あやの", "ちさき", "たくと", "あすか", "めい", "れな", "ひかる", "こういちろう"];

let drawCount = 0;
const usedSeats = [];
const seatAssignments = {};

const priorityWishes = {
    7: [25, 19, 29, 35, 23, 31, 7, 16],
    11: [31, 13, 25, 23]
};

let sixthSeat = null;

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

    if (drawCount === 7 && Math.random() * 100 < probabilities) {
        const wishedSeats = priorityWishes[7] || [];
        const availableWished = wishedSeats.filter(seat => !isUsedSeat(seat));
        if (availableWished.length > 0) {
            seat = availableWished[Math.floor(Math.random() * availableWished.length)];
            sixthSeat = seat;
            console.log(`🎯 7回目: メンバー${member}が希望席${seat}に当選！`);
        }
    } else if (drawCount === 11 && Math.random() * 100 < probabilities) {
        if (sixthSeat !== null) {
            const neighbors = getHorizontalNeighbors(sixthSeat);
            if (neighbors.length > 0) {
                seat = neighbors[Math.floor(Math.random() * neighbors.length)];
                console.log(`👥 11回目: メンバー${member}が6回目の人の隣席${seat}に決定！`);
            }
        }

        if (seat === null) {
            const wishedSeats = priorityWishes[11] || [];
            const availableWished = wishedSeats.filter(seat => !isUsedSeat(seat));
            if (availableWished.length > 0) {
                seat = availableWished[Math.floor(Math.random() * availableWished.length)];
                console.log(`⭐️ 11回目: メンバー${member}が希望席${seat}に当選（隣席空いてなかったため）`);
            }
        }
    }

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

    frontMode.checked = false;

    return { member, seat };
}

function drawNextMemberWithRandomHighlight(callback) {
    if (drawCount >= allMemberCount) {
        console.log("全員抽選済みです！");
        if (callback) callback();
        return;
    }

    const flashCountPerSeat = 1;
    const flashDelay = 25;

    const availableSeats = Array.from({ length: allMemberCount }, (_, i) => i + 1)
        .filter(seat => !isUsedSeat(seat));

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledSeats = shuffle(availableSeats);

    let seatIndex = 0;
    let flashCycle = 0;
    let isHighlightOn = false;

    function highlightNextSeat() {
        if (seatIndex >= shuffledSeats.length) {
            const result = drawNextMember();
            const target = document.querySelector(`.div${result.seat}`);
            if (target) {
                target.style.backgroundColor = '#bfa06a';
            }
            if (callback) callback();
            return;
        }

        const seatNumber = shuffledSeats[seatIndex];
        const currentSeat = document.querySelector(`.div${seatNumber}`);

        if (isHighlightOn) {
            if (currentSeat) currentSeat.style.backgroundColor = '#bfa06a';
            isHighlightOn = false;
            flashCycle++;
            if (flashCycle >= flashCountPerSeat) {
                seatIndex++;
                flashCycle = 0;
            }
        } else {
            if (currentSeat) currentSeat.style.backgroundColor = '#999999';
            isHighlightOn = true;
        }

        setTimeout(highlightNextSeat, flashDelay);
    }

    highlightNextSeat();
}

function drawAllMembers() {
    while (drawCount < allMemberCount) {
        drawNextMember();
    }
}