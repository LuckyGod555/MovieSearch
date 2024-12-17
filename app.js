const form = document.getElementById('searchForm');
const movieInfo = document.getElementById('movieInfo');
const introText = document.getElementById('IntroText');  // Элемент с текстом "Search for a Movie"
const searchLanguage = document.getElementById('language');  // Элемент выбора языка
const movieTitleInput = document.getElementById('movieTitle');  // Поле ввода названия фильма
const movieTitleLabel = document.getElementById('movieTitleLabel');  // Метка для поля ввода названия фильма
const languageLabel = document.getElementById('languageLabel');  // Метка для выбора языка

// API key (получите свой API ключ с сайта OMDB)
const apiKey = '10fbd16d'; // Ваш ключ API

// Обработчик отправки формы
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const movieTitle = movieTitleInput.value;
    
    // Проверка, чтобы название не было пустым
    if (!movieTitle) {
        alert('Please enter a movie title');
        return;
    }

    // Очистка предыдущих результатов
    movieInfo.innerHTML = '<p>Loading...</p>';
    movieInfo.classList.remove('animate__fadeInUp');  // Убираем предыдущую анимацию

    // Плавное исчезновение заголовка, меток и поля ввода
    introText.classList.add('hidden');
    movieTitleLabel.classList.add('hidden');  // Скрываем метку "Movie Title:"
    languageLabel.classList.add('hidden');  // Скрываем метку "Language:"
    searchLanguage.classList.add('hidden');  // Скрываем выпадающий список языка
    

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Response === 'True') {
            // Если фильм найден
            movieInfo.innerHTML = `
                <h2>${data.Title} (${data.Year})</h2>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <img src="${data.Poster}" alt="${data.Title} Poster">
            `;

            // Добавляем классы анимации из Animate.css
            movieInfo.classList.add('animate__animated', 'animate__fadeInUp');
            movieInfo.classList.add('show');
        } else {
            // Если фильм не найден
            movieInfo.innerHTML = `<p>Movie not found!</p>`;
        }
    } catch (error) {
        // Обработка ошибок
        movieInfo.innerHTML = `<p>Error fetching movie data. Please try again later.</p>`;
    }
});
