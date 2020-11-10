package com.codingame.game.action;

public abstract class Action {
    public int spellId;
    public String str;

    public static final Action NO_ACTION = new Action() {
    };

    public Action() {
        this.str = "NO_ACTION";
    }

    public String getStr() {
        return str;
    }

    public boolean isSpell() {
        return false;
    }

    public boolean isReset() {
        return false;
    }

    public boolean isWait() {
        return false;
    }

    public int getRepeats() {
        return 1;
    }

}
