const memberNames = [];
// const allMemberCount = memberNames.length;
//TEST
let allMemberCount = 37;
//TEST END
let usedSeatsNumbers = [];
let drawCount = 0;


function draw() {
    drawCount++;
    var random = Math.floor(Math.random() * allMemberCount + 1); 
    var seat = document.getElementById(`seat${random}`);
    do{
    usedSeartNumbers.push(random);
    document.getElementsByClassName(`div${random}`)[0].innerText = `${drawCount}/${random}`;
    console.log(`seat${random}`);
    }while(!isUsedSeats(random));
}

function isUsedSeat(num){
   return usedSears.includes(num);
}

//座席を生成(CSS未連携)
function addSeat(count) {
    var seats = document.getElementsByClassName("parent")[0];
    for (let i = 1; i < count + 1; i++) {
        seats.insertAdjacentHTML("beforeend", `<div id="seat${i}" class="div${i}"></div>`);
    }
}
addSeat(allMemberCount);











