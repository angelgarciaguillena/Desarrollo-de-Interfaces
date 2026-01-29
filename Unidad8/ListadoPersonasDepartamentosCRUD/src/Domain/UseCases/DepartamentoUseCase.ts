import { injectable, inject } from "inversify";
import { IDepartamentoUseCase } from "../Interfaces/UseCases/IDepartamentoUseCase";
import { IDepartamentoRepository } from "../Interfaces/Repositories/IDepartamentoRepository";
import { Departamento } from "../Entities/Departamento";
import { TYPES } from "../../Core/Types";

@injectable()
export class DepartamentoUseCase implements IDepartamentoUseCase {
  constructor(
    @inject(TYPES.IDepartamentoRepository)
    private readonly departamentoRepository: IDepartamentoRepository
  ) {}

  async obtenerDepartamentos(): Promise<Departamento[]> {
    return await this.departamentoRepository.getDepartamentos();
  }

  async agregarDepartamento(departamento: Departamento): Promise<number> {
    return await this.departamentoRepository.agregarDepartamento(departamento);
  }

  async actualizarDepartamento(departamento: Departamento): Promise<number> {
    return await this.departamentoRepository.actualizarDepartamento(departamento);
  }

  async eliminarDepartamento(idDepartamento: number): Promise<number> {
    return await this.departamentoRepository.eliminarDepartamento(idDepartamento);
  }
}