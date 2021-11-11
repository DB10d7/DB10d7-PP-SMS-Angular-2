import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGaurdGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
   /* const userRole = this.authService.getUserRole();
    if (userRole == route.) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
    } */
   // return (this.isAuthorized(route));
    if (this.isAuthorized(route)) {
      return true;
    } else {
      this.router.navigateByUrl('not-Authorized');
    }
    return true;
  }
  private isAuthorized(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.authService.getUserRole();    // ['SUPER-ADMIN','ADMIN','TRAINER','STUDENT','DEFAULT'];
    const expectedRoles = route.data.expectedRoles;
    const roleMatches = expectedRoles.indexOf(userRole) !== -1;
    return roleMatches;
  }
}
