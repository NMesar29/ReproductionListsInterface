import { Component, OnInit } from '@angular/core';
import { Lista } from '../../models/lista';
import { ReproductionListsService } from '../../services/reproduction-lists-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reproduction-lists',
  imports: [CommonModule],
  templateUrl: './reproduction-lists.html',
  styleUrl: './reproduction-lists.css'
})
export class ReproductionLists {
  reproductionLists: Lista[] = []

  constructor(private reproductionListsService: ReproductionListsService){}
  ngOnInit():void{
    this.getListas();
  }

  getListas(){
    this.reproductionListsService.getListas().subscribe({
      next: (data) => this.reproductionLists = data,
      error: (err) => console.error('Error obteniendo Listas: ', err)
    });
  }

}
