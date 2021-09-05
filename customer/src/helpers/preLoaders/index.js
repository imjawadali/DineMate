export function loadScript (src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = src
        script.addEventListener('load', () => {
          resolve({ successful: true })
        })
        script.addEventListener('error', event => {
          reject({ error: event })
        })
        document.head.appendChild(script)
    })
}