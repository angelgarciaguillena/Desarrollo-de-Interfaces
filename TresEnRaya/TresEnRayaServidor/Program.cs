using TresEnRayaServidor.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactNative", policy =>
    {
        policy.AllowAnyHeader()
              .AllowAnyMethod()
              .SetIsOriginAllowed((host) => true) // Permite cualquier origen (ideal para apps móviles)
              .AllowCredentials();               // Obligatorio para SignalR
    });
});

var app = builder.Build();

app.UseWebSockets();
app.UseCors("AllowReactNative");


if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapRazorPages();
app.MapHub<GameHub>("/gamehub");

app.MapGet("/", () => "Servidor de Tres en Raya funcionando. Hub: /gamehub");

app.Run();
