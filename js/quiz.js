document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    {
      question: '¿Qué es Business Intelligence?',
      options: [
        'Un sistema para guardar archivos de la empresa.',
        'Un conjunto de herramientas para transformar datos en información útil.',
        'Un programa para diseñar páginas web.',
        'Una red social para analistas.'
      ],
      answer: 1,
      explanation: 'Business Intelligence ayuda a convertir datos en información útil para apoyar decisiones de negocio.'
    },
    {
      question: '¿Qué es un KPI?',
      options: [
        'Un indicador clave de rendimiento.',
        'Un tipo de base de datos.',
        'Un nombre de una app.',
        'Una estrategia de marketing.'
      ],
      answer: 0,
      explanation: 'Un KPI mide si una empresa está avanzando hacia un objetivo importante.'
    },
    {
      question: '¿Qué significa ETL?',
      options: [
        'Extraer, transformar y cargar.',
        'Exportar, testear y localizar.',
        'Enviar, traducir y listar.',
        'Entrenar, transformar y limpiar.'
      ],
      answer: 0,
      explanation: 'ETL significa extraer los datos, transformarlos y cargarlos en un destino analítico.'
    },
    {
      question: '¿Por qué es importante limpiar datos?',
      options: [
        'Porque mejora la calidad y evita errores en los análisis.',
        'Porque hace que el texto sea más corto.',
        'Porque elimina la necesidad de reportes.',
        'Porque cambia el nombre de la empresa.'
      ],
      answer: 0,
      explanation: 'La limpieza de datos reduce errores, duplicados y valores inconsistentes.'
    },
    {
      question: '¿Cuál es la mejor decisión cuando un dashboard muestra ventas bajas?',
      options: [
        'Ignorar la información.',
        'Buscar la causa y evaluar opciones.',
        'Eliminar el dashboard.',
        'Cambiar toda la empresa de inmediato.'
      ],
      answer: 1,
      explanation: 'La BI ayuda a detectar problemas y evaluar alternativas antes de decidir.'
    },
    {
      question: '¿Qué diferencia hay entre datos e información?',
      options: [
        'No hay diferencia.',
        'Los datos son hechos sin contexto y la información los organiza.',
        'La información siempre reemplaza a los datos.',
        'Los datos solo sirven para bases de datos.'
      ],
      answer: 1,
      explanation: 'Los datos son registros; la información les da sentido y permite analizarlos.'
    }
  ];

  const quizApp = document.getElementById('quiz-app');
  if (!quizApp) return;

  const stepIndicator = document.getElementById('quiz-step-indicator');
  const scoreDisplay = document.getElementById('score-display');
  const progressBar = document.getElementById('quiz-progress-bar');
  const questionElement = document.getElementById('quiz-question');
  const optionsElement = document.getElementById('quiz-options');
  const feedbackElement = document.getElementById('quiz-feedback');
  const nextButton = document.getElementById('quiz-next-btn');
  const resetButton = document.getElementById('quiz-reset-btn');
  const summaryElement = document.getElementById('quiz-summary');

  const pointsPerQuestion = 100 / questions.length;

  let currentIndex = 0;
  let score = 0;
  let answeredQuestions = new Set();
  let selectedOption = null;
  let answeredCorrectly = 0;
  let answeredIncorrectly = 0;

  function renderQuestion() {
    const question = questions[currentIndex];
    selectedOption = null;
    feedbackElement.classList.add('hidden');
    feedbackElement.classList.remove('success', 'error');
    nextButton.disabled = true;

    stepIndicator.textContent = `Pregunta ${currentIndex + 1}/${questions.length}`;
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    const progressPercentage = ((currentIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    scoreDisplay.textContent = `${Math.round(score)} pts`;

    question.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'option-button';
      button.textContent = option;
      button.setAttribute('aria-label', `Respuesta ${index + 1}: ${option}`);
      button.addEventListener('click', () => {
        if (answeredQuestions.has(currentIndex)) {
          return;
        }

        selectedOption = index;
        document.querySelectorAll('.option-button').forEach((btn) => btn.classList.remove('selected'));
        button.classList.add('selected');
        nextButton.disabled = false;
      });
      optionsElement.appendChild(button);
    });
  }

  function checkAnswer() {
    if (selectedOption === null) {
      feedbackElement.textContent = 'Selecciona una respuesta antes de continuar.';
      feedbackElement.classList.remove('hidden');
      feedbackElement.classList.add('error');
      return;
    }

    if (answeredQuestions.has(currentIndex)) {
      return;
    }

    const currentQuestion = questions[currentIndex];
    const correctIndex = currentQuestion.answer;
    const optionButtons = Array.from(document.querySelectorAll('.option-button'));

    optionButtons.forEach((button, index) => {
      button.disabled = true;
      if (index === correctIndex) {
        button.classList.add('correct');
      }
      if (index === selectedOption && index !== correctIndex) {
        button.classList.add('incorrect');
      }
    });

    answeredQuestions.add(currentIndex);
    const isCorrect = selectedOption === correctIndex;

    if (isCorrect) {
      score += pointsPerQuestion;
      answeredCorrectly += 1;
      feedbackElement.classList.add('success');
      feedbackElement.innerHTML = `<strong>¡Correcto!</strong> ${currentQuestion.explanation}`;
    } else {
      answeredIncorrectly += 1;
      feedbackElement.classList.add('error');
      feedbackElement.innerHTML = `<strong>Respuesta incorrecta.</strong> ${currentQuestion.explanation}`;
    }

    feedbackElement.classList.remove('hidden');
    scoreDisplay.textContent = `${Math.round(score)} pts`;
    nextButton.textContent = currentIndex === questions.length - 1 ? 'Ver resultado' : 'Siguiente';
    nextButton.disabled = false;
  }

  function showSummary() {
    progressBar.style.width = '100%';
    questionElement.textContent = '¡Cuestionario completado!';
    optionsElement.innerHTML = '';
    feedbackElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    resetButton.classList.remove('hidden');

    const percentage = Math.round(score);
    let badge = 'Principiante BI';
    if (percentage >= 70) {
      badge = 'Analista BI';
    }
    if (percentage >= 90) {
      badge = 'Estratega BI';
    }

    summaryElement.classList.remove('hidden');
    summaryElement.innerHTML = `
      <h3>Resultado final</h3>
      <p><strong>Puntuación:</strong> ${Math.round(score)} / 100</p>
      <p><strong>Respuestas correctas:</strong> ${answeredCorrectly}</p>
      <p><strong>Respuestas incorrectas:</strong> ${answeredIncorrectly}</p>
      <div class="badge-row">
        <span class="badge-pill">${badge}</span>
      </div>
      <p>${score >= 70 ? '¡Muy bien! Ya estás entendiendo bien los conceptos básicos.' : 'Sigue practicando; con un poco más de repaso vas a mejorar.'}</p>
    `;
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      currentIndex += 1;
      renderQuestion();
      nextButton.textContent = 'Siguiente';
      return;
    }

    showSummary();
  }

  nextButton.addEventListener('click', () => {
    if (selectedOption === null && !answeredQuestions.has(currentIndex)) {
      checkAnswer();
      return;
    }

    if (answeredQuestions.has(currentIndex) || selectedOption !== null) {
      nextQuestion();
    }
  });

  resetButton.addEventListener('click', () => {
    currentIndex = 0;
    score = 0;
    answeredQuestions = new Set();
    answeredCorrectly = 0;
    answeredIncorrectly = 0;
    selectedOption = null;
    nextButton.textContent = 'Siguiente';
    nextButton.disabled = true;
    nextButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
    summaryElement.classList.add('hidden');
    summaryElement.innerHTML = '';
    renderQuestion();
  });

  renderQuestion();
});
