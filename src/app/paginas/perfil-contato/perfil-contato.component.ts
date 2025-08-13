import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from "../../componentes/container/container.component";
import { InterfaceContato } from '../../componentes/contato/interfaceContato';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ContatoService } from '../../services/contato.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfil-contato',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    RouterLink,
    DatePipe
  ],
  providers: [DatePipe],
  templateUrl: './perfil-contato.component.html',
  styleUrl: './perfil-contato.component.css'
})

export class PerfilContatoComponent implements OnInit {


  contato: InterfaceContato = {
    id: 1,
    nome: '',
    telefone: '',
    email: '',
    aniversario: '',
    redes: '', 
    observacoes: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private contatoService: ContatoService,
    private router: Router,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.contatoService.buscarContatoPorId(parseInt(id!)).subscribe((contato) => {
      this.contato = contato;
    }); 
  }

  deletarContato() {
    this.contatoService.deletarContato(this.contato.id).subscribe(() => {
      this.router.navigate(['/lista-contatos']);  
});
  }

  formatarData(aniversario: Date) {
  return this.datePipe.transform(aniversario, 'dd-MM-yyyy');
}
}
