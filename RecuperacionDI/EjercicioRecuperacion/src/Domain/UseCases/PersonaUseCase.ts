import { IPersonaUseCase } from '../Interfaces/IPersonaUseCase';
import { IPersonaRepository } from '../Repositories/IPersonaRepository';
import { IDepartamentoUseCase } from '../Interfaces/IDepartamentoUseCase';
import { PersonaConListadoDepartamento } from '../DTOs/PersonaConListadoDepartamento';
import { PersonaConDepartamentoSeleccionado } from '../DTOs/PersonaConDepartamentoSeleccionado';
import { IDataToDomain } from '../Mappers/IDataToDomain';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../Core/Types';

@injectable()
export class PersonaUseCase implements IPersonaUseCase {
  private readonly _personaRepository: IPersonaRepository;
  private readonly _departamentoUseCase: IDepartamentoUseCase;
  private readonly _mapper: IDataToDomain;

  public constructor(@inject(TYPES.IPersonaRepository) personaRepository: IPersonaRepository, @inject(TYPES.IDepartamentoUseCase) departamentoUseCase: IDepartamentoUseCase, @inject(TYPES.IDataToDomain) mapper: IDataToDomain) {
    this._personaRepository = personaRepository;
    this._departamentoUseCase = departamentoUseCase;
    this._mapper = mapper;
  }

  public async getPersonas(): Promise<PersonaConListadoDepartamento[]> {
    const personas = await this._personaRepository.getPersonas();
    const departamentos = await this._departamentoUseCase.getDepartamentos();

    return personas.map(persona => {
      const personaDTO = this._mapper.transformar(persona);
      return new PersonaConListadoDepartamento(personaDTO, departamentos);
    });
  }

  public comprobarAciertos(personas: PersonaConDepartamentoSeleccionado[]): number {
    let aciertos = 0;
    
    personas.forEach(p => {
      if (p.persona.idDepartamento === p.departamento.id) {
        aciertos++;
      }
    });
    
    return aciertos;
  }
}