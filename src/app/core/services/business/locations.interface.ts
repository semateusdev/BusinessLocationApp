export interface Business {
    business_id:        string;
    google_id:          string;
    place_id:           string;
    google_mid:         string;
    phone_number:       string | null;
    name:               string;
    latitude:           number;
    longitude:          number;
    full_address:       string;
    review_count:       number;
    rating:             number | null;
    timezone:           string;
    opening_status:     string | null;
    working_hours:      WorkingHours | null;
    website:            string | null;
    verified:           boolean;
    place_link:         string;
    cid:                string;
    reviews_link:       string | null;
    owner_id:           string;
    owner_link:         string;
    owner_name:         string;
    booking_link:       string | null;
    reservations_link:  string | null;
    business_status:    string;
    type:               string;
    subtypes:           string[];
    photos_sample:      PhotosSample[];
    reviews_per_rating: { [key: string]: number } | null;
    photo_count:        number;
    about:              About;
    address:            string;
    order_link:         null;
    price_level:        null;
    district:           string | null;
    street_address:     string;
    city:               string;
    zipcode:            string | null;
    state:              string;
    country:            string;
}

export interface About {
    summary: null;
    details: Details;
}

export interface Details {
    [key: string]: ServiceOptions;
}

export interface ServiceOptions {
    [key: string]: boolean;
}

export interface PhotosSample {
    photo_id:            string;
    photo_url:           string;
    photo_url_large:     string | null;
    video_thumbnail_url: null;
    latitude:            number;
    longitude:           number;
    type:                string;
    photo_datetime_utc:  string;
    photo_timestamp:     number;
}

export interface WorkingHours {
    Thursday:  string[];
    Friday:    string[];
    Saturday:  string[];
    Sunday:    string[];
    Monday:    string[];
    Tuesday:   string[];
    Wednesday: string[];
}
export interface ShortBusinessInfo {
    name: string;
    phone_number: string;
    street_address: string;
    city: string;
    open_24: string;
    photo_url:           string;
    latitude:           number;
    longitude:          number;
    rating:             number | null;
    website?:            string;
    
}