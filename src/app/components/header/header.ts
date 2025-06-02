import { Component } from '@angular/core';
import { ROUTES } from '../../routes.constans';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  ROUTES = ROUTES;
}
