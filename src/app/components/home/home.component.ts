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
  password=localStorage.getItem('password');
  error='';
  constructor(
    private router:Router,private route:ActivatedRoute,private authenticationService:AuthenticationService
  ) { 
   
  }
  

  ngOnInit(): void {
  //   var user=localStorage.getItem('currentUser');
  //   var json = JSON.parse(user);
  //   var obj=json["item"];
  //   this.name=obj["firstname"];
  //  this.email=obj["email"];
  }
  logout()
  {
    if(localStorage.getItem('currentUser'))
    {
      this.authenticationService.logout(this.username,this.password).subscribe(
        (data:any) => {
          console.log(data);
          this.router.navigate(['/login']);
          alert("Logged out Successfully");
      },(err) => {
          alert(err);
          this.error=err;  
      });
    }
  }

}
