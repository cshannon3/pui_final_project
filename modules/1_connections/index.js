
//https://dbramwell.github.io/react-animate-on-scroll/#animateOut
//https://p5js.org/examples/instance-mode-instance-container.html
//https://codepen.io/zxhfighter/pen/wWKqqX
//https://github.com/fabricjs/fabric.js
//https://p5js.org/learn/curves.html
//http://www3.weforum.org/docs/WEF_Global_Risk_Report_2020.pdf
//https://github.com/VincentGarreau/particles.js/
//https://medium.com/@myroslavazel/feedback-loops-in-system-thinking-7ef06e2ff310
//https://codepen.io/alvarotrigo/pen/dGmbdv?editors=1010
//https://learningforsustainability.net/systems-thinking/
// https://www.ordinarycoders.com/blog/article/codepen-bootstrap-card-hovers
//https://medium.com/disruptive-design/tools-for-systems-thinkers-the-6-fundamental-concepts-of-systems-thinking-379cdac3dc6a
// https://codepen.io/tutsplus/pen/dMvJaO
//https://www.racheljetel.com/recent-projects/2017/7/26/systems-futures-design-thinking-sustainability-workshops-in-hong-kong
//https://www.ordinarycoders.com/blog/article/codepen-bootstrap-card-hovers
//https://medium.com/from-design-thinking-to-system-change/thinking-like-a-system-c155061b0fb
//https://www.thersa.org/reports/from-design-thinking-to-system-change
//https://www.thersa.org/globalassets/pdfs/reports/rsa_from-design-thinking-to-system-change-report.pdf

/*
Models need

initial value

flows

*/
let grid = 6;
let h =3;
let loopsPerUpdate = 5;
let loop = 0;
let cnv,  pTop;
let side, unit, contentWidth;
let activeNode = "1";
let delayOn=false;
let feedbackOn=false;
let emergentOn=true;
let models = {...linearModel};
let active = "";
// TODO reset all
document.getElementById('reset-button').addEventListener('click', (div) => {
  models[activeNode].value=models[activeNode].initial;
  models["2"].value=models["2"].initial;
  models[activeNode].flows_out[0].value = models[activeNode].flows_out[0].initial;
  
  document.getElementById('a-val').innerHTML = models[activeNode].value.toFixed(2);
  document.getElementById('a-weight-val').innerHTML = models[activeNode].flows_out[0].value.toFixed(2);
  document.getElementById('b-val').innerHTML = models["2"].value.toFixed(2);
  clear();
  updateModels();
});




document.getElementById('pop-up-content').addEventListener('click', (div) => {
   // console.log(div.target.classList.length);
    let last = div.target.classList[div.target.classList.length-1];
    
    if(last in models && activeNode!==last){
      let newSelect = document.getElementsByClassName(`card  model-option ${last}`)[0];
      let oldSelect = document.getElementsByClassName(`card  model-option ${activeNode}`)[0];
      oldSelect.classList.remove("selected");
      newSelect.classList.add("selected")
      activeNode=last;
      document.getElementById('a-label').innerHTML = models[activeNode].name;
      document.getElementById('a-val').innerHTML = models[activeNode].value.toFixed(2);
      document.getElementById('a-weight-val').innerHTML = models[activeNode].flows_out[0].value.toFixed(2);
      clear();
      updateModels();
    }
});
document.getElementById('menu').addEventListener('mousedown', (div) => {
  // console.log(div.target.classList.length);
   let item = div.target;
   if (item.classList.contains("btn")){
     active=item.id;
   }
  
   
});
document.getElementById('menu').addEventListener('mouseup', (div) => {
 active = "";
});



function setup() {
 // Set size
  setSimSize();
  cnv = createCanvas(contentWidth, h*unit);
  models = linearModel;//balancemodels;
  cnv.parent('simulationBox');
  clear();
  updateModelValues();
  updateModels();

  isActive = false;
}

window.addEventListener("resize", ()=>{
  setSimSize();
  resizeCanvas(window.innerWidth, h*unit);
  clear();
  updateModels();
});

function draw() {
  if (!isActive && mouseIsPressed && checkForInput()) {
      console.log("c");
    clear();
      updateModelValues();
      updateModels();
      strokeWeight(1)
      Object.entries(models).forEach(([i, m]) => {
       
        m.last_val = m.value;
        if (m.history.length > 300) { m.history.shift() }
        beginShape();
        noFill();
       
        Object.entries(m.history).forEach(([j, h]) => {
          vertex(j,50-h *25);
        });
        endShape();
      
      });
      fill('black');
  }
 
}

//https://stackoverflow.com/questions/23334809/javascript-get-size-of-content-box
function property(e, p) { return parseInt(window.getComputedStyle(e, null).getPropertyValue(p));}

function doscale(val) {return (unit * val + side);}

