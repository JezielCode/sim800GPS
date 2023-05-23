import ApiServices from "src/services/Repository";


class Users extends ApiServices{

  public static getInstance(): any {
    const newInstance: Users = new Users();

    return newInstance;
  }

}

export default  Users
