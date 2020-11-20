package com.codingame.game;

import java.util.List;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.codingame.game.action.ResetAction;
import com.codingame.game.action.SpellAction;
import com.codingame.game.action.WaitAction;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class CommandManager {
    @Inject private GameSummaryManager gameSummaryManager;

    static final Pattern PLAYER_LEARN_PATTERN = Pattern.compile(
        "^LEARN\\s+(?<id>\\d+)(?:\\s+(?<message>.*))?",
        Pattern.CASE_INSENSITIVE
    );
    static final Pattern PLAYER_BREW_PATTERN = Pattern.compile(
        "^BREW\\s+(?<id>\\d+)(?:\\s+(?<message>.*))?",
        Pattern.CASE_INSENSITIVE
    );
    static final Pattern PLAYER_CAST_PATTERN = Pattern.compile(
        "^CAST\\s+(?<id>\\d+)(?:\\s+(?<param>\\d+))?(?:\\s+(?<message>.*))?",
        Pattern.CASE_INSENSITIVE
    );

    static final Pattern PLAYER_RESET_PATTERN = Pattern.compile(
        "^REST(?:\\s+(?<message>.*))?",
        Pattern.CASE_INSENSITIVE
    );
    static final Pattern PLAYER_WAIT_PATTERN = Pattern.compile(
        "^WAIT(?:\\s+(?<message>.*))?",
        Pattern.CASE_INSENSITIVE
    );

    public void parseCommands(Player player, List<String> lines, Game game) {
        String command = lines.get(0);

        try {
            Matcher match;

            if (Game.ACTIVE_SPELLS) {
                match = PLAYER_RESET_PATTERN.matcher(command);
                if (match.matches()) {
                    player.setAction(new ResetAction());
                    matchMessage(player, match);
                    return;
                }

                match = PLAYER_CAST_PATTERN.matcher(command);
                if (match.matches()) {
                    int spellId = Integer.valueOf(match.group("id"));
                    Optional<Integer> param = Optional.ofNullable(match.group("param")).map(Integer::valueOf);
                    player.setAction(new SpellAction("CAST", spellId, param));
                    matchMessage(player, match);
                    return;
                }
            }
            if (Game.ACTIVE_TOME) {
                match = PLAYER_LEARN_PATTERN.matcher(command);
                if (match.matches()) {
                    int spellId = Integer.valueOf(match.group("id"));
                    player.setAction(new SpellAction("LEARN", spellId, Optional.empty()));
                    matchMessage(player, match);
                    return;
                }
            }
            match = PLAYER_BREW_PATTERN.matcher(command);
            if (match.matches()) {
                int spellId = Integer.valueOf(match.group("id"));
                player.setAction(new SpellAction("BREW", spellId, Optional.empty()));
                matchMessage(player, match);
                return;
            }

            match = PLAYER_WAIT_PATTERN.matcher(command);
            if (match.matches()) {
                player.setAction(new WaitAction());
                matchMessage(player, match);
                return;
            }

            throw new InvalidInputException(Game.getExpected(), command);

        } catch (InvalidInputException e) {
            deactivatePlayer(player, e.getMessage());
            gameSummaryManager.addPlayerBadCommand(player, e);
            gameSummaryManager.addPlayerDisqualified(player);
        } catch (Exception e) {
            InvalidInputException invalidInputException = new InvalidInputException(Game.getExpected(), e.toString());
            deactivatePlayer(player, invalidInputException.getMessage());
            gameSummaryManager.addPlayerBadCommand(player, invalidInputException);
            gameSummaryManager.addPlayerDisqualified(player);
        }

    }

    public void deactivatePlayer(Player player, String message) {
        player.deactivate(escapeHTMLEntities(message));
        player.setScore(-1);
    }

    private String escapeHTMLEntities(String message) {
        return message
            .replace("&lt;", "<")
            .replace("&gt;", ">");
    }

    private void matchMessage(Player player, Matcher match) {
        String message = match.group("message");
        if (message != null) {
            if (message.length() > 48) {
                message = message.substring(0, 46) + "...";
            }
            player.setMessage(message);
        }
    }
}
