import { compareSync, hashSync } from 'bcryptjs'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class BcryptAdapter {
  static hash (password: string): string {
    // encrypting the password with a hash in one direction
    return hashSync(password)
  }

  static compare (password: string, hashed: string): boolean {
    // Comparing encrypted password with the normal one
    return compareSync(password, hashed)
  }
}
