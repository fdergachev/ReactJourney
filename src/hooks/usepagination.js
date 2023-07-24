import { useMemo } from "react"
export const usePagesArray = (totalPages) => {
   let result = []
   const array = useMemo(() => {

      for (let i = 0; i < totalPages; i++) {
         result.push(i + 1)
      }
      return result;
   }, [totalPages])
   return array;
}