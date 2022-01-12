const htmlGameBoard = document.getElementById('html-game-board')
const startGameButton = document.getElementById('start-game-button')
const quitButton = document.getElementById('quit-button')
const settingsButton = document.getElementById('settings-button')
const confirmSettingsButton = document.getElementById('confirm-settings-button')
const menu = document.getElementById('menu')
const game = document.getElementById('game')
const settings = document.getElementById('settings')

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

settingsButton.addEventListener('click', () => {
    menu.classList.add('remove-page')
    settings.classList.remove('remove-page')
})

confirmSettingsButton.addEventListener('click', () =>{
    settings.classList.add('remove-page')
    menu.classList.remove('remove-page')
})