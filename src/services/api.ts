/**
 * API Service for Django Backend & Google Sheets Integration
 * 
 * Endpoints:
 * - POST /api/pitch/
 * - POST /api/newsletter/
 * - POST /api/events/rsvp/
 */

export interface PitchPayload {
  founderName: string;
  email: string;
  startupName: string;
  sector: string;
  oneLinePitch: string;
  ref?: string;
}

export interface NewsletterPayload {
  email: string;
}

export interface EventRsvpPayload {
  eventId: string;
  eventTitle: string;
  participantName: string;
  avantikaEmail: string;
  enrollmentId?: string;
  departmentYear?: string;
  teamSize?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  fallback?: boolean;
}

// Configurable base URL for Django backend
const DJANGO_API_BASE = (import.meta.env.VITE_DJANGO_API_URL || '/api').replace(/\/$/, '');
const GOOGLE_SHEET_WEBHOOK_URL = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || '';

/**
 * Helper to get Django CSRF token from cookie if present
 */
function getCsrfToken(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

export const DJANGO_ADMIN_URL = `${DJANGO_API_BASE.replace(/\/api$/, '')}/admin/`;

export const EXPORT_CSV_URL = `${DJANGO_API_BASE}/submissions/export-csv/`;

/**
 * Standard fetch wrapper with Django headers
 */
async function djangoRequest<T>(endpoint: string, method: string, body?: any): Promise<ApiResponse<T>> {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const csrfToken = getCsrfToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken;
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (method !== 'GET' && body !== undefined && body !== null) {
    fetchOptions.body = JSON.stringify(body);
  }

  const parseError = (data: any, status: number) => {
    if (data.errors) {
      const messages = Object.values(data.errors).flat();
      if (messages.length > 0) return String(messages[0]);
    }
    return data.detail || data.message || `Server responded with status ${status}`;
  };

  const getDirectBackendUrl = () => {
    if (typeof window === 'undefined') return `http://127.0.0.1:8000/api${cleanEndpoint}`;
    const host = window.location.hostname || '127.0.0.1';
    return `${window.location.protocol}//${host}:8000/api${cleanEndpoint}`;
  };

  let primaryUrl = `${DJANGO_API_BASE}${cleanEndpoint}`;

  try {
    let response = await fetch(primaryUrl, fetchOptions);

    // The Vite proxy is useful locally; deployed builds use VITE_DJANGO_API_URL.
    const contentType = response.headers.get('content-type') || '';
    if (import.meta.env.DEV && (response.status === 404 || contentType.includes('text/html')) && typeof window !== 'undefined') {
      const directUrl = getDirectBackendUrl();
      try {
        const directResp = await fetch(directUrl, fetchOptions);
        if (directResp.ok || directResp.status === 400 || directResp.status === 201) {
          response = directResp;
        }
      } catch {
        // keep original response
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        message: parseError(errorData, response.status),
        data: errorData,
      };
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: true,
      message: data.message || 'Request successful',
      data,
    };
  } catch (err: any) {
    // In local development, retry the backend directly if the Vite proxy is unavailable.
    if (import.meta.env.DEV && typeof window !== 'undefined') {
      try {
        const directUrl = getDirectBackendUrl();
        const directResp = await fetch(directUrl, fetchOptions);
        if (!directResp.ok) {
          const errorData = await directResp.json().catch(() => ({}));
          return {
            success: false,
            message: parseError(errorData, directResp.status),
            data: errorData,
          };
        }
        const data = await directResp.json().catch(() => ({}));
        return {
          success: true,
          message: data.message || 'Request successful',
          data,
        };
      } catch (directErr) {
        console.warn(`[Django API Client] Direct fallback to port 8000 also failed:`, directErr);
      }
    }

    console.warn(`[Django API Client] Offline or connection error to ${primaryUrl}:`, err);
    return {
      success: false,
      message: 'Django backend currently unreachable. Fallback mode active.',
      fallback: true,
    };
  }
}

/**
 * Fetch all student submissions from Django backend
 */
export async function getSubmissions(): Promise<ApiResponse<{
  pitches: PitchPayload[];
  registrations: EventRsvpPayload[];
  subscribers: NewsletterPayload[];
  counts: { pitches: number; registrations: number; subscribers: number };
}>> {
  const res = await djangoRequest<{
    pitches: PitchPayload[];
    registrations: EventRsvpPayload[];
    subscribers: NewsletterPayload[];
    counts: { pitches: number; registrations: number; subscribers: number };
  }>('/submissions/', 'GET');
  return res;
}

/**
 * Submit pitch dossier to Django backend
 */
export async function submitPitch(payload: PitchPayload): Promise<ApiResponse> {
  const res = await djangoRequest('/pitch/', 'POST', payload);
  return res;
}

/**
 * Subscribe email to E-Cell weekly dispatch via Django
 */
export async function subscribeNewsletter(payload: NewsletterPayload): Promise<ApiResponse> {
  const res = await djangoRequest('/newsletter/', 'POST', payload);
  return res;
}

/**
 * Submit event registration to Django and/or Google Sheet webhook
 */
export async function rsvpEvent(payload: EventRsvpPayload): Promise<ApiResponse> {
  // 1. Submit to Django backend
  const res = await djangoRequest('/events/rsvp/', 'POST', payload);

  // 2. If Google Sheet Webhook is configured, forward payload concurrently
  if (GOOGLE_SHEET_WEBHOOK_URL) {
    try {
      fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          ...payload
        })
      }).catch(err => console.warn('Google Sheet webhook sync failed:', err));
    } catch {
      // safe fallback
    }
  }

  return res;
}

