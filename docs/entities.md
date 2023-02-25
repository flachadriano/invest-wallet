## User
- user_id: number
- name: string
- email: string
- password: string
- year_start: number

## Broker
- broker_id: number
- user_id: number (foreign key)
- acronym: string
- name: string
- cnpj: string

## Asset
- asset_id: number
- user_id: number (foreign key)
- origin: number [1-Acoes, 2-BDR, 3-Criptomoeda, 4-Fundo Imobiliario, 5-Renda Fixa]
- acronym: string
- name: string
- cnpj: string
- broker_id: number (foreign key)
- active: boolean

## Wallet
- wallet_id: number
- user_id: number (foreign key)
- name: string
- description: string

## Wallet_Asset
- wallet_asset_id: numer
- wallet_id: number (foreign key)
- asset_id: number (foreign key)
- targe_type: number [1-percent, 2-value]
- target: number

## Wallet_Month
- wallet_month_id: number
- wallet_id: number (foreign key)
- asset_id: number (foreign key)
- asset_target_type: number
- asset_targe: number
- quantity: float
- unit_price: float
- total: float
- base_month: date

## Wallet_Transaction
- transaction_id: number
- wallet_id: number (foreign key)
- type: number [1-Aluguel, 2-Bonificacao, 3-Compra, 4-Dividendo, 5-Juros sobre capital proprio, 6-Provento, 7-Rendimento, 8-Subscrição, 9-Venda]
- asset_id: number (foreign key)
- transaction_date: date
- unit_price: float
- quantity: float
- total: float
