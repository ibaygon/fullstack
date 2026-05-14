/**
 * URL base de la app para OAuth (redirectTo) y enlaces compartidos.
 * En Vercel define VITE_SITE_URL = https://tu-dominio.vercel.app (sin barra final).
 * Si no está definida, se usa window.location.origin en el navegador.
 */
export function getAuthSiteUrl(): string {
  const env = import.meta.env.VITE_SITE_URL;
  if (typeof env === "string" && env.trim().length > 0) {
    return env.trim().replace(/\/$/, "");
  }
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "";
}
