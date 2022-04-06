const socket = io.connect();

socket.on('productList', (productList) => {
    function createHtmlTable(productos) {
        return fetch('/views/productos.hbs')
            .then(res => res.text())
            .then(template => {
                const hbsTemplate = Handlebars.compile(template);
                const html = hbsTemplate(productos)
                return html
            })
    }
    createHtmlTable(productList).then(html => {
        document.getElementById('results-table').innerHTML = html
    })
});

socket.on("messages", messageList => {
    function displayChat(messages) {
        return fetch('/views/chat.hbs')
            .then(res => res.text())
            .then(template => {
                const hbsTemplate = Handlebars.compile(template);
                const html = hbsTemplate({ chatMessages: messages })
                return html
            })
    }

    displayChat(messageList).then(html => {
        const pageChat = document.getElementById('page-chat');
        pageChat.innerHTML = html;
        pageChat.scrollTop = pageChat.scrollHeight;
    })


})

document.getElementById("new-product-form").addEventListener('submit', event => {
    event.preventDefault()
    const newProduct = {
        title: document.getElementById('input-title').value,
        price: document.getElementById('input-price').value,
        thumbnail: document.getElementById('input-thumbnail').value
    };

    socket.emit('new-product', newProduct);
    return false;
})

document.getElementById("chat-form").addEventListener('submit', event => {
    event.preventDefault()

    const newMessage = {
        mail: document.getElementById('input-mail').value,
        timestamp: moment().format('DD/MM/YYYY hh:mm:ss a'),
        text: document.getElementById('input-text').value
    };

    socket.emit('new-message', newMessage);
    return false;
})