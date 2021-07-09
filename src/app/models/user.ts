export interface User {
    uid: string;
    displayName: string;
    email: string;
    photoURL?: string;
    lastLoggedIn: number;
    timeCreated?: number;
}
