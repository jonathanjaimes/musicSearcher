import type { Song } from '../../core/search/domain/models/song'

export const mockSong: Song = {
  id: 'song-1',
  title: 'Test Song',
  artist: 'Test Artist',
  album: 'Test Album',
  imageUrl: 'https://example.com/image.jpg'
}

export const mockSongs: Song[] = [
  mockSong,
  {
    id: 'song-2',
    title: 'Another Song',
    artist: 'Another Artist',
    album: 'Another Album',
    imageUrl: 'https://example.com/image2.jpg'
  },
  {
    id: 'song-3',
    title: 'Third Song',
    artist: 'Third Artist',
    album: 'Third Album',
    imageUrl: 'https://example.com/image3.jpg'
  }
]

export const createMockSong = (overrides: Partial<Song> = {}): Song => ({
  ...mockSong,
  ...overrides
})
