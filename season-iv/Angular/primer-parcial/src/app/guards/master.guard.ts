import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class MasterGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const userdata = this.auth.getCredentials();

    for (const typeUser of route.data.syncGuards) {
      if (userdata?.type === typeUser) {
        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}
