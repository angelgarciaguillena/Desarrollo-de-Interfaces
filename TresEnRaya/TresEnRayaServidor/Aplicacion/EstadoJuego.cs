namespace TresEnRayaServidor.Aplicacion
{
    public static class EstadoJuego
    {
        // Lock para thread-safety
        private static readonly object _lock = new object();

        // Jugadores conectados
        private static Entities.Jugador? _jugadorX = null;
        private static Entities.Jugador? _jugadorO = null;

        /// <summary>
        /// Número de jugadores actualmente conectados
        /// </summary>
        public static int NumeroJugadores
        {
            get
            {
                lock (_lock)
                {
                    int count = 0;
                    if (_jugadorX != null) count++;
                    if (_jugadorO != null) count++;
                    return count;
                }
            }
        }

        /// <summary>
        /// Obtiene el jugador X
        /// </summary>
        public static Entities.Jugador? ObtenerJugadorX()
        {
            lock (_lock)
            {
                return _jugadorX;
            }
        }

        /// <summary>
        /// Obtiene el jugador O
        /// </summary>
        public static Entities.Jugador? ObtenerJugadorO()
        {
            lock (_lock)
            {
                return _jugadorO;
            }
        }

        /// <summary>
        /// Intenta agregar un jugador
        /// Retorna el símbolo asignado ("X" o "O") o null si la partida está llena
        /// </summary>
        public static string? AgregarJugador(string connectionId, string nombre)
        {
            lock (_lock)
            {
                // Verificar si el jugador ya está conectado
                if (_jugadorX?.ConnectionId == connectionId || _jugadorO?.ConnectionId == connectionId)
                {
                    // Jugador ya existe, retornar su símbolo
                    return _jugadorX?.ConnectionId == connectionId ? "X" : "O";
                }

                // Asignar como X si está libre
                if (_jugadorX == null)
                {
                    _jugadorX = new Entities.Jugador(connectionId, "X", nombre);
                    Console.WriteLine($"[EstadoJuego] Jugador X agregado: {nombre} ({connectionId})");
                    return "X";
                }

                // Asignar como O si está libre
                if (_jugadorO == null)
                {
                    _jugadorO = new Entities.Jugador(connectionId, "O", nombre);
                    Console.WriteLine($"[EstadoJuego] Jugador O agregado: {nombre} ({connectionId})");
                    return "O";
                }

                // Partida llena
                Console.WriteLine($"[EstadoJuego] Partida llena, rechazando a {nombre}");
                return null;
            }
        }

        /// <summary>
        /// Elimina un jugador por su ConnectionId
        /// </summary>
        public static void EliminarJugador(string connectionId)
        {
            lock (_lock)
            {
                if (_jugadorX?.ConnectionId == connectionId)
                {
                    Console.WriteLine($"[EstadoJuego] Eliminando jugador X: {_jugadorX.Nombre}");
                    _jugadorX = null;
                }
                else if (_jugadorO?.ConnectionId == connectionId)
                {
                    Console.WriteLine($"[EstadoJuego] Eliminando jugador O: {_jugadorO.Nombre}");
                    _jugadorO = null;
                }
            }
        }

        /// <summary>
        /// Obtiene el símbolo de un jugador por su ConnectionId
        /// </summary>
        public static string? ObtenerSimboloJugador(string connectionId)
        {
            lock (_lock)
            {
                if (_jugadorX?.ConnectionId == connectionId) return "X";
                if (_jugadorO?.ConnectionId == connectionId) return "O";
                return null;
            }
        }

        /// <summary>
        /// Verifica si la partida está llena (2 jugadores)
        /// </summary>
        public static bool PartidaLlena()
        {
            lock (_lock)
            {
                return _jugadorX != null && _jugadorO != null;
            }
        }

        /// <summary>
        /// Limpia todo el estado (útil para reiniciar)
        /// </summary>
        public static void Limpiar()
        {
            lock (_lock)
            {
                _jugadorX = null;
                _jugadorO = null;
                Console.WriteLine("[EstadoJuego] Estado limpiado");
            }
        }

        /// <summary>
        /// Obtiene información de ambos jugadores
        /// </summary>
        public static (string? nombreX, string? nombreO) ObtenerNombresJugadores()
        {
            lock (_lock)
            {
                return (_jugadorX?.Nombre, _jugadorO?.Nombre);
            }
        }
    }
}
