import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const authState = this.auth.authState.pipe(first());
    const user = await lastValueFrom<any>(authState);
    if(!user) {
      this.router.navigate(['/signin']);
      return false;
    }
    const info = await user.getIdTokenResult();
    const accessLevel = info.claims['accessLevel'];
    switch (accessLevel) {
      case "MANAGER":
        return true;
      default:
        this.router.navigate(['/signin']);
        return false;
    }
  }
}