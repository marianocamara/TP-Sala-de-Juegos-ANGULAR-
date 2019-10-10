import { Injectable, NgZone } from '@angular/core';
import { auth, User } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Juego } from '../../clases/juego';
import * as firebase from 'firebase';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any; // Save logged in user data
  user:User;
  juego:Juego;

  constructor(public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public snackBar: MatSnackBar
    ) {

   /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })
  
   }

     // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['/Principal']);
        });
        this.SetUserData(result.user);
      }).catch((error) => {
        this.snackBar.open('Lo sentimos, ha ocurrido un error. Intenta nuevamente.', '', {
          duration: 3000
        });
        console.log(error.message);
      })
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const date = new Date();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      createdAt: date.toLocaleDateString(),
      name: user.email.split('@')[0],
      mail: user.email
    }
    return userRef.set(userData, {
      merge: true
    })

  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigate(['/Principal']);
      }).catch((error) => {
        this.snackBar.open('Lo sentimos, ha ocurrido un error. Intenta nuevamente.', '', {
          duration: 3000
        });
        console.log(error.message);
      })
  }

   // Returns true when user is looged in and email is verified
   get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  
  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['Principal']);
    })
  }


  SetPuntajeGano(nombre:any, usuario:any) {
    const date = new Date();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${nombre}/${usuario.uid}`);
    const userData: any = {
      uid: usuario.uid,
      createdAt: date.toLocaleDateString(),
      jugador: usuario.email.split('@')[0],
      ganadas: firebase.firestore.FieldValue.increment(1),
    }
    return userRef.set(userData, {
      merge: true
    })

  }
  SetPuntajePerdio(nombre:any, usuario:any) {
    const date = new Date();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${nombre}/${usuario.uid}`);
    const userData: any = {
      uid: usuario.uid,
      createdAt: date.toLocaleDateString(),
      jugador: usuario.email.split('@')[0],
      perdidas: firebase.firestore.FieldValue.increment(1),
    }
    return userRef.set(userData, {
      merge: true
    })

  }


  SetPuntajeAnagrama(cantPalabras, nombre:any, usuario:any) {
    const date = new Date();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${nombre}/${usuario.uid}`);
    const userData: any = {
      uid: usuario.uid,
      createdAt: date.toLocaleDateString(),
      jugador: usuario.email.split('@')[0],
      partidas: firebase.firestore.FieldValue.increment(1),
      palabrasAdivinadas: firebase.firestore.FieldValue.increment(cantPalabras),
    }
    return userRef.set(userData, {
      merge: true
    })

  }

  SetPuntajeSimon(nivel:any, nombre:any, usuario:any) {
    const date = new Date();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`${nombre}/${usuario.uid}`);
    const userData: any = {
      uid: usuario.uid,
      createdAt: date.toLocaleDateString(),
      jugador: usuario.email.split('@')[0],
      partidas: firebase.firestore.FieldValue.increment(1),
      nivel: nivel,
    }
    return userRef.set(userData, {
      merge: true
    })

  }
}
