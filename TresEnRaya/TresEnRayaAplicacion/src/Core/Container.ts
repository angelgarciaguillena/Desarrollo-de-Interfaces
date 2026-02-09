import { Container } from "inversify";
import "reflect-metadata";
import { TYPES } from "./Types";
import { JuegoConnection } from "../Data/Database/JuegoConnection";
import { JuegoRepository } from "../Data/Repositories/JuegoRepository";
import { IJuegoRepository } from "../Domain/Interfaces/IJuegoRepository";
import { JuegoUseCase } from "../Domain/UseCases/JuegoUseCase";
import { IJuegoUseCase } from "../Domain/Interfaces/IJuegoUseCase";
import { JuegoViewModel } from "../UI/ViewModels/JuegoViewModel";

// IMPORTANTE: Cambiar esta IP por la de tu máquina
const HUB_URL = "http://192.168.1.17:7004/gamehub";

const container = new Container();

container.bind<string>(TYPES.HubUrl).toConstantValue(HUB_URL);

container.bind<JuegoConnection>(TYPES.JuegoConnection).to(JuegoConnection).inSingletonScope();

container.bind<IJuegoRepository>(TYPES.IJuegoRepository).to(JuegoRepository).inSingletonScope();

container.bind<IJuegoUseCase>(TYPES.IJuegoUseCase).to(JuegoUseCase);

container.bind<JuegoViewModel>(TYPES.JuegoViewModel).to(JuegoViewModel);

export { container };