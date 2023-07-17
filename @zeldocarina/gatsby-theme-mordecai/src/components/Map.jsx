import React, { useEffect, useRef } from "react"
import styled, { css } from "styled-components"
import { Loader } from "@googlemaps/js-api-loader"
import respond from "../styles/abstracts/mediaqueries"

const StyledMap = styled.div`
  height: 50vh;

  ${respond(
    1366,
    css`
      height: 60vh;
    `
  )}
  ${respond(
    834,
    css`
      height: 40vh;
    `
  )}
  ${respond(
    768,
    css`
      height: 50vh;
    `
  )}
  @media only screen and (max-height: 428px) {
    height: 60rem;
  }

  // border-radius: 20px;
`

const Map = ({ mapName, lat, long, zoom, markers, pin }) => {
  const mapRef = useRef(null)

  useEffect(() => {
    async function loadMap() {
      const loader = new Loader({
        apiKey: process.env.GATSBY_GOOGLE_MAPS_API_KEY,
        libraries: ["places"],
      })

      const google = await loader.load()
      const latLng = new google.maps.LatLng(parseFloat(lat), parseFloat(long))
      const map = new google.maps.Map(mapRef.current, {
        center: latLng,
        zoom: zoom,
      })

      markers.forEach(marker => {
        const icon = {
          url: pin, // url
          scaledSize: new google.maps.Size(50, 50), // scaled size
        }

        const mapPin = new google.maps.Marker({
          position: new google.maps.LatLng(
            parseFloat(marker.data.Latitude),
            parseFloat(marker.data.Longitude)
          ),
          map,
          title: marker.data.Heading || "Map Pin",
          icon,
        })

        if (!marker.data.Heading) return

        const infowindow = new google.maps.InfoWindow({
          content: marker.data.Heading,
        })

        const openWindowFunction = () => {
          infowindow.open({
            anchor: mapPin,
            map,
            shouldFocus: false,
          })
        }

        mapPin.addListener("click", openWindowFunction)
        mapPin.addListener("mouseover", openWindowFunction)
      })
    }

    loadMap()
  }, [lat, long, markers, zoom, pin])

  return <StyledMap ref={mapRef} id={mapName}></StyledMap>
}

export default Map
