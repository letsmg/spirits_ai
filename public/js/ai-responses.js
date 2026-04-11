// Módulo de IA para gerar respostas dinâmicas
class AIResponseGenerator {
    constructor() {
        this.apiKey = ''; // Coloque sua API key aqui (opcional)
        this.useMock = true; // Usa respostas mockadas por padrão
        this.apiEndpoint = ''; // Endpoint da API (opcional)
    }

    // Configurar API key
    setAPIKey(key) {
        this.apiKey = key;
        this.useMock = false;
    }

    // Gerar resposta baseada na pergunta do usuário
    async generateResponse(pergunta, respostaSecreta) {
        if (this.useMock || !this.apiKey) {
            return this.generateMockResponse(pergunta, respostaSecreta);
        }

        try {
            const response = await fetch(this.apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    prompt: this.buildPrompt(pergunta, respostaSecreta),
                    max_tokens: 100,
                    temperature: 0.7
                })
            });

            const data = await response.json();
            return this.extractResponse(data);
        } catch (error) {
            console.error('Erro ao chamar API de IA:', error);
            return this.generateMockResponse(pergunta, respostaSecreta);
        }
    }

    // Construir prompt para a IA
    buildPrompt(pergunta, respostaSecreta) {
        return `Você é um espírito misterioso que responde perguntas de forma enigmática.
Pergunta: "${pergunta}"
Resposta secreta: "${respostaSecreta}"
Gere uma resposta misteriosa e enigmática que combine com a resposta secreta.`;
    }

    // Extrair resposta da API
    extractResponse(data) {
        // Adaptar conforme a API usada (OpenAI, Anthropic, etc.)
        if (data.choices && data.choices[0]) {
            return data.choices[0].text.trim();
        }
        if (data.content && data.content[0]) {
            return data.content[0].text.trim();
        }
        return 'Os espíritos falam em mistérios...';
    }

    // Gerar resposta mockada (sem API)
    generateMockResponse(pergunta, respostaSecreta) {
        const responses = [
            `Os espíritos sussurram: "${respostaSecreta}"`,
            `Das sombras emerge a resposta: ${respostaSecreta}`,
            `O além revela: ${respostaSecreta}`,
            `Os espíritos confirmam: ${respostaSecreta}`,
            `Do outro lado: ${respostaSecreta}`,
            `Mistérios antigos revelam: ${respostaSecreta}`,
            // Frases antigas do projeto
            `Brincadeira tola, a resposta é: ${respostaSecreta}`,
            `Estou atrás de você e vejo: ${respostaSecreta}`,
            `Não me faça perder meu tempo mortal, a resposta é ${respostaSecreta}`,
            `Não devia brincar com o que não conhece, veja: ${respostaSecreta}`,
            `Você não é digno de nossa atenção, mas aqui está: ${respostaSecreta}`,
            `Seu espírito é fraco, a resposta é: ${respostaSecreta}`,
            `Dirija-se a mim com mais respeito, a resposta é ${respostaSecreta}`,
            `Vocês não estão sendo educados, mas respondo: ${respostaSecreta}`,
            `Não sou seu escravo, mas digo: ${respostaSecreta}`,
            `Nem sabe o que te espera essa noite, a resposta é ${respostaSecreta}`
        ];

        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }

    // Respostas de erro (quando pergunta é inválida)
    generateErrorResponse() {
        const errors = [
            "Os espíritos não respondem a perguntas vazias",
            "Sua mente está muito agitada",
            "Os espíritos exigem respeito em suas perguntas",
            "O véu está muito espesso hoje",
            "Você não está pronto para ouvir a resposta",
            "Não me incomode inseto",            
            // Frases curtas de deboche/assustador
            "Tolo mortal",
            "Não nos faça rir",
            "Seu medo nos alimenta",
            "Estamos observando",
            "Você não sabe com quem fala",
            "Cuidado com o que deseja",
            "Sua alma será minha",
            "Nós vemos tudo",
            "Você não deveria estar aqui",
            "O tempo está acabando",
            "A escuridão se aproxima",
            "Sua presença nos incomoda",
            "Você é muito curioso",
            "Alguns segredos devem permanecer",
            "Nós não somos brincadeira",
            "Você vai se arrepender",
            "Nada escapa dos nossos olhos"
        ];

        return errors[Math.floor(Math.random() * errors.length)];
    }

    // Síntese de voz para falar a resposta
    speakResponse(text, element, imageElement) {
        if (!('speechSynthesis' in window)) {
            console.warn('Navegador não suporta síntese de voz');
            return;
        }

        // Cancelar qualquer fala anterior
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.7; // Velocidade mais lenta para efeito misterioso
        utterance.pitch = 0.5; // Tom mais grave para efeito sobrenatural/bruxa
        utterance.volume = 1.0; // Volume máximo para voz

        // Tentar usar uma voz portuguesa feminina (para efeito de bruxa)
        const voices = window.speechSynthesis.getVoices();

        // Prioridade 1: Voz feminina portuguesa
        let selectedVoice = voices.find(voice =>
            voice.lang.includes('pt-BR') || voice.lang.includes('pt')
        );

        // Prioridade 2: Voz feminina em geral (para efeito de bruxa)
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'));
        }

        // Prioridade 3: Qualquer voz portuguesa
        if (!selectedVoice) {
            selectedVoice = voices.find(voice => voice.lang.includes('pt-BR') || voice.lang.includes('pt'));
        }

        // Prioridade 4: Voz mais grave disponível (para efeito de bruxa)
        if (!selectedVoice && voices.length > 0) {
            // Tenta encontrar vozes com nomes que indicam serem mais graves
            const deepVoiceNames = ['google', 'microsoft', 'amazon', 'natural'];
            selectedVoice = voices.find(voice =>
                deepVoiceNames.some(name => voice.name.toLowerCase().includes(name))
            ) || voices[0];
        }

        if (selectedVoice) {
            utterance.voice = selectedVoice;
            console.log('Usando voz:', selectedVoice.name);
        }

        // Efeito de texto aparecendo gradualmente
        if (element) {
            let currentIndex = 0;
            const textToType = text;
            element.innerHTML = '';

            // Revela texto gradualmente enquanto a voz fala
            const typingInterval = setInterval(() => {
                if (currentIndex < textToType.length) {
                    element.innerHTML += textToType[currentIndex];
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 80); // Velocidade de digitação (ms por caractere)

            // Limpa intervalo se a voz terminar antes do texto completo
            utterance.onend = function() {
                clearInterval(typingInterval);
                element.innerHTML = textToType; // Garante que o texto completo apareça
            };
        }

        // Efeito de revelação gradual da imagem
        if (imageElement) {
            imageElement.style.opacity = '0';
            let opacity = 0;
            const revealInterval = setInterval(() => {
                if (opacity < 1) {
                    opacity += 0.05;
                    imageElement.style.opacity = opacity;
                } else {
                    clearInterval(revealInterval);
                    imageElement.style.opacity = '1';
                }
            }, 200); // Revela a imagem gradualmente (200ms por incremento)

            // Limpa intervalo se a voz terminar antes da revelação completa
            utterance.onend = function() {
                clearInterval(revealInterval);
                imageElement.style.opacity = '1';
            };
        }

        window.speechSynthesis.speak(utterance);
    }

    // Listar vozes disponíveis (para debug)
    listAvailableVoices() {
        if (!('speechSynthesis' in window)) {
            console.warn('Navegador não suporta síntese de voz');
            return [];
        }

        const voices = window.speechSynthesis.getVoices();
        console.log('Vozes disponíveis:', voices.map(v => `${v.name} (${v.lang})`));
        return voices;
    }
}

// Instância global
window.aiResponseGenerator = new AIResponseGenerator();

// Carregar vozes quando disponíveis
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}
