main();
function main() {
  // generate data
  let dataClass = new Generate_data();
  let listRadius = dataClass.randomListNumber(experiment.lowerRadius,experiment.upperRadius,experiment.row*experiment.col);
  let listCenter = [];
  for (let i = 0; i < experiment.row*experiment.col; i++) {
    let xCenter = dataClass.randomListNumber(listRadius[i],1-listRadius[i],1);
    let yCenter = dataClass.randomListNumber(listRadius[i],1-listRadius[i],1);
    listCenter[i] = [xCenter[0],yCenter[0]];
    experiment.data[i] = dataClass.uniformCircle(listCenter[i],listRadius[i],99);
    experiment.data[i].push(experiment.data[i][0]);
  }

  // score
  let featureClass = new Visual_feature_2D();
  featureClass.Loop();
  for (let i = 0; i < experiment.row*experiment.col; i++) {
    experiment.score[i] = [Math.floor(experiment.loop[i][0][1][0][2]*100)/100];
    if (experiment.score[i][0] > 1) experiment.score[i][0] = 1;
  }

  // draw
  d3.select('body').append('div').attr('id','canvasParent');
  let width = experiment.plotSize[0]*experiment.col+experiment.blankSize[0]*(experiment.col+1);
  let height = experiment.plotSize[1]*experiment.row+experiment.blankSize[1]*(experiment.row+1);
  let drawClass = new Draw_canvas('canvasParent','myCanvas',width,height);
  for (let row = 0; row < experiment.row; row++) {
    for (let col = 0; col < experiment.col; col++) {
      let position = [];
      position[0] = row*(experiment.plotSize[0]+experiment.blankSize[0])+experiment.blankSize[0];
      position[1] = col*(experiment.plotSize[1]+experiment.blankSize[1])+experiment.blankSize[1];
      let strokeColor = [0,0,0];
      drawClass.connectedScatterPlot(position,experiment.plotSize,experiment.data[row*experiment.col+col],strokeColor,row*experiment.col+col);
    }
  }

  // write bin
  for (let i = 0; i < experiment.row*experiment.col; i++) {
    experiment.bin[i] = [];
    for (let row = 0; row < experiment.nBin; row++) {
      experiment.bin[i][row] = [];
      for (let col = 0; col < experiment.nBin; col++) {
        experiment.bin[i][row][col] = [0];
      }
    }
    experiment.data[i].forEach((element,index)=>{
      if (index) {
        let myBin = write_bin(experiment.data[i][index-1][0],experiment.data[i][index-1][1],element[0],element[1]);
        for (let row = 0; row < experiment.nBin; row++) {
          for (let col = 0; col < experiment.nBin; col++) {
            if (myBin[row][col] !== 0) experiment.bin[i][row][col] = [1];
          }
        }
      }
    });
  }

  // prepare data for export
  let X_train = experiment.bin.filter((element,index)=>index < 1750);
  let X_test = experiment.bin.filter((element,index)=>index>=1750);
  let y_train = experiment.score.filter((element,index)=>index<1750);
  let y_test = experiment.score.filter((element,index)=>index>=1750);

  // write file
  let writeClass = new Write_file();
  writeClass.onSaveDescription(X_train,'X_train.json','json');
  writeClass.onSaveDescription(X_test,'X_test.json','json');
  writeClass.onSaveDescription(y_train,'y_train.json','json');
  writeClass.onSaveDescription(y_test,'y_test.json','json');
}

// write bin
function write_bin(x0,y0,x1,y1) {
  let nBin = experiment.nBin;
  let binSize = 1/nBin;
  let result = [];
  for (let row = 0; row < nBin; row++) {
    result[row] = [];
    for (let col = 0; col < nBin; col++) {
      result[row][col] = 0;
    }
  }
  let row0 = Math.floor(x0/binSize);
  let col0 = Math.floor(y0/binSize);
  let row1 = Math.floor(x1/binSize);
  let col1 = Math.floor(y1/binSize);
  result[row0][col0] = 1;
  result[row1][col1] = 1;

  let lowerRow = Math.min(...[row0,row1]);
  let upperRow = Math.max(...[row0,row1]);
  let lowerCol = Math.min(...[col0,col1]);
  let upperCol = Math.max(...[col0,col1]);

  let lineParameters = Geometry.line_equation(x0,y0,x1,y1);
  for (let row = lowerRow; row <= upperRow; row++) {
    for (let col = lowerCol; col <= upperCol; col++) {
      let firstPoint = [row*binSize,col*binSize];
      let secondPoint = [row*binSize+binSize,col*binSize];
      let thirdPoint = [row*binSize+binSize,col*binSize+binSize];
      let fourthPoint = [row*binSize,col*binSize+binSize];
      let firstDiagonal = Geometry.line_equation(firstPoint[0],firstPoint[1],thirdPoint[0],thirdPoint[1]);
      let secondDiagonal = Geometry.line_equation(secondPoint[0],secondPoint[1],fourthPoint[0],fourthPoint[1]);
      let firstIntersection = Geometry.intersection_point(lineParameters[0],lineParameters[1],firstDiagonal[0],firstDiagonal[1]);
      let secondIntersection = Geometry.intersection_point(lineParameters[0],lineParameters[1],secondDiagonal[0],secondDiagonal[1]);
      let check1 = firstIntersection[0] >= row*binSize && firstIntersection[0] <=row*binSize+binSize && firstIntersection[1] >= col*binSize && firstIntersection[1] <= col*binSize+binSize;
      let check2 = secondIntersection[0] >= row*binSize && secondIntersection[0] <= row*binSize+binSize && secondIntersection[1] >= col*binSize && secondIntersection[1] <= col*binSize+binSize;
      let check = check1 || check2;
      if (check) result[row][col] = 1;
      else result[row][col] = 0;
    }
  }
  return result;
}
