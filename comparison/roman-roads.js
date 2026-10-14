(() => {
  'use strict';
  const model = window.ROMAN_NETWORK;
  if (!model) return;
  const ns = 'http://www.w3.org/2000/svg';
  const make = (name, attrs = {}, parent) => { const node = document.createElementNS(ns, name); Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value)); parent?.appendChild(node); return node; };
  const line = coordinates => coordinates.map(([lon, lat], index) => { const [x, y] = project(lon, lat); return `${index ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`; }).join(' ');
  const roads = make('g', { class: 'roman-road-layer' });
  const corridors = make('g', { class: 'road-corridor-layer' });
  const hypotheses = make('g', { class: 'road-hypothesis-layer' });
  geography.insertBefore(roads, overlay); geography.insertBefore(corridors, overlay); geography.insertBefore(hypotheses, overlay);
  make('path', { class: 'roman-road-network', d: model.roads.map(line).join(' ') }, roads);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function currentAnalyses() {
    if (phase === 'shared') return [{ id: 'holyLand', name: 'Shared Holy Land guide', color: '#476f78', analysis: model.comparison.holyLand }];
    return authors.filter(item => visible.has(item.id)).map(item => ({ ...item, analysis: model.comparison.approaches[item.id] }));
  }
  function renderRoadAnalysis() {
    corridors.replaceChildren(); hypotheses.replaceChildren();
    currentAnalyses().forEach(item => {
      item.analysis.routes.forEach(route => make('path', { class: `road-corridor${route.crossesUnresolved ? ' unresolved-corridor' : ''}`, d: line(route.coordinates), style: `--road-author:${item.color}` }, corridors));
      item.analysis.unresolved.forEach(place => {
        const [x, y] = project(...place.candidate[0]);
        const group = make('g', { class: 'road-hypothesis', transform: `translate(${x} ${y})`, tabindex: '0', role: 'button', style: `--road-author:${item.color}`, 'aria-label': `${place.name}: network-position hypothesis` }, hypotheses);
        make('path', { d: 'M0,-6 L6,0 L0,6 L-6,0 Z' }, group);
        make('title', {}, group).textContent = `${item.name} · ${place.name}: a position to investigate, not an identification`;
        const open = () => openInvestigation(item, place);
        group.addEventListener('click', open); group.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
      });
    });
    scaleHypotheses();
  }
  function openInvestigation(item, place) {
    openDialog(`${place.name} · place investigation`, `<p><span class="badge">${escape(item.name)}</span></p><p>The candidate marker lies along a connected DARMC corridor between <strong>${escape(place.between[0])}</strong> and <strong>${escape(place.between[1])}</strong>. Narrative order determines its relative position. It is a search area, not a proposed identification.</p><div class="source-meta"><p><strong>Candidate centre:</strong> ${place.candidate[0][1].toFixed(4)}° N, ${place.candidate[0][0].toFixed(4)}° E</p><p><strong>Indicative radius:</strong> ${place.radiusKm} km</p><p><strong>Modelled corridor:</strong> ${place.corridorKm} km</p><p><strong>Reported distance:</strong> ${escape(place.reportedDistance || 'none separately assigned')}</p></div>`);
  }
  const controls = document.createElement('div'); controls.className = 'road-controls';
  controls.innerHTML = '<label><input type="checkbox" data-road-layer="network" checked> Roman roads</label><label><input type="checkbox" data-road-layer="corridors"> Highlight corridors</label><label><input type="checkbox" data-road-layer="hypotheses" checked> Unidentified places</label><button type="button" id="roadAnalysis">Road analysis ↗</button>';
  document.querySelector('.map-heading').insertAdjacentElement('afterend', controls);
  const layerLookup = { network: roads, corridors, hypotheses };
  corridors.style.display = 'none';
  controls.querySelectorAll('[data-road-layer]').forEach(input => input.addEventListener('change', () => { layerLookup[input.dataset.roadLayer].style.display = input.checked ? '' : 'none'; }));
  document.getElementById('roadAnalysis').addEventListener('click', () => {
    const selected = currentAnalyses();
    const rows = selected.flatMap(item => item.analysis.unresolved.map(place => `<tr><td>${escape(item.name)}</td><td><button data-author="${escape(item.id)}" data-place="${escape(place.id)}">${escape(place.name)}</button></td><td>${escape(place.between.join(' → '))}</td><td>${place.radiusKm} km</td></tr>`)).join('');
    openDialog('Roman-road analysis', `<p>The map compares narrative sequences with ${model.metadata.features.toLocaleString()} DARMC Roman road features. Corridors are shortest connected-network paths between identified waypoints. They support comparison and place-name research; they do not prove a route remained usable or was followed in 1480.</p><p>${escape(model.metadata.warning)}</p>${rows ? `<div class="road-table-wrap"><table class="road-table"><thead><tr><th>Narrative</th><th>Unidentified place</th><th>Between</th><th>Radius</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p>No unresolved place falls inside the selected land sequence.</p>'}<p><a href="${model.metadata.source}" target="_blank" rel="noreferrer">DARMC data and licence ↗</a></p>`);
    document.querySelectorAll('#dialogBody [data-place]').forEach(button => button.addEventListener('click', () => { const item = selected.find(row => row.id === button.dataset.author); openInvestigation(item, item.analysis.unresolved.find(place => place.id === button.dataset.place)); }));
  });
  function scaleHypotheses() {
    hypotheses.querySelectorAll('.road-hypothesis').forEach(group => {
      const translate = group.getAttribute('transform').match(/translate\(([^)]+)\)/)[1];
      group.setAttribute('transform', `translate(${translate}) scale(${1 / zoom})`);
    });
  }
  new MutationObserver(scaleHypotheses).observe(geography, { attributes: true, attributeFilter: ['transform'] });
  document.querySelectorAll('[data-phase], #authorControls input, #approachAuthor').forEach(control => control.addEventListener('change', () => setTimeout(renderRoadAnalysis)));
  document.querySelectorAll('[data-phase]').forEach(control => control.addEventListener('click', () => setTimeout(renderRoadAnalysis)));
  document.querySelector('.attribution').insertAdjacentHTML('beforeend', ` · <a href="${model.metadata.source}" target="_blank" rel="noreferrer">DARMC roads</a>`);
  renderRoadAnalysis();
})();
