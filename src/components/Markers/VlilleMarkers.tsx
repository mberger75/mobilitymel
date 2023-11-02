import { Marker, Popup } from 'react-leaflet';

import { getLeafletIcon, getMapsURL, geoToID } from '@/utils';
import { useVlille } from '@/hooks';

import './Markers.scss';

export function VlilleMarkers() {
  const { isLoading, error, data } = useVlille();

  if (isLoading) return 'Loading Vlille...';

  if (error || data === undefined) {
    return 'An error has occurred: ' + error?.message;
  }

  if (data === undefined || data.length <= 0) {
    return 'No Vlille found.';
  }

  const reservationURL = 'https://e-boutique.ilevia.fr/fr/108-v-lille-et-abris-velos';

  return (
    <>
      {data.map((station) => {
        const { etat, geo, adresse, commune, nbplacesdispo, nbvelosdispo } = station;

        const stationId = geoToID(geo);

        const mapsURL = getMapsURL({ lat: geo.lat, lon: geo.lon });

        return (
          <Marker
            title={`station-vlille-${stationId}`}
            key={stationId}
            position={[geo.lat, geo.lon]}
            icon={getLeafletIcon('marker-vlille.png')}
            riseOnHover={true}
          >
            <Popup>
              <div className='vlille'>
                <header>
                  <p>
                    {adresse}, {commune}
                  </p>
                </header>
                <main>
                  <p>Vélos disponibles : {nbvelosdispo}</p>
                  <p>Places disponibles : {nbplacesdispo}</p>
                  <p>État : {etat}</p>
                </main>
                <footer>
                  <a href={reservationURL} target='_blank'>
                    Réserver
                  </a>
                  <a href={mapsURL} target='_blank'>
                    Me rendre à cette station
                  </a>
                </footer>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
