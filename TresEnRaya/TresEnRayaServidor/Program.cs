using TresEnRayaServidor.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.SetIsOriginAllowed(_ => true) // Permite cualquier origen (desarrollo)
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true; // Solo para desarrollo
    options.KeepAliveInterval = TimeSpan.FromSeconds(10); // Mantener conexión viva
    options.ClientTimeoutInterval = TimeSpan.FromSeconds(30); // Timeout del cliente
});

builder.Services.AddRazorPages();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseCors("AllowAll");
app.UseWebSockets();
app.UseRouting();

app.MapRazorPages();
app.MapHub<GameHub>("/gamehub");

app.MapGet("/", () => "Servidor de Tres en Raya funcionando. Hub: /gamehub");

app.Run();
