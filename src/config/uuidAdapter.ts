import { v4 as uuidv4 } from 'uuid'

export class UuidAdapter {
  static generateV4uuid (): string {
    return uuidv4()
  }
}
