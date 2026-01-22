import { Departamento } from '../../Entities/Departamento';

export interface IDepartamentoRepository {
  getDepartamentos(): Promise<Departamento[]>;
  getDepartamento(): Promise<Departamento>
  agregarDepartamento(): Number;
  actualizarDepartamento(): Number;
  borrarDepartamento(): Number;
}