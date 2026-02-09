import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/Types";
import { IJuegoUseCase } from "../Interfaces/IJuegoUseCase";
import { IJuegoRepository } from "../Interfaces/IJuegoRepository";
import { EstadoJuego } from "../Entities/EstadoJuego";

/**
 * Implementación de los casos de uso del juego
 */
@injectable()
export class JuegoUseCase implements IJuegoUseCase {
  private juegoRepository: IJuegoRepository;

  constructor(@inject(TYPES.IJuegoRepository) juegoRepository: IJuegoRepository) {
    this.juegoRepository = juegoRepository;
  }

  /**
   * Hacer un movimiento
   * Valida en el cliente y luego envía al servidor
   */
  async hacerMovimiento(
    posicion: number,
    estadoJuego: EstadoJuego,
    miSimbolo: string
  ): Promise<boolean> {
    console.log(`[UseCase] Intentando movimiento: posición=${posicion}, símbolo=${miSimbolo}`);

    // Validación: verificar que sea mi turno
    if (estadoJuego.turnoActual !== miSimbolo) {
      console.log("[UseCase] ❌ No es tu turno");
      return false;
    }

    // Validación: verificar que la casilla esté vacía
    if (!estadoJuego.casillaaVacia(posicion)) {
      console.log("[UseCase] ❌ Casilla ocupada");
      return false;
    }

    // Validación: verificar que el juego no haya terminado
    if (estadoJuego.juegoTerminado) {
      console.log("[UseCase] ❌ Juego terminado");
      return false;
    }

    // Realizar el movimiento localmente
    const exito = estadoJuego.hacerMovimiento(posicion, miSimbolo);
    
    if (exito) {
      // Enviar al servidor para sincronizar con el otro jugador
      try {
        await this.juegoRepository.sendMove(posicion);
        console.log("[UseCase] ✅ Movimiento enviado al servidor");
        return true;
      } catch (error) {
        console.error("[UseCase] ❌ Error al enviar movimiento:", error);
        return false;
      }
    }

    return false;
  }

  /**
   * Reiniciar el juego
   */
  async reiniciarJuego(): Promise<void> {
    console.log("[UseCase] Solicitando reinicio de juego");
    try {
      await this.juegoRepository.sendReset();
      console.log("[UseCase] ✅ Reinicio solicitado");
    } catch (error) {
      console.error("[UseCase] ❌ Error al reiniciar:", error);
      throw error;
    }
  }
}