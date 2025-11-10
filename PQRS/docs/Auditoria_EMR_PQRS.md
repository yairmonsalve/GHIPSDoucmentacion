# Documentación de Auditoría – Gestión PQR (Frontend Ionic/Angular)

Este documento responde a los requerimientos de auditoría solicitados. Cubre arquitectura, componentes, datos, seguridad, interoperabilidad, métricas, escalabilidad, monitoreo, extensibilidad y procedimientos operativos.

Nota: Este repositorio contiene el frontend (Ionic/Angular). Las capacidades backend (APIs, BD, protocolos clínicos) dependen de servicios externos: environment.apiDocumentalUrl y environment.apiGhips.

---

## 1. Arquitectura – Visión general

- Tipo: Aplicación web móvil (SPA/PWA) construida con Angular 16 + Ionic 7.
- Capas:
  - Presentación: Ionic/Angular (módulos: Tabs, páginas Tab1 crear PQRS, Tab2 consulta, Tab3 encuesta; Shared header; utilities).
  - Integración: Consumo de servicios REST JSON expuestos por:
    - apiDocumentalUrl (módulo documental PQRS: creación, adjuntos, enums, estados).
    - apiGhips (búsqueda de aseguradoras/autocomplete).
  - Contenido estático: assets/ (iconos, imágenes, Config.json de sede y política de datos).
- Despliegue: Build Angular produce carpeta www; web.config indica hosting en IIS con redirección a HTTPS y rewrite de rutas.

Diagrama (texto):
Usuario → Navegador/Ionic → Frontend Angular → (REST) → ApiDocumentalPqrs → Repositorio documental/BD
                                                 ↘ (REST) → Api GHIPS (aseguradoras)

## 2. Arquitectura y componentes de la aplicación (EMR relacionado)

- Módulos/páginas principales:
  - Tabs (router principal con 3 tabs):
    - Tab1 – Crear PQRS: formulario reactivo completo, adjuntos, captcha, aceptación de políticas.
    - Tab2 – Consultar estado: consulta por radicado, muestra estado vía modal.
    - Tab3 – Encuesta de satisfacción: recibe hash de enrutamiento, muestra switches y textarea, persiste respuesta.
  - Shared: Header (banner y aviso de ambiente de pruebas según environment.production).
  - Services: PrincipalService (HTTP a APIs), GeneralService (lee assets/RepositorioSede/Config.json).
  - Utils: MensajesAlertas (SweetAlert2), enums, validators (custom).

## 3. Documentación técnica de la solución

- Frameworks/lenguajes/librerías
  - Angular 16 (core, router, forms, http)
  - Ionic 7 (componentes UI y mobile-ready)
  - TypeScript 5
  - RxJS 7.8
  - SweetAlert2 11 (alertas)
  - @ng-select/ng-select 11 (select mejorado)
  - Capacitor 5 (configuración para apps móviles/híbridas)
- Estructura
  - app-routing y tabs-routing para carga perezosa de páginas.
  - FormBuilder/ReactiveForms para validación.
  - HttpClientModule global.
  - Angular CLI config en angular.json; presupuestos de bundles.
  - Azure Pipelines: Node 18, npm install + build.

## 4. Especificación de frameworks, lenguajes y librerías utilizadas (con versiones)

- Angular: ^16.0.0 (core, forms, router, platform-browser…)
- Ionic Angular: ^7.0.0
- TypeScript: ~5.0.2
- RxJS: ~7.8.0
- zone.js: ~0.13.0
- @ng-select/ng-select: ^11.0.0
- SweetAlert2: ^11.7.12
- Capacitor: core 5.0.3, cli 5.0.3, plugins app/haptics/keyboard/status-bar 5.0.x
- Herramientas: @angular-devkit/build-angular ^16, @angular-eslint ^16, karma/jasmine.

## 5. Arquitectura y modelo de datos (frontend)

- Entidades inferidas por el frontend y payloads de APIs:
  - Solicitud PQRS
    - Id, IdSede, TipoPqrs, TipoSolicitudPqrs/TipoQuejaPqrs/TipoReclamoPqrs/TipoSugerenciaPqrs
    - Comentario (<=2000)
    - Solicitantes: arreglo con datos personales y contacto (Atendido/Acompañante, EPS, fecha nacimiento)
    - AceptaPoliticaDatos (bool)
    - AdjuntosString (metadata JSON), ArchivoCompleto (File)
    - EmailResponder
  - Adjunto (cliente): nombre, extension, size, procedencia
  - Enums remotos: TipoDocumento, TipoPqrs, TipoSolicitud, TipoQueja, TipoReclamo/Riesgo, TipoSugerencia, MedioRespuesta
