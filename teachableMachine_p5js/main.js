// https://teachablemachine.withgoogle.com/models/OJbk_sDSA/
// https://teachablemachine.withgoogle.com/models/MISePy52D/

// function setup() {
    
//   createCanvas(500, 500);
//   // Loading the Image
//   //print(img.width, img.height);
//   // let cvsX = (windowWidth - img.width)/2;
//   // let cvsY = (windowHeight - img.height)/2;
//   // cnv.position(cvsX, cvsY);
// //  
// }





// CV 관련 코드.
var classifier; // 분류하는 변수
var imageModelURL = 'https://teachablemachine.withgoogle.com/models/OJbk_sDSA/';    // 훈련된 모델의 업로드 URL.

// 동영상 관련 코드.
var video; // 비디오
var flippedVideo; // 조금 더 정제된 비디오 데이터

var videoWidth = 600 // 내 웹캠 가로
var videoHeight = 400 // 내 웹캠 세로

var canvasWidth = 800 // 캔버스 가로
var canvasHeight = 800 // 캔버스 세로

var check = 0;
var result ='..';
function setup() {

  // 모델 분류 라벨 불러오기
  classifier = ml5.imageClassifier(imageModelURL + 'model.json'); // 쉽게 내가 만든 모델 불러온다고 생각해요

  createCanvas(800, 800);
  
  // 비디오 캡처 설정.
  video = createCapture(VIDEO); // 영상 피드를 담는거임
  video.size(videoWidth, videoHeight); // 담은 비디오 사이즈를 웹캠 크기에 맞추기
  video.hide(); 
  
  // 비디오 분류 관련 코드.
  updateModel() 
}



function draw() {
  background(50);
  textSize(32);
  text(result, canvasWidth/2 - 16, canvasHeight - 80);
  fill('white');

  // 박스 그리기
  
  // 웹캠 비디오 표시.
  image(flippedVideo, 100, 200);
}



// 카메라를 통해 이미지 받고 모델 prediction 하는 코드
function updateModel(){
  flippedVideo = ml5.flipImage(video); // 외부 모델?
  classifier.classify(flippedVideo, classiferHandler); // 외부 
  flippedVideo.remove();
}



// prediction 결과 핸들링 함수
function classiferHandler(error, results) {
  
  // results에는 각 클래스별 확률(점수)가 나옴
  // 0부터 가장 높은 순서대로 나옴
  check = check + 1;
  result = results[0].label;

  if (result == "에어팟"&&check==30) {
    audio = new Audio('https://papago.naver.com/apis/tts/c_lt_kyuri_2.1.14_109-nvoice_kyuri_2.1.14_3b578cf6a43f4e813415d1982e4e377c-1642215646839');
    audio.play(); 
    check = 0;
  } else if (result == "아이폰"&&check==30) {
    audio = new Audio('https://papago.naver.com/apis/tts/c_lt_kyuri_2.1.14_394-nvoice_kyuri_2.1.14_31102696d4887ecef916de8a7909163e-1642214333288');
    audio.play();
    check = 0;
  } else if (result == "기본"&&check==30) {
    audio = new Audio('https://papago.naver.com/apis/tts/c_lt_kyuri_2.1.14_252-nvoice_kyuri_2.1.14_a848d959d9328152ee914ba1f1bd6a62-1642223356060');
    audio.play();
    check = 0;
  } else if (result == "컵"&&check==30) {
    audio = new Audio('https://papago.naver.com/apis/tts/c_lt_kyuri_2.1.14_203-nvoice_kyuri_2.1.14_43e2f4a4cc7d6f2482ffc14423838ca4-1642223390790');
    audio.play();
    check = 0;
  }


  console.log(result)
  console.log(check)
  // 다음 결과를 받기 위한 prediction

  setTimeout(function() {
    updateModel();
  }, 50);
}
