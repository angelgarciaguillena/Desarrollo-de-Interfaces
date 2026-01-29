import { injectable, inject } from "inversify";
import { IDepartamentoApi } from "../../Domain/Interfaces/APIs/IDepartamentoApi";
import { Departamento } from "../../Domain/Entities/Departamento";
import { BaseApi } from "./BaseApi";
import { TYPES } from "../../Core/Types";

@injectable()
export class DepartamentoApi implements IDepartamentoApi {
  constructor(
    @inject(TYPES.BaseApi)
    private readonly baseApi: BaseApi
  ) {}

  async getDepartamentos(): Promise<Departamento[]> {
    try {
      const url = this.baseApi.getUrl("api/Departamentos");
      console.log("Fetching departamentos from:", url);
      
      const response = await fetch(url, {
        method: "GET",
        headers: this.baseApi.getDefaultHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Departamentos recibidos:", data);
      
      return data.map((item: any) => new Departamento(
        item.id,
        item.nombre
      ));

    } catch (error) {
      console.error("Error en getDepartamentos:", error);
      throw error;
    }
  }

  async getDepartamento(idDepartamento: number): Promise<Departamento> {
    try {
      const url = this.baseApi.getUrl(`api/Departamentos/${idDepartamento}`);
      const response = await fetch(url, {
        method: "GET",
        headers: this.baseApi.getDefaultHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const item = await response.json();
      return new Departamento(item.idDepartamento, item.nombreDepartamento);
    } catch (error) {
      console.error("Error en getDepartamento:", error);
      throw error;
    }
  }

  async agregarDepartamento(departamento: Departamento): Promise<number> {
    try {
      const url = this.baseApi.getUrl("api/Departamentos");
      const response = await fetch(url, {
        method: "POST",
        headers: this.baseApi.getDefaultHeaders(),
        body: JSON.stringify({
          nombre: departamento.nombre,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al agregar departamento: ${response.statusText} - ${errorText}`);
      }

      return response.status;
    } catch (error) {
      console.error("Error en agregarDepartamento:", error);
      throw error;
    }
  }

  async actualizarDepartamento(departamento: Departamento): Promise<number> {
    try {
      const url = this.baseApi.getUrl(`api/Departamentos/${departamento.id}`);
      const response = await fetch(url, {
        method: "PUT",
        headers: this.baseApi.getDefaultHeaders(),
        body: JSON.stringify({
          id: departamento.id,
          nombre: departamento.nombre,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar departamento: ${response.statusText} - ${errorText}`);
      }

      return response.status;
    } catch (error) {
      console.error("Error en actualizarDepartamento:", error);
      throw error;
    }
  }

  async eliminarDepartamento(idDepartamento: number): Promise<number> {
    try {
      const url = this.baseApi.getUrl(`api/Departamentos/${idDepartamento}`);
      const response = await fetch(url, {
        method: "DELETE",
        headers: this.baseApi.getDefaultHeaders(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar departamento: ${response.statusText} - ${errorText}`);
      }

      return response.status;
    } catch (error) {
      console.error("Error en eliminarDepartamento:", error);
      throw error;
    }
  }
}