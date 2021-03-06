class Utils {
  static debounce( func, wait, immediate ) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  static urnify( str ) {
    return str.toLowerCase().replace(/\s/g, '_').replace(/[^a-z0-9:_]/gi,'');
  }
}

export default Utils;