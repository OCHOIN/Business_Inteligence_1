document.addEventListener('DOMContentLoaded', () => {
  const questions = [
    {
      category: 'Fundamentos de Business Intelligence',
      question: '¿Qué es Business Intelligence principalmente?',
      options: [
        'Un lenguaje de programación para automatizar reportes.',
        'Un conjunto de procesos y herramientas para convertir datos en información útil para decisiones.',
        'Un sistema operativo para servidores de datos.',
        'Una estrategia de marketing basada solo en redes sociales.'
      ],
      answer: 1,
      explanation: 'Business Intelligence reúne procesos, herramientas y análisis para convertir datos en información útil y apoyar decisiones organizacionales.'
    },
    {
      category: 'Toma de decisiones',
      question: '¿Cuál de estas opciones describe mejor una decisión táctica?',
      options: [
        'Definir la misión y visión de la empresa.',
        'Ajustar una campaña promocional según el desempeño de ventas por región.',
        'Reemplazar el sistema operativo corporativo.',
        'Contratar a un nuevo gerente general.'
      ],
      answer: 1,
      explanation: 'Una decisión táctica suele tener un alcance medio y se orienta a ajustar acciones operativas o de negocio según indicadores y resultados.'
    },
    {
      category: 'KPI e interpretación de datos',
      question: '¿Qué es un KPI?',
      options: [
        'Un tipo de base de datos no relacional.',
        'Un indicador clave de rendimiento que mide desempeño frente a un objetivo.',
        'Un documento legal de la empresa.',
        'Una herramienta de diseño gráfico.'
      ],
      answer: 1,
      explanation: 'Un KPI es un indicador clave de rendimiento utilizado para medir si la organización está avanzando hacia sus metas.'
    },
    {
      category: 'Fundamentos de Business Intelligence',
      question: '¿Cuál es la diferencia principal entre datos e información?',
      options: [
        'Los datos siempre son visualizados; la información no.',
        'Los datos son hechos sin contexto, mientras la información los organiza y les da sentido.',
        'La información se genera sin datos.',
        'No hay diferencia; son sinónimos.'
      ],
      answer: 1,
      explanation: 'Los datos son registros o hechos aislados, mientras que la información surge cuando esos datos se organizan, analizan y contextualizan.'
    },
    {
      category: 'Procesos ETL',
      question: 'En ETL, ¿qué ocurre durante la fase de Transform?',
      options: [
        'Se eliminan los reportes antiguos.',
        'Se limpian, normalizan y enriquecen los datos.',
        'Se publica el dashboard en internet.',
        'Se compran nuevos licenciamientos.'
      ],
      answer: 1,
      explanation: 'En la transformación se realizan tareas como limpieza, normalización, eliminación de duplicados y cálculo de indicadores.'
    },
    {
      category: 'Limpieza y calidad de datos',
      question: '¿Por qué es importante eliminar duplicados en un dataset?',
      options: [
        'Porque reduce la velocidad de carga de la base de datos.',
        'Porque evita resultados sesgados y métricas infladas.',
        'Porque convierte todo en texto.',
        'Porque reemplaza la necesidad de documentar el proceso.'
      ],
      answer: 1,
      explanation: 'Los duplicados pueden inflar conteos y distorsionar indicadores, por lo que deben corregirse antes del análisis.'
    },
    {
      category: 'Aplicaciones prácticas empresariales',
      question: '¿Cuál es un caso típico de uso de BI en una empresa comercial?',
      options: [
        'Crear un contrato de arrendamiento.',
        'Analizar ventas por producto, región y periodo para tomar decisiones comerciales.',
        'Configurar un router Wi-Fi.',
        'Escribir un documento de políticas internas.'
      ],
      answer: 1,
      explanation: 'El BI se usa ampliamente para analizar ventas, rendimiento comercial, conversiones y oportunidades en diferentes segmentos.'
    },
    {
      category: 'KPI e interpretación de datos',
      question: 'Si una campaña aumenta las ventas y también mejora la tasa de conversión, ¿qué indicador ayuda a comparar rendimiento?',
      options: [
        'El color de la marca.',
        'El KPI de conversión y el KPI de ventas.',
        'La cantidad de empleados en la oficina.',
        'La dirección del correo de la empresa.'
      ],
      answer: 1,
      explanation: 'Los KPIs de conversión y ventas permiten comparar la eficiencia y el impacto de la campaña en el negocio.'
    },
    {
      category: 'Toma de decisiones',
      question: '¿Qué etapa sigue después de analizar los resultados en un proceso de decisión?',
      options: [
        'Ignorar el problema.',
        'Evaluar alternativas y escoger la mejor opción.',
        'Borrar los datos históricos.',
        'Cambiar la estructura organizacional sin análisis.'
      ],
      answer: 1,
      explanation: 'Después de interpretar los datos, la organización evalúa opciones posibles y decide qué acción genera mejor valor.'
    },
    {
      category: 'Procesos ETL',
      question: '¿Cuál de estas es una fuente típica de datos para extracción?',
      options: [
        'Un correo electrónico personal.',
        'Una base de datos transaccional, un CSV o una API.',
        'Un calendario de reuniones.',
        'Un archivo de texto sin estructura.'
      ],
      answer: 1,
      explanation: 'Las fuentes de datos del BI suelen incluir bases de datos, archivos tabulares y servicios con información estructurada.'
    },
    {
      category: 'Limpieza y calidad de datos',
      question: '¿Qué sentido tiene normalizar formatos en datos?',
      options: [
        'Hacer que los datos estén consistentes para compararlos correctamente.',
        'Cambiar números por palabras.',
        'Reducir el tamaño de la empresa.',
        'Ocultar información relevante.'
      ],
      answer: 0,
      explanation: 'La normalización hace que fechas, textos, códigos y valores sigan un mismo estándar, evitando errores de comparación o análisis.'
    },
    {
      category: 'Fundamentos de Business Intelligence',
      question: '¿Qué diferencia principal existe entre BI y análisis predictivo?',
      options: [
        'BI solo se usa en marketing y no en ventas.',
        'BI describe y monitorea el desempeño actual, mientras el predictivo estima escenarios futuros.',
        'No existe diferencia.',
        'Predicción es un tipo de KPI.'
      ],
      answer: 1,
      explanation: 'BI se centra en reportes y desempeño actual; el análisis predictivo busca proyectar tendencias y probabilidades futuras.'
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
    let badge = 'Explorador de datos';
    if (percentage >= 80) {
      badge = 'Analista BI';
    }
    if (percentage >= 90) {
      badge = 'Estratega de decisiones';
    }
    if (percentage >= 95) {
      badge = 'Maestro ETL';
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
      <p>${score >= 70 ? '¡Muy bien! Estás avanzando con fuerza en BI.' : 'Sigue practicando; cada intento fortalece tu análisis.'}</p>
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
