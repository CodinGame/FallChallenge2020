package com.codingame.game.spell;

import com.codingame.game.Player;
import com.codingame.game.Recipe;

public class PlayerSpell extends Spell {

    private boolean active;
    private boolean repeatable;
    public Player owner;

    private PlayerSpell(Recipe recipe, Player owner, boolean repeatable) {
        this.recipe = recipe;
        this.active = true;
        this.owner = owner;
        this.repeatable = repeatable;
    }

    public PlayerSpell(Recipe recipe, Player owner) {
        this(recipe, owner, false);
    }

    public PlayerSpell(TomeSpell learnt, Player owner) {
        this(new Recipe(learnt.recipe), owner, learnt.isRepeatable());
    }

    @Override
    public boolean isActive() {
        return active;
    }

    @Override
    public boolean isOwner(Player player) {
        return player == owner;
    }

    @Override
    public boolean isRepeatable() {
        return repeatable;
    }

    public void activate() {
        active = true;
    }

    public void deactivate() {
        active = false;
    }

}
