package com.codingame.view;

public class SpellData {
    public int id;
    public int[] delta;
    public Boolean repeatable;
    public Integer score;

    private SpellData(int id, int[] delta, Boolean repeatable, Integer score) {
        this.id = id;
        this.delta = delta;
        this.repeatable = repeatable;
        this.score = score;
    }

    public SpellData(int id, int[] delta, boolean repeatable) {
        this(id, delta, repeatable, null);
    }

    public SpellData(int id, int[] delta, int score) {
        this(id, delta, null, score);
    }

}
