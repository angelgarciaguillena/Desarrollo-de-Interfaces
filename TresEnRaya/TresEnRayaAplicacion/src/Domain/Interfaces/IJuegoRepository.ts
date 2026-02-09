/**
 * Tipo para desuscribirse de eventos
 */
export type Unsubscribe = () => void;

/**
 * Evento cuando un jugador se une
 */
export interface JugadorUnidoEvent {
  simbolo: string;
  nombre: string;
  numeroJugadores: number;
}

/**
 * Evento cuando se realiza un movimiento
 */
export interface MovimientoRealizadoEvent {
  posicion: number;
  simbolo: string;
}

/**
 * Interface del repositorio de juego
 * Maneja la comunicación con SignalR
 */
export interface IJuegoRepository {
  // Conexión
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  isConnected(): boolean;
  getConnectionId(): string | null;

  // Enviar acciones
  unirseAPartida(nombre: string): Promise<void>;
  sendMove(posicion: number): Promise<void>;
  sendReset(): Promise<void>;

  // Escuchar eventos
  onJugadorUnido(handler: (event: JugadorUnidoEvent) => void): Unsubscribe;
  onPartidaLista(handler: (event: { jugadorX: string; jugadorO: string }) => void): Unsubscribe;
  onMovimientoRealizado(handler: (event: MovimientoRealizadoEvent) => void): Unsubscribe;
  onPartidaReiniciada(handler: () => void): Unsubscribe;
  onOponenteDesconectado(handler: () => void): Unsubscribe;
  onOponenteSalio(handler: () => void): Unsubscribe;
  onActualizacionJugadores(handler: (event: { numeroJugadores: number }) => void): Unsubscribe;
}