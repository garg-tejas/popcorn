$(document).ready(() => {
    $('#searchForm').on('input', (e) => {

        let searchText = $('#searchText').val();

        if (searchText == null) {
            console.log(true);
        }

        getMovies(searchText);
        e.preventDefault();
    })
})

function popularMovies() {
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=716444499a98ad5b0219d7a9f9dcda83&language=en-US&page=1')
        .then((response) => {
            console.log(response);

            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {

                if (movie.poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path;
                }

                let date = movie.release_date;

                let year = date.slice(0, 4);
                output += `
                    <div class="col-md-3 box">
                      <div class="movieBox">
                        <img src="${poster}" alt="poster" width="210" height="315" class="img">
                        <div class="browse-movie-bottom">
                            <a href="#" onclick="movieSelected('${movie.id}')" class="browse-movie-title">${movie.title}</a>
                            <div class="browse-movie-year">${year}</div>
                            <button type="submit" class="button" onclick="movieSelected('${movie.id}')">Movie Details</button>
                        </div>
                        </div>
                    </div>
            `
            });
            $('#movies').html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}


function getMovies(searchText) {

    axios.get('https://api.themoviedb.org/3/search/movie?api_key=716444499a98ad5b0219d7a9f9dcda83&query=' + searchText)
        .then((response) => {
            console.log(response);

            let movies = response.data.results;
            let output = '';
            let output1 = '';
            $.each(movies, (index, movie) => {

                if (movie.poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path;
                }

                let date = movie.release_date;

                let year = date.slice(0, 4);
                output += `
                        <div class="col-md-3 box">
                          <div class="movieBox">
                            <img src="${poster}" alt="poster" width="210" height="315" class="img">
                            <div class="browse-movie-bottom">
                                <a href="#" onclick="movieSelected('${movie.id}')" class="browse-movie-title">${movie.title}</a>
                                <div class="browse-movie-year">${year}</div>
                                <button type="submit" class="button" onclick="movieSelected1('${movie.id}')">Movie Details</button>
                            </div>
                            </div>
                        </div>
                `
            });
            $('#movies').html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('id', id);
    window.location = 'movie.php';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('id');
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=716444499a98ad5b0219d7a9f9dcda83`)
        .then((response) => {
            let movie = response.data;
            let poster;
            if (movie.poster_path === null) {
                poster = "../image/default-movie.png";
            } else {
                poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path;
            }

            let date = movie.release_date;
            let year = date.slice(0, 4);

            let revenue = movie.revenue / 1000000;
            let budget = movie.budget / 1000000;
            revenue = Math.round(revenue);
            budget = Math.round(budget);

            if (revenue === 0) {
                revenue = "Revenue is less than million dollars";
            }

            if (budget === 0) {
                budget = "Budget is less than million dollars";
            }

            let genre = movie.genres.map(genre => genre.name).join(' / ');

            let output1 = `
                <div class="row">
                    <div class="col-md-4 box1">
                        <img src="${poster}" class="poster-image">
                    </div>
                    <div class="col-md-4 box2">
                        <h1 class="movie-title">${movie.title}</h1>
                        <h5 style="color: white; font-weight:bold">${year}</h5>
                        <h5 style="color: white; font-weight:bold; margin-top: -10px;">${genre}</h5>
    
                        <ul class="list-group bg-dark">
                            <li class="list-group-item list-group-item-action list-group-item-dark detail">
                                <strong>Rating: </strong> ${movie.vote_average.toFixed(1)} / 10</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark detail">
                                <strong>Status: </strong> ${movie.status}</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark detail">
                                <strong>Duration: </strong> ${movie.runtime} min</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark detail">
                                <strong>Budget: </strong> $ ${budget} million</li>
                            <li class="list-group-item list-group-item-action list-group-item-dark detail">
                                <strong>Revenue: </strong> $ ${revenue} million</li>
                        </ul>
                    </div>
                    <div class="col-md-4 box3">
                        <h1 class="title-second">Synopsis</h1>
                        <p>${movie.overview}</p>
                        <hr style="width: 80%;color: #222;">
                        <div>
                            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn-one">View IMDB</a>
                            <a href="browse.php" class="btn-second">Go Back To Search</a>
                        </div>
                    </div>
                </div>
            `;
            $('#movie').html(output1);
            similiarMovie(movieId);
        })
        .catch((error) => {
            console.log(error);
        });
}

function similiarMovie(movieId) {
    axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=716444499a98ad5b0219d7a9f9dcda83`)
        .then((response) => {
            console.log(response);
            let movies = response.data.results;
            let output = '';
            $.each(movies, (index, movie) => {
                let poster;
                if (movie.poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path;
                }

                let date = movie.release_date;
                let year = date ? date.slice(0, 4) : '';
                output += `
                    <div class="col-md-3 box">
                      <div class="movieBox">
                        <img src="${poster}" alt="poster" width="210" height="315" class="img">
                        <div class="browse-movie-bottom">
                            <a href="#" onclick="movieSelected('${movie.id}')" class="browse-movie-title">${movie.title}</a>
                            <div class="browse-movie-year">${year}</div>
                            <button type="submit" class="button" onclick="movieSelected('${movie.id}')">Movie Details</button>
                        </div>
                        </div>
                    </div>
                `;
            });
            $('#similiar').html(output);
        })
        .catch((error) => {
            console.log(error);
        });
}


function getTopMovies() {
    axios.get('https://api.themoviedb.org/3/movie/top_rated?api_key=716444499a98ad5b0219d7a9f9dcda83&language=en-US&page=1')
        .then((response) => {
            console.log(response);

            let movies = response.data.results;
            // console.log(movies);
            
            let output = '';

            for (let index = 0; index < 4; index++) {
                if (movies[index].poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movies[index].poster_path;
                }

                let date = movies[index].release_date;

                let year = date.slice(0, 4);
                output += `
                        <div class="col-md-3 box">
                          <div class="movieBox">
                            <img src="${poster}" alt="poster" width="210" height="315" class="img">
                            <div class="browse-movie-bottom">
                                <a href="#" onclick="movieSelected('${movies[index].id}')" class="browse-movie-title">${movies[index].title}</a>
                                <div class="browse-movie-year">${year}</div>
                                <button type="submit" class="button" onclick="movieSelected('${movies[index].id}')">Movie Details</button>
                            </div>
                            </div>
                        </div>
                `;
            }
            $('#topMovies1').html(output);


            let output1 = '';
            for (let index = 4; index < 8; index++) {
                if (movies[index].poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movies[index].poster_path;
                }

                let date = movies[index].release_date;

                let year = date.slice(0, 4);
                output1 += `
                        <div class="col-md-3 box">
                          <div class="movieBox">
                            <img src="${poster}" alt="poster" width="210" height="315" class="img">
                            <div class="browse-movie-bottom">
                                <a href="#" onclick="movieSelected('${movies[index].id}')" class="browse-movie-title">${movies[index].title}</a>
                                <div class="browse-movie-year">${year}</div>
                                <button type="submit" class="button" onclick="movieSelected('${movies[index].id}')">Movie Details</button>
                            </div>
                            </div>
                        </div>
                `;
            }
            $('#topMovies2').html(output1);


            let output2 = '';
            for (let index = 8; index < 12; index++) {
                if (movies[index].poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movies[index].poster_path;
                }

                let date = movies[index].release_date;

                let year = date.slice(0, 4);
                output2 += `
                        <div class="col-md-3 box">
                          <div class="movieBox">
                            <img src="${poster}" alt="poster" width="210" height="315" class="img">
                            <div class="browse-movie-bottom">
                                <a href="#" onclick="movieSelected('${movies[index].id}')" class="browse-movie-title">${movies[index].title}</a>
                                <div class="browse-movie-year">${year}</div>
                                <button type="submit" class="button" onclick="movieSelected('${movies[index].id}')">Movie Details</button>
                            </div>
                            </div>
                        </div>
                `;
            }
            $('#topMovies3').html(output2);



            let output3 = '';
            for (let index = 12; index < 16; index++) {
                if (movies[index].poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movies[index].poster_path;
                }

                let date = movies[index].release_date;

                let year = date.slice(0, 4);
                output3 += `
                        <div class="col-md-3 box">
                          <div class="movieBox">
                            <img src="${poster}" alt="poster" width="210" height="315" class="img">
                            <div class="browse-movie-bottom">
                                <a href="#" onclick="movieSelected('${movies[index].id}')" class="browse-movie-title">${movies[index].title}</a>
                                <div class="browse-movie-year">${year}</div>
                                <button type="submit" class="button" onclick="movieSelected('${movies[index].id}')">Movie Details</button>
                            </div>
                            </div>
                        </div>
                `;
            }
            $('#topMovies4').html(output3);


            let output4 = '';
            for (let index = 16; index < 20; index++) {
                if (movies[index].poster_path === null) {
                    poster = "../image/default-movie.png";
                } else {
                    poster = "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movies[index].poster_path;
                }

                let date = movies[index].release_date;

                let year = date.slice(0, 4);
                output4 += `
                        <div class="col-md-3 box">
                          <div class="movieBox">
                            <img src="${poster}" alt="poster" width="210" height="315" class="img">
                            <div class="browse-movie-bottom">
                                <a href="#" onclick="movieSelected('${movies[index].id}')" class="browse-movie-title">${movies[index].title}</a>
                                <div class="browse-movie-year">${year}</div>
                                <button type="submit" class="button" onclick="movieSelected('${movies[index].id}')">Movie Details</button>
                            </div>
                            </div>
                        </div>
                `;
            }
            $('#topMovies5').html(output4);
        })
        .catch((error) => {
            console.log(error);
        });
}


function fetchMoviesByGenres(genreIds) {
    const apiKey = '716444499a98ad5b0219d7a9f9dcda83';
    const baseUrl = 'https://api.themoviedb.org/3/discover/movie';
    const genreIdsArray = genreIds.split(',');

    genreIdsArray.forEach(genreId => {
        const apiUrl = `${baseUrl}?api_key=${apiKey}&with_genres=${genreId}`;

        axios.get(apiUrl)
            .then(response => {
                let movies = response.data.results;
                let output = '';
                $.each(movies, (index, movie) => {
                    let poster = movie.poster_path ? "https://image.tmdb.org/t/p/w185_and_h278_bestv2" + movie.poster_path : "../image/default-movie.png";
                    let year = movie.release_date ? movie.release_date.slice(0, 4) : '';
                    output += `
                        <div class="col-md-3 box">
                            <div class="movieBox">
                                <img src="${poster}" alt="poster" width="210" height="315" class="img">
                                <div class="browse-movie-bottom">
                                    <a href="#" onclick="movieSelected('${movie.id}')" class="browse-movie-title">${movie.title}</a>
                                    <div class="browse-movie-year">${year}</div>
                                    <button type="submit" class="button" onclick="movieSelected('${movie.id}')">Movie Details</button>
                                </div>
                            </div>
                        </div>`;
                });
                $('#genre').html(output);
            })
            .catch(error => {
                console.error(`Error fetching movies for genre ID ${genreId}:`, error);
            });
    });
}