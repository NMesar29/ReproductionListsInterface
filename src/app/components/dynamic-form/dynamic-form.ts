import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ROUTES } from '../../routes.constans';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReproductionListsService } from '../../services/reproduction-lists-service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dynamic-form',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './dynamic-form.html',
  styleUrl: './dynamic-form.css'
})
export class DynamicForm implements OnInit, OnChanges{
  ROUTES = ROUTES

  @Input() formType: 'newList' | 'findList' | 'deleteList' = 'newList';

  form!: FormGroup;
  formSubmitted = false;
  responseMessage: string = '';
  errorMessage: string = '';
  listaInfo: any = null;

  constructor(private fb: FormBuilder, private reproductionListsService: ReproductionListsService){}
  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes : SimpleChanges){
    if(changes['formType'] && !changes['formType'].isFirstChange()){
      this.createForm();
    }
  }
  createForm(){
    switch(this.formType){
      case 'newList':
        this.form = this.fb.group({
          nombre: ['', Validators.required],
          descripcion: ['', Validators.required],
          canciones: this.fb.array([this.addCancionControl()]),
        });
        break;
      
      case 'findList':
        this.form = this.fb.group({
          nombre: ['', Validators.required],
        });
        break;
      
      case 'deleteList':
        this.form = this.fb.group({
          nombre: ['', Validators.required],
        })
        break;
    }
  }

  submitForm(){
    if(!this.form.valid){
      console.log('Invalid Form');
      return;
    }
    switch (this.formType){
      case 'newList':
        this.reproductionListsService.createLista(this.form.value).subscribe({
          next: (response) =>{
            console.log('Form sent: ', response);
            this.listaInfo = response;
            this.formSubmitted = true;
            this.form.reset();
          },
          error:(error) => {
            console.error('Error sending data', error);
            if(error.error){
              this.errorMessage = error.error;
            }else{
              this.errorMessage = 'Hubo un problema creando la Lista de Reproducción'
            }
            this.formSubmitted = true;
            this.form.reset();
          }
        });
        break;

      case 'findList':
        this.reproductionListsService.findLista(this.form.value).subscribe({
          next: (response) =>{
            console.log('Form sent: ', response);
            this.errorMessage = '';
            this.listaInfo = response;
            this.formSubmitted = true;
            this.form.reset();
          },
          error:(error) => {
            console.error('Error sending data', error);
            if(error.status === 404 && error.error && error.error.error){
              this.errorMessage = error.error.error;
            }else{
              this.errorMessage = 'Hubo un problema buscando la Lista de Reproducción'
            }
            this.formSubmitted = true;
            this.listaInfo = null;
            this.form.reset();
          }
        })
        break;

      case 'deleteList':
        this.reproductionListsService.deleteLista(this.form.value).subscribe({
          next: (response) =>{
            console.log('Form sent: ', response);
            this.listaInfo = "Se ha eliminado la lista de forma Correcta";
            this.formSubmitted = true;
            this.form.reset();
            this.errorMessage = '';
          },
          error:(error) => {
            console.error('Error sending data', error);
            if(error.status === 404 && error.error && error.error.error){
              this.errorMessage = error.error.error;
            }else{
              this.errorMessage = 'Hubo un problema buscando la Lista de Reproducción'
            }
            this.formSubmitted = true;
            this.listaInfo = null;
            this.form.reset();
          }
        })
        break;
    }
  }

  addCancionControl(){
    return this.fb.group({
      titulo: ['', Validators.required],
      artista: ['', Validators.required],
      album: [''],
      anno: [''],
      genero: ['']
    })
  }

  get canciones(){
    return this.form.get('canciones') as FormArray;
  }

  addCancion(){
    this.canciones.push(
      this.addCancionControl()
    );
  }

  removeCancion(i:number){
    this.canciones.removeAt(i);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
