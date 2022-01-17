const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 500

const handImage = new Image()
handImage.src = 'images/hand.png'
const spriteWidth = 54
const spriteHeight = 60

const audioContext = new AudioContext()

const backgroundSound = new Audio('sounds/background.mp3')
backgroundSound.autoplay = true
backgroundSound.loop = true

//const backgoundEffect = audioContext.createMediaElementSource(backgroundSound)
//backgoundEffect.connect(audioContext.destination)

let confirmSound, negativeSound, successSound, winSound, loseSound, writeSound

const body = document.getElementById('body')
const closeBtn = document.getElementById('close-btn')
const newGameBtn = document.getElementById('new-game-btn')
const roundDetails = document.getElementById('round-details')
const gameDetails = document.getElementById('game-details')
const fastSetting = document.getElementById('fast')
const fasterSetting = document.getElementById('faster')
const fastestSetting = document.getElementById('fastest')
const noviceSetting = document.getElementById('novice')
const intermediateSetting = document.getElementById('intermediate')
const expertSetting = document.getElementById('expert')
const playerName = document.getElementById('player-name')
const htmlGameBoard = document.getElementById('html-game-board')
const startGameButton = document.getElementById('start-game-button')
const settingsButton = document.getElementById('settings-button')
const confirmSettingsButton = document.getElementById('confirm-settings-button')
const menu = document.getElementById('menu')
const settings = document.getElementById('settings')

const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const game = 'game'
const playerScore = 'player-score'
const playerOneName = 'player-one-name'
const quitButton = 'quit-button'
const numModalBtn = 'num-modal-btn'
const numModal = 'num-modal'
const roundModal = 'round-modal'
const gameOverModal = 'game-over-modal'
const playerOneOnes = 'player-one-ones'
const playerOneTwos = 'player-one-twos'
const playerOneThrees ='player-one-threes'
const playerOneFours = 'player-one-fours'
const playerOneFives = 'player-one-fives'
const playerOneSixes = 'player-one-sixes'
const playerOneSevens = 'player-one-sevens'
const playerOneEights = 'player-one-eights'
const playerOneNines = 'player-one-nines'
const playerTwoOnes = 'player-two-ones'
const playerTwoTwos = 'player-two-twos'
const playerTwoThrees = 'player-two-threes'
const playerTwoFours = 'player-two-fours'
const playerTwoFives = 'player-two-fives'
const playerTwoSixes = 'player-two-sixes'
const playerTwoSevens = 'player-two-sevens'
const playerTwoEights = 'player-two-eights'
const playerTwoNines = 'player-two-nines'
const oneBtn = 'one-btn'
const twoBtn = 'two-btn'
const threeBtn = 'three-btn'
const fourBtn = 'four-btn'
const fiveBtn = 'five-btn'
const sixBtn = 'six-btn'
const sevenBtn = 'seven-btn'
const eightBtn =  'eight-btn'
const nineBtn = 'nine-btn'
const numBtns = 'num-btns'

const gameHtml = `
<div class="text-center" id="game">
    <div id="game-indicators">
        <button id="quit-button">Quit</button>
        <span id="score-board">Score: <span id="player-score">0</span></span>
    </div>
    <div id="flex-numbers">
        <div id="player-one-numbers" class="player-numbers">
            <span id="player-one-name">Player 1</span>
            <span id="player-one-ones">1111</span>
            <span id="player-one-twos">2222</span>
            <span id="player-one-threes">3333</span>
            <span id="player-one-fours">4444</span>
            <span id="player-one-fives">5555</span>
            <span id="player-one-sixes">6666</span>
            <span id="player-one-sevens">7777</span>
            <span id="player-one-eights">8888</span>
            <span id="player-one-nines">9999</span>
        </div>
        
        <div id="num-separator"></div>

        <div id="player-two-numbers" class="player-numbers">
            <span id="player-two-name">AI</span>
            <span id="player-two-ones">1111</span>
            <span id="player-two-twos">2222</span>
            <span id="player-two-threes">3333</span>
            <span id="player-two-fours">4444</span>
            <span id="player-two-fives">5555</span>
            <span id="player-two-sixes">6666</span>
            <span id="player-two-sevens">7777</span>
            <span id="player-two-eights">8888</span>
            <span id="player-two-nines">9999</span>
        </div>
    </div>

    <hr id="h-separator"/>

    <canvas id="canvas"></canvas>
    <button id="num-modal-btn">Write Number</button>

</div>`

