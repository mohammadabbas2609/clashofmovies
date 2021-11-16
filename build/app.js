const search1 = document.querySelector("#search1");
const search2 = document.querySelector("#search2");
const movie1 = document.querySelector("#movie1");
const movie2 = document.querySelector("#movie2");

const render = (data, id) => {
  const {
    Poster,
    Title,
    Director,
    Genre,
    imdbRating,
    imdbVotes,
    Plot,
    Response,
  } = data;
  let html = `
        <img src=${Poster} alt=${Title} class="card-img-top card-img" style="width:20%;" />
        <div className="card-body">
            <h5 className="card-title">${Title}</h5>
            <p className="card-text">Director: <small class="text-muted">${Director}</small></p>
            <p className="card-text">Genre: ${Genre}</p>
            <p className="card-text">Rating: ${imdbRating}</p>
            <p className="card-text">Votes: ${imdbVotes}</p>
            <p className="card-footer">Plot: ${Plot}</p>
        </div>

    `;

  if (Response === "True") {
    id.innerHTML = html;
  } else if (Response === "False") {
    id.innerHTML = `
        <h5 className="text-muted">${data.Error}</h5>
        `;
  }
};

// Debouncing on Search
const debounce = (fn, delay = 500) => {
  let stopExec;
  return (...args) => {
    if (stopExec) clearTimeout(stopExec);
    stopExec = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const findMovie = async event => {
  if (event.target.value) {
    loadingHTML = `<h5>Loading...</h5>`;
    event.target.id === "search1"
      ? (movie1.innerHTML = loadingHTML)
      : (movie2.innerHTML = loadingHTML);
    const response = await fetch("/findMovie", {
      method: "POST",
      body: event.target.value,
    });
    const data = await response.json();
    if (event.target.id === "search1") {
      render(data, movie1);
    } else if (event.target.id === "search2") {
      render(data, movie2);
    }
  }
};

search1.addEventListener("keyup", debounce(findMovie, 2000));
search2.addEventListener("keyup", debounce(findMovie, 2000));
