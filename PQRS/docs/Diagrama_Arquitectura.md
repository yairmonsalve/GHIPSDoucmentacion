# Diagramas de Arquitectura – Gestión PQR

Este documento provee diagramas (Mermaid) para soportar auditoría: vista lógica, vista técnica y flujo de datos principal.

## 1. Vista Lógica de Componentes
```mermaid
graph TD
  U[Usuario Navegador / Dispositivo] --> FE[Frontend Ionic/Angular]
  FE -->|Registro PQRS| API_DOC[(ApiDocumentalPqrs)]
  FE -->|Aseguradoras / Autocomplete| API_GHIPS[(Api GHIPS)]
  FE -->|Config Sede| ASSETS[(Assets Config.json)]
  API_DOC --> STORAGE[(Repositorio Documental / BD PQRS)]
  API_DOC --> EMAIL[(Servicio Notificaciones)]
```

## 2. Vista Técnica / Despliegue
```mermaid
graph LR
  subgraph Client
    BROWSER[Chrome/Edge/Safari]
  end
  subgraph Infraestructura
    CDN[(CDN Opcional)] --> IIS[IIS / Hosting Web]
    IIS --> WWW[(Carpeta www - Build Angular)]
    IIS --> LOGS[(Logs de Acceso/Errores)]
    IIS --> API_GATEWAY[(Balanceador / Gateway)]
  end
  API_GATEWAY --> API_DOC[ApiDocumentalPqrs]
  API_GATEWAY --> API_GHIPS[Api GHIPS]
  API_DOC --> DB[(DB PQRS / Documental)]
  API_DOC --> FS[(Almacenamiento Archivos)]
  API_DOC --> MON[Monitoreo / APM]
```

## 3. Flujo de Registro PQRS
```mermaid
sequenceDiagram
  participant U as Usuario
  participant FE as Frontend Angular
  participant DOC as ApiDocumentalPqrs
  participant FS as Almacenamiento Archivos

  U->>FE: Completa formulario + Captcha
  FE->>DOC: POST SaveSolicitud (JSON)
  DOC-->>FE: Radicado + IdSolicitud
  alt Con adjunto
    FE->>DOC: POST SaveFile(FormData)
    DOC->>FS: Guarda archivo
    DOC-->>FE: Confirmación
  end
  FE->>U: SweetAlert éxito con Radicado
```

## 4. Flujo de Consulta Estado
```mermaid
sequenceDiagram
  participant U as Usuario
  participant FE as Frontend
  participant DOC as ApiDocumentalPqrs

  U->>FE: Ingresa Radicado
  FE->>DOC: GET GetEstadoRadicado
  DOC-->>FE: Estado
  FE->>U: Muestra estado (modal)
```

## 5. Flujo de Encuesta de Satisfacción
```mermaid
sequenceDiagram
  participant U as Usuario
  participant FE as Frontend
  participant DOC as ApiDocumentalPqrs

  U->>FE: Accede con hash srqp
  FE->>DOC: GET GetEnrutamiento(hash)
  DOC-->>FE: Datos Solicitud + flag encuesta
  U->>FE: Responde switches y comentario
  FE->>DOC: GET SetRespuestasEncuesta(...)
  DOC-->>FE: Confirmación
  FE->>U: SweetAlert gracias
```

## 6. Diagrama Simplificado de Datos
```mermaid
classDiagram
  class SolicitudPqrs {
    +number Id
    +number IdSede
    +number TipoPqrs
    +string Comentario
    +bool AceptaPoliticaDatos
    +string AdjuntosString
    +File ArchivoCompleto
    +string EmailResponder
  }
  class Solicitante {
    +string PrimerNombre
    +string SegundoNombre
    +string PrimerApellido
    +string SegundoApellido
    +number TipoDocumento
    +string Identificacion
    +string CorreoElectronico
    +string DireccionResidencia
    +bool Acompanante
    +bool Atendido
    +Date FechaNacimiento
  }
  SolicitudPqrs --> "1..*" Solicitante : contiene
  SolicitudPqrs --> "0..1" Adjunto : adjunta
  class Adjunto {
    +string NombreArchivo
    +string Extension
    +number Size
    +string Procedencia
  }
```

## 7. Notas y Suposiciones
- Backend maneja validaciones adicionales, seguridad avanzada y persistencia.
- El captcha actual es sólo cliente; recomendable validación server-side o reCAPTCHA.
- SetRespuestasEncuesta debería ser POST para mayor semántica y seguridad (evitar datos sensibles en URL).

## 8. Próximas Mejoras (Diagramas)
- Añadir diagrama de secuencia para manejo de errores (HTTP 4xx/5xx).
- Diagrama de despliegue extendido con zonas/replicas y CDN.
- Diagramas de proceso para pipeline CI/CD y blue/green.

---
Fin de los diagramas.
