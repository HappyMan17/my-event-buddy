interface Props {
  user_id: string;
  user_name: string;
  nick_name: string;
  email: string;
  password: string;
  is_enable: boolean;
  contacts?: string[];
  img?: string;
}

export class UserEntity {
  public user_id: string;
  public user_name: string;
  public nick_name: string;
  public email: string;
  public password: string;
  public is_enable: boolean;
  public contacts?: string[];
  public img?: string;
  
  constructor(props: Props) {
    this.user_id = props.user_id;
    this.user_name = props.user_name;
    this.nick_name = props.nick_name;
    this.email = props.email;
    this.password = props.password;
    this.is_enable = true;
  }

  getUserFields() {
    return {
      array: ['user_id', 'user_name' , 'nick_name', 'email', 'password', 'is_enable', 'contacts', 'img'],
      string: 'user_id, user_name, nick_name, email, password, is_enable, contacts, img',
    };
  }

}
