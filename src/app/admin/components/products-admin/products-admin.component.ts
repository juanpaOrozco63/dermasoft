import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../domains/product';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
})
export class ProductsAdminComponent implements OnInit {
  public id:number=null
  // Declaraciones de la clase
  public strTitle: String = 'Productos';
  // Arreglo de pacientes
  public products: Product[];
  // Paciente edit
  public patModal: Product;
  constructor(public productService: ProductService, public modal: NgbModal) {}

  ngOnInit(): void {
    this.findAll();
  }
  findAll(): void {
    // Método traer todos los pacientes
    this.productService.findAll().subscribe(
      (data) => {
        //Asignamos la data al arreglo de pacientes
        this.products = data;
        this.id=null
      },
      (err) => {
        console.error(err);
      }
    );
  }
  //Método para traer un product por su id
  findById(id: number): void {
    if (Boolean(id)) {
      this.productService.findById(id).subscribe((data) => {
        if (data) {
          this.products = [];
          this.products.push(data);
        } else {
          Swal.fire('Error', 'No se encontraron productos', 'error');
        }
      });
    } else {
      this.findAll();
    }
  }
  crearP(): void {
    this.productService.save(this.patModal).subscribe(
      (data) => {
        this.findAll();
        Swal.fire('Creado', 'Producto creado', 'success');
        this.modal.dismissAll();
      },
      (err) => {
        Swal.fire('Error', 'Error al crear un nuevo registro', 'error');
      }
    );
  }
  openCentrado(contenido, pat: Product) {
    //Asignamos el paciente especifico al paciente que se mostrara en el modal
    this.patModal = pat;
    //Mostramos el modal
    this.modal.open(contenido, { centered: true });
  }

  openCrear(crear) {
    this.patModal = new Product('', '', '', 15, 'A', '', new Date());
    //Mostramos el modal
    this.modal.open(crear, { centered: true });
  }
  editar(): void {
    //Actualizamos el paciente
    this.productService.update(this.patModal).subscribe(
      (data) => {
        this.modal.dismissAll();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  
  inactivarP(product: Product): void {
    //Inactivamos producto
    product.state = 'I';
    this.productService.update(product).subscribe(
      (data) => {
        Swal.fire('Inactivado', 'Producto inactivado', 'warning');
        this.findAll();
      },
      (err) => {
        Swal.fire('Error', 'Error', 'error');
      }
    );
  }
  activarP(product: Product): void {
    //Inactivamos producto
    product.state = 'A';
    this.productService.update(product).subscribe(
      (data) => {
        Swal.fire('Activado', 'Producto activado', 'success');
        this.findAll();
      },
      (err) => {
        Swal.fire('Error', 'Error', 'error');
      }
    );
  }
}