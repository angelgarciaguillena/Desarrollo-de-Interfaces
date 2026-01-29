import { injectable, inject } from "inversify";
import { IPersonaUseCase } from "../Interfaces/UseCases/IPersonaUseCase";
import { IPersonaRepository } from "../Interfaces/Repositories/IPersonaRepository";
import { IDepartamentoRepository } from "../Interfaces/Repositories/IDepartamentoRepository";
import { Persona } from "../Entities/Persona";
import { PersonaDTO } from "../DTOs/PersonaDTO";
import { TYPES } from "../../Core/Types";


@injectable()
export class PersonaUseCase implements IPersonaUseCase {
  constructor(
    @inject(TYPES.IPersonaRepository)
    private readonly personaRepository: IPersonaRepository,
    @inject(TYPES.IDepartamentoRepository)
    private readonly departamentoRepository: IDepartamentoRepository
  ) {}

  async obtenerPersonas(): Promise<PersonaDTO[]> {
    const personas = await this.personaRepository.getPersonas();
    const departamentos = await this.departamentoRepository.getDepartamentos();
 
    let personasDTO: PersonaDTO[] = personas.map((persona) => {
      const departamento = departamentos.find(
        (d) => d.id === persona.idDepartamento
      );

      return {
        id: persona.id,
        nombre: persona.nombre,
        apellidos: persona.apellidos,
        fechaNacimiento: persona.fechaNacimiento,
        direccion: persona.direccion,
        telefono: persona.telefono,
        foto: persona.foto,
        idDepartamento: persona.idDepartamento,
        nombreDepartamento: departamento?.nombre || "Sin departamento",
      };
    });

    const diaSemana = this.obtenerDia();
    if (diaSemana === 5 || diaSemana === 6) {
      personasDTO = personasDTO.filter((persona) => {
        const edad = this.calcularEdad(persona.fechaNacimiento);
        return edad > 18;
      });
    }

    return personasDTO;
  }

  async agregarPersona(persona: Persona): Promise<number> {
    return await this.personaRepository.agregarPersona(persona);
  }

  async actualizarPersona(persona: Persona): Promise<number> {
    return await this.personaRepository.actualizarPersona(persona);
  }

  async eliminarPersona(idPersona: number): Promise<number> {
    if (!this.comprobarEliminacion()) {
      throw new Error("No se permite eliminar personas los domingos");
    }
    return await this.personaRepository.eliminarPersona(idPersona);
  }


  private obtenerDia(): number {
    return new Date().getDay();
  }

  private comprobarEliminacion(): boolean {
    return this.obtenerDia() !== 0;
  }

  private calcularEdad(fechaNacimiento: Date): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }
}