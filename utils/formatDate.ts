// 格式化日期

/**
 * @description 模板接口，包含正则匹配以及对应的替换值。
 * @date 2019-08-08
 * @interface Template
 */
 interface Template {
    reg: string;
    value: Number | string;
  }
  
  /**
   * @description 格式化数字，个位数加0
   * @date 2019-09-03
   * @param {Number}
   * @returns {Number}
   */
  function formatNumber(n: Number): string {
    let str: string = n.toString();
    return str.length > 1 ? str : `0${str}`;
  }
  
  /**
   * @description
   * @date 2019-08-08
   * @export
   * @param {Date|number} time 时间，单位为毫秒(ms)
   * @param {string} format 格式模板 如 yyyy.MM.dd.hh.mm.ss
   * @returns {string} example: 2020.08.06
   */
  export function formatDate(inputTime: Date | number, format: string): string {
    let time: Date;
  
    if (typeof inputTime === "number") {
      switch (String(inputTime).length) {
        case 10:
          // 秒级（10位）乘1000
          time = new Date(inputTime * 1000);
          break;
        default:
          // 默认毫秒级
          time = new Date(inputTime);
          break;
      }
    } else {
      time = inputTime;
    }
  
    // 年月日时分秒
    const yyyy = time.getFullYear();
    // 月份
    const M = time.getMonth() + 1;
    const d = time.getDate();
    const h = time.getHours();
    // 分钟
    const m = time.getMinutes();
    const s = time.getSeconds();
  
    // 个位数加0
    const MM = formatNumber(M);
    const dd = formatNumber(d);
    const hh = formatNumber(h);
    const mm = formatNumber(m);
    const ss = formatNumber(s);
  
    // 匹配格式模板，对应的是输入的格式和得到的值。
    let templates: Array<Template> = [
      { reg: "yyyy", value: yyyy },
      { reg: "MM", value: MM },
      { reg: "M", value: M },
      { reg: "dd", value: dd },
      { reg: "d", value: d },
      { reg: "hh", value: hh },
      { reg: "h", value: h },
      { reg: "mm", value: mm },
      { reg: "m", value: m },
      { reg: "ss", value: ss },
      { reg: "s", value: s },
    ];
  
    let result = format;
  
    for (let template of templates) {
      result = result.replace(template.reg, template.value.toString());
    }
    return result;
  }