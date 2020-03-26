// Promise.all([
//   d3.csv("data/house_financial.txt"),
//   d3.tsv("data/state_code.txt"),
//   d3.tsv("data/house_financial_code.txt"),
// ]).then(function (file) {
//   experiment.timeInfo = file[0].columns.filter((element,index)=>index!==0);
//   experiment.instanceInfo = file[1].map(element=>element.name);
//   experiment.variableInfo = file[2].map(element=>element.name);
//   let n_timeSeries = file[0].length;
//   let n_timePoint = file[0].columns.length-1;
//   let n_instances = file[1].length;
//   let n_variable = file[2].length;
//   let mapSeries = [];
//   for (let i = 0; i < n_timeSeries; i++) {
//     // let sampleCode = file[0][i]['CountryCode'];
//     // let variableCode = file[0][i]['Type'];
//     let sampleIndex = file[0][i]['Series ID'].split('_')[0];
//     let variableIndex = file[0][i]['Series ID'].split('_')[1];
//     let sampleCode = file[1][sampleIndex].code;
//     let variableCode = file[2][variableIndex].code;
//     if (file[2].findIndex(element=>element.code===variableCode)!==-1) mapSeries.push([sampleCode,variableCode,i]);
//   }
//   for (let i = 0; i < n_instances; i++) {
//     experiment.realData[file[1][i].name] = {};
//     let sampleCode = file[1][i].code;
//     let sampleName = file[1][i].name;
//     let isInList_s = experiment.chosenPlot.findIndex(element=>element[0]===sampleName);
//     if (isInList_s !== -1) {
//       for (let j = 0; j < n_variable; j++) {
//         let variableCode = file[2][j].code;
//         let variableName = file[2][j].name;
//         let isInList_v = experiment.chosenPlot.findIndex(element=>element[1]===variableName || element[1]===variableName);
//         if (isInList_v) {
//           let rowMatrix = mapSeries.find(element=>element[0]===sampleCode&&element[1]===variableCode);
//           if (rowMatrix) {
//             let row = rowMatrix[2];
//             let timeSeries = [];
//             for (let t = 0; t < n_timePoint; t++) {
//               timeSeries[t] = isNaN(parseFloat(file[0][row][experiment.timeInfo[t]])) ? Infinity : parseFloat(file[0][row][experiment.timeInfo[t]]);
//             }
//             let maxValue = Math.max(...timeSeries.filter(element=>element!==Infinity));
//             let minValue = Math.min(...timeSeries.filter(element=>element!==Infinity));
//             let rangeValue = maxValue - minValue;
//             experiment.realData[file[1][i].name][file[2][j].name] = timeSeries.map(element=>{
//               if (maxValue !== Infinity && minValue !== Infinity) return (element-minValue)/rangeValue;
//               else return Infinity;
//             });
//           }
//         }
//       }
//     }
//   }
//
//   randomData();
//   let myData = [];
//   for (let sample in experiment.realData) {
//     let sampleCode = file[1].findIndex(element=>element.name === sample);
//     myData[sampleCode] = [];
//     let count  = 0;
//     for (let variable in experiment.realData[sample]) {
//       myData[sampleCode][count] = experiment.realData[sample][variable].map(element=>element);
//       count += 1;
//     }
//   }
//   for (let i = 0; i < myData.length; i++) {
//     for (let j = 0; j < myData[i].length-1; j++) {
//       for (let k = j+1; k < myData[i].length; k++) {
//         let arr = myData[i][j].map((element,index)=>[element,myData[i][k][index]]);
//         experiment.data.push(arr);
//       }
//     }
//   }
//
//   Bao();
//
//
// });
//
// function randomData() {
//   // generate data
//   let dataClass = new Generate_data();
//   let listRadius = dataClass.randomListNumber(experiment.lowerRadius, experiment.upperRadius, experiment.row * experiment.col);
//   let listCenter = [];
//   for (let i = 0; i < experiment.row * experiment.col; i++) {
//     let xCenter = dataClass.randomListNumber(listRadius[i], 1 - listRadius[i], 1);
//     let yCenter = dataClass.randomListNumber(listRadius[i], 1 - listRadius[i], 1);
//     listCenter[i] = [xCenter[0], yCenter[0]];
//     experiment.data[i] = dataClass.uniformCircle(listCenter[i], listRadius[i], 99);
//     experiment.data[i].push(experiment.data[i][0]);
//   }
// }
//
//   // draw
//   // d3.select('body').append('div').attr('id','canvasParent');
//   // let width = experiment.plotSize[0]*experiment.col+experiment.blankSize[0]*(experiment.col+1);
//   // let height = experiment.plotSize[1]*experiment.row+experiment.blankSize[1]*(experiment.row+1);
//   // let drawClass = new Draw_canvas('canvasParent','myCanvas',width,height);
//   // for (let row = 0; row < experiment.row; row++) {
//   //   for (let col = 0; col < experiment.col; col++) {
//   //     let position = [];
//   //     position[0] = row*(experiment.plotSize[0]+experiment.blankSize[0])+experiment.blankSize[0];
//   //     position[1] = col*(experiment.plotSize[1]+experiment.blankSize[1])+experiment.blankSize[1];
//   //     let strokeColor = [0,0,0];
//   //     drawClass.connectedScatterPlot(position,experiment.plotSize,experiment.data[row*experiment.col+col],strokeColor,row*experiment.col+col);
//   //   }
//   // }
//
// function Bao() {
//   let featureClass = new Visual_feature_2D(experiment.data);
//   featureClass.Loop();
//   for (let i = 0; i < experiment.data.length; i++) {
//     experiment.score[i] = (experiment.loop[i][0][1].length > 0) ? [Math.floor(experiment.loop[i][0][1][0][2]*100)/100] : [0];
//     if (experiment.score[i][0] > 1) experiment.score[i][0] = 1;
//   }
//
//   // write bin
//   for (let i = 0; i < experiment.data.length; i++) {
//     experiment.bin[i] = [];
//     for (let row = 0; row < experiment.nBin; row++) {
//       experiment.bin[i][row] = [];
//       for (let col = 0; col < experiment.nBin; col++) {
//         experiment.bin[i][row][col] = [0];
//       }
//     }
//     experiment.data[i].forEach((element,index)=>{
//       if (index && element[0] !== Infinity && element[1] !== Infinity && experiment.data[i][index-1][0] !== Infinity && experiment.data[i][index-1][1] !== Infinity) {
//         let myBin = write_bin(experiment.data[i][index-1][0],experiment.data[i][index-1][1],element[0],element[1]);
//         for (let row = 0; row < experiment.nBin; row++) {
//           for (let col = 0; col < experiment.nBin; col++) {
//             if (myBin[row][col] !== 0) experiment.bin[i][row][col] = [1];
//           }
//         }
//       }
//     });
//   }
//
//   // prepare data for export
//   let X_train = experiment.bin.filter((element,index)=>index < experiment.data.length*0.7);
//   let X_test = experiment.bin.filter((element,index)=>index>=experiment.data.length*0.7);
//   let y_train = experiment.score.filter((element,index)=>index<experiment.data.length*0.7);
//   let y_test = experiment.score.filter((element,index)=>index>=experiment.data.length*0.7);
//
//   // write file
//   // let writeClass = new Write_file();
//   // writeClass.onSaveDescription(X_train,'X_train.json','json');
//   // writeClass.onSaveDescription(X_test,'X_test.json','json');
//   // writeClass.onSaveDescription(y_train,'y_train.json','json');
//   // writeClass.onSaveDescription(y_test,'y_test.json','json');
// }
//
//
// // write bin
// function write_bin(x0,y0,x1,y1) {
//   let nBin = experiment.nBin;
//   let binSize = 1/nBin;
//   let result = [];
//   for (let row = 0; row < nBin; row++) {
//     result[row] = [];
//     for (let col = 0; col < nBin; col++) {
//       result[row][col] = 0;
//     }
//   }
//   let row0 = Math.floor(x0/binSize);
//   let col0 = Math.floor(y0/binSize);
//   let row1 = Math.floor(x1/binSize);
//   let col1 = Math.floor(y1/binSize);
//   row0 = (row0 === 40) ? 39 : row0;
//   col0 = (col0 === 40) ? 39 : col0;
//   row1 = (row1 === 40) ? 39 : row1;
//   col1 = (col1 === 40) ? 39 : col1;
//   result[row0][col0] = 1;
//   result[row1][col1] = 1;
//
//   let lowerRow = Math.min(...[row0,row1]);
//   let upperRow = Math.max(...[row0,row1]);
//   let lowerCol = Math.min(...[col0,col1]);
//   let upperCol = Math.max(...[col0,col1]);
//
//   let lineParameters = Geometry.line_equation(x0,y0,x1,y1);
//   for (let row = lowerRow; row <= upperRow; row++) {
//     for (let col = lowerCol; col <= upperCol; col++) {
//       let firstPoint = [row*binSize,col*binSize];
//       let secondPoint = [row*binSize+binSize,col*binSize];
//       let thirdPoint = [row*binSize+binSize,col*binSize+binSize];
//       let fourthPoint = [row*binSize,col*binSize+binSize];
//       let firstDiagonal = Geometry.line_equation(firstPoint[0],firstPoint[1],thirdPoint[0],thirdPoint[1]);
//       let secondDiagonal = Geometry.line_equation(secondPoint[0],secondPoint[1],fourthPoint[0],fourthPoint[1]);
//       let firstIntersection = Geometry.intersection_point(lineParameters[0],lineParameters[1],firstDiagonal[0],firstDiagonal[1]);
//       let secondIntersection = Geometry.intersection_point(lineParameters[0],lineParameters[1],secondDiagonal[0],secondDiagonal[1]);
//       let check1 = firstIntersection[0] >= row*binSize && firstIntersection[0] <=row*binSize+binSize && firstIntersection[1] >= col*binSize && firstIntersection[1] <= col*binSize+binSize;
//       let check2 = secondIntersection[0] >= row*binSize && secondIntersection[0] <= row*binSize+binSize && secondIntersection[1] >= col*binSize && secondIntersection[1] <= col*binSize+binSize;
//       let check = check1 || check2;
//       if (check) result[row][col] = 1;
//       else result[row][col] = 0;
//     }
//   }
//   return result;
// }

