const getMoment = () => {
    return moment().format('YYYY-MM-DD HH:MM:ss');
}

const carTime= getMoment();
const timeContainer = document.querySelector(".time-container");
timeContainer.innerHTML = `<p>${carTime}</p>`;

setInterval(() => {
    let carTime = getMoment();
    timeContainer.innerHTML = `<p>${carTime}</p>`;
}, 1000);

const calcBtn = document.querySelector('.calc-btn');
calcBtn.addEventListener('click', (e) => { 
    e.preventDefault();
    const adultCount = Number(document.querySelector('#adult-count').value);
    const kidsCount = Number(document.querySelector('#kids-count').value);

    let adultFee = Number(document.querySelector('#adult-fee').value);
    let kidsFee = Number(document.querySelector('#kids-fee').value);
    
    const hour = moment().hours();
    if (hour >= 18) {
        adultFee =  Number(document.querySelector('#night-adult-fee').value);
        kidsFee = kidsFee = Number(document.querySelector('#night-kids-fee').value);
    }

    let totalCount = (adultCount * adultFee) + (kidsCount * kidsFee);
    const discountGroupArr = document.getElementsByName('group-discount');
    
    const selected = Array.from(discountGroupArr).find(elem => elem.checked);
    const imgEl = document.querySelector('.fee-img');
    

    if (selected.value && adultCount + kidsCount >=5) {
        totalCount *=  0.8;
        imgEl.src = "images/cat_run.png";
    }

    const inputs = document.querySelectorAll('.calc-container input[required]');
    inputs.forEach(input => {
        if (input) {  
            if (!input.value || isNaN(input.value)) {
                imgEl.src = "images/cat_stand.png";
                const label = document.querySelector(`label[for="${input.id}"]`).textContent;
                alert(`${label} 값을 올바르게 입력해주세요.`);
            }
        }
    })

    const totalEl = document.querySelector('#total-fee');
    totalEl.value = totalCount;
    
}); 

const randomEventBtn = document.querySelector(".random-event-btn");

randomEventBtn.addEventListener('click',(e) => {
    e.preventDefault();
    let ballCount = 0;
    const countPeople = document.querySelector('#entering-input').value;
    if (!countPeople || countPeople < 6) {
        alert('6 이상의 숫자를 입력해주세요.');
        ballCount = countPeople;
    } else {
        ballCount = 6;
    }
    const arr = [];
    for (let i = 0; i < ballCount; i++) {
        const randomNum = parseInt(Math.random() * countPeople + 1);
        if (arr.includes(randomNum)) {
            console.log("중복")
            i--;
        } else {
            arr.push(randomNum);
        }
    }

    const container = document.querySelector('.prize-container');
    container.remove();
    arr.forEach((num, index) => {
        const ball = document.createElement('div');
        ball.className = 'ball';
        ball.textContent = num;
        
        setTimeout(() => {
            container.appendChild(ball);
        }, 1000 * index)
        
    });
    
    

})


const countInput = document.querySelectorAll('.count-input-container input');

countInput.forEach(el => 
    el.addEventListener('input', (e) => {
        let adultCount = parseInt(document.querySelector('#adult-count').value);
        let kidsCount = parseInt(document.querySelector('#kids-count').value);
      
    
        if (adultCount + kidsCount >= 5) {
            document.querySelector('.none-discount').checked = false;
            document.querySelector('.discount').checked = true;
        } else {
            document.querySelector('.none-discount').checked = true;
            document.querySelector('.discount').checked = false;
        }
    })
)
