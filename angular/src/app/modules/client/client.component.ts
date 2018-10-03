import { Component } from '@angular/core';

import { MENU_ITEMS } from './client-pages-menu';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
})
export class ClientComponent {

  menu = MENU_ITEMS;
}
