import type { FirebaseApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  arrayUnion,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  type DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  Firestore,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import type { Playlist } from "../../../core/playlist/domain/models/playlist";
import type { Song } from "../../../core/search/domain/models/song";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validar que todas las variables de entorno estén configuradas
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

for (const envVar of requiredEnvVars) {
  if (!import.meta.env[envVar]) {
    throw new Error(`La variable de entorno ${envVar} es requerida`);
  }
}

export class FirebaseClient {
  private app: FirebaseApp;
  private db: Firestore;
  private playlistCollection: CollectionReference<DocumentData>;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.db = getFirestore(this.app);
    this.playlistCollection = collection(this.db, "playlists");
  }

  private docToPlaylist(doc: DocumentData): Playlist {
    return {
      id: doc.id,
      name: doc.name || "",
      songs: doc.songs || [],
    };
  }

  async getPlaylist(): Promise<Playlist[]> {
    const snapshot = await getDocs(this.playlistCollection);
    return snapshot.docs.map((doc) =>
      this.docToPlaylist({
        id: doc.id,
        ...doc.data(),
      })
    );
  }

  async getPlaylistById(id: string): Promise<Playlist | null> {
    const docRef = doc(this.db, "playlists", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return this.docToPlaylist({
        id: docSnap.id,
        ...docSnap.data(),
      });
    }

    return null;
  }

  async addSongToPlaylist(playlistId: string, song: Song): Promise<Playlist> {
    const docRef = doc(this.db, "playlists", playlistId);
    await updateDoc(docRef, {
      songs: arrayUnion(song),
    });

    const updatePlaylist = await this.getPlaylistById(playlistId);
    if (!updatePlaylist) {
      throw new Error("Playlist no encontrada");
    }
    return updatePlaylist;
  }

  async removeSongFromPlaylist(
    playlistId: string,
    songId: string
  ): Promise<Playlist> {
    const docRef = doc(this.db, "playlists", playlistId);

    // Primero obtenemos la playlist para encontrar la canción completa
    const currentPlaylist = await this.getPlaylistById(playlistId);
    if (!currentPlaylist) {
      throw new Error("Playlist no encontrada");
    }

    // Encontramos la canción que queremos eliminar
    const songToRemove = currentPlaylist.songs.find(
      (song) => song.id === songId
    );
    if (!songToRemove) {
      throw new Error("Canción no encontrada en la playlist");
    }

    // Usamos arrayRemove con el objeto completo de la canción
    await updateDoc(docRef, {
      songs: arrayRemove(songToRemove),
    });

    const updatedPlaylist = await this.getPlaylistById(playlistId);
    if (!updatedPlaylist) {
      throw new Error("Playlist no encontrada");
    }
    return updatedPlaylist;
  }

  async deletePlaylist(id: string): Promise<void> {
    const docRef = doc(this.db, "playlists", id);
    await deleteDoc(docRef);
  }

  async createPlaylist(name: string): Promise<Playlist> {
    const docRef = await addDoc(this.playlistCollection, {
      name,
      songs: [],
    });

    const newPlaylist = await this.getPlaylistById(docRef.id);
    if (!newPlaylist) {
      throw new Error("Playlist no creada");
    }
    return newPlaylist;
  }
}
