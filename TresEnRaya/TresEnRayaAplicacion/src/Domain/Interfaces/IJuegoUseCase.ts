import { EstadoJuego } from "../Entities/EstadoJuego";

/**
 * Interface de casos de uso del juego
 * Contiene la lógica de negocio
 */
export interface IJuegoUseCase {
  /**
   * Realizar un movimiento
   * Valida y ejecuta el movimiento en el estado del juego
   */
  hacerMovimiento(
    posicion: number,
    estadoJuego: EstadoJuego,
    miSimbolo: string
  ): Promise<boolean>;

  /**
   * Reiniciar el juego
   */
  reiniciarJuego(): Promise<void>;
}