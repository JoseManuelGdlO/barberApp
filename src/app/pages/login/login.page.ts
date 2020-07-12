import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userText = '';
  passwordText = '';

  isRemember = true;

  constructor(
    public userService: UserService,
    public toastCtrl: ToastController,
    public router: Router,
    public storage: Storage
  ) { }

  async ngOnInit() {
    let userTemp: string = await this.storage.get('USER');

    if (userTemp != null){
      this.userText = userTemp;

      let passwordTemp = await this.storage.get('PASS');
      this.passwordText = passwordTemp;

      this.login();

    }
  }

  async login(){
    if (this.userText.length == 0){
      return
    }

    if (this.passwordText.length == 0){
      return
    }

    let response: number = this.userService.login(this.userText, this.passwordText);

    if(response != 0){

      if (this.isRemember){
        this.storage.set('USER', this.userText);
        this.storage.set('PASS', this.passwordText);
      }
     

     this.router.navigateByUrl('home/' + response);
    } else {
      const toast = this.toastCtrl.create({
        message: 'Usuario y/o contraseña incorrectas',
        duration: 3000,
        position: 'top'
      });
      (await toast).present();
    }


  }

}
