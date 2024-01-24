-- Crear la base de datos
CREATE DATABASE bd_restaurante;

-- Seleccionar la base de datos
USE bd_restaurante;

-- Tabla de usuarios para los distintos roles
CREATE TABLE usuarios (
    id_usuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre_user VARCHAR(255),
    apellido1 VARCHAR(255),
    apellido2 VARCHAR(255),
    telefono INT(9),
    contrasena VARCHAR(60),
    email VARCHAR(60),
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
    numero_sillas INT,
    id_sala INT,
    estado ENUM('libre','ocupada','reservada','mantenimiento') DEFAULT ('libre'),
    tipo_mesa VARCHAR(50),
    descripcion VARCHAR(255),
    FOREIGN KEY (id_sala) REFERENCES salas(id_sala)     -- Cada mesa está asociada a una sala específica 
);


-- Tabla para los registros de ocupación de las mesas
CREATE TABLE ocupaciones (
    id_ocupacion INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT,
    id_mesa INT,
    fecha_inicio DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_fin DATETIME,
    tipo ENUM('reserva', 'ocupacion') DEFAULT 'ocupacion',
    hora_reserva INT,  -- Nuevo campo para la hora de la reserva
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_mesa) REFERENCES mesas(id_mesa)
);

-- Insertar usuarios (camareros, gerente, personal de mantenimiento)
INSERT INTO usuarios (nombre_user, apellido1, apellido2, telefono, contrasena, email, trabajo) VALUES
    ('Jorge', 'González', 'Martínez', 123456789, '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'jorge@example.com', 'Camarero'),
    ('Olga', 'Martínez', 'López', 987654321, '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'olga@example.com', 'Camarero'),
    ('Miguel', 'López', 'García', 654321987, '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'miguel@example.com', 'Camarero'),
    ('Ana', 'García', 'Martínez', 123123123, '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'ana@example.com', 'Gerente'),
    ('David', 'Martínez', 'Gómez', 456789123, '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'david@example.com', 'Mantenimiento');

-- Insertar usuario administrador
INSERT INTO usuarios (nombre_user, contrasena, trabajo) VALUES
    ('admin', '$2y$10$wORRwXyRsJRc9ua8okkNuO6m/GbqBuZouNb4LZbwFPDG6HwNUhOVa', 'Administrador');

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

-- Insertar mesas de exterior (4 mesas en cada sala)
INSERT INTO mesas (numero_mesa, id_sala, estado, tipo_mesa, descripcion, numero_sillas)
VALUES
    (101, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (102, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (103, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (104, 1, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (201, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (202, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (203, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (204, 2, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (301, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (302, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (303, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4),
    (304, 3, 'libre', 'Mesa de Exterior', 'Mesa para disfrutar al aire libre', 4);

-- Insertar mesas comunes (6 mesas en cada comedor)
INSERT INTO mesas (numero_mesa, id_sala, estado, tipo_mesa, descripcion, numero_sillas)
VALUES
    (401, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños', 6),
    (402, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños', 6),
    (403, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños', 6),
    (404, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños', 6),
    (405, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños', 6),
    (406, 4, 'libre', 'Mesa Común', 'Mesa para grupos pequeños', 6),
    (501, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes', 6),
    (502, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes', 6),
    (503, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes', 6),
    (504, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes', 6),
    (505, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes', 6),
    (506, 5, 'libre', 'Mesa Común', 'Mesa para grupos grandes', 6);

-- Insertar mesas en las salas privadas (1 mesa por sala)
INSERT INTO mesas (numero_mesa, id_sala, estado, tipo_mesa, descripcion, numero_sillas)
VALUES
    (601, 6, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales', 1),
    (701, 7, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales', 1),
    (801, 8, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales', 1),
    (901, 9, 'libre', 'Mesa VIP', 'Mesa en sala privada para eventos especiales', 1);



-- Insertar ocupaciones (registros de ocupación de mesas)
INSERT INTO ocupaciones (id_usuario, id_mesa, fecha_inicio, fecha_fin, tipo) VALUES
    (1, 1, '2023-11-20 12:30:00', '2023-11-20 14:30:00', 'ocupacion'),
    (2, 3, '2023-11-20 18:00:00', '2023-11-20 19:30:00', 'ocupacion'),
    (3, 5, '2023-11-20 20:00:00', '2023-11-20 22:00:00', 'ocupacion');