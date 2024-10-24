// makeCards.js
import { addBookmark, cancelBookmark } from "./bookmarkManager.js";
import { openModal } from "./modalMaker.js";

export function makeCards(movies, option = 1) {
  const movieGrid = document.querySelector(".movie-grid");

  // 영화 카드를 동적으로 생성
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.dataset.movieId = movie.id;

    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
      <h3>${movie.title}</h3>
      <p>평점: ${movie.vote_average}</p>
    `;

    movieGrid.appendChild(movieCard);
  });

  // 영화 카드 클릭 시 모달 표시 (이벤트 위임)
  const movieClickHandler = (event) => {
    const movieCard = event.target.closest(".movie-card");
    if (movieCard) {
      const movieId = movieCard.dataset.movieId;
      const movie = movies.find((m) => m.id === Number(movieId));
      if (movie) {
        openModal(movie, option); // 모달 열기
      }
    }
  };

  movieGrid.addEventListener("click", movieClickHandler);

  if (option === 1) {
    addBookmark(movies); // 북마크 추가 기능
  } else {
    cancelBookmark(movies); // 북마크 취소 기능
  }
}
