import { Container } from "inversify";
import { TYPES } from "./Types";
import { IDepartamentoRepository } from "../Domain/Interfaces/Repositories/IDepartamentoRepository";
import { IPersonaRepository } from "../Domain/Interfaces/Repositories/IPersonaRepository";
import { PersonaRepository } from "../Data/Repositories/PersonaRepository";
import { DepartamentoRepository } from "../Data/Repositories/DepartamentoRepository";
import { IPersonaUseCase } from "../Domain/Interfaces/UseCases/IPersonaUseCase";
import { IDepartamentoUseCase } from "../Domain/Interfaces/UseCases/IDepartamentoUseCase";
import { PersonaUseCase } from "../Domain/UseCases/PersonaUseCase"
import { DepartamentoUseCase } from "../Domain/UseCases/DepartamentoUseCase";

const container = new Container();

container.bind<IPersonaRepository>(TYPES.IPersonaRepository).to(PersonaRepository);
container.bind<IDepartamentoRepository>(TYPES.IDepartamentoRepository).to(DepartamentoRepository);
container.bind<IPersonaUseCase>(TYPES.IPersonaUseCase).to(PersonaUseCase);
container.bind<IDepartamentoUseCase>(TYPES.IDepartamentoUseCase).to(DepartamentoUseCase)

export { container };