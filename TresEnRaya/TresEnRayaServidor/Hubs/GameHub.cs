using Microsoft.AspNetCore.SignalR;
using TresEnRayaServidor.Aplicacion;

namespace TresEnRayaServidor.Hubs
{
    public class GameHub : Hub
    {
        /// <summary>
        /// Se ejecuta cuando un cliente se conecta
        /// </summary>
        public override async Task OnConnectedAsync()
        {
            Console.WriteLine($"[GameHub] Cliente conectado: {Context.ConnectionId}");
            await base.OnConnectedAsync();
        }

        /// <summary>
        /// Se ejecuta cuando un cliente se desconecta
        /// </summary>
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            Console.WriteLine($"[GameHub] Cliente desconectado: {Context.ConnectionId}");

            // Obtener símbolo antes de eliminar
            var simbolo = EstadoJuego.ObtenerSimboloJugador(Context.ConnectionId);

            // Eliminar del estado global
            EstadoJuego.EliminarJugador(Context.ConnectionId);

            // Notificar al otro jugador si había uno
            if (simbolo != null)
            {
                Console.WriteLine($"[GameHub] Jugador {simbolo} se desconectó");
                await Clients.AllExcept(Context.ConnectionId).SendAsync("OponenteDesconectado");
            }

            await base.OnDisconnectedAsync(exception);
        }

        /// <summary>
        /// Permite a un jugador unirse a la partida
        /// </summary>
        public async Task UnirseAPartida(string nombreJugador = "Jugador")
        {
            // Intentar agregar jugador al estado global
            var simbolo = EstadoJuego.AgregarJugador(Context.ConnectionId, nombreJugador);

            if (simbolo == null)
            {
                // Partida llena
                Console.WriteLine($"[GameHub] Partida llena, rechazando a {nombreJugador}");
                await Clients.Caller.SendAsync("ErrorUnirse", "La partida ya está llena");
                return;
            }

            Console.WriteLine($"[GameHub] {nombreJugador} se unió como {simbolo}");

            // Notificar al jugador que se unió
            await Clients.Caller.SendAsync("JugadorUnido", new
            {
                simbolo = simbolo,
                nombre = nombreJugador,
                numeroJugadores = EstadoJuego.NumeroJugadores
            });

            // Notificar a todos sobre el cambio
            await Clients.All.SendAsync("ActualizacionJugadores", new
            {
                numeroJugadores = EstadoJuego.NumeroJugadores
            });

            // Si ahora hay 2 jugadores, notificar que la partida está lista
            if (EstadoJuego.PartidaLlena())
            {
                var (nombreX, nombreO) = EstadoJuego.ObtenerNombresJugadores();
                await Clients.All.SendAsync("PartidaLista", new
                {
                    jugadorX = nombreX,
                    jugadorO = nombreO
                });
            }
        }

        /// <summary>
        /// Retransmite un movimiento a todos los clientes
        /// NO valida el movimiento, solo lo retransmite
        /// </summary>
        public async Task EnviarMovimiento(int posicion)
        {
            Console.WriteLine($"[GameHub] Retransmitiendo movimiento en posición {posicion}");

            // Obtener el símbolo del jugador que envió el movimiento
            var simbolo = EstadoJuego.ObtenerSimboloJugador(Context.ConnectionId);

            if (simbolo == null)
            {
                Console.WriteLine($"[GameHub] Movimiento rechazado: jugador no encontrado");
                return;
            }

            // Retransmitir a TODOS los clientes (incluido el emisor)
            await Clients.All.SendAsync("MovimientoRealizado", new
            {
                posicion = posicion,
                simbolo = simbolo
            });
        }

        /// <summary>
        /// Retransmite la solicitud de reinicio a todos los clientes
        /// </summary>
        public async Task EnviarReinicio()
        {
            Console.WriteLine($"[GameHub] Retransmitiendo reinicio de partida");
            await Clients.All.SendAsync("PartidaReiniciada");
        }

        /// <summary>
        /// Permite a un jugador salir de la partida
        /// </summary>
        public async Task SalirDePartida()
        {
            var simbolo = EstadoJuego.ObtenerSimboloJugador(Context.ConnectionId);

            if (simbolo != null)
            {
                Console.WriteLine($"[GameHub] Jugador {simbolo} salió de la partida");
                EstadoJuego.EliminarJugador(Context.ConnectionId);

                // Notificar a todos
                await Clients.AllExcept(Context.ConnectionId).SendAsync("OponenteSalio");
                await Clients.All.SendAsync("ActualizacionJugadores", new
                {
                    numeroJugadores = EstadoJuego.NumeroJugadores
                });
            }
        }
    }
}