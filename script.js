const allMemberCount = 37;
const probabilities = 100;
var memberNames = ["たくも", "ゆい", "みずき", "かりな", "わか", "しゅんすけ", "ひろむ", "かいどう", "しん", "れい", "きさと", "ゆうだい", "きっぺい", "ときわ", "ゆうか", "なる", "ひろたか", "みずは", "そうた", "はると", "こうき", "かなみち", "はやと", "こころ", "おうが", "かおるこ", "こうせい", "りん", "ゆき", "あやの", "ちさき", "たくと", "あすか", "めい", "れな", "ひかる", "こういちろう"];

let drawCount = 0;
const usedSeats = [];
const seatAssignments = {};

const priorityWishes = {
    2:[1,2,3,4,5,6,7,8,9,10,11,12],
    4:[1,2,3,4,5,6,7,8,9,10,11,12],
    7:[25,26,27,28,29,30,31,32,33,34,35,36]
    //drawCount: [seat,seat]
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
        console.log("抽選済み");
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
            console.log(`${drawCount}回目: ${seat}`);
        }
    } else if (drawCount === 11 && Math.random() * 100 < probabilities) {
        if (sixthSeat !== null) {
            const neighbors = getHorizontalNeighbors(sixthSeat);
            if (neighbors.length > 0) {
                seat = neighbors[Math.floor(Math.random() * neighbors.length)];
                console.log(`${drawCount}回目: ${seat}`);
            }
        }

        if (seat === null) {
            const wishedSeats = priorityWishes[11] || [];
            const availableWished = wishedSeats.filter(seat => !isUsedSeat(seat));
            if (availableWished.length > 0) {
                seat = availableWished[Math.floor(Math.random() * availableWished.length)];
                console.log(`${drawCount}回目: ${seat}`);
            }
        }
    }

    if (seat === null) {
        seat = getRandomSeat();
        console.log(`${drawCount}回目: ${seat}`);
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
        console.log("抽選済み");
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
                target.style.backgroundColor = '#999999';
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
            if (currentSeat) currentSeat.style.backgroundColor = '#ffc96b';
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

function addSeat(count) {
    var seats = document.getElementsByClassName("parent")[0];
    for (let i = 1; i < count + 1; i++) {
        seats.insertAdjacentHTML("beforeend", `<div class="div${i}">`)
    }

}

addSeat(allMemberCount);








