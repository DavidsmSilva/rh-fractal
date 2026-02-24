-- ============================================================
-- Base de Datos: rh_fractal
-- Fractal Estrategias Sostenibles - Sistema de Recursos Humanos
-- ============================================================

CREATE DATABASE IF NOT EXISTS rh_fractal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE rh_fractal;

-- ============================================================
-- Tabla: departamentos
-- ============================================================
DROP TABLE IF EXISTS departamentos;
CREATE TABLE departamentos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    codigo VARCHAR(20) UNIQUE NOT NULL,
    presupuesto DECIMAL(15,2),
    jefe VARCHAR(100),
    numero_empleados INT DEFAULT 0,
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion DATE NOT NULL,
    fecha_actualizacion DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabla: empleados
-- ============================================================
DROP TABLE IF EXISTS empleados;
CREATE TABLE empleados (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    numero_empleado VARCHAR(50) UNIQUE NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    departamento VARCHAR(100) NOT NULL,
    salario DECIMAL(12,2) NOT NULL,
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_nacimiento DATE,
    fecha_contratacion DATE NOT NULL,
    telefono_contacto VARCHAR(20),
    direccion_residencia VARCHAR(255),
    ciudad_residencia VARCHAR(100),
    pais_residencia VARCHAR(100),
    tipo_contrato VARCHAR(50),
    horas_semanales INT DEFAULT 40,
    fecha_finalizacion DATE,
    motivo_finalizacion VARCHAR(255),
    beneficios TEXT,
    observaciones TEXT,
    fecha_creacion DATE NOT NULL,
    fecha_actualizacion DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabla: beneficios
-- ============================================================
DROP TABLE IF EXISTS beneficios;
CREATE TABLE beneficios (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    tipo VARCHAR(50) NOT NULL,
    cobertura VARCHAR(100),
    valor DECIMAL(12,2),
    valor_mensual DECIMAL(12,2),
    fecha_inicio DATE,
    fecha_fin DATE,
    estado VARCHAR(20) DEFAULT 'ACTIVO',
    fecha_creacion DATE NOT NULL,
    fecha_actualizacion DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabla: nominas
-- ============================================================
DROP TABLE IF EXISTS nominas;
CREATE TABLE nominas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    periodo VARCHAR(50) NOT NULL,
    total_devengado DECIMAL(15,2) NOT NULL,
    total_deducciones DECIMAL(15,2) NOT NULL,
    total_neto DECIMAL(15,2) NOT NULL,
    fecha_pago DATE,
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    observaciones TEXT,
    fecha_creacion DATE NOT NULL,
    fecha_actualizacion DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabla: vacaciones
-- ============================================================
DROP TABLE IF EXISTS vacaciones;
CREATE TABLE vacaciones (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    empleado_id BIGINT,
    nombre_empleado VARCHAR(200),
    periodo_vacacional VARCHAR(100),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    dias INT NOT NULL,
    dias_totales INT,
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    fecha_solicitud DATE NOT NULL,
    fecha_aprobacion DATE,
    fecha_rechazo DATE,
    motivo_rechazo TEXT,
    fecha_creacion DATE NOT NULL,
    fecha_actualizacion DATE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Tabla: inventario_equipos
-- ============================================================
DROP TABLE IF EXISTS inventario_equipos;
CREATE TABLE inventario_equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(100),
    contacto_tel VARCHAR(20),
    cargo VARCHAR(100),
    anydesk VARCHAR(50),
    cuenta_correo VARCHAR(150),
    ubicacion VARCHAR(100),
    serial_equipo VARCHAR(100),
    marca VARCHAR(100),
    modelo VARCHAR(100),
    procesador VARCHAR(150),
    nombre_equipo VARCHAR(100),
    dueno VARCHAR(100),
    licencia_office VARCHAR(100),
    windows VARCHAR(100),
    licencia_windows VARCHAR(100),
    fecha_compra DATE,
    valor DECIMAL(12,2),
    usuario_windows VARCHAR(100),
    pin_windows VARCHAR(50),
    novedades TEXT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- Datos de Prueba: Departamentos
-- ============================================================
INSERT INTO departamentos (nombre, descripcion, codigo, presupuesto, jefe, numero_empleados, estado, fecha_creacion, fecha_actualizacion) VALUES
('Tecnología', 'Innovación y desarrollo de software', 'TEC', 500000.00, 'Juan Pérez', 2, 'ACTIVO', CURDATE(), CURDATE()),
('Recursos Humanos', 'Gestión de talento y bienestar', 'RH', 300000.00, 'María Gómez', 1, 'ACTIVO', CURDATE(), CURDATE()),
('Mercadeo', 'Branding y estrategia comercial', 'MK', 250000.00, 'Carlos Rodríguez', 1, 'ACTIVO', CURDATE(), CURDATE()),
('Finanzas', 'Gestión financiera y contable', 'FIN', 200000.00, 'Ana Martínez', 1, 'ACTIVO', CURDATE(), CURDATE());

-- ============================================================
-- Datos de Prueba: Empleados
-- ============================================================
INSERT INTO empleados (nombre, apellido, email, numero_empleado, cargo, departamento, salario, estado, fecha_nacimiento, fecha_contratacion, telefono_contacto, direccion_residencia, ciudad_residencia, pais_residencia, tipo_contrato, horas_semanales, fecha_creacion, fecha_actualizacion) VALUES
('Juan', 'Pérez', 'jperez@fractal.com', 'EMP-001', 'Desarrollador Senior', 'Tecnología', 5500000.00, 'ACTIVO', '1990-05-20', '2023-03-15', '3001234567', 'Calle 123 #45-67', 'Medellín', 'Colombia', 'Termo Indefinido', 40, CURDATE(), CURDATE()),
('María', 'Gómez', 'mgomez@fractal.com', 'EMP-002', 'Analista de Negocios', 'Recursos Humanos', 4200000.00, 'ACTIVO', '1988-10-12', '2022-08-01', '3002345678', 'Carrera 56 #78-90', 'Medellín', 'Colombia', 'Termo Indefinido', 40, CURDATE(), CURDATE()),
('Carlos', 'Rodríguez', 'crodriguez@fractal.com', 'EMP-003', 'Diseñador UX', 'Mercadeo', 3800000.00, 'ACTIVO', '1995-03-25', '2024-01-10', '3003456789', 'Avenida 30 #12-34', 'Medellín', 'Colombia', 'Termo Fijo', 40, CURDATE(), CURDATE()),
('Ana', 'Martínez', 'amartinez@fractal.com', 'EMP-004', 'Contadora', 'Finanzas', 4500000.00, 'ACTIVO', '1985-08-30', '2021-06-15', '3004567890', 'Calle 78 #90-12', 'Medellín', 'Colombia', 'Termo Indefinido', 40, CURDATE(), CURDATE()),
('Luis', 'Fernández', 'lfernandez@fractal.com', 'EMP-005', 'Desarrollador Junior', 'Tecnología', 2800000.00, 'ACTIVO', '1998-12-10', '2025-01-05', '3005678901', 'Carrera 45 #67-89', 'Medellín', 'Colombia', 'Aprendizaje', 40, CURDATE(), CURDATE());

-- ============================================================
-- Datos de Prueba: Beneficios
-- ============================================================
INSERT INTO beneficios (nombre, descripcion, tipo, cobertura, valor_mensual, estado, fecha_creacion, fecha_actualizacion) VALUES
('Plan de Salud', 'Cobertura médica integral', 'Salud', 'Empleado + Familia', 150000.00, 'ACTIVO', CURDATE(), CURDATE()),
('Auxilio de Transporte', 'Subsidio de transporte', 'Transporte', 'Todos los empleados', 80000.00, 'ACTIVO', CURDATE(), CURDATE()),
('Capacitación', 'Programas de desarrollo profesional', 'Desarrollo', 'Todos los empleados', 2500000.00, 'ACTIVO', CURDATE(), CURDATE()),
('Plan de Cesantías', 'Ahorro para fins de contrato', 'Prestacional', 'Todos los empleados', 1000000.00, 'ACTIVO', CURDATE(), CURDATE());

-- ============================================================
-- Datos de Prueba: Nóminas
-- ============================================================
INSERT INTO nominas (periodo, total_devengado, total_deducciones, total_neto, fecha_pago, estado, fecha_creacion, fecha_actualizacion) VALUES
('Enero 2026', 12500000.00, 2500000.00, 10000000.00, '2026-01-30', 'PAGADA', CURDATE(), CURDATE()),
('Febrero 2026', 12800000.00, 2600000.00, 10200000.00, '2026-02-28', 'PENDIENTE', CURDATE(), CURDATE()),
('Marzo 2026', 13000000.00, 2700000.00, 10300000.00, '2026-03-31', 'PENDIENTE', CURDATE(), CURDATE());

-- ============================================================
-- Datos de Prueba: Vacaciones
-- ============================================================
INSERT INTO vacaciones (empleado_id, nombre_empleado, fecha_inicio, fecha_fin, dias, estado, fecha_solicitud, fecha_creacion, fecha_actualizacion) VALUES
(1, 'Juan Pérez', '2026-04-01', '2026-04-15', 15, 'APROBADA', '2026-02-15', CURDATE(), CURDATE()),
(2, 'María Gómez', '2026-06-01', '2026-06-10', 10, 'PENDIENTE', '2026-03-01', CURDATE(), CURDATE()),
(3, 'Carlos Rodríguez', '2026-08-15', '2026-08-25', 11, 'RECHAZADA', '2026-04-10', CURDATE(), CURDATE());

-- ============================================================
-- Datos de Prueba: Inventario Equipos
-- ============================================================
INSERT INTO inventario_equipos (usuario, contacto_tel, cargo, anydesk, cuenta_correo, ubicacion, serial_equipo, marca, modelo, procesador, nombre_equipo, dueno, licencia_office, windows, licencia_windows, fecha_compra, valor, usuario_windows, pin_windows, novedades) VALUES
('Juan Pérez', '3001234567', 'Desarrollador Senior', '123456789', 'jperez@fractal.com', 'Oficina 101 - Torre A', 'SN-001-2024', 'Dell', 'Latitude 5520', 'Intel Core i7-1185G7', 'DEL-101-JP', 'Juan Pérez', 'Microsoft 365', 'Windows 11 Pro', 'OEM', '2024-03-15', 3500000.00, 'jperez', '1234', 'Equipo en excelente estado'),
('María Gómez', '3002345678', 'Analista de Negocios', '234567890', 'mgomez@fractal.com', 'Oficina 102 - Torre A', 'SN-002-2024', 'HP', 'ProBook 450 G8', 'Intel Core i5-1135G7', 'HP-102-MG', 'María Gómez', 'Microsoft 365', 'Windows 11 Pro', 'OEM', '2024-01-10', 2800000.00, 'mgomez', '5678', 'Sin novedad'),
('Carlos Rodríguez', '3003456789', 'Diseñador UX', '345678901', 'crodriguez@fractal.com', 'Oficina 201 - Torre B', 'SN-003-2024', 'Apple', 'MacBook Pro 14', 'Apple M3 Pro', 'APL-201-CR', 'Carlos Rodríguez', 'Microsoft 365', 'macOS', 'N/A', '2024-06-20', 6500000.00, 'crodriguez', '9012', 'Requiere actualización de RAM'),
('Ana Martínez', '3004567890', 'Contadora', '456789012', 'amartinez@fractal.com', 'Oficina 103 - Torre A', 'SN-004-2024', 'Lenovo', 'ThinkPad T14s', 'AMD Ryzen 7 Pro 5850U', 'LEN-103-AM', 'Ana Martínez', 'Microsoft 365', 'Windows 11 Pro', 'OEM', '2024-02-28', 3200000.00, 'amartinez', '3456', 'Batería con menor autonomía'),
('Luis Fernández', '3005678901', 'Desarrollador Junior', '567890123', 'lfernandez@fractal.com', 'Oficina 104 - Torre A', 'SN-005-2024', 'Dell', 'Vostro 3510', 'Intel Core i3-1115G4', 'DEL-104-LF', 'Luis Fernández', 'Microsoft 365', 'Windows 11 Home', 'OEM', '2025-01-05', 1800000.00, 'lfernandez', '7890', 'Equipo nuevo');

-- ============================================================
-- Confirmación
-- ============================================================
SELECT 'Base de datos y tablas creadas exitosamente!' AS mensaje;
SELECT COUNT(*) AS total_departamentos FROM departamentos;
SELECT COUNT(*) AS total_empleados FROM empleados;
SELECT COUNT(*) AS total_beneficios FROM beneficios;
SELECT COUNT(*) AS total_nominas FROM nominas;
SELECT COUNT(*) AS total_vacaciones FROM vacaciones;
SELECT COUNT(*) AS total_equipos FROM inventario_equipos;
