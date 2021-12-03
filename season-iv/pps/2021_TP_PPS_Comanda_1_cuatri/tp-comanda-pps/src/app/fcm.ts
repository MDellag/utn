import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Interception {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer AAAAvgl8MxM:APA91bHdZfYmfXb3EYLxG1yOTg_jZZviF2q_nOfXKfKbHEGaeg3d8BiBISE0jMnpVWLgTzMT31CvfiR5m6mN_0FTKFCZHC3wsUWWFmtfoTwtc89xBIlYwes-w2Eb7_5z3_tV_lIQao4J`,
      },
    });
    return next.handle(req);
  }
}