- Validaciones UI: required, email, maxLength, reglas contextuales según TipoPqrs.
- Nota: Persistencia y modelo físico están en el backend (no en este repo).

## 6. Analítica – Herramientas/módulos incluidos

- No se observa módulo de analítica/telemetría en el frontend.
- Recomendación: Integrar un servicio de analítica (p.ej., Google Analytics 4 o Azure App Insights) para eventos de envío, estados de error, tiempos de respuesta.

## 7. Indicadores y métricas (monitoreo, capacidad, desempeño, calidad, utilización)

Frontend (propuestos):
- Disponibilidad de la app (uptime del hosting)
- Latencia de llamadas a ApiDocumental/ApiGhips (p95/p99)
- Tasa de errores HTTP (por endpoint y versión)
- Tiempos de carga inicial (LCP, TTI, bundle size)
- Uso de funcionalidades (envíos PQR, consultas, encuestas)
- Tamaño y tiempo de subida de adjuntos

Backend (propuestos, fuera de repo):
- Tiempo de procesamiento SaveSolicitud y SaveFile
- Capacidad de concurrencia y consumo de CPU/memoria
- Colas de procesamiento documental si aplica

## 8. Arquitectura técnica y ambientes requeridos

- Ambientes (environments):
  - development/test: environment.ts / environment.test.ts
    - apiDocumentalUrl: local/testing
    - apiGhips: apitesting.ghips.co
  - producción: environment.prod.ts
    - apiDocumentalUrl: documental.ghips.co/ApiDocumentalPqrs
    - apiGhips: api.ghips.co/Api
- Hosting: IIS (web.config con HTTPS redirect + SPA rewrite).
- Node 18 en CI, npm + Angular CLI para build, salida en www.

## 9. Capacidades en desarrollo/automatización/analítica avanzada/IA/IoT

- Actual: No hay IA/IoT ni analítica avanzada en el frontend.
- Oportunidades:
  - Clasificación automática de PQRS (ML) en backend; UI puede mostrar categoría sugerida.
  - Asistentes de texto para mejorar descripción del caso (IA). 
  - Detección de duplicados / fraude.

## 10. Casos de uso implementados o planificados con tecnologías emergentes

- Implementados: Captcha de accesibilidad con text-to-speech (SpeechSynthesis API) como anti-bot básico.
- Planificados: Integración reCAPTCHA v2/enterprise (validación server-side) y JWT/OAuth2 para flujos autenticados si el roadmap lo contempla.

## 11. Interoperabilidad clínica y administrativa

- Estado: Este módulo gestiona PQRS y no expone protocolos clínicos (HL7/FHIR) desde el frontend.
- Integración disponible: REST JSON hacia APIs internas de GHIPS y documental.
- Futuro: Si el backend mapea PQRS con entidades clínicas, documentar perfiles FHIR/terminologías; desde frontend sólo se consumirían endpoints REST.

## 12. Arquitectura y flujos de información

- Flujos principales:
  - Crear PQRS: formulario → validación → SaveSolicitud → (opcional) SaveFile → confirmación con radicado.
  - Consultar estado: radicado → GetEstadoRadicado → modal con estado.
  - Encuesta: hash srqp → GetEnrutamiento → setRespuestasEncuesta.
- Configuración de sede/políticas: se lee assets/RepositorioSede/Config.json (enlace a política de datos, procuraduría).

## 13. Servicios/capacidades de integración disponibles

- REST sobre HTTPS:
  - apiDocumentalUrl:
    - GetTipoDocSolicitanteEnum, GetTipoPqrsEnum, GetTipoSolicitudPqrsEnum, GetTipoQuejaPqrsEnum, GetTipoRiesgoPqrsEnum, GetTipoSugerenciaPqrsEnum, GetMedioRespuestaEnum, GetSedeGhips
    - SaveSolicitud (POST)
    - SaveFile (POST multipart)
    - GetEstadoRadicado (GET)
    - SetRespuestasEncuesta (GET – considerar cambiar a POST)
    - GetEnrutamiento (GET)
  - apiGhips:
    - GetAseguradoras (GET)
    - ConsultarListaAutocomplete/{filtro} (GET)

## 14. Protocolos utilizados (HL7, FHIR, etc.)

- No aplican en el frontend actual. El consumo es REST JSON propietario.
- Si el backend expone FHIR/HL7, el frontend podría integrarse vía REST/SMART on FHIR (no implementado aquí).

## 15. Extensibilidad y personalización

