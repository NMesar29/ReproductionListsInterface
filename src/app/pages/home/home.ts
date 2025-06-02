import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ROUTES } from '../../routes.constans';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  ROUTES = ROUTES;
}
