import { Validators } from "../../../config/validators";


export class RegisterUserDto {
  private constructor(
    public user_name: string,
    public nick_name: string,
    public email: string,
    public password: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {

    const {user_name, email, password, nickName} = object;

    if (!user_name) return ['Missing name', undefined];
    if (!nickName) return ['Missing name', undefined];
    if (!email) return ['Missing email', undefined];
    if (!Validators.email.test(email)) return ['Email is not valid', undefined];
    if (!password) return ['Missing name', undefined];
    if (password.length < 6) return ['Missing too short', undefined];

    return [
      undefined,
      new RegisterUserDto(
        user_name,
        nickName,
        email,
        password,
      ),
    ];
  }
}
