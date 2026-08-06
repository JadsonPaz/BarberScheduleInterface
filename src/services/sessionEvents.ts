export const SESSION_EXPIRED_MESSAGE = 'Sua sessão expirou, entre novamente';

type SessionExpiredListener = (message: string) => void;

const listeners = new Set<SessionExpiredListener>();

export function onSessionExpired(listener: SessionExpiredListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function notifySessionExpired(message = SESSION_EXPIRED_MESSAGE) {
  listeners.forEach((listener) => listener(message));
}
