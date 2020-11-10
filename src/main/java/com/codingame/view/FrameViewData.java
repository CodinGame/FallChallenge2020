package com.codingame.view;

import java.util.List;
import java.util.Map;

public class FrameViewData {
    public List<EventData> events;
    public List<Integer> scores;

    public List<List<Integer>> playerSpells;
    public List<Integer> tomeSpells, deliveries;
    public List<int[]> inventories;

    public List<Integer> active;
    public Map<Integer, Integer> stock;
    public Map<Integer, BonusData> bonus;
    public Map<Integer, String> messages;

}
