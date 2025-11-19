-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-11-2025 a las 00:12:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `keralty`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--

CREATE TABLE `paciente` (
  `id_paciente` int(5) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente`
--

INSERT INTO `paciente` (`id_paciente`, `nombre`) VALUES
(1, 'Carlos Carvajal'),
(2, 'Marta Mejia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente_informacion`
--

CREATE TABLE `paciente_informacion` (
  `paciente_id` int(5) NOT NULL,
  `tipo_informacion_id` int(5) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL,
  `estado` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paciente_informacion`
--

INSERT INTO `paciente_informacion` (`paciente_id`, `tipo_informacion_id`, `fecha`, `hora`, `estado`) VALUES
(1, 1, NULL, NULL, 0),
(1, 2, NULL, NULL, 0),
(1, 3, NULL, NULL, 0),
(1, 4, NULL, NULL, 0),
(2, 1, NULL, NULL, 0),
(2, 2, NULL, NULL, 0),
(2, 3, NULL, NULL, 0),
(2, 4, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_informacion`
--

CREATE TABLE `tipo_informacion` (
  `id_tipo_informacion` int(5) NOT NULL,
  `tipo_informacion` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_informacion`
--

INSERT INTO `tipo_informacion` (`id_tipo_informacion`, `tipo_informacion`) VALUES
(1, 'Documentos Entregados'),
(2, 'Paz y Salvo'),
(3, 'Llevado a sala/Alta a domicili'),
(4, 'Habitacion Disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ultima_actualizacion`
--

CREATE TABLE `ultima_actualizacion` (
  `id_ultima_actualizacion` int(5) NOT NULL,
  `fecha` date DEFAULT NULL,
  `hora` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `ultima_actualizacion`
--

INSERT INTO `ultima_actualizacion` (`id_ultima_actualizacion`, `fecha`, `hora`) VALUES
(1, '2025-11-19', '18:03:44');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD PRIMARY KEY (`id_paciente`);

--
-- Indices de la tabla `paciente_informacion`
--
ALTER TABLE `paciente_informacion`
  ADD PRIMARY KEY (`paciente_id`,`tipo_informacion_id`),
  ADD KEY `tipo_informacion_id` (`tipo_informacion_id`);

--
-- Indices de la tabla `tipo_informacion`
--
ALTER TABLE `tipo_informacion`
  ADD PRIMARY KEY (`id_tipo_informacion`);

--
-- Indices de la tabla `ultima_actualizacion`
--
ALTER TABLE `ultima_actualizacion`
  ADD PRIMARY KEY (`id_ultima_actualizacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `paciente`
--
ALTER TABLE `paciente`
  MODIFY `id_paciente` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `tipo_informacion`
--
ALTER TABLE `tipo_informacion`
  MODIFY `id_tipo_informacion` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ultima_actualizacion`
--
ALTER TABLE `ultima_actualizacion`
  MODIFY `id_ultima_actualizacion` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `paciente_informacion`
--
ALTER TABLE `paciente_informacion`
  ADD CONSTRAINT `paciente_informacion_ibfk_1` FOREIGN KEY (`paciente_id`) REFERENCES `paciente` (`id_paciente`),
  ADD CONSTRAINT `paciente_informacion_ibfk_2` FOREIGN KEY (`tipo_informacion_id`) REFERENCES `tipo_informacion` (`id_tipo_informacion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
