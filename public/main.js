let subBtn = document.querySelector('#sub');
let emailInput = document.querySelector('#email');
let messageInput = document.querySelector('#msg');
let allMessages = document.querySelector('.all-messages');

subBtn.addEventListener('click', (e) => {
    e.preventDefault()
    fetch('/messages', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: emailInput.value,
            message: messageInput.value
        })
    }).then(res => res.json())
      .then(data => {
        console.log('MAIN.JS konzola: ' + JSON.stringify(data))
        console.log('Ovo je response u Main.js: ' + data.data)
        allMessages.innerHTML = '';
        data.data.forEach(msgObj => {
            allMessages.insertAdjacentHTML('afterBegin', `<dl><dt>${msgObj.email}</dt><dd>${msgObj.message}</dd></dl>`);
        })
    })
})    