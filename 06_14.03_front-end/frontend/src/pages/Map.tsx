//rcfe
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
function Map() {
  return (
    <div>
        <MapContainer className='map' center={[59.436, 24.754]} zoom={12} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[59.436, 24.754]}>
            <Popup>
                Viru keskus <br /> Avatud 9.00-22.00
            </Popup>
        </Marker>
        <Marker position={[59.427, 24.723]}>
            <Popup>
                Kristiine keskus <br /> Avatud 8.00-23.00
            </Popup>
        </Marker>
        <Marker position={[59.440, 24.762]}>
            <Popup>
                Nautica keskus <br /> Avatud 10.00-20.00
            </Popup>
        </Marker>
        </MapContainer>
    </div>
  )
}

export default Map
