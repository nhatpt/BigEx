package org.music.manager.api;

import java.util.List;

public interface SongService {
	List<Song> listSong();

	Song getSong(Integer id);

	void addSong(Song song);
	
	void addSongByName(String name, String genre);

	void updateSong(Song song);

	void removeSongByID(int id);

	void removeAll();
	
	List<Song> getByName(String name);
}
