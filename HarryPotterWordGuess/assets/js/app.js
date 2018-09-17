let state = {
    wordList: wordData
}

let wordArray= [];//put word for this level
let letterArrayGuess =[];//letter guess true;
let letterArray =[];//letter guss false
let letterCounter = 0;//size of dash replaced by letter
let starCounter = 10;//counter for lost
let mythWord = [];//word for this step from wordArray list
let nextbtnCounter = 0;//for check next btn visibility


/***************load game no next btn no text message */
$('#winText').addClass('nonVisible');
$('#nextBtn').addClass('nonVisible');

/************ shuffle function for make random */
function shuffle(wordArray) {
    let currentIndex = wordArray.length, temporaryValue, randomIndex;//for this example = 4
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = wordArray[currentIndex];
      wordArray[currentIndex] = wordArray[randomIndex];
      wordArray[randomIndex] = temporaryValue;
    }
    return wordArray;
  }

 /******************start btn click */
 $('#startBtn').on('click', function(){
    event.preventDefault(); 
    wordArray = state.wordList.filter(e => (e.level.toLowerCase() == ($('#levelSelector').val()).toLowerCase())).map(e => e.word);
    wordArray = shuffle(wordArray);
    mythWord = wordArray[0].split('');

    for(let i = 0; i <  mythWord.length; i++) {
        $('#gameContent').append('<div id="dash' + i + '" class="dashes">&mdash;</div>' )
      }
      $(this).addClass('nonVisible');
 });

/**********************Next btn click */
 $('#nextBtn').on('click', function(){
    event.preventDefault(); 

     letterArrayGuess =[];//letter guess true;
     letterArray =[];//letter guss false
     letterCounter = 0;//size of dash replaced by letter
     mythWord = [];//word for this step from wordArray list
    $('#winText').addClass('nonVisible');

    nextbtnCounter++;
    mythWord = wordArray[nextbtnCounter].split('');
    for(let i = 0; i <  mythWord.length; i++) {
        $('#gameContent').append('<div id="dash' + i + '" class="dashes">&mdash;</div>' )
    }
        $(this).addClass('nonVisible');
    
 });


/********************key press handeler */
 function keydownHandler(e) {
     event.preventDefault(); 
     let key = String.fromCharCode(e.keyCode).toLowerCase();
     
     let checkLive = false;/*******check should delete star or not */
     let dashDivid = '';
     let starDivId ='';
    //  let myCheckGuess =true;
    if((64 < e.keyCode)&&(e.keyCode<91)){
        if(starCounter > 1){//****************live = 10 in first */
            if(letterCounter < mythWord.length){//************************it mean we have dash yet */
                let letC = 0;
                let myCheckGuess;/*********************check this true btn pueshed before or not */

                for (let i = 0; i < mythWord.length; i++) {
                    dashDivid = `#dash${i}`;/*****************id = dash0, dash1,...,dashn */
                     
                   if(key === mythWord[i].toLowerCase()){/********************key = letter of mythword */
                        checkLive = true;
                       $(dashDivid).text(key);
                       letC++;  
                   }
                }

                myCheckGuess = letterArrayGuess.filter(e => key === e.toLowerCase());
                if(myCheckGuess.length === 0){
                    letterArrayGuess.push(key);
                    letterCounter = letterCounter+ letC;
                    if(letterCounter === mythWord.length){
                        if(nextbtnCounter === wordArray.length - 1){
                            $('#gameContent').empty();
                            $('#winText').text(`congratulations You Guessed ${mythWord.join('')} and finished this level`);
                            $('#winText').removeClass('nonVisible');
                        }
                        else{
                            $('#gameContent').empty();
                            $('#winText').text(`congratulations You Guessed ${mythWord.join('')}`);
                            $('#nextBtn').removeClass('nonVisible');
                            $('#winText').removeClass('nonVisible');
                        }
                       
                    }
                }

                if(checkLive === false){
                   let falseArrayCheck = false;
                   for(i = 0; i< letterArray.length; i++){
                       if(key.toLowerCase() === letterArray[i].toLowerCase())
                            falseArrayCheck = true;
                   }
                   if(falseArrayCheck === false){
                       letterArray.push(key);
                        starDivId =`#star${starCounter}`.toString();
                        starCounter--;
                        $(starDivId).addClass('nonVisible');
                   } 
               }
    
            }
            else{/***********************************no any dash + have some live => gess true*/
                $('#gameContent').empty();
                $('#winText').text(`congratulations You Guessed ${mythWord}`);
                $('#nextBtn').removeClass('nonVisible');
                $('#winText').removeClass('nonVisible');
            }
         }
         else{/*************************************no live Game over */
            $('#gameContent').empty();
            $('#pointDiv').empty();
            $('#winText').text('Game Over :(');
            $('#winText').removeClass('nonVisible');
        }

    }
}

// register your handler method for the keydown event
if (document.addEventListener) {
    document.addEventListener('keydown', keydownHandler, false);
}
else if (document.attachEvent) {
    alert('m');
    document.attachEvent('onkeydown', keydownHandler);
}

let restart = function(){
    location.reload();
}

$('#levelSelector').on('change', function (e) {
    event.preventDefault();
    var valueSelected = this.value;
    
     wordArray= [];//put word for this level
     letterArrayGuess =[];//letter guess true;
     letterArray =[];//letter guss false
     letterCounter = 0;//size of dash replaced by letter
     starCounter = 10;//counter for lost
     mythWord = [];//word for this step from wordArray list
     nextbtnCounter = 0;//for check next btn visibility


/***************load game no next btn no text message */
$('#winText').addClass('nonVisible');
$('#nextBtn').addClass('nonVisible');
$('#startBtn').removeClass('nonVisible');
$('#gameContent').empty();
});


  
  