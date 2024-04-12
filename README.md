# Таблица клиентов 

Vue Приложение, выводящее таблицу клиентов, позволяющее добавлять, редактировать и удалять клиентов

## Демо проекта

https://it-lab-valvalov22.netlify.app/

## Используемый стек

+ Vue3
+ Typescript
+ Pinia & localStorage
+ Vite

## Функционал проекта

Основным функционалом является возможность добавления, изменения, удаления клиентов и фильтрации по:

+ Поиску
+ По присутствию/отсустствию

При нажатии на ФИО клиента всплывает попап форма с изменением данных этого клиента, при клике на кнопку добавить открывается попап с формой создания клиента

Дополнительный функционал:

+ Реализована пагинация, 6 клиентов на страницу, если добавляется больше то появляется пагинация, полностью работает с фильтрами и поиском
+ Добавлена возможность удаления клиентов (удаляются также из localStorage)
+ Добавлена иконка с крестиком в инпуте, чтобы очищать поле поиска при нажатии на него
+ Реализован Custom Select
+ Немного отошел от макета, сделал это в виде мини приложения


## Клонирование репозитория

```bash
git clone https://github.com/valvalov22/it-lab-test.git
# Клонирование репозитория
npm install
# Установка зависимостей
npm run dev
# Запуск сервера в режиме разработки
```

## Структура проекта

+ components
  + ClientForm Форма для создания/редактирования клиента
  + CustomSelect Кастомный селект
  + DataTable Таблица с клиентами
  + Filters Компонент фильтрации, содержит фильтрацию по присутствию
  + Header Header таблицы, содержит поле поиска
  + Pagination Компонент пагинации
  + types Вынесены часто используемые типы
+ store
  + index.ts Главный pinia store, отвечающий за действия с клиентом

