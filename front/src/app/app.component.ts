import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,MatIconModule,MatButtonModule,MatMenuModule],
  templateUrl: './app.component.html',

  styleUrls: [
    './app.component.css',

     // Add Style here
  ],
})
export class AppComponent {
  title = 'front';
  formData: any = {};

  onSubmit() {
    console.log('Form submitted with data:', this.formData);
    // Add your form submission logic here (e.g., API call, data processing)

  }
}
