import { createHmac } from 'crypto';

export function getNaverAdSignature(
  timestamp: string,
  method: 'GET' | 'POST',
  uri: string,
  secretKey: string
) {
  const message = `${timestamp}.${method}.${uri}`;
  return createHmac('sha256', secretKey).update(message).digest('base64');
} 