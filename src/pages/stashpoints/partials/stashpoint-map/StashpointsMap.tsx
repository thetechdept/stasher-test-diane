import { FC } from 'react'

import { GoogleMap, Marker } from '@react-google-maps/api'
import { useSearchParams } from 'react-router-dom'

const containerStyle = {
  width: 'calc(100vw - 460px)',
  height: 'calc(100vh - 64px)',
}

type StashpointsMapProps = {
  stashpoints: Record<string, any>
}

const StashpointsMap: FC<StashpointsMapProps> = ({ stashpoints }) => {
  const searchParams = useSearchParams()
  const params = Object.fromEntries(
    new URLSearchParams(searchParams.toString())
  )
  const { lat, lng } = params

  const center = { lat: Number(lat), lng: Number(lng) }

  return (
    <div>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {stashpoints.map(
          (point: { latitude: any; longitude: any; id: string }) => (
            <Marker
              key={point.id}
              position={{ lat: point.latitude, lng: point.longitude }}
            />
          )
        )}
      </GoogleMap>
    </div>
  )
}

export default StashpointsMap
