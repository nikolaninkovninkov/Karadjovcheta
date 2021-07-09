import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User | null>;
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (!user) {
          return of(null);
        }
        return this.afs
          .doc<User>(`users/${user.uid}`)
          .valueChanges()
          .pipe(
            map((user) => {
              if (!user) return null;
              return user;
            })
          );
      })
    );
  }
  googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider;
    const createUserData = (user: firebase.User) => {
      if (
      !user.displayName ||
      !user.email ||
      !user.photoURL ||
      !user.metadata.creationTime ||
      !user.metadata.lastSignInTime
    ){
      throw new Error('error in creating user data');

    }
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL : user.photoURL,
      timeCreated: new Date(user.metadata.creationTime).getTime(), // this is the only reason for the new function. easier updates - init custom property on use
      lastLoggedIn: new Date(user.metadata.lastSignInTime).getTime(),
    };
    this.afs.doc<User>(`users/${user.uid}`).set(data);
    }
    const updateUserData = (user: firebase.User) => {
      if (
      !user.displayName ||
      !user.email ||
      !user.photoURL ||
      !user.metadata.creationTime ||
      !user.metadata.lastSignInTime
    ){
      throw new Error('error in updating user data');

    }
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLoggedIn: new Date(user.metadata.lastSignInTime).getTime(),
    };
    this.afs.doc<User>(`users/${user.uid}`).update(data);
    }
    this.oAuthLogin(provider, createUserData, updateUserData);
  }
  microsoftSignIn(){
    const createUserData = (user:firebase.User) => {
      if (
      !user.displayName ||
      !user.email ||
      !user.metadata.creationTime ||
      !user.metadata.lastSignInTime
    ){
      throw new Error('error in creating user data');

    }
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      timeCreated: new Date(user.metadata.creationTime).getTime(), // this is the only reason for the new function. easier updates - init custom property on use
      lastLoggedIn: new Date(user.metadata.lastSignInTime).getTime(),
    };
    this.afs.doc<User>(`users/${user.uid}`).set(data);
    }
    const updateUserData = (user: firebase.User) => {
      if (
      !user.displayName ||
      !user.email ||
      !user.photoURL ||
      !user.metadata.creationTime ||
      !user.metadata.lastSignInTime
    )
      throw new Error('error in updating user data');
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      lastLoggedIn: new Date(user.metadata.lastSignInTime).getTime(),
    };
    this.afs.doc<User>(`users/${user.uid}`).update(data);
    }
    const provider = new firebase.auth.OAuthProvider('microsoft.com')
    this.oAuthLogin(provider, createUserData, updateUserData);
  }
  get providers(){
    return {
      google: new firebase.auth.GoogleAuthProvider,
      microsoft: new firebase.auth.OAuthProvider('microsoft.com'),
      get : (provider: string) => {
        switch(provider){
          case 'google.com' : return new firebase.auth.GoogleAuthProvider;
          case 'microsoft.com': return new firebase.auth.OAuthProvider('microsoft.com');
          default: return null;
        }
      }
    }
  }
  async oAuthLogin(
    provider: firebase.auth.OAuthProvider | 
              firebase.auth.GoogleAuthProvider,
    createUserData: (user: firebase.User) => void,
    updateUserData: (user: firebase.User) => void
  ) {
    const credential = await firebase.auth().signInWithPopup(provider).catch(async error => {
      if(error.code == 'auth/account-exists-with-different-credential'){
        const oldProvider = this.providers.get((await firebase.auth().fetchSignInMethodsForEmail(error.email))[0]);
        if(!oldProvider) throw new Error('Provider not found');
        const oldCredential = await firebase.auth().signInWithPopup(oldProvider);
        const user = oldCredential.user;
        const newCredential = await user?.linkWithCredential(error.credential);
      } 
    });
    if(!credential) return;
    const newUser = credential.additionalUserInfo?.isNewUser;
    const user = credential.user;
    if (!user) return;
    newUser ? createUserData(user) : updateUserData(user);
    this.router.navigate(['/']);
  }
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
