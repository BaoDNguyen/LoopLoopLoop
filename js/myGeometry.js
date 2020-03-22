class Geometry {
  constructor () {

  }

  // get the line parameters
  static line_equation(x0,y0,x1,y1) {
    let result = [];
    if (x0 !== x1) {
      result[0] = (y1-y0)/(x1-x0);
      result[1] = (y0*x1-y1*x0)/(x1-x0);
    } else {
      result = [undefined,undefined];
    }
    return result;
  }

  // get intersection coordinates
  static intersection_point(a0,b0,a1,b1) {
    let result = [];
    if (a0 !== a1) {
      result[0] = -(b0-b1)/(a0-a1);
      result[1] = (a0*b1-a1*b0)/(a0-a1);
    } else {
      result = [undefined,undefined];
    }
    return result;
  }

}
