package com.codingame.game;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.codingame.game.spell.Spell;
import com.codingame.gameengine.core.GameManager;
import com.google.inject.Singleton;

@Singleton
public class GameSummaryManager {
    private List<String> lines;

    public GameSummaryManager() {
        this.lines = new ArrayList<>();
    }

    public String getSummary() {
        return toString();
    }

    public void clear() {
        this.lines.clear();
    }

    public void addPlayerDelivery(Player player, DeliveryCompletion delComplete) {
        lines.add(
            String.format(
                "%s brewed potion %d and earned %d rupees\nThey have now brewed %d potions.",
                player.getNicknameToken(),
                delComplete.getDelivery().getId(),
                delComplete.getEarned(),
                player.getDeliveriesCount()
            )
        );
    }

    public void addPlayerSpellLearn(Player player, Spell spell) {
        if (spell.getStock() > 0) {
            if (player.getInventory().getTotal() >= Game.MAX_SPACE) {
                lines.add(
                    String.format(
                        "%s learnt spell %d, the taxed ingredients were lost because their inventory is full.",
                        player.getNicknameToken(),
                        spell.getId()
                    )
                );
            } else if (player.getInventory().getTotal() + spell.getStock() > Game.MAX_SPACE) {
                lines.add(
                    String.format(
                        "%s learnt spell %d and gained %d taxed ingredients, the rest was lost because their inventory is full.",
                        player.getNicknameToken(),
                        spell.getId(),
                        Game.MAX_SPACE - player.getInventory().getTotal()
                    )
                );
            } else {
                lines.add(
                    String.format(
                        "%s learnt spell %d and gained %d taxed ingredients.",
                        player.getNicknameToken(),
                        spell.getId(),
                        spell.getStock()
                    )
                );
            }
        } else {
            lines.add(
                String.format(
                    "%s learnt spell %d",
                    player.getNicknameToken(),
                    spell.getId()
                )
            );
        }
    }

    public void addPlayerSpellAction(Player player, Spell spell) {
        lines.add(
            String.format(
                "%s cast spell %d",
                player.getNicknameToken(),
                spell.getId()
            )
        );
    }

    public void addPlayerResetAction(Player player) {
        lines.add(
            String.format(
                "%s rested",
                player.getNicknameToken()
            )
        );
    }

    public void addPlayerWaitAction(Player player) {
        lines.add(
            String.format(
                "%s bided their time",
                player.getNicknameToken()
            )
        );
    }

    public void addPlayerInvalidAction(Player player, String errorMessage) {
        if (player.getAction().isReset()) {
            lines.add(
                String.format(
                    "%s attempted an invalid REST action:\n%s",
                    player.getNicknameToken(),
                    errorMessage
                )

            );
        } else {
            lines.add(
                String.format(
                    "%s attempted an invalid action:\n%s",
                    player.getNicknameToken(),
                    errorMessage
                )

            );
        }
    }

    public void addPlayerBadCommand(Player player, InvalidInputException invalidInputException) {
        lines.add(
            GameManager.formatErrorMessage(
                String.format(
                    "%s provided invalid input. Expected '%s'\nGot '%s'",
                    player.getNicknameToken(),
                    invalidInputException.getExpected(),
                    invalidInputException.getGot()
                )
            )
        );
    }

    public void addPlayerTimeout(Player player) {
        lines.add(
            GameManager.formatErrorMessage(
                String.format(
                    "%s has not provided %d lines in time.",
                    player.getNicknameToken(),
                    player.getExpectedOutputLines()
                )
            )
        );
    }

    public void addPlayerDisqualified(Player player) {
        lines.add(
            String.format(
                "%s was disqualified.",
                player.getNicknameToken()
            )
        );
    }

    @Override
    public String toString() {
        return lines.stream().collect(Collectors.joining("\n"));
    }
}