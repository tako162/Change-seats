const allMemberCount = 37;
const memberNames = [];
let drawCount = 0;
const usedSeats = [];

//座席を生成(CSS未連携)
function addSeat(count) {
    var seats = document.getElementsByClassName("parent")[0];
    for (let i = 1; i < count + 1; i++) {
        seats.insertAdjacentHTML("beforeend", `<div class="div${i}">`)
    }
}
addSeat(allMemberCount);
