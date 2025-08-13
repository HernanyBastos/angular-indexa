import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//Interfaces
import { InterfaceContato } from '../componentes/contato/interfaceContato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private readonly API_URL: string = 'http://localhost:3000/contatos';


  constructor(private http: HttpClient) {


  }

  obterContatos(): Observable<InterfaceContato[]> {
    return this.http.get<InterfaceContato[]>(this.API_URL);
  }


  salvarContato(contato: InterfaceContato): Observable<InterfaceContato> {
    return this.http.post<InterfaceContato>(this.API_URL, contato);
  }

  buscarContatoPorId(id: number): Observable<InterfaceContato> {
    return this.http.get<InterfaceContato>(`${this.API_URL}/${id}`);
  }

  deletarContato(id: number): Observable<InterfaceContato> {
    return this.http.delete<InterfaceContato>(`${this.API_URL}/${id}`);
}

editarContato( contato: InterfaceContato): Observable<InterfaceContato> {
    return this.http.put<InterfaceContato>(`${this.API_URL}/${contato.id}`, contato);
  }

  editarOuSalvarContato(contato: InterfaceContato): Observable<InterfaceContato> {
    if (contato.id) {
      return this.editarContato(contato);
    } else {
      return this.salvarContato(contato);
    }
  }

}

