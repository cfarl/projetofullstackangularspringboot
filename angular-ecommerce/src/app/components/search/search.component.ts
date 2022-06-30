import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

//----------------------------------------------------
// Classe que trata o componente de busca por keyword
//----------------------------------------------------
export class SearchComponent implements OnInit {

  //-----------------------------------------------------------------------------------------
  // Construtor. Recebe o router, usado para navegar para outra url
  //-----------------------------------------------------------------------------------------
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //-----------------------------------------------------------------------------------------
  // Chama a url /search/value, para atualizar a lista de produtos
  //-----------------------------------------------------------------------------------------  
  doSearch(value: string) {
    console.log(`value=${value}`);
    this.router.navigateByUrl(`/search/${value}`) ;
  }

}
