import { FirebaseApp, initializeApp } from "firebase/app";
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
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

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
      name: doc.name,
      songs: doc.songs,
    };
  }

  async getPlaylist(): Promise<Playlist[]> {
    const snapshot = await getDocs(this.playlistCollection);
    return snapshot.docs.map(this.docToPlaylist);
  }

  async getPlaylistById(id: string): Promise<Playlist | null> {
    const docRef = doc(this.db, "playlists", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return this.docToPlaylist(docSnap);
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
    await updateDoc(docRef, {
      songs: arrayRemove(songId),
    });

    const updatePlaylist = await this.getPlaylistById(playlistId);
    if (!updatePlaylist) {
      throw new Error("Playlist no encontrada");
    }
    return updatePlaylist;
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
