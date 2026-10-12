'use strict';
window.TIMING_WEIGHTS=[0,7,7,5,4,5,7,10,5,8,12,3,null,4,5,5,1,2,null,null,5,null,3,3,3,3,null,3,2,2,3,2,2,3,2,3,3,3,5/3,5/3,5/3,2,5/3,5/3,5/3,2.5,2.5,2,5];
// Italian incoming miles. Unreadable exported numerals remain null.
// 35 = 5+5+5+10+10 through untagged intermediate places.
// 24 = 3+15+6, with an additional unstated leg into Bresse.
// 21 = the remaining half of the shared 12-mile stage, then 15 to Verona.
window.ITALIAN_MILES=[1,4,6,5,35,null,null,null,null,null,24,21,20,null,25];
window.buildTimingModel=function(stops,missingWeight,arrivalDay=4,mileFactor=.5){
 let distance=0;
 const places=stops.map((s,i)=>{
  const raw=i<49?window.TIMING_WEIGHTS[i]:i<64?window.ITALIAN_MILES[i-49]:s.timingWeight;
  let weight=raw==null?missingWeight:raw*(i>=49&&i<64?mileFactor:1);if(i===59)weight+=missingWeight;
  distance+=weight;
  return {stop:s.id,weight,distanceCumulative:distance,weightSource:raw==null?'assumed missing-leg weight':i>=64?'relative sea/arrival-stage weight; not a land unit conversion':i<49?'reported league distance or shared stage':'reported miles or shared/summed stages; adjusted by regional ratio',day:null,status:'undated',cumulative:0};
 });
 const anchors=[{i:1,day:5},{i:2,day:5},{i:26,day:17},{i:63,day:34},...stops.map((s,i)=>({i,day:s.anchorDay,status:s.anchorStatus})).filter(a=>a.i>=64&&a.day!=null)];
 for(const a of anchors){places[a.i].day=a.day;places[a.i].status=a.status==='relative'?'relative-date':a.status==='interpreted'?'interpreted-date':'written';}
 for(let k=0;k<anchors.length-1;k++){
  const a=anchors[k],b=anchors[k+1],span=places[b.i].distanceCumulative-places[a.i].distanceCumulative;
  for(let i=a.i+1;i<b.i;i++){
   const fraction=span>0?(places[i].distanceCumulative-places[a.i].distanceCumulative)/span:(i-a.i)/(b.i-a.i);
   places[i].day=a.day+(b.day-a.day)*fraction;places[i].status='interpolated';
  }
 }
 // Slider uses elapsed-day spacing; small offsets keep same-day events selectable.
 let previous=0;
 for(let i=0;i<places.length;i++){const p=places[i];const value=p.day==null?0:p.day-4;p.cumulative=i?Math.max(value,previous+.02):value;previous=p.cumulative;}
 const pace=(places[26].distanceCumulative-places[2].distanceCumulative)/12;
 return {places,total:places.at(-1).cumulative,pace,missingWeight,arrivalDay:4,mileFactor,assumptions:'Dates anchor the journey from April through arrival in Jerusalem on 28 July. Between dated events, elapsed time is allocated proportionally to recorded stage weights. Arrival and departure events preserve documented stays. Shared distances and missing-leg assumptions remain provisional. Italian mile/league weighting is regional; sea distances are not converted with that ratio. Relative and interpreted dates are labelled. The slider follows elapsed-day spacing with slight offsets for multiple events on one day. No calendar conversion; intermediate dates are estimates.'};
};
