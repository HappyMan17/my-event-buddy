export class UpdateUserDto {
  private constructor (
    public user_id: string,
    public user_name: string,
    public nick_name: string,
    public password: string,
    public profile_image?: string
  ) {}

  static create (object: Record<string, any | null>): [string?, UpdateUserDto?] {
    const { id, user_name, email, password, nick_name, profile_image } = object

    if (!id) return ['Missing id', undefined]
    if (!user_name) return ['Missing name', undefined]
    if (!nick_name) return ['Missing name', undefined]
    if (!email) return ['Missing email', undefined]
    if (!password) return ['Missing name', undefined]
    if (password.length < 6) return ['Missing too short', undefined]

    return [
      undefined,
      new UpdateUserDto(
        id,
        user_name,
        nick_name,
        password,
        profile_image
      )
    ]
  }
}