const numberModalHtml = `

<div class="modal-container" id="num-modal">
    <div class="modal-data">
        <p>Choose a Number</p>
        <div id="number-btns">
            <button id="one-btn" class="num-btns">1</button>
            <button id="two-btn" class="num-btns">2</button>
            <button id="three-btn" class="num-btns">3</button>
            <button id="four-btn" class="num-btns">4</button>
            <button id="five-btn" class="num-btns">5</button>
            <button id="six-btn" class="num-btns">6</button>
            <button id="seven-btn" class="num-btns">7</button>
            <button id="eight-btn" class="num-btns">8</button>
            <button id="nine-btn" class="num-btns">9</button>
        </div>
    </div>
</div>`

let startXAxis = 225
let startYAxis = 375
let xAxis = 0
let yAxis = 0
let speed = 3
let difficulity = 0
let bezierDrawProgress = 0
let bezierDrawSpeed = 0.1
let stroke = 0
let strokeX, strokeY
let animationStatus = true
let bezierDrawStatus = true
let writtenNum, numWord
let excludedGuessedNumbers = []
let excludedWrittenNumbers = []
let disabledGuessedButtons = []
let disabledWrittingButtons = []
let countdown = 4
let playerOne = {
    turn: true,
    score: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
    eight: 0,
    nine: 0,
}
let playerTwo = {
    turn: false,
    score: 0,
    one: 0,
    two: 0,
    three: 0,
    four: 0,
    five: 0,
    six: 0,
    seven: 0,
    eight: 0,
    nine: 0
}
window.selectedNum

closeBtn.addEventListener('click', () => {
    closeModal(roundModal)
    if (playerTwo.turn) {
        writtenNum = educatedGuess(excludedWrittenNumbers, 0)
        submitNumber(writtenNum)
    }
})

newGameBtn.addEventListener('click', () => newGame())

startGameButton.addEventListener('click', () => {
    //menu.requestFullscreen().then( () => console.log('Enter Fullscreen')).catch( (error) => console.log(error.message))
    playSoundEffect(confirmSound)
    newGame()
    menu.classList.add('remove-page')
    htmlGameBoard.classList.remove('orange-background')
    htmlGameBoard.classList.add('blue-background')
    canvas.classList.remove('remove-page')
    document.getElementById(game).classList.remove('remove-page')
    let config = JSON.parse(localStorage.getItem('settings'))
    document.getElementById(playerOneName).innerHTML = config.name
    setSpeed(config.speed)
    difficulity = parseInt(config.difficulity)
})

settingsButton.addEventListener('click', () => {
    playSoundEffect(confirmSound)
    menu.classList.add('remove-page')
    settings.classList.remove('remove-page')
})

confirmSettingsButton.addEventListener('click', () => {
    playSoundEffect(confirmSound)
    let config = {
        speed: getRadioValueByName('hand-speed'),
        difficulity: getRadioValueByName('ai-guessing-ability'),
        name: playerName.value
    }

    localStorage.setItem('settings', JSON.stringify(config))
    settings.classList.add('remove-page')
    menu.classList.remove('remove-page')
})

const loadEventListeners = () => {
    document.getElementById(oneBtn).addEventListener('click', () => processTurn(1))
    document.getElementById(twoBtn).addEventListener('click', () => processTurn(2))
    document.getElementById(threeBtn).addEventListener('click', () => processTurn(3))
    document.getElementById(fourBtn).addEventListener('click', () => processTurn(4))
    document.getElementById(fiveBtn).addEventListener('click', () => processTurn(5))
    document.getElementById(sixBtn).addEventListener('click', () => processTurn(6))
    document.getElementById(sevenBtn).addEventListener('click', () => processTurn(7))
    document.getElementById(eightBtn).addEventListener('click', () => processTurn(8))
    document.getElementById(nineBtn).addEventListener('click', () => processTurn(9))

    document.getElementById('num-modal-btn').addEventListener('click', () => {
        [...document.getElementsByClassName(numBtns)].forEach( btn => btn.removeAttribute('disabled'))
        playerOne.turn ? disableButtons(excludedGuessedNumbers) : disableButtons(excludedWrittenNumbers)
        openModal(numModal)
    })

    document.getElementById(quitButton).addEventListener('click', () => {
        //document.exitFullscreen().then( console.log('Exit Fullscreen')).catch( (error) => console.log(error.message))
        playSoundEffect(negativeSound)
        document.getElementById(game).classList.add('remove-page')
        canvas.classList.add('remove-page')
        htmlGameBoard.classList.remove('blue-background')
        htmlGameBoard.classList.add('orange-background')
        menu.classList.remove('remove-page')
        resetScore()
    })
}

