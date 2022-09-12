/* 
The example lets you experiment with k-means clustering. You can add datapoints by clicking and cluster them in one to ten clusters. If you want to know more how this clustering algorithm is working, check out the video by Computerphile (https://www.youtube.com/watch?v=yR7k19YBqiw) on this topic. 

Built with Kmeans Clustering from ml5.js and p5.js 

Created by Tom-Lucas Säger 2021
*/

let data = [];
let calculated = false;
var isDrawing = false;
let kmeans; 
let slider, sliderLabel;

let drawButton;

//We set up our canvas and change the colorMode to HSB which will come in handy later. 
function setup() {

  var myCanvas = createCanvas(600, 400);
  myCanvas.parent(document.getElementById('canvasrow'));
  background(200, 160, 200);
  noFill();
  stroke(100,10,100);
  strokeWeight(6);
  rect(0,0,600,400);

  colorMode(HSB);
  // User instructions are added 
  // let instructions = "Click on the canvas to add data points.\nClick the button Cluster, to cluster them. \nAdjust the number of clusters with the slider."
  // text(instructions, 10, height/2);
  //A button is added to start clustering the data
  let calculateButton = createButton('Cluster');
  calculateButton.parent(document.getElementById('cluster'));
  calculateButton.style('background-color', '#96EE71');

  calculateButton.mouseClicked(cluster)
  //A slider with a label is added to let the user adjust the number of clusters 
  slider = createSlider(1,10,2,1);
  slider.parent(document.getElementById('sliderrow'));
  slider.input(sliderAdjusted);
  sliderLabel = createP('Number of Clusters: ' + slider.value());
  sliderLabel.parent(document.getElementById('sliderrow'));

  let clearButton = createButton('Clear');
  clearButton.parent(document.getElementById('clear'));
  clearButton.mouseClicked(clearPage);

  drawButton = createButton('&#9999; Draw to Guess Clusters');
  drawButton.parent(document.getElementById('draw'));
  drawButton.mouseClicked(drawActivated);

  noStroke();
  ellipseMode(CENTER);
}
//Once the slider is updated we adjust the label.
function sliderAdjusted(){
  sliderLabel.html('Number of Cluster: ' + slider.value())
  

}
//If the mouse is clicked and it is not in bottom of our canvas, 
//the mouse coordinates get added to our data array and drawn to the canvas. 
function mousePressed(){
  if (isDrawing==false){
    if(mouseY < height-5){
    data.push({x: mouseX, y: mouseY});
    fill(255)
    ellipse(mouseX, mouseY, 20,20)
  }
  }
}

function clearPage(){
  location.reload();
}

function drawActivated(){
  isDrawing = true;
}
//On click of the cluster button we create our kmeans object with to data we collected,
// the number of clusters from our slider and two other options.
function cluster(){
  const options = {
    k: slider.value(),
    maxIter: 1200,
    threshold: 0.9,
  };
  kmeans = ml5.kmeans(data, options, clustersCalculated);
}

function clustersCalculated() {
  calculated = true;
}
//Once the results are in we recolor the data-points based on their centroid 
function draw() {

  
  if (mouseIsPressed === true && isDrawing == true) {
    stroke(255,240,0);
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
    drawButton.hide();
  }


  if (calculated) {
  noStroke();

    for (i = 0; i < kmeans.dataset.length; i++) {
      let centroid = kmeans.dataset[i].centroid;
      let datapointx = kmeans.dataset[i][0];
      let datapointy = kmeans.dataset[i][1];
      //We are using the HSB colorMode here
      fill(centroid * 36, 100,100);
      ellipse(datapointx, datapointy, 20, 20);
      //We also add a label to the output, so it could be interpreted without the color
      fill(0);
      textAlign(CENTER, CENTER);
      text(centroid + 1, datapointx, datapointy);
    }
  }
}
