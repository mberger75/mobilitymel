import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import { CitizMarkers, VlilleMarkers, ChargingPointMarkers } from '@/components/Markers';

import { FilterChoices } from '@/types';

import { tileLayerURL } from './config';

import 'leaflet/dist/leaflet.css';
import './Map.scss';

L.Icon.Default.imagePath = 'leaflet_images/';

export function Map({ filters }: { filters: FilterChoices }) {
  return (
    <MapContainer
      center={[50.633333, 3.066667]}
      zoom={12}
      scrollWheelZoom={true}
      minZoom={10}
      maxZoom={18}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url={tileLayerURL.light}
      />
      {filters.citiz && <CitizMarkers />}
      {filters.vlille && <VlilleMarkers />}
      {filters.point && <ChargingPointMarkers />}
    </MapContainer>
  );
}
