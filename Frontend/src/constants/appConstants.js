export const APP_NAME = 'PrimeTrade';
export const TOKEN_KEY = 'primeTradeToken';

const normalizeApiBaseUrl = (rawValue) => {
  const fallback = import.meta.env.PROD
    ? 'https://ptai-xlvm.onrender.com/api/v1'
    : 'http://localhost:5000/api/v1';

  if (!rawValue || typeof rawValue !== 'string') {
    return fallback;
  }

  const trimmed = rawValue.trim();
  const protocolMatch = trimmed.match(/https?:\/\//i);

  if (!protocolMatch) {
    return fallback;
  }

  const firstProtocolIndex = protocolMatch.index;
  const afterFirst = trimmed.slice(firstProtocolIndex + protocolMatch[0].length);
  const secondProtocolOffset = afterFirst.search(/https?:\/\//i);

  let candidate = trimmed;

  // Guard against accidentally concatenated values like
  // "https://api.example.com.http://localhost:5000/api/v1".
  if (secondProtocolOffset !== -1) {
    const cutIndex = firstProtocolIndex + protocolMatch[0].length + secondProtocolOffset;
    candidate = trimmed.slice(0, cutIndex).replace(/[\s.,;]+$/, '');
  }

  let normalized;

  try {
    const url = new URL(candidate);
    normalized = `${url.origin}${url.pathname}`.replace(/\/$/, '');
  } catch {
    return fallback;
  }

  if (!normalized.endsWith('/api/v1')) {
    normalized = `${normalized}/api/v1`;
  }

  return normalized;
};

export const API_BASE_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_BASE_URL);

export const TASK_STATUSES = ['todo', 'in-progress', 'completed'];
