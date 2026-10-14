window.CITY_DATA = {
  authors: {
    barbatre: {name:"Pierre Barbatre", colour:"#b7472a"},
    fabri: {name:"Felix Fabri", colour:"#305f75"},
    brasca: {name:"Santo Brasca", colour:"#86702d"},
    anonymous: {name:"Anonymous French pilgrim", colour:"#72527f"}
  },
  venice: {
    title:"Venice, while the galley waited", kicker:"4 May–6 June 1480", image:"images/venice-1500.jpg",
    mapTitle:"Jacopo de’ Barbari, View of Venice (1500)",
    mapNote:"A near-contemporary bird’s-eye view made twenty years after the journey. Pins are approximate visual anchors on a perspectival image; paths show narrative order, not reconstructed streets.",
    sourceUrl:"https://commons.wikimedia.org/wiki/File:Jacopo_de%27_Barbari_-_View_of_Venice_-_Google_Art_Project.jpg",
    places:{
      fondaco:{label:"Fondaco dei Tedeschi",x:56,y:47}, rialto:{label:"Rialto",x:54,y:50}, sanmarco:{label:"San Marco & Piazza",x:73,y:60}, palace:{label:"Doge’s Palace",x:76,y:62},
      salvatore:{label:"San Salvador",x:63,y:51}, giovannipaolo:{label:"SS. Giovanni e Paolo",x:70,y:40}, frari:{label:"Santa Maria Gloriosa dei Frari",x:40,y:54},
      carita:{label:"Santa Maria della Carità",x:51,y:65}, zaccaria:{label:"San Zaccaria",x:80,y:57}, crociferi:{label:"Crociferi",x:62,y:36},
      arsenal:{label:"Arsenal",x:87,y:48}, murano:{label:"Murano",x:56,y:22}, elena:{label:"Sant’Elena",x:92,y:66}, inn:{label:"Pilgrims’ lodging",x:58,y:51}, galley:{label:"Galley / waterfront",x:75,y:72}
    },
    stops:[
      {a:"barbatre",d:"4 May · vespers",p:"inn",t:"Arrives and begins a stay of more than a month."},
      {a:"barbatre",d:"May · date unstated",p:"sanmarco",t:"Examines San Marco, its treasury, relics, mosaics and campanile."},
      {a:"barbatre",d:"May · date unstated",p:"giovannipaolo",t:"Visits SS. Giovanni e Paolo and nearby monuments."},
      {a:"barbatre",d:"May · date unstated",p:"salvatore",t:"Records the organ and musical experience at San Salvador."},
      {a:"barbatre",d:"May · date unstated",p:"carita",t:"Visits Santa Maria della Carità."},
      {a:"barbatre",d:"May · date unstated",p:"murano",t:"Makes an excursion to Murano and its churches."},
      {a:"barbatre",d:"1 June",p:"sanmarco",t:"Watches the Corpus Christi procession around San Marco."},
      {a:"barbatre",d:"1–6 June",p:"galley",t:"Begins sleeping aboard before departure on 6 June."},
      {a:"fabri",d:"May · date unstated",p:"fondaco",t:"Arrives by barque at the Fondaco dei Tedeschi."},
      {a:"fabri",d:"May · date unstated",p:"inn",t:"Stays at the Inn of St George among noble pilgrims."},
      {a:"fabri",d:"May · date unstated",p:"palace",t:"His party negotiates passage and petitions the Senate amid news from Rhodes."},
      {a:"fabri",d:"6 June",p:"galley",t:"Joins the common departure; the supplied account compresses his Venetian sightseeing."},
      {a:"brasca",d:"7 May · c. 20th hour",p:"inn",t:"Arrives and lodges with Messer Stefasio and the Archinti brothers."},
      {a:"brasca",d:"8 May–31 May",p:"sanmarco",t:"Visits San Marco, relics and the campanile during his stay."},
      {a:"brasca",d:"May · date unstated",p:"giovannipaolo",t:"Visits SS. Giovanni e Paolo and the Scuola di San Marco."},
      {a:"brasca",d:"May · date unstated",p:"frari",t:"Visits Franciscan churches and ducal tombs."},
      {a:"brasca",d:"May · date unstated",p:"palace",t:"Observes civic government and the Doge’s Palace."},
      {a:"brasca",d:"May · date unstated",p:"arsenal",t:"Visits the Arsenal."},
      {a:"brasca",d:"May · date unstated",p:"murano",t:"Makes an excursion to Murano."},
      {a:"brasca",d:"1 June",p:"sanmarco",t:"Records the Corpus Christi ceremonies."},
      {a:"brasca",d:"5–6 June",p:"galley",t:"Boards with his Milanese companions and departs on 6 June."},
      {a:"anonymous",d:"May · date unstated",p:"inn",t:"Lodges at the Wild Man and surveys the city extensively."},
      {a:"anonymous",d:"May · date unstated",p:"sanmarco",t:"Describes San Marco, its relics, Piazza and campanile."},
      {a:"anonymous",d:"May · date unstated",p:"frari",t:"Visits the Frari."},
      {a:"anonymous",d:"May · date unstated",p:"rialto",t:"Observes Rialto and Venetian commerce."},
      {a:"anonymous",d:"May · date unstated",p:"crociferi",t:"Visits Santa Maria dei Crociferi."},
      {a:"anonymous",d:"May · date unstated",p:"zaccaria",t:"Visits San Zaccaria."},
      {a:"anonymous",d:"May · date unstated",p:"elena",t:"Visits Sant’Elena."},
      {a:"anonymous",d:"May · date unstated",p:"carita",t:"Visits Santa Maria della Carità."},
      {a:"anonymous",d:"May · date unstated",p:"murano",t:"Travels to Murano."},
      {a:"anonymous",d:"May · date unstated",p:"arsenal",t:"Describes the Arsenal, arms and productive capacity."},
      {a:"anonymous",d:"1 June",p:"sanmarco",t:"Attends the Corpus Christi procession, then sleeps aboard."},
      {a:"anonymous",d:"6 June",p:"galley",t:"Leaves Venice on the shared galley."}
    ],
    encounters:[
      {level:"strong",where:"San Marco · 1 June",who:["barbatre","brasca","anonymous"],text:"Three accounts independently place their authors at the Corpus Christi ceremonies. They may have occupied the same ceremonial space, although none records recognising the others."},
      {level:"attested",where:"Galley and waterfront · 5–6 June",who:["barbatre","fabri","brasca","anonymous"],text:"All four converge on the same vessel. This is group co-presence rather than an unknown street encounter."},
      {level:"possible",where:"San Marco precinct · May",who:["barbatre","brasca","anonymous"],text:"Each visited the principal civic-devotional complex during overlapping stays, but most visits are undated; no same-day meeting can be inferred."},
      {level:"possible",where:"Murano and Arsenal · May",who:["barbatre","brasca","anonymous"],text:"Overlapping selections reveal common curiosity, not proof of simultaneous visits."}
    ],
    interests:{
      barbatre:["Relics and indulgences","Liturgical performance","Material splendour","Sound and music"],
      fabri:["Pilgrim community","Travel contracts","Political risk","Social hierarchy"],
      brasca:["Relics and devotion","Civic government","Architecture","Elite hospitality"],
      anonymous:["Urban institutions","Commerce and justice","Arsenal and arms","Relics and public ritual"]
    }
  },
  jerusalem:{
    title:"Jerusalem, a managed pilgrimage", kicker:"28 July–7 August 1480", image:"images/jerusalem-1486.jpg",
    mapTitle:"Erhard Reuwich, Jerusalem view (1486)",
    mapNote:"Printed six years after this journey from observations made in 1483. The view combines topography, sacred memory and pictorial convention. Pins indicate approximate depicted zones; paths encode visit order only.",
    sourceUrl:"https://commons.wikimedia.org/wiki/File:Peregrinatio_in_terram_sanctam_Jerusalem_map_in_color.jpg",
    places:{
      gate:{label:"City gate / arrival",x:60,y:69}, hospice:{label:"Secular pilgrims’ lodging",x:45,y:43}, sepulchre:{label:"Holy Sepulchre",x:17,y:43}, via:{label:"Via Dolorosa sites",x:39,y:40},
      temple:{label:"Temple precinct",x:53,y:49}, stephen:{label:"St Stephen’s Gate",x:78,y:50}, kidron:{label:"Kidron / Valley of Jehoshaphat",x:85,y:51}, mary:{label:"Tomb of the Virgin",x:87,y:39},
      gethsemane:{label:"Gethsemane",x:89,y:34}, olives:{label:"Mount of Olives",x:87,y:16}, siloe:{label:"Siloam",x:77,y:75}, zion:{label:"Mount Zion",x:15,y:62}, bethany:{label:"Bethany / Bethphage",x:95,y:28}
    },
    stops:[
      {a:"barbatre",d:"28 July · c. 8 a.m.",p:"sepulchre",t:"Arrives before the Holy Sepulchre, prays, then goes to the secular lodging."},
      {a:"barbatre",d:"29–30 July",p:"sepulchre",t:"Night visit, procession, Calvary, chapels and relics within the church."},
      {a:"barbatre",d:"30 July",p:"via",t:"Follows the Passion route through the city."},
      {a:"barbatre",d:"30 July",p:"kidron",t:"Passes St Stephen’s Gate into the Valley of Jehoshaphat."},
      {a:"barbatre",d:"30 July",p:"mary",t:"Visits the Tomb of the Virgin and nearby holy places."},
      {a:"barbatre",d:"30 July",p:"olives",t:"Climbs the Mount of Olives and visits the Ascension site."},
      {a:"barbatre",d:"30 July–early August",p:"siloe",t:"Visits Siloam, Akeldama and the southern valley."},
      {a:"barbatre",d:"early August",p:"zion",t:"Visits the Franciscan convent and clustered sites on Mount Zion."},
      {a:"barbatre",d:"4–6 August",p:"bethany",t:"Visits Bethany and Bethphage before the final Holy Sepulchre vigil."},
      {a:"fabri",d:"28 July",p:"hospice",t:"Enters Jerusalem and is lodged in a house in Millo."},
      {a:"fabri",d:"28 July–6 August",p:"sepulchre",t:"Reports only a hurried visit to the holy places and the knighting of nobles."},
      {a:"fabri",d:"7 August",p:"gate",t:"Leaves with the group; his supplied retrospective account gives no internal itinerary."},
      {a:"brasca",d:"28 July · morning",p:"gate",t:"First sees Jerusalem, dismounts and joins an emotionally charged devotional entry."},
      {a:"brasca",d:"28 July–6 August",p:"sepulchre",t:"Participates in the prescribed visits and liturgies at the Holy Sepulchre."},
      {a:"brasca",d:"28 July–6 August",p:"zion",t:"Visits the Mount Zion complex within the group programme."},
      {a:"brasca",d:"28 July–6 August",p:"kidron",t:"Follows the Valley of Jehoshaphat and Mount of Olives circuit."},
      {a:"brasca",d:"7 August",p:"gate",t:"Departs Jerusalem with the common caravan."},
      {a:"anonymous",d:"28 July · c. 8 a.m.",p:"hospice",t:"Secular pilgrims lodge separately while the religious go to Mount Zion."},
      {a:"anonymous",d:"29 July–early August",p:"sepulchre",t:"Makes repeated vigils and gives a systematic architectural and devotional inventory."},
      {a:"anonymous",d:"early August",p:"via",t:"Records the intra-mural Passion sites in sequence."},
      {a:"anonymous",d:"early August",p:"kidron",t:"Visits the Valley of Jehoshaphat."},
      {a:"anonymous",d:"early August",p:"olives",t:"Ascends the Mount of Olives."},
      {a:"anonymous",d:"early August",p:"zion",t:"Visits Mount Zion and its scriptural sites."},
      {a:"anonymous",d:"4–5 August",p:"bethany",t:"Visits Bethany and Bethphage before returning through the Mount of Olives."},
      {a:"anonymous",d:"5–6 August",p:"sepulchre",t:"Takes part in the third and final vigil."},
      {a:"anonymous",d:"7 August · before sunrise",p:"gate",t:"Leaves Jerusalem with all the pilgrims."}
    ],
    encounters:[
      {level:"attested",where:"Approach and entry · 28 July",who:["barbatre","fabri","brasca","anonymous"],text:"The four men belonged to the escorted company entering the city. Their accounts frame the same arrival differently."},
      {level:"strong",where:"Holy Sepulchre · ritual nights",who:["barbatre","fabri","brasca","anonymous"],text:"The group programme makes co-presence highly likely; the narratives do not establish face-to-face recognition."},
      {level:"strong",where:"Mount Zion / valley circuits",who:["barbatre","brasca","anonymous"],text:"The fuller accounts follow substantially shared circuits under Franciscan guidance, though subgrouping and exact timing remain uncertain."},
      {level:"attested",where:"Departure · 7 August",who:["barbatre","fabri","brasca","anonymous"],text:"All pilgrims reassembled for the return caravan before sunrise."}
    ],
    interests:{
      barbatre:["Ritual topography","Indulgences and relics","Biblical localisation","Terrain and water"],
      fabri:["Time pressure","Pilgrim logistics","Noble knighting","Retrospective disappointment"],
      brasca:["Prayer and liturgy","Affective devotion","Group ritual","Sacred chronology"],
      anonymous:["Systematic topography","Architecture and measurements","Scriptural history","Route sequence"]
    }
  }
};
