import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class HubComponent {
  isSidebarOpen: boolean = false;
  isDarkMode: boolean = false;
  rows: { code: string; description: string; saleValue: number }[] = [];
  newCode: string = '';
  newSaleValue: number | null = null;
  productInfo: any = null; // Para armazenar as informações do produto

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  addRow(): void {
    if (this.newCode && this.newSaleValue !== null) {
      this.rows.push({
        code: this.newCode,
        description: 'Produto Padrão', // Padrão para teste
        saleValue: this.newSaleValue,
      });
      console.log('Rows após adicionar:', this.rows); // Monitorando os dados
      this.newCode = '';
      this.newSaleValue = null;
    }
  }

  // Método para carregar dados do Excel e normalizar os atributos
  async getProductData(code: string): Promise<any> {
    const response = await fetch('/assets/dados.xlsx');
    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
  
    console.log('ArrayBuffer carregado:', arrayBuffer);
    console.log('Uint8Array:', data);
  
    try {
      const workbook = XLSX.read(data, { type: 'array' }); // Garantir o tipo correto
      console.log('Planilhas disponíveis:', workbook.SheetNames);
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet).map((item: any) => ({
        Codigo: item['Código'],
        Descricao: item['Descrição'],
        Imagem: item['Imagem'],
        PrecoPublico: item['Preço Público'],
      }));
  
      console.log('Dados processados do Excel:', jsonData);
  
      const product = jsonData.find((item: any) => item.Codigo === code);
      console.log('Produto encontrado:', product);
  
      return product || null;
    } catch (error) {
      console.error('Erro ao ler o Excel:', error);
      return null;
    }
  }

  async searchProduct(): Promise<void> {
    if (this.newCode) {
      this.productInfo = await this.getProductData(this.newCode);

      if (this.productInfo) {
        console.log('Produto encontrado:', this.productInfo);
      } else {
        console.log('Produto não encontrado!');
      }
    }
  }

  removeRow(index: number): void {
    console.log('Índice para remover:', index); // Verificar qual índice
    this.rows.splice(index, 1);
    console.log('Rows após remover:', this.rows); // Verificar o estado w
  }

  logout(): void {
    console.log('Logout realizado!');
  }
}