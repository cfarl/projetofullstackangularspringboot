import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';


//-----------------------------------------------------------
// Servico usado para comunicacao com o back-end
//-----------------------------------------------------------
@Injectable({ providedIn: 'root' })
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  //-------------------------------------------------------------------------------------
  // Construtor. Recebe um httpClient que será injetado para comunicação com o back-end
  //-------------------------------------------------------------------------------------
  constructor(private httpClient: HttpClient) { }

  //--------------------------------------------------
  // Recupera produtos por categoria
  //--------------------------------------------------
  public pesquisaProdutosPorCategoria(idCategoria: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${idCategoria}`;
    return this.pesquisaProdutos(searchUrl);
  }

  //--------------------------------------------------
  // Recupera produtos por palavra chave
  //--------------------------------------------------  
  public pesquisaProdutosPorPalavraChave(palavraChave: string) : Observable<Product[]> {
     const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${palavraChave}`;
     return this.pesquisaProdutos(searchUrl);
  }

  //--------------------------------------------------
  // Recupra produtos da url informada
  //--------------------------------------------------    
  private pesquisaProdutos(urlPesquisa: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(urlPesquisa).pipe(
        map(response => response._embedded.products)
    );
    /*
    return new Observable<Product[]> ( 
      observador => { observador.next(
        [
        new Product("sku1", "JavaScript - The Fun Parts", "description1", 19.99, "assets/images/products/books/book-luv2code-1000.png", true, 100, new Date(),  new Date),
        new Product("sku2", "Spring Framework Tutorial", "description2", 29.99, "assets/images/products/books/book-luv2code-1001.png", true, 200, new Date(),  new Date),
        new Product("sku2", "Kubernetes - Deploying Containers", "description2", 24.99, "assets/images/products/books/book-luv2code-1002.png", true, 200, new Date(),  new Date),
        new Product("sku2", "Internet of Things (IoT) - Getting Started", "description2", 29.99, "assets/images/products/books/book-luv2code-1003.png", true, 200, new Date(),  new Date),
        new Product("sku2", "The Go Programming Language: A to Z", "description2", 24.99, "assets/images/products/books/book-luv2code-1004.png", true, 200, new Date(),  new Date)        
        ]) 
    }) ;
    */
  }

  //--------------------------------------------------
  // Recupera todas as categorias 
  //--------------------------------------------------    
  public pesquisaCategoriasProduto(): Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
    /*
    return new Observable<ProductCategory[]> ( 
      observador => { observador.next(
        [
        new ProductCategory(1, "Books"),
        new ProductCategory(2, "Cofee Mugs"),
        new ProductCategory(3, "Mouse Pads"),
        new ProductCategory(4, "Luggage Tags"),
        ] )
    }) ;
    */
  }
}

//--------------------------------------------------
// Retorno da consulta de produtos no back end
//--------------------------------------------------    
interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

//--------------------------------------------------
// Retorno da consulta de categorias
//--------------------------------------------------    
interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