- Modularización por páginas y módulos compartidos.
- Theming con Ionic variables y SCSS global.
- Environments parametrizan endpoints por ambiente.
- ng-select permite custom UI para listas grandes.
- Potencial: Interceptores HTTP para autenticación, cache y manejo de errores.

## 16. Seguridad y privacidad

Implementado en frontend:
- Redirección a HTTPS vía web.config.
- Validaciones de formularios y longitudes.
- Captcha visual con distorsión y opción “Escuchar” (speech synthesis).
- Aceptación de políticas de datos (enlace desde Config.json).

Recomendado (faltante):
- Validación de captcha en backend (o reCAPTCHA) para impedir bypass.
- Interceptor HTTP para Authorization Bearer JWT cuando aplique.
- Manejo centralizado de errores con feedback consistente y logging.
- Límite de tamaño/tipo de archivo en frontend y backend.
- CSP y seguridad estándar en hosting: X-Frame-Options, X-Content-Type-Options, Referrer-Policy.
- Sanitización de HTML si se renderiza contenido remoto (no observado).

## 17. Roles y perfiles de acceso

- Frontend actual no implementa roles (clínico/administrativo/técnico) ni autenticación.
- Propuesta de perfiles (si se habilita auth):
  - Público: Crear/consultar PQRS y encuesta con validaciones anti-bot.
  - Administrativo PQRS: revisión/gestión en backoffice (fuera de este repo).
  - Técnico: mantenimiento/monitoreo (backoffice/infraestructura).

## 18. Clasificación de información clínica

- El módulo gestiona datos personales/sensibles en comentarios y adjuntos.
- Recomendaciones:
  - Minimización de datos (solo requeridos).
  - Encriptación en tránsito (TLS) y en reposo (back-end/almacenamiento).
  - Políticas de retención/borrado.
  - Hash/antivirus para adjuntos en backend.

## 19. Escalabilidad y desempeño

- Angular budgets definidos (angular.json) para controlar tamaños.
- Estrategias:
  - Carga perezosa (ya aplicada por tabs) y code-splitting.
  - CDN para assets y caché HTTP.
  - Compresión (gzip/brotli) en servidor.
  - Paginación/autocomplete para listas grandes.

Resultados de pruebas (pendiente):
- Incluir reporte de Lighthouse y tiempos p95 de endpoints.

## 20. Métricas de disponibilidad, desempeño y capacidad

- Disponibilidad del sitio (uptime monitor).
- p95/p99 de endpoints críticos (SaveSolicitud, SaveFile, GetEstadoRadicado).
- Tasa de errores HTTP (4xx/5xx) por release.
- Throughput de envíos por hora/día.

## 21. Estrategias de escalamiento (horizontal/vertical)

- Horizontal: múltiples instancias del frontend detrás de balanceador (stateless), CDN para assets.
- Vertical: ampliar CPU/RAM de servidor web en picos.
- Backend: escalar instancias de APIs/documental (fuera de este repo).

## 22. Balanceo de carga y redundancia

- Recomendado: balanceador (Application Gateway/NGINX/ALB) + health checks.
- Redundancia geográfica/zonas (si aplica) y CDN multi-edge.

## 23. Mecanismos de Failover y disponibilidad

- Propuesto: despliegues activos/activos o activo/pasivo para APIs; el frontend es estático y soporta failover vía múltiples orígenes.
- Estrategia de rollback y blue/green en CI/CD.

## 24. Procedimiento de monitoreo, capacidad y alertamiento

- Integrar con plataforma de monitoreo (App Insights/Datadog/New Relic):
  - Dashboards: latencia, errores, tráfico, tamaño de payloads, tiempos de build/deploy.
  - Alertas: picos de 5xx, latencia p95>umbral, tasa de fallos subida de archivos, caída de disponibilidad.
- Logging de cliente (captura de errores no controlados window.onerror) con scrubbing de PII.

## 25. Evidencias y anexos (a completar)

- Diagramas (plantUML/mermaid o imágenes) de arquitectura lógica/técnica.
- Resultados de pruebas de carga/estrés.
- Política de datos y avisos de privacidad.
- Screenshots de monitoreo/alertas.

---

### Resumen ejecutivo

El frontend de Gestión PQR es una SPA móvil con Angular/Ionic que consume servicios REST de un sistema documental y de GHIPS para soportar el ciclo de vida de PQRS (registro con adjuntos, consulta de estado, encuesta). Se han implementado controles de validación y un captcha básico. Para la auditoría, se recomiendan mejoras en seguridad (captcha server-side, JWT cuando aplique), monitoreo/telemetría, y documentación de pruebas de carga y procedimientos de continuidad operativa, mayormente en componentes backend/infraestructura externos a este repositorio.
