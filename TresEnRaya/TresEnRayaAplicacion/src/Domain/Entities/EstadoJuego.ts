import { makeObservable, observable, action, computed } from "mobx";
import { Jugador } from "./Jugador";

/**
 * Estado del juego con toda la lógica del tres en raya
 * Contiene validaciones, detección de ganador, etc.
 */
export class EstadoJuego {
  @observable tablero: (string | null)[] = Array(9).fill(null);
  @observable turnoActual: string = "X";
  @observable ganador: string | null = null;
  @observable juegoTerminado: boolean = false;
  @observable jugadorX: Jugador | null = null;
  @observable jugadorO: Jugador | null = null;

  constructor() {
    makeObservable(this);
  }

  /**
   * Computed: true si estamos esperando al otro jugador
   */
  @computed
  get esperandoJugador(): boolean {
    return this.jugadorX === null || this.jugadorO === null;
  }

  /**
   * Realiza un movimiento en el tablero
   * Incluye toda la validación y detección de ganador
   */
  @action
  hacerMovimiento(posicion: number, simbolo: string): boolean {
    // Validar que la posición esté vacía
    if (this.tablero[posicion] !== null) {
      console.log("⚠️ Casilla ya ocupada");
      return false;
    }

    // Validar que sea el turno correcto
    if (this.turnoActual !== simbolo) {
      console.log("⚠️ No es tu turno");
      return false;
    }

    // Validar que el juego no haya terminado
    if (this.juegoTerminado) {
      console.log("⚠️ El juego ya terminó");
      return false;
    }

    // Realizar el movimiento
    this.tablero[posicion] = simbolo;
    console.log(`✅ Movimiento realizado: ${simbolo} en posición ${posicion}`);

    // Verificar si hay ganador
    const hayGanador = this.verificarGanador(simbolo);
    if (hayGanador) {
      this.ganador = simbolo;
      this.juegoTerminado = true;
      console.log(`🏆 ¡${simbolo} ha ganado!`);
      return true;
    }

    // Verificar si hay empate
    if (this.tableroLleno()) {
      this.ganador = "Empate";
      this.juegoTerminado = true;
      console.log("🤝 ¡Empate!");
      return true;
    }

    // Cambiar turno
    this.turnoActual = this.turnoActual === "X" ? "O" : "X";
    console.log(`🔄 Turno cambiado a: ${this.turnoActual}`);

    return true;
  }

  /**
   * Verifica si un símbolo ha ganado
   */
  private verificarGanador(simbolo: string): boolean {
    // Combinaciones ganadoras
    const combinacionesGanadoras = [
      [0, 1, 2], // Fila 1
      [3, 4, 5], // Fila 2
      [6, 7, 8], // Fila 3
      [0, 3, 6], // Columna 1
      [1, 4, 7], // Columna 2
      [2, 5, 8], // Columna 3
      [0, 4, 8], // Diagonal \
      [2, 4, 6], // Diagonal /
    ];

    return combinacionesGanadoras.some((combinacion) => {
      return combinacion.every((indice) => this.tablero[indice] === simbolo);
    });
  }

  /**
   * Verifica si el tablero está lleno
   */
  private tableroLleno(): boolean {
    return this.tablero.every((casilla) => casilla !== null);
  }

  /**
   * Reinicia el juego manteniendo los jugadores
   */
  @action
  reiniciar(): void {
    this.tablero = Array(9).fill(null);
    this.turnoActual = "X";
    this.ganador = null;
    this.juegoTerminado = false;
    console.log("🔄 Juego reiniciado");
  }

  /**
   * Verifica si una casilla está vacía
   */
  casillaaVacia(posicion: number): boolean {
    return this.tablero[posicion] === null;
  }

  /**
   * Obtiene el valor de una casilla
   */
  obtenerValorCasilla(posicion: number): string | null {
    return this.tablero[posicion];
  }

  /**
   * Elimina un jugador cuando se desconecta
   */
  @action
  eliminarOponente(): void {
    // Solo reiniciar, mantener el jugador actual
    this.reiniciar();
    console.log("👋 Oponente eliminado, juego reiniciado");
  }

  /**
   * Serializa el estado a JSON
   */
  toJSON(): any {
    return {
      tablero: this.tablero,
      turnoActual: this.turnoActual,
      ganador: this.ganador,
      juegoTerminado: this.juegoTerminado,
      jugadorX: this.jugadorX?.toJSON(),
      jugadorO: this.jugadorO?.toJSON(),
    };
  }

  /**
   * Deserializa desde JSON
   */
  static fromJSON(json: any): EstadoJuego {
    const estado = new EstadoJuego();
    estado.tablero = json.tablero || Array(9).fill(null);
    estado.turnoActual = json.turnoActual || "X";
    estado.ganador = json.ganador || null;
    estado.juegoTerminado = json.juegoTerminado || false;
    estado.jugadorX = json.jugadorX ? Jugador.fromJSON(json.jugadorX) : null;
    estado.jugadorO = json.jugadorO ? Jugador.fromJSON(json.jugadorO) : null;
    return estado;
  }
}