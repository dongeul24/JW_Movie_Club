/**
 * 검색창 제어
 */
// 검색창 요소(.search) 찾기.
const searchEl = document.querySelector(".search");
const searchInputEl = searchEl.querySelector("input");
const closeBtn = document.querySelector(".close-btn-area");
const loadMoreButton = document.getElementById("load-more");

// 검색창 요소를 클릭하면 실행.
searchEl.addEventListener("click", function () {
  searchInputEl.focus();
  closeBtn.style.display = "block"; // close 버튼 보이게 설정
  loadMoreButton.style.display = "none";
});

// 검색창 요소 내부 실제 input 요소에 포커스되면 실행.
searchInputEl.addEventListener("focus", function () {
  searchEl.classList.add("focused");
  closeBtn.style.display = "block";
  searchInputEl.setAttribute(
    "placeholder",
    "영화의 제목을 입력해주세요. (ex)독전"
  );
});

// close 버튼 클릭 시 검색창 초기화 및 close 버튼 숨김.
closeBtn.addEventListener("click", function () {
  searchEl.classList.remove("focused");
  searchInputEl.setAttribute("placeholder", "");
  searchInputEl.value = ""; // 입력 내용 초기화
  closeBtn.style.display = "none"; // close 버튼 숨기기
  loadMoreButton.style.display = "block";
  defaultDisplayCards();
});

/*
검색 기능: API를 다시 가져와서 카드를 생설하는 방식을 이용하려고 했으나,
굳이 다시 카드를 생성하는게 더 복잡하다고 판단했다. 
그리고,
북마크된 페이지에서는 그 페이지 내에서(내가 북마크한 리스트 안에서) 검색 가능하게 하고, 
홈페이지에서는 그 해당 페이지 내에서 검색 가능하게 하는데에 있어서
아래 방식이 더 편리한 방법인 것 같아서, display ="none"과 block으로 검색결과를 보이게 했음.
*/

// 문서 전체에 클릭 이벤트 추가하여 검색창 외부 클릭 시 focused 클래스 유지
document.addEventListener("click", function (event) {
  // 클릭한 요소가 searchEl 또는 input인 경우 focused 클래스를 유지
  if (!searchEl.contains(event.target)) {
    // input의 값이 비어 있을 경우에만 focused 클래스 제거
    if (searchInputEl.value === "") {
      searchEl.classList.remove("focused");
      searchInputEl.setAttribute("placeholder", "");
      closeBtn.style.display = "none"; // close 버튼 숨기기
    }
  }
});

// 카드 초기화 함수
function defaultDisplayCards() {
  const movieCards = document.querySelectorAll(".movie-card");
  movieCards.forEach((card) => {
    card.style.display = "block"; // 초기화 시 모든 카드를 보여줌
  });
}

// 검색어에 따라 기존 카드를 필터링하는 함수
function filterMovies(searchTerm) {
  const movieCards = document.querySelectorAll(".movie-card");

  movieCards.forEach((card) => {
    const movieTitle = card.querySelector("h3").textContent.toLowerCase();
    if (movieTitle.includes(searchTerm.toLowerCase())) {
      card.style.display = "block"; // 검색어와 일치하는 카드는 보여줌
    } else {
      card.style.display = "none"; // 검색어와 일치하지 않는 카드는 숨김
    }
  });
}

// 디바운싱 함수
function debounce(func, delay) {
  let debounceTimer;
  return function (...args) {
    clearTimeout(debounceTimer); // 이전 타이머를 초기화
    debounceTimer = setTimeout(() => {
      func.apply(this, args); // 일정 시간이 지나면 함수 실행
    }, delay);
  };
}

// 실시간 검색 이벤트 처리
document.getElementById("searched-movie").addEventListener(
  "input",
  debounce((event) => {
    const searchTerm = event.target.value.trim(); // 입력된 검색어 가져오기
    filterMovies(searchTerm); // 필터링 함수 호출
  }, 200) // 200ms 지연으로 디바운싱 적용
);

// 페이지 로드 시 모든 카드 보여줌
document.addEventListener("DOMContentLoaded", defaultDisplayCards);
