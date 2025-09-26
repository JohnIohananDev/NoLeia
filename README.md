# NoLeia (Leitor Automático para Árvore)

Um bookmarklet que automatiza a leitura de livros na plataforma Árvore, virando as páginas em intervalos de tempo configuráveis para simular uma leitura natural.

Este script é uma versão refatorada e aprimorada do `ArvoreReader` original, com nova interface, funcionalidades adicionais e correção de bugs.
This script is a refactored and enhanced version of the original `ArvoreReader`, featuring a new interface, additional functionalities, and bug fixes.

---

## Créditos | Credits

* **Script Original (ArvoreReader):** [JuniorSchueller](https://github.com/JuniorSchueller)
* **Refatoração, Correções e Nova Interface (NoLeia):** [Wohn (JohnIohananDev)](https://github.com/JohnIohananDev)

---

## Como usar | How to use

1.  **Crie um novo favorito** no seu navegador (geralmente clicando com o botão direito na barra de favoritos e selecionando "Adicionar página" ou similar).
    **Create a new bookmark** in your browser (usually by right-clicking the bookmarks bar and selecting "Add page" or similar).

2.  Dê um nome a ele, como `NoLeia`.
    Give it a name, like `NoLeia`.

3.  No campo de **URL** ou **Endereço**, cole o script abaixo.
    In the **URL** or **Address** field, paste the script below.

### Script

```javascript
javascript:(function(){if(window.location.hostname.includes('arvore.com.br')){if(!document.getElementById('noleia-menu')){fetch('[https://raw.githubusercontent.com/JohnIohananDev/NoLeia/main/script.js').then(r=](https://raw.githubusercontent.com/JohnIohananDev/NoLeia/main/script.js').then(r=)>{if(!r.ok)throw new Error('Script não encontrado');return r.text()}).then(s=>{eval(s);console.log('NoLeia carregado')}).catch(e=>{console.error('Erro:',e);alert('Erro ao carregar NoLeia')})}else{alert('⚠%EF%B8%8F NoLeia já está carregado!')}}else{alert('NoLeia: Use apenas no site da Árvore');window.open('[https://arvore.com.br/','_blank](https://arvore.com.br/','_blank)')}})();
