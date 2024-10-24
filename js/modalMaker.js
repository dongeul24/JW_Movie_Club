// modalManager.js
export function openModal(movie, option) {
  const modal = document.querySelector(".modal");
  const modalPoster = document.querySelector(".modal-poster");
  const modalTitle = document.querySelector(".modal-title");
  const modalOverview = document.querySelector(".modal-overview");
  const modalReleaseDate = document.querySelector(".modal-release-date");
  const modalVoteCount = document.querySelector(".modal-vote-average");
  const bookmarkBtn = document.querySelector(".bookmark-btn");
  const bookmarkCancelBtn = document.querySelector(".bookmark-cancel-btn");

  modalPoster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  modalTitle.textContent = movie.title;
  modalOverview.textContent = movie.overview;
  modalReleaseDate.textContent = movie.release_date;
  modalVoteCount.textContent = movie.vote_average;

  modal.style.display = "flex";

  if (option === 1) {
    bookmarkBtn.dataset.movieId = movie.id;
  } else {
    bookmarkCancelBtn.dataset.movieId = movie.id;
  }

  closeModal();
}

function closeModal() {
  const modal = document.querySelector(".modal");
  const closeBtn = document.querySelector(".close");

  function outsideClickHandler(event) {}

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}
