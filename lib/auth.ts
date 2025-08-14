import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  permissions: string[];
  iat: number;
  exp: number;
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  return null;
}

export function authenticateRequest(request: NextRequest): JWTPayload | null {
  const token = getTokenFromRequest(request);
  if (!token) return null;
  
  return verifyToken(token);
}

export function requireAuth(request: NextRequest): JWTPayload {
  const payload = authenticateRequest(request);
  if (!payload) {
    throw new Error('Authentication required');
  }
  return payload;
}

export function requireRole(request: NextRequest, roles: string[]): JWTPayload {
  const payload = requireAuth(request);
  if (!roles.includes(payload.role)) {
    throw new Error('Insufficient permissions');
  }
  return payload;
} 