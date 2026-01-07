import { Departamento } from '../Entities/Departamento';

export interface IDepartamentoUseCase {
  getDepartamentos(): Promise<Departamento[]>;
}