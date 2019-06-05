import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dodajpolazak',
  templateUrl: './dodajpolazak.component.html',
  styleUrls: ['./dodajpolazak.component.styl']
})
export class DodajpolazakComponent implements OnInit {

  polazakForm = this.fb.group({
    sati:[''],
    minuti:['']
  })
  constru
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
