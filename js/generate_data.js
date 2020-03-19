class Generate_data {
  constructor() {

  }

  // Generate array of random points
  randomListNumber(lowerLimit,upperLimit,numberOfNumber) {
    let result = [];
    for (let i = 0; i < numberOfNumber; i++) {
      let randomNumber = Math.random();
      result[i] = lowerLimit + (upperLimit-lowerLimit)*randomNumber;
    }
    return result;
  }

  // Generate uniform circle
  // center: coordinate of center [x0,y0]
  // return: array of coordinates of points on the circle
  // result = [{x:value,y:value}]
  uniformCircle(center,radius,numberOfPoint) {
    let result = [];
    for (let i = 0; i < numberOfPoint; i++) {
      let angle = i*Math.PI*2/numberOfPoint;
      let x = center[0] + radius*Math.cos(angle);
      let y = center[1] + radius*Math.sin(angle);
      result[i] = [x,y];
    }
    return result;
  }

}
