import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, MatButtonModule, MatCardModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {}
