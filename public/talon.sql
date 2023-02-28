-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Фев 28 2023 г., 18:55
-- Версия сервера: 8.0.24
-- Версия PHP: 8.0.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `talon`
--

-- --------------------------------------------------------

--
-- Структура таблицы `benefits`
--

CREATE TABLE `benefits` (
  `id_benefits` int NOT NULL,
  `name_ben` varchar(25) DEFAULT NULL,
  `first_time` time NOT NULL,
  `last_time` time NOT NULL,
  `cost` decimal(10,0) NOT NULL,
  `data_begin` datetime NOT NULL,
  `data_end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `benefits`
--

INSERT INTO `benefits` (`id_benefits`, `name_ben`, `first_time`, `last_time`, `cost`, `data_begin`, `data_end`) VALUES
(1, 'Первый BENEFITS', '21:09:43', '21:09:43', '300', '2023-01-15 21:09:43', '2023-01-15 21:09:43'),
(2, 'Второй BENEFITS', '08:00:00', '12:00:00', '100', '2023-01-15 21:09:43', '2024-01-15 21:09:43'),
(3, 'Третий BENEFITS', '18:08:48', '18:08:48', '600', '2023-01-19 18:08:48', '2023-01-19 18:08:48'),
(4, 'Четвертый BENEFITS', '18:08:48', '18:08:48', '103', '2023-01-19 18:08:48', '2023-01-19 18:08:48'),
(5, 'Пятый BENEFITS', '15:00:00', '16:00:00', '500', '2023-01-01 00:00:00', '2024-01-01 00:00:00'),
(10, 'Шестой BENEFITS', '15:00:00', '16:00:00', '850', '2023-01-01 00:00:00', '2024-01-01 00:00:00'),
(11, 'Седьмой BENEFITS', '15:00:00', '16:00:00', '800', '2023-01-19 18:08:48', '2024-01-19 18:08:48'),
(12, 'Восьмой BENEFITS', '08:00:00', '12:00:00', '150', '2023-01-01 00:00:00', '2024-01-01 00:00:00'),
(13, 'Девятый BENEFITS', '15:00:00', '16:00:00', '300', '2023-01-01 00:00:00', '2024-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `category`
--

CREATE TABLE `category` (
  `id_category` int NOT NULL,
  `name_cat` varchar(25) DEFAULT NULL,
  `rank_category` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `category`
--

INSERT INTO `category` (`id_category`, `name_cat`, `rank_category`) VALUES
(1, 'Первая категория', 1),
(2, 'Вторая категория', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `category_benefits`
--

CREATE TABLE `category_benefits` (
  `id_category` int NOT NULL,
  `id_benefits` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `category_benefits`
--

INSERT INTO `category_benefits` (`id_category`, `id_benefits`) VALUES
(1, 1),
(2, 1),
(1, 2),
(2, 2),
(2, 4),
(1, 10),
(2, 13);

-- --------------------------------------------------------

--
-- Структура таблицы `students`
--

CREATE TABLE `students` (
  `id_student` int NOT NULL,
  `firstName` varchar(25) NOT NULL,
  `middleName` varchar(25) NOT NULL,
  `lastName` varchar(25) NOT NULL,
  `id_group` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `students`
--

INSERT INTO `students` (`id_student`, `firstName`, `middleName`, `lastName`, `id_group`) VALUES
(11, 'Михаил', 'Садиков', 'Владиславович', 3),
(95, 'Николай', 'Каручев', 'Иванович', 1),
(100, 'Роман', 'Северов', 'Павлович', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `students_category`
--

CREATE TABLE `students_category` (
  `id_student` int NOT NULL,
  `id_category` int NOT NULL,
  `data_begin` datetime NOT NULL,
  `data_end` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `students_category`
--

INSERT INTO `students_category` (`id_student`, `id_category`, `data_begin`, `data_end`) VALUES
(100, 1, '2023-01-01 00:00:00', '2025-01-01 00:00:00'),
(100, 2, '2023-01-01 00:00:00', '2024-01-01 00:00:00');

-- --------------------------------------------------------

--
-- Структура таблицы `study_groups`
--

CREATE TABLE `study_groups` (
  `id_group` int NOT NULL,
  `name_group` varchar(255) NOT NULL,
  `description_group` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `study_groups`
--

INSERT INTO `study_groups` (`id_group`, `name_group`, `description_group`) VALUES
(1, '497Б', 'Информационные системы и программирование'),
(3, '497В', 'Информационные системы и программирование');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int NOT NULL,
  `username` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `username`, `password`, `role`) VALUES
(1, 'Roman Severov', '1234', 'ADMIN'),
(3, 'Romchick787898', '$2a$10$UZTS6kqlk0kKzobqNAmzGutAzQ2rC8/Ojdx3LAyhqjWqqtcqu2xGm', 'ADMIN');

-- --------------------------------------------------------

--
-- Структура таблицы `use_benefits`
--

CREATE TABLE `use_benefits` (
  `id_student` int NOT NULL,
  `id_category` int NOT NULL,
  `id_benefits` int NOT NULL,
  `date_use` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `benefits`
--
ALTER TABLE `benefits`
  ADD PRIMARY KEY (`id_benefits`),
  ADD UNIQUE KEY `name_ben` (`name_ben`);

--
-- Индексы таблицы `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id_category`),
  ADD UNIQUE KEY `id_category` (`id_category`),
  ADD UNIQUE KEY `rank` (`rank_category`),
  ADD UNIQUE KEY `name_cat` (`name_cat`);

--
-- Индексы таблицы `category_benefits`
--
ALTER TABLE `category_benefits`
  ADD PRIMARY KEY (`id_category`,`id_benefits`),
  ADD KEY `Category_benefits_fk1` (`id_benefits`);

--
-- Индексы таблицы `students`
--
ALTER TABLE `students`
  ADD UNIQUE KEY `id_student` (`id_student`),
  ADD KEY `id_group` (`id_group`);

--
-- Индексы таблицы `students_category`
--
ALTER TABLE `students_category`
  ADD PRIMARY KEY (`id_student`,`id_category`,`data_begin`,`data_end`),
  ADD KEY `Students_category_fk1` (`id_category`);

--
-- Индексы таблицы `study_groups`
--
ALTER TABLE `study_groups`
  ADD PRIMARY KEY (`id_group`),
  ADD UNIQUE KEY `name_group` (`name_group`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Индексы таблицы `use_benefits`
--
ALTER TABLE `use_benefits`
  ADD PRIMARY KEY (`id_student`,`id_category`,`id_benefits`,`date_use`),
  ADD KEY `Use_benefits_fk1` (`id_category`),
  ADD KEY `Use_benefits_fk2` (`id_benefits`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `benefits`
--
ALTER TABLE `benefits`
  MODIFY `id_benefits` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `category`
--
ALTER TABLE `category`
  MODIFY `id_category` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `study_groups`
--
ALTER TABLE `study_groups`
  MODIFY `id_group` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `category_benefits`
--
ALTER TABLE `category_benefits`
  ADD CONSTRAINT `Category_benefits_fk0` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`),
  ADD CONSTRAINT `Category_benefits_fk1` FOREIGN KEY (`id_benefits`) REFERENCES `benefits` (`id_benefits`);

--
-- Ограничения внешнего ключа таблицы `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`id_group`) REFERENCES `study_groups` (`id_group`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Ограничения внешнего ключа таблицы `students_category`
--
ALTER TABLE `students_category`
  ADD CONSTRAINT `Students_category_fk0` FOREIGN KEY (`id_student`) REFERENCES `students` (`id_student`),
  ADD CONSTRAINT `Students_category_fk1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id_category`);

--
-- Ограничения внешнего ключа таблицы `use_benefits`
--
ALTER TABLE `use_benefits`
  ADD CONSTRAINT `Use_benefits_fk0` FOREIGN KEY (`id_student`) REFERENCES `students` (`id_student`),
  ADD CONSTRAINT `Use_benefits_fk1` FOREIGN KEY (`id_category`) REFERENCES `category_benefits` (`id_category`),
  ADD CONSTRAINT `Use_benefits_fk2` FOREIGN KEY (`id_benefits`) REFERENCES `category_benefits` (`id_benefits`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
