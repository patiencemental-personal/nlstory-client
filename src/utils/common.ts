import { v4 as uuid } from 'uuid';

export function generateId(): string {
  return uuid();
}

// export function createEqualKeyValueObjectFromStrings(keys: string[]): object {
//   return keys.reduce((acc, key) => {
//     return { ...acc, [key]: key };
//   }, {});
// }