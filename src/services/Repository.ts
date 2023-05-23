import users from "src/db_fake/users.js";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { api } from "src/boot/axios";

async function getById(email: any, password: any) {
  let User: any = {};
  users.forEach((value) => {
    if (value.email == email && value.password == password) {
      User = value;
    }
  });
  return User;
}
export default abstract class ApiServices {
  //  public getUsers(email:string, password:string): Array<any> {
  //   return users
  //  }

  public getUsers(email: string, password: string): Observable<any> {
    // const array: any[] = users.map((value) => {
    //   if (value.email == email && value.password == password) {
    //     return value;
    //   }
    // });
    return from(getById(email, password)).pipe(
      map((docSnap: any) => ({
        data: docSnap,
      }))
    );
  }
}
