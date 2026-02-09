import { injectable, inject } from "inversify";
import { makeObservable, observable, action, computed, runInAction } from "mobx";
import { TYPES } from "../../Core/Types";
import { IJuegoRepository, Unsubscribe } from "../../Domain/Interfaces/IJuegoRepository";
import { IJuegoUseCase } from "../../Domain/Interfaces/IJuegoUseCase";
import { EstadoJuego } from "../../Domain/Entities/EstadoJuego";
import { Jugador } from "../../Domain/Entities/Jugador";

/**
 * ViewModel del juego
 * Maneja todo el estado y la lógica de presentación
 */
@injectable()
export class JuegoViewModel {
  // Estado del juego (contiene la lógica del tres en raya)
  @observable estadoJuego: EstadoJuego = new EstadoJuego();
  
  // Estado de conexión
  @observable estaConectado: boolean = false;
  @observable estaCargando: boolean = false;
  
  // Mi información
  @observable miSimbolo: string | null = null;
  @observable miNombre: string = "Jugador";
  
  // Lista de desuscripciones
  private unsubs: Unsubscribe[] = [];
  
  // Dependencias
  private juegoRepository: IJuegoRepository;
  private juegoUseCases: IJuegoUseCase;

  constructor(
    @inject(TYPES.IJuegoRepository) juegoRepository: IJuegoRepository,
    @inject(TYPES.IJuegoUseCase) juegoUseCases: IJuegoUseCase
  ) {
    this.juegoRepository = juegoRepository;
    this.juegoUseCases = juegoUseCases;
    
    makeObservable(this);
    console.log("[GameViewModel] Creado");
  }

  /**
   * Computed: true si es mi turno
   */
  @computed
  get esMiTurno(): boolean {
    return this.estadoJuego.turnoActual === this.miSimbolo &&
           !this.estadoJuego.juegoTerminado &&
           !this.estadoJuego.esperandoJugador;
  }

  /**
   * Inicializar: conectar y unirse a la partida
   */
  @action
  async initialize(): Promise<void> {
    try {
      this.estaCargando = true;
      console.log("[GameViewModel] Inicializando...");
      
      // Conectar al servidor
      await this.connect();
      
      // Unirse a la partida
      await (this.juegoRepository as any).unirseAPartida(this.miNombre);
      console.log("[GameViewModel] Unido a la partida");
      
    } catch (error: any) {
      console.error("[GameViewModel] Error al inicializar:", error);
      throw error;
    } finally {
      this.estaCargando = false;
    }
  }

  /**
   * Conectar al servidor y configurar event listeners
   */
  @action
  private async connect(): Promise<void> {
    try {
      await this.juegoRepository.connect();
      this.estaConectado = true;
      console.log("[GameViewModel] ✅ Conectado");
      
      // Configurar event listeners
      this.configurarEventos();
      
    } catch (error) {
      console.error("[GameViewModel] ❌ Error al conectar:", error);
      this.estaConectado = false;
      throw error;
    }
  }

  /**
   * Configurar todos los event listeners
   */
  private configurarEventos(): void {
    // Jugador unido
    const unsub1 = this.juegoRepository.onJugadorUnido((event) => {
      this.manejarJugadorUnido(event);
    });
    this.unsubs.push(unsub1);

    // Partida lista (2 jugadores)
    const unsub2 = this.juegoRepository.onPartidaLista((event) => {
      this.manejarPartidaLista(event);
    });
    this.unsubs.push(unsub2);

    // Movimiento realizado
    const unsub3 = this.juegoRepository.onMovimientoRealizado((event) => {
      this.manejarMovimientoRealizado(event);
    });
    this.unsubs.push(unsub3);

    // Partida reiniciada
    const unsub4 = this.juegoRepository.onPartidaReiniciada(() => {
      this.manejarPartidaReiniciada();
    });
    this.unsubs.push(unsub4);

    // Oponente desconectado
    const unsub5 = this.juegoRepository.onOponenteDesconectado(() => {
      this.manejarOponenteDesconectado();
    });
    this.unsubs.push(unsub5);

    // Oponente salió
    const unsub6 = this.juegoRepository.onOponenteSalio(() => {
      this.manejarOponenteSalio();
    });
    this.unsubs.push(unsub6);

    console.log("[GameViewModel] Eventos configurados");
  }

