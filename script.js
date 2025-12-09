const memberNames = [];
const allMemberCount = memberNames.length;
const usedSeatNombers = [];
let drawCount = 0;

function draw() {
    drawCount++;
    var random = Math.floor(Math.random() * allMemberCount + 1; 
    var seat = documents.getElementById(`sear${random}`);
}

//座席を生成(CSS未連携)
function addSeat(count) {
    var seats = document.getElementsByClassName("parent")[0];
    for (let i = 1; i < count + 1; i++) {
        seats.insertAdjacentHTML("beforeend", `<div id="seat${i}" class="div${i}">`)
    }
}
addSeat(allMemberCount);

