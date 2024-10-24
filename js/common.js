/**
 * 페이지 스크롤에 따른 요소 제어
 */
const toTopEl = document.querySelector("#to-top");
// 스크롤이 지나치게 자주 발생하는 것을 조절(throttle, 일부러 부하를 줌
window.addEventListener(
  "scroll",
  _.throttle(function () {
    // 페이지 스크롤 위치가 500px이 넘으면.
    if (window.scrollY > 500) {
      // 상단으로 스크롤 버튼 보이기
      gsap.to(toTopEl, 0.2, {
        x: 0,
      });

      // 페이지 스크롤 위치가 500px이 넘지 않으면.
    } else {
      // 상단으로 스크롤 버튼 숨기기
      gsap.to(toTopEl, 0.2, {
        x: 100,
      });
    }
  }, 300)
);
// 상단으로 스크롤 버튼을 클릭하면,
toTopEl.addEventListener("click", function () {
  // 페이지 위치를 최상단으로 부드럽게(0.7초 동안) 이동.
  gsap.to(window, 0.7, {
    scrollTo: 0,
  });
});

/**
 * 올해가 몇 년도인지 계산
 * footer부분에 쓰일 요소임.
 */
const thisYear = document.querySelector(".this-year");
thisYear.textContent = new Date().getFullYear();