  /**
   * Handler: Jugador unido
   */
  @action
  private manejarJugadorUnido(event: any): void {
    console.log("[GameViewModel] 👤 Jugador unido:", event);
    this.miSimbolo = event.simbolo;
    
    // Crear mi jugador
    const connectionId = this.juegoRepository.getConnectionId() || "";
    const jugador = new Jugador(connectionId, event.simbolo, event.nombre || this.miNombre);
    
    if (event.simbolo === "X") {
      this.estadoJuego.jugadorX = jugador;
    } else {
      this.estadoJuego.jugadorO = jugador;
    }
    
    console.log("[GameViewModel] ✅ Mi símbolo asignado:", this.miSimbolo);
    console.log("[GameViewModel] Estado actual - esperandoJugador:", this.estadoJuego.esperandoJugador);
  }

  /**
   * Handler: Partida lista (2 jugadores conectados)
   */
  @action
  private manejarPartidaLista(event: any): void {
    console.log("[GameViewModel] 🎮 Partida lista:", event);
    
    // IMPORTANTE: Cuando llega este evento, debemos asegurarnos de que
    // tenemos información de AMBOS jugadores
    // El servidor nos envía los nombres de ambos jugadores
    
    // Si no tengo jugadorX, crearlo (esto es por si acaso)
    if (!this.estadoJuego.jugadorX && event.jugadorX) {
      this.estadoJuego.jugadorX = new Jugador("", "X", event.jugadorX);
    }
    
    // Si no tengo jugadorO, crearlo (esto es por si acaso)
    if (!this.estadoJuego.jugadorO && event.jugadorO) {
      this.estadoJuego.jugadorO = new Jugador("", "O", event.jugadorO);
    }
    
    console.log("[GameViewModel] ✅ Partida lista con ambos jugadores");
    console.log("[GameViewModel] JugadorX:", this.estadoJuego.jugadorX?.nombre);
    console.log("[GameViewModel] JugadorO:", this.estadoJuego.jugadorO?.nombre);
    console.log("[GameViewModel] esperandoJugador:", this.estadoJuego.esperandoJugador);
  }

  /**
   * Handler: Movimiento realizado
   */
  @action
  private manejarMovimientoRealizado(event: any): void {
    console.log("[GameViewModel] 🎯 Movimiento realizado:", event);
    
    // Aplicar el movimiento al estado local
    // IMPORTANTE: No enviar de nuevo al servidor (evitar bucle)
    const { posicion, simbolo } = event;
    this.estadoJuego.hacerMovimiento(posicion, simbolo);
  }

  /**
   * Handler: Partida reiniciada
   */
  @action
  private manejarPartidaReiniciada(): void {
    console.log("[GameViewModel] 🔄 Partida reiniciada");
    this.estadoJuego.reiniciar();
  }

  /**
   * Handler: Oponente desconectado
   */
  @action
  private manejarOponenteDesconectado(): void {
    console.log("[GameViewModel] 👋 Oponente desconectado");
    this.estadoJuego.eliminarOponente();
    
    // Eliminar el otro jugador
    if (this.miSimbolo === "X") {
      this.estadoJuego.jugadorO = null;
    } else {
      this.estadoJuego.jugadorX = null;
    }
  }

  /**
   * Handler: Oponente salió
   */
  @action
  private manejarOponenteSalio(): void {
    console.log("[GameViewModel] 🚪 Oponente salió");
    this.manejarOponenteDesconectado();
  }

  /**
   * Manejar clic en una casilla
   */
  @action
  async manejarClicCasilla(posicion: number): Promise<void> {
    if (!this.miSimbolo) {
      console.log("[GameViewModel] ⚠️ No tienes símbolo asignado");
      return;
    }

    try {
      await this.juegoUseCases.hacerMovimiento(
        posicion,
        this.estadoJuego,
        this.miSimbolo
      );
    } catch (error) {
      console.error("[GameViewModel] Error al hacer movimiento:", error);
    }
  }

  /**
   * Reiniciar el juego
   */
  @action
  async reiniciarJuego(): Promise<void> {
    try {
      await this.juegoUseCases.reiniciarJuego();
      console.log("[GameViewModel] ✅ Juego reiniciado");
    } catch (error) {
      console.error("[GameViewModel] Error al reiniciar:", error);
    }
  }

  /**
   * Desconectar y limpiar
   */
  @action
  async disconnect(): Promise<void> {
    try {
      // Limpiar subscripciones
      this.limpiarSubscripciones();
      
      // Desconectar
      await this.juegoRepository.disconnect();
      this.estaConectado = false;
      
      console.log("[GameViewModel] Desconectado");
    } catch (error) {
      console.error("[GameViewModel] Error al desconectar:", error);
    }
  }

  /**
   * Limpiar todas las subscripciones
   */
  private limpiarSubscripciones(): void {
    this.unsubs.forEach((unsub) => unsub());
    this.unsubs = [];
    console.log("[GameViewModel] Subscripciones limpiadas");
  }
}