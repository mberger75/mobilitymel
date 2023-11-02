import { Marker, Popup } from 'react-leaflet';

import { getLeafletIcon, getMapsURL, geoToID } from '@/utils';
import { useChargingPoint } from '@/hooks';

import './Markers.scss';

export function ChargingPointMarkers() {
  const { isLoading, error, data } = useChargingPoint();

  if (isLoading) return 'Loading Vlille...';

  if (error || data === undefined) {
    return 'An error has occurred: ' + error?.message;
  }

  if (data === undefined || data.length <= 0) {
    return 'No Vlille found.';
  }

  const reservationURL = 'https://izivia.com/carte-recharge-izivia-borne-electrique';

  return (
    <>
      {data.map((point, index) => {
        const { coordonnees_geo, ad_station, commune, type_prise, puiss_max, acces_recharge } =
          point;

        const mapsURL = getMapsURL({ lat: coordonnees_geo.lat, lon: coordonnees_geo.lon });

        const pointID = geoToID(coordonnees_geo);

        return (
          <Marker
            title={`point-${pointID}`}
            key={pointID + index}
            position={[coordonnees_geo.lat, coordonnees_geo.lon]}
            icon={getLeafletIcon('marker-charging-point.png')}
            riseOnHover={true}
          >
            <Popup>
              <div className='vlille'>
                <header>
                  <p>
                    {ad_station}, {commune}
                  </p>
                </header>
                <main>
                  <p>Accès : {acces_recharge}</p>
                  <p>Puissance max : {puiss_max}</p>
                  <p>Type de prises : {type_prise}</p>
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
