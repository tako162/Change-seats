const allMemberCount = 37;
const priorityMembers = [6, 10];
const defaultProbability = 80;

let drawCount = 0;
const usedSeats = [];
const seatAssignments = {};

const priorityWishes = {
    6: [
        { seat: 30, probability: 30 },
        { seat: 25, probability: 70 },
        { seat: 19, probability: 30 }
    ],
    10: [
        { seat: 8, probability: 60 },
        { seat: 9, probability: 30 }
    ]
};

let sixthSeat = null;

function isUsedSeat(seat) {
    return usedSeats.includes(seat);
}

function getRandomSeat() {
    let seat;
    do {
        seat = Math.floor(Math.random() * allMemberCount) + 1;
    } while (isUsedSeat(seat));
    return seat;
}

function getHorizontalNeighbors(seat) {
    const rowStart = Math.floor((seat - 1) / 6) * 6 + 1;
    const rowEnd = rowStart + 5;
    const neighbors = [];

    if (seat - 1 >= rowStart && !isUsedSeat(seat - 1)) {
        neighbors.push(seat - 1);
    }
    if (seat + 1 <= rowEnd && !isUsedSeat(seat + 1)) {
        neighbors.push(seat + 1);
    }

    return neighbors;
}

function chooseSeatByProbability(seatOptions) {
    const available = seatOptions.filter(opt => !isUsedSeat(opt.seat));
    for (const opt of available) {
        if (Math.random() * 100 < opt.probability) {
            return opt.seat;
        }
    }
    return null;
}

function drawNextMember() {
    if (drawCount >= allMemberCount) {
        console.log("全員抽選済みです！");
        return null;
    }

    drawCount++;
    const member = drawCount;
    let seat = null;

    // 6回目: 希望席を個別確率で選ぶ
    if (drawCount === 6) {
        const wishedOptions = priorityWishes[6] || [];
        seat = chooseSeatByProbability(wishedOptions);
        if (seat !== null) {
            sixthSeat = seat;
            console.log(`🎯 6回目: メンバー${member}が希望席${seat}に当選！`);
        }
    }

    // 10回目: 6回目の横席優先 → だめなら希望席
    else if (drawCount === 10) {
        if (sixthSeat !== null && Math.random() * 100 < defaultProbability) {
            const neighbors = getHorizontalNeighbors(sixthSeat);
            if (neighbors.length > 0) {
                seat = neighbors[Math.floor(Math.random() * neighbors.length)];
                console.log(`👥 10回目: メンバー${member}が6回目の隣席${seat}に決定！`);
            }
        }

        if (seat === null) {
            const wishedOptions = priorityWishes[10] || [];
            seat = chooseSeatByProbability(wishedOptions);
            if (seat !== null) {
                console.log(`⭐️ 10回目: メンバー${member}が希望席${seat}に当選（隣席NG時）`);
            }
        }
    }

    // 通常席ランダム
    if (seat === null) {
        seat = getRandomSeat();
        console.log(`🎲 ${drawCount}回目: メンバー${member}がランダム席${seat}に決定`);
    }

    usedSeats.push(seat);
    seatAssignments[member] = seat;

    if (drawCount === 6 && sixthSeat === null) {
        sixthSeat = seat;
    }

    document.getElementById("resultText").innerText = `${drawCount}回目: メンバー${member} → 席${seat}`;
    return { member, seat };
}
