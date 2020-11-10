package com.codingame.view;

import java.util.List;

public class EventData {
    public static final int LEARN = 0;
    public static final int LEARN_PAY = 6;
    public static final int NEW_DELIVERIES = 1;
    public static final int NEW_TOME_SPELLs = 2;
    public static final int PLAYER_SPELL = 3;
    public static final int DELIVERY = 4;
    public static final int RESET = 5;

    public Integer type, playerIdx, spellId, resultId, tomeIdx, acquired, lost, repeats;
    public List<SpellData> spells;
    public List<AnimationData> animData;

}
