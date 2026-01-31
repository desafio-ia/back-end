# 📖 Pokedex UNIFOR API

<p align="center">
  <img src="https://img.shields.io/badge/Status-Conclu%C3%ADdo-blue" alt="Status do Projeto">
  <img src="https://img.shields.io/badge/Tecnologia-Back%20End-blue" alt="Tecnologia">
  <img src="https://img.shields.io/badge/Linguagens-TypeScript%20%7C%20Node.js%20%7C%20Express-blueviolet" alt="Linguagens Utilizadas">
</p>

---

## 🧩 Informações Básicas

### 📌 Descrição resumida
A **Pokedex UNIFOR** é uma API desenvolvida para integrar o gerenciamento de usuários com uma **Rede Neural Convolucional (CNN)** focada na identificação de imagens.  
O sistema permite que o usuário realize a **"captura" de até 10 Pokémons diferentes** através do envio de fotos para processamento.

### 🎯 Objetivo do Projeto
Atuar como a base de uma aplicação de **visão computacional gamificada**, gerenciando:
- Criação de usuários  
- Envio de imagens para microserviços de IA  
- Armazenamento de dados históricos  
- Avaliações de modelos de classificação  

---

## ⚙️ Execução / Instalação

### 🔧 Pré-requisitos
- Git instalado  
- Node.js v18+  
- Docker & Docker Compose instalados  

### ▶️ Como executar

Clone o repositório:
```bash
git clone https://github.com/garc1a04/pokedex-unifor-api.git
cd pokedex-unifor-api
```

Inicie o ambiente via Docker:
```bash
docker-compose up -d
```
Após iniciar os containers, a API ficará disponível em:
👉 http://localhost:8080

Você pode acessar a documentação interativa via Swagger para testar os endpoints de autenticação e classificação.

---

## 🧠 Estrutura e funcionalidades

### 🔑 Principais recursos

- Identificação automática de 10 Pokémons via upload de imagens
- Integração com microserviço para classificação e retorno de detalhes

### 👤 Gestão de Usuário e Autenticação

- Fluxo seguro com JWT
    - Registro
    - Login
    - Refresh Token
- Histórico de capturas do usuário autenticado
- Alteração de perfil

### 🤖 Gerenciamento de Modelos de IA
- Registro de novos modelos
- Listagem de avaliações de performance
- Sistema de feedback para validação das classificações

---

### 🧰 Tecnologias utilizadas

| Camada        | Tecnologias               |
| :------------ | :------------------------ |
| **Back-end**  | Node.js, Express, TypeScript, TypeORM |
| **Database**  | PostgreSQL |
| **Documentação**  | Swagger (OpenAPI 3.0) |
| **Infra**  | Docker |

---

### 🛠️ Configurações úteis

- Autenticação
    - Para testar rotas protegidas no Swagger, utilize o endpoint /auth/login para obter o token e insira-o no botão Authorize.

- Upload de Imagens
    - O endpoint /classifications/upload aceita arquivos de imagem para processamento pela CNN.

- Variáveis de Ambiente
    - Configure as credenciais do banco de dados no arquivo .env para garantir a persistência correta via TypeORM.

---

### 📚 Sobre o projeto

Este projeto foi desenvolvido como uma solução full-stack para integrar inteligência artificial e desenvolvimento web.
Ele demonstra o uso de microserviços para isolar a carga de processamento da CNN, mantendo a API core rápida e segura para a gestão de usuários.

<p align="center"> Feito com ☕ e dedicação por <a href="https://github.com/garc1a04">Guilherme Garcia</a> 💻 </p>