function loadSounds() {
    retrieveSound('sounds/confirm.mp3', 0)
    retrieveSound('sounds/negative.mp3', 1)
    retrieveSound('sounds/success.mp3', 2)
    retrieveSound('sounds/win.mp3', 3)
    retrieveSound('sounds/lose.mp3', 4)
    retrieveSound('sounds/write.wav', 5)
}

function retrieveSound(url, key) {
    let request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'
    request.onload = () => {
        audioContext.decodeAudioData(request.response).then( (decodedData) => {
            switch (key) {
                case 0:
                    confirmSound = decodedData
                    break;
                case 1:
                    negativeSound = decodedData
                    break;
                case 2:
                    successSound = decodedData
                    break;
                case 3:
                    winSound = decodedData
                    break;
                case 4:
                    loseSound = decodedData
                    break;
                case 5:
                    writeSound = decodedData
                    break;
                default:
                    console.log('An error occurred with loading the sounds. Please email the developers')
                    break;
            }
        }).catch( (error) => console.log(error))
    }
    request.send()
}

function playSoundEffect(arrayBuffer) {
    backgroundSound.pause()
    source = audioContext.createBufferSource()
    source.buffer = arrayBuffer
    source.connect(audioContext.destination)
    source.start(0)
}

function newGame() {
    document.getElementById(game).outerHTML = gameHtml
    document.getElementById(numModal).outerHTML = numberModalHtml
    loadEventListeners()
}

function load() {
    backgroundSound.play()
    loadEventListeners()
    loadSounds()
    configureSettings()
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    handImage.onload = () => ctx.drawImage(handImage, xAxis + startXAxis, yAxis + startYAxis, spriteWidth, spriteHeight)
}

const resetScore = () => {
    excludedGuessedNumbers = []
    excludedWrittenNumbers = []
    disabledGuessedButtons = []
    disabledWrittingButtons = []

    playerOne = {
        turn: true,
        score: 0,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        seven: 0,
        eight: 0,
        nine: 0
    }

    playerTwo = {
        turn: false,
        score: 0,
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0,
        six: 0,
        seven: 0,
        eight: 0,
        nine: 0
    }
}

function getRadioValueByName(name) {
    let radioGroup = document.getElementsByName(name) 

    for (let index = 0; index < radioGroup.length; index++) {
        
        if (radioGroup[index].checked) {
            return radioGroup[index].value
            break
        } 
    }

    return 3
}

const setSpeed = (speedValue) => {
    switch (parseInt(speedValue)) {
        case 0:
            speed = 2
            bezierDrawSpeed = 0.05
            break
        case 1:
            speed = 5
            bezierDrawSpeed = 0.1
            break
        case 2:
            speed = 6
            bezierDrawSpeed = 0.2
            break
        default:
            break;
    }
}

const configureSettings = () => {
    let settings = JSON.parse(localStorage.getItem('settings'))

    if (settings) {
        speed = settings.speed
        difficulity = settings.difficulity
    } else {
        settings = {
            speed: 1,
            difficulity: 0,
            name: 'Player 1'
        }

        localStorage.setItem('settings', JSON.stringify(settings))
    }

    setRadioInputs(settings)
    playerName.value = settings.name
}

const setRadioInputs = (settings) => {
    switch (parseInt(settings.speed)) {
        case 0:
            fastSetting.checked = true
            break;
        case 1:
            fasterSetting.checked = true
            break;
        case 2:
            fastestSetting.checked = true
            break;
        default:
            console.log('error')
            break;
    }

    switch (parseInt(settings.difficulity)) {
        case 0:
            noviceSetting.checked = true
            break;
        case 1:
            intermediateSetting.checked = true
            break;
        case 2:
            expertSetting.checked = true
            break;
        default:
            console.log('error')
            break;
    }
}

function resetHand() {
    startXAxis = 225
    startYAxis = 375
    xAxis = 0
    yAxis = 0
    stroke = 0
    bezierDrawProgress = 0
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    handImage.onload = () => ctx.drawImage(handImage, startXAxis, startYAxis, spriteWidth, spriteHeight)
}

