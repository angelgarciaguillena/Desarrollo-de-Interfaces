import { injectable, inject } from "inversify";
import { TYPES } from "../../Core/Types";
import { JuegoConnection } from "../Database/JuegoConnection";
import {
  IJuegoRepository,
  Unsubscribe,
  JugadorUnidoEvent,
  MovimientoRealizadoEvent,
} from "../../Domain/Interfaces/IJuegoRepository";

/**
 * Implementación del repositorio de juego usando SignalR
 */
@injectable()
export class JuegoRepository implements IJuegoRepository {
  private conn: JuegoConnection;

  // Arrays de handlers para cada evento
  private jugadorUnidoHandlers: Array<(event: JugadorUnidoEvent) => void> = [];
  private partidaListaHandlers: Array<(event: any) => void> = [];
  private movimientoRealizadoHandlers: Array<(event: MovimientoRealizadoEvent) => void> = [];
  private partidaReiniciadaHandlers: Array<() => void> = [];
  private oponenteDesconectadoHandlers: Array<() => void> = [];
  private oponenteSalioHandlers: Array<() => void> = [];
  private actualizacionJugadoresHandlers: Array<(event: any) => void> = [];

  // Handlers bound para poder hacer off correctamente
  private boundJugadorUnido: any;
  private boundPartidaLista: any;
  private boundMovimientoRealizado: any;
  private boundPartidaReiniciada: any;
  private boundOponenteDesconectado: any;
  private boundOponenteSalio: any;
  private boundActualizacionJugadores: any;

  constructor(@inject(TYPES.JuegoConnection) conn: JuegoConnection) {
    this.conn = conn;
    
    // Bind de handlers
    this.boundJugadorUnido = (event: JugadorUnidoEvent) => {
      console.log("[GameRepo] Evento: JugadorUnido", event);
      this.jugadorUnidoHandlers.forEach((h) => h(event));
    };

    this.boundPartidaLista = (event: any) => {
      console.log("[GameRepo] Evento: PartidaLista", event);
      this.partidaListaHandlers.forEach((h) => h(event));
    };

    this.boundMovimientoRealizado = (event: MovimientoRealizadoEvent) => {
      console.log("[GameRepo] Evento: MovimientoRealizado", event);
      this.movimientoRealizadoHandlers.forEach((h) => h(event));
    };

    this.boundPartidaReiniciada = () => {
      console.log("[GameRepo] Evento: PartidaReiniciada");
      this.partidaReiniciadaHandlers.forEach((h) => h());
    };

    this.boundOponenteDesconectado = () => {
      console.log("[GameRepo] Evento: OponenteDesconectado");
      this.oponenteDesconectadoHandlers.forEach((h) => h());
    };

    this.boundOponenteSalio = () => {
      console.log("[GameRepo] Evento: OponenteSalio");
      this.oponenteSalioHandlers.forEach((h) => h());
    };

    this.boundActualizacionJugadores = (event: any) => {
      console.log("[GameRepo] Evento: ActualizacionJugadores", event);
      this.actualizacionJugadoresHandlers.forEach((h) => h(event));
    };
  }

  /**
   * Conectar al servidor
   */
  async connect(): Promise<void> {
    await this.conn.connect();
    
    // Registrar todos los event listeners
    this.conn.on("JugadorUnido", this.boundJugadorUnido);
    this.conn.on("PartidaLista", this.boundPartidaLista);
    this.conn.on("MovimientoRealizado", this.boundMovimientoRealizado);
    this.conn.on("PartidaReiniciada", this.boundPartidaReiniciada);
    this.conn.on("OponenteDesconectado", this.boundOponenteDesconectado);
    this.conn.on("OponenteSalio", this.boundOponenteSalio);
    this.conn.on("ActualizacionJugadores", this.boundActualizacionJugadores);
    
    console.log("[GameRepo] ✅ Listeners registrados");
  }

  async unirseAPartida(nombre: string): Promise<void> {
    await this.conn.invoke("UnirseAPartida", nombre);
  }

