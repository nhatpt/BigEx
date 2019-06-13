package org.music.sys.api;

import java.util.List;

public interface SongService {
	List<Song> list();

	Song get(Integer id);

	void add(Song song);

	void update(Song song);

	void remove(int id);

	void removeAll();

	List<Song> getbyName(String name);
	
//	Get Pagination API:
	Integer getCountListSong();
	
	List<Song> getSongPagination(int begin,  int size);
		
}

