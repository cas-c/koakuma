const errorHandler = (error: Error) => {
  return console.error(`[${Date.now()}]`, error)
}

export default errorHandler
