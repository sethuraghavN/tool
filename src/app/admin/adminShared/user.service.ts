import { Injectable } from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

import * as firebase from 'firebase';

@Injectable()

export class UserService implements CanActivate {
    userLoggedIn: boolean = false;
    loggedInUser: string;
    authUser: any;

    constructor( private router: Router ) {
        firebase.initializeApp ({
            apiKey: "AIzaSyBEUmbtiNrbAk3H9Ut-2Ez1R6Jxny1Jplc",
    authDomain: "incident-management-4d49b.firebaseapp.com",
    databaseURL: "https://incident-management-4d49b.firebaseio.com",
    projectId: "incident-management-4d49b",
    storageBucket: "incident-management-4d49b.appspot.com",
    messagingSenderId: "617291801626"
        })
     }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        return this.verifyLogin(url);
    }

    verifyLogin(url: string): boolean {
        if (this.userLoggedIn) { return true; }
        this.router.navigate(['/admin/login']);
        return false;
    }

    register( email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            alert(`${error.message} Please try again!`);
        });   
    }

    verifyUser() {
        this.authUser = firebase.auth().currentUser;
        if(this.authUser) {
            this.loggedInUser = this.authUser.email;
            this.userLoggedIn = true;
            var admin = "admin@psiog.com"
            if(this.loggedInUser == admin ){
            this.router.navigate(['/admin']);
            } else {
                this.router.navigate(['/admin/user']);
            }
        }
    }

    login( loginEmail: string, loginPassword: string) {
        firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword)
        .catch(function(error) {
            alert(`${error.message} Unable to login. Try again!`);
        });
    }

    logout () {
        this.userLoggedIn = false;
        firebase.auth().signOut().then(function() {
            alert(`Logged out!`);
        }, function(error) {
            alert(`${error.message} Unable to Logout. Try again!`);
        });
    }

}