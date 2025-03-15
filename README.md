# 🚀 Testes de Performance com K6, InfluxDB e Grafana

Este projeto realiza **testes de carga e performance** utilizando o **K6**, com armazenamento dos resultados no **InfluxDB** e visualização no **Grafana**.

---

## 📌 **Pré-requisitos**
Antes de rodar os testes, certifique-se de que tenha instalado:
- **Docker Desktop** 🐳 ([Baixar aqui](https://www.docker.com/get-started))
- **Node.js** ⚡ ([Baixar aqui](https://nodejs.org/))
- **K6** ([Instalar via CLI](https://k6.io/docs/getting-started/installation/))

---

## ⚙️ **Configuração do Projeto**
Agora, siga os passos abaixo para configurar o ambiente corretamente:

### **1️⃣ Clone o repositório e entre na pasta do projeto**
```sh
git clone https://github.com/seu-repositorio/testes-k6.git
cd testes-k6

## 🚀 Como Executar os Testes

Agora que tudo está configurado, você pode rodar testes de carga e monitoramento no K6. Basta escolher um dos métodos abaixo:

1️⃣ Rodar o teste e enviar os resultados para o InfluxDB/Grafana
k6 run --out influxdb=http://localhost:8086/k6 src/tests/test.js

📊 Visualizar os Resultados no Grafana
Após executar os testes e enviar os dados para o InfluxDB, você pode acessar o Grafana e visualizar os gráficos de desempenho.

2️⃣ Acesse o Grafana abrindo o seguinte link no navegador:
http://localhost:3000

3️⃣ Faça login com as credenciais padrão:

Usuário: admin
Senha: admin

4️⃣ Verifique os principais painéis do Grafana:
✔ Errors Per Second → Verifica a taxa de erros HTTP (429, 500, etc.)
✔ Request Duration → Monitora os tempos de resposta das requisições
✔ Success & Failures → Exibe a taxa de sucesso e falhas dos testes

---

### **📌 Principais Componentes da Arquitetura**
Cada arquivo tem um papel específico, garantindo modularidade e organização:

#### **1️⃣ `config/` - Configuração e Gerenciamento de Métricas**
📌 **Essa pasta contém arquivos que controlam as métricas e o comportamento dos testes.**  
- **`metricas.js`** → Gerencia e envia métricas como tempos de resposta, falhas, taxa de sucesso e Apdex Score.
- **`thresholds.js`** → Define critérios para abortar testes (exemplo: se a taxa de falhas for superior a 1%).
- **`verifyResponse.js`** → Valida as respostas HTTP recebidas, registrando e monitorando falhas.

#### **2️⃣ `tests/` - Implementação dos Testes K6**
📌 **Contém os scripts usados para executar os testes de carga.**
- **`test.js`** → Código principal dos testes, que chama as APIs definidas e registra as métricas.

#### **3️⃣ `utils/` - Ferramentas Auxiliares**
📌 **Scripts que facilitam a execução e manipulação das requisições**
- **`httpRequest.js`** → Faz requisições HTTP, abstraindo a lógica para facilitar futuras modificações nos testes.

#### **4️⃣ `reports/` - Relatórios Gerados**
📌 **Após a execução dos testes, os relatórios de desempenho são armazenados aqui, facilitando a análise dos resultados.**

#### **5️⃣ `docker-compose.yml` - Configuração do Ambiente**
📌 **Arquivo que configura os containers do InfluxDB, Grafana e K6 para rodar os testes automaticamente.**

---

### **📌 Fluxo de Execução da Arquitetura**
1️⃣ O arquivo **`test.js`** inicia a execução dos testes.  
2️⃣ As chamadas **HTTP são feitas pelo `httpRequest.js`**, que gerencia as requisições.  
3️⃣ O **status HTTP e tempos de resposta são validados pelo `verifyResponse.js`**.  
4️⃣ Os resultados são **registrados no `metricas.js`**, que envia os dados para o InfluxDB.  
5️⃣ Se as regras do **`thresholds.js`** forem violadas, o **teste pode ser abortado automaticamente**.  
6️⃣ Os resultados são visualizados em **tempo real no Grafana**.  

---

### **📌 Benefícios da Arquitetura Modularizada**
✅ **Separação de responsabilidades** → Código organizado e fácil de manter.  
✅ **Reutilização de código** → Funções como `recordMetrics()` e `verifyResponse()` podem ser reutilizadas em diferentes testes.  
✅ **Facilidade de escalar** → Podemos facilmente adicionar novos testes sem modificar a estrutura geral.  
✅ **Monitoramento eficiente** → A integração com o InfluxDB e Grafana permite que os testes sejam analisados em tempo real.  

---