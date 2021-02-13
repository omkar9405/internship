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
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    headers= new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Credentials': 'false'
});
    login(email: string, password: string) {

        return this.http.post<any>(`${environment.apiUrl}/signin`, { email, password },{headers:this.headers})
            .pipe(map(user => {
                console.log(user);
                // store Customer details and jwt token in local storage to keep Customer logged in between page refreshes
                localStorage.setItem('Token',user.token);
                const cust=this.getDecodedAccessToken(user.token)
                localStorage.setItem('currentUser', JSON.stringify(cust));
                this.currentUserSubject.next(cust);
                return cust;
            }));
    }
    signup(userDto): any {
        return this.http.post<any>(`${environment.apiUrl}/signup`, userDto);       
      }
    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

    logout() {
        // remove Customer from local storage to log Customer out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}