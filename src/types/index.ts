export interface TravelTime {
  start: string;
  end: string;
}
export interface FormData {
  googleMapURL: string;
  airportList: {
    arrivalAirport: Place;
    returnAirport: Place;
  };
  dateTimeRange: TravelTime;
  dateList: string[];
}

export interface Geometry {
  lat: number;
  lng: number;
}
export interface Place {
  place_id: string;
  name: string;
  geometry: Geometry;
  formattedAddress: string;
  types?: string[];
}
export interface AirportOptionGroup {
  label: string;
  options: Place[];
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

export interface GoogleMapListNameResponse {
  scrapped_total_places: number;
  places_name: string[];
  processing_time: number;
}
