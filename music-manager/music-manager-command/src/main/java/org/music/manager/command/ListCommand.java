package org.music.manager.command;

import org.apache.karaf.shell.api.action.Action;
import org.apache.karaf.shell.api.action.Command;
import org.apache.karaf.shell.api.action.lifecycle.Reference;
import org.apache.karaf.shell.api.action.lifecycle.Service;
import org.apache.karaf.shell.support.table.ShellTable;
import org.music.manager.api.Song;
import org.music.manager.api.SongService;

@Service
@Command(scope = "song", name = "list", description = "List the current songs")
public class ListCommand  implements Action{
	 @Reference
	    private SongService songService;

	    @Override
	    public Object execute() throws Exception {
	        ShellTable table = new ShellTable();
	        table.column("ID");
	        table.column("Name");
	        table.column("Genre");
	        for (Song song : songService.listSong()) {
	            table.addRow().addContent(song.getId(), song.getName(), song.getGenre());
	        }
	        table.print(System.out);
	        return null;
	    }
}
