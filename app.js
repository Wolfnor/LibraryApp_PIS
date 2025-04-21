document.querySelectorAll('nav ul li a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const sectionId = link.getAttribute('href').substring(1);
    document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
  });
});

const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query)
  );

  currentPage = 1;
  booksToShow = filteredBooks;
  renderBooks();
  renderPagination();
});

document.addEventListener('DOMContentLoaded', () => {
  const bookContainer = document.getElementById('bookContainer');
  const paginationContainer = document.getElementById('pagination');
  const searchInput = document.getElementById('searchInput');

  const books = [
    {
      title: 'Я украл чужую жизнь',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/05/oblozhka-kniga-ya-ukral-chuzhuyu-zhizn-333x500.jpg',
    },
    {
      title: 'В этот день я познакомился с собой',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/05/oblozhka-knigi-v-etot-den-ya-poznakomilsya-s-soboj-333x500.jpg',
    },
    {
      title: 'Портрет Дориана Грея',
      author: 'Оскар Уайльд',
      image:
        'https://i1.mybook.io/p/512x852/book_covers/1f/f6/1ff6b336-43c6-4c00-a944-cecf9805f413.jpe?v2',
    },
    {
      title: 'Сцена после титров',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/05/oblozhka-knigi-stsena-posle-titrov-333x500.jpg',
    },
    {
      title: 'Пересадка на станции Вечность',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/05/oblozhka-knigi-peresadka-na-stantsii-vechnost-333x500.jpg',
    },
    {
      title: 'Второй шанс умереть',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/11/oblozhka-knigi-vtoroj-shans-umeret-354x500.jpg',
    },
    {
      title: 'Время никогда не ждёт',
      author: 'Роман Решетов',
      image:
        'https://knigli.ru/wp-content/uploads/2022/02/oblozhka-knigi-vremya-nikogda-ne-zhdyot-333x500.jpg',
    },
    {
      title: 'Наперегонки со счастьем',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/05/oblozhka-knigi-naperegonki-so-schastem-350x500.jpg',
    },
    {
      title: 'Скоро на экранах',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/05/oblozhka-knigi-skoro-na-ekranah-333x500.jpg',
    },
    {
      title: 'На небесах тебе нет места',
      author: 'Алексей Корнелюк',
      image:
        'https://knigli.ru/wp-content/uploads/2021/11/oblozhka-knigi-na-nebesah-tebe-net-mesta-333x500.jpg',
    },
    {
      title: 'Эффект Люцифера',
      author: 'Филип Зимбардо',
      image:
        'https://avatars.dzeninfra.ru/get-zen_doc/9707955/pub_643c1d2d4b3e193f739f37b5_643c3843b9ff2b009f4d90bd/scale_1200',
    },
    {
      title: 'Страх близости',
      author: 'Илсе Санд',
      image:
        'https://avatars.dzeninfra.ru/get-zen_doc/9707108/pub_643c1d2d4b3e193f739f37b5_643c3970b727dd713a7b1464/scale_1200',
    },
  ];

  const userCatalog = JSON.parse(localStorage.getItem('userCatalog')) || [];

  const saveToCatalog = (book) => {
    if (!userCatalog.some((item) => item.title === book.title)) {
      userCatalog.push(book);
      localStorage.setItem('userCatalog', JSON.stringify(userCatalog));
      alert('Книга добавлена в каталог!');
    } else {
      alert('Эта книга уже в вашем каталоге!');
    }
  };

  const booksPerPage = 6;
  let currentPage = 1;
  let filteredBooks = [...books];

  const renderBooks = () => {
    bookContainer.innerHTML = '';
    const start = (currentPage - 1) * booksPerPage;
    const end = start + booksPerPage;
    const booksToShow = filteredBooks.slice(start, end);

    booksToShow.forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.classList.add('book');
      bookDiv.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <h3>${book.title}</h3>
          <p>Автор: ${book.author}</p>
          <button class="add-to-catalog">Добавить в каталог</button>
        `;
      bookContainer.appendChild(bookDiv);
      const addButton = bookDiv.querySelector('.add-to-catalog');
      addButton.addEventListener('click', () => saveToCatalog(book));
    });
  };

  const renderPagination = () => {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement('button');
      button.textContent = i;
      button.classList.add('pagination-button');
      if (i === currentPage) button.classList.add('active');
      button.addEventListener('click', () => {
        currentPage = i;
        renderBooks();
        renderPagination();
      });
      paginationContainer.appendChild(button);
    }
  };

  searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
    );

    currentPage = 1;
    renderBooks();
    renderPagination();
  });

  renderBooks();
  renderPagination();
});