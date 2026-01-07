import { Departamento } from '../Entities/Departamento';

export interface IDepartamentoRepository {
  getDepartamentos(): Promise<Departamento[]>;
}