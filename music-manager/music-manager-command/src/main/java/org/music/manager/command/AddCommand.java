package org.music.manager.command;

import org.apache.karaf.shell.api.action.Action;
import org.apache.karaf.shell.api.action.Argument;
import org.apache.karaf.shell.api.action.Command;
import org.apache.karaf.shell.api.action.lifecycle.Reference;
import org.apache.karaf.shell.api.action.lifecycle.Service;
import org.music.manager.api.SongService;

@Service
@Command(scope = "song", name = "add", description = "Add a booking")
public class AddCommand implements Action {

	 @Reference
	    private SongService songService;

	    @Argument(index = 0, name = "name", description = "Add Name's Song", required = true, multiValued = false)
	    String name;

	    @Argument(index = 1, name = "genre", description = "Add Genre's Song", required = true, multiValued = false)
	    String genre;

	    @Override
	    public Object execute() throws Exception {
	    	songService.addSongByName(name, genre);
	        return null;
	    }

}
