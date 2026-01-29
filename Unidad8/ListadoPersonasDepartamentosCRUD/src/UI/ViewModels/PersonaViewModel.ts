import { injectable, inject } from "inversify";
import { makeAutoObservable, runInAction } from "mobx";
import { IPersonaUseCase } from "../../Domain/Interfaces/UseCases/IPersonaUseCase";
import { IDomainToUI } from "../Mappers/IDomainToUI";
import { Persona } from "../../Domain/Entities/Persona";
import { PersonaConIcono } from "../Models/PersonaConIcono";
import { TYPES } from "../../Core/Types";

@injectable()
export class PersonaViewModel {
  personas: PersonaConIcono[] = [];
  personaSeleccionada: PersonaConIcono | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(
    @inject(TYPES.IPersonaUseCase)
    private readonly personaUseCase: IPersonaUseCase,
    @inject(TYPES.IDomainToUI)
    private readonly mapper: IDomainToUI
  ) {
    makeAutoObservable(this);
  }

  async cargarPersonas(): Promise<void> {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const personasDTO = await this.personaUseCase.obtenerPersonas();
      
      runInAction(() => {
        this.personas = personasDTO.map((persona) =>
          this.mapper.transformar(persona)
        );
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Error desconocido";
        this.isLoading = false;
        console.error("Error cargando personas:", error);
      });
    }
  }

  async agregarPersona(persona: Persona): Promise<void> {
    runInAction(() => {
      this.error = null;
    });

    try {
      await this.personaUseCase.agregarPersona(persona);
      
      await this.cargarPersonas();
      
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Error al agregar persona";
      });
      throw error;
    }
  }

  async actualizarPersona(persona: Persona): Promise<void> {
    runInAction(() => {
      this.error = null;
    });

    try {
      await this.personaUseCase.actualizarPersona(persona);
      
      await this.cargarPersonas();
      
      runInAction(() => {
        this.personaSeleccionada = null;
      });
      
    } catch (error) {
      runInAction(() => {
        this.error = error instanceof Error ? error.message : "Error al actualizar persona";
      });
      throw error;
    }
  }

  async eliminarPersona(idPersona: number): Promise<void> {
  runInAction(() => {
    this.error = null;
    this.isLoading = true; 
  });

  try {
    await this.personaUseCase.eliminarPersona(idPersona);

    runInAction(() => {
      this.personas = this.personas.filter(p => p.id !== idPersona);
      if (this.personaSeleccionada?.id === idPersona) {
        this.personaSeleccionada = null;
      }
    });

  } catch (error) {
    runInAction(() => {
      this.error = error instanceof Error ? error.message : "Error al eliminar persona";
    });
  } finally {
    runInAction(() => {
      this.isLoading = false;
    });
  }
}


  seleccionarPersona(persona: PersonaConIcono | null): void {
    runInAction(() => {
      this.personaSeleccionada = persona;
    });
  }

  limpiarError(): void {
    runInAction(() => {
      this.error = null;
    });
  }
}