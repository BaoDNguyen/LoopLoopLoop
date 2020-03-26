class Geometry {
  constructor () {

  }

  // get the line parameters
  static LineEquation(x0,y0,x1,y1) {
    let result = [];
    if (x0 !== x1) {
      result[0] = (y1-y0)/(x1-x0);
      result[1] = (y0*x1-y1*x0)/(x1-x0);
    } else {
      result = [undefined,undefined];
    }
    return result;
  }

  // get intersection coordinates between two line
  static LineIntersectionPoint(a0,b0,a1,b1) {
    let result = [];
    if (a0 !== a1) {
      result[0] = -(b0-b1)/(a0-a1);
      result[1] = (a0*b1-a1*b0)/(a0-a1);
    } else {
      result = [undefined,undefined];
    }
    return result;
  }

  // check two line segments intersection
  static LineSegmentIntersection(x1_, y1_, x2_, y2_, x3_, y3_, x4_, y4_) {
    let v1x = x2_ - x1_;
    let v1y = y2_ - y1_;
    let v2x = x4_ - x3_;
    let v2y = y4_ - y3_;
    let v23x = x3_ - x2_;
    let v23y = y3_ - y2_;
    let v24x = x4_ - x2_;
    let v24y = y4_ - y2_;
    let v41x = x1_ - x4_;
    let v41y = y1_ - y4_;
    let checkV1 = (v1x * v23y - v1y * v23x) * (v1x * v24y - v1y * v24x);
    let checkV2 = (v2x * v41y - v2y * v41x) * (v2y * v24x - v2x * v24y);
    return (checkV1 <= 0) && (checkV2 <= 0);
  }

  // compute area of a closed shape
  static Area (sites) {
    let N = sites.length;
    let area = 0;
    for (let i = 0; i < N; i++) {
      if (i < N-1) {
        area += sites[i][0]*sites[i+1][1]-sites[i+1][0]*sites[i][1];
      } else {
        area += sites[i][0]*sites[0][1]-sites[0][0]*sites[i][1];
      }
    }
    return Math.abs(area);
  }

}
