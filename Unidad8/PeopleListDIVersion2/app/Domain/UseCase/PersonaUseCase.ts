import { injectable, inject } from "inversify";
import { Persona } from "../../Domain/Entities/Persona";
import { IRepositoryPersonas } from "../../Data/Repositories/personasRepository";
import { TYPES } from "../../Core/types";

@injectable()
export class PersonaUseCase {
    private repositoryPersonas: IRepositoryPersonas;

    constructor(@inject(TYPES.IRepositoryPersonas)repositoryPersonas: IRepositoryPersonas) {
        this.repositoryPersonas = repositoryPersonas;
    }

    async execute(): Promise<Persona[]> {
        return this.repositoryPersonas.getListadoCompletoPersonas();
    }
}