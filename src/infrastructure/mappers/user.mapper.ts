import { CustomError, UserEntity } from "../../domain";

export class UserEntityMapper {
  static userEntityFromObject(object: {[key: string]: any}) {

    const { id, _id, name, email, password, nickName } = object;

    if (!_id || !id) throw CustomError.badRequest('Missing id');
    if (!name) throw CustomError.badRequest('Missing name');
    if (!nickName) throw CustomError.badRequest('Missing nick name');
    if (!email) throw CustomError.badRequest('Missing email');
    if (!password) throw CustomError.badRequest('Missing password');


    return new UserEntity({
      id: id || _id,
      nickName,
      name,
      email,
      password,
      isEnable: true,
    })
  }
}