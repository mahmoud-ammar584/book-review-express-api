class Logger {
  static info(message, data = null) {
    if (process.env.NODE_ENV !== 'test') {
      console.log(\[INFO] \ - \\, data || '');
    }
  }

  static error(message, error = null) {
    console.error(\[ERROR] \ - \\, error || '');
  }

  static warn(message, data = null) {
    console.warn(\[WARN] \ - \\, data || '');
  }

  static debug(message, data = null) {
    if (process.env.LOG_LEVEL === 'debug') {
      console.log(\[DEBUG] \ - \\, data || '');
    }
  }
}

module.exports = Logger;
