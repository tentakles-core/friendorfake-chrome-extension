const user = {
    username: document.getElementsByClassName('_7UhW9 fKFbl yUEEX KV-D4 fDxYl')[0].innerText,
    posts: parseInt(document.querySelectorAll('.k9GMp li')[0].querySelector('span.g47SY').innerText),
    followers: parseInt(document.querySelectorAll('.k9GMp li')[1].querySelector('span.g47SY').innerText), 
    following: parseInt(document.querySelectorAll('.k9GMp li')[2].querySelector('span.g47SY').innerText)
}

console.table(user);