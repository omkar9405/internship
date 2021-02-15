import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    httpOptions={
    headers:new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'false'
})
    }
    login(username: string, password: string) {

        return this.http.post<any>(`https://cms.getspaceshuttle.com/api/auth/signin`, { username, password })
            .pipe(map(user => {
                console.log(user);
                // store Customer details and jwt token in local storage to keep Customer logged in between page refreshes
                // localStorage.setItem('Token',user.token);
                // const cust=this.getDecodedAccessToken(user.token)
                // localStorage.setItem('currentUser', JSON.stringify(cust));
                
                let name=user.item.firstName+" "+user.item.lastName;
                localStorage.setItem('currentUser',name);
                localStorage.setItem('email',user.item.email);
                localStorage.setItem('password',password);
                localStorage.setItem('Token',user.token);
                //const u=this.getDecodedAccessToken(user.token);
               // this.currentUserSubject.next(u);
                return user;
            }));
    }
    signup(userDto): any {
        return this.http.post<any>(`https://cms.getspaceshuttle.com/api/auth/signup`, userDto);       
      }
    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

    logout(username: string, password: string) {
        return this.http.post<any>(`https://cms.getspaceshuttle.com/api/auth/signout`, { username, password })
        .pipe(map(message=>{
        localStorage.removeItem('currentUser');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('Token');
        this.currentUserSubject.next(null);
        return message;
        }));
    }
}