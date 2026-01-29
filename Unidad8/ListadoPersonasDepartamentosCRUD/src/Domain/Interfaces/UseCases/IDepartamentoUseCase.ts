import { Departamento } from "../../Entities/Departamento";

export interface IDepartamentoUseCase {
  obtenerDepartamentos(): Promise<Departamento[]>;
  agregarDepartamento(departamento: Departamento): Promise<number>;
  actualizarDepartamento(departamento: Departamento): Promise<number>;
  eliminarDepartamento(idDepartamento: number): Promise<number>;
}