import { useQuery } from 'react-query';

import { CitizStation, CitizVehicle, Vlille, ChargingPoint } from '@/types';

const getJSON = (url: string) => fetch(url).then((res) => res.json());

export const useCitizStations = () => {
  const baseURL = 'https://service.citiz.fr/citiz/api/station';

  return useQuery<boolean, Error, CitizStation[]>({
    queryKey: ['citizStations'],
    queryFn: async () => {
      const stations = await getJSON(`${baseURL}/all`);
      return stations.filter(({ cityId }: { cityId: number }) => cityId >= 256 && cityId <= 267); // Only in Lille
    },
  });
};

export const useCitizVehicles = (stationId: number) => {
  const baseURL = 'https://service.citiz.fr/citiz/api/station';

  return useQuery<boolean, Error, CitizVehicle[]>({
    queryKey: ['citizVehicles', stationId],
    queryFn: () => getJSON(`${baseURL}/${stationId}/vehicle`),
    enabled: !!stationId,
  });
};

export const useVlille = () => {
  const vlilleURL = `https://opendata.lillemetropole.fr/api/explore/v2.1/catalog/datasets/vlille-realtime/records?limit=100`;

  return useQuery<boolean, Error, Vlille[]>({
    queryKey: ['vlilleStations'],
    queryFn: async () => {
      const { results } = await getJSON(vlilleURL);
      return results.filter(({ etat }: { etat: string }) => etat !== 'RÉFORMÉ'); // Only working stations
    },
  });
};

export const useChargingPoint = () => {
  const chargingPointURL = `https://opendata.lillemetropole.fr/api/explore/v2.1/catalog/datasets/bornes-recharge-mel/records?limit=100`;

  return useQuery<boolean, Error, ChargingPoint[]>({
    queryKey: ['chargingPoints'],
    queryFn: async () => {
      const { results } = await getJSON(chargingPointURL);
      return results;
    },
  });
};
