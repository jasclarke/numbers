const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 500

const handImage = new Image()
handImage.src = 'images/hand.png'
const spriteWidth = 54
const spriteHeight = 60
const body = document.getElementById('body')
const playerScore = document.getElementById('player-score')
const closeBtn = document.getElementById('close-btn')
const numInput = document.getElementById('num-input')
const newGameBtn = document.getElementById('new-game-btn')
const numModalBtn = document.getElementById('num-modal-btn')
const numModal = document.getElementById('num-modal')
const roundModal = document.getElementById('round-modal')
const gameOverModal = document.getElementById('game-over-modal')
const roundDetails = document.getElementById('round-details')
const gameDetails = document.getElementById('game-details')
const numberList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
const playerOneOnes = document.getElementById('player-one-ones')
const playerOneTwos = document.getElementById('player-one-twos')
const playerOneThrees = document.getElementById('player-one-threes')
const playerOneFours = document.getElementById('player-one-fours')
const playerOneFives = document.getElementById('player-one-fives')
const playerOneSixes = document.getElementById('player-one-sixes')
const playerOneSevens = document.getElementById('player-one-sevens')
const playerOneEights = document.getElementById('player-one-eights')
const playerOneNines = document.getElementById('player-one-nines')
const playerTwoOnes = document.getElementById('player-two-ones')
const playerTwoTwos = document.getElementById('player-two-twos')
const playerTwoThrees = document.getElementById('player-two-threes')
const playerTwoFours = document.getElementById('player-two-fours')
const playerTwoFives = document.getElementById('player-two-fives')
const playerTwoSixes = document.getElementById('player-two-sixes')
const playerTwoSevens = document.getElementById('player-two-sevens')
const playerTwoEights = document.getElementById('player-two-eights')
const playerTwoNines = document.getElementById('player-two-nines')
const oneBtn = document.getElementById('one-btn')
const twoBtn = document.getElementById('two-btn')
const threeBtn = document.getElementById('three-btn')
const fourBtn = document.getElementById('four-btn')
const fiveBtn = document.getElementById('five-btn')
const sixBtn = document.getElementById('six-btn')
const sevenBtn = document.getElementById('seven-btn')
const eightBtn =  document.getElementById('eight-btn')
const nineBtn = document.getElementById('nine-btn')
const numBtns = document.getElementsByClassName('num-btns')
const fastSetting = document.getElementById('fast')
const fasterSetting = document.getElementById('faster')
const fastestSetting = document.getElementById('fastest')
const noviceSetting = document.getElementById('novice')
const intermediateSetting = document.getElementById('intermediate')
const expertSetting = document.getElementById('expert')
const htmlGameBoard = document.getElementById('html-game-board')
const startGameButton = document.getElementById('start-game-button')
const quitButton = document.getElementById('quit-button')
const settingsButton = document.getElementById('settings-button')
const confirmSettingsButton = document.getElementById('confirm-settings-button')
const menu = document.getElementById('menu')
const game = document.getElementById('game')
const settings = document.getElementById('settings')

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

oneBtn.addEventListener('click', () => processTurn(1))
twoBtn.addEventListener('click', () => processTurn(2))
threeBtn.addEventListener('click', () => processTurn(3))
fourBtn.addEventListener('click', () => processTurn(4))
fiveBtn.addEventListener('click', () => processTurn(5))
sixBtn.addEventListener('click', () => processTurn(6))
sevenBtn.addEventListener('click', () => processTurn(7))
eightBtn.addEventListener('click', () => processTurn(8))
nineBtn.addEventListener('click', () => processTurn(9))

numModalBtn.addEventListener('click', () => {
    [...numBtns].forEach( btn => btn.removeAttribute('disabled'))
    playerOne.turn ? disableButtons(excludedGuessedNumbers) : disableButtons(excludedWrittenNumbers)
    openModal(numModal)
})

closeBtn.addEventListener('click', () => {
    closeModal(roundModal)
    if (playerTwo.turn) {
        writtenNum = educatedGuess(excludedWrittenNumbers)
        submitNumber(writtenNum)
    }
})

newGameBtn.addEventListener('click', () => newGame())

