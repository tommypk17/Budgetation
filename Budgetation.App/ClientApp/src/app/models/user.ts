export class cProfile implements iProfile{
  public firstName: string;
  public lastName: string;
  public email: string;

  constructor(firstname?: string, lastname?: string, username?: string, email?: string){
    this.firstName = firstname;
    this.lastName = lastname;
    this.email = email;
  }
}

export interface iProfile {
  firstName: string;
  lastName: string;
  email: string;
}
