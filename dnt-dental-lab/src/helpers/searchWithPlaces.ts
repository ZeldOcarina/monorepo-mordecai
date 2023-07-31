export default async function searchWithPlaces(
  query: string,
): Promise<unknown> {
  const service = new google.maps.places.PlacesService(
    document.createElement("div"),
  )

  const searchQuery = {
    query,
  }

  const searchPromise = new Promise((resolve, reject) => {
    service.textSearch(searchQuery, (results, status) => {
      console.log(results, status)
      if (status === google.maps.places.PlacesServiceStatus.OK) resolve(results)
      else reject(status)
    })
  })

  return searchPromise
}
