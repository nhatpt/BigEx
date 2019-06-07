package org.music.sys.rest;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.music.sys.api.Song;
import org.music.sys.api.SongService;

@Path("api/getsong")
public class SongREST {
	private SongService songService;

	public SongREST(SongService songService) {
		this.songService = songService;
	}

	@Path("/")
	@Produces("application/json")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@GET
	public Response list() {
		try {
			return Response.status(Response.Status.OK)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.entity(songService.list()).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	@Path("/getid/{id}")
	@Produces("application/json")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@GET
	public Response get(@PathParam("id") Integer id) {
		try {
			return Response.status(Response.Status.OK)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.entity(songService.get(id)).build();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	@Path("/")
	@Produces("application/json")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@POST
	public Response add(Song song) {
		try {
			songService.add(song);
			return Response.status(Response.Status.CREATED)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}

	@Path("/{id}")
	@DELETE
	public Response remove(@PathParam("id") int id) {
		try {
			songService.remove(id);
			return Response.status(Response.Status.OK)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers","origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NO_CONTENT).build();
		}
	}

	@Path("/{id}")
	@PUT
	@Produces("application/json")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
//	public Response update(Song song) {
	public Response update(Song song, @PathParam("id") int id) {
		try {
			Song updateSong = songService.get(id);
			updateSong.setName(song.getName());
			updateSong.setGenre(song.getGenre());
			updateSong.setlyrics(song.getlyrics());
			songService.update(updateSong);
			return Response.status(Response.Status.ACCEPTED)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.CONFLICT).build();
		}
		
	}

	@Path("/search/{name}")
	@Produces("application/json")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@GET
	public Response getbyName(@PathParam("name") String name) {
		try {
			return Response.status(Response.Status.OK)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.entity(songService.getbyName(name)).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}

	@Path("/deleteAll")
	@DELETE
	public Response deleteAll() {
		try {
			songService.removeAll();
			return Response.status(Response.Status.OK)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.BAD_REQUEST).build();
		}
	}
	
	@Path("/count")
	@Produces("application/json")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@GET
	public Response getCountListSong() {
		try {
			return Response.status(Response.Status.OK)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.entity(songService.getCountListSong()).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
	
	@Path("pagi/{size}/{begin}")
	@Produces("application/json")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@GET
	public Response getPaginationListSong(@PathParam("begin") int begin, @PathParam("size") int size) {
		try {
			return Response.status(Response.Status.OK)
					.header("Access-Control-Allow-Origin", "*")
					.header("Access-Control-Allow-Credentials", "true")
					.header("Access-Control-Allow-Headers", "origin, content-type, accept, authorization")
					.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
					.entity(songService.getSongPagination(begin,size)).build();
		} catch (Exception e) {
			e.printStackTrace();
			return Response.status(Response.Status.NOT_FOUND).build();
		}
	}
}
