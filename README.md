
# 1. Health Insurance Cross-Sell Prediction

## 2. Descrição
Projeto de Ciência de Dados para determinar os clientes mais propensos a adquirir um seguro de automóvel a partir de uma base de clientes que já possuem seguro saúde — otimizando custos e aumentando a agilidade das campanhas de marketing.

## 3. Problema de Negócio

### 3.1. Contexto
Seguradoras frequentemente oferecem múltiplos produtos (vida, saúde, automóvel). O *cross-sell* busca vender novos produtos a clientes existentes. No caso, vender seguro de automóvel a quem já possui seguro saúde.

### 3.2. Desafio
Campanhas de *cross-sell* geram custos — humanos e financeiros. O desafio está em priorizar os clientes mais propensos a comprar para tornar o processo mais eficiente.

### 3.3. Solução proposta
Treinamento de um modelo de classificação com Machine Learning que estima a probabilidade de compra e ordena a lista de clientes conforme esse potencial.

## 4. Objetivos do Projeto

- Entender como as variáveis influenciam a compra do seguro.
- Encontrar o melhor modelo de classificação para o problema.
- Disponibilizar o modelo via API pública.
- Facilitar o uso da API por pessoas não técnicas através do Google Sheets.

## 5. Conjunto de Dados

- Fonte: [Kaggle - Health Insurance Cross-Sell Prediction](https://www.kaggle.com/datasets/anmolkumar/health-insurance-cross-sell-prediction)
- Dimensões: 381 mil linhas x 12 colunas

## 6. Abordagem e Estrutura do Notebook

1. **Descrição dos dados**  
   Estatísticas descritivas para entender o volume e a estrutura dos dados.

2. **Feature Engineering**  
   Não foram criadas novas variáveis, mas algumas foram reformatadas.

3. **Limpeza e filtragem**  
   O dataset estava limpo e não exigiu remoção de registros ou colunas.

4. **Análise Exploratória de Dados (EDA)**  
   Testes de hipóteses sobre como cada feature se relaciona com a variável-alvo.

5. **Preparação dos dados**  
   - *Rescaling*: `MinMaxScaler` e `RobustScaler`
   - *Encoding*: `OrdinalEncoder` e `TargetEncoder`

6. **Seleção de Features**  
   Utilização do método Boruta, análise de importância e coerência com a EDA. Selecionadas 7 variáveis.

7. **Modelagem de Machine Learning**  
   - Modelos testados: KNN, Logistic Regression, Extra Trees, Random Forest, XGBoost.
   - Técnicas adicionais: SMOTE e PCA (sem ganhos significativos).
   - Métrica de avaliação: `Precision@k`, `Recall@k` e `F1-score@k` (por se tratar de ordenação).

8. **Fine Tuning**  
   O modelo escolhido foi o **XGBoost**, com busca aleatória de hiperparâmetros e validação cruzada (`5-fold`).

9. **Tradução da Métrica para Negócio**  
   O modelo é capaz de ordenar corretamente os clientes mais propensos a comprar. Com base nisso:
   - **Economia estimada**: +R$ 400.000
   - **Potencial de faturamento**: +R$ 70.000.000

10. **Deploy e Integração**  
   - API criada com Flask, disponível publicamente:  
     🔗 [`https://healthinsurance-api-render.onrender.com/predict`](https://healthinsurance-api-render.onrender.com/predict)
   - Deploy feito na nuvem usando **Render**
   - A API recebe dados no formato JSON e retorna a probabilidade de conversão para seguro automotivo
   - Integração com **Google Sheets** via Google Apps Script

## 7. Tecnologias Utilizadas

- **Linguagem**: Python 3
- **Bibliotecas**: Pandas, Scikit-learn, XGBoost, Boruta, Flask
- **Infraestrutura**: Render, Google Sheets + Apps Script
