export interface TravelTime {
  start: string;
  end: string;
}

export interface Airport {
  name: string;
  coordinates: [number, number];
}

export interface FormData {
  googleMapURL: string;
  airportList: {
    arrivalAirport: Airport;
    returnAirport: Airport;
  };
  dateTimeRange: TravelTime;
  dateList: string[];
}

export interface Place {
  place_id: string;
  name: string;
  geometry: {
    lat: number;
    lng: number;
  };
  formattedAddress: string;
  types: string[];
}

export interface PlacesInfo {
  places_name: string[];
  places: Place[];
}

export interface UserData {
  name: string;
  projectName: string;
}

export interface UserInfo {
  userData: UserData;
  formData: FormData;
  placesInfo: PlacesInfo;
}
