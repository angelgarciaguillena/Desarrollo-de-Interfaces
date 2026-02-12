import * as signalR from "@microsoft/signalr";
import { inject, injectable } from "inversify";
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
  }

  /**
   * Conectar al hub
   */
  async connect(): Promise<void> {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      return;
    }

    this.connection = new signalR.HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        transport: signalR.HttpTransportType.WebSockets | 
                   signalR.HttpTransportType.ServerSentEvents | 
                   signalR.HttpTransportType.LongPolling,
        skipNegotiation: false,
      })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(signalR.LogLevel.Warning)
      .build();
      
    try {
      await this.connection.start();
    } catch (error) {
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
      } catch (error) {
        console.error("Error al desconectar:", error);
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
      return;
    }
    this.connection.on(eventName, handler);
  }

  /**
   * Desregistrar un manejador de eventos
   */
  off(eventName: string, handler: (...args: any[]) => void): void {
    if (!this.connection) return;
    this.connection.off(eventName, handler);
  }

  /**
   * Invocar un método del hub
   */
  async invoke(methodName: string, ...args: any[]): Promise<any> {
    if (!this.connection) {
      throw new Error("No hay conexión activa");
    }
    return await this.connection.invoke(methodName, ...args);
  }
}