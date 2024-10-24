import { fetchMovieData } from "./api.js";
import { makeCards } from "./cardsMaker.js";

let currentPage = 1; // 현재 페이지 카운트
const loadMoreButton = document.getElementById("load-more");

// 초기 영화 데이터 표시
async function displayMovies() {
  const movies = await fetchMovieData(currentPage);
  makeCards(movies);
  currentPage++; // 다음 페이지를 위해 페이지 수 증가
}

// 더보기 버튼 클릭 이벤트
loadMoreButton.addEventListener("click", async () => {
  loadMoreButton.style.display = "none"; // 버튼 숨기기
  const movies = await fetchMovieData(currentPage);
  makeCards(movies);
  currentPage++; // 다음 페이지를 위해 페이지 수 증가

  // 새로운 카드가 추가된 후 버튼 보이기
  loadMoreButton.style.display = "block";
});

// 초기 영화 데이터 로드
displayMovies();
