export interface UserFromRegister {
  user_id: string,
  user_name: string,
  email: string,
  nick_name: string,
  profile_image?: string,
}

export type UserFromLogin = Omit<UserFromRegister, 'nick_name'>

export type UserToUpdate = Omit<UserFromRegister, 'email'>
