package org.music.sys.dao;

import java.util.List;

import org.music.sys.api.Song;

public interface SongDAO {
	List<Song> list();

	Song get(Integer id);

	void add(Song song);

	void remove(int id);
	
	void removeAll();
	
	void update(Song song);
	
	List<Song> getbyName(String name);

//	Get Pagination API:
	Integer getCountListSong();
	List<Song> getSongPagination(int begin,  int size);
}
