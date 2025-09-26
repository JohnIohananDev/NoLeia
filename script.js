function arvoreReader() {
    let isStopped = true;
    
    const nextPageButton = document.querySelector('#root > main > div.sc-gTRrQi.cFSQkY > div:nth-child(3) > button') || 
                          document.querySelector('button[aria-label*="próxima"], button[aria-label*="next"], button[aria-label*="Next"]') || 
                          document.querySelector('button:contains("Próxima"), button:contains("Next")');

    const floatingButton = document.createElement('div');
    floatingButton.innerHTML = `
        <style>
            @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-5px) rotate(1deg); }
            }
            
            @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(100, 100, 100, 0.4); }
                70% { box-shadow: 0 0 0 10px rgba(100, 100, 100, 0); }
                100% { box-shadow: 0 0 0 0 rgba(100, 100, 100, 0); }
            }
            
            @keyframes slideIn {
                from { 
                    opacity: 0;
                    transform: translateX(100px) scale(0.8);
                }
                to { 
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }
            
            @keyframes glow {
                0% { border-color: #404040; }
                50% { border-color: #606060; }
                100% { border-color: #404040; }
            }
            
            #noleia-floatingBtn {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 16px;
                background: #0a0a0a;
                border: 1px solid #2a2a2a;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);
                transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                z-index: 10000;
                overflow: hidden;
                animation: float 6s ease-in-out infinite;
            }
            
            #noleia-floatingBtn::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: linear-gradient(135deg, transparent 0%, rgba(80, 80, 80, 0.1) 100%);
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            #noleia-floatingBtn:hover {
                transform: scale(1.1) rotate(5deg);
                border-color: #666;
                box-shadow: 0 16px 50px rgba(0, 0, 0, 0.8);
            }
            
            #noleia-floatingBtn:hover::before {
                opacity: 1;
            }
            
            #noleia-floatingBtn:active {
                transform: scale(0.95);
                animation: pulse 0.5s ease;
            }
            
            #noleia-floatingBtn img {
                width: 28px;
                height: 28px;
                filter: invert(0.8);
                transition: all 0.3s ease;
            }
            
            #noleia-floatingBtn:hover img {
                filter: invert(1);
                transform: scale(1.1);
            }
            
            #noleia-menu {
                position: fixed;
                top: 90px;
                right: 20px;
                width: 300px;
                background: #0a0a0a;
                border: 1px solid #2a2a2a;
                padding: 0;
                border-radius: 16px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: none;
                backdrop-filter: blur(20px);
                animation: slideIn 0.4s cubic-bezier(0.23, 1, 0.32, 1);
                overflow: hidden;
            }
            
            .noleia-header {
                background: #111;
                padding: 20px;
                border-bottom: 1px solid #2a2a2a;
                position: relative;
            }
            
            .noleia-header::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 20px;
                right: 20px;
                height: 1px;
                background: linear-gradient(90deg, transparent, #666, transparent);
            }
            
            .noleia-header h2 {
                color: #fff;
                font-size: 1.4rem;
                font-weight: 600;
                margin: 0 0 4px 0;
                letter-spacing: -0.5px;
            }
            
            .noleia-subtitle {
                color: #888;
                font-size: 0.8rem;
                font-weight: 400;
            }
            
            .noleia-content {
                padding: 20px;
            }
            
            .noleia-input-group {
                margin-bottom: 18px;
            }
            
            .noleia-label {
                display: block;
                color: #ccc;
                font-size: 0.75rem;
                font-weight: 500;
                margin-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            
            .noleia-input {
                width: 100%;
                padding: 12px 16px;
                background: #111;
                border: 1px solid #333;
                border-radius: 8px;
                color: #fff;
                font-size: 0.9rem;
                transition: all 0.3s ease;
                font-family: inherit;
            }
            
            .noleia-input:focus {
                outline: none;
                border-color: #666;
                background: #151515;
                box-shadow: 0 0 0 2px rgba(100, 100, 100, 0.1);
            }
            
            .noleia-btn {
                width: 100%;
                padding: 14px;
                border: none;
                border-radius: 10px;
                font-size: 0.85rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                overflow: hidden;
                text-transform: uppercase;
                letter-spacing: 1px;
                margin-bottom: 10px;
                font-family: inherit;
            }
            
            .noleia-btn::before {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                transition: all 0.3s ease;
                transform: translate(-50%, -50%);
            }
            
            .noleia-btn:hover::before {
                width: 250px;
                height: 250px;
            }
            
            .noleia-start {
                background: #1a1a1a;
                color: #fff;
                border: 1px solid #333;
            }
            
            .noleia-start:hover {
                border-color: #666;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
            }
            
            .noleia-stop {
                background: #2a1a1a;
                color: #ff6b6b;
                border: 1px solid #443333;
            }
            
            .noleia-stop:hover {
                border-color: #664444;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 107, 107, 0.1);
            }
            
            .noleia-status {
                padding: 14px;
                background: #111;
                border: 1px solid #333;
                border-radius: 8px;
                font-size: 0.8rem;
                text-align: center;
                margin-top: 16px;
                color: #ccc;
                transition: all 0.3s ease;
                animation: glow 2s ease-in-out infinite;
                min-height: 18px;
            }
            
            .noleia-status.active {
                border-color: #334433;
                background: #1a1a1a;
            }
            
            .noleia-status.error {
                border-color: #443333;
                background: #2a1a1a;
            }
            
            .noleia-footer {
                background: #111;
                padding: 16px 20px;
                border-top: 1px solid #2a2a2a;
                text-align: center;
            }
            
            .noleia-credits {
                color: #666;
                font-size: 0.7rem;
                line-height: 1.4;
            }
            
            .noleia-credits a {
                color: #888;
                text-decoration: none;
                transition: color 0.3s ease;
                font-weight: 500;
            }
            
            .noleia-credits a:hover {
                color: #ccc;
                text-decoration: underline;
            }
            
            .noleia-divider {
                margin: 0 6px;
                color: #444;
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
            <div class="noleia-subtitle">Leitor Automático</div>
        </div>
        
        <div class="noleia-content">
            <div class="noleia-input-group">
                <label class="noleia-label">Tempo Mínimo</label>
                <input type="number" id="noleia-minTime" class="noleia-input" value="5" min="1">
            </div>
            
            <div class="noleia-input-group">
                <label class="noleia-label">Tempo Máximo</label>
                <input type="number" id="noleia-maxTime" class="noleia-input" value="10" min="2">
            </div>
            
            <button id="noleia-startBtn" class="noleia-btn noleia-start">Iniciar Leitura</button>
            <button id="noleia-stopBtn" class="noleia-btn noleia-stop" style="display: none;">Parar Leitura</button>
            
            <div id="noleia-status" class="noleia-status">Pronto para iniciar</div>
        </div>
        
        <div class="noleia-footer">
            <div class="noleia-credits">
                <a href="https://github.com/JuniorSchueller" target="_blank">ArvoreReader</a>
                <span class="noleia-divider">|</span>
                <a href="https://github.com/JohnIohananDev" target="_blank">Aprimorado por Wohn</a>
            </div>
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
                    background: '#0a0a0a',
                    border: '1px solid #2a2a2a',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.8)',
                    color: '#fff',
                    fontSize: '0.85rem',
                    padding: '12px 16px'
                },
            }).showToast();
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
                statusDiv.textContent = `Página avançada - Próxima em ${nextTime} segundos`;
                statusDiv.className = 'noleia-status active';
                showToast('Página avançada automaticamente');
                
                setTimeout(read, secondsToMilliseconds(nextTime));
                
            } catch (error) {
                statusDiv.textContent = 'Erro: ' + error.message;
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
                showToast('Botão de próxima página não encontrado');
                statusDiv.textContent = 'Erro: Botão não encontrado';
                statusDiv.className = 'noleia-status error';
                return;
            }
            
            isStopped = false;
            statusDiv.textContent = 'Iniciando leitura automática';
            statusDiv.className = 'noleia-status active';
            showToast('Leitura automática iniciada');
            toggleButtons();
            read();
        }
    });

    document.getElementById('noleia-stopBtn').addEventListener('click', function() {
        const statusDiv = document.getElementById('noleia-status');
        
        isStopped = true;
        statusDiv.textContent = 'Leitura pausada';
        statusDiv.className = 'noleia-status';
        showToast('Leitura automática pausada');
        toggleButtons();
    });

    document.getElementById('noleia-floatingBtn').addEventListener('click', function() {
        const menu = document.getElementById('noleia-menu');
        menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    document.addEventListener('click', function(e) {
        const menu = document.getElementById('noleia-menu');
        const floatingBtn = document.getElementById('noleia-floatingBtn');
        
        if (menu.style.display === 'block' && !menu.contains(e.target) && !floatingBtn.contains(e.target)) {
            menu.style.display = 'none';
        }
    });

    loadToastify();
    showToast('NoLeia carregado com sucesso');
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
    alert('NoLeia: Use este script apenas no site da Árvore');
}
