package com.codingame.game.spell;

import com.codingame.game.Recipe;

public class DeliverySpell extends Spell {
    private int score;

    public DeliverySpell(Recipe need, int score) {
        this.recipe = new Recipe(-need.delta[0], -need.delta[1], -need.delta[2], -need.delta[3]);
        this.score = score;
    }

    @Override
    public int getScore() {
        return score;
    }

    @Override
    public boolean isRepeatable() {
        return false;
    }

}
