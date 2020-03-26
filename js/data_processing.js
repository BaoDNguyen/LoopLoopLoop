class Data_processing {
  Variable;

  constructor() {

  }

  // input file = {name:value,type:value}
  // data format: instance, variable, time1, time2, ...
  // or: instance \t variable \t time1 \time2 \t ...
  static read(data) {
      let result = {};
      let timeInfo = data.columns.filter(element => element !== 'Instance' && element !== 'Variable');
      data.forEach(row => {
        let instance = row.Instance;
        let variable = row.Variable;
        if (!result[instance]) result[instance] = {};
        result[instance][variable] = [];
        timeInfo.forEach((time, step) => {
          result[instance][variable][step] = isNaN(parseFloat(row[time])) ? Infinity : parseFloat(row[time]);
        });
      });
      return result;
  }

  static normalization(data) {
    for (let instance in data) {
      for (let variable in data[instance]) {
        let maxValue = Math.max(...data[instance][variable].filter(element=>element!==Infinity));
        let minValue = Math.min(...data[instance][variable].filter((element=>element!==Infinity)));
        data[instance][variable].forEach((element,index)=>{
          data[instance][variable][index] = (maxValue!==minValue) ? (element-minValue)/(maxValue-minValue) : Infinity;
        });
      }
    }
    return data;
  }


}
