(() => {
  'use strict';
  const model = window.ROMAN_NETWORK;
  if (!model) return;
  const ns = 'http://www.w3.org/2000/svg';
  const make = (name, attrs = {}, parent) => {
    const node = document.createElementNS(ns, name);
    Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
    if (parent) parent.appendChild(node);
    return node;
  };
  const line = coordinates => coordinates.map(([lon, lat], index) => {
    const [x, y] = project(lon, lat);
    return `${index ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');

  const roadLayer = make('g', { class: 'roman-road-layer' });
  const corridorLayer = make('g', { class: 'road-corridor-layer' });
  const hypothesisLayer = make('g', { class: 'road-hypothesis-layer' });
  layer.insertBefore(roadLayer, routeLayer);
  layer.insertBefore(corridorLayer, routeLayer);
  layer.insertBefore(hypothesisLayer, routeLayer);
  make('path', { class: 'roman-road-network', d: model.roads.map(line).join(' ') }, roadLayer);
  model.barbatre.routes.forEach(route => make('path', {
    class: `road-corridor${route.crossesUnresolved ? ' unresolved-corridor' : ''}`,
    d: line(route.coordinates)
  }, corridorLayer));
  model.barbatre.unresolved.forEach(place => {
    const [x, y] = project(...place.candidate[0]);
    const group = make('g', { class: 'road-hypothesis', transform: `translate(${x} ${y})`, tabindex: '0', role: 'button', 'aria-label': `${place.name}: network-position hypothesis` }, hypothesisLayer);
    make('path', { d: 'M0,-6 L6,0 L0,6 L-6,0 Z' }, group);
    make('title', {}, group).textContent = `${place.name}: a position to investigate, not an identification`;
    const open = () => showInvestigation(place);
    group.addEventListener('click', open);
    group.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
  });

  const controls = document.createElement('div');
  controls.className = 'road-controls';
  controls.innerHTML = `<label><input type="checkbox" data-road-layer="network" checked> Roman roads</label><label><input type="checkbox" data-road-layer="corridors"> Highlight corridors</label><label><input type="checkbox" data-road-layer="hypotheses" checked> Unidentified places</label><button type="button" id="roadAnalysis">Road analysis ↗</button>`;
  document.querySelector('.map-heading').insertAdjacentElement('afterend', controls);
  const layers = { network: roadLayer, corridors: corridorLayer, hypotheses: hypothesisLayer };
  corridorLayer.style.display = 'none';
  controls.querySelectorAll('[data-road-layer]').forEach(input => input.addEventListener('change', () => {
    layers[input.dataset.roadLayer].style.display = input.checked ? '' : 'none';
  }));

  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  function showInvestigation(place) {
    openDialog(`${place.name} · place investigation`, `<p><span class="badge">Unidentified place</span></p><p>The candidate marker lies along the shortest connected DARMC corridor between <strong>${escape(place.between[0])}</strong> and <strong>${escape(place.between[1])}</strong>. It divides that corridor by narrative order. It is a search area, not a proposed identification.</p><div class="metadata"><p><strong>Candidate centre:</strong> ${place.candidate[0][1].toFixed(4)}° N, ${place.candidate[0][0].toFixed(4)}° E</p><p><strong>Indicative search radius:</strong> ${place.radiusKm} km</p><p><strong>Modelled corridor:</strong> ${place.corridorKm} km</p><p><strong>Reported distance:</strong> ${escape(place.reportedDistance || 'none separately assigned')}</p>${place.distanceComparison?`<p><strong>Bounded manuscript sequence:</strong> ${escape(place.distanceComparison.reported)}</p><p><strong>Working historical range:</strong> ${place.distanceComparison.workingRangeKm[0]}–${place.distanceComparison.workingRangeKm[1]} km</p><p><strong>Comparable road distance:</strong> ${place.distanceComparison.modelKm} km · <span class="distance-verdict ${place.distanceComparison.verdict.replace(' ','-')}">${escape(place.distanceComparison.verdict)}</span></p>`:''}</div>${place.distanceComparison?`<p class="interpretation">${escape(place.distanceComparison.basis)}</p>`:''}<p>Next checks should combine the manuscript spelling and distance statement with historical gazetteers, terrain, river crossings, and documented medieval road continuity.</p>`);
  }
  function analysisTable() {
    return model.barbatre.unresolved.map(place => { const comparison=place.distanceComparison; return `<tr><td><button data-place="${escape(place.id)}">${escape(place.name)}</button></td><td>${escape(place.between.join(' → '))}</td><td>${comparison?escape(comparison.reported):escape(place.reportedDistance||'—')}</td><td>${comparison?`${comparison.workingRangeKm[0]}–${comparison.workingRangeKm[1]} km`:'—'}</td><td>${comparison?`${comparison.modelKm} km`:`${place.corridorKm} km`}</td><td>${comparison?`<span class="distance-verdict ${comparison.verdict.replace(' ','-')}">${escape(comparison.verdict)}</span>`:'not assessed'}</td><td>${place.candidate[0][1].toFixed(3)}, ${place.candidate[0][0].toFixed(3)}</td></tr>`; }).join('');
  }
  document.getElementById('roadAnalysis').addEventListener('click', () => {
    openDialog('Roman roads and unidentified places', `<p>The overlay contains ${model.metadata.features.toLocaleString()} DARMC road features. The coloured corridors are shortest paths through the largest connected component, snapped from known itinerary points. They are comparative hypotheses, not claims that Barbatre used a surviving Roman road.</p><p>The distance test uses broad working ranges—3–5 km per lieue, 4–6 km per grosse lieue, and 1.5–2 km per Italian mille—and compares the complete bounded sequence wherever possible. These ranges expose compatibility or tension; they do not convert the manuscript into exact kilometres.</p><p>${escape(model.metadata.warning)}</p><div class="road-table-wrap"><table class="road-table"><thead><tr><th>Place</th><th>Between known stops</th><th>Manuscript sequence</th><th>Working range</th><th>Road model</th><th>Assessment</th><th>Candidate centre</th></tr></thead><tbody>${analysisTable()}</tbody></table></div><p><a href="${model.metadata.source}" target="_blank" rel="noreferrer">DARMC data and licence ↗</a></p>`);
    document.querySelectorAll('#dialogBody [data-place]').forEach(button => button.addEventListener('click', () => showInvestigation(model.barbatre.unresolved.find(place => place.id === button.dataset.place))));
  });

  const proximityFor = stop => model.barbatre.proximity[stop.id];
  const enrichPopup = () => {
    const popup = document.getElementById('popup');
    if (popup.hidden || popup.querySelector('.road-evidence')) return;
    const active = document.querySelector('.stop-button.active');
    if (!active) return;
    const stop = stops.find(item => item.id === active.dataset.stop);
    const proximity = stop && proximityFor(stop);
    const unresolved = stop && model.barbatre.unresolved.find(item => item.id === stop.id);
    if (!proximity && !unresolved) return;
    const section = document.createElement('details');
    section.className = 'interpretation road-evidence';
    section.innerHTML = unresolved
      ? `<summary>Roman-road investigation</summary><p>A candidate search position is modelled between ${escape(unresolved.between.join(' and '))}, with a ${unresolved.radiusKm} km indicative radius. This is not an identification.</p><button type="button">Open investigation ↗</button>`
      : `<summary>Roman-road proximity</summary><p>The mapped point is approximately <strong>${proximity.distanceKm} km</strong> from the nearest DARMC road geometry. This measures proximity to a Roman-period reference network, not use in 1480.</p>`;
    if (unresolved) section.querySelector('button').addEventListener('click', () => showInvestigation(unresolved));
    popup.querySelector('.popup-nav')?.before(section);
  };
  new MutationObserver(enrichPopup).observe(document.getElementById('popup'), { childList: true });
  enrichPopup();

  const scaleHypotheses = () => {
    const match = layer.getAttribute('transform')?.match(/scale\(([^)]+)\)/);
    const scale = Number(match?.[1]) || 1;
    hypothesisLayer.querySelectorAll('.road-hypothesis').forEach(group => {
      const translate = group.getAttribute('transform').match(/translate\(([^)]+)\)/)[1];
      group.setAttribute('transform', `translate(${translate}) scale(${1 / scale})`);
    });
  };
  new MutationObserver(scaleHypotheses).observe(layer, { attributes: true, attributeFilter: ['transform'] });
  scaleHypotheses();
  document.querySelector('.legend').insertAdjacentHTML('beforeend', '<span><i class="roman-key"></i>DARMC Roman road</span><span><i class="corridor-key"></i>Plausible road corridor</span><span><i class="hypothesis-key"></i>Unidentified-place hypothesis</span>');
  document.querySelector('.attribution').insertAdjacentHTML('beforeend', ` · <a href="${model.metadata.source}" target="_blank" rel="noreferrer">DARMC roads</a>`);
})();
