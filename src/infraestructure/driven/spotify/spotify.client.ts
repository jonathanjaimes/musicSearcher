const SPOTIFY_CLIENT_ID = "61e7c2cc7312413eace05c8711413fc9";
const SPOTIFY_CLIENT_SECRET = "2b1e43341d34432d972f05ccb7776a2e";

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
