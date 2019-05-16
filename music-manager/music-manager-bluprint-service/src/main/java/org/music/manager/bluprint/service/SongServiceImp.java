package org.music.manager.bluprint.service;

import java.util.List;

import org.music.manager.api.Song;
import org.music.manager.api.SongService;
import org.music.manager.bluprint.dao.songDAO;

public class SongServiceImp implements SongService{

	
	private songDAO songDao;
	public SongServiceImp (songDAO songdao) {
		this.songDao = songdao;
	}
	
	@Override
	public List<Song> listSong() {
		return songDao.listSong();
	}

	@Override
	public Song getSong(Integer id) {
		return songDao.getSong(id);
	}

	@Override
	public void addSong(Song song) {
		songDao.addSong(song);
	}

	@Override
	public void addSongByName(String name, String genre) {
		songDao.addSongByName(name, genre);
	}

	@Override
	public void updateSong(Song song) {
		songDao.updateSong(song);
	}

	@Override
	public void removeSongByID(int id) {
		songDao.removeSongByID(id);
	}

	@Override
	public void removeAll() {
		songDao.removeAll();
	}

	@Override
	public List<Song> getByName(String name) {
		return songDao.getByName(name);
	}

}
