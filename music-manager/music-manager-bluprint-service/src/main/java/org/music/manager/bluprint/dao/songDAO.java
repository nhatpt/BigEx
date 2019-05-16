package org.music.manager.bluprint.dao;

import java.util.List;

import org.music.manager.api.Song;

public interface songDAO {
	List<Song> listSong();

	Song getSong(Integer id);

	void addSong(Song song);
	void addSongByName(String name, String genre);
	
	void updateSong(Song song);

	void removeSongByID(int id);

	void removeAll();
	
	List<Song> getByName(String name);
}
