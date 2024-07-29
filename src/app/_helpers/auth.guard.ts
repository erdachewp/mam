import { CanActivateFn } from '@angular/router';
import { 
  Router, CanActivate , ActivatedRouteSnapshot, RouterStateSnapshot,
 } from '@angular/router';
 import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
@Injectable()
export class AuthGuard {
  
}