const logger = {
  log: (...msg: any) => {
    if (process.env.NODE_ENV !== 'production') {
      // tslint:disable-next-line: no-console
      console.log(...msg)
    }
  },
  info: (...msg: any) => {
    // tslint:disable-next-line: no-console
    console.log(...msg)
  },
}

export default logger;