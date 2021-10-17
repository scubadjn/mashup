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
  // TODO add presisted storage and log internal server errors that should be fixed
  error: (...msg: any) => {
    // tslint:disable-next-line: no-console
    console.log(...msg)
  },
}

export default logger;