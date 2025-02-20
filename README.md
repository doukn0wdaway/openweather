## Тестове завдання для React Dev

### Задача

Реалізувати SPA, яке показує погоду в обраних містах.

### Технічне завдання

- [x] Необхідно вивести список міст "картками". Картка повинна містити наступний функціонал:
  - [x] Коротка інформація про погоду у місті
  - [ ] При натисканні на картку вивести детальну інформацію/перехід на сторінку з детальною інформацією
  - [x] На кожній картці міста має бути кнопка: оновити дані про погоду зараз. При її натисканні має відбуватися оновлення погоди даного міста
  - [x] Має бути можливість додавати/видаляти міста. При додаванні нового міста відбувається запит на отримання поточної погоди та виведення його на екран.
- [x] Дані зберігати локально в LocalStorage:
  - [x] При перезавантаженні сторінки повинен зберігатися список міст, які раніше були виведені користувачем, а дані про погоду повинні бути оновлені.

### Буде плюсом

- [ ] На сторінці з детальним поданням реалізувати положення блоку з температурою на основі величини значення у вигляді графіку. Для цього робити додатковий запит на отримання погодинного прогнозу на поточний день.

### Вимоги

- [x] Застосувати **Weather API**: [https://openweathermap.org/](https://openweathermap.org/)
- [x] Застосувати **React**, **Typescript**, **Redux + Redux-Thunk** (Рекомендується використовувати **Redux Toolkit**), **React-router**
- [ ] Застосувати препроцесор CSS. Зробити мобільну версію. Рекомендується використовувати **SCSS**. Для прискорення роботи можна використати UI бібліотеки на кшталт **Material UI**
- [x] Код повинен бути чистим, зі збереженням форматування. Рекомендується використання **ESLint/Prettier**
- [ ] Покрити тестами основні компоненти за допомогою **Jest** + (**react-testing-library/enzyme**)
- [x] Написання компонентів у функціональному стилі із застосуванням хуків