main();

function main() {
  Promise.all([
    d3.csv('data/us_employment_reduced.txt'),
    d3.csv('data/life_expectancy_reduced.txt'),
    d3.csv('data/house_financial_reduced.txt'),
    d3.csv('data/birth_death_rate_reduced.txt'),
  ]).then(function (files) {
    for (let f = 0; f < files.length; f++) {
      experiment.loopScore[f] = [];
      let myArray = [];
      let myData = [];
      let mapInstance = new Map();
      let mapVariable = new Map();
      let data = {};
      data = Data_processing.read(files[f]);
      Data_processing.normalization(data);
      let instanceIndex = -1;
      for (let instance in data) {
        instanceIndex += 1;
        mapInstance.set(instanceIndex,instance);
        myArray[instanceIndex] = [];
        let variableIndex = -1;
        for (let variable in data[instance]) {
          variableIndex += 1;
          mapVariable.set(variableIndex,variable);
          myArray[instanceIndex][variableIndex] = data[instance][variable].map(element=>element);
        }
      }
      myArray.forEach((element,index)=>{
        myData[index] = [];
        experiment.loopScore[f][index] = [];
        let nVar = element.length;
        for (let i = 0; i < nVar - 1; i++) {
          for (let j = i + 1; j < nVar; j++) {
            let coordinates = element[i].map((element_,index_)=>[element_,element[j][index_]]);
            myData[index].push(coordinates);
            experiment.loopScore[f][index].push(Visual_feature_2D.Loop(coordinates));
          }
        }
      });
      experiment.loopScore[f].forEach((element,index)=>{
        element.forEach((element_,index_)=>{
          if (element_ > 0) experiment.chosenData.push([f,index,index_]);
        });
      });
    }
  });
}
