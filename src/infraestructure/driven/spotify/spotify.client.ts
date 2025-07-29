const SPOTIFY_CLIENT_ID = "";
const SPOTIFY_CLIENT_SECRET = "";

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
        Authorization: `Basic ${btoa(
          `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
        )}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
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
      limit: "20",
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
