<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up</title>
  <link rel="stylesheet" href="css/signup-style.css" />
</head>

<body>
  <div class="container">
    <form action="systuum/register.php" method="post" class="signup-form">
      <h1>Sign Up</h1>
      <div class="form-group">
        <input type="text" name="name" id="name" placeholder="Name" required />
      </div>
      <div class="form-group">
        <input type="text" name="username" id="username" placeholder="Username" required />
      </div>
      <div class="form-group">
        <input type="email" name="email" id="email" placeholder="Email" required />
      </div>
      <div class="form-group">
        <input type="password" name="password" id="password" placeholder="Password" required />
      </div>
      <div class="form-group">
        <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm Password" required />
      </div>
      <div class="genre-buttons">
        <button type="button" class="genre-button" name="genres[]" value="28" data-genre="28">Action</button>
        <button class="genre-button" type="button" name="genres[]" value="12" data-genre="12">Adventure</button>
        <button class="genre-button" type="button" name="genres[]" value="35" data-genre="35">Comedy</button>
        <button class="genre-button" type="button" name="genres[]" value="18" data-genre="18">Drama</button>
        <button class="genre-button" type="button" name="genres[]" value="14" data-genre="14">Fantasy</button>
        <button class="genre-button" type="button" name="genres[]" value="36" data-genre="36">Historical</button>
        <button class="genre-button" type="button" name="genres[]" value="27" data-genre="27">Horror</button>
        <button class="genre-button" type="button" name="genres[]" value="10402" data-genre="10402">Musical</button>
        <button class="genre-button" type="button" name="genres[]" value="9648" data-genre="9648">Mystery</button>
        <button class="genre-button" type="button" name="genres[]" value="10749" data-genre="10749">Romance</button>
        <button class="genre-button" type="button" name="genres[]" value="878" data-genre="878">Sci-Fi</button>
        <button class="genre-button" type="button" name="genres[]" value="53" data-genre="53">Thriller</button>
      </div>
      <input type="hidden" name="genres_string" id="genres_string" value="" />
      <button type="button" id="submit-btn">Register</button>
      <br>
      <a href="login.php">Already Have a Account</a>
    </form>
  </div>

  <script>
    const genreButtons = document.querySelectorAll('.genre-button');
    const genresInput = document.querySelector('#genres_string');
    const submitBtn = document.querySelector('#submit-btn');

    genreButtons.forEach(button => {
      button.addEventListener('click', () => {
        const genre = button.dataset.genre;
        const currentGenres = genresInput.value.split(',');

        if (!currentGenres.includes(genre)) {
          currentGenres.push(genre);
          genresInput.value = currentGenres.join(',');
        }

        button.classList.toggle('selected');
      });
    });

    submitBtn.addEventListener('click', () => {
      event.preventDefault();

      const selectedGenres = genresInput.value.split(',').filter(Boolean);
      if (selectedGenres.length === 0) {
        alert('Please select at least one genre.');
        return;
      }
      const formData = new FormData(document.querySelector('.signup-form'));
      selectedGenres.forEach(genreId => {
        formData.append('genres[]', genreId);
      });
      fetch('systuum/register.php', {
          method: 'POST',
          body: formData
        })
        .then(response => {
          if (response.ok) {
            window.location.href = `../user/index.php`;

          } else {
            throw new Error('Failed to register.');
          }
        })
        .catch(error => {
          console.error('Registration error:', error);

        });
    });
  </script>
</body>

</html>