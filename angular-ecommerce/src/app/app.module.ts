import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule} from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';

//---------------------------------------------------
// Define rotas para a aplicação
//---------------------------------------------------
const routes: Routes = [
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'} // rota usada quando nenhuma outra bate com a configuração
];

@NgModule({
  declarations: [ // Define os componentes que serão usados nesse módulo
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent
  ],
  imports: [  // Define os módulos que serão utilizados nesse módulo
    RouterModule.forRoot(routes),  // Habilita o uso das rotas
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],  // permite a injecao do ProductService no construtor dos componentes
  bootstrap: [AppComponent]  // Componente usado como "pai de todos" na aplicacao  
})
export class AppModule { }
