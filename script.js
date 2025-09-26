function arvoreReader() {
    let isStopped = true;
    
    
    const nextPageButton = document.querySelector('#root > main > div.sc-gTRrQi.cFSQkY > div:nth-child(3) > button') || 
                          document.querySelector('button[aria-label*="próxima"], button[aria-label*="next"], button[aria-label*="Next"]') || 
                          document.querySelector('button:contains("Próxima"), button:contains("Next")');

   
    const floatingButton = document.createElement('div');
    floatingButton.innerHTML = `
        <style>
            /* Estilos globais do NoLeia - Tema Escuro Moderno */
            #noleia-floatingBtn {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                z-index: 10000;
                border: none;
                overflow: hidden;
            }
            
            #noleia-floatingBtn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }
            
            #noleia-floatingBtn:hover::before {
                left: 100%;
            }
            
            #noleia-floatingBtn:hover {
                transform: scale(1.15) rotate(5deg);
                box-shadow: 0 12px 40px rgba(102, 126, 234, 0.4);
            }
            
            #noleia-floatingBtn:active {
                transform: scale(1.05);
            }
            
            #noleia-floatingBtn img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                object-fit: cover;
                filter: brightness(0) invert(1);
                transition: transform 0.3s ease;
            }
            
            #noleia-floatingBtn:hover img {
                transform: rotate(15deg);
            }
            
            #noleia-menu {
                position: fixed;
                top: 100px;
                right: 20px;
                width: 350px;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                padding: 25px;
                border-radius: 20px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
                z-index: 10000;
                display: none;
                border: 1px solid rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                animation: menuSlideIn 0.3s ease-out;
            }
            
            @keyframes menuSlideIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }
            
            .noleia-header {
                text-align: center;
                margin-bottom: 25px;
                position: relative;
            }
            
            .noleia-header h2 {
                color: #fff;
                font-size: 1.8rem;
                font-weight: 700;
                margin-bottom: 5px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                -webkit-background-clip: text;
                background-clip: text;
                color: transparent;
                text-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
            }
            
            .noleia-header::after {
                content: '';
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 50px;
                height: 3px;
                background: linear-gradient(45deg, #667eea, #764ba2);
                border-radius: 2px;
            }
            
            .noleia-input-group {
                margin-bottom: 20px;
            }
            
            .noleia-label {
                display: block;
                color: #e2e8f0;
                font-size: 0.9rem;
                font-weight: 600;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .noleia-input {
                width: 100%;
                padding: 12px 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                color: #fff;
                font-size: 1rem;
                transition: all 0.3s ease;
                backdrop-filter: blur(5px);
            }
            
            .noleia-input:focus {
                outline: none;
                border-color: #667eea;
                box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.3);
                background: rgba(255, 255, 255, 0.08);
            }
            
            .noleia-btn {
                width: 100%;
                padding: 14px 20px;
                border: none;
                border-radius: 12px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .noleia-btn::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                transition: left 0.5s;
            }
            
            .noleia-btn:hover::before {
                left: 100%;
            }
            
            .noleia-start {
                background: linear-gradient(135deg, #00b09b 0%, #96c93d 100%);
                color: white;
                margin-bottom: 10px;
            }
            
            .noleia-start:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(0, 176, 155, 0.4);
            }
            
            .noleia-stop {
                background: linear-gradient(135deg, #ff416c 0%, #ff4b2b 100%);
                color: white;
            }
            
            .noleia-stop:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 20px rgba(255, 65, 108, 0.4);
            }
            
            .noleia-status {
                padding: 12px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                font-size: 0.9rem;
                text-align: center;
                margin-top: 15px;
                border-left: 3px solid #667eea;
                color: #e2e8f0;
                transition: all 0.3s ease;
            }
            
            .noleia-status.active {
                border-left-color: #00b09b;
                background: rgba(0, 176, 155, 0.1);
            }
            
            .noleia-status.error {
                border-left-color: #ff416c;
                background: rgba(255, 65, 108, 0.1);
            }
            
            .noleia-credits {
                text-align: center;
                margin-top: 20px;
                padding-top: 15px;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                color: #a0aec0;
                font-size: 0.8rem;
            }
            
            .noleia-credits a {
                color: #667eea;
                text-decoration: none;
                font-weight: 600;
                transition: color 0.3s ease;
            }
            
            .noleia-credits a:hover {
                color: #764ba2;
                text-decoration: underline;
            }
            
            .noleia-brand {
                color: #fff;
                font-weight: 700;
                font-size: 1.1rem;
            }
            
            /* Animações para o Toast */
            .noleia-toast {
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%) !important;
                border: 1px solid rgba(102, 126, 234, 0.3) !important;
                border-radius: 12px !important;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4) !important;
                backdrop-filter: blur(10px) !important;
            }
        </style>
    `;
    
    floatingButton.id = 'noleia-floatingBtn';
    floatingButton.innerHTML += '<img src="https://i.imgur.com/9n0wbej.png" alt="NoLeia">';
    document.body.appendChild(floatingButton);

    
    const menu = document.createElement('div');
    menu.id = 'noleia-menu';
    menu.innerHTML = `
        <div class="noleia-header">
            <h2>NoLeia</h2>
            <div style="color: #a0aec0; font-size: 0.9rem;">Leitor Automático</div>
        </div>
        
        <div class="noleia-input-group">
            <label class="noleia-label">Tempo mínimo (segundos):</label>
            <input type="number" id="noleia-minTime" class="noleia-input" value="5" min="1">
        </div>
        
        <div class="noleia-input-group">
            <label class="noleia-label">Tempo máximo (segundos):</label>
            <input type="number" id="noleia-maxTime" class="noleia-input" value="10" min="2">
        </div>
        
        <button id="noleia-startBtn" class="noleia-btn noleia-start">▶ Iniciar Leitura</button>
        <button id="noleia-stopBtn" class="noleia-btn noleia-stop" style="display: none;">⏸ Parar Leitura</button>
        
        <div id="noleia-status" class="noleia-status">Pronto para iniciar</div>
        
        <div class="noleia-credits">
            Script por <a href="https://github.com/JohnIohananDev" target="_blank">JohnIohananDev</a><br>
            Design por <span class="noleia-brand">Wohn</span>
        </div>
    `;
    document.body.appendChild(menu);

   
    function loadToastify() {
        if (typeof Toastify === 'undefined') {
            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.js';
            const style = document.createElement('link');
            style.rel = 'stylesheet';
            style.href = 'https://cdn.jsdelivr.net/npm/toastify-js@1.12.0/src/toastify.min.css';
            document.head.appendChild(style);
            document.head.appendChild(script);
        }
    }

    function showToast(text) {
        if (typeof Toastify !== 'undefined') {
            Toastify({
                text: text,
                duration: 3000,
                gravity: 'bottom',
                position: 'right',
                style: {
                    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
                    border: '1px solid rgba(102, 126, 234, 0.3)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                    backdropFilter: 'blur(10px)',
                    color: '#fff'
                },
            }).showToast();
        } else {
          
            console.log('NoLeia:', text);
        }
    }

    function secondsToMilliseconds(seconds) {
        return seconds * 1000;
    }

    function randomAtRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function read() {
        const minTime = parseInt(document.getElementById('noleia-minTime').value) || 5;
        const maxTime = parseInt(document.getElementById('noleia-maxTime').value) || 10;
        const statusDiv = document.getElementById('noleia-status');

        if (!isStopped && nextPageButton) {
            try {
               
                nextPageButton.click();
                
                const nextTime = randomAtRange(minTime, maxTime);
                statusDiv.innerText = `📖 Página avançada - Próxima em ${nextTime}s`;
                statusDiv.className = 'noleia-status active';
                showToast('✅ Página avançada automaticamente');
                
               
                setTimeout(read, secondsToMilliseconds(nextTime));
                
            } catch (error) {
                statusDiv.innerText = '❌ Erro: ' + error.message;
                statusDiv.className = 'noleia-status error';
                isStopped = true;
                toggleButtons();
            }
        }
    }

    function toggleButtons() {
        const startBtn = document.getElementById('noleia-startBtn');
        const stopBtn = document.getElementById('noleia-stopBtn');
        
        if (isStopped) {
            startBtn.style.display = 'block';
            stopBtn.style.display = 'none';
        } else {
            startBtn.style.display = 'none';
            stopBtn.style.display = 'block';
        }
    }

   
    document.getElementById('noleia-startBtn').addEventListener('click', function() {
        const statusDiv = document.getElementById('noleia-status');

        if (isStopped) {
            if (!nextPageButton) {
                showToast('❌ Botão de próxima página não encontrado!');
                statusDiv.innerText = '❌ Erro: Botão não encontrado';
                statusDiv.className = 'noleia-status error';
                return;
            }
            
            isStopped = false;
            statusDiv.innerText = '⏳ Iniciando leitura automática...';
            statusDiv.className = 'noleia-status active';
            showToast(' NoLeia iniciado!');
            toggleButtons();
            read();
        }
    });

    document.getElementById('noleia-stopBtn').addEventListener('click', function() {
        const statusDiv = document.getElementById('noleia-status');
        
        isStopped = true;
        statusDiv.innerText = '⏸️ Leitura pausada';
        statusDiv.className = 'noleia-status';
        showToast('⏸️ Leitura automática pausada');
        toggleButtons();
    });

    document.getElementById('noleia-floatingBtn').addEventListener('click', function() {
        const menu = document.getElementById('noleia-menu');
        if (menu.style.display === 'none' || !menu.style.display) {
            menu.style.display = 'block';
        } else {
            menu.style.display = 'none';
        }
    });

    
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('noleia-menu');
        const floatingBtn = document.getElementById('noleia-floatingBtn');
        
        if (menu.style.display === 'block' && 
            !menu.contains(e.target) && 
            !floatingBtn.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

  
    loadToastify();
    showToast('NoLeia carregado com sucesso! 🎉');
    console.log('🔧 NoLeia - Script de leitura automática');
    console.log('💻 Desenvolvido por ------');
    console.log('🎨 Design por Wohn');
}


if (window.location.hostname.includes('arvore.com.br')) {
    
    if (!document.getElementById('noleia-menu')) {
        
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', arvoreReader);
        } else {
            arvoreReader();
        }
    }
} else {
    alert('📍 NoLeia: Use este script apenas no site da Árvore (e-reader.arvore.com.br)');
}
