package com.codingame.view;

public class AnimationData {
    private static final int SHORT = 100;
    private static final int QUICK = 300;
    private static final int LONG = 500;

    public static final int STIR_DURATION = LONG;
    public static final int RESET_DURATION = QUICK;
    public static final int SHELF_TO_POT_DURATION = LONG;
    public static final int POT_TO_SHELF_DURATION = SHELF_TO_POT_DURATION;
    public static final int SPLASH_DURATION = LONG;
    public static final int SHELF_TO_POT_SEPERATION = SHORT;
    public static final int POT_TO_SHELF_SEPERATION = SHELF_TO_POT_SEPERATION;
    public static final int SHELF_TO_TOME_DURATION = LONG;
    public static final int SHELF_TO_TOME_SEPARATION = SHORT;
    public static final int SHELF_TO_STOCK_DURATION = QUICK;
    public static final int SHELF_TO_STOCK_SEPARATION = SHORT;
    public static final int TOME_TO_SHELF_DURATION = LONG;
    public static final int TOME_TO_SHELF_SEPARATION = SHORT;
    public static final int TOME_TO_LEARNT_DURATION = LONG;
    public static final int NEW_SPELL_DURATION = LONG;
    public static final int NEW_SPELL_SEPARATION = SHORT;
    public static final int POTION_SPAWN_DURATION = LONG;
    public static final int POTION_TO_DELIVERY_DURATION = LONG;
    public static final int DELIVERY_FADE_DURATION = LONG;

    int start, end;
    Integer trigger;
    Integer triggerEnd;

    public AnimationData(int start, int duration) {
        this.start = start;
        this.end = start + duration;
        this.trigger = null;
        this.triggerEnd = null;
    }

    public AnimationData(int start, int duration, Integer triggerAfter, Integer triggerDuration) {
        this.start = start;
        this.end = start + duration;
        this.trigger = triggerAfter == null ? null : start + triggerAfter;
        this.triggerEnd = triggerDuration == null ? null : start + triggerAfter + triggerDuration;
    }
}
