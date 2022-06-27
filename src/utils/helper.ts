export interface Tdata{
 name: string;
 currency: string;
 department: string;
 sub_department: string;
 salary: number;
 on_contract?: boolean
}

class Helper {
  static getSS(data: Tdata[]) {
    const arr = [];
    let sum = 0;
    data.map((d) => {
      sum += d.salary;
      arr.push(d.salary);
    });
    arr.sort((a, b) => a - b);
    return {
      min: arr[0],
      max: arr[arr.length - 1],
      mean: isNaN(sum / arr.length) ? undefined : sum / arr.length,
    };
  }
}

export default Helper;
