// runs every time page reloads
setTimeout(() => {
    const user = {
        username: document.getElementsByClassName('_7UhW9 fKFbl yUEEX KV-D4 fDxYl')[0].innerText,
        posts: parseInt(document.querySelectorAll('.k9GMp li')[0].querySelector('span.g47SY').innerText),
        followers: parseInt(document.querySelectorAll('.k9GMp li')[1].querySelector('span.g47SY').innerText), 
        following: parseInt(document.querySelectorAll('.k9GMp li')[2].querySelector('span.g47SY').innerText)
    }

    console.table(user);

    document.querySelector('.wG4fl.UDpcu').prepend(bannerElement('This is probably a fake account', 'red'))

}, 2000)

/**
 * Function returns a banner element which can be inserted to the instagram profile
 * 
 * @param {string} text Text contained in the banner
 * @param {['red', 'green', 'yellow']} color 
 * @returns banner element (DIV element)
 */
const bannerElement = (text, color) => {
    const container = document.createElement('div')

    container.style.backgroundColor = color === 'red' ? '#F44336' : color === 'green' ?  '#4CAF50' : color === 'yellow' ? '#FFEB3B' : '#2196F3'


    const textContainer = document.createElement('p')
    textContainer.innerText = text
    textContainer.style.textAlign = 'center'
    textContainer.style.fontFamily = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif'
    textContainer.style.fontSize = '16px'
    textContainer.style.fontWeight = 600
    textContainer.style.color = 'white'
    textContainer.style.marginTop = '10px'
    textContainer.style.marginBottom = '10px'

    container.prepend(textContainer)

    return container
}