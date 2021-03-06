import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domains/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-patient',
  templateUrl: './products-patient.component.html',
  styleUrls: ['./products-patient.component.css'],
})
export class ProductsPatientComponent implements OnInit {
  // Declaraciones de la clase
  public strTitle: String = 'Productos';
  // Arreglo de pacientes
  public products: Product[];
  constructor(public productService: ProductService) {}

  ngOnInit(): void {
    this.findAll();
  }
  findAll(): void {
    // Método traer todos los pacientes
    this.productService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de pacientes
        this.products = data;
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
