// 변수
const GAME_TIME = 6;
const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let words = [];
let checkInterval;

init();

function init(){
    buttonChange('게임로딩중...');
    getWords();
    wordInput.addEventListener('input',chcekMatch);
}

// 게임실행
function run(){
    if(isPlaying){
        return; // isplaying이 현재 true면 버튼 눌러도 return 던짐으로서 재실행 안되게
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    score = 0;
    scoreDisplay.innerText = score;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50); // 50ms마다 checkStatus 하도록
    buttonChange('단어를 입력하세요.');
}


function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange("게임시작");
        clearInterval(checkInterval);
    }
}

//단어불러오기
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            // handle success
            response.data.forEach((word)=>{
                if(word.length<10){
                    words.push(word);
                }
            })
            buttonChange('게임시작');
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        
}

//단어일치체크
function chcekMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value="";
        if(!isPlaying){
            return; //return 주면 아래 내용 실행 안되고 함수 종료
        }
        score++;
        scoreDisplay.innerText = score;
        time = GAME_TIME;
        const randomIndex = Math.floor(Math.random()*words.length);
        wordDisplay.innerText = words[randomIndex];
       
    }
}



function countDown(){
    time > 0 ? time -- : isPlaying = false;
    if(!isPlaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}

function buttonChange(text){
    button.innerText = text;
    text ==='게임시작' ? button.classList.remove('loading') : button.classList.add('loading');
}
