// 영화가 한페이지에 20개씩만 전달하는데
// 시간이 남으면 사용자가 더보기를 누르거나 스크롤을 특정 위치에서 더 내릴 수록 page count 수를 늘려
// 보여지는 영화 수를 늘릴 예정

export async function fetchMovieData() {
  console.log("fetchMovieData 함수 실행됨.");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYjkzYjQ5M2RiZWM1YWI4OWU5N2JlZTcwOTQzMWNlOSIsIm5iZiI6MTcyOTY1MjYyOS4xNzI3Miwic3ViIjoiNjcxN2MwZDc2ZmIwOWUzOTRjMDJhZWE3Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ha2blZlC_WLSbI5sKb8jGGwIO1U-DUjdPx6CCU-3rQw",
    },
  };

  try {
    console.log("try 구문 실행됨");
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=1&sort_by=popularity.desc&with_watch_providers=providers%3A8",
      options
    );
    if (!response.ok) {
      throw new Error("네트워크 응답 좋지 않음.");
    }
    const movieData = await response.json();
    console.log(movieData.results);
    // 가져온 데이터가 null이 아니면, 가져온 데이터 반환.(result 내에서 필요한 정보: id, title, overview, release_date, poster_path, vote_count)
    return movieData.results;
  } catch (err) {
    console.error(err);
  }
}
