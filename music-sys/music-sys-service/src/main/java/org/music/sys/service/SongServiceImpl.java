package org.music.sys.service;

import java.util.List;

import org.music.sys.api.Song;
import org.music.sys.api.SongService;
import org.music.sys.dao.SongDAO;


public class SongServiceImpl implements SongService {
	
	private SongDAO songDAO;
	
	public SongServiceImpl(SongDAO songdao) {
		this.songDAO = songdao;
	}
	
	public void setSongdao(SongDAO songdao) {
		this.songDAO = songdao;
	}
	
	public List<Song> list() {
		return songDAO.list();
	}

	public Song get(Integer id) {
		return songDAO.get(id);
	}

	public void add(Song song) {
		songDAO.add(song);
	}

	public void update(Song song) {
		songDAO.update(song);
	}

	public void remove(int id) {
		songDAO.remove(id);
	}

	public void removeAll() {
		songDAO.removeAll();
	}

	public List<Song> getbyName(String name) {
		return songDAO.getbyName(name);
	}

}
