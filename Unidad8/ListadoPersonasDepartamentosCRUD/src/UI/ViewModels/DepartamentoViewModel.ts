import { injectable, inject } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
import { IDepartamentoUseCase } from "../../Domain/Interfaces/UseCases/IDepartamentoUseCase";
import { Departamento } from "../../Domain/Entities/Departamento";
import { TYPES } from "../../Core/Types";

@injectable()
export class DepartamentoViewModel {
  departamentos: Departamento[] = [];
  departamentoSeleccionado: Departamento | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    @inject(TYPES.IDepartamentoUseCase)
    private readonly departamentoUseCase: IDepartamentoUseCase
  ) {
    makeAutoObservable(this);
  }

  async cargarDepartamentos(): Promise<void> {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const departamentos = await this.departamentoUseCase.obtenerDepartamentos();
      
      runInAction(() => {
        this.departamentos = departamentos;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Error desconocido";
        this.isLoading = false;
        console.error("Error cargando departamentos:", error);
      });
    }
  }

  async agregarDepartamento(departamento: Departamento): Promise<void> {
    runInAction(() => {
      this.error = null;
    });

    try {
      await this.departamentoUseCase.agregarDepartamento(departamento);
      
      await this.cargarDepartamentos();
      
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Error al agregar departamento";
      });
      throw error;
    }
  }

  async actualizarDepartamento(departamento: Departamento): Promise<void> {
    runInAction(() => {
      this.error = null;
    });

    try {
      await this.departamentoUseCase.actualizarDepartamento(departamento);
      
      await this.cargarDepartamentos();
      
      runInAction(() => {
        this.departamentoSeleccionado = null;
      });
      
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Error al actualizar departamento";
      });
      throw error;
    }
  }

  async eliminarDepartamento(idDepartamento: number): Promise<number> {
    runInAction(() => {
      this.error = null;
      this.isLoading = true;
    });

    try {
      console.log("Eliminando departamento con ID:", idDepartamento);
      const status = await this.departamentoUseCase.eliminarDepartamento(idDepartamento);
      runInAction(() => {
        this.departamentos = this.departamentos.filter(d => d.id !== idDepartamento);
        if (this.departamentoSeleccionado?.id === idDepartamento) {
          this.departamentoSeleccionado = null;
        }
      });

      return status; 
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Error al eliminar departamento";
      });
      throw error;
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  seleccionarDepartamento(departamento: Departamento | null): void {
    runInAction(() => {
      this.departamentoSeleccionado = departamento;
    });
  }

  limpiarError(): void {
    runInAction(() => {
      this.error = null;
    });
  }
}