function checkForInput(){
  loop+=1;
  let _select = false;
  Object.entries(models).forEach(([i, m]) => {
    //console.log( m.shape.x,unit, side,  mouseX);
    console.log(  m.shape.y*unit+pTop , mouseY,  unit * m.value / 2);
    if (dist(unit * m.shape.x + side, unit * m.shape.y + pTop, mouseX, mouseY) < unit  / 2) {
     
if(i!= activeNode){
      activeNode = i;
      _select = true;
}
      // m.shape.x = mouseX;
      // m.shape.y = mouseY;
     // console.log(m.shape)
      strokeWeight(3);
      stroke(3);
    }
    else{ stroke(0);strokeWeight(0);}
  });
  if(_select) return true;
  if(active ==="")return false;
  if(loop>=loopsPerUpdate){
    document.getElementById('b-val').innerHTML =models["2"].value.toFixed(2);
    if(active ==="a-minus"){
      models[activeNode].last_val= models[activeNode].value;
      if(models[activeNode].value>models[activeNode].min_cap){
        models[activeNode].value-=0.1;
      }
      document.getElementById('a-val').innerHTML = models[activeNode].value.toFixed(2);
    }
    else if(active ==="a-plus"){
      models[activeNode].last_val= models[activeNode].value;
      if(models[activeNode].value<models[activeNode].max_cap){
        models[activeNode].value+=0.1;
      }
      document.getElementById('a-val').innerHTML = models[activeNode].value.toFixed(2);
    }
    else if(active ==="a-weight-minus"){
      models[activeNode].flows_out[0].value-=0.1;
      document.getElementById('a-weight-val').innerHTML =models[activeNode].flows_out[0].value.toFixed(2);
    }
    else if(active ==="a-weight-plus"){
      models[activeNode].flows_out[0].value+=0.1;
      document.getElementById('a-weight-val').innerHTML = models[activeNode].flows_out[0].value.toFixed(2);
    }
    loop=0;
  }
  
  return true;;
}

function updateModels() {
  Object.entries(models).forEach(([i, m]) => {
   // console.log(m.name);
    let _x =(unit * m.shape.x + side);
    let _y = (unit * m.shape.y + pTop);
     if(m.value>0){
      fill('green');
    }else{
      fill('red')
    }
    if(activeNode===i){
      stroke('black');
      strokeWeight(3);
    }else{
      stroke(0)
      strokeWeight(0);
    }
    circle(_x, _y, unit * m.value - 10);
    strokeWeight(0);
    textSize(12);// TODO change depending 
    fill('black');
    //text(Math.round(m.value), _x, _y);
    text(m.name, _x, _y );
    textAlign(CENTER);
    Object.entries(m.flows_out).forEach(([i, flow]) => {
      if(feedbackOn || !flow.feedback){
        connectNode(flow, m);
      }
    });
  });
}



function updateModelValues() {
  models["2"].value=0;
  Object.entries(models).forEach(([i, m]) => {
    //  if(i===activeNode){
    let v = m.last_val;
    let canGo=true;
    m.flows_out.forEach((flowOut) => {
    if(delayOn && flowOut.delay ){
      if(m.history.length<flowOut.delay){
        canGo=false;
      }
      else {
        v= m.history[m.history.length-flowOut.delay];
      }
    }
   // feedbackOn || !flowOut.feedback
    if(canGo&& (feedbackOn || !flowOut.feedback) && !(emergentOn &&flowOut.flow_to=="2" )){
     if (flowOut.type === "dependent"){
       let nodeTo = models[flowOut.flow_to];
       //models[flowOut.flow_to].value
       let new_V= v* flowOut.value;//+ models[flowOut.flow_to].constant;
       if (new_V > nodeTo.max_cap)new_V = nodeTo.max_cap;
        else if (new_V < m.min_cap)new_V= nodeTo.min_cap;
        if(flowOut.flow_to=="2"){
          models[flowOut.flow_to].value += new_V;
        }else{
          models[flowOut.flow_to].value = models[flowOut.flow_to].initial + new_V;
        }
        
      }

      // else if(flowOut.type === "exp"){
      //   models[flowOut.flow_to].value= Math.pow(v, flowOut.value);
      // }
      else{
      let changeVal = 0;
      if (flowOut.type === "fixed") {
        if (flowOut.value < v) { changeVal = flowOut.value; }
        else { changeVal = v; }
        v -= changeVal;
        if (v > m.max_cap)
          m.value = m.max_cap;
        else if (v < m.min_cap)
          v = m.min_cap;
      }
  
      else { changeVal = v * flowOut.value; }
      models[flowOut.flow_to].value += changeVal;
      if (models[flowOut.flow_to].value > models[flowOut.flow_to].max_cap)
        models[flowOut.flow_to].value = models[flowOut.flow_to].max_cap;
      else if (models[flowOut.flow_to].value < models[flowOut.flow_to].min_cap)
        models[flowOut.flow_to].value = models[flowOut.flow_to].min_cap;
    }
  }
    });
  });

  
}



function setSimSize(){
  var box = document.getElementById('simulationBox');
  var paddingLeft = property(box, 'padding-left');
  var paddingRight = property(box, 'padding-right');
  contentWidth =  (box.clientWidth - paddingRight - paddingLeft);
    unit = contentWidth / grid;
    side =   (window.innerWidth-contentWidth) *0.5;
    pTop=unit/2;
}





