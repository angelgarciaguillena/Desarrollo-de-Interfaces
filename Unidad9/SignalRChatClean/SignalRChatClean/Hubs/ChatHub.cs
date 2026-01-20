using Microsoft.AspNetCore.SignalR;

namespace SignalRChatClean.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(clsMensajeUsuario mensajeUsuario)
        {
            await Clients.All.SendAsync("ReceiveMessage", mensajeUsuario);
        }
    }
}