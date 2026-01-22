import { PersonaConNombreDepartamento } from "../../DTOs/PersonaConNombreDepartamento";

export interface IPersonaUseCase {
    getPersonas(): Promise<PersonaConNombreDepartamento[]>;
    getPersona(): Promise<PersonaConNombreDepartamento>
    agregarPersona(): Number
    actualizarDepartamento(): Number
    borrarDepartamento(): Number
}