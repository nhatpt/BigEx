package org.music.manager.bluprint.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.music.manager.api.Song;

@Transactional
public class songDAOImp implements songDAO {
	@PersistenceContext(unitName = "song-hibernate")
	private EntityManager entityManager;

	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Transactional(Transactional.TxType.SUPPORTS)
	@Override
	public List<Song> listSong() {
		TypedQuery<Song> query = entityManager.createQuery("SELECT s FROM Song s", Song.class);
		return query.getResultList();
	}

	@Transactional(Transactional.TxType.SUPPORTS)
	@Override
	public Song getSong(Integer id) {
		return entityManager.find(Song.class, id);
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void addSong(Song song) {
		entityManager.persist(song);
		entityManager.flush();
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void addSongByName(String name, String genre) {
		Song song = new Song();
		song.setName(name);
		song.setGenre(genre);
		entityManager.persist(song);
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void updateSong(Song song) {
		entityManager.merge(song);
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void removeSongByID(int id) {
		entityManager.createQuery("delete from Song").executeUpdate();
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void removeAll() {
		entityManager.createQuery("delete from Song").executeUpdate();
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public List<Song> getByName(String name) {
		TypedQuery<Song> query = entityManager.createQuery(
				"select s from Song s where lower(s.name) LIKE lower(:name)",
				Song.class);
		query.setParameter("name", "%" + name + "%");
		return query.getResultList();
	}
}
