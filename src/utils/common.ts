import { v4 as uuid } from 'uuid';

export function generateId(): string {
  return uuid();
}

export function betweenNumber(num: number, min: number, max: number): boolean {
  return num >= min && num <= max;
}