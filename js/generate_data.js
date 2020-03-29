class Generate_data {
  constructor() {

  }

  // Generate array of random points
  static randomListNumber(lowerLimit,upperLimit,numberOfNumber) {
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
  static uniformCircle(center,radius,numberOfPoint) {
    let result = [];
    for (let i = 0; i < numberOfPoint; i++) {
      let angle = i*Math.PI*2/numberOfPoint;
      let x = center[0] + radius*Math.cos(angle);
      let y = center[1] + radius*Math.sin(angle);
      result[i] = [x,y];
    }
    return result;
  }

  // generate curve of the following equations:
  // x = A0*cos(t-t0)+t
  // y = A1*cos(t-t1)+t
  // t: variable
  // A0, A1, t0, t1: constants
  // tRange: [beginning value, ending value]
  static HarmonicFunction(A0,A1,t0,t1,tRange,numberOfPoint) {
    let result = [];
    let size = (tRange[1]-tRange[0])/(numberOfPoint-1);
    for (let i = 0; i < numberOfPoint; i++) {
      let t = tRange[0]+i*size;
      let x = A0*Math.cos(t-t0)+t;
      let y = A1*Math.cos(t-t1)+t;
      result[i] = [x,y];
    }
    return result;
  }

  // generate ellipse
  // equation in polar coordinates:
  // r = ab/sqrt(a*a*sin(theta-theta0)*sin(theta-theta0)+b*b*cos(theta-theta0)*cos(theta-theta0))
  static uniformEllipse(a,b,theta0,numberOfPoint) {
    let result = [];
    let size = Math.PI*2/(numberOfPoint-1);
    for (let i = 0; i < numberOfPoint; i++) {
      let theta = i*size;
      let r = a*b/Math.sqrt(a*a*Math.sin(theta-theta0)*Math.sin(theta-theta0)+b*b*Math.cos(theta-theta0)*Math.cos(theta-theta0));
      let x = r*Math.cos(theta);
      let y = r*Math.sin(theta);
      result[i] = [x,y];
    }
    return result;
  }

}