startGameButton.addEventListener('click', () => {
    //menu.requestFullscreen().then( () => console.log('Enter Fullscreen')).catch( (error) => console.log(error.message))
    menu.classList.add('remove-page')
    htmlGameBoard.classList.remove('orange-background')
    htmlGameBoard.classList.add('blue-background')
    game.classList.remove('remove-page')
    let config = JSON.parse(localStorage.getItem('settings'))
    setSpeed(config.speed)
    difficulity = parseInt(config.difficulity)
    console.log(speed, bezierDrawSpeed)
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

confirmSettingsButton.addEventListener('click', () => {
    let config = {
        speed: getRadioValueByName('hand-speed'),
        difficulity: getRadioValueByName('ai-guessing-ability')
    }

    localStorage.setItem('settings', JSON.stringify(config))
    settings.classList.add('remove-page')
    menu.classList.remove('remove-page')
})

function newGame() {
    location.reload()
}

function load() {
    configureSettings()
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    handImage.onload = () => ctx.drawImage(handImage, xAxis + startXAxis, yAxis + startYAxis, spriteWidth, spriteHeight)
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
            difficulity: 0
        }

        localStorage.setItem('settings', JSON.stringify(settings))
    }

    setRadioInputs(settings)
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
                oneBtn.setAttribute('disabled', '')
                break;
            case 2:
                twoBtn.setAttribute('disabled', '')
                break;
            case 3:
                threeBtn.setAttribute('disabled', '')
                break;
            case 4:
                fourBtn.setAttribute('disabled', '')
                break;
            case 5:
                fiveBtn.setAttribute('disabled', '')
                break;
            case 6:
                sixBtn.setAttribute('disabled', '')
                break;
            case 7:
                sevenBtn.setAttribute('disabled', '')
                break;
            case 8:
                eightBtn.setAttribute('disabled', '')
                break;
            case 9:
                nineBtn.setAttribute('disabled', '')
                break;
            default:
                break;
        }
    })
}

function submitNumber(number) {
    // will change to buttons for each case
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
    } else if (playerOne.turn) aiGuessNumber()
}

function guessNumber(number) {
    if (parseInt(number) !== parseInt(writtenNum)) {
        playerTwo[numWord] += 1
        playerTwo.score += 1
        if (playerTwo[numWord] === 4) excludedWrittenNumbers.push(writtenNum)
        strikeNumber(2, writtenNum, playerTwo[numWord])
        if (playerTwo.score !== 35) {
            roundDetails.innerHTML = `Better luck next time! <br/> You guessed ${number} and AI wrote ${writtenNum}`
            openModal(roundModal)
        } else {
            gameDetails.innerHTML = `AI Won. Try Again!`
            openModal(gameOverModal)
        }
    } else {
        playerOne.turn = true
        playerTwo.turn = false
        numModalBtn.innerHTML = `Draw Number`
        roundDetails.innerHTML = `<h2>Nicely done!</h2> <p>You guessed ${number} and AI wrote ${writtenNum}</p>`
        openModal(roundModal)
    } 
}

function aiGuessNumber() {
    let guessedNumber = educatedGuess(excludedGuessedNumbers)

    if (guessedNumber !== parseInt(writtenNum)) {
        playerOne[numWord] += 1
        playerOne.score += 1
        playerScore.innerHTML = playerOne.score
        if (playerOne[numWord] === 4) excludedGuessedNumbers.push(writtenNum)
        strikeNumber(1, writtenNum, playerOne[numWord])
        if (playerOne.score !== 35) {
            roundDetails.innerHTML = `<h2>Nicely done!</h2> <p>You wrote ${writtenNum} and AI guessed ${guessedNumber}</p>`
            openModal(roundModal)
        } else {
            gameDetails.innerHTML = `Congrats You Won!`
            openModal(gameOverModal)
        }
    } else {
        playerOne.turn = false
        playerTwo.turn = true
        numModalBtn.innerHTML = `Guess Number`
        roundDetails.innerHTML = `Yikes! <br/> You wrote ${writtenNum} and AI guessed ${guessedNumber}`
        openModal(roundModal)
    }
}

function educatedGuess(excluded) {
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
        let availableNumbers = numberList.filter( num => excluded.every( n => parseInt(num) !== parseInt(n)))
        /**
         * Extract a certain amount of numbers except the correct number to an array
         * Add number to the array
         * randomise the array using sort
         * send the array to the random function
         * 
         */
        return randomElementFromArray(availableNumbers)
    }
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
                playerOneOnes.innerHTML = nums
                break;
            case 2:
                playerOneTwos.innerHTML = nums
                break;
            case 3:
                playerOneThrees.innerHTML = nums
                break;
            case 4:
                playerOneFours.innerHTML = nums
                break;
            case 5:
                playerOneFives.innerHTML = nums
                break;
            case 6:
                playerOneSixes.innerHTML = nums
                break;
            case 7:
                playerOneSevens.innerHTML = nums
                break;
            case 8:
                playerOneEights.innerHTML = nums
                break;
            case 9:
                playerOneNines.innerHTML = nums
                break;
            default:
                roundDetails.innerHTML = `Opps something went wrong. Please report this to the developers.`
                openModal(roundModal)
                break;
        }
    } else {
        switch (parseInt(number)) {
            case 1:
                playerTwoOnes.innerHTML = nums
                break;
            case 2:
                playerTwoTwos.innerHTML = nums
                break;
            case 3:
                playerTwoThrees.innerHTML = nums
                break;
            case 4:
                playerTwoFours.innerHTML = nums
                break;
            case 5:
                playerTwoFives.innerHTML = nums
                break;
            case 6:
                playerTwoSixes.innerHTML = nums
                break;
            case 7:
                playerTwoSevens.innerHTML = nums
                break;
            case 8:
                playerTwoEights.innerHTML = nums
                break;
            case 9:
                playerTwoNines.innerHTML = nums
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