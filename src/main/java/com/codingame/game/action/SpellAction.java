package com.codingame.game.action;

import java.util.Optional;

public class SpellAction extends Action {

    private Optional<Integer> param;

    public SpellAction(String str, int spellId, Optional<Integer> param) {
        this.str = str;
        this.spellId = spellId;
        this.param = param;
    }

    @Override
    public boolean isSpell() {
        return true;
    }

    @Override
    public int getRepeats() {
        return param.orElse(1);
    }

}
