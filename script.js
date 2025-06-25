const allMemberCount = 37;
const priorityMembers = [6, 10]; // 抽選回数6回目、10回目で優先抽選
const probabilities = 80; // 優先抽選の確率（％）

let drawCount = 0;
const usedSeats = [];    // 使われた席番号
const seatAssignments = {}; // { member: seat }

// 希望席（回数ベース）
const priorityWishes = {
    6: 25,  // 6回目の希望席
    10: 8   // 10回目の希望席（ただし隣席優先で使わないかも）
};

let sixthSeat = null; // 6回目の席を記録

// 席が使われているか判定
function isUsedSeat(seat) {
    return usedSeats.includes(seat);
}

// 空いている席をランダムで取得
function getRandomSeat() {
    let seat;
    do {
        seat = Math.floor(Math.random() * allMemberCount) + 1;
    } while (isUsedSeat(seat));
    return seat;
}

// 1列6席の横の隣席（空席のみ）
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

function drawNextMember() {
    if (drawCount >= allMemberCount) {
        console.log("全員抽選済みです！");
        return null;
    }

    drawCount++;
    const member = drawCount; // メンバーは順番（1〜37）

    let seat = null;

    if (drawCount === 6 && Math.random() * 100 < probabilities) {
        const wishedSeat = priorityWishes[6];
        if (wishedSeat && !isUsedSeat(wishedSeat)) {
            seat = wishedSeat;
            sixthSeat = seat;
            console.log(`🎯 6回目: メンバー${member}が希望席${seat}に当選！`);
        }
    }
    else if (drawCount === 10 && Math.random() * 100 < probabilities) {
        if (sixthSeat !== null) {
            const candidates = getHorizontalNeighbors(sixthSeat);
            if (candidates.length > 0) {
                seat = candidates[Math.floor(Math.random() * candidates.length)];
                console.log(`👥 10回目: メンバー${member}が6回目の人の隣席${seat}に決定！`);
            }
        }
    }

    if (seat === null) {
        seat = getRandomSeat();
        console.log(`🎲 ${drawCount}回目: メンバー${member}がランダム席${seat}に決定`);
    }

    usedSeats.push(seat);
    seatAssignments[member] = seat;

    // 6回目の席が決まらなければここで記録
    if (drawCount === 6 && sixthSeat === null) {
        sixthSeat = seat;
    }

    document.getElementById("resultText").innerText = `${drawCount}回目:${seat}`;
    return { member, seat };
}