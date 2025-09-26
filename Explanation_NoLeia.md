# Explicação do Código do NoLeia
## Explanation of the NoLeia Code

Este arquivo detalha o funcionamento do bookmarklet "NoLeia", um script projetado para automatizar a leitura de livros na plataforma Árvore. O código cria uma interface de usuário e controla a paginação automática.

This file details the functionality of the "NoLeia" bookmarklet, a script designed to automate book reading on the Árvore platform. The code creates a user interface and controls the automatic pagination.

O código-fonte principal está no arquivo `script.js` e é carregado dinamicamente pelo bookmarklet.
The main source code is in the `script.js` file and is loaded dynamically by the bookmarklet.

---

## Como funciona | How it works

1.  **Injeção de Interface / UI Injection**
    Ao ser executado, o script cria dinamicamente um botão flutuante e um painel de controle. Todo o HTML e o CSS necessários para essa interface são injetados diretamente na página da Árvore, sem a necessidade de arquivos externos.
    When executed, the script dynamically creates a floating button and a control panel. All the necessary HTML and CSS for this interface are injected directly into the Árvore page, without the need for external files.

2.  **Busca pelo Botão "Próxima Página" / "Next Page" Button Search**
    O script tenta localizar o botão de virar a página usando uma série de seletores CSS. Essa abordagem múltipla aumenta a chance de o script funcionar mesmo que a estrutura do site sofra pequenas alterações.
    The script attempts to locate the page-turning button using a series of CSS selectors. This multiple-selector approach increases the likelihood of the script working even if the site's structure undergoes minor changes.

3.  **Loop de Leitura Automática / Auto-Reading Loop**
    A função principal, `read()`, opera de forma recursiva. Ela clica no botão "próxima página", calcula um tempo de espera aleatório (com base nos valores definidos pelo usuário) e usa `setTimeout` para chamar a si mesma novamente após esse tempo, criando o efeito de paginação contínua.
    The main function, `read()`, operates recursively. It clicks the "next page" button, calculates a random wait time (based on user-defined values), and then uses `setTimeout` to call itself again after that time, creating the continuous pagination effect.

4.  **Gerenciamento de Estado / State Management**
    Uma única variável, `isStopped`, controla todo o fluxo. Ela funciona como um interruptor que determina se o loop de leitura deve continuar (`false`) ou parar (`true`). Os botões "Iniciar" e "Parar" na interface simplesmente alteram o valor dessa variável.
    A single variable, `isStopped`, controls the entire flow. It acts as a switch that determines whether the reading loop should continue (`false`) or stop (`true`). The "Start" and "Stop" buttons in the UI simply change the value of this variable.

5.  **Carregamento Dinâmico de Notificações / Dynamic Notification Loading**
    Para exibir notificações de status (como "Leitura iniciada"), o script carrega a biblioteca `Toastify.js` e seu CSS diretamente de um CDN. Isso mantém o código do bookmarklet leve e só carrega a dependência quando necessário.
    To display status notifications (like "Reading started"), the script loads the `Toastify.js` library and its CSS directly from a CDN. This keeps the bookmarklet code lightweight and only loads the dependency when needed.

---

## Código comentado | Commented code

