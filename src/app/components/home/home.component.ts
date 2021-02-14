import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  username=localStorage.getItem('name');
  email=localStorage.getItem('email');
  constructor(
    private router:Router,private route:ActivatedRoute
  ) { 
   
  }
  

  ngOnInit(): void {
  //   var user=localStorage.getItem('currentUser');
  //   var json = JSON.parse(user);
  //   var obj=json["item"];
  //   this.name=obj["firstname"];
  //  this.email=obj["email"];
  }

}
