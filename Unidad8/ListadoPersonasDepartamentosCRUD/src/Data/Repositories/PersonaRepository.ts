import { injectable, inject } from "inversify";
import { IPersonaRepository } from "../../Domain/Interfaces/Repositories/IPersonaRepository";
import { IPersonaApi } from "../../Domain/Interfaces/APIs/IPersonaApi";
import { Persona } from "../../Domain/Entities/Persona";
import { TYPES } from "../../Core/Types";

@injectable()
export class PersonaRepository implements IPersonaRepository {
  constructor(
    @inject(TYPES.IPersonaApi)
    private readonly personaApi: IPersonaApi
  ) {}

  async getPersonas(): Promise<Persona[]> {
    return await this.personaApi.getPersonas();
  }

  async getPersona(idPersona: number): Promise<Persona> {
    return await this.personaApi.getPersona(idPersona);
  }

  async agregarPersona(persona: Persona): Promise<number> {
    return await this.personaApi.agregarPersona(persona);
  }

  async actualizarPersona(persona: Persona): Promise<number> {
    return await this.personaApi.actualizarPersona(persona);
  }

  async eliminarPersona(idPersona: number): Promise<number> {
    return await this.personaApi.eliminarPersona(idPersona);
  }
}