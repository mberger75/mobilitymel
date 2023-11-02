import { Marker, Popup } from 'react-leaflet';

import { useCitizStations, useCitizVehicles } from '@/hooks';
import { getLeafletIcon, getMapsURL } from '@/utils';

import './Markers.scss';

interface CitizDetailsProps {
  stationId: number;
}

const CitizDetails = ({ stationId }: CitizDetailsProps) => {
  const { isLoading, error, data } = useCitizVehicles(stationId);

  if (isLoading) return 'Loading Citiz station vehicles...';

  if (error || data === undefined) {
    return 'An error has occurred: ' + error?.message;
  }

  if (data.length <= 0)
    return <p style={{ textAlign: 'center' }}>Aucun véhicule n'a été trouvé.</p>;

  return (
    <div className='vehicle-list'>
      {data?.map(({ licencePlate, name, category, fuelLevel }) => (
        <div key={licencePlate} className='vehicle'>
          <p>{name}</p>
          <p>Taille: {category}</p>
          <p>{licencePlate}</p>
          <p>Batterie: {fuelLevel}</p>
        </div>
      ))}
    </div>
  );
};

export function CitizMarkers() {
  const { isLoading, error, data } = useCitizStations();

  if (isLoading) return 'Loading Citiz stations...';

  if (error || data === undefined) {
    return 'An error has occurred: ' + error?.message;
  }

  const reservationURL = 'https://portail.citiz.fr/webapp/login';

  return (
    <>
      {data?.map((station) => {
        const { gpsLatitude, gpsLongitude, name, externalRemark, stationId } = station;

        const mapsURL = getMapsURL({ lat: gpsLatitude, lon: gpsLongitude });

        return (
          <Marker
            title={`station-citiz-${stationId}`}
            key={stationId}
            position={[gpsLatitude, gpsLongitude]}
            icon={getLeafletIcon('marker-citiz.png')}
            riseOnHover={true}
          >
            <Popup>
              <div className='citiz'>
                <header>
                  <p>
                    {name} - {stationId}
                  </p>
                  <p>
                    {externalRemark.length <= 0
                      ? 'Aucune données pour cette station'
                      : externalRemark}
                  </p>
                </header>
                <main>
                  <CitizDetails stationId={stationId} />
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
