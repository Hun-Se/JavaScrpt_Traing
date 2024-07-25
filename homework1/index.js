

const calcBtn = document.querySelector('.calc-btn');

calcBtn.addEventListener('click', (e) => {
    const adultCount = Number(document.querySelector('#adult-count').value);
    const kidsCount = Number(document.querySelector('#kids-count').value);

    const adultFee = Number(document.querySelector('#adult-fee').value);
    const kidsFee = Number(document.querySelector('#kids-fee').value);
    
    let totalCount = (adultCount * adultFee) + (kidsCount * kidsFee);
    const discountGroupArr = document.getElementsByName('group-discount');
    
    const selected = Array.from(discountGroupArr).find(elem => elem.checked);
    const imgEl = document.querySelector('.fee-img');
    if (selected.value && adultCount + kidsCount >=5) {
        totalCount *=  0.8;
        imgEl.src = "images/cat_run.png";
    }

    const totalEl = document.querySelector('#total-fee');
    
    if (isNaN(adultCount) || isNaN(kidsCount) || isNaN(adultFee) || isNaN(kidsFee)) {
        imgEl.src = "images/cat_run.png";
        totalCount = 0;
    } else {
        imgEl.src = "images/cat_stand.png"
    }
    
    totalEl.value = totalCount;


    
}); 


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
