export interface Destination {
  id: string
  name: string
  country: string
  coordinates: {
    lat: number
    lng: number
  }
  description?: string
  image?: string
  timeZone: string
}

export interface Activity {
  id: string
  title: string
  description: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  startTime: Date
  endTime: Date
  price?: number
  currency?: string
  category: ActivityCategory
  url?: string
  image?: string
  rating?: number
  reviews?: number
  estimatedDuration?: number // en minutos
  isCustom: boolean
}

export type ActivityCategory = 
  | 'attraction'
  | 'restaurant'
  | 'hotel'
  | 'transport'
  | 'entertainment'
  | 'shopping'
  | 'culture'
  | 'nature'
  | 'adventure'
  | 'wellness'
  | 'custom'

export interface Itinerary {
  id: string
  title: string
  description?: string
  destinations: Destination[]
  activities: Activity[]
  startDate: Date
  endDate: Date
  totalBudget?: number
  currency: string
  travelers: number
  tags: string[]
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
  coverImage?: string
}

export interface Route {
  from: {
    lat: number
    lng: number
  }
  to: {
    lat: number
    lng: number
  }
  duration: number // en minutos
  distance: number // en metros
  mode: 'driving' | 'walking' | 'transit' | 'bicycling'
  instructions: string[]
  polyline?: string
}

export interface AIRecommendation {
  id: string
  type: 'activity' | 'restaurant' | 'attraction' | 'hotel'
  title: string
  description: string
  location: string
  coordinates: {
    lat: number
    lng: number
  }
  price?: number
  currency?: string
  rating: number
  image?: string
  url?: string
  category: ActivityCategory
  reasonForRecommendation: string
  matchScore: number // 0-100
}

export interface UserPreferences {
  budget: {
    min: number
    max: number
    currency: string
  }
  interests: ActivityCategory[]
  travelStyle: 'luxury' | 'mid-range' | 'budget' | 'backpacker'
  groupType: 'solo' | 'couple' | 'family' | 'friends' | 'business'
  pace: 'relaxed' | 'moderate' | 'fast'
  accommodation: 'hotel' | 'hostel' | 'airbnb' | 'resort' | 'any'
  transport: 'walking' | 'public' | 'car' | 'bike' | 'mixed'
  foodPreferences: string[]
  accessibility: boolean
  language: string
}

export interface CalendarEvent {
  id: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  activity?: Activity
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  extendedProps?: {
    activityId?: string
    itineraryId?: string
    type: 'activity' | 'travel' | 'meal' | 'accommodation'
    location?: string
    price?: number
    url?: string
  }
}

export interface WeatherInfo {
  location: string
  date: Date
  temperature: {
    min: number
    max: number
    unit: 'C' | 'F'
  }
  condition: string
  humidity: number
  windSpeed: number
  icon: string
}

export interface TravelTip {
  id: string
  destination: string
  category: 'transportation' | 'accommodation' | 'food' | 'culture' | 'safety' | 'money'
  title: string
  content: string
  importance: 'low' | 'medium' | 'high'
  season?: string
}

export interface MapMarker {
  id: string
  position: {
    lat: number
    lng: number
  }
  title: string
  type: 'destination' | 'activity' | 'accommodation' | 'transport'
  activity?: Activity
  destination?: Destination
  isSelected?: boolean
}
