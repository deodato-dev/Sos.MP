# Minhas Notas (Sos.MP)

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

O "Minhas Notas" é um aplicativo projetado com uma interface que simula um gerenciador de anotações comuns. No entanto, seu verdadeiro propósito é atuar como um **aplicativo de disfarce para a denúncia de violência contra a mulher**. Ele oferece um canal seguro, rápido e discreto para que vítimas possam acionar pedidos de socorro (SOS) sem levantar suspeitas.

---

## 🛡️ Funcionalidades de Segurança

*   **Interface de Disfarce:** A tela principal funciona perfeitamente como um bloco de notas inofensivo para não causar desconfiança no agressor.
*   **Acionamento Discreto:** Mecanismo oculto (gatilho secreto) para envio imediato de alerta de emergência.
*   **Ausência de Rastros:** Conexão direta com o backend em nuvem, garantindo que as denúncias não fiquem salvas no armazenamento visível do aparelho.

## 🚨 Mecanismo de Acionamento (Gatilho Secreto)

*   **Toque Longo (Long Press):** A usuária deve pressionar e segurar o título "Minhas Notas" (no cabeçalho do aplicativo) por 3 segundos contínuos.
*   **Feedback Discreto (Haptic):** Ao acionar o gatilho, a tela não muda, mas o celular emite uma leve vibração para confirmar à vítima que o alerta foi disparado.
*   **Ação em Segundo Plano:** O aplicativo coleta silenciosamente a localização do dispositivo e envia o pedido de emergência diretamente para o banco de dados.

## 🚀 Tecnologias Utilizadas

*   **React Native / Expo:** Construção da interface nativa e multiplataforma (iOS, Android e Web) de forma ágil.
*   **Firebase:** Utilizado como banco de dados em nuvem para receber e rotear os alertas de forma rápida e segura.
*   **TypeScript & Async Storage:** Tipagem estática para maior segurança no código e armazenamento local auxiliar.

## 📥 Instalação e Execução

1. Clone o repositório para o seu ambiente local (`git clone <url-do-repositorio>`) e acesse a pasta do projeto.
2. Instale todas as dependências executando `npm install` ou `yarn install`.
3. Configure o **Firebase** inserindo as credenciais do seu projeto no arquivo de ambiente (ex: `.env`).
4. Inicie o servidor do Expo executando `npm start` ou `yarn start`.

---
# My Notes (Sos.MP)

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

"My Notes" is an app designed with an interface that simulates a standard note-taking tool. However, its true purpose is to act as a **disguised application for reporting violence against women**. It provides a safe, fast, and discreet channel for victims to trigger distress signals (SOS) without raising suspicion.

---

## 🛡️ Security Features

*   **Disguised Interface:** The main screen works perfectly as a harmless notepad to avoid arousing suspicion from the abuser.
*   **Discreet Activation:** A hidden mechanism (secret trigger) ensures the immediate dispatch of emergency alerts.
*   **No Traces Left:** Direct connection to the cloud backend ensures that reports are not saved in the device's visible storage.

## 🚨 Trigger Mechanism (Secret Trigger)

*   **Long Press:** The user must press and hold the "My Notes" title (in the app's header) for 3 continuous seconds.
*   **Discreet Feedback (Haptic):** Upon triggering, the screen does not change, but the phone emits a slight vibration to confirm to the victim that the alert has been sent.
*   **Background Action:** The app silently collects the device's location and sends the emergency request directly to the database.

## 🚀 Technologies Used

*   **React Native / Expo:** For building the native and cross-platform interface (iOS, Android, and Web) efficiently.
*   **Firebase:** Used as a cloud database to receive and route alerts quickly and securely.
*   **TypeScript & Async Storage:** Static typing for greater code safety and auxiliary local storage.

## 📥 Installation and Execution

1. Clone the repository to your local environment (`git clone <repository-url>`) and open the project folder.
2. Install all dependencies by running `npm install` or `yarn install`.
3. Configure **Firebase** by inserting your project credentials into the environment file (e.g., `.env`).
4. Start the Expo server by running `npm start` or `yarn start`.
