import { injectable, inject } from "inversify";
import { IDepartamentoRepository } from "../../Domain/Interfaces/Repositories/IDepartamentoRepository";
import { IDepartamentoApi } from "../../Domain/Interfaces/APIs/IDepartamentoApi";
import { Departamento } from "../../Domain/Entities/Departamento";
import { TYPES } from "../../Core/Types";

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  constructor(
    @inject(TYPES.IDepartamentoApi)
    private readonly departamentoApi: IDepartamentoApi
  ) {}

  async getDepartamentos(): Promise<Departamento[]> {
    return await this.departamentoApi.getDepartamentos();
  }

  async getDepartamento(idDepartamento: number): Promise<Departamento> {
    return await this.departamentoApi.getDepartamento(idDepartamento);
  }

  async agregarDepartamento(departamento: Departamento): Promise<number> {
    return await this.departamentoApi.agregarDepartamento(departamento);
  }

  async actualizarDepartamento(departamento: Departamento): Promise<number> {
    return await this.departamentoApi.actualizarDepartamento(departamento);
  }

  async eliminarDepartamento(idDepartamento: number): Promise<number> {
    return await this.departamentoApi.eliminarDepartamento(idDepartamento);
  }
}