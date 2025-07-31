const SPOTIFY_CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error('Las variables de entorno VITE_SPOTIFY_CLIENT_ID y VITE_SPOTIFY_CLIENT_SECRET son requeridas');
}

export class SpotifyClient {
  private authToken: string | null = null;
  private tokenExpirationTime: number = 0;

  private async getAuthToken(): Promise<string> {
    if (this.authToken && Date.now() < this.tokenExpirationTime) {
      return this.authToken;
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: SPOTIFY_CLIENT_ID,
        client_secret: SPOTIFY_CLIENT_SECRET,
      }),
    });

    if (!response.ok) {
      throw new Error("Fallo al obtener el token de autenticación de Spotify");
    }

    const data = await response.json();
    this.authToken = data.access_token;
    this.tokenExpirationTime = Date.now() + data.expires_in * 1000;

    return this.authToken!;
  }

  public async searchTracks(query: string): Promise<any> {
    if (!query) return [];

    const token = await this.getAuthToken();

    const searchParams = new URLSearchParams({
      q: query,
      type: "track",
      limit: "40",
    });

    const response = await fetch(
      `https://api.spotify.com/v1/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Fallo al buscar canciones en Spotify");
    }

    const data = await response.json();
    return data.tracks.items || [];
  }
}
