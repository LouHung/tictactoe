const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const startPage = $('.startPage')
const boardGame = $('.boardGame')
const endPage = $('.endPage')
const endPageBtn = $('.endPage button')
const startBtn = $('.startPage button')
const box = $$('.boxes .box')
let iconEndPage = $('.iconPlayerWon')
let inputPlayer1 = $('.startPage #playerName1')
let inputPlayer2 = $('.startPage #playerName2')
let namePlayer1Input = $('.boardGame .namePlayer1')
let namePlayer2Input = $('.boardGame .namePlayer2')
let turn = 0
let name1
let name2
let namePlayerWin = $('.endPage .playerName')
let turnPlayer1 = {isTurn: true}
let turnPlayer2 = {isTurn: false}
let player1 = $('.boardGame .player1')
let player2 = $('.boardGame .player2')
let allCase1 = []
let allCase2 = []
let player1Win = false
let player2Win = false
// case to win
const winCases = [
    ['1-1', '1-2', '1-3'],
    ['1-1', '2-2', '3-3'],
    ['1-2', '2-2', '3-2'],
    ['1-3', '2-2', '3-1'],
    ['1-1', '2-1', '3-1'],
    ['1-3', '2-3', '3-3'],
    ['2-1', '2-2', '2-3'],
    ['3-1', '3-2', '3-3']

]
reset()
//load boardGame
startBtn.onclick = function() {
    if (inputPlayer1.value == '' || inputPlayer2.value == '') {
        alert('Please enter player name')
    } else {
        startPage.style.display = 'none'
        boardGame.style.display = 'flex'
        name1 = inputPlayer1.value
        name2 = inputPlayer2.value
        namePlayer1Input.innerHTML = name1
        namePlayer2Input.innerHTML = name2
    }
}


// mouse in and mouse out
const boxes = Array.from(box)
    boxes.forEach(function(box) {

        box.onmouseenter = function(e) {
            if (box.classList.contains('boxField1') || box.classList.contains('boxField2')) {
            
            } else {
                if (turnPlayer1.isTurn) {
                    e.path[0].innerHTML=`<i class="far fa-circle"></i>`
                    e.target.style.color="white"
                }
                if (turnPlayer2.isTurn) {
                    e.path[0].innerHTML=`<i class="fas fa-times"></i>`
                    e.target.style.color="white"
                }
            }
        }
        box.onmouseout = function(e) {
            if (box.classList.contains('boxField1') || box.classList.contains('boxField2')) {
              
            } else {
                e.path[0].innerHTML = ``    
            }
        }
      chooseBox(box)  
})
   
    
//choose box add class boxField1 and boxField2
function chooseBox(box) {
    box.onclick = function(e) {
        if (box.classList.contains('boxField1') || box.classList.contains('boxField2')) {

        } else {
            if(turnPlayer1.isTurn) {
        e.path[0].innerHTML=`<i class="far fa-circle"></i>`
        e.path[0].classList.add('boxField1') 
        e.target.style.color="black"
        turn+=1
    }
             if(turnPlayer2.isTurn) {
        e.path[0].innerHTML=`<i class="fas fa-times"></i>`
        e.path[0].classList.add('boxField2') 
        e.target.style.color="black"
        turn+=1
    }
        //change turn
        turnPlayer1.isTurn? turnPlayer1.isTurn = false:turnPlayer1.isTurn = true
        turnPlayer2.isTurn? turnPlayer2.isTurn = false:turnPlayer2.isTurn = true
        //change tag above boardGame
        turnPlayer1.isTurn? player1.classList.add('active') : player1.classList.remove('active')
        turnPlayer2.isTurn? player2.classList.add('active') : player2.classList.remove('active')   
    }
    check()
}
}

// check who win
function check() {
    winCases.forEach((cases) => {

        let resultPlayer1 = cases.every((id) => {
            return document.getElementById(id).classList.contains('boxField1')
        })
        let resultPlayer2 = cases.every((id) => {
            return document.getElementById(id).classList.contains('boxField2')
        })
        allCase1.push(resultPlayer1)
        allCase2.push(resultPlayer2)
        //if player win => true, draw => false
        player1Win = !allCase1.every((boolean) => {return boolean==false})
        player2Win = !allCase2.every((boolean) => {return boolean==false})
    
    })
    
    if(player1Win) {
        endPage.style.display = 'flex'
        boardGame.style.display = 'none'
        endPage.style.background = "orange"
        namePlayerWin.innerHTML = name1
        iconEndPage.innerHTML = '<i class="far fa-circle"></i>'
        player1Win=true
        turn=0//prevent it move to draw condition
    }
    if(player2Win) {
        endPage.style.display = 'flex'
        boardGame.style.display = 'none'
        namePlayerWin.innerHTML = name2;
        endPage.style.background = "rgb(70, 70, 134)"
        iconEndPage.innerHTML = '<i class="fas fa-times"></i>'
        turn=0
    }
    if(turn==9&&player1Win==false&&player2Win==false) {
        draw()
    }
    
    allCase1 = []
    allCase2 = []
}



function draw() {
    if(turn==9) {
        endPage.style.display = 'flex'
        boardGame.style.display = 'none'
        $('.playerNameWon').style.display ='none'
        $('.drawGame').style.display = 'block'
        endPage.style.background='rgb(15, 183, 195)';
        iconEndPage.style.display = 'none'
    }
}


function reset() {
    endPageBtn.onclick = function() {
        endPage.style.display = 'none'
        boardGame.style.display = 'flex'
        boxes.forEach(function(box) {
            box.classList.remove('boxField1')
            box.classList.remove('boxField2')
            box.innerHTML='';
            box.style.color = 'white'
            endPage.classList.remove('active')
            $('.drawGame').style.display = 'none'
            $('.playerNameWon').style.display = 'unset'
            iconEndPage.style.display = 'block'
        })
           
                turnPlayer2.isTurn = false;
                turn=0
                turnPlayer1.isTurn = true
                //reset tag
                turnPlayer1.isTurn == true? player1.classList.add('active') : player1.classList.remove('active')
                turnPlayer2.isTurn == true? player2.classList.add('active') : player2.classList.remove('active')       
    }
}
