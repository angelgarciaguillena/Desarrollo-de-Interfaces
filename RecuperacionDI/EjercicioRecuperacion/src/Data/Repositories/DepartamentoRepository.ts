import { IDepartamentoRepository } from '../../Domain/Repositories/IDepartamentoRepository';
import { Departamento } from '../../Domain/Entities/Departamento';
import { injectable } from "inversify";

@injectable()
export class DepartamentoRepository implements IDepartamentoRepository {
  private urlDepartamentos: string = 'https://ui20251201134838-gqgjeaf9bycuf0gn.spaincentral-01.azurewebsites.net/api/departamentos';

  public async getDepartamentos(): Promise<Departamento[]> {
    try {
      const response = await fetch(this.urlDepartamentos);
      const data = await response.json();
      
      return data.map((item: any) => {
        const departamento = new Departamento();
        departamento.id = item.id;
        departamento.nombre = item.nombre;
        return departamento;
      });
    } catch (error) {
      console.error('Error al obtener departamentos:', error);
      return [];
    }
  }
}