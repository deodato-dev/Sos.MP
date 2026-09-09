# Minhas Notas (Sos.MP)

![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

O "Minhas Notas" é um aplicativo com uma interface que simula perfeitamente um bloco de anotações comum. No entanto, seu verdadeiro propósito é atuar como um **aplicativo de disfarce para a denúncia e pedido de socorro de vítimas de violência doméstica**. Ele oferece um canal seguro e discreto para que as vítimas possam acionar uma rede de apoio sem levantar as suspeitas de seus agressores.

---

## 🛡️ Como Funciona o Disfarce (Gatilho Secreto)

O aplicativo não possui um botão de emergência visível na tela inicial. O acesso ao sistema de socorro é feito da seguinte forma:

1. **Acesso à Área Segura:** A usuária deve digitar uma **senha secreta** (o padrão é `9999`) no campo de texto de criar nova nota e apertar o botão "Salvar".
2. **Redirecionamento Invisível:** O aplicativo reconhece a senha, emite uma leve vibração (feedback tátil) e redireciona a vítima para uma tela oculta chamada **"Área Segura"**, em vez de salvar a nota.
3. **Botão de Pânico:** Dentro da Área Segura, há um botão de emergência ("PEDIR AJUDA"). Ao ser pressionado, o app silenciosamente:
   * Captura a **localização GPS em tempo real**.
   * Envia um **SMS automático** para um número de emergência pré-cadastrado contendo a localização (link do Google Maps).
   * Registra o alerta em um **banco de dados na nuvem** (Firebase) para acionamento de autoridades ou redes de apoio.

## ⚙️ Funcionalidades

*   **Interface Inofensiva:** Tela inicial funcional que apenas adiciona notas temporárias, não gerando desconfiança.
*   **Configuração Personalizada:** Na Área Segura, a usuária pode alterar sua Senha Secreta e definir o Número de Emergência (guardião).
*   **Suporte Bilíngue:** Troca rápida de idioma (Português/Inglês) na tela inicial.
*   **Ausência de Rastros:** Conexão direta com a nuvem, garantindo que o registro do pedido de socorro não fique acessível no aparelho.

## 🚀 Tecnologias Utilizadas

*   **React Native / Expo:** Construção da interface nativa e multiplataforma. Utilização do `expo-location` para GPS e `expo-sms` para envio de mensagens.
*   **Firebase (Firestore):** Banco de dados em nuvem para registrar os alertas de forma imediata.
*   **AsyncStorage:** Armazenamento local leve para salvar a senha secreta, o idioma de preferência e o número de emergência.

## 📥 Instalação e Execução

1. Clone o repositório para o seu ambiente local (`git clone <url-do-repositorio>`) e acesse a pasta do projeto.
2. Instale todas as dependências executando `npm install` ou `yarn install`.
3. Configure o **Firebase** no arquivo `firebase.js` com as credenciais do seu projeto.
4. Inicie o servidor do Expo executando `npm start` ou `yarn start` (utilize o app *Expo Go* no celular para testar as funcionalidades de GPS e SMS).

---

# My Notes (Sos.MP)

![Status](https://img.shields.io/badge/Status-In%20Development-yellow)

"My Notes" is an app with an interface that perfectly simulates a standard notepad. However, its true purpose is to act as a **disguised application for domestic violence victims to report and ask for help**. It provides a safe and discreet channel for victims to trigger their support network without raising their abuser's suspicion.

---

## 🛡️ How the Disguise Works (Secret Trigger)

The app does not have a visible emergency button on the home screen. Accessing the rescue system works as follows:

1. **Accessing the Safe Area:** The user must type a **secret password** (default is `9999`) into the "new note" text field and press the "Save" button.
2. **Invisible Redirection:** The app recognizes the password, emits a slight vibration (haptic feedback), and redirects the victim to a hidden screen called the **"Safe Area"**, instead of saving a note.
3. **Panic Button:** Inside the Safe Area, there is an emergency button ("ASK FOR HELP"). When pressed, the app silently:
   * Captures the **real-time GPS location**.
   * Sends an **automatic SMS** to a pre-registered emergency number containing the location (Google Maps link).
   * Logs the alert in a **cloud database** (Firebase) for authorities or support networks to act upon.

## ⚙️ Features

*   **Harmless Interface:** A functional home screen that only adds temporary notes, avoiding any suspicion.
*   **Custom Configuration:** In the Safe Area, the user can change their Secret Password and set the Emergency Number (guardian).
*   **Bilingual Support:** Quick language toggle (Portuguese/English) directly on the home screen.
*   **No Traces Left:** Direct connection to the cloud ensures the SOS request logs are not accessible on the device.

## 🚀 Technologies Used

*   **React Native / Expo:** For building the native cross-platform interface. Uses `expo-location` for GPS tracking and `expo-sms` for messaging.
*   **Firebase (Firestore):** Cloud database for immediate alert registration.
*   **AsyncStorage:** Lightweight local storage to save the secret password, language preference, and emergency number.

## 📥 Installation and Execution

1. Clone the repository to your local environment (`git clone <repository-url>`) and open the project folder.
2. Install all dependencies by running `npm install` or `yarn install`.
3. Configure **Firebase** in the `firebase.js` file with your project credentials.
4. Start the Expo server by running `npm start` or `yarn start` (use the *Expo Go* app on a physical device to test GPS and SMS features).