  /**
   * Desconectar del servidor
   */
  async disconnect(): Promise<void> {
    // Remover todos los listeners
    this.conn.off("JugadorUnido", this.boundJugadorUnido);
    this.conn.off("PartidaLista", this.boundPartidaLista);
    this.conn.off("MovimientoRealizado", this.boundMovimientoRealizado);
    this.conn.off("PartidaReiniciada", this.boundPartidaReiniciada);
    this.conn.off("OponenteDesconectado", this.boundOponenteDesconectado);
    this.conn.off("OponenteSalio", this.boundOponenteSalio);
    this.conn.off("ActualizacionJugadores", this.boundActualizacionJugadores);
    
    await this.conn.disconnect();
    console.log("[GameRepo] Desconectado");
  }

  /**
   * Verificar si está conectado
   */
  isConnected(): boolean {
    return this.conn.isConnected();
  }

  /**
   * Obtener connection ID
   */
  getConnectionId(): string | null {
    return this.conn.getConnectionId();
  }

  /**
   * Enviar un movimiento al servidor
   */
  async sendMove(posicion: number): Promise<void> {
    await this.conn.invoke("EnviarMovimiento", posicion);
  }

  /**
   * Enviar solicitud de reinicio
   */
  async sendReset(): Promise<void> {
    await this.conn.invoke("EnviarReinicio");
  }

  /**
   * Suscribirse al evento de jugador unido
   */
  onJugadorUnido(handler: (event: JugadorUnidoEvent) => void): Unsubscribe {
    this.jugadorUnidoHandlers.push(handler);
    return () => {
      const index = this.jugadorUnidoHandlers.indexOf(handler);
      if (index > -1) this.jugadorUnidoHandlers.splice(index, 1);
    };
  }

  /**
   * Suscribirse al evento de partida lista
   */
  onPartidaLista(handler: (event: { jugadorX: string; jugadorO: string }) => void): Unsubscribe {
    this.partidaListaHandlers.push(handler);
    return () => {
      const index = this.partidaListaHandlers.indexOf(handler);
      if (index > -1) this.partidaListaHandlers.splice(index, 1);
    };
  }

  /**
   * Suscribirse al evento de movimiento realizado
   */
  onMovimientoRealizado(handler: (event: MovimientoRealizadoEvent) => void): Unsubscribe {
    this.movimientoRealizadoHandlers.push(handler);
    return () => {
      const index = this.movimientoRealizadoHandlers.indexOf(handler);
      if (index > -1) this.movimientoRealizadoHandlers.splice(index, 1);
    };
  }

  /**
   * Suscribirse al evento de partida reiniciada
   */
  onPartidaReiniciada(handler: () => void): Unsubscribe {
    this.partidaReiniciadaHandlers.push(handler);
    return () => {
      const index = this.partidaReiniciadaHandlers.indexOf(handler);
      if (index > -1) this.partidaReiniciadaHandlers.splice(index, 1);
    };
  }

  /**
   * Suscribirse al evento de oponente desconectado
   */
  onOponenteDesconectado(handler: () => void): Unsubscribe {
    this.oponenteDesconectadoHandlers.push(handler);
    return () => {
      const index = this.oponenteDesconectadoHandlers.indexOf(handler);
      if (index > -1) this.oponenteDesconectadoHandlers.splice(index, 1);
    };
  }

  /**
   * Suscribirse al evento de oponente que salió
   */
  onOponenteSalio(handler: () => void): Unsubscribe {
    this.oponenteSalioHandlers.push(handler);
    return () => {
      const index = this.oponenteSalioHandlers.indexOf(handler);
      if (index > -1) this.oponenteSalioHandlers.splice(index, 1);
    };
  }

  /**
   * Suscribirse a actualización de jugadores
   */
  onActualizacionJugadores(handler: (event: { numeroJugadores: number }) => void): Unsubscribe {
    this.actualizacionJugadoresHandlers.push(handler);
    return () => {
      const index = this.actualizacionJugadoresHandlers.indexOf(handler);
      if (index > -1) this.actualizacionJugadoresHandlers.splice(index, 1);
    };
  }
}