main();
function main() {
  // generate data
  let dataClass = new Generate_data();
  let listRadius = dataClass.randomListNumber(experiment.lowerRadius,experiment.upperRadius,100);
  let listCenter = [];
  for (let i = 0; i < 100; i++) {
    let xCenter = dataClass.randomListNumber(listRadius[i],1-listRadius[i],1);
    let yCenter = dataClass.randomListNumber(listRadius[i],1-listRadius[i],1);
    listCenter[i] = [xCenter[0],yCenter[0]];
    experiment.data[i] = dataClass.uniformCircle(listCenter[i],listRadius[i],99);
    experiment.data[i].push(experiment.data[i][0]);
  }

  // score
  let featureClass = new Visual_feature_2D();
  featureClass.Loop();

  // draw
  d3.select('body').append('div').attr('id','canvasParent');
  let width = experiment.plotSize[0]*10+experiment.blankSize[0]*11;
  let height = experiment.plotSize[1]*10+experiment.blankSize[1]*11;
  let drawClass = new Draw_canvas('canvasParent','myCanvas',width,height);
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      let position = [];
      position[0] = row*(experiment.plotSize[0]+experiment.blankSize[0])+experiment.blankSize[0];
      position[1] = col*(experiment.plotSize[1]+experiment.blankSize[1])+experiment.blankSize[1];
      let strokeColor = [0,0,0];
      let fillColor = [255,255,255];
      drawClass.connectedScatterPlot(position,experiment.plotSize,experiment.data[row*10+col],strokeColor,row*10+col);
    }
  }
}

