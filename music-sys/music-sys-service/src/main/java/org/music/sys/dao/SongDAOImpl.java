package org.music.sys.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.transaction.Transactional;

import org.music.sys.api.Song;

@Transactional
public class SongDAOImpl implements SongDAO{

	@PersistenceContext(unitName = "song-hibernate")
	private EntityManager entityManager;

	public void setEntityManager(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Transactional(Transactional.TxType.SUPPORTS)
	@Override
	public List<Song> list() {
		TypedQuery<Song> query = entityManager.createQuery("SELECT s FROM Song s", Song.class);
		return query.getResultList();
	}

	@Transactional(Transactional.TxType.SUPPORTS)
	@Override
	public Song get(Integer id) {
		return entityManager.find(Song.class, id);
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void add(Song song) {
		entityManager.persist(song);
		entityManager.flush();
	}
	
	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void update(Song song) {
		entityManager.merge(song);
	}

	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void remove(int id) {
		Song song = get(id);
		entityManager.remove(song);		
	}
	
	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public void removeAll() {
		entityManager.createQuery("delete from Song").executeUpdate();				
	}
	
	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public List<Song> getbyName(String name) {
		TypedQuery<Song> query = entityManager
				.createQuery("select s from Song s where lower(s.name) LIKE lower(:name)", Song.class);
		query.setParameter("name", "%" + name + "%");
		return query.getResultList();
	}
	
	@Transactional(Transactional.TxType.REQUIRES_NEW)
	@Override
	public Integer getCountListSong() {
		TypedQuery<Long> query = entityManager.createQuery("select count(s) from Song s", Long.class);//Song need to same as class
		return query.getSingleResult() != null ? Integer.parseInt(query.getSingleResult().toString()) : 0;
	}

	@Override
	public List<Song> getSongPagination(int begin, int size) {
		TypedQuery<Song> query = entityManager
				.createQuery("select s from Song s order by s.name", Song.class);
		query.setFirstResult((begin - 1) * size); 
		query.setMaxResults(size);
		return query.getResultList();
	}
}
