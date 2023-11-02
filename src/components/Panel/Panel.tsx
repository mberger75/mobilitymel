import { useChargingPoint, useCitizStations, useVlille } from '@/hooks';
import { FilterChoices } from '@/types';
import { geoToID } from '@/utils';

import './Panel.scss';

const openBindMarker = (title: string) => {
  const targetMarker = document.querySelector(`.leaflet-marker-icon[title="${title}"]`);

  (targetMarker as HTMLImageElement)?.click();
};

const CitizFeed = () => {
  const { isLoading, error, data } = useCitizStations();

  if (isLoading) return 'Loading Citiz stations...';

  if (error || data === undefined) {
    return 'An error has occurred: ' + error?.message;
  }

  return (
    <>
      {data?.map((station) => (
        <div
          key={station.stationId}
          id={station.stationId.toString()}
          className={`item`}
          onClick={(e) => openBindMarker(`station-citiz-${e.currentTarget.id}`)}
        >
          <h1>🚗 Voiture - Citiz</h1>
          <h2>
            {station.name} - {station.stationId}
          </h2>
          <p>{station.externalRemark}</p>
        </div>
      ))}
    </>
  );
};

const VlilleFeed = () => {
  const { isLoading, error, data } = useVlille();

  if (isLoading) return 'Loading Vlille...';

  if (error || data === undefined) {
    return 'An error has occurred: ' + error?.message;
  }

  return (
    <>
      {data?.map((station) => {
        const { nbvelosdispo } = station;

        const stationId = geoToID(station.geo);

        const colorStatus =
          nbvelosdispo <= 1
            ? 'danger'
            : nbvelosdispo >= 1 && nbvelosdispo <= 5
            ? 'warning'
            : 'success';

        return (
          <div
            key={stationId}
            id={stationId}
            className={`item vlille ${colorStatus}`}
            onClick={(e) => openBindMarker(`station-vlille-${e.currentTarget.id}`)}
          >
            <h1>🚲 Vélo - V'Lille</h1>
            <p className='address'>
              {station.adresse}, {station.commune}
            </p>
            <h2 style={{ textAlign: 'center' }}>{nbvelosdispo} vélo(s) disponible(s)</h2>
            <div className='meta'>
              <p>Places disponibles : {station.nbplacesdispo}</p>
              <p>État : {station.etat}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

const ChargingPointFeed = () => {
  const { isLoading, error, data } = useChargingPoint();

  if (isLoading) return 'Loading charging points...';

  if (error || data === undefined) {
    return 'An error has occurred: ' + error?.message;
  }

  return (
    <>
      {data?.map((point, index) => {
        const pointID = geoToID(point.coordonnees_geo);

        return (
          <div
            key={pointID + index}
            id={pointID}
            className={`item`}
            onClick={(e) => openBindMarker(`point-${e.currentTarget.id}`)}
          >
            <h1>⚡ Borne de recharge - {point.n_operateur}</h1>
            <p className='address'>
              {point.ad_station}, {point.commune}
            </p>
            <h2 style={{ textAlign: 'center' }}>Accès {point.acces_recharge} </h2>
            <div className='meta'>
              <p>Puissance max : {point.puiss_max}</p>
              <p>Type de prises : {point.type_prise}</p>
            </div>
          </div>
        );
      })}
    </>
  );
};

interface PanelProps {
  filters: FilterChoices;
}

export function Panel({ filters }: PanelProps) {
  return (
    <div className='panel'>
      <section className='panel-list'>
        {filters.vlille && <VlilleFeed />}
        {filters.citiz && <CitizFeed />}
        {filters.point && <ChargingPointFeed />}
      </section>
    </div>
  );
}
