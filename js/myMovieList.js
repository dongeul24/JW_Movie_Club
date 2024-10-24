import { makeCards } from "./cardsMaker.js";

document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector(".main"); // movieGrid 요소 정의
  const bookmarkedMovies = JSON.parse(localStorage.getItem("bookmarks")) || [];
  if (bookmarkedMovies.length === 0) {
    const message = document.createElement("div");
    message.classList.add("no-bookmarks-message");
    message.innerHTML =
      `저장된 영화가 없어요 ㅠㅠ. <br>홈페이지에서 흥미있는 영화를 검색하여 나의 영화 리스트에 담아보세요:)`;
    main.appendChild(message);
    return; // 더 이상 카드 생성하지 않음
  } else {
    makeCards(bookmarkedMovies, 2);
  }
});
