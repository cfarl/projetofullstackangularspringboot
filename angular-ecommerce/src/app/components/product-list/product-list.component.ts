import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

//----------------------------------------------------
// Classe que trata a lista de produtos
//----------------------------------------------------
export class ProductListComponent implements OnInit {

  products: Product[] = [] ;
  currentCategoryId: number = 1;
  searchMode!: boolean ;

  //----------------------------------------------------------------------------------------------------------------
  // Construtor. Recebe o service chamado por essa classe e o router, usado para obter parametros passados na url
  //----------------------------------------------------------------------------------------------------------------
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  //-------------------------------------------------------
  // Método chamado na inicialização no componente
  //-------------------------------------------------------
  ngOnInit() : void {
    //this.route.paramMap.subscribe(() => {
      this.listProducts();
    //});
  }

  //-------------------------------------------------------------------
  // Recupera a lista de produtos, de acordo com a url informada
  //-------------------------------------------------------------------
  listProducts() {
    // Verifica se a url contém o parâmetro "keyword", informado em search/keyword
    this.searchMode = this.route.snapshot.paramMap.has('keyword') ;    

    // Se possui o parâmetro, faz a busca pela palavra chave
    if(this.searchMode) {
      this.pesquisaProdutosPorPalavraChave();

    // Caso contrário, faz a busca pela categoria informada  
    } else {
      this.pesquisaProdutosPorCategoria();    
    }
  }


  private pesquisaProdutosPorCategoria() {
    // Verifica se foi informado o id da categoria
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');    

    // recupera o valor informado para o parâmetro "id" na rota. converte para number usando "+" 
    // se o id não foi informado, deixa 1 como padrao
    this.currentCategoryId = hasCategoryId ? +this.route.snapshot.paramMap.get('id')! : 1 ;      
    
    // recupera os produtos pela categoria
    this.productService.pesquisaProdutosPorCategoria(this.currentCategoryId).subscribe(
      data => { this.products = data; }
    )
  }


  private pesquisaProdutosPorPalavraChave() {
    // Recupera o valor informado para o parâmetro "keyword"
    const palavraChave: string = this.route.snapshot.paramMap.get('keyword')! ;

    //console.log(`Aqui: ${theKeyword}`) ;

    // Recupera produtos usando a "keyword"
    this.productService.pesquisaProdutosPorPalavraChave(palavraChave).subscribe(
      data => { this.products = data ;  }
    )
  }

}
