export class LoginUserDto {
  private constructor (
    public email: string,
    public password: string
  ) {}

  static create (object: Record<string, any | null>): [string?, LoginUserDto?] {
    const { email, password } = object

    if (!email) return ['Missing email', undefined]
    if (!password) return ['Missing name', undefined]
    if (password.length < 6) return ['Missing too short', undefined]

    return [
      undefined,
      new LoginUserDto(
        email,
        password
      )
    ]
  }
}
