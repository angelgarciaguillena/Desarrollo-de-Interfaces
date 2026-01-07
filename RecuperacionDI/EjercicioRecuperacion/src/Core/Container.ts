import { Container } from "inversify";
import { TYPES } from "./Types";
import { IPersonaRepository } from "../Domain/Repositories/IPersonaRepository";
import { PersonaRepository } from "../Data/Repositories/PersonaRepository";
import { IDepartamentoRepository } from "../Domain/Repositories/IDepartamentoRepository";
import { DepartamentoRepository } from "../Data/Repositories/DepartamentoRepository";
import { IPersonaUseCase } from "../Domain/Interfaces/IPersonaUseCase";
import { PersonaUseCase } from "../Domain/UseCases/PersonaUseCase";
import { IDepartamentoUseCase } from "../Domain/Interfaces/IDepartamentoUseCase";
import { DepartamentoUseCase } from "../Domain/UseCases/DepartamentoUseCase";
import { IDataToDomain } from "../Domain/Mappers/IDataToDomain";
import { DataToDomain } from "../Domain/Mappers/DataToDomain";
import { IDomainToUI } from "../UI/Mappers/IDomainToUI";
import { DomainToUI } from "../UI/Mappers/DomainToUI";
import { JuegoViewModel } from "../UI/ViewModels/JuegoViewModel";

const container = new Container();

container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepository);
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepository);
container.bind<IPersonaUseCase>(TYPES.IPersonaUseCase).to(PersonaUseCase);
container.bind<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase).to(DepartamentoUseCase);
container.bind<IDataToDomain>(TYPES.IDataToDomain).to(DataToDomain);
container.bind<IDomainToUI>(TYPES.IDomainToUI).to(DomainToUI);
container.bind<JuegoViewModel>(TYPES.JuegoViewModel).to(JuegoViewModel);

export { container };