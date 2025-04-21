document
  .getElementById('registerForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Регистрация успешна!');
    this.reset();
  });

document
  .getElementById('loginForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Вход выполнен!');
    this.reset();
  });