function connectorNode(m, node, thickness, isPos, curve=false) {
  var [m_x, m_y, m_d] = getPointBetweenNodes(m, node, 0);
  var [n_x, n_y, n_d] = getPointBetweenNodes(m, node, 100);
  var angle = atan2(m_y - n_y, m_x - n_x); //gets the angle of the line
  let n_offset = Math.abs(n_d / 2);
  let m_offset = Math.abs(m_d / 2);
  let start_rad = angle-Math.PI/6;
  let  end_rad = angle+Math.PI/6;
  
  strokeWeight(thickness/10)
  if (isPos) stroke('green')
  else stroke('red') //
  let locX, locY;
    push()// beginShape(LINES)
    noFill();
    let diffx = Math.abs((m_x - m_offset * Math.cos(angle)) - (n_x + n_offset * Math.cos(angle))) / 2

    if (m_x < n_x) locX = (m_x - m_offset * Math.cos(angle)) + diffx;
      else locX = (n_x + n_offset * Math.cos(angle)) + diffx;
      let diffy = Math.abs((m_y - m_offset * Math.sin(angle)) - (n_y + n_offset * Math.sin(angle))) / 2
      if (m_y < n_y) locY = (m_y - m_offset * Math.sin(angle)) + diffy;
      else locY = (n_y + n_offset * Math.sin(angle)) + diffy;

    if(feedbackOn){

      locY = locY + 50*Math.cos(angle)
      // console.log(locY)
      locX = locX - 50*Math.sin(angle)
      noFill();
      push();
      beginShape();
      curveVertex(m_x - m_offset * Math.cos(start_rad), m_y - m_offset * Math.sin(start_rad));
      curveVertex(m_x - m_offset * Math.cos(start_rad), m_y - m_offset * Math.sin(start_rad));
      curveVertex(locX, locY);
      curveVertex(locX, locY);
      curveVertex(locX, locY);
      curveVertex(n_x + n_offset * Math.cos(end_rad), n_y + n_offset * Math.sin(end_rad));
      curveVertex(n_x + n_offset * Math.cos(end_rad), n_y + n_offset * Math.sin(end_rad));pop()
      
      push() //start new drawing state
      translate(n_x, n_y); //translates to the destination vertex
      rotate(end_rad - HALF_PI); //rotates the arrow point
      triangle(-10, n_offset + 10, 10, n_offset + 10, 0, n_offset);
      pop();
      endShape()
    
    fill('blue')
    circle(locX, locY, unit / 6);
   
    }else{
       beginShape(LINES);
       vertex(m_x - m_offset * Math.cos(angle), m_y - m_offset * Math.sin(angle))
        vertex(n_x + n_offset * Math.cos(angle), n_y + n_offset * Math.sin(angle)) 
        push() //start new drawing state
        translate(n_x, n_y); //translates to the destination vertex
        rotate(angle - HALF_PI); //rotates the arrow point
        triangle(-10, n_offset + 10, 10, n_offset + 10, 0, n_offset);
        pop();
        endShape()
    }
   
    
    if(delayOn){
      fill('blue')
    stroke(0)
    strokeWeight(0)
    
      let delay = models[activeNode].flows_out[0].delay/100;
      rect(locX-unit*delay/2, locY-unit*delay/2, unit *delay, unit *delay)
    }
   // circle(locX, locY, unit / 6);
}

function getPointBetweenNodes(nodeStart, nodeEnd, pcnt){
  let m_x = unit * nodeStart.shape.x + side;
  let m_y = unit * nodeStart.shape.y + pTop;
  let m_d = unit*nodeStart.value;
  if(pcnt===0)return [m_x, m_y, m_d];
  let n_x = unit * nodeEnd.shape.x + side;
  let n_y = unit * nodeEnd.shape.y + pTop;
  let n_d = unit*nodeEnd.value;
  
  if(pcnt===100)return [n_x, n_y, n_d];
}
function connectNode(flow, m) {
  let node = models[flow.flow_to];
  //let nodeShape = node.shape;
  //if (m.id === node.id) loopedNode(m);
  //else
   connectorNode(m, node, Math.abs(flow.value) * 30, flow.value > 0);
}













// let currentModule;
// let isActive = false;
// let loopsPerUpdate = 5;
// let loop = 0;
// let cnv,  pTop;
// let models, side, unit, contentWidth;
// let grid = 6;
// let h =3;
// let mouseDown = false;

// let activeNode = "1";
// let currentTile = "linear";
// let active= "";


    // let tileList=["linear", "inverse", "nonlinear", "indirect"];
    // let tiles = {
    //   "linear": {
    //     "name":"Linear",
    //     "model":{...linearModel},
    //   },
    //   "inverse":{
    //     "name":"Inverse",
    //     "model":{...inverseModel},
    //   },
    //   "nonlinear":{
    //     "name":"Nonlinear",
    //     "model":{...nonlinearModel},
    //   },
    //   "indirect":{
    //     "name":"Indirect",
    //     "model":{...indirectModel},
    //   }
    // };

