# 🎫 Sistema de Gerenciamento de Tickets

Projeto desenvolvido como desafio prático para vaga de Desenvolvedor Full Stack (base Salesforce).  
O sistema consiste em uma API REST em Java com Spring Boot e uma interface web em JavaScript puro para gerenciar chamados técnicos.

## 📌 Funcionalidades

### Back-end (API REST)
- CRUD completo de tickets
- Validações de dados (Bean Validation)
- Tratamento global de exceções
- Estrutura em camadas: Controller, Service, Repository, DTO
- Armazenamento em memória (ConcurrentHashMap)

### Front-end (Interface web)
- Listagem de tickets com filtro por status
- Criação de novos tickets
- Atualização de status (combo box)
- Exclusão de tickets
- Feedback visual (alertas de sucesso/erro)
- Consumo da API com `fetch`

## 🛠️ Tecnologias utilizadas

### Back-end
- Java 17
- Spring Boot 3.1.5
- Maven
- Lombok
- Jakarta Validation
- JUnit (testes)

### Front-end
- HTML5
- CSS3 (estilização simples)
- JavaScript (Vanilla)
- Fetch API

## 📁 Estrutura do projeto
<img width="180" height="278" alt="image" src="https://github.com/user-attachments/assets/cc2d1680-1ba2-4416-b188-db1106d201e9" />



## 🚀 Como executar o projeto

### Pré-requisitos
- Java 17 instalado e configurado (`JAVA_HOME`)
- Maven 3.9+ instalado e configurado (`MAVEN_HOME`)
- VS Code (ou editor de sua preferência)
- Navegador web moderno

### Passo a passo

#### 1. Clonar o repositório
```bash
git clone https://github.com/SEU_USUARIO/ticket-system.git
cd ticket-system

Executar o back-end:
cd backend
mvn spring-boot:run

-API estará disponível em http://localhost:8080/tickets

