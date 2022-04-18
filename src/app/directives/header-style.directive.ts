import { Directive, ElementRef} from '@angular/core';
import { GoogleAuthService } from '../google-auth.service';
@Directive({
  selector: '[appHeaderStyle]'
})
export class HeaderStyleDirective {

  constructor(private el:ElementRef, private GoogleAuthService:GoogleAuthService) {
    if(localStorage.getItem('google_auth')===null) {
      this.el.nativeElement.style.display='none';
    }
   }

}
