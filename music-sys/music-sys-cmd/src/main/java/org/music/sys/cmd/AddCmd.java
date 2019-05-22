package org.music.sys.cmd;

import java.util.Random;

import org.apache.karaf.shell.api.action.Action;
import org.apache.karaf.shell.api.action.Argument;
import org.apache.karaf.shell.api.action.Command;
import org.apache.karaf.shell.api.action.lifecycle.Reference;
import org.apache.karaf.shell.api.action.lifecycle.Service;
import org.music.sys.api.Song;
import org.music.sys.api.SongService;

@Service
@Command(scope = "music", name = "add", description = "Add a song")
public class AddCmd implements Action {
	@Reference
	private SongService songService;

	@Argument(index = 0, name = "name", description = "name song", required = true, multiValued = false)
	String name;

	@Argument(index = 1, name = "genre", description = "genre song", required = true, multiValued = false)
	String genre;

	@Override
	public Object execute() throws Exception {
		Random rd = new Random();
		int id = rd.nextInt(100);
		Song song = new Song(id, name, genre);
		songService.add(song);
		return null;
	}
}
