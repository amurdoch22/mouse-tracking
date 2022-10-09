import {Component, HostListener} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface MouseMovementPoint {
  x: number,
  y: number
}

type MouseMovementList = MouseMovementPoint[];
type MouseMovementHistory = MouseMovementList[];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'Mouse';

  private mouseMovementCounter = 0;
  private mouseMovementThreshold = 100;
  public mouseMovementCurrentHistory: MouseMovementList = [];
  public mouseMovementPastHistory: MouseMovementHistory = [];

  constructor(private http: HttpClient) {
  }

  @HostListener('mousemove', ['$event'])
  onMousemove(event: MouseEvent) {
    const mousePosition = {
      x: event.clientX,
      y: event.clientY
    }
    console.log(mousePosition);

    this.mouseMovementCurrentHistory.push(mousePosition);
    if (this.mouseMovementCounter++ >= this.mouseMovementThreshold) {
      this.mouseMovementCounter = 0;
      this.mouseMovementPastHistory.push(this.mouseMovementCurrentHistory);
      this.mouseMovementCurrentHistory = [];

      console.log(`Mouse Movement Threshold Exceeded`);
      console.log(this.mouseMovementPastHistory);

      //
      // NOTE: Add a REST Call here to send the Points to Backend
      //
      const url = '';
      if (url !== '') {
        this.http.post(url, this.mouseMovementPastHistory)
          .subscribe({
            next: (response) => {
              console.log('Response');
              console.log(response);
            }, error: (error) => {
              console.error(error);
            }
          })
      }
    }
  }
}
