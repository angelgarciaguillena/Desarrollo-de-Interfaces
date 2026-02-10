import { injectable, inject } from "inversify";
import * as signalR from "@microsoft/signalr";
import { TYPES } from "../../Core/Types";

/**
 * Clase que maneja la conexión con SignalR
 * Singleton compartido entre todos los repositorios
 */
@injectable()
export class JuegoConnection {
  private connection: signalR.HubConnection | null = null;
  private hubUrl: string;

  constructor(@inject(TYPES.HubUrl) hubUrl: string) {
    this.hubUrl = hubUrl;
    console.log(`[SignalRConnection] Hub URL: ${hubUrl}`);  // ✅ CORREGIDO
  }

  /**
   * Conectar al hub
   */
  async connect(): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      console.log("[SignalRConnection] Ya conectado");
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        transport: signalR.HttpTransportType.WebSockets,
        skipNegotiation: true
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();
    
    try {
      await this.connection.start();
      console.log("[SignalRConnection] ✅ Conectado al hub");
    } catch (error) {
      console.error("[SignalRConnection] ❌ Error al conectar:", error);
      throw new Error("No se pudo conectar al servidor");
    }
  }

  /**
   * Desconectar del hub
   */
  async disconnect(): Promise<void> {
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log("[SignalRConnection] Desconectado");
      } catch (error) {
        console.error("[SignalRConnection] Error al desconectar:", error);
      }
      this.connection = null;
    }
  }

  /**
   * Verificar si está conectado
   */
  isConnected(): boolean {
    return this.connection?.state === signalR.HubConnectionState.Connected;
  }

  /**
   * Obtener el connection ID
   */
  getConnectionId(): string | null {
    return this.connection?.connectionId || null;
  }

  /**
   * Registrar un manejador de eventos
   */
  on(eventName: string, handler: (...args: any[]) => void): void {
    if (!this.connection) {
      console.error("[SignalRConnection] No hay conexión activa");
      return;
    }
    this.connection.on(eventName, handler);
    console.log(`[SignalRConnection] Listener registrado: ${eventName}`);  // ✅ CORREGIDO
  }

  /**
   * Desregistrar un manejador de eventos
   */
  off(eventName: string, handler: (...args: any[]) => void): void {
    if (!this.connection) return;
    this.connection.off(eventName, handler);
    console.log(`[SignalRConnection] Listener eliminado: ${eventName}`);  // ✅ CORREGIDO
  }

  /**
   * Invocar un método del hub
   */
  async invoke(methodName: string, ...args: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error("No hay conexión activa");
    }
    console.log(`[SignalRConnection] Invocando: ${methodName}`, args);  // ✅ CORREGIDO
    return await this.connection.invoke(methodName, ...args);
  }
}