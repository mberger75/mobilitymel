export type CitizVehicle = {
  vehiculeId: number;
  providerId: number;
  name: string;
  licencePlate: string;
  externalRemark: string;
  isFreeFloating: false;
  electricEngine: false;
  fuelLevel: number;
  category: string;
  gpsLatitude: number;
  gpsLongitude: number;
};

export type CitizStation = {
  city: string;
  cityId: number;
  externalRemark: string;
  flexLocation: false;
  gpsLatitude: number;
  gpsLongitude: number;
  icon: string;
  name: string;
  providerId: number;
  stationId: number;
  type: number;
};

export type Vlille = {
  libelle: number;
  nom: string;
  adresse: string;
  commune: string;
  etat: string;
  type: string;
  nbplacesdispo: number;
  nbvelosdispo: number;
  etatconnexion: string;
  datemiseajour: string;
  geo: {
    lon: number;
    lat: number;
  };
  localisation: {
    lon: number;
    lat: number;
  };
};

export type ChargingPoint = {
  n_amenageur: string;
  n_operateur: string;
  n_enseigne: string;
  id_station: string;
  n_station: string;
  ad_station: string;
  code_insee: string;
  xlongitude: string;
  ylatitude: string;
  id_pdc: string;
  puiss_max: string;
  type_prise: string;
  acces_recharge: string;
  accessibilite: string;
  observations: string;
  date_maj: string;
  commune: string;
  nbre_pdc: number;
  coordonnees_geo: {
    lon: number;
    lat: number;
  };
};

export type FilterChoices = {
  citiz: boolean;
  vlille: boolean;
  point: boolean;
};

export type FilterKeys = keyof FilterChoices;
