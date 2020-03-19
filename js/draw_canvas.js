class Draw_canvas {
  constructor(parentID,canvasId,width,height) {
    this.parent = parentID;
    this.id = canvasId;
    this.width = width;
    this.height = height;

    d3.select('#'+this.parent)
      .append('canvas')
      .attr('id',this.id)
      .attr('width',this.width)
      .attr('height',this.height);
    this.canvas = document.getElementById(this.id);
    this.ctx = this.canvas.getContext('2d');
  }

  // draw connected scatter plots
  // position and size are array of [x,y]
  // data is array of coordinates [[x,y]] in temporal order
  connectedScatterPlot(position,size,data,strokeColor,id) {
    // draw rectangle
    this.ctx.strokeStyle = `rgb(${strokeColor[0]},${strokeColor[1]},${strokeColor[2]})`;
    this.ctx.strokeRect(position[0],position[1],size[0],size[1]);
    this.ctx.stroke();
    // draw text
    this.ctx.font = '12px Arial';
    this.ctx.fillText('Circular score = '+Math.floor(experiment.loop[id][0][1][0][2]*100)/100,position[0],position[1]);
    // draw data points and lines
    let nTimeStep = data.length;
    for (let step = 0; step < nTimeStep; step++) {
      let x = position[0] + data[step][0]*size[0];
      let y = position[1] + data[step][1]*size[1];
      this.ctx.beginPath();
      this.ctx.fillStyle = 'rgb(0,0,0)';
      this.ctx.arc(x,y,2,0,2*Math.PI);
      this.ctx.fill();
      if (step) {
        let x0 = position[0] + data[step-1][0]*size[0];
        let y0 = position[1] + data[step-1][1]*size[1];
        this.ctx.beginPath();
        this.ctx.strokeStyle = 'rgb(0,0,0)';
        this.ctx.lineWidth = 1;
        this.ctx.moveTo(x0,y0);
        this.ctx.lineTo(x,y);
        this.ctx.stroke();
      }
    }
  }


}
