document.addEventListener('DOMContentLoaded', () => {

    const randNum = Math.floor((Math.random() * 101) + 1);
    //document.getElementById('trial').innerHTML = randNum; //only for trial
    const gArray = [];
    let attempts = 10;

    const inputNum = document.getElementById('inputNum');
    const sNumbers = document.getElementById('sNumbers');
    const nofAttempts = document.getElementById('nofAttempts');
    const nGuessed = document.getElementById('nGuessed');
    const result = document.getElementById('result')
    const loadB = document.getElementById('loadB');
    const gameBotbox = document.getElementsByClassName('gameBotbox');

    nofAttempts.innerHTML = `Number of Attempts: &nbsp &nbsp ${attempts}`;

    inputNum.addEventListener('keypress', function (event) {
        if (event.key === "Enter") {
            sNumbers.click();
        }
    });

    sNumbers.addEventListener('click', () => {
        result.style.display = "hidden";
        result.innerHTML = "";

        let inputVal = Number(inputNum.value);
        let pattern = /^0\d+$/;

        if (inputVal === "" || inputVal === 0 || inputVal < 1 || inputVal >= 101 || isNaN(inputVal) || !Number.isInteger(inputVal) || pattern.test(inputNum.value)) {

            result.style.display = "block";
            result.innerHTML = 'Please enter a valid number';
            inputNum.value = "";

        } else if (inputVal == randNum) {

            result.innerHTML = `Congragulations!! You have guessed the correct number`
            refresh();

        } else if (inputVal > 0 && inputVal <= 100) {

            let arrVal = inputNum.value;

            if (gArray.includes(arrVal) == true) {

                result.style.display = "block";
                result.innerHTML = 'This number already exists';
                inputNum.value = "";

            }

            if (gArray.includes(arrVal) == false) {

                gArray.push(arrVal);
                gArrayString = gArray.join(', ');
                nGuessed.innerHTML = `Numbers Guessed: &nbsp ${gArrayString}`;
                result.style.display = "block";

                if (arrVal > randNum) {
                    result.innerHTML = `${arrVal} is the wrong number. Guess a lower number`;
                }
                if (arrVal < randNum) {
                    result.innerHTML = `${arrVal} is the wrong number. Guess a higher number`;
                }

                inputNum.value = "";

                let t = attempts - 1;
                nofAttempts.innerHTML = `Number of Attempts: &nbsp &nbsp ${t}`;
                attempts = t;

                if (attempts == 0) {
                    result.innerHTML = `You have exhausted all your attempts. The right number is ${randNum}.`
                    refresh();
                }
            }
        }

        function refresh() {

            result.style.display = "block";
            inputNum.disabled = true;
            sNumbers.disabled = true;
            loadB.style.display = "block";
            loadB.style.margin = "auto";
            inputVal = -1;
            startnewgame();
        }

        function startnewgame() {

            loadB.addEventListener('click', () => {
                location.reload();

            });

        }

    });


});