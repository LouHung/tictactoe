const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const startPage = $('.startPage')
const boardGame = $('.boardGame')
const endPage = $('.endPage')
const endPageBtn = $('.endPage button')
const startBtn = $('.startPage #startBtn')
const onePlayerBtn= $('.startPage #onePlayerBtn')
const box = $$('.boxes .box')
const boxes = Array.from(box)
let iconEndPage = $('.iconPlayerWon')
let inputPlayer1 = $('.startPage #playerName1')
let inputPlayer2 = $('.startPage #playerName2')
let namePlayer1Input = $('.boardGame .namePlayerTag1')
let namePlayer2Input = $('.boardGame .namePlayerTag2')
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
let drawGame = false
let option = '1player'
let boxWasChosen1 = function(box) {
    return box.classList.contains('boxField1')
}
let boxWasChosen2 = function(box) {
    return box.classList.contains('boxField2')
}

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
onePlayerBtn.onclick=function(){
    renderBoard()
}

startBtn.onclick = function() {
    if (inputPlayer1.value == '' || inputPlayer2.value == '') {
        alert('Please enter player name')
    } else {
        option='2player'
       renderBoard()
    }
}


// mouse in and mouse out

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
            if (boxWasChosen1(box) || boxWasChosen2(box)) {
              
            } else {
                e.path[0].innerHTML = ``    
            }
        }
      chooseBox(box)  
})


//load boardGame
function renderBoard(){
    startPage.style.display = 'none'
    boardGame.style.display = 'flex'
    name1 = inputPlayer1.value
    name2 = inputPlayer2.value
    namePlayer1Input.innerHTML = name1
    namePlayer2Input.innerHTML = name2
}


//choose box add class boxField1 and boxField2
function chooseBox(box) {
    box.onclick = function(e) {
       
        if (boxWasChosen1(box) || boxWasChosen2(box)) {

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
        changeFlag()
        check()//check player win =>player1win = true
        if(!player1Win&&drawGame==false&&option=="1player"){ 
            randomBox(boxes)
        }
    }
    check()

    }
}

function changeFlag(){
    turnPlayer1.isTurn? player1.classList.add('active') : player1.classList.remove('active')
    turnPlayer2.isTurn? player2.classList.add('active') : player2.classList.remove('active')   
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
    //render who win
    if(player1Win) {
        renderWhoWin(name1,'orange','<i class="far fa-circle"></i>')

    }
    if(player2Win) {
        renderWhoWin(name2,'rgb(70, 70, 134)','<i class="fas fa-times"></i>')
        
    }
    if(turn==9&&player1Win==false&&player2Win==false) {
        drawGame = true
        draw()
    }
    
}
function renderWhoWin(name,background,icon){
    endPage.style.display = 'flex'
    boardGame.style.display = 'none'
    namePlayerWin.innerHTML = name;
    endPage.style.background = background
    iconEndPage.innerHTML = icon
    turn=0//prevent it move to draw condition
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

reset()

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
                player1Win=false
                player2Win=false
                turnPlayer1.isTurn = true
                turnPlayer2.isTurn = false;
                turn=0
                drawGame=false
                //reset tag
                changeFlag()  
                allCase1 = []
                allCase2 = [] 
    }
}

function autoChoose(box,random) {
    box[random].innerHTML=`<i class="fas fa-times"></i>`
    box[random].classList.add('boxField2') 
    box[random].style.color="black"
    turn+=1
    turnPlayer1.isTurn? turnPlayer1.isTurn = false:turnPlayer1.isTurn = true
    turnPlayer2.isTurn? turnPlayer2.isTurn = false:turnPlayer2.isTurn = true
    changeFlag()
}


function randomBox(boxes) {
    
    let boxChosenRandom1 = function(random){return boxes[random].classList.contains('boxField1')}
    let boxChosenRandom2 = function(random){return boxes[random].classList.contains('boxField2')}
    
            setTimeout(function() {
                let random = Math.floor(Math.random()*9)
    
                while(boxChosenRandom1(random) || boxChosenRandom2(random)){
                    random = Math.floor(Math.random()*9)
                }
                
                autoChoose(boxes,random)
          
                //  let a 
                //  a= boxes.filter(function(box){
                //  return box.classList.contains('boxField1') || box.classList.contains('boxField2')
                //      })
        
                //  if(a.length==8&&turnPlayer2.isTurn){
                //      player2Win=true
                //  }
                 check()
            },100)
            
        }
       
        
