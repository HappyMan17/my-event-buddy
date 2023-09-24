interface Props {
  id: string;
  name: string;
  nickName: string;
  email: string;
  password: string;
  isEnable: boolean;
  contacts?: string[];
  img?: string;
}

export class UserEntity {
  public id: string;
  public name: string;
  public nickName: string;
  public email: string;
  public password: string;
  public isEnable: boolean;
  public contacts?: string[];
  public img?: string;
  
  constructor(props: Props) {
    this.id = props.id;
    this.name = props.name;
    this.nickName = props.nickName;
    this.email = props.email;
    this.password = props.password;
    this.isEnable = true;
  }

}
