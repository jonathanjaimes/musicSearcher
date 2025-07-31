import { useState } from "react";

export const usePlaylistForm = (
  onCreatePlaylist: (name: string) => Promise<void>
) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const openForm = () => {
    setShowCreateForm(true);
  };

  const closeForm = () => {
    setShowCreateForm(false);
    setNewPlaylistName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;

    setIsCreating(true);
    try {
      await onCreatePlaylist(newPlaylistName.trim());
      closeForm(); // Only close form on success
    } catch (error) {
      console.error("Error creating playlist:", error);
      // Don't close form on error - keep it open so user can retry
    } finally {
      setIsCreating(false);
    }
  };

  const updateName = (name: string) => {
    setNewPlaylistName(name);
  };

  return {
    showCreateForm,
    newPlaylistName,
    isCreating,
    openForm,
    closeForm,
    handleSubmit,
    updateName,
  };
};