function processTurn(number) {
    if (playerOne.turn) {
        writtenNum = number
        closeModal(numModal)
        submitNumber(number)
    } else {
        closeModal(numModal)
        guessNumber(number)
    }
}

function disableButtons(buttonList) {
    buttonList.forEach( number => {
        switch (parseInt(number)) {
            case 1:
                document.getElementById(oneBtn).setAttribute('disabled', '')
                document.getElementById(oneBtn).classList.add('disabled-button')
                break;
            case 2:
                document.getElementById(twoBtn).setAttribute('disabled', '')
                document.getElementById(twoBtn).classList.add('disabled-button')
                break;
            case 3:
                document.getElementById(threeBtn).setAttribute('disabled', '')
                document.getElementById(threeBtn).classList.add('disabled-button')
                break;
            case 4:
                document.getElementById(fourBtn).setAttribute('disabled', '')
                document.getElementById(fourBtn).classList.add('disabled-button')
                break;
            case 5:
                document.getElementById(fiveBtn).setAttribute('disabled', '')
                document.getElementById(fiveBtn).classList.add('disabled-button')
                break;
            case 6:
                document.getElementById(sixBtn).setAttribute('disabled', '')
                document.getElementById(sixBtn).classList.add('disabled-button')
                break;
            case 7:
                document.getElementById(sevenBtn).setAttribute('disabled', '')
                document.getElementById(sevenBtn).classList.add('disabled-button')
                break;
            case 8:
                document.getElementById(eightBtn).setAttribute('disabled', '')
                document.getElementById(eightBtn).classList.add('disabled-button')
                break;
            case 9:
                document.getElementById(nineBtn).setAttribute('disabled', '')
                document.getElementById(nineBtn).classList.add('disabled-button')
                break;
            default:
                break;
        }
    })
}

function submitNumber(number) {
    // will change to buttons for each case
    playSoundEffect(writeSound)
    switch (parseInt(number)) {
        case 1:
            numWord = 'one'
            selectedNum = one
            writeNumber()
            break
        case 2:
            numWord = 'two'
            selectedNum = two
            bezierDrawStatus = true
            writeNumber()
            break
        case 3:
            numWord = 'three'
            selectedNum = three
            bezierDrawStatus = true
            writeNumber()
            break
        case 4:
            numWord = 'four'
            selectedNum = four
            writeNumber()
            break
        case 5:
            numWord = 'five'
            selectedNum = five
            writeNumber()
            break
        case 6:
            numWord = 'six'
            selectedNum = six
            writeNumber()
            break
        case 7:
            numWord = 'seven'
            selectedNum = seven
            writeNumber()
            break
        case 8:
            numWord = 'eight'
            selectedNum = eight
            bezierDrawStatus = true
            writeNumber()
            break
        case 9:
            numWord = 'nine'
            selectedNum = nine
            bezierDrawStatus = true
            writeNumber()
            break
        default:
            alert('Opps! Something went wrong')
            break
    }
}

function writeNumber() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    animationStatus = window.selectedNum()
    bezierDrawStatus ? ctx.drawImage(handImage, xAxis, yAxis, spriteWidth, spriteHeight)
        : ctx.drawImage(handImage, xAxis + startXAxis, yAxis + startYAxis, spriteWidth, spriteHeight)
    if (animationStatus) {
        requestAnimationFrame(writeNumber) 
    } else if (playerOne.turn) { 
        aiGuessNumber()
        writeSound.pause()
    } else {
        writeSound.pause()
    }
}

function guessNumber(number) {
    if (parseInt(number) !== parseInt(writtenNum)) {
        playerTwo[numWord] += 1
        playerTwo.score += 1
        if (playerTwo[numWord] === 4) excludedWrittenNumbers.push(writtenNum)
        strikeNumber(2, writtenNum, playerTwo[numWord])
        if (playerTwo.score !== 35) {
            playSoundEffect(negativeSound)
            roundDetails.innerHTML = `Better luck next time! <br/> You guessed ${number} and AI wrote ${writtenNum}`
            openModal(roundModal)
        } else {
            playSoundEffect(loseSound)
            gameDetails.innerHTML = `AI Won. Try Again!`
            openModal(gameOverModal)
        }
    } else {
        playSoundEffect(successSound)
        playerOne.turn = true
        playerTwo.turn = false
        document.getElementById(numModalBtn).innerHTML = `Draw Number`
        roundDetails.innerHTML = `<h2>Nicely done!</h2> <p>You guessed ${number} and AI wrote ${writtenNum}</p>`
        openModal(roundModal)
    } 
}

