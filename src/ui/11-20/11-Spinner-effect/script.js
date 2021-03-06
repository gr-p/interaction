let intro = document.querySelector(".intro");       // intro class 선택
let splitText = intro.querySelector(".split-text"); // intro class 하위에 split-text 선택
let arr = splitText.innerText.split("");            // split-text class에 주어진 텍스트를 한 글자씩 쪼개어 배열을 생성
let html = "";                                      // html 변수에 내용을 담기 전에 먼저 초기화

// html 변수에 각 string을 조건식으로 글자의 길이 만큼 span tag에 담음
for (let i = 0; i < arr.length; i++) {
  html += '<span>' + arr[i] + '</span>';
}

// split-text class의 h2 안의 plain text를 span tag들로 덮어씌움 
splitText.innerHTML = html;

let clone = splitText.cloneNode(true); // intro class div 에서 span들의 묶음인 h2를 복사
clone.classList.add("clone");          // 복사한 h2 태그에 clone className 추가
intro.appendChild(clone);              // clone className이 추가된 h2 복사본을 intro div의 마지막 자식으로 삽입


// intro class div에서 모든 span 태그들을 선택
let chars = [...splitText.querySelectorAll("span")];
// onTextHover 함수가 실행되기 전 기본 셋팅은 true로 설정
let timelineCompleted = true; 
// onTextHover 함수가 종료되면 true로 다시 셋팅 해줌
let tl = gsap.timeline({
  onComplete: () => {
    timelineCompleted = true;
  }
});
// console.log(timelineCompleted); // 기본 설정 & 다시 설정해준 true가 출력됨


// intro class div에 mouse hover 시 실행될 onTextHover 함수 
const onTextHover = () => {

  // console.log('onTextHover started!!!')
  // console.log(timelineCompleted); // 함수 실행 시 true

  if (!timelineCompleted) return; // timelineCompleted가 false일 경우 return
  timelineCompleted = false;      // timelineCompleted가 함수 실행 전에 true였으니 false로 적용해줘야 return됨

  // console.log('timelineCompleted set!!!')
  // console.log(timelineCompleted); // false로 적용해줘서 false가 출력
  
  targetChars = chars.filter(o => Math.random() < 0.5); 
  // array.prototype.filter 함수는 주어진 원 배열의 각 요소를 순서대로 받아낸 후,
  // 주어진 표현식의 실행 결과가 true일 때에만 선택된 요소를 남기게 됨(return)
  // chars 배열의 span 태그가 순서대로 o 로 받아내어짐
  // 표현식의 결과가 true이어야 o가 현재 받아낸 span 태그가 남겨지게 됨
  // 표현식인 Math.random() < 0.5 에서 Math.random() 함수는 0~1 사이의 숫자를 return하므로
  // 50%의 확률로 Math.random() < 0.5 가 true 가 되고,
  // true가 되었을 때 o가 현재 받아낸 span 태그가 남겨지게 됨 
  // (o로 받아낸 span 태그를 활용해서 true/false를 판단하지 않고 식만 표현)

  tl.to(targetChars, {
    duration: 0.3,       // 지속시간
    ease: Quad.easeIn,   // 애니메이션 종류
    y: '-100%',          // span 태그에 담긴 글자들이 위쪽으로 날라가는 양 (y축 방향으로 - 라면 그만큼 원본 태그로부터 위 지점을 가리킴)
    opacity: 0,          // 위로 올라가면서 투명도 100% 로 사라지게 됨
    stagger: {
      amount: 0.3,       // 유지시간
      from: 'random'     // 애니메이션이 시작하는 위치 ("start", "center", "edges", "random", or "end")
                         // stagger 참고문서 : https://greensock.com/docs/v3/Staggers
    }
  }).to(targetChars, {
    duration: 0.5,
    ease: Quint.easeOut,
    startAt: {           // 애니메이션이 적용된 대상들이 출발할 지점을 지정할 수 있음
      y: '50%'           // span 태그에 담긴 글자들이 출발하는 위치 (y축 방향으로 + 라면 그만큼 원본 태그로부터 아래 지점을 가리킴)
    },
    y: '0%',
    opacity: 1,          // 위로 올라오면서 투명도 0% 로 나타나게 됨
    stagger: {
      amount: 0.3,
      from: 'random'
    }
  });
  // console.log('onTextHover ended!!!')
  // console.log(timelineCompleted); // 함수가 끝날때까지 false가 적용됨
};

intro.addEventListener("mouseenter", onTextHover);

// addEventListener 'mouseenter'
// https://developer.mozilla.org/en-US/docs/Web/API/Element/mouseenter_event#mouseenter