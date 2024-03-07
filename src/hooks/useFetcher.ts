import { useEffect, useState } from "react"

const useFetcher = (route: string) => {

    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
  
    useEffect(() => {
      let didCancel = false;
      (async function() {
        try {
          const response = await fetch(route)
          console.log(response, 'response')
          const data = await response.json()
          if (!didCancel) {
            setLoading(false)
            setData(data)
          }
        } catch (e : any) {
          if (!didCancel) {
            setError(e)
            setLoading(false)
          }
        }
      })()
  
      return () => {
        didCancel = true
      }
    }, [route])
  
    return { data, loading, error }
  }
  
  export { useFetcher };