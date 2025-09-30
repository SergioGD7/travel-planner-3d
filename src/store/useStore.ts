import { create } from 'zustand'
import { Itinerary, Activity, Destination, UserPreferences, AIRecommendation } from '../types'

interface TravelStore {
  // Estado de itinerarios
  itineraries: Itinerary[]
  currentItinerary: Itinerary | null
  selectedActivities: Activity[]
  
  // Estado de destinos
  destinations: Destination[]
  selectedDestination: Destination | null
  
  // Estado de recomendaciones de IA
  recommendations: AIRecommendation[]
  isLoadingRecommendations: boolean
  
  // Preferencias del usuario
  userPreferences: UserPreferences | null
  
  // Estado de la UI
  isLoading: boolean
  error: string | null
  sidebarOpen: boolean
  currentView: 'list' | 'map' | 'calendar'
  
  // Acciones para itinerarios
  setItineraries: (itineraries: Itinerary[]) => void
  addItinerary: (itinerary: Itinerary) => void
  updateItinerary: (id: string, updates: Partial<Itinerary>) => void
  deleteItinerary: (id: string) => void
  setCurrentItinerary: (itinerary: Itinerary | null) => void
  
  // Acciones para actividades
  addActivity: (activity: Activity) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  deleteActivity: (id: string) => void
  reorderActivities: (sourceIndex: number, destinationIndex: number) => void
  setSelectedActivities: (activities: Activity[]) => void
  
  // Acciones para destinos
  setDestinations: (destinations: Destination[]) => void
  addDestination: (destination: Destination) => void
  setSelectedDestination: (destination: Destination | null) => void
  
  // Acciones para recomendaciones
  setRecommendations: (recommendations: AIRecommendation[]) => void
  setLoadingRecommendations: (loading: boolean) => void
  
  // Acciones para preferencias
  setUserPreferences: (preferences: UserPreferences) => void
  
  // Acciones para UI
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setSidebarOpen: (open: boolean) => void
  setCurrentView: (view: 'list' | 'map' | 'calendar') => void
}

export const useStore = create<TravelStore>((set, get) => ({
  // Estado inicial
  itineraries: [],
  currentItinerary: null,
  selectedActivities: [],
  destinations: [],
  selectedDestination: null,
  recommendations: [],
  isLoadingRecommendations: false,
  userPreferences: null,
  isLoading: false,
  error: null,
  sidebarOpen: false,
  currentView: 'list',
  
  // Implementación de acciones
  setItineraries: (itineraries) => set({ itineraries }),
  
  addItinerary: (itinerary) => 
    set((state) => ({ itineraries: [...state.itineraries, itinerary] })),
  
  updateItinerary: (id, updates) =>
    set((state) => ({
      itineraries: state.itineraries.map((item) =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date() } : item
      ),
      currentItinerary: state.currentItinerary?.id === id
        ? { ...state.currentItinerary, ...updates, updatedAt: new Date() }
        : state.currentItinerary
    })),
  
  deleteItinerary: (id) =>
    set((state) => ({
      itineraries: state.itineraries.filter((item) => item.id !== id),
      currentItinerary: state.currentItinerary?.id === id ? null : state.currentItinerary
    })),
  
  setCurrentItinerary: (itinerary) => set({ currentItinerary: itinerary }),
  
  addActivity: (activity) => {
    const state = get()
    if (state.currentItinerary) {
      const updatedActivities = [...state.currentItinerary.activities, activity]
      const updatedItinerary = {
        ...state.currentItinerary,
        activities: updatedActivities,
        updatedAt: new Date()
      }
      
      set({
        currentItinerary: updatedItinerary,
        itineraries: state.itineraries.map((item) =>
          item.id === updatedItinerary.id ? updatedItinerary : item
        )
      })
    }
  },
  
  updateActivity: (id, updates) => {
    const state = get()
    if (state.currentItinerary) {
      const updatedActivities = state.currentItinerary.activities.map((activity) =>
        activity.id === id ? { ...activity, ...updates } : activity
      )
      const updatedItinerary = {
        ...state.currentItinerary,
        activities: updatedActivities,
        updatedAt: new Date()
      }
      
      set({
        currentItinerary: updatedItinerary,
        itineraries: state.itineraries.map((item) =>
          item.id === updatedItinerary.id ? updatedItinerary : item
        )
      })
    }
  },
  
  deleteActivity: (id) => {
    const state = get()
    if (state.currentItinerary) {
      const updatedActivities = state.currentItinerary.activities.filter(
        (activity) => activity.id !== id
      )
      const updatedItinerary = {
        ...state.currentItinerary,
        activities: updatedActivities,
        updatedAt: new Date()
      }
      
      set({
        currentItinerary: updatedItinerary,
        itineraries: state.itineraries.map((item) =>
          item.id === updatedItinerary.id ? updatedItinerary : item
        )
      })
    }
  },
  
  reorderActivities: (sourceIndex, destinationIndex) => {
    const state = get()
    if (state.currentItinerary) {
      const activities = [...state.currentItinerary.activities]
      const [removed] = activities.splice(sourceIndex, 1)
      activities.splice(destinationIndex, 0, removed)
      
      const updatedItinerary = {
        ...state.currentItinerary,
        activities,
        updatedAt: new Date()
      }
      
      set({
        currentItinerary: updatedItinerary,
        itineraries: state.itineraries.map((item) =>
          item.id === updatedItinerary.id ? updatedItinerary : item
        )
      })
    }
  },
  
  setSelectedActivities: (activities) => set({ selectedActivities: activities }),
  
  setDestinations: (destinations) => set({ destinations }),
  
  addDestination: (destination) =>
    set((state) => ({ destinations: [...state.destinations, destination] })),
  
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
  
  setRecommendations: (recommendations) => set({ recommendations }),
  
  setLoadingRecommendations: (loading) => set({ isLoadingRecommendations: loading }),
  
  setUserPreferences: (preferences) => set({ userPreferences: preferences }),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  
  setCurrentView: (view) => set({ currentView: view }),
}))
