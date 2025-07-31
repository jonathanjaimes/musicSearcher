// import React from "react";
// import "./PlaylistForm.scss";

// interface PlaylistFormProps {
//   newPlaylistName: string;
//   isCreating: boolean;
//   onSubmit: (e: React.FormEvent) => void;
//   onNameChange: (name: string) => void;
//   onCancel: () => void;
// }

// const PlaylistForm: React.FC<PlaylistFormProps> = ({
//   newPlaylistName,
//   isCreating,
//   onSubmit,
//   onNameChange,
//   onCancel,
// }) => {
//   return (
//     <div className="create-form-container">
//       <form className="create-playlist-form" onSubmit={onSubmit}>
//         <input
//           type="text"
//           placeholder="Nombre de la nueva lista"
//           value={newPlaylistName}
//           onChange={(e) => onNameChange(e.target.value)}
//           className="playlist-name-input"
//           maxLength={50}
//           autoFocus
//         />
//         <div className="form-actions">
//           <button
//             type="submit"
//             className="create-button"
//             disabled={!newPlaylistName.trim() || isCreating}
//           >
//             {isCreating ? "Creando..." : "Crear"}
//           </button>
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={onCancel}
//             disabled={isCreating}
//           >
//             Cancelar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PlaylistForm;
