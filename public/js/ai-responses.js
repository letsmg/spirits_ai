// Módulo de IA para gerar respostas dinâmicas
class AIResponseGenerator {
    constructor() {
        this.apiKey = ''; // Coloque sua API key aqui (opcional)
        this.useMock = true; // Usa respostas mockadas por padrão
        this.apiEndpoint = ''; // Endpoint da API (opcional)
        this.userCountry = null; // País detectado do usuário
        this.userLanguage = 'pt-BR'; // Idioma padrão
    }

    // Configurar API key
    setAPIKey(key) {
        this.apiKey = key;
        this.useMock = false;
    }

    // Detectar IP e país do usuário para configuração de idioma
    async detectUserLocation() {
        try {
            // Usar API gratuita de geolocalização (ip-api.com)
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            
            if (data.countryCode) {
                this.userCountry = data.countryCode;
                // Se não for Brasil, usar inglês
                if (data.countryCode !== 'BR') {
                    this.userLanguage = 'en-US';
                } else {
                    this.userLanguage = 'pt-BR';
                }
                console.log('País detectado:', data.countryCode, 'Idioma configurado:', this.userLanguage);
            }
        } catch (error) {
            console.error('Erro ao detectar localização:', error);
            // Mantém idioma padrão (pt-BR) em caso de erro
        }
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
        const responsesPT = [
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

        const responsesEN = [
            `The spirits whisper: "${respostaSecreta}"`,
            `From the shadows emerges the answer: ${respostaSecreta}`,
            `The beyond reveals: ${respostaSecreta}`,
            `The spirits confirm: ${respostaSecreta}`,
            `From the other side: ${respostaSecreta}`,
            `Ancient mysteries reveal: ${respostaSecreta}`,
            `Silly game, the answer is: ${respostaSecreta}`,
            `I am behind you and I see: ${respostaSecreta}`,
            `Do not waste my time mortal, the answer is ${respostaSecreta}`,
            `You should not play with what you do not know, behold: ${respostaSecreta}`,
            `You are not worthy of our attention, but here it is: ${respostaSecreta}`,
            `Your spirit is weak, the answer is: ${respostaSecreta}`,
            `Address me with more respect, the answer is ${respostaSecreta}`,
            `You are not being polite, but I answer: ${respostaSecreta}`,
            `I am not your slave, but I say: ${respostaSecreta}`,
            `You do not know what awaits you tonight, the answer is ${respostaSecreta}`
        ];

        const responses = this.userLanguage === 'en-US' ? responsesEN : responsesPT;
        const randomIndex = Math.floor(Math.random() * responses.length);
        return responses[randomIndex];
    }

    // Respostas de erro (quando pergunta é inválida)
    generateErrorResponse() {
        const errorsPT = [
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

        const errorsEN = [
            "The spirits do not answer empty questions",
            "Your mind is too agitated",
            "The spirits demand respect in your questions",
            "The veil is too thick today",
            "You are not ready to hear the answer",
            "Do not bother me insect",
            // Short mocking/scary phrases
            "Foolish mortal",
            "Do not make us laugh",
            "Your fear feeds us",
            "We are watching",
            "You do not know who you speak to",
            "Be careful what you wish for",
            "Your soul will be mine",
            "We see everything",
            "You should not be here",
            "Time is running out",
            "Darkness approaches",
            "Your presence disturbs us",
            "You are too curious",
            "Some secrets must remain",
            "We are not a game",
            "You will regret this",
            "Nothing escapes our eyes"
        ];

        const errors = this.userLanguage === 'en-US' ? errorsEN : errorsPT;
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
        utterance.lang = this.userLanguage;
        utterance.rate = 0.7; // Velocidade mais lenta para efeito misterioso
        utterance.pitch = 0.5; // Tom mais grave para efeito sobrenatural/bruxa
        utterance.volume = 1.0; // Volume máximo para voz

        // Tentar usar uma voz feminina do idioma detectado (para efeito de bruxa)
        const voices = window.speechSynthesis.getVoices();

        // Selecionar voz baseado no idioma detectado
        let selectedVoice;

        if (this.userLanguage === 'en-US') {
            // Prioridade 1: Voz feminina em inglês
            selectedVoice = voices.find(voice =>
                voice.lang.includes('en-US') || voice.lang.includes('en-GB') || voice.lang.includes('en')
            );

            // Prioridade 2: Voz feminina em geral
            if (!selectedVoice) {
                selectedVoice = voices.find(voice => voice.name.toLowerCase().includes('female') || voice.name.toLowerCase().includes('woman'));
            }

            // Prioridade 3: Qualquer voz em inglês
            if (!selectedVoice) {
                selectedVoice = voices.find(voice => voice.lang.includes('en-US') || voice.lang.includes('en-GB') || voice.lang.includes('en'));
            }
        } else {
            // Prioridade 1: Voz feminina portuguesa
            selectedVoice = voices.find(voice =>
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

// Detectar localização do usuário ao carregar
window.aiResponseGenerator.detectUserLocation();

// Carregar vozes quando disponíveis
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}
