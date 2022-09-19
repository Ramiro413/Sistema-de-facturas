import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuPrincipal = [
    { icon : 'home', name: 'Inicio', route: 'home' },
    { icon : 'article', name: 'Opciones', route: '', submenu: [
      { icon : 'manage_accounts ',factuIco :'library_books', name: 'Usuarios', facturas: 'Facturas', route: 'admin/users', routeFactura: 'facturas' },
    ] }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
