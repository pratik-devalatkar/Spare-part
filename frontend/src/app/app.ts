import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PartService } from './services/part';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
  <h2>{{message}}</h2>
  <router-outlet></router-outlet>
`,
})
export class App implements OnInit {

  message = '';

  constructor(private partService: PartService) {}

  ngOnInit() {
  this.partService.connectBackend().subscribe({
    next: (res) => {
      console.log("Backend response:", res);
      this.message = res;
    },
    error: (err) => {
      console.log("Error:", err);
      this.message = "Backend not connected";
    }
  });
}
}
