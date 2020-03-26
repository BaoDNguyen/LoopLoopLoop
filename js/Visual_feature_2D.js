class Visual_feature_2D {
  constructor () {

  }

  // compute loop
  static Loop (coordinates) {
    let loopScore = [];
    let nTimePoint = coordinates.length;
    for (let t = 0; t < nTimePoint-3; t++) {
      let x1 = coordinates[t][0], y1 = coordinates[t][1];
      let x2 = coordinates[t+1][0], y2 = coordinates[t+1][1];
      if (x1+x2+y1+y2 !== Infinity) {
        for (let tt = t+2; tt < nTimePoint-1; tt++) {
          let x3 = coordinates[tt][0], y3 = coordinates[tt][1];
          let x4 = coordinates[tt+1][0], y4 = coordinates[tt+1][1];
          if (x3+x4+y3+y4 !== Infinity) {
            if ( Geometry.LineSegmentIntersection(x1,y1,x2,y2,x3,y3,x4,y4)) {
              let sites = coordinates.filter((element,index)=>index>=t&&index<=tt);
              let inLoop = Visual_feature_2D.checkSmallLoop(sites);
              let circularRatio = Visual_feature_2D.circularRatio(sites);
              let convexScore = Visual_feature_2D.convexScore(sites);
              if (inLoop === sites.length && sites.length >= experiment.minNumPoint && convexScore >= experiment.minConvexScore) {
                loopScore.push(convexScore*circularRatio);
              }
              t = t+inLoop;
              break;
            }
          }
        }
      }
    }
    let score = (loopScore.length > 0) ? Math.max(...loopScore)*2*loopScore.length : 0;
    if (score>1) score = 1;
    return score;
  }



  // compute convex score
  static convexScore (sites) {
    // count number of angle less than pi/2
    let loopSize = sites.length;
    let convex_score = 0;
    for (let i = 0; i < loopSize - 2; i++) {
      if (Visual_feature_2D.computeCosine(sites[i][0],sites[i][1],sites[i+1][0],sites[i+1][1],sites[i+2][0],sites[i+2][1]) > 0) {
        convex_score += 1;
      }
    }
    return convex_score/loopSize;
  }

  static computeCosine(x1_, y1_, x2_, y2_, x3_, y3_) {
    let v1x = x2_ - x1_;
    let v1y = y2_ - y1_;
    let v2x = x3_ - x2_;
    let v2y = y3_ - y2_;
    let dotProduct = v1x * v2x + v1y * v2y;
    let v1 = Math.sqrt(v1x * v1x + v1y * v1y);
    let v2 = Math.sqrt(v2x * v2x + v2y * v2y);
    let cosine;
    if (v1*v2 !== 0) {
      cosine = dotProduct / (v1 * v2);
    } else
      cosine = 0;
    return cosine;
  }

  // compute ratio of area and the cover squared
  static circularRatio (sites) {
    let xMax = Math.max(...sites.map(element=>element[0]));
    let xMin = Math.min(...sites.map(element=>element[0]));
    let xRange = xMax - xMin;
    let yMax = Math.max(...sites.map(element=>element[1]));
    let yMin = Math.min(...sites.map(element=>element[1]));
    let yRange = yMax - yMin;
    let edge_square = (xRange > yRange) ? xRange : yRange;
    let area = Geometry.Area(sites);
    return (4/Math.PI)*area/Math.pow(edge_square,2);
  }

  // check small loop inside the big loop
  static checkSmallLoop (sites) {
    let n_timePoint = sites.length;
    let result = n_timePoint;
    let count = 0;
    for (let t = 0; t < n_timePoint - 3; t++) {
      for (let tt = t+2; tt < n_timePoint-1; tt++) {
        if (Geometry.LineSegmentIntersection(sites[t][0],sites[t][1],sites[t+1][0],sites[t+1][1],sites[tt][0],sites[tt][1],sites[tt+1][0],sites[tt+1][1])) {
          count += 1;
          if (count >= 1) result = t;
        }
        if (result !== n_timePoint) break;
      }
      if (result !== n_timePoint) break;
    }
    return result;
  }

}
