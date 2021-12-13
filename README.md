# ra-diploma [![Build status](https://ci.appveyor.com/api/projects/status/1b28hq3o3hvg0mu9?svg=true)](https://ci.appveyor.com/project/barsich/ra-diploma)

## Ссылки
* [Demo](https://barsich.github.io/ra-diploma/)
* [Backend repo](https://github.com/barsich/ra-diploma-back)
* Server delay: 1-5 sec
* Server random error chance: ~20%

## Используемые ресурсы
* React
* React Router
* React Toolkit
* Redux
* Redux Thunk
* Redux LocalStorage Simple

## Особенности и изменения:
* У первого итема каталога (id 20) в тестовых целях недоступны все размеры и удалено свойство 'material'.
* У второго итема каталога (id 21) в тестовых целях доступны оба размера.
* Если категории каталога не загрузились, ошибка не выводится. Прелоадер также не отображается.
* Дополнен css для корректного отображения изображений итемов.
* Результатом поиска можно поделиться, например: [тык](https://barsich.github.io/ra-diploma/catalog.html/?q=белый&categoryId=14)
