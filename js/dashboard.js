document.addEventListener('DOMContentLoaded', () => {
  const rawTeams = [
    {
      equipo: 'Real Madrid',
      fase: 'Fase de grupos',
      partidos: 6,
      victorias: 5,
      empates: 1,
      derrotas: 0,
      golesFavor: 17,
      golesEnContra: 4,
      puntos: 16,
      serie: [2, 3, 4, 3, 2, 3],
      jugadores: [{ nombre: 'Kylian Mbappé', goles: 8 }, { nombre: 'Vinícius Júnior', goles: 6 }]
    },
    {
      equipo: 'Manchester City',
      fase: 'Fase de grupos',
      partidos: 6,
      victorias: 4,
      empates: 1,
      derrotas: 1,
      golesFavor: 15,
      golesEnContra: 5,
      puntos: 13,
      serie: [2, 2, 3, 4, 2, 2],
      jugadores: [{ nombre: 'Erling Haaland', goles: 7 }, { nombre: 'Phil Foden', goles: 4 }]
    },
    {
      equipo: 'Bayern Munich',
      fase: 'Fase de grupos',
      partidos: 6,
      victorias: 4,
      empates: 0,
      derrotas: 2,
      golesFavor: 14,
      golesEnContra: 7,
      puntos: 12,
      serie: [1, 3, 2, 3, 2, 3],
      jugadores: [{ nombre: 'Harry Kane', goles: 6 }, { nombre: 'Leroy Sané', goles: 4 }]
    },
    {
      equipo: 'Inter Milan',
      fase: 'Fase de grupos',
      partidos: 6,
      victorias: 3,
      empates: 2,
      derrotas: 1,
      golesFavor: 11,
      golesEnContra: 6,
      puntos: 11,
      serie: [1, 2, 2, 2, 2, 2],
      jugadores: [{ nombre: 'Lautaro Martínez', goles: 5 }, { nombre: 'Marcus Thuram', goles: 4 }]
    },
    {
      equipo: 'Paris Saint-Germain',
      fase: 'Eliminatorias',
      partidos: 8,
      victorias: 4,
      empates: 2,
      derrotas: 2,
      golesFavor: 16,
      golesEnContra: 10,
      puntos: 14,
      serie: [2, 3, 2, 4, 2, 2, 1, 2],
      jugadores: [{ nombre: 'Ousmane Dembélé', goles: 7 }, { nombre: 'Kylian Mbappé', goles: 6 }]
    },
    {
      equipo: 'Borussia Dortmund',
      fase: 'Eliminatorias',
      partidos: 8,
      victorias: 4,
      empates: 1,
      derrotas: 3,
      golesFavor: 14,
      golesEnContra: 11,
      puntos: 13,
      serie: [1, 2, 2, 3, 1, 3, 1, 1],
      jugadores: [{ nombre: 'Julian Brandt', goles: 5 }, { nombre: 'Niclas Füllkrug', goles: 4 }]
    },
    {
      equipo: 'Porto',
      fase: 'Eliminatorias',
      partidos: 8,
      victorias: 3,
      empates: 2,
      derrotas: 3,
      golesFavor: 12,
      golesEnContra: 12,
      puntos: 11,
      serie: [1, 2, 1, 2, 2, 2, 1, 1],
      jugadores: [{ nombre: 'Evanilson', goles: 5 }, { nombre: 'Francisco Conceição', goles: 4 }]
    },
    {
      equipo: 'Benfica',
      fase: 'Eliminatorias',
      partidos: 8,
      victorias: 3,
      empates: 1,
      derrotas: 4,
      golesFavor: 10,
      golesEnContra: 15,
      puntos: 10,
      serie: [1, 1, 2, 1, 2, 1, 1, 1],
      jugadores: [{ nombre: 'Ángel Di María', goles: 5 }, { nombre: 'Viktor Gyökeres', goles: 3 }]
    }
  ];

  const chartStates = {};
  const dashboardAlert = document.getElementById('dashboardAlert');
  const stageFilter = document.getElementById('filterStage');
  const teamFilter = document.getElementById('filterTeam');
  const metricFilter = document.getElementById('filterMetric');
  const periodFilter = document.getElementById('filterPeriod');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const statusBadge = document.getElementById('data-status-badge');
  const lastUpdated = document.getElementById('last-updated');

  if (statusBadge) statusBadge.textContent = 'Datos simulados';
  if (lastUpdated) lastUpdated.textContent = 'Actualización: muestra académica sin datos oficiales';

  function showAlert(message) {
    if (!dashboardAlert) return;
    dashboardAlert.textContent = message;
    dashboardAlert.classList.remove('hidden');
  }

  function clearAlert() {
    if (!dashboardAlert) return;
    dashboardAlert.textContent = '';
    dashboardAlert.classList.add('hidden');
  }

  function populateTeamFilter(selected = 'Todos') {
    if (!teamFilter) return;
    const teams = Array.from(new Set(rawTeams.map((team) => team.equipo))).sort();
    const currentValue = selected || 'Todos';
    teamFilter.innerHTML = '<option value="Todos">Todos</option>' + teams.map((team) => `<option value="${team}">${team}</option>`).join('');
    teamFilter.value = teams.includes(currentValue) ? currentValue : 'Todos';
  }

  function getFilteredTeams() {
    const stageValue = stageFilter?.value || 'Todos';
    const teamValue = teamFilter?.value || 'Todos';
    const periodValue = periodFilter?.value || 'Todas';

    let filtered = rawTeams.filter((team) => stageValue === 'Todos' || team.fase === stageValue);
    filtered = filtered.filter((team) => teamValue === 'Todos' || team.equipo === teamValue);

    if (periodValue !== 'Todas') {
      const [start, end] = periodValue.split('-').map(Number);
      filtered = filtered.map((team) => {
        const periodSeries = team.serie.slice(start - 1, end);
        const total = periodSeries.reduce((sum, value) => sum + value, 0);
        return {
          ...team,
          golesFavor: total,
          golesEnContra: Math.max(1, Math.round(total * 0.38)),
          puntos: Math.max(3, Math.round((periodSeries.length * total) / 2))
        };
      });
    }

    return filtered.length ? filtered : [];
  }

  function safeNumber(value) {
    return Number.isFinite(value) ? value : 0;
  }

  function computeTotals(teams) {
    return teams.reduce(
      (accumulator, team) => {
        accumulator.partidos += safeNumber(team.partidos);
        accumulator.goles += safeNumber(team.golesFavor);
        accumulator.victoriasLocales += team.fase === 'Fase de grupos' && team.victorias ? team.victorias : 0;
        accumulator.victoriasVisitantes += team.fase === 'Eliminatorias' && team.victorias ? team.victorias : 0;
        accumulator.empates += safeNumber(team.empates);
        accumulator.golesEnContra += safeNumber(team.golesEnContra);
        return accumulator;
      },
      { partidos: 0, goles: 0, victoriasLocales: 0, victoriasVisitantes: 0, empates: 0, golesEnContra: 0 }
    );
  }

  function formatMetricValue(value) {
    if (typeof value === 'number' && Number.isInteger(value)) return value.toString();
    return value.toFixed ? value.toFixed(1) : String(value);
  }

  function updateKpis(teams) {
    const total = computeTotals(teams);
    const avgGoals = teams.length ? total.goles / teams.length : 0;
    const topTeam = teams.length ? [...teams].sort((a, b) => b.golesFavor - a.golesFavor)[0] : null;
    const topScorer = teams.length
      ? teams.flatMap((team) => team.jugadores.map((player) => ({ team: team.equipo, nombre: player.nombre, goles: player.goles })))
          .sort((a, b) => b.goles - a.goles)[0]
      : null;

    document.getElementById('kpi-partidos').textContent = formatMetricValue(total.partidos);
    document.getElementById('kpi-goles').textContent = formatMetricValue(total.goles);
    document.getElementById('kpi-promedio').textContent = avgGoals.toFixed(1);
    document.getElementById('kpi-locales').textContent = formatMetricValue(total.victoriasLocales);
    document.getElementById('kpi-visitantes').textContent = formatMetricValue(total.victoriasVisitantes);
    document.getElementById('kpi-empates').textContent = formatMetricValue(total.empates);
    document.getElementById('kpi-top-team').textContent = topTeam ? topTeam.equipo : '—';
    document.getElementById('kpi-top-scorer').textContent = topScorer ? `${topScorer.nombre} (${topScorer.goles})` : '—';
  }

  function createChart(chartId, config) {
    if (chartStates[chartId]) {
      chartStates[chartId].destroy();
    }

    chartStates[chartId] = new Chart(document.getElementById(chartId), config);
  }

  function buildGoalsByTeamChart(teams) {
    const chartData = [...teams].sort((a, b) => b.golesFavor - a.golesFavor);
    createChart('chartGoalsByTeam', {
      type: 'bar',
      data: {
        labels: chartData.map((team) => team.equipo),
        datasets: [{
          label: 'Goles anotados',
          data: chartData.map((team) => team.golesFavor),
          backgroundColor: '#7d6cff',
          borderRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, ticks: { color: '#d9e6ff' }, grid: { color: 'rgba(217,230,255,0.12)' } }, x: { ticks: { color: '#d9e6ff' }, grid: { display: false } } }
      }
    });
  }

  function buildResultMixChart(teams) {
    const totalWins = teams.reduce((sum, team) => sum + team.victorias, 0);
    const totalDraws = teams.reduce((sum, team) => sum + team.empates, 0);
    const totalLosses = teams.reduce((sum, team) => sum + team.derrotas, 0);
    const total = totalWins + totalDraws + totalLosses || 1;
    createChart('chartResultMix', {
      type: 'doughnut',
      data: {
        labels: ['Victorias locales', 'Empates', 'Victorias visitantes'],
        datasets: [{
          data: [((totalWins / total) * 100).toFixed(1), ((totalDraws / total) * 100).toFixed(1), ((totalLosses / total) * 100).toFixed(1)],
          backgroundColor: ['#59d4ff', '#f7c96e', '#9a7cff']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#dfeaff' } } }
      }
    });
  }

  function buildTimelineChart(teams) {
    const labels = ['Jornada 1', 'Jornada 2', 'Jornada 3', 'Jornada 4', 'Jornada 5', 'Jornada 6'];
    const totals = labels.map((_, index) => teams.reduce((sum, team) => sum + (team.serie[index] || 0), 0));
    createChart('chartTimeline', {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: 'Goles por jornada',
          data: totals,
          borderColor: '#61d5aa',
          backgroundColor: 'rgba(97, 213, 170, 0.2)',
          pointBackgroundColor: '#61d5aa',
          pointRadius: 4,
          tension: 0.25,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#dfeaff' } } },
        scales: { y: { beginAtZero: true, ticks: { color: '#d9e6ff' }, grid: { color: 'rgba(217,230,255,0.12)' } }, x: { ticks: { color: '#d9e6ff' }, grid: { display: false } } }
      }
    });
  }

  function buildMetricComparisonChart(teams) {
    const metricMap = {
      golesFavor: 'golesFavor',
      golesEnContra: 'golesEnContra',
      diferenciaGoles: 'diferenciaGoles',
      puntos: 'puntos'
    };

    const selectedMetric = metricFilter?.value || 'golesFavor';
    const viewTeams = [...teams].sort((a, b) => {
      const left = selectedMetric === 'diferenciaGoles' ? (b.golesFavor - b.golesEnContra) : b[metricMap[selectedMetric]];
      const right = selectedMetric === 'diferenciaGoles' ? (a.golesFavor - a.golesEnContra) : a[metricMap[selectedMetric]];
      return left - right;
    }).slice(0, Math.min(teams.length, 5));

    createChart('chartMetricComparison', {
      type: 'bar',
      data: {
        labels: viewTeams.map((team) => team.equipo),
        datasets: [{
          label: selectedMetric === 'golesFavor' ? 'Goles a favor' : selectedMetric === 'golesEnContra' ? 'Goles en contra' : selectedMetric === 'diferenciaGoles' ? 'Diferencia de goles' : 'Puntos',
          data: viewTeams.map((team) => selectedMetric === 'diferenciaGoles' ? (team.golesFavor - team.golesEnContra) : team[metricMap[selectedMetric]] || 0),
          backgroundColor: '#40b7ff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#dfeaff' } } },
        scales: { y: { beginAtZero: true, ticks: { color: '#d9e6ff' }, grid: { color: 'rgba(217,230,255,0.12)' } }, x: { ticks: { color: '#d9e6ff' }, grid: { display: false } } }
      }
    });
  }

  function buildRadarChart(teams) {
    const comparisonTeams = [...teams].sort((a, b) => b.puntos - a.puntos).slice(0, 2);
    if (comparisonTeams.length < 2) {
      createChart('chartRadar', {
        type: 'radar',
        data: { labels: ['Goles a favor', 'Puntos', 'Victorias', 'Diferencia'], datasets: [{ label: 'Sin comparación', data: [0, 0, 0, 0], backgroundColor: 'rgba(143,102,255,0.2)', borderColor: '#8f66ff' }] },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#dfeaff' } } }, scales: { r: { suggestedMin: 0, suggestedMax: 20, ticks: { color: '#d9e6ff' } } } }
      });
      return;
    }

    const normalizedTeamA = [
      comparisonTeams[0].golesFavor / 18,
      comparisonTeams[0].puntos / 20,
      comparisonTeams[0].victorias / 6,
      Math.max(0, comparisonTeams[0].golesFavor - comparisonTeams[0].golesEnContra) / 12
    ];
    const normalizedTeamB = [
      comparisonTeams[1].golesFavor / 18,
      comparisonTeams[1].puntos / 20,
      comparisonTeams[1].victorias / 6,
      Math.max(0, comparisonTeams[1].golesFavor - comparisonTeams[1].golesEnContra) / 12
    ];

    createChart('chartRadar', {
      type: 'radar',
      data: {
        labels: ['Goles a favor', 'Puntos', 'Victorias', 'Diferencia'],
        datasets: [
          { label: comparisonTeams[0].equipo, data: normalizedTeamA, borderColor: '#59d4ff', backgroundColor: 'rgba(89,212,255,0.25)' },
          { label: comparisonTeams[1].equipo, data: normalizedTeamB, borderColor: '#8f66ff', backgroundColor: 'rgba(143,102,255,0.25)' }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#dfeaff' } } },
        scales: { r: { suggestedMin: 0, suggestedMax: 1.2, ticks: { color: '#d9e6ff' } } }
      }
    });
  }

  function buildScatterChart(teams) {
    createChart('chartScatter', {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Equipos',
          data: teams.map((team) => ({ x: team.golesEnContra, y: team.golesFavor, label: team.equipo })),
          backgroundColor: teams.map((team) => team.golesFavor > team.golesEnContra ? '#61d5aa' : '#ff7a7a'),
          pointRadius: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label(context) {
                const point = context.raw;
                return `${point.label}: ${point.x} GC / ${point.y} GF`;
              }
            }
          }
        },
        scales: {
          x: { title: { display: true, text: 'Goles en contra', color: '#dfeaff' }, ticks: { color: '#d9e6ff' }, grid: { color: 'rgba(217,230,255,0.12)' } },
          y: { title: { display: true, text: 'Goles a favor', color: '#dfeaff' }, ticks: { color: '#d9e6ff' }, grid: { color: 'rgba(217,230,255,0.12)' } }
        }
      }
    });
  }

  function buildStandingsTable(teams) {
    const standings = [...teams].sort((a, b) => b.puntos - a.puntos || b.golesFavor - a.golesFavor)
      .map((team, index) => ({
        posicion: index + 1,
        equipo: team.equipo,
        partidos: team.partidos,
        victorias: team.victorias,
        empates: team.empates,
        derrotas: team.derrotas,
        gf: team.golesFavor,
        gc: team.golesEnContra,
        dg: team.golesFavor - team.golesEnContra,
        puntos: team.puntos
      }));

    const tbody = document.querySelector('#standingsTable tbody');
    if (!tbody) return;
    tbody.innerHTML = standings.map((row) => `
      <tr>
        <td>${row.posicion}</td>
        <td>${row.equipo}</td>
        <td>${row.partidos}</td>
        <td>${row.victorias}</td>
        <td>${row.empates}</td>
        <td>${row.derrotas}</td>
        <td>${row.gf}</td>
        <td>${row.gc}</td>
        <td>${row.dg}</td>
        <td>${row.puntos}</td>
      </tr>
    `).join('');
  }

  function renderInsights(teams) {
    const list = document.getElementById('insightsList');
    if (!list) return;

    if (!teams.length) {
      list.innerHTML = '<li>No hay datos para mostrar con los filtros actuales. Ajusta la selección.</li>';
      return;
    }

    const topOffense = [...teams].sort((a, b) => b.golesFavor - a.golesFavor)[0];
    const bestDefense = [...teams].sort((a, b) => a.golesEnContra - b.golesEnContra)[0];
    const avgGoals = teams.reduce((sum, team) => sum + team.golesFavor, 0) / teams.length;
    const highScoring = teams.filter((team) => team.golesFavor > avgGoals).map((team) => team.equipo).join(', ');

    list.innerHTML = `
      <li>El equipo con mayor producción ofensiva es ${topOffense.equipo}, con ${topOffense.golesFavor} goles anotados.</li>
      <li>La mejor línea defensiva corresponde a ${bestDefense.equipo}, con ${bestDefense.golesEnContra} goles recibidos.</li>
      <li>El promedio de goles a favor del conjunto filtrado es ${avgGoals.toFixed(1)}; equipos por encima de ese valor incluyen ${highScoring || 'ninguno'}.</li>
      <li>Los resultados se interpretan como una instantánea de rendimiento del conjunto de datos disponible y no como una clasificación oficial.</li>
    `;
  }

  function exportCsv() {
    const teams = getFilteredTeams();
    if (!teams.length) {
      showAlert('No hay datos para exportar con los filtros actuales.');
      return;
    }

    const rows = [
      ['Equipo', 'Fase', 'Partidos', 'Victorias', 'Empates', 'Derrotas', 'Goles a favor', 'Goles en contra', 'Diferencia', 'Puntos'],
      ...teams.map((team) => [
        team.equipo,
        team.fase,
        team.partidos,
        team.victorias,
        team.empates,
        team.derrotas,
        team.golesFavor,
        team.golesEnContra,
        team.golesFavor - team.golesEnContra,
        team.puntos
      ])
    ];

    const csv = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'champions-league-dashboard.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    clearAlert();
  }

  function refreshDashboard() {
    const teams = getFilteredTeams();
    if (!teams.length) {
      showAlert('No hay datos para ese filtro. Prueba otra combinación de selección.');
      updateKpis([]);
      renderInsights([]);
      buildStandingsTable([]);
      return;
    }

    clearAlert();
    updateKpis(teams);
    buildGoalsByTeamChart(teams);
    buildResultMixChart(teams);
    buildTimelineChart(teams);
    buildMetricComparisonChart(teams);
    buildRadarChart(teams);
    buildScatterChart(teams);
    buildStandingsTable(teams);
    renderInsights(teams);
  }

  function bindFilters() {
    [stageFilter, teamFilter, metricFilter, periodFilter].forEach((element) => {
      if (element) {
        element.addEventListener('change', refreshDashboard);
      }
    });

    resetFiltersBtn?.addEventListener('click', () => {
      if (stageFilter) stageFilter.value = 'Todos';
      if (teamFilter) teamFilter.value = 'Todos';
      if (metricFilter) metricFilter.value = 'golesFavor';
      if (periodFilter) periodFilter.value = 'Todas';
      refreshDashboard();
    });

    exportCsvBtn?.addEventListener('click', exportCsv);
  }

  populateTeamFilter();
  bindFilters();
  refreshDashboard();
});
