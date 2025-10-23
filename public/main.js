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
            message: messageInput.value,
        })
    }).then(res => res.json())
        .then(data => {

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