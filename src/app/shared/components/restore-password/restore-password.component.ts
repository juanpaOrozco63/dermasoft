import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.css']
})
export class RestorePasswordComponent implements OnInit {
  
  public title: string = 'Restore Password';

  constructor() { }

  ngOnInit(): void {
  }

}