function aiGuessNumber() {
    let guessedNumber = educatedGuess(excludedGuessedNumbers, difficulity)

    if (guessedNumber !== parseInt(writtenNum)) {
        playerOne[numWord] += 1
        playerOne.score += 1
        document.getElementById(playerScore).innerHTML = playerOne.score
        if (playerOne[numWord] === 4) excludedGuessedNumbers.push(writtenNum)
        strikeNumber(1, writtenNum, playerOne[numWord])
        if (playerOne.score !== 35) {
            playSoundEffect(successSound)
            roundDetails.innerHTML = `<h2>Nicely done!</h2> <p>You wrote ${writtenNum} and AI guessed ${guessedNumber}</p>`
            openModal(roundModal)
        } else {
            playSoundEffect(winSound)
            gameDetails.innerHTML = `Congrats You Won!`
            openModal(gameOverModal)
        }
    } else {
        playSoundEffect(negativeSound)
        playerOne.turn = false
        playerTwo.turn = true
        document.getElementById(numModalBtn).innerHTML = `Guess Number`
        roundDetails.innerHTML = `Yikes! <br/> You wrote ${writtenNum} and AI guessed ${guessedNumber}`
        openModal(roundModal)
    }
}

function educatedGuess(excluded, difficulity) {
    if (playerTwo.turn === true && playerTwo.score >= 26) {
        let finalNumbers = {}

        for (const number in playerTwo) {
            if (number !== 'turn' && number !== 'score' && playerTwo[number] < 4) {
                finalNumbers[number] = 4 - playerTwo[number]
            }
        }

        let numberOptions = numberOptionsFilter(finalNumbers, countdown)
        return randomElementFromArray(numberOptions)
    } else {
        let availableNumbers

        switch (parseInt(difficulity)) {
            case 0:
                availableNumbers = setAIProbaility(excluded, 9)
                break
            case 1: 
                availableNumbers = setAIProbaility(excluded, 4)
                break
            case 2:
                availableNumbers = setAIProbaility(excluded, 2)
                break
            default:
                console.log('An error occurred! Please email the developers')
                break
        }
        
        return randomElementFromArray(availableNumbers)
    }
}

const setAIProbaility = (excluded, optionsLimit) => {
    incorrectNumbers = numberList.filter( num => excluded.every( n => parseInt(num) !== parseInt(n))).filter( num => num !== writtenNum)
    shuffledIncorrectNumbers = shuffleArrary(incorrectNumbers)
    
    while (shuffledIncorrectNumbers.length > optionsLimit) {
        shuffledIncorrectNumbers.pop()
    }

    shuffledIncorrectNumbers.push(writtenNum)
    return shuffleArrary(shuffledIncorrectNumbers)
}

const shuffleArrary = (array) => {
    return array.sort( () => 0.5 - Math.random())
}

function numberOptionsFilter(finalNumbers, score) {
    let numberOptions = []

    for (const number in finalNumbers) {
        if (finalNumbers[number] === score) {
            numberOptions.push(wordToNum(number))
        }
    }

    if (numberOptions.length === 0 && score !== 0) {
        score -= 1
        countdown = score
        return numberOptionsFilter(finalNumbers, score)
    }
    console.log(numberOptions)
    return numberOptions
}

function randomElementFromArray(array) {
    return array[Math.floor(Math.random() * array.length)]
}

function wordToNum(word) {
    switch (word) {
        case 'one':
            return 1
        case 'two':
            return 2
        case 'three':
            return 3
        case 'four':
            return 4
        case 'five':
            return 5
        case 'six':
            return 6
        case 'seven':
            return 7
        case 'eight':
            return 8
        case 'nine':
            return 9
        default:
            break;
    }
}

