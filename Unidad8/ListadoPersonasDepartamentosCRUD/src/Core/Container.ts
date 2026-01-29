import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./Types";

import { BaseApi } from "../Data/API/BaseApi";
import { IPersonaApi } from "../Domain/Interfaces/APIs/IPersonaApi";
import { PersonaApi } from "../Data/API/PersonaApi";
import { IDepartamentoApi } from "../Domain/Interfaces/APIs/IDepartamentoApi";
import { DepartamentoApi } from "../Data/API/DepartamentoApi";
import { IPersonaRepository } from "../Domain/Interfaces/Repositories/IPersonaRepository";
import { PersonaRepository } from "../Data/Repositories/PersonaRepository";
import { IDepartamentoRepository } from "../Domain/Interfaces/Repositories/IDepartamentoRepository";
import { DepartamentoRepository } from "../Data/Repositories/DepartamentoRepository";
import { IPersonaUseCase } from "../Domain/Interfaces/UseCases/IPersonaUseCase";
import { PersonaUseCase } from "../Domain/UseCases/PersonaUseCase";
import { IDepartamentoUseCase } from "../Domain/Interfaces/UseCases/IDepartamentoUseCase";
import { DepartamentoUseCase } from "../Domain/UseCases/DepartamentoUseCase";
import { PersonaViewModel } from "../UI/ViewModels/PersonaViewModel";
import { DepartamentoViewModel } from "../UI/ViewModels/DepartamentoViewModel";
import { IDomainToUI } from "../UI/Mappers/IDomainToUI";
import { DomainToUI } from "../UI/Mappers/DomainToUI";

const container = new Container();

// Base
container.bind<BaseApi>(TYPES.BaseApi).to(BaseApi).inSingletonScope();

// APIs
container.bind<IPersonaApi>(TYPES.IPersonaApi).to(PersonaApi).inSingletonScope();
container.bind<IDepartamentoApi>(TYPES.IDepartamentoApi).to(DepartamentoApi).inSingletonScope();

// Repositories
container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepository).inSingletonScope();
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepository).inSingletonScope();

// Use Cases
container.bind<IPersonaUseCase>(TYPES.IPersonaUseCase).to(PersonaUseCase);
container.bind<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase).to(DepartamentoUseCase);

// ViewModels
container.bind<PersonaViewModel>(TYPES.PersonaViewModel).to(PersonaViewModel).inSingletonScope();
container.bind<DepartamentoViewModel>(TYPES.DepartamentoViewModel).to(DepartamentoViewModel).inSingletonScope();

// Mappers
container.bind<IDomainToUI>(TYPES.IDomainToUI).to(DomainToUI).inSingletonScope();

export { container };