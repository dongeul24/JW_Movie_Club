// makeCards.js
import { addBookmark, cancelBookmark } from "./bookmarkManager.js";
import { openModal } from "./modalMaker.js";

export function makeCards(movies, option = 1) {
  const movieGrid = document.querySelector(".movie-grid");

  // 기존 그리드 내용 초기화
  movieGrid.innerHTML = "";

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

// // makeCards
// // API 정보를 기반으로 영화 카드를 만들어내는 함수
// export function makeCards(movies, option = 1) {
//   const movieGrid = document.querySelector(".movie-grid"); // 영화 카드들이 들어갈 그리드
//   const modal = document.querySelector(".modal"); // 모달창
//   const modalPoster = document.querySelector(".modal-poster"); // 모달의 포스터 이미지
//   const modalTitle = document.querySelector(".modal-title"); // 모달의 영화 제목
//   const modalOverview = document.querySelector(".modal-overview"); // 모달의 영화 설명
//   const modalReleaseDate = document.querySelector(".modal-release-date"); // 모달의 개봉일
//   const modalVoteCount = document.querySelector(".modal-vote-average"); // 모달의 평점
//   const closeBtn = document.querySelector(".close"); // 모달 닫기 버튼
//   const bookmarkBtn = document.querySelector(".bookmark-btn"); //북마크 버튼
//   const bookmarkCancelBtn = document.querySelector(".bookmark-cancel-btn"); //북마크 취소 버튼

//   movies.forEach((movie) => {
//     const movieCard = document.createElement("div");
//     movieCard.classList.add("movie-card");
//     movieCard.dataset.movieId = movie.id; // 각 영화 카드에 movie.id를 속성으로 저장

//     movieCard.innerHTML = `
//       <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster">
//       <h3>${movie.title}</h3>
//       <p>평점: ${movie.vote_average}</p>
//     `;

//     movieGrid.appendChild(movieCard); // 영화 카드를 그리드에 추가
//   });

//   // 영화 그리드에서 카드 클릭 시 모달을 표시하는 이벤트 (이벤트 위임 사용)
//   movieGrid.addEventListener("click", (event) => {
//     const movieCard = event.target.closest(".movie-card"); // 클릭된 요소가 영화 카드인지 확인
//     if (movieCard) {
//       const movieId = movieCard.dataset.movieId; // 저장된 movie.id를 가져옴
//       const movie = movies.find((m) => m.id === Number(movieId)); // 해당 movie.id로 영화 데이터 찾기

//       if (movie) {
//         // 모달에 영화 데이터 넣기
//         modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
//         modalTitle.textContent = movie.title;
//         modalOverview.textContent = movie.overview;
//         modalReleaseDate.textContent = movie.release_date;
//         modalVoteCount.textContent = movie.vote_average;

//         // 모달 보여주기
//         modal.style.display = "flex";

//         if (option === 1) {
//           // 홈페이지라면 북마크 버튼에 movie.id를 저장 (1)
//           bookmarkBtn.dataset.movieId = movie.id;
//         } else {
//           // 리스트페이지라면 북마크 취소 버튼에 movie.id를 저장 (2)
//           bookmarkCancelBtn.dataset.movieId = movie.id;
//         }
//       }
//     }
//   });

//   if (option === 1) {
//     // 북마크 기능 추가
//     addBookmark(bookmarkBtn, movies);
//   } else {
//     // 북마크 기능 제거
//     cancelBookmark(bookmarkCancelBtn, movies);
//   }

//   // 모달 닫기 버튼 클릭 시 모달 닫기
//   closeBtn.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // 외부 클릭 시 모달 닫기
//   window.addEventListener("click", (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   });
// }

// // addBookmark
// // 북마크 관련 기능을 처리하는 함수
// function addBookmark(bookmarkBtn, movies) {
//   // 북마크 버튼 이벤트 리스너
//   bookmarkBtn.addEventListener("click", () => {
//     const movieId = bookmarkBtn.dataset.movieId; // 북마크 버튼에 저장된 movie.id 가져오기
//     const movie = movies.find((m) => m.id === Number(movieId)); // 해당 영화 정보 찾기

//     if (movie) {
//       // LocalStorage에서 기존 북마크 목록을 불러옴
//       let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

//       // 해당 영화가 이미 북마크에 있는지 확인
//       const isBookmarked = bookmarks.some(
//         (bookmark) => bookmark.id === movie.id
//       );

//       if (!isBookmarked) {
//         // 북마크 목록에 추가
//         bookmarks.push({
//           id: movie.id,
//           title: movie.title,
//           overview: movie.overview,
//           poster_path: movie.poster_path,
//           release_date: movie.release_date,
//           vote_average: movie.vote_average,
//         });
//         localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//         alert(`${movie.title}이(가) 북마크에 추가되었습니다.`);
//       } else {
//         alert("이미 북마크에 추가된 영화입니다.");
//       }
//     }
//   });
// }

// // cancelBookmark
// // 북마크 취소 관련 기능을 처리하는 함수
// function cancelBookmark(bookmarkBtn, movies) {
//   // 북마크 취소 버튼 이벤트 리스너
//   bookmarkBtn.addEventListener("click", () => {
//     const movieId = bookmarkBtn.dataset.movieId; // 북마크 버튼에 저장된 movie.id 가져오기
//     const movie = movies.find((m) => m.id === Number(movieId)); // 해당 영화 정보 찾기

//     if (movie) {
//       // LocalStorage에서 기존 북마크 목록을 불러옴
//       let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

//       // 해당 영화가 북마크에 있는지 확인
//       const isBookmarked = bookmarks.some(
//         (bookmark) => bookmark.id === movie.id
//       );

//       if (isBookmarked) {
//         // 북마크 목록에서 해당 영화를 제거
//         bookmarks = bookmarks.filter((bookmark) => bookmark.id !== movie.id);
//         localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
//         alert(`${movie.title}이(가) 북마크에서 삭제되었습니다.`);
//       }

//       // 페이지 새로고침
//       location.reload();
//     }
//   });
// }
