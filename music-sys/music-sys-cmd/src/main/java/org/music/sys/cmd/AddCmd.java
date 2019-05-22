package org.music.sys.cmd;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.ws.rs.core.MediaType;

import org.apache.cxf.jaxrs.client.WebClient;
import org.apache.karaf.shell.api.action.Action;
import org.apache.karaf.shell.api.action.Argument;
import org.apache.karaf.shell.api.action.Command;
import org.apache.karaf.shell.api.action.Option;
import org.apache.karaf.shell.api.action.lifecycle.Service;
import org.music.sys.api.Song;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;

@Service
@Command(scope = "music", name = "add", description = "Add a song")
public class AddCmd implements Action {

	@Argument(index = 0, name = "name", description = "name song", required = true, multiValued = false)
	String name;

	@Argument(index = 1, name = "genre", description = "genre song", required = true, multiValued = false)
	String genre;
	
	@Option(name = "--url", description = "Location of the REST service", required = false, multiValued = false)
	    String restLocation = "http://localhost:8181/cxf/mms/";
	
	@Override
	public Object execute() throws Exception {
		Random rd = new Random();
		int id = rd.nextInt(100);
		Song song = new Song(id, name, genre);
		song.setId(id);
		song.setgenre(genre);
		song.setName(name);
		
		List<JacksonJsonProvider> providers = new ArrayList<JacksonJsonProvider>();
        providers.add(new JacksonJsonProvider());
        WebClient webClient = WebClient.create(restLocation, providers);
        webClient.header("Content-Type", MediaType.APPLICATION_JSON).post(song);
		return null;
	}
}
