import * as https from 'https'

export function get(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      const { statusCode } = res
      const contentType = res.headers['content-type']

      let error
      // Any 2xx status code signals a successful response but
      // here we're only checking for 200.
      if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
                    `Status Code: ${statusCode}`)
      } else if (contentType && !/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`)
      }
      if (error) {
        console.error(error.message)
        // Consume response data to free up memory
        res.resume()
        return
      }

      res.setEncoding('utf8')
      let rawData = ''
      res.on('data',
        chunk => {
          return rawData += chunk
        }
      )
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
        } catch (e) {
          reject(e.message)
        }
      })
    }).on('error', e => {
      reject(`Got error: ${e.message}`)
    })
  })
}
