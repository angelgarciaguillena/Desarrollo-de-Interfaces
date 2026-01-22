import { IPersonaRepository } from '../../Domain/Interfaces/Repositories/IPersonaRepository';
import { Persona } from '../../Domain/Entities/Persona';
import { injectable } from "inversify";

@injectable()
export class PersonaRepository implements IPersonaRepository {
  
  private urlPersonas: string = 'https://ui20251201134838-gqgjeaf9bycuf0gn.spaincentral-01.azurewebsites.net/api/personas';

  public async getPersonas(): Promise<Persona[]> {
    try {
      const response = await fetch(this.urlPersonas);
      const data = await response.json();

      return data.map((item: any) => {
        const itemPersona = item._persona; 

        const persona = new Persona();
        persona.id = itemPersona.id;
        persona.nombre = itemPersona.nombre;
        persona.apellidos = itemPersona.apellidos;
        persona.fechaNacimiento = new Date(itemPersona.fechaNacimiento);
        persona.direccion = itemPersona.direccion || '';
        persona.telefono = itemPersona.telefono || '';
        persona.foto = itemPersona.foto || '';
        persona.idDepartamento = itemPersona.idDepartamento;

        return persona;
      });
    } catch (error) {
      console.error('Error al obtener personas:', error);
      return [];
    }
  }
} 