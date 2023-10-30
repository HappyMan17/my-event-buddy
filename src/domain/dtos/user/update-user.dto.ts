import { UserUpdateProfileImage } from '../types'

export class UpdateUserDto {
  private constructor (
    public user_id: string,
    public user_name: string,
    public nick_name: string,
    public profile_image?: string
  ) {}

  static create (object: Record<string, any | null>): [string?, UpdateUserDto?] {
    const { user_id, user_name, nick_name, profile_image } = object

    if (!user_id) return ['Missing id', undefined]
    if (!user_name) return ['Missing name', undefined]
    if (!nick_name) return ['Missing name', undefined]

    return [
      undefined,
      new UpdateUserDto(
        user_id,
        user_name,
        nick_name,
        profile_image
      )
    ]
  }

  static updateImage (object: Record<string, any | null>): [string?, UserUpdateProfileImage?] {
    const { userId } = object

    if (!userId) return ['Missing id', undefined]

    return [
      undefined,
      {
        user_id: userId,
        profile_image: ''
      }
    ]
  }

  static userById (object: Record<string, any | null>): [string?, { user_id: string }?] {
    const userId = object.user_id

    if (!userId) return ['Missing id', undefined]

    return [
      undefined,
      {
        user_id: userId
      }
    ]
  }
}
