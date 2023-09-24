import { Validators } from "../../../config/validators";


export class RegisterUserDto {
  private constructor(
    public name: string,
    public nickName: string,
    public email: string,
    public password: string,
  ) {}

  static create(object: {[key: string]: any}): [string?, RegisterUserDto?] {

    const {name, email, password, nickName} = object;

    if (!name) return ['Missing name', undefined];
    if (!nickName) return ['Missing name', undefined];
    if (!email) return ['Missing email', undefined];
    if (!Validators.email.test(email)) return ['Email is not valid', undefined];
    if (!password) return ['Missing name', undefined];
    if (password.length < 6) return ['Missing too short', undefined];

    return [
      undefined,
      new RegisterUserDto(
        name,
        nickName,
        email,
        password,
      ),
    ];
  }
}
