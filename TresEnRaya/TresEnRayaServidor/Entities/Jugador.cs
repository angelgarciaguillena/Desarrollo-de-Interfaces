namespace TresEnRayaServidor.Entities
{
    public class Jugador
    {
        #region Atributos
        private string connectionId;
        private string simbolo;
        private string nombre;
        #endregion

        #region Constructores
        public Jugador() { }

        public Jugador(string connectionId, string simbolo, string nombre)
        {
            this.connectionId = connectionId;
            this.simbolo = simbolo;
            this.nombre = nombre;
        }
        #endregion

        #region Propiedades
        public string ConnectionId
        {
            get { return connectionId; }
            set { connectionId = value; }
        }

        public string Simbolo
        {
            get { return simbolo; }
            set { simbolo = value; }
        }

        public string Nombre
        {
            get { return nombre; }
            set { nombre = value; }
        }
        #endregion

        #region Métodos
        public bool EsValido()
        {
            return !string.IsNullOrEmpty(connectionId) && !string.IsNullOrEmpty(simbolo);
        }
        #endregion
    }
}