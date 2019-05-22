package org.music.sys.service.v1;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.music.sys.api.Song;
import org.music.sys.api.SongService;

public class SongServiceImpl implements SongService {

	@PersistenceContext(unitName = "song-hibernate")
	private EntityManager entityManager;

	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Transactional(Transactional.TxType.SUPPORTS)
	public List<Song> list() {
		TypedQuery<Song> query = entityManager.createQuery("SELECT s FROM Song s", Song.class);
		return query.getResultList();
	}

	@Transactional(Transactional.TxType.SUPPORTS)
	public Song get(Integer id) {
		return entityManager.find(Song.class, id);
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	public void add(Song song) {
		entityManager.persist(song);
		entityManager.flush();
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	public void remove(int id) {
		Song song = get(id);
		entityManager.remove(song);		
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	public void update(Song song) {
		entityManager.merge(song);
	}

	@Transactional(Transactional.TxType.SUPPORTS)
	public List<Song> getbyName(String name) {
		TypedQuery<Song> query = entityManager
				.createQuery("select s from Song s where lower(s.name) LIKE lower(:name)", Song.class);
		query.setParameter("name", "%" + name + "%");
		return query.getResultList();
	}
	
	@Transactional(Transactional.TxType.REQUIRES_NEW)
	public void removeAll() {
		entityManager.createQuery("delete from Song").executeUpdate();				
	}

}
