<p align="center">
  <a href="https://github.com/frreiro/Valex-API">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f355.svg" alt="readme-logo" width="80" height="80">
  </a>
 
  <h3 align="center">
    Valex-API
  </h3>
  
  <p align="center">Valex é uma API de cartões de benefícios. <br/>A API é responsável pela criação, recarga, ativação, assim como o processamento das compras.</p>
</p>

## Usage

```bash
$ git clone https://github.com/frreiro/Valex-API

$ cd Valex-API

$ npm install

$ npm run dev
```

API:

```
- POST /card/create (autenticada)
    - Rota para criar um novo cartão
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "employeeId": 1,
        "cardType": 'groceries'|  'restaurant'| 'transport'|'education'| 'health'
    }
- POST /card/activate
    - Rota para ativar um cartão
    - headers: {}
    - body: {
    "cardId": 1,
    "password": "1234",
    "cvc": "123"
    }
- GET /card/:id/statements
    - Rota para listar todas as transações e saldo da conta
    - headers: {}
    - body: {}
- POST /card/block
    - Rota para bloquear um cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "1234"
    }
- POST /card/unblock
    - Rota para desbloquear um cartão
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "1234"
    }
- POST /recharge (autenticada)
    - Rota para recarregar um cartão
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "cardId": 1,
        "amount": 1234
    }
- POST /purchase 
    - Rota para realizar uma compra
    - headers: {}
    - body: {
        "cardId": 1,
        "password": "1234",
        "businessId": 1,
        "amount": 1234
    }

```
