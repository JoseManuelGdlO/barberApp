import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(user: string, password: string): number{
    
    if(user != 'josemanuelgarciadelao@gmail.com'){
      return 0;
    }

    if(password != 'Test11'){
      return 0;
    }

    return 1;

  }
}
