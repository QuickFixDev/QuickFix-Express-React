-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 27-10-2023 a las 19:36:22
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `quickfix`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `complain_categories`
--

CREATE TABLE `complain_categories` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(255) NOT NULL,
  `category_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `complain_categories`
--

INSERT INTO `complain_categories` (`category_id`, `category_name`, `category_description`) VALUES
(1, 'Water Supply', 'Lack of water supply in the residence.'),
(2, 'Electrical Failures', 'Persistent electrical failures in the residence\'s wiring.'),
(3, 'Heating System', 'Malfunction in the residence\'s heating system.'),
(4, 'Cooling system', 'Inadequate cooling system in the residence.'),
(5, 'Garbage Collection', 'Missed garbage collection in the residence.'),
(6, 'Roof Leakage', 'Leakage issues in the residence\'s roof.'),
(7, 'Infestation', 'Pest infestation problem in the residence.'),
(8, 'Plumbing', 'related to plumbing systems, including issues with pipes, drains, faucets, toilets, and other water-related fixtures.'),
(9, 'Maintenance', 'Related with repairing services'),
(10, 'Noise', 'Excessive noice caused by neighboors'),
(11, 'Security', 'No description provided'),
(12, 'Parking', 'No description provided');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'resident',
  `street_name` varchar(255) NOT NULL,
  `house_number` int(11) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `role`, `street_name`, `house_number`, `phone_number`, `email`) VALUES
(1, 'Juan', 'Hernandez', 'resident', 'Palma mexicana', 406, '4491882083', 'quickfix.dev1@gmail.com'),
(2, 'Test123456789', 'User', 'resident', 'No street', 0, '1234567890', 'test@test.com'),
(5, 'admin', 'example', 'resident', 'street', 123, '123', 'muudev0@gmail.com'),
(6, 'juan', 'hernandez', 'resident', 'street', 123, '123', 'usuario@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_complaints`
--

CREATE TABLE `user_complaints` (
  `complaint_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `complaint_title` varchar(255) NOT NULL,
  `complaint_description` text NOT NULL,
  `complaint_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('Open','In Progress','Closed') DEFAULT 'Open',
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_complaints`
--

INSERT INTO `user_complaints` (`complaint_id`, `user_id`, `complaint_title`, `complaint_description`, `complaint_date`, `status`, `category_id`) VALUES
(2, 1, 'Cleaning Request', 'The common areas in the building need to be cleaned more frequently', '2023-10-07 23:23:27', 'Open', 5),
(3, 1, 'Water Supply Issue', 'There is a lack of water supply in my residence, and it has been ongoing for the past two days. We need an urgent solution to this problem.', '2023-10-08 00:50:09', 'Open', 1),
(4, 1, 'Water supply issue', 'Residents in Apartment 304 have been experiencing low water pressure in their kitchen faucet for the past week. This issue affects their ability to perform daily tasks like washing dishes and cooking', '2023-10-08 09:58:22', 'In Progress', 1),
(5, 1, 'Broken Window', 'One of the windows in my bedroom is broken, and it needs to be repaired to prevent rainwater from coming in.', '2023-10-08 12:07:15', 'Closed', 9),
(6, 2, 'Loud Music Next Door', 'The neighbors are playing loud music late at night, making it impossible to sleep.', '2023-10-08 12:08:47', 'In Progress', 10),
(7, 2, 'Broken lock', 'The front door lock is broken, and it poses a security risk to the residents. It needs immediate repair.', '2023-10-08 12:09:31', 'Open', 9),
(8, 1, 'Ant Infestation', 'There\'s a severe infestation of ants in the kitchen. We need pest control services to address this issue.', '2023-10-08 12:11:13', 'Closed', 7),
(9, 1, 'Air Conditioner Not Cooling', 'The air conditioner in the living room is not cooling properly, and it\'s uncomfortable during hot weather.', '2023-10-08 12:11:49', 'Closed', 4),
(10, 1, 'Unauthorized Parking', 'Several cars are parked in the resident-only parking area without permits. It\'s causing inconvenience to residents.', '2023-10-08 12:12:44', 'Closed', 12);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `complain_categories`
--
ALTER TABLE `complain_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- Indices de la tabla `user_complaints`
--
ALTER TABLE `user_complaints`
  ADD PRIMARY KEY (`complaint_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `complain_categories`
--
ALTER TABLE `complain_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `user_complaints`
--
ALTER TABLE `user_complaints`
  MODIFY `complaint_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user_complaints`
--
ALTER TABLE `user_complaints`
  ADD CONSTRAINT `user_complaints_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `user_complaints_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `complain_categories` (`category_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
