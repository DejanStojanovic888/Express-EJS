let subBtn = document.querySelector('#sub');
let emailInput = document.querySelector('#email');
let messageInput = document.querySelector('#msg');
let allMessages = document.querySelector('.all-messages');
// const dayjs = require('dayjs'); // ne moze u browseru da se ovako implementira(mora script tag u HTMLu itd.)

now = dayjs(new Date())
const formattedDate = now.format('DD/MM/YYYY');
// console.log(`Current raw date: ${now.toString()}`);
console.log(`Formatted date: ${formattedDate}`);

subBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('/messages', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailInput.value,
            message: messageInput.value,
            date: formattedDate
        })
    }).then(res => res.json())
        .then(data => {
            // console.log('MAIN.JS konzola: ' + JSON.stringify(data))
            // console.log('Ovo je response u Main.js: ' + data.data)
            allMessages.innerHTML = '';
            data.data.slice(-5).forEach(msgObj => {
                allMessages.insertAdjacentHTML('afterBegin', `<dl class="mb-3 p-2 bg-light rounded shadow-sm">
                                                                <dt class="mb-1">
                                                                    <strong class="text-primary fw-bold">
                                                                        ${msgObj.email}
                                                                    </strong>
                                                                </dt>
                                                                <dd class="text-dark mb-1">
                                                                    ${msgObj.message}
                                                                </dd>
                                                                <dd class="text-muted small mb-0">
                                                                    ${msgObj.date}
                                                                </dd>
                                                              </dl>`
                                                );
            })
            emailInput.value = '';
            messageInput.value = '';
            emailInput.focus();
        })
})    