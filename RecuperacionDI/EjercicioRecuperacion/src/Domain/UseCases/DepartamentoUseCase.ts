import { IDepartamentoUseCase } from '../Interfaces/IDepartamentoUseCase';
import { IDepartamentoRepository } from '../Repositories/IDepartamentoRepository';
import { Departamento } from '../Entities/Departamento';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../Core/Types';

@injectable()
export class DepartamentoUseCase implements IDepartamentoUseCase {
  private readonly _departamentoRepository: IDepartamentoRepository;

  public constructor(@inject(TYPES.IDepartamentoRepository) departamentoRepository: IDepartamentoRepository) {
    this._departamentoRepository = departamentoRepository;
  }

  public async getDepartamentos(): Promise<Departamento[]> {
    return await this._departamentoRepository.getDepartamentos();
  }
}