const memberNames = [];
//TEST
// const allMemberCount = memberNames.length;
const allMemberCount = 37;
//TEST END

const usedSeatNombers = [];
let drawCount = 0;

function draw() {
    drawCount++;
    var random = Math.floor(Math.random() * allMemberCount + 1); 
    var seat = documents.getElementById(`seat${random}`);
}

//座席を生成(CSS未連携)
function addSeat(count) {
    var seats = document.getElementsByClassName("parent")[0];
    for (let i = 1; i < count + 1; i++) {
        seats.insertAdjacentHTML("beforeend", `<div id="seat${i}" class="div${i}"></div>`);
    }
}
addSeat(allMemberCount);