function strikeNumber(player, number, score) {
    let nums = ''

    for (let i = score; i < 4; i++) {
        nums += `${number}` 
    }

    for (let i = 0; i < score; i++) {
        nums += `<del>${number}</del>` 
    }
    
    if (player === 1) {
        switch (parseInt(number)) {
            case 1:
                document.getElementById(playerOneOnes).innerHTML = nums
                break;
            case 2:
                document.getElementById(playerOneTwos).innerHTML = nums
                break;
            case 3:
                document.getElementById(playerOneThrees).innerHTML = nums
                break;
            case 4:
                document.getElementById(playerOneFours).innerHTML = nums
                break;
            case 5:
                document.getElementById(playerOneFives).innerHTML = nums
                break;
            case 6:
                document.getElementById(playerOneSixes).innerHTML = nums
                break;
            case 7:
                document.getElementById(playerOneSevens).innerHTML = nums
                break;
            case 8:
                document.getElementById(playerOneEights).innerHTML = nums
                break;
            case 9:
                document.getElementById(playerOneNines).innerHTML = nums
                break;
            default:
                roundDetails.innerHTML = `Opps something went wrong. Please report this to the developers.`
                openModal(roundModal)
                break;
        }
    } else {
        switch (parseInt(number)) {
            case 1:
                document.getElementById(playerTwoOnes).innerHTML = nums
                break;
            case 2:
                document.getElementById(playerTwoTwos).innerHTML = nums
                break;
            case 3:
                document.getElementById(playerTwoThrees).innerHTML = nums
                break;
            case 4:
                document.getElementById(playerTwoFours).innerHTML = nums
                break;
            case 5:
                document.getElementById(playerTwoFives).innerHTML = nums
                break;
            case 6:
                document.getElementById(playerTwoSixes).innerHTML = nums
                break;
            case 7:
                document.getElementById(playerTwoSevens).innerHTML = nums
                break;
            case 8:
                document.getElementById(playerTwoEights).innerHTML = nums
                break;
            case 9:
                document.getElementById(playerTwoNines).innerHTML = nums
                break;
            default:
                roundDetails.innerHTML = `Opps something went wrong. Please report this to the developers.`
                openModal(roundModal)
                break;
        }
    }
}

function bezierPath(points) {
    let [p0, p1, p2, p3] = points
    let cx = 3 * (p1.x - p0.x)
    let bx = 3 * (p2.x - p1.x) - cx
    let ax = p3.x - p0.x - cx - bx

    let cy = 3 * (p1.y - p0.y)
    let by = 3 * (p2.y - p1.y) - cy
    let ay = p3.y - p0.y - cy - by

    let t = bezierDrawProgress

    bezierDrawProgress += bezierDrawSpeed
    if (bezierDrawProgress > 1) {
        startXAxis = xAxis
        startYAxis = yAxis
        xAxis = 0
        yAxis = 0
        bezierDrawStatus = false
    } else {
        let xt = ax * (t * t * t) + bx * (t * t) + cx * t + p0.x
        let yt = ay * (t * t * t) + by * (t * t) + cy * t + p0.y
        xAxis = xt
        yAxis = yt
        bezierDrawStatus = true
    }
}

function nine() {
    let points = [
        {x: startXAxis, y: startYAxis},
        {x: startXAxis - 50, y: startYAxis - 50},
        {x: startXAxis - 50, y: startYAxis + 50},
        {x: startXAxis, y: startYAxis},
    ]

    if (bezierDrawStatus) {
        bezierPath(points)
        return true
    } else if (yAxis < 30) {
        yAxis += speed
        return true
    }

    resetHand()
    return false
}

function eight() {
    if (bezierDrawStatus === true && stroke === 0) {
        let points = [
            {x: startXAxis, y: startYAxis},
            {x: startXAxis - 25, y: startYAxis + 25},
            {x: startXAxis + 50, y: startYAxis + 25},
            {x: startXAxis + 25, y: startYAxis + 50},
        ]

        bezierPath(points)

        if (bezierDrawStatus === false) {
            stroke = 1
            bezierDrawStatus = true
            bezierDrawProgress = 0

            let points = [
                {x: startXAxis, y: startYAxis},
                {x: startXAxis - 25, y: startYAxis - 25},
                {x: startXAxis + 50, y: startYAxis - 25},
                {x: startXAxis - 25, y: startYAxis - 50},
            ]

            bezierPath(points)
        }

        return true
    } else if (bezierDrawStatus === true && stroke === 1) {
        let points = [
            {x: startXAxis, y: startYAxis},
            {x: startXAxis - 25, y: startYAxis - 25},
            {x: startXAxis + 50, y: startYAxis - 25},
            {x: startXAxis - 25, y: startYAxis - 50},
        ]

        bezierPath(points)
        return true
    }

    resetHand()
    return false
}

