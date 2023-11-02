import L from 'leaflet';

type latLng = { lat: number; lon: number };

export const getLeafletIcon = (url: string) => L.icon({ iconUrl: `leaflet_images/${url}` });

export const getMapsURL = ({ lat, lon }: latLng) =>
  `https://www.google.com/maps?daddr=${lat},${lon}`;

export const geoToID = (obj: latLng) => Object.values(obj).join('').replace(/\./g, '-');
