let step = 0;

const btnNextStep = document.querySelector('.next__next');
const btnGoBack = document.querySelector('.next__back');
const btnConfirm = document.querySelector('.next__confirm'); 
const btnPlan = document.querySelector('.step2__btnContainer');
const btnPlans = document.querySelectorAll('.step2__plan');
const btnServices = document.querySelectorAll('.step3__service');

const sidebarNumbers = document.querySelectorAll('.sidebar__number');
const steps = document.querySelectorAll('.step');
const inputs = document.querySelectorAll('.step1__input');
const inputsRequired = document.querySelectorAll('.input__required');
const btnCircle = document.querySelector('.step2__btnCircle');
const step2Subs = document.querySelectorAll('.step2__subs');
const btnYearly = document.querySelectorAll('.step2__yearly');
const btnYearlyFee = document.querySelectorAll('.step2__fee');
const btnFeeContainer = document.querySelectorAll('.step2__btnFeeContainer');
const btnCheck = document.querySelectorAll('.step3__check');
const btnFeeContainerStep3 = document.querySelectorAll('.step3__feeContainer');
const btnFeeStep3 = document.querySelectorAll('.step3__fee');

btnNextStep.addEventListener('click', () => {
    step++;
    if (!updates()) {
        step--;
    } 
});

btnGoBack.addEventListener('click', () => {
    step--;
    updates();
});

btnConfirm.addEventListener('click', () => {
    step++;
    updates();
});

for (let i = 0; i < 3; i++) {
    btnPlans[i].addEventListener('click', () => {
        for (let j = 0; j < 3; j++) {
            (i == j) ? btnPlans[j].classList.add('plan__selected') : btnPlans[j].classList.remove('plan__selected');
        }
    });
}


btnPlan.addEventListener('click', () => {
    btnCircle.classList.toggle('btn__rigth');
    step2Subs[0].classList.toggle('active');
    step2Subs[1].classList.toggle('active');
    btnYearly.forEach(btn => btn.classList.toggle('hidden'));

    for (let i = 0; i < 3; i++) {
        let n = btnYearlyFee[i].innerText * 1;
        n = (n%10 == 0) ? n/10 : n*10;
        btnYearlyFee[i].innerText = n;
        btnFeeContainer[i].innerHTML = `$<i class="step2__fee">${n}</i>/${(n%10 == 0) ? 'yr' : 'mo'}`;
        
        let x = btnFeeStep3[i].innerText * 1;
        x = (x%10 == 0) ? x/10 : x*10;
        btnFeeStep3[i].innerText = x;
        btnFeeContainerStep3[i].innerHTML = `+$<i class="step3__fee">${x}</i>/${(x%10 == 0) ? 'yr' : 'mo'}`;
    }
});

for (let i = 0; i < 3; i++) {
    btnServices[i].addEventListener('click', () => {
        btnServices[i].classList.toggle('service__selected');
        btnCheck[i].classList.toggle('hidden');

    });
}


const step4Plan = document.querySelector('.step4__plan');
const step4PlanFee = document.querySelector('.step4__planFee');
const step4Change = document.querySelector('.step4__change');
const step4Services = document.querySelector('.step4__services');
const step4TotalFee = document.querySelector('.step4__totalFee');

const updates = () => {
    if (step-1 == 0) {
        let ok = true;
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                inputsRequired[i].classList.remove('hidden');
                ok = false;
            } else {
                inputsRequired[i].classList.add('hidden');
            }
        }
        if(!ok) return ok;
    }

    updateSidebar();
    updateStep();
    updateBtns();

    if (step == 3) {
        let [plan, fee] = (btnPlans[0].classList.contains('plan__selected')) ? ['Arcade', 9] 
                    : (btnPlans[1].classList.contains('plan__selected')) ? ['Advanced', 12]
                    : ['Pro', 15];
        let monthly = step2Subs[0].classList.contains('active');
        monthly = (monthly ? 'Monthly' : 'Yearly');
        fee = (monthly == 'Monthly' ? fee : fee*10);
        step4Plan.innerText = `${plan} (${monthly})`;
        step4PlanFee.innerText = `$${fee}/${(monthly)}`;
        let suma = fee;
        monthly =(monthly == 'Monthly' ? true : false);
        step4Services.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            console.log(btnServices[i].classList.contains('service__selected'));
            if (btnServices[i].classList.contains('service__selected')) {
                const div = document.createElement('div');
                div.classList.add('step4__service');
                if (i == 0) {
                    div.innerHTML = `<span>Online service</span>
                                    <span class="step4__serviceFee">+${(monthly? 1 : 10)}/${monthly? 'mo' : 'yr'}</span>`; 
                    suma += (monthly? 1 : 10);
                }
                if (i == 1) {
                    div.innerHTML = `<span>Larger storage</span>
                                    <span class="step4__serviceFee">+${(monthly? 2 : 20)}/${monthly? 'mo' : 'yr'}</span>`; 
                    suma += (monthly? 2 : 20);
                }
                if (i == 2) {
                    div.innerHTML = `<span>Customizable Profile</span>
                                    <span class="step4__serviceFee">+${(monthly? 2 : 20)}/${monthly? 'mo' : 'yr'}</span>`; 
                    suma += (monthly? 2 : 20);
                }
                step4Services.append(div);
            }
        }
        step4TotalFee.innerText = `+${suma}/${monthly? 'mo' : 'yr'}`;
    }

    return true;
};

step4Change.addEventListener('click', () => {
    step = 1;
    updates();
});

const updateBtns = () => {

    if(step == 0) {
        btnNextStep.classList.remove('hidden');
        btnGoBack.classList.add('hidden');
        btnConfirm.classList.add('hidden');
    }
    if (step == 1 || step == 2) {
        btnNextStep.classList.remove('hidden');
        btnGoBack.classList.remove('hidden');
        btnConfirm.classList.add('hidden');  
    } 
    
    if (step == 3) {
        btnNextStep.classList.add('hidden');
        btnGoBack.classList.remove('hidden');
        btnConfirm.classList.remove('hidden');
    }

    if (step == 4) {
        btnNextStep.classList.add('hidden');
        btnGoBack.classList.add('hidden');
        btnConfirm.classList.add('hidden');
    }

}


const updateStep = () => {
    for (const i of steps) {
        i.classList.add('hidden');
    }
    
    steps[step].classList.remove('hidden');
};

const updateSidebar = () => {
    if (step == 4) return;
    for (const i of sidebarNumbers) {
        i.classList.remove('mark');
    }

    sidebarNumbers[step].classList.add('mark');
}