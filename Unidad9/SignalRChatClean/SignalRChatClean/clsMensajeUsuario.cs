namespace SignalRChatClean
{
    public class clsMensajeUsuario
    {
        private string _usuario;
        private string _mensaje;

        public string usuario
        {
            get { return _usuario; }
            set { _usuario = value; }
        }

        public string mensaje
        {
            get { return _mensaje; }
            set { _mensaje = value; }
        }

        public clsMensajeUsuario()
        {
            this.usuario = string.Empty;
            this.mensaje = string.Empty;
        }

        public clsMensajeUsuario(string usuario, string mensaje)
        {
            this.usuario = usuario;
            this.mensaje = mensaje;
        }
    }
}
