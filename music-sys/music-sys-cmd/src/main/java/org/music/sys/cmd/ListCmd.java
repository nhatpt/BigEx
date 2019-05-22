package org.music.sys.cmd;


import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.core.MediaType;

import org.apache.cxf.jaxrs.client.WebClient;
import org.apache.karaf.shell.api.action.Action;
import org.apache.karaf.shell.api.action.Command;
import org.apache.karaf.shell.api.action.Option;
import org.apache.karaf.shell.api.action.lifecycle.Service;
import org.music.sys.api.Song;

import com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider;

@Service
@Command(scope = "music", name = "list", description = "List a song")
public class ListCmd implements Action{
	  @Option(name = "--url", description = "Location of the REST service", required = false, multiValued = false)
	    String restLocation = "http://localhost:8181/cxf/mms/";
	   
	  @Override
	    public Object execute() throws Exception {
	        List<JacksonJsonProvider> providers = new ArrayList<JacksonJsonProvider>();
	        providers.add(new JacksonJsonProvider());
	        WebClient webClient = WebClient.create(restLocation, providers);

	        List<Song> collection = (List<Song>) webClient.accept(MediaType.APPLICATION_JSON).getCollection(Song.class);
			List<Song> song = collection;
	        for (Song s : song) {
	            System.out.println(s.getId() + " " + s.getName() + " " + s.getgenre());
	        }
	        return null;
	    }
}
