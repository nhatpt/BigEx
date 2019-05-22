package org.music.sys.cmd;


import org.apache.karaf.shell.api.action.Action;
import org.apache.karaf.shell.api.action.Command;
import org.apache.karaf.shell.api.action.lifecycle.Reference;
import org.apache.karaf.shell.api.action.lifecycle.Service;
import org.apache.karaf.shell.support.table.ShellTable;
import org.music.sys.api.Song;
import org.music.sys.api.SongService;

@Service
@Command(scope = "music", name = "list", description = "List a song")
public class ListCmd implements Action{

	  @Reference
	    private SongService songService;

	    @Override
	    public Object execute() throws Exception {
	        ShellTable table = new ShellTable();
	        table.column("ID");
	        table.column("Name");
	        table.column("Genre");
	        for (Song s : songService.list()) {
	            table.addRow().addContent(s.getId(), s.getName(), s.getgenre());
	        }
	        table.print(System.out);
	        return null;
	    }

}
