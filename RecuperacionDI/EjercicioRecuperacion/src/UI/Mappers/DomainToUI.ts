import { IDomainToUI } from './IDomainToUI';
import { PersonaConListadoDepartamento } from '../../Domain/DTOs/PersonaConListadoDepartamento';
import { PersonaConColor } from '../Models/PersonaConColor';
import { injectable } from 'inversify';

@injectable()
export class DomainToUI implements IDomainToUI {
  private colores: string[] = [
    '#FFB6C1', // Rosa claro
    '#87CEEB', // Azul cielo
    '#98FB98', // Verde pálido
    '#FFD700', // Dorado
    '#DDA0DD', // Ciruela
    '#F0E68C', // Caqui
    '#FF6B6B', // Rojo coral
    '#4ECDC4', // Turquesa
    '#95E1D3', // Menta
    '#FFA07A'  // Salmón
  ];

  public transformar(persona: PersonaConListadoDepartamento): PersonaConColor {
    const idDepartamento = persona.persona.idDepartamento;
    const colorIndex = (idDepartamento - 1) % this.colores.length;
    const color = this.colores[colorIndex];

    return new PersonaConColor(persona.persona, persona.listadoDepartamentos, color);
  }
}