package com.codingame.game;

import java.util.ArrayList;
import java.util.List;

import com.codingame.game.action.Action;
import com.codingame.game.spell.PlayerSpell;
import com.codingame.gameengine.core.AbstractMultiplayerPlayer;

public class Player extends AbstractMultiplayerPlayer {
    private Recipe inventory = new Recipe();
    private List<PlayerSpell> spells = new ArrayList<>();
    private Action action;
    private int deliveriesCount = 0;
    private String message;

    public Player() {
    }

    @Override
    public int getExpectedOutputLines() {
        return 1;
    }

    public void initSpells() {
        spells.add(new PlayerSpell(new Recipe(2, 0, 0, 0), this));
        spells.add(new PlayerSpell(new Recipe(-1, 1, 0, 0), this));
        spells.add(new PlayerSpell(new Recipe(0, -1, 1, 0), this));
        spells.add(new PlayerSpell(new Recipe(0, 0, -1, 1), this));
    }

    public void reset() {
        setAction(Action.NO_ACTION);
        message = null;
    }

    public String getMessage() {
        return message;
    }

    public boolean canAfford(Recipe recipe, int repeats) {
        for (int i = 0; i < Game.INGREDIENT_TYPE_COUNT; ++i) {
            if (getInventory().delta[i] + recipe.delta[i] * repeats < 0) {
                return false;
            }
        }
        return true;
    }

    public boolean enoughSpace(Recipe recipe, int repeats) {
        return recipe.getTotal() * repeats + getInventory().getTotal() <= Game.MAX_SPACE;
    }

    public boolean canDeliver(Recipe need) {
        for (int i = 0; i < Game.INGREDIENT_TYPE_COUNT; ++i) {
            if (getInventory().delta[i] + need.delta[i] < 0) {
                return false;
            }
        }
        return true;
    }

    public void addScore(int n) {
        setScore(getScore() + n);
    }

    public void addDelivery() {
        this.deliveriesCount++;
    }

    public int getDeliveriesCount() {
        return this.deliveriesCount;
    }

    public Recipe getInventory() {
        return inventory;
    }

    public List<PlayerSpell> getSpells() {
        return spells;
    }

    public Action getAction() {
        return action;
    }

    public void setAction(Action action) {
        this.action = action;
    }

    public int[] getDelta() {
        return inventory.delta;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
