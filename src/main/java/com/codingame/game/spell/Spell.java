package com.codingame.game.spell;

import com.codingame.game.Player;
import com.codingame.game.Recipe;

public abstract class Spell {
    private static int INSTANCE_COUNT = 0;

    public Recipe recipe;
    private int id = INSTANCE_COUNT++;

    public int getId() {
        return id;
    }

    public int getScore() {
        return 0;
    }

    public int getStock() {
        return -1;
    }

    public boolean isActive() {
        return false;
    }

    public boolean isOwner(Player player) {
        return false;
    }

    public int[] getDelta() {
        return recipe.delta;
    }

    public abstract boolean isRepeatable();

    @Override
    public String toString() {
        return String.valueOf(id);
    }
}
