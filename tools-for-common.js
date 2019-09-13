// 获取浏览器语言
const getLanguage = () => {
    return (navigator.browserLanguage || navigator.language).toLowerCase();
};

/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
const debounce = (func, wait, immediate = true) => {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) {
            clearTimeout(timeout);
        }
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait);
            if (callNow) {
                func.apply(context, args);
            }
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        }
    };
};

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
export const throttle = (func, wait, type) => {
    if (type === 1) {
        var previous = 0;
    } else if (type === 2) {
        var timeout;
    }
    return function () {
        let context = this;
        let args = arguments;
        if (type === 1) {
            let now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        } else if (type === 2) {
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args);
                }, wait);
            }
        }
    };
};

// 判断数据类型
export const dataType = data => {
    return Object.prototype.toString.call(data).slice(8, -1);
};

// 封装localStorge
export const myLocalStorage = {

    /**
     * @desc 设置缓存 + 过期时间
     * @param {String} item
     * @param {any} value
     * @param {Number} expire
     */
    set(item, value, expire) {
        value = dataType(value) === 'Object' ? JSON.stringify(value) : value;
        if (expire) {
            value += '?expire=' + (this.getTime() + expire);
        }
        window.localStorage.setItem(item, value);
    },
    get(item) {
        let data = window.localStorage.getItem(item) || '';
        let expireIndex = data.indexOf('?expire=');
        let expireTime = data.substring(expireIndex);
        let value = data.substring(0, expireIndex > 0 ? expireIndex : data.length);

        if (expireTime) {
            expireTime = expireTime.substring(8);
            if (expireTime < this.getTime()) {
                // 过期...
                this.clear(item);
                return '';
            } else {
                // 未过期...
                return this.getValue(value);
            }
        }
    },
    clear(item) {
        window.localStorage.removeItem(item);
    },
    // 获取当前时间
    getTime() {
        return new Date().getTime();
    },
    // 获取数据
    getValue(value) {
        // 这里不够严谨, 判断json为数组和对象
        if (value.includes('{') || value.includes('[')) {
            return JSON.parse(value);
        } else {
            return value;
        }
    },
};

/**
 * 设置 cookie 过期时间
 * @param {*} name
 * @param {*} value
 * @param {*} time
 */
export const setCookie = (name, value, time) => {
    let currentTime = new Date().getTime();
    let expireTime = new Date(currentTime + time);
    document.cookie = name + '=' + value + ';expires=' + expireTime.toGMTString();
};

export const getCookie = name => {
    let strCookie = document.cookie;
    let arrCookie = strCookie.split(';');
    // 遍历匹配
    for (let i = 0; i < arrCookie.length; i++) {
        let temp = arrCookie[i].split('=');
        if (temp[0] === name) {
            return temp[1];
        }
    }
    return '';
};

// 查找索引
export function findIndex(ary, fn) {
    if (ary.findIndex) {
        return ary.findIndex(fn);
    }
    let index = -1;
    ary.some(function (item, i, ary) {
        const ret = fn.call(this, item, i, ary);
        if (ret) {
            index = i;
            return ret;
        }
    });
    return index;
}

/**
 * 验证图片格式
 */
export const validateImg = val => {
    return /\.(jpg|jpeg|png|JPG|PNG)$/.test(val);
};

// 验证邮箱
export const validateEmail = val => {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(val);
};

/**
 * 去重
 * @param {数组} arr
 */
export const uniqueMap = arr => {
    const temp = new Map();
    return arr.filter(a => !temp.has(a) && temp.set(a, 1));
};
export const uniqueSet = arr => {
    return [...new Set(arr)];
};

/**
 * 操作历史记录
 * @param {数组} arr
 * @param {值} val
 */
export const handleHistoryList = (arr, val) => {
    // 添加到历史记录里
    arr.unshift(val);
    arr = [...new Set(arr)];
    arr = arr.filter(item => !!item);
    arr = arr.slice(0, 6);
    return arr;
};

/**
 * 小数位补全
 * @param {*} x
 */
export function toDecimal1(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    f = Math.round(x * 10) / 10;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 1) {
        s += '0';
    }
    return s;
}

//  格式化文件大小
export function renderSize(value) {
    if (null == value || value == '') {
        return '0 Bytes';
    }
    var unitArr = new Array('Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB');
    var index = 0,
        srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    //  保留的小数位数
    size = size.toFixed(2);
    return size + unitArr[index];
}

// 过滤html标签
export function filterHtmlTag(v) {
    return v.replace(/<[^>]+>/g,"");
}