function seven() {
    bezierDrawStatus = false

    if (xAxis < 30 && stroke === 0) {
        xAxis += speed
        return true
    } else if (yAxis < 18) {
        stroke = 1
        xAxis -= speed
        yAxis += speed
        return true
    }

    resetHand()
    return false
}


function six() {
    if (yAxis === 42) {
        bezierDrawStatus = true
        strokeX = startXAxis + xAxis
        strokeY = startYAxis + yAxis
        yAxis++
    }

    if (yAxis < 42 && stroke === 0) {
        yAxis += speed
        xAxis -= speed
        bezierDrawStatus = false
        return true
    } else if (bezierDrawStatus === true) {
        stroke = 1
        let points = [
            {x: strokeX, y: strokeY},
            {x: strokeX + 50, y: strokeY + 50},
            {x: strokeX + 50, y: strokeY - 50},
            {x: strokeX, y: strokeY}
        ]

        bezierPath(points)
        return true
    }

    resetHand()
    return false
}

function five() {
    if (yAxis === 18) {
        bezierDrawStatus = true
        strokeX = startXAxis + xAxis
        strokeY = startYAxis + yAxis
        yAxis++
    }

    if (xAxis > -30 && stroke === 0) {
        bezierDrawStatus = false
        xAxis -= speed
        return true
    } else if (yAxis < 18 && xAxis === -30) {
        stroke = 1
        yAxis += speed
        return true
    } else if (bezierDrawStatus === true) {
        let points = [
            {x: strokeX, y: strokeY},
            {x: strokeX + 50, y: strokeY},
            {x: strokeX + 50, y: strokeY + 50},
            {x: strokeX - 50, y: strokeY + 50},
        ]
        
        bezierPath(points)
        return true
    }

    resetHand()
    return false
}

function four() {
    bezierDrawStatus = false

    if (xAxis > -30 && stroke === 0) {
        xAxis -= speed
        return true
    } else if (xAxis < -6) {
        stroke = 1
        yAxis -= speed
        xAxis += speed
        return true
    } else if (yAxis < 24) {
        stroke = 2
        yAxis += speed
        return true
    }

    resetHand()
    return false
}

function three() {
    if (bezierDrawStatus === true && stroke === 0) {
        let points = [
            {x: startXAxis, y: startYAxis},
            {x: startXAxis + 12, y: startYAxis},
            {x: startXAxis + 24, y: startYAxis + 24},
            {x: startXAxis - 12, y: startYAxis + 24},
        ]

        bezierPath(points)
        
        if (bezierDrawProgress >= 0.95) {
            stroke = 1
            startXAxis = xAxis
            startYAxis = yAxis
            bezierDrawStatus = true
            bezierDrawProgress = 0
        }
        
        return true
    } else if (bezierDrawStatus === true && stroke === 1) {
        let points = [
            {x: startXAxis, y: startYAxis},
            {x: startXAxis + 12, y: startYAxis},
            {x: startXAxis + 24, y: startYAxis + 24},
            {x: startXAxis - 12, y: startYAxis + 24},
        ]

        bezierPath(points)

        if (bezierDrawStatus === false) {
            stroke = 2
        }

        return true
    }

    resetHand()
    return false
}

function two() {
    let points = [
        {x: startXAxis, y: startYAxis},
        {x: startXAxis, y: startYAxis - 50},
        {x: startXAxis + 50, y:startYAxis - 50},
        {x: startXAxis + 50, y: startYAxis}
    ]

    if (bezierDrawStatus === true) {
        bezierPath(points)
        return true
    } else if (yAxis < 42) {
        yAxis += speed
        xAxis -= speed
        return true
    } else if (xAxis < -12) {
        xAxis += speed
        return true
    }
    
    resetHand()
    return false
}

function one() {
    bezierDrawStatus = false

    if (xAxis < 30 && stroke === 0) {
        xAxis += speed
        yAxis -= speed
        return true
    } else if (yAxis < 10) {
        stroke = 1
        yAxis += speed
        return true
    } else if (yAxis === 10 && stroke === 1) {
        stroke = 2
        xAxis = 0
        return true
    } else if (xAxis < 60) {
        xAxis += speed
        return true
    }

    resetHand()
    return false
}

//body.requestFullscreen().then( () => console.log('fullscreen')).catch( (error) => console.log(error.message))
load()