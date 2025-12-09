import { injectable } from "inversify";
import { Persona } from "../../Domain/Entities/Persona";


export interface IRepositoryPersonas {
     getListadoCompletoPersonas(): Persona[];
}


@injectable()
export class PersonasRepository implements IRepositoryPersonas{


    getListadoCompletoPersonas(): Persona[] {


        //En un futuro, esto podría hacer llamadas a una API que nos ofreciera los datos
        return [
            new Persona(1, 'Fernando', 'Galiana Fernández'),
            new Persona(2, 'Carlos', 'Martínez López'),
            new Persona(3, 'Ana', 'Rodríguez Pérez'),
            new Persona(4, 'Miguel', 'Sánchez Ruiz'),
            new Persona(5, 'Laura', 'Torres Díaz'),
            new Persona(6, 'David', 'Moreno García'),
        ];
    }
}

export class PersonasRepositoryEmpty implements IRepositoryPersonas{
    getListadoCompletoPersonas(): Persona[] {
        return [];
    }
}

export class PersonasRepository100 implements IRepositoryPersonas{

    getListadoCompletoPersonas(): Persona[] {
        return [
            new Persona(1, 'Pablo', 'Gutiérrez Hernández'),
            new Persona(2, 'Laura', 'Torres Díaz'),
            new Persona(3, 'David', 'Moreno García'),
            new Persona(4, 'Ana', 'Pérez López'),
            new Persona(5, 'Carlos', 'Martínez Fernández'),
            new Persona(6, 'Fernando', 'García Sánchez'),
            new Persona(7, 'Marta', 'López Ruiz'),
            new Persona(8, 'Javier', 'Sánchez Gómez'),
            new Persona(9, 'Sofía', 'Ramírez Díaz'),
            new Persona(10, 'Andrés', 'Vargas Torres'),
            new Persona(11, 'Elena', 'Castro Morales'),
            new Persona(12, 'Diego', 'Flores Jiménez'),
            new Persona(13, 'Carmen', 'Rojas Herrera'),
            new Persona(14, 'Luis', 'Silva Mendoza'),
            new Persona(15, 'Isabel', 'Navarro Castro'),
            new Persona(16, 'Jorge', 'Ortega Ruiz'),
            new Persona(17, 'María', 'Soto Vargas'),
            new Persona(18, 'Raúl', 'Cruz Moreno'),
            new Persona(19, 'Natalia', 'Romero Peña'),
            new Persona(20, 'Sergio', 'Guerrero Rivas'),
            new Persona(21, 'Patricia', 'Sánchez Molina'),
            new Persona(22, 'Alberto', 'Díaz Flores'),
            new Persona(23, 'Lucía', 'Vega Herrera'),
            new Persona(24, 'Rubén', 'Cabrera Jiménez'),
            new Persona(25, 'Mónica', 'Santos Torres'),
            new Persona(26, 'Adrián', 'Pérez Gómez'),
            new Persona(27, 'Verónica', 'Luna Morales'),
            new Persona(28, 'Óscar', 'Campos Ruiz'),
            new Persona(29, 'Silvia', 'Ramos Herrera'),
            new Persona(30, 'Iván', 'Soto Vargas'),
            new Persona(31, 'Natalia', 'Romero Peña'),  
            new Persona(32, 'Sergio', 'Guerrero Rivas'),
            new Persona(33, 'Patricia', 'Sánchez Molina'),
            new Persona(34, 'Alberto', 'Díaz Flores'),
            new Persona(35, 'Lucía', 'Vega Herrera'),
            new Persona(36, 'Rubén', 'Cabrera Jiménez'),
            new Persona(37, 'Mónica', 'Santos Torres'),
            new Persona(38, 'Adrián', 'Pérez Gómez'),
            new Persona(39, 'Verónica', 'Luna Morales'),
            new Persona(40, 'Óscar', 'Campos Ruiz'),
            new Persona(41, 'Silvia', 'Ramos Herrera'),
            new Persona(42, 'Iván', 'Soto Vargas'),
            new Persona(43, 'Pablo', 'Gutiérrez Hernández'),
            new Persona(44, 'Laura', 'Torres Díaz'),
            new Persona(45, 'David', 'Moreno García'),
            new Persona(46, 'Ana', 'Pérez López'),
            new Persona(47, 'Carlos', 'Martínez Fernández'),
            new Persona(48, 'Fernando', 'García Sánchez'),
            new Persona(49, 'Marta', 'López Ruiz'),
            new Persona(50, 'Javier', 'Sánchez Gómez'),
            new Persona(51, 'Sofía', 'Ramírez Díaz'),
            new Persona(52, 'Andrés', 'Vargas Torres'),
            new Persona(53, 'Elena', 'Castro Morales'),
            new Persona(54, 'Diego', 'Flores Jiménez'),
            new Persona(55, 'Carmen', 'Rojas Herrera'),
            new Persona(56, 'Luis', 'Silva Mendoza'),
            new Persona(57, 'Isabel', 'Navarro Castro'),
            new Persona(58, 'Jorge', 'Ortega Ruiz'),
            new Persona(59, 'María', 'Soto Vargas'),
            new Persona(60, 'Raúl', 'Cruz Moreno'),
            new Persona(61, 'Natalia', 'Romero Peña'),
            new Persona(62, 'Sergio', 'Guerrero Rivas'),
            new Persona(63, 'Patricia', 'Sánchez Molina'),
            new Persona(64, 'Alberto', 'Díaz Flores'),
            new Persona(65, 'Lucía', 'Vega Herrera'),
            new Persona(66, 'Rubén', 'Cabrera Jiménez'),
            new Persona(67, 'Mónica', 'Santos Torres'),
            new Persona(68, 'Adrián', 'Pérez Gómez'),
            new Persona(69, 'Verónica', 'Luna Morales'),
            new Persona(70, 'Óscar', 'Campos Ruiz'),
            new Persona(71, 'Silvia', 'Ramos Herrera'),
            new Persona(72, 'Iván', 'Soto Vargas'),
            new Persona(73, 'Pablo', 'Gutiérrez Hernández'),
            new Persona(74, 'Laura', 'Torres Díaz'),
            new Persona(75, 'David', 'Moreno García'),
            new Persona(76, 'Ana', 'Pérez López'),
            new Persona(77, 'Carlos', 'Martínez Fernández'),
            new Persona(78, 'Fernando', 'García Sánchez'),
            new Persona(79, 'Marta', 'López Ruiz'),
            new Persona(80, 'Javier', 'Sánchez Gómez'),
            new Persona(81, 'Sofía', 'Ramírez Díaz'),
            new Persona(82, 'Andrés', 'Vargas Torres'),
            new Persona(83, 'Elena', 'Castro Morales'),
            new Persona(84, 'Diego', 'Flores Jiménez'),
            new Persona(85, 'Carmen', 'Rojas Herrera'),
            new Persona(86, 'Luis', 'Silva Mendoza'),
            new Persona(87, 'Isabel', 'Navarro Castro'),
            new Persona(88, 'Jorge', 'Ortega Ruiz'),
            new Persona(89, 'María', 'Soto Vargas'),
            new Persona(90, 'Raúl', 'Cruz Moreno'),
            new Persona(91, 'Natalia', 'Romero Peña'),
            new Persona(92, 'Sergio', 'Guerrero Rivas'),
            new Persona(93, 'Patricia', 'Sánchez Molina'),
            new Persona(94, 'Alberto', 'Díaz Flores'),
            new Persona(95, 'Lucía', 'Vega Herrera'),
            new Persona(96, 'Rubén', 'Cabrera Jiménez'),
            new Persona(97, 'Mónica', 'Santos Torres'),
            new Persona(98, 'Adrián', 'Pérez Gómez'),
            new Persona(99, 'Verónica', 'Luna Morales'),
            new Persona(100, 'Óscar', 'Campos Ruiz'),
        ];
    }
}