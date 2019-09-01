import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { KartaService } from '../Services/karta.service';
import { LinijaService } from '../linija.service';
import { KartaModel } from '../models/kartaModel';
import { AuthService } from '../Services/auth.service';
declare let paypal: any;

@Component({
  selector: 'app-kupikartu',
  templateUrl: './kupikartu.component.html',
  styleUrls: ['./kupikartu.component.styl']
})
export class KupikartuComponent implements OnInit, AfterViewChecked {
  tipKarte: string;
  tipPopusta: string;
  karta: KartaModel;
  cena: number;
  role:any;
  kartaForm = this.fb.group({
    karta: [''],

  })
  constructor(private fb: FormBuilder, private route: ActivatedRoute,  private kartaService: KartaService, private router: Router, private authServ: AuthService) { }
  finalAmount: number;
  ngOnInit() {
    this.getInfo();
  }
  getInfo(){
    this.tipKarte = this.route.snapshot.paramMap.get('tip');
    this.tipPopusta = this.route.snapshot.paramMap.get('popust');
    this.cena = +this.route.snapshot.paramMap.get('cena');
    this.finalAmount = this.cena*0.01;
    this.role = localStorage.role;
  }
  /*kupiKartu(){
    this.karta = new KartaModel()
    this.karta.TipKarte = this.tipKarte;
    this.karta.VrstaPutnika = this.tipPopusta;
    this.karta.Cena  = this.cena;
    this.karta.Email = this.kartaForm.get('karta').value;
    this.kartaService.putKarta(this.karta).subscribe();
    this.router.navigate(['cenovnik'])
  }*/
  kupiKartuLog(payId: string){
    this.karta = new KartaModel()
    this.karta.TipKarte = this.tipKarte;
    this.karta.VrstaPutnika = this.tipPopusta;
    this.karta.Cena  = this.cena;
    if(this.authServ.isLoggedIn()){
      this.karta.Username = localStorage.getItem('userId')
    }else{
      this.karta.Email = this.kartaForm.get('karta').value;
    }
    this.karta.PayId = payId;
    this.kartaService.putKarta(this.karta).subscribe();
    this.router.navigate(['cenovnik'])
  }
  addScript: boolean = false;
  paypalLoad: boolean = true;
  

 
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AQkjj6ZakVhOtrtl5cRzejmjHXArTQHrvVwHPMhlXx5mT54RKJjtzCCeX4ZOGJHVvhhmWPj3WPrTofDy',
      production: '<your-production-key-here>'
    },
    commit: true,
    payment: (data, actions) => {
      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data, actions) => {
      return actions.payment.execute().then((payment) => {
        //Do something when payment is successful.
        //this.router.navigate(['cenovnik'])
        window.alert(payment.id);
        this.kupiKartuLog(payment.id);
      })
    }
  };
 
  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }
  
  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      let scripttagElement = document.createElement('script');    
      scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagElement.onload = resolve;
      document.body.appendChild(scripttagElement);
    })
  }
}
