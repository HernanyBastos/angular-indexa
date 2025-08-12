import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//Interfaces
import { InterfaceContato } from '../componentes/contato/interfaceContato';
import { Observable } from 'rxjs';

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

}

