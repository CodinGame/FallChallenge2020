package com.codingame.game;

import java.util.List;
import java.util.stream.Collectors;

import com.codingame.game.spell.Spell;
import com.codingame.gameengine.core.AbstractPlayer.TimeoutException;
import com.codingame.gameengine.core.AbstractReferee;
import com.codingame.gameengine.core.MultiplayerGameManager;
import com.codingame.gameengine.module.endscreen.EndScreenModule;
import com.codingame.view.FrameViewData;
import com.codingame.view.GlobalViewData;
import com.codingame.view.SpellData;
import com.codingame.view.ViewModule;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class Referee extends AbstractReferee {

    private static final int MAX_TURNS = 100;
    @Inject private MultiplayerGameManager<Player> gameManager;
    @Inject private CommandManager commandManager;
    @Inject private Game game;
    @Inject private EndScreenModule eem;
    @Inject private ViewModule viewModule;
    @Inject private GameSummaryManager gameSummaryManager;

    long seed;

    int maxFrames;

    @Override
    public void init() {
        viewModule.setReferee(this);
        this.seed = gameManager.getSeed();

        maxFrames = MAX_TURNS;

        try {
            gameManager.setFrameDuration(500);
            gameManager.setMaxTurns(MAX_TURNS);
            gameManager.setTurnMaxTime(50);

            game.init(seed);
            sendGlobalInfo();

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Referee failed to initialize");
            abort();
        }
    }

    private void abort() {
        System.err.println("Unexpected game end");
        gameManager.endGame();
    }

    private void sendGlobalInfo() {
        for (Player player : gameManager.getActivePlayers()) {
            for (String line : game.getGlobalInfoFor(player)) {
                player.sendInputLine(line);
            }
        }
    }

    @Override
    public void gameTurn(int turn) {
        game.resetGameTurnData();

        // Give input to players
        for (Player player : gameManager.getActivePlayers()) {
            for (String line : game.getCurrentFrameInfoFor(player)) {
                player.sendInputLine(line);
            }
            player.execute();
        }
        // Get output from players
        handlePlayerCommands();

        game.performGameUpdate();
    }

    private void handlePlayerCommands() {
        for (Player player : gameManager.getActivePlayers()) {
            try {
                commandManager.parseCommands(player, player.getOutputs(), game);
            } catch (TimeoutException e) {
                commandManager.deactivatePlayer(player, "Timeout!");
                gameSummaryManager.addPlayerTimeout(player);
                gameSummaryManager.addPlayerDisqualified(player);
            }
        }

    }

    @Override
    public void onEnd() {
        eem.setTitleRankingsSprite("logo.png");

        game.onEnd();

        int scores[] = gameManager.getPlayers().stream()
            .mapToInt(Player::getScore)
            .toArray();

        eem.setScores(scores);
    }

    private List<SpellData> getPlayerSpellData(Player p) {
        return p.getSpells().stream()
            .map(
                spell -> new SpellData(spell.getId(), spell.getDelta(), spell.isRepeatable())
            )
            .collect(Collectors.toList());
    }

    public FrameViewData getCurrentFrameData() {
        FrameViewData data = new FrameViewData();
        data.events = game.getViewerEvents();
        data.scores = gameManager.getPlayers().stream()
            .map(Player::getScore)
            .collect(Collectors.toList());

        data.playerSpells = gameManager.getPlayers().stream()
            .map(
                player -> player.getSpells().stream()
                    .map(Spell::getId)
                    .collect(Collectors.toList())
            )
            .collect(Collectors.toList());

        data.tomeSpells = game.getTome().stream()
            .map(Spell::getId)
            .collect(Collectors.toList());

        data.deliveries = game.getDeliveries().stream()
            .map(Spell::getId)
            .collect(Collectors.toList());

        data.inventories = gameManager.getPlayers().stream()
            .map(Player::getDelta)
            .collect(Collectors.toList());

        data.active = gameManager.getPlayers().stream()
            .flatMap(p -> p.getSpells().stream())
            .filter(Spell::isActive)
            .map(Spell::getId)
            .collect(Collectors.toList());

        data.stock = game.getTome().stream()
            .filter(sp -> sp.getStock() > 0)
            .collect(
                Collectors.toMap(
                    Spell::getId, Spell::getStock
                )
            );

        data.bonus = game.getBonusData();
        data.messages = gameManager.getPlayers().stream()
            .filter(player -> player.getMessage() != null)
            .collect(Collectors.toMap(Player::getIndex, Player::getMessage));

        return data;
    }

    public GlobalViewData getGlobalData() {
        GlobalViewData data = new GlobalViewData();

        data.playerSpells = gameManager.getPlayers().stream()
            .map(this::getPlayerSpellData)
            .collect(Collectors.toList());

        data.tomeSpells = game.getTome().stream()
            .map(
                spell -> new SpellData(spell.getId(), spell.getDelta(), spell.isRepeatable())
            )
            .collect(Collectors.toList());

        data.deliveries = game.getDeliveries().stream()
            .map(
                spell -> new SpellData(spell.getId(), spell.getDelta(), spell.getScore())
            )
            .collect(Collectors.toList());
        return data;
    }
}
