import { vi } from 'vitest'

// Mock Firebase modules
export const mockFirebaseApp = {
  name: 'test-app',
  options: {}
}

export const mockFirestore = {
  app: mockFirebaseApp
}

export const mockCollection = vi.fn()
export const mockDoc = vi.fn()
export const mockGetDocs = vi.fn()
export const mockGetDoc = vi.fn()
export const mockAddDoc = vi.fn()
export const mockUpdateDoc = vi.fn()
export const mockDeleteDoc = vi.fn()
export const mockArrayUnion = vi.fn()
export const mockArrayRemove = vi.fn()

export const mockQuerySnapshot = {
  docs: [],
  empty: true,
  size: 0
}

export const mockDocumentSnapshot = {
  id: 'test-id',
  exists: () => true,
  data: () => ({ name: 'Test Playlist', songs: [] })
}

// Mock Firebase/app
vi.mock('firebase/app', () => ({
  initializeApp: vi.fn(() => mockFirebaseApp)
}))

// Mock Firebase/firestore
vi.mock('firebase/firestore', () => ({
  getFirestore: vi.fn(() => mockFirestore),
  collection: mockCollection,
  doc: mockDoc,
  getDocs: mockGetDocs,
  getDoc: mockGetDoc,
  addDoc: mockAddDoc,
  updateDoc: mockUpdateDoc,
  deleteDoc: mockDeleteDoc,
  arrayUnion: mockArrayUnion,
  arrayRemove: mockArrayRemove
}))
