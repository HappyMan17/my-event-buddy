export interface UserFromRegister {
  user_id: string,
  user_name: string,
  email: string,
  nick_name: string,
  profile_image?: string,
}

export interface UserUpdateProfileImage {
  user_id: string,
  profile_image?: string,
}

export type UserFromLogin = UserFromRegister

export type UserToUpdate = Omit<UserFromRegister, 'email'>