```javascript
// Função principal que encapsula toda a lógica do script
// Main function that encapsulates all the script's logic
function arvoreReader() {
    // Variável que controla se a leitura automática está ativa ou parada
    // Variable that controls if the auto-reading is active or stopped
    let isStopped = true;
    
    // Tenta encontrar o botão de próxima página usando vários seletores para maior compatibilidade
    // Tries to find the next page button using various selectors for better compatibility
    const nextPageButton = document.querySelector('#root > main > div.sc-gTRrQi.cFSQkY > div:nth-child(3) > button') || 
                           document.querySelector('button[aria-label*="próxima"], button[aria-label*="next"], button[aria-label*="Next"]');

    // Cria o botão flutuante e o menu, injetando o HTML e o CSS na página
    // Creates the floating button and the menu, injecting the HTML and CSS into the page
    const floatingButton = document.createElement('div');
    floatingButton.id = 'noleia-floatingBtn';
    floatingButton.innerHTML = `<style>...</style><img src="https://i.imgur.com/9n0wbej.png" alt="NoLeia">`;
    document.body.appendChild(floatingButton);

    const menu = document.createElement('div');
    menu.id = 'noleia-menu';
    menu.innerHTML = `... (toda a estrutura HTML do menu) ...`;
    document.body.appendChild(menu);

    // Carrega a biblioteca Toastify.js (e seu CSS) de um CDN para as notificações
    // Loads the Toastify.js library (and its CSS) from a CDN for notifications
    function loadToastify() { /* ... */ }

    // Função para exibir uma notificação customizada usando Toastify
    // Function to show a custom notification using Toastify
    function showToast(text) { /* ... */ }

    // Converte segundos para milissegundos para usar com setTimeout
    // Converts seconds to milliseconds for use with setTimeout
    function secondsToMilliseconds(seconds) {
        return seconds * 1000;
    }

    // Retorna um número aleatório dentro de um intervalo (min/max)
    // Returns a random number within a range (min/max)
    function randomAtRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // O coração da automação: a função que lê e vira a página
    // The heart of the automation: the function that reads and turns the page
    function read() {
        const minTime = parseInt(document.getElementById('noleia-minTime').value) || 5;
        const maxTime = parseInt(document.getElementById('noleia-maxTime').value) || 10;
        const statusDiv = document.getElementById('noleia-status');

        // Continua apenas se a leitura não estiver parada e o botão existir
        // Proceeds only if reading is not stopped and the button exists
        if (!isStopped && nextPageButton) {
            try {
                // Simula o clique no botão de próxima página
                // Simulates a click on the next page button
                nextPageButton.click();
                
                // Calcula o tempo aleatório para a próxima virada de página
                // Calculates the random time for the next page turn
                const nextTime = randomAtRange(minTime, maxTime);
                statusDiv.textContent = `Próxima em ${nextTime} segundos`;
                
                // Agenda a próxima chamada a esta mesma função (recursão)
                // Schedules the next call to this same function (recursion)
                setTimeout(read, secondsToMilliseconds(nextTime));
            } catch (error) {
                // Para o processo em caso de erro
                // Stops the process in case of an error
                isStopped = true;
            }
        }
    }

    // Alterna a visibilidade dos botões 'Iniciar' e 'Parar'
    // Toggles the visibility of the 'Start' and 'Stop' buttons
    function toggleButtons() { /* ... */ }

    // Event listener para o botão 'Iniciar'
    // Event listener for the 'Start' button
    document.getElementById('noleia-startBtn').addEventListener('click', function() {
        // ... (lógica para verificar se o botão foi encontrado)
        isStopped = false; // Altera o estado para ATIVO
        toggleButtons();
        read(); // Inicia o loop de leitura
    });

    // Event listener para o botão 'Parar'
    // Event listener for the 'Stop' button
    document.getElementById('noleia-stopBtn').addEventListener('click', function() {
        isStopped = true; // Altera o estado para PARADO
        toggleButtons();
    });

    // ... (outros event listeners para o menu e botão flutuante)

    // Inicia a biblioteca de notificações e mostra uma mensagem de boas-vindas
    // Initializes the notification library and shows a welcome message
    loadToastify();
    showToast('NoLeia carregado com sucesso');
}

// Verifica se estamos no site correto antes de executar qualquer coisa
// Checks if we are on the correct website before executing anything
if (window.location.hostname.includes('arvore.com.br')) {
    // Verifica se o script já não foi injetado antes
    // Checks if the script has not already been injected
    if (!document.getElementById('noleia-menu')) {
        // Espera o conteúdo da página carregar antes de rodar o script
        // Waits for the page content to load before running the script
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', arvoreReader);
        } else {
            arvoreReader();
        }
    }
} else {
    // Alerta o usuário se ele tentar rodar o script em um site errado
    // Alerts the user if they try to run the script on the wrong site
    alert('NoLeia: Use este script apenas no site da Árvore');
}
