import { IPersonaUseCase } from '../../Domain/Interfaces/IPersonaUseCase';
import { IDomainToUI } from '../Mappers/IDomainToUI';
import { PersonaConColor } from '../Models/PersonaConColor';
import { PersonaConDepartamentoSeleccionado } from '../../Domain/DTOs/PersonaConDepartamentoSeleccionado';
import { makeAutoObservable } from "mobx";
import { TYPES } from '../../Core/Types';
import { inject } from 'inversify';
import { injectable } from 'inversify';

@injectable()
export class JuegoViewModel {
  private readonly _personaUseCase: IPersonaUseCase;
  private readonly _mapper: IDomainToUI;

  public constructor(@inject(TYPES.IPersonaUseCase) personaUseCase: IPersonaUseCase, @inject(TYPES.IDomainToUI) mapper: IDomainToUI) {
    this._personaUseCase = personaUseCase;
    this._mapper = mapper;
    makeAutoObservable(this);
  }

  public async obtenerPersonas(): Promise<PersonaConColor[]> {
    const personasConDepartamentos = await this._personaUseCase.getPersonas();
    return personasConDepartamentos.map(p => this._mapper.transformar(p));
  }

  public verificarAciertos(personasConColor: PersonaConColor[], departamentosSeleccionados: Map<number, number>): number {
    const personasConSeleccion: PersonaConDepartamentoSeleccionado[] = [];

    personasConColor.forEach(pc => {
      const idDepartamentoSeleccionado = departamentosSeleccionados.get(pc.persona.id);
      
      if (idDepartamentoSeleccionado !== undefined) {
        const departamentoSeleccionado = pc.departamentos.find(
          d => d.id === idDepartamentoSeleccionado
        );
        
        if (departamentoSeleccionado) {
          personasConSeleccion.push(
            new PersonaConDepartamentoSeleccionado(
              pc.persona,
              departamentoSeleccionado
            )
          );
        }
      }
    });

    return this._personaUseCase.comprobarAciertos(personasConSeleccion);
  }
}