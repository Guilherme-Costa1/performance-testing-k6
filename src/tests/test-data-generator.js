import { generateCPF, generateCNPJ, generateEmail, generateCellphone, generateStrongPassword } from '../utils/data-generator.js';

export default function () {
    let cpf = generateCPF();
    let cnpj = generateCNPJ();
    let email = generateEmail();
    let cellphone = generateCellphone();
    let password = generateStrongPassword();

    console.log(`📢 Dados Gerados:
      - CPF: ${cpf}
      - CNPJ: ${cnpj}
      - E-mail: ${email}
      - Celular: ${cellphone}
      -Password: ${password}`);  
    }
