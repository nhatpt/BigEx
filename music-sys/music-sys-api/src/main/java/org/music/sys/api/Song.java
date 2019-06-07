package org.music.sys.api;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "song")
public class Song implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "genre")
	private String genre;
	
	@Column(name = "lyrics")
	private String lyrics;

	public String getlyrics() {
		return lyrics;
	}

	public void setlyrics(String lyrics) {
		this.lyrics = lyrics;
	}

	public Song() {
		
	}
	
	public Song(Integer id, String name, String genre, String lyrics) {
		super();
		this.id = id;
		this.name = name;
		this.genre = genre;
		this.lyrics = lyrics;
	}
	
	public Song(Integer id, String name, String genre) {
		super();
		this.id = id;
		this.name = name;
		this.genre = genre;
	}

	public Song(String name, String genre) {
		super();
		this.name = name;
		this.genre = genre;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getGenre() {
		return genre;
	}

	public void setGenre(String genre) {
		this.genre = genre;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Song[id=" + id + ", name=" + name + ", genre=" + genre +  ",lyrics=" + lyrics + "]";
	}

}