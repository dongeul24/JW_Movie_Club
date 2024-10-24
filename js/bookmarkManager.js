export function addBookmark(movies) {
  const bookmarkBtn = document.querySelector(".bookmark-btn");

  const bookmarkHandler = () => {
    const movieId = bookmarkBtn.dataset.movieId; //영화 아이디 가져오기
    const movie = movies.find((m) => m.id === Number(movieId)); //영화 아이디로 북마크에서 영화 찾아내기

    if (movie) {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      const isBookmarked = bookmarks.some(
        (bookmark) => bookmark.id === movie.id
      );

      if (!isBookmarked) {
        bookmarks.push({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        });
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        alert(`${movie.title}이(가) 북마크에 추가되었습니다.`);
      } else {
        alert("이미 북마크에 추가된 영화입니다.");
      }
    }
  };

  bookmarkBtn.addEventListener("click", bookmarkHandler);
}

export function cancelBookmark(movies) {
  const bookmarkCancelBtn = document.querySelector(".bookmark-cancel-btn");

  const cancelBookmarkHandler = () => {
    const movieId = bookmarkCancelBtn.dataset.movieId;
    const movie = movies.find((m) => m.id === Number(movieId));

    if (movie) {
      let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
      const isBookmarked = bookmarks.some(
        (bookmark) => bookmark.id === movie.id
      );

      if (isBookmarked) {
        bookmarks = bookmarks.filter((bookmark) => bookmark.id !== movie.id);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        alert(`${movie.title}이(가) 북마크에서 삭제되었습니다.`);
        location.reload(); // 페이지 새로고침
      }
    }
  };

  bookmarkCancelBtn.addEventListener("click", cancelBookmarkHandler);
}
