import { Departamento } from "../../Entities/Departamento";

export interface IDepartamentoApi {
  getDepartamentos(): Promise<Departamento[]>;
  getDepartamento(idDepartamento: number): Promise<Departamento>;
  agregarDepartamento(departamento: Departamento): Promise<number>;
  actualizarDepartamento(departamento: Departamento): Promise<number>;
  eliminarDepartamento(idDepartamento: number): Promise<number>;
}