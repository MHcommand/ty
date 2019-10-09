let search;
let dutch;
let TYOOGLE;

let site;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  site = createElement("iframe");
  site.position(0, 140);
  site.style("width", "100%");
  site.style("height", str(height-140)+"px");
  site.mousePressed(open);
  site.touchStarted(open);
  TYOOGLE=createImg("TYOOGLE.png");
  TYOOGLE.position((windowWidth/2)-150, 0)
  TYOOGLE.style("width", "400");
  TYOOGLE.style("height", "40");
  search=createInput("");
  search.position(0, 80);
  search.style("width", "100%");
  search.style("height", "20px");
  search.style("text-align", "center");
  search.style("border-radius", "0px");
  dutch=createCheckbox("dutch");
  dutch.position(0, 110);
  isSite=createCheckbox("wiki");
  isSite.position(100, 110);
  
}

let pv = ""

function draw() {
  if(pv!=search.value()) {
    pv=search.value();
    go(pv);
  }
  if(isSite.checked()) {
    site.hide();
  }else{
    site.show();
  }
}

function keyReleased() {
  if(key=="Enter") {
    //go(search.value());
  }
}

let pageEN= "https://en.wikipedia.org";
let pageNL= "https://nl.wikipedia.org";
let url = "/w/api.php?action=opensearch&format=json&search=";
let r = [];

let isSite;

function go(v) {
  if(!isSite.checked()) {
    site.attribute("src", v);
    return;
  }
  page=(dutch.checked())?pageNL:pageEN;
  loadJSON(page+url+v, gotData, "jsonp");
}

function gotData(data) {
  for(i=0;i<r.length;i++) {
    r[i].hide();
  }
  r=[];
  for(i=0;i<data[1].length;i++) {
    r[i]=createA(data[3][i], data[1][i]);
    r[i].position(0, (i+7)*20);
  }
}

function open() {
  window.open(v, "self", false);
}