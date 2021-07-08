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
    const provider = new firebase.auth.GoogleAuthProvider();
    this.oAuthLogin(provider);
  }
  //
  async oAuthLogin(
    provider: firebase.auth.GoogleAuthProvider /* add providers when necessary */
  ) {
    const credential = await this.afAuth.signInWithPopup(provider);
    const newUser = credential.additionalUserInfo?.isNewUser;
    const user = credential.user;
    if (!user) return;
    newUser ? this.createUserData(user) : this.updateUserData(user);
    this.router.navigate(['/']);
  }
  createUserData(user: firebase.User) {
    if (
      !user.displayName ||
      !user.email ||
      !user.photoURL ||
      !user.metadata.creationTime ||
      !user.metadata.lastSignInTime
    )
      throw new Error('error in creating user data');
    const data: User = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      timeCreated: new Date(user.metadata.creationTime).getTime(), // this is the only reason for the new function. easier updates - init custom property on use
      lastLoggedIn: new Date(user.metadata.lastSignInTime).getTime(),
    };
    this.afs.doc<User>(`users/${user.uid}`).set(data);
  }
  updateUserData(user: firebase.User) {
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
  async signOut() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
  }
}
