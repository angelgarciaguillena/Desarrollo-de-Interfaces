import { PersonaDTO } from "../../Domain/DTOs/PersonaDTO";
import { PersonaConIcono } from "../Models/PersonaConIcono";

export interface IDomainToUI {
  transformar(persona: PersonaDTO): PersonaConIcono;
}