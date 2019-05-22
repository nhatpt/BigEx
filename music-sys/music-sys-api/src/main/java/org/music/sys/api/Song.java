package org.music.sys.api;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Song implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
//	@GeneratedValue(strategy = GenerationType.AUTO)
	
	@GeneratedValue
	private Integer id;
	
	private String name;
	private String genre;

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

	public Song() {
		
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

	public String getgenre() {
		return genre;
	}

	public void setgenre(String genre) {
		this.genre = genre;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@Override
	public String toString() {
		return "Song[id=" + id + ", name=" + name + ", genre=" + genre + "]";
	}

}