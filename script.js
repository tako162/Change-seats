const memberNames = [];
// const allMemberCount = memberNames.length;

//TEST
let allMemberCount = 37;
//TEST END
let drawCount = 0;
let usedSeats = [];
let preferredSeat = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let probability = [100, 90, 80, 70, 60, 50, 40, 30, 20];


function getRandomSeatNumber() {

}

function getRandomNumberForPrioritySeats() {

}


function draw() {
    drawCount++;
    if (drawCount <= allMemberCount) {
        let random;
        random = Math.floor(Math.random() * 100);
        if (probability[drawCount] <= random) {
            usedSeats.push(preferredSeat[drawCount]);
            document.getElementsByClassName(`div${preferredSeat[drawCount]}`)[0].innerText = `${drawCount}`;
        } else {
            random = Math.floor(Math.random() * allMemberCount) + 1;
            while (isUsedSeat(preferredSeat[drawCount])) {
                console.log("重複");
                random = Math.floor(Math.random() * allMemberCount) + 1;
            }
            usedSeats.push(random);
            document.getElementsByClassName(`div${random}`)[0].innerText = `${drawCount}`;
        }
    }
}


// function draw() {
//     drawCount++;
//     if (drawCount <= allMemberCount) {
//         let random;
//         random = Math.floor(Math.random() * allMemberCount) + 1;
//         while (isUsedSeat(random)) {
//             random = Math.floor(Math.random() * allMemberCount) + 1;
//             console.log("重複");
//         }
//         usedSeats.push(random);
//         document.getElementsByClassName(`div${random}`)[0].innerText = `${drawCount}`;
//     }
// }

function isUsedSeat(random) {
    return usedSeats.includes(random);
}

//座席を生成(CSS未連携)
function addSeat(count) {
    var seats = document.getElementsByClassName("parent")[0];
    for (let i = 1; i < count + 1; i++) {
        seats.insertAdjacentHTML("beforeend", `<div id="seat${i}" class="div${i}"></div>`);
    }
}
addSeat(allMemberCount);


















