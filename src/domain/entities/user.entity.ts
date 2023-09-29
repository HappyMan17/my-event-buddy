export class UserEntity {
  constructor (
    public user_id: string,
    public user_name: string,
    public nick_name: string,
    public email: string,
    public password: string,
    public is_enable: boolean,
    public profile_image?: string,
    public contacts?: string[]
  ) {}
}
