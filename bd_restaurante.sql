-- Crear la base de datos
CREATE DATABASE bd_restaurante;

-- Seleccionar la base de datos
USE bd_restaurante;

-- Tabla de usuarios para los distintos roles
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_user VARCHAR(255),
    contrasena VARCHAR(60),
    trabajo VARCHAR(50)
);

-- Tabla de salas para diferenciar mesas
CREATE TABLE salas (
    id_sala INT PRIMARY KEY AUTO_INCREMENT,
    nombre_sala VARCHAR(255),
    tipo_sala VARCHAR(50),         -- Tipo de sala (Terraza, Comedor, Sala Privada...)
    capacidad INT                  -- Capacidad de la sala (número de mesas o personas)                    
);

-- Tabla de mesas 
CREATE TABLE mesas (
    id_mesa INT PRIMARY KEY AUTO_INCREMENT,
    numero_mesa INT,
    id_sala INT,
    estado ENUM('libre','ocupada') DEFAULT ('libre'),   -- El estado de la mesa (libre u ocupada)
    tipo_mesa VARCHAR(50),
    descripcion VARCHAR(255),
    FOREIGN KEY (id_sala) REFERENCES salas(id_sala)     -- Cada mesa está asociada a una sala específica 
);

-- Tabla de sillas
CREATE TABLE sillas (
    id_silla INT PRIMARY KEY AUTO_INCREMENT,
    numero_silla INT,
    id_mesa INT,
    estado ENUM('libre','ocupada') DEFAULT ('libre'), -- Estado de la silla (libre u ocupada)
    tipo_silla VARCHAR(50),
    descripcion VARCHAR(255),
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa) -- Cada silla está asociada a una mesa específica
);

-- Tabla para los registros de ocupación de las mesas
CREATE TABLE ocupaciones (
    id_ocupacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_mesa INT,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,    -- Fecha y hora del inicio de la ocupación
    fecha_fin DATETIME,       -- Fecha y hora del final de la ocupación
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario), -- Permite saber quién ha hecho una ocupación
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa) -- Permite saber qué mesa ha estado ocupada
);

-- Tabla para gestionar reservas
CREATE TABLE reservas (
    id_reserva INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_mesa INT,
    fecha_reserva DATETIME DEFAULT CURRENT_TIMESTAMP,
    comentario VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa)
);

-- Insertar usuarios (camareros, gerente, personal de mantenimiento)
INSERT INTO usuarios (nombre_user, contrasena, trabajo) VALUES
    ('Jorge', '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'Camarero'),
    ('Olga', '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'Camarero'),
    ('Miguel', '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'Camarero'),
    ('Ana', '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'Gerente'),
    ('David', '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'Mantenimiento');

-- Insertar salas
INSERT INTO salas (nombre_sala, tipo_sala, capacidad) VALUES
    ('Terraza 1', 'Terraza', 20),
    ('Terraza 2', 'Terraza', 20),
    ('Terraza 3', 'Terraza', 20),
    ('Menjador 1', 'Menjador', 30),
    ('Menjador 2', 'Menjador', 25),
    ('Sala Privada 1', 'Privada', 10),
    ('Sala Privada 2', 'Privada', 8),
    ('Sala Privada 3', 'Privada', 12),
    ('Sala Privada 4', 'Privada', 15);

-- Insertar mesas en las terrazas (4 mesas en cada terraza)
INSERT INTO mesas (numero_mesa, id_sala, estado, tipo_mesa, descripcion) VALUES
    (101, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (102, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (103, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (104, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (201, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (202, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (203, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (204, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (301, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (302, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (303, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre'),
    (304, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre');

-- Insertar mesas en los comedores (10 mesas en cada comedor)
INSERT INTO mesas (numero_mesa, id_sala, estado, tipo_mesa, descripcion) VALUES
    (401, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños'),
    (402, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños'),
    (403, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños'),
    (404, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños'),
    (405, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños'),
    (406, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños'),
    (501, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes'),
    (502, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes'),
    (503, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes'),
    (504, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes'),
    (505, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes'),
    (506, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes');

-- Insertar mesas en las salas privadas (1 mesa por sala)
INSERT INTO mesas (numero_mesa, id_sala, estado, tipo_mesa, descripcion) VALUES
    (601, 6, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales'),
    (701, 7, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales'),
    (801, 8, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales'),
    (901, 9, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales');

-- Insertar sillas en algunas mesas
INSERT INTO sillas (numero_silla, id_mesa, estado, tipo_silla, descripcion) VALUES
    (1, 1, 'libre', 'Silla de Exterior', 'Silla cómoda para exteriores'),
    (2, 1, 'libre', 'Silla de Exterior', 'Silla cómoda para exteriores'),
    (3, 2, 'libre', 'Silla de Exterior', 'Silla cómoda para exteriores'),
    (4, 3, 'ocupada', 'Silla de Interior', 'Silla acolchada para mayor comodidad'),
    (5, 4, 'libre', 'Silla de Exterior', 'Silla cómoda para exteriores');

-- Insertar ocupaciones (registros de ocupación de mesas)
INSERT INTO ocupaciones (id_usuario, id_mesa, fecha_inicio, fecha_fin) VALUES
    (1, 1, '2023-11-20 12:30:00', '2023-11-20 14:30:00'),
    (2, 3, '2023-11-20 18:00:00', '2023-11-20 19:30:00'),
    (3, 5, '2023-11-20 20:00:00', '2023-11-20 22:00:00');

    -- Insertar algunas reservas de ejemplo
INSERT INTO reservas (id_usuario, id_mesa, comentario) VALUES
    (1, 2, 'Reserva para aniversario'),
    (2, 6, 'Reserva para reunión de negocios'),
    (3, 10, 'Reserva para cena romántica');

