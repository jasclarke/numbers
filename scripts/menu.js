const htmlGameBoard = document.getElementById('html-game-board')
const startGameButton = document.getElementById('start-game-button')
const quitButton = document.getElementById('quit-button')
const settings = document.getElementById('settings-button')
const menu = document.getElementById('menu')
const game = document.getElementById('game')

startGameButton.addEventListener('click', () => {
    //menu.requestFullscreen().then( () => console.log('Enter Fullscreen')).catch( (error) => console.log(error.message))
    menu.classList.add('remove-page')
    htmlGameBoard.classList.remove('orange-background')
    htmlGameBoard.classList.add('blue-background')
    game.classList.remove('remove-page')
})

quitButton.addEventListener('click', () => {
    //document.exitFullscreen().then( console.log('Exit Fullscreen')).catch( (error) => console.log(error.message))
    game.classList.add('remove-page')
    htmlGameBoard.classList.remove('blue-background')
    htmlGameBoard.classList.add('orange-background')
    menu.classList.remove('remove-page')
})