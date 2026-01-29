import { injectable, inject } from "inversify";
import { IPersonaApi } from "../../Domain/Interfaces/APIs/IPersonaApi";
import { Persona } from "../../Domain/Entities/Persona";
import { BaseApi } from "./BaseApi";
import { TYPES } from "../../Core/Types";

@injectable()
export class PersonaApi implements IPersonaApi {
  constructor(
    @inject(TYPES.BaseApi)
    private readonly baseApi: BaseApi
  ) {}

  async getPersonas(): Promise<Persona[]> {
    try {
      const url = this.baseApi.getUrl("api/Personas");
      const response = await fetch(url, {
        method: "GET",
        headers: this.baseApi.getDefaultHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error al obtener personas: ${response.statusText}`);
      }

      const data = await response.json();
      return data.map(
        (item: any) => {
          const p = item._persona;
          return new Persona(
            p.id,
            p.nombre,
            p.apellidos,
            new Date(p.fechaNacimiento),
            p.direccion || "",
            p.telefono || "",
            p.foto || "",
            p.idDepartamento || 0
          );
        }
      );
      
    } catch (error) {
      console.error("Error en getPersonas:", error);
      throw error;
    }
  }

  async getPersona(idPersona: number): Promise<Persona> {
    try {
      const url = this.baseApi.getUrl(`api/Personas/${idPersona}`);
      const response = await fetch(url, {
        method: "GET",
        headers: this.baseApi.getDefaultHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error al obtener persona: ${response.statusText}`);
      }

      const item = await response.json();
      
      return new Persona(
        item.id,
        item.nombre,
        item.apellidos,
        new Date(item.fechaNacimiento),
        item.direccion || "",
        item.telefono || "",
        item.foto || "",
        item.idDepartamento || item.departamentoId || 0
      );
    } catch (error) {
      console.error("Error en getPersona:", error);
      throw error;
    }
  }

  async agregarPersona(persona: Persona): Promise<number> {
    try {
      const url = this.baseApi.getUrl("api/Personas");
      const response = await fetch(url, {
        method: "POST",
        headers: this.baseApi.getDefaultHeaders(),
        body: JSON.stringify({
          nombre: persona.nombre,
          apellidos: persona.apellidos,
          fechaNacimiento: persona.fechaNacimiento.toISOString(),
          direccion: persona.direccion,
          telefono: persona.telefono,
          foto: persona.foto,
          departamentoId: persona.idDepartamento,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar persona: ${response.statusText} - ${errorText}`);
      }

      return response.status;
    } catch (error) {
      console.error("Error en agregarPersona:", error);
      throw error;
    }
  }

  async actualizarPersona(persona: Persona): Promise<number> {
    try {
      const url = this.baseApi.getUrl(`api/Personas/${persona.id}`);
      const response = await fetch(url, {
        method: "PUT",
        headers: this.baseApi.getDefaultHeaders(),
        body: JSON.stringify({
          id: persona.id,
          nombre: persona.nombre,
          apellidos: persona.apellidos,
          fechaNacimiento: persona.fechaNacimiento.toISOString(),
          direccion: persona.direccion,
          telefono: persona.telefono,
          foto: persona.foto,
          departamentoId: persona.idDepartamento,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar persona: ${response.statusText} - ${errorText}`);
      }

      return response.status;
    } catch (error) {
      console.error("Error en actualizarPersona:", error);
      throw error;
    }
  }

  async eliminarPersona(idPersona: number): Promise<number> {
    try {
      const url = this.baseApi.getUrl(`api/Personas/${idPersona}`);
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.baseApi.getDefaultHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar persona: ${response.statusText}`);
      }

      return response.status;
    } catch (error) {
      console.error("Error en eliminarPersona:", error);
      throw error;
    }
  }
}