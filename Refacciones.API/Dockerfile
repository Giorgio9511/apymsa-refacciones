# Etapa 1 — compilar
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copiar los proyectos
COPY ["Refacciones.API/Refacciones.API.csproj", "Refacciones.API/"]
COPY ["Refacciones.Application/Refacciones.Application.csproj", "Refacciones.Application/"]
COPY ["Refacciones.Domain/Refacciones.Domain.csproj", "Refacciones.Domain/"]
COPY ["Refacciones.Infrastructure/Refacciones.Infrastructure.csproj", "Refacciones.Infrastructure/"]

# Restaurar dependencias
RUN dotnet restore "Refacciones.API/Refacciones.API.csproj"

# Copiar todo y compilar
COPY . .
WORKDIR "/src/Refacciones.API"
RUN dotnet build -c Release -o /app/build

# Etapa 2 — publicar
FROM build AS publish
RUN dotnet publish -c Release -o /app/publish

# Etapa 3 — imagen final
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Refacciones.API.dll"]