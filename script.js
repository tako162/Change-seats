const memberNames = [];
// const allMemberCount = memberNames.length;
//TEST
let allMemberCount = 37;
//TEST END
let usedSeats = [];
let drawCount = 0;


function draw() {
drawCount++;
let seat;
    do {
        seat = Math.floor(Math.random() * allMemberCount) + 1;
        }
    } while(isUsedSeat(seat));
return seat;
}

function isUsedSeat(seat){
   return usedSeats.includes(seat);
}

//座席を生成(CSS未連携)
function addSeat(count) {
    var seats = document.getElementsByClassName("parent")[0];
    for (let i = 1; i < count + 1; i++) {
        seats.insertAdjacentHTML("beforeend", `<div id="seat${i}" class="div${i}"></div>`);
    }
}
addSeat(allMemberCount);





