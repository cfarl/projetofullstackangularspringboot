import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

//----------------------------------------------------
// Classe que trata a lista de produtos
//----------------------------------------------------
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!: number;
  searchMode!: boolean ;

  //----------------------------------------------------------------------------------------------------------------
  // Construtor. Recebe o service chamado por essa classe e o router, usado para obter parametros passados na url
  //----------------------------------------------------------------------------------------------------------------
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  //-------------------------------------------------------------------
  // Recupera a lista de produtos, de acordo com a url informada
  //-------------------------------------------------------------------
  listProducts() {
    // Verifica se a url contém o parâmetro "keyword", informado em search/keyword
    this.searchMode = this.route.snapshot.paramMap.has('keyword') ;    

    // Se possui o parâmetro, faz a busca pela palavra chave
    if(this.searchMode) {
      this.handleSearchProducts();

    // Caso contrário, faz a busca pela categoria informada  
    } else {
      this.handleListProducts();    
    }
  }


  handleListProducts() {
    // Verifica se foi informado o id da categoria
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');    

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;      
    }
    else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    // now get the products for the given category id
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => { this.products = data; }
    )
  }


  handleSearchProducts() {
    // Recupera o parâmetro "keyword"
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')! ;
    console.log(`Aqui: ${theKeyword}`) ;

    // Recupera produtos usando a "keyword"
    this.productService.searchProducts(theKeyword).subscribe(
      data => { this.products = data ; }
    )
  }

}
