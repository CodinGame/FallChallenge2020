package com.codingame.game;

import java.util.LinkedList;

import com.codingame.game.spell.DeliverySpell;
import com.codingame.game.spell.TomeSpell;

public class Deck {

    public LinkedList<TomeSpell> tome = new LinkedList<>();
    public LinkedList<DeliverySpell> deliveries = new LinkedList<>();

    public Deck() {
        tome.add(new TomeSpell(new Recipe(-3, 0, 0, 1)));
        tome.add(new TomeSpell(new Recipe(3, -1, 0, 0)));
        tome.add(new TomeSpell(new Recipe(1, 1, 0, 0)));
        tome.add(new TomeSpell(new Recipe(0, 0, 1, 0)));
        tome.add(new TomeSpell(new Recipe(3, 0, 0, 0)));
        tome.add(new TomeSpell(new Recipe(2, 3, -2, 0)));
        tome.add(new TomeSpell(new Recipe(2, 1, -2, 1)));
        tome.add(new TomeSpell(new Recipe(3, 0, 1, -1)));
        tome.add(new TomeSpell(new Recipe(3, -2, 1, 0)));
        tome.add(new TomeSpell(new Recipe(2, -3, 2, 0)));
        tome.add(new TomeSpell(new Recipe(2, 2, 0, -1)));
        tome.add(new TomeSpell(new Recipe(-4, 0, 2, 0)));
        tome.add(new TomeSpell(new Recipe(2, 1, 0, 0)));
        tome.add(new TomeSpell(new Recipe(4, 0, 0, 0)));
        tome.add(new TomeSpell(new Recipe(0, 0, 0, 1)));
        tome.add(new TomeSpell(new Recipe(0, 2, 0, 0)));
        tome.add(new TomeSpell(new Recipe(1, 0, 1, 0)));
        tome.add(new TomeSpell(new Recipe(-2, 0, 1, 0)));
        tome.add(new TomeSpell(new Recipe(-1, -1, 0, 1)));
        tome.add(new TomeSpell(new Recipe(0, 2, -1, 0)));
        tome.add(new TomeSpell(new Recipe(2, -2, 0, 1)));
        tome.add(new TomeSpell(new Recipe(-3, 1, 1, 0)));
        tome.add(new TomeSpell(new Recipe(0, 2, -2, 1)));
        tome.add(new TomeSpell(new Recipe(1, -3, 1, 1)));
        tome.add(new TomeSpell(new Recipe(0, 3, 0, -1)));
        tome.add(new TomeSpell(new Recipe(0, -3, 0, 2)));
        tome.add(new TomeSpell(new Recipe(1, 1, 1, -1)));
        tome.add(new TomeSpell(new Recipe(1, 2, -1, 0)));
        tome.add(new TomeSpell(new Recipe(4, 1, -1, 0)));
        tome.add(new TomeSpell(new Recipe(-5, 0, 0, 2)));
        tome.add(new TomeSpell(new Recipe(-4, 0, 1, 1)));
        tome.add(new TomeSpell(new Recipe(0, 3, 2, -2)));
        tome.add(new TomeSpell(new Recipe(1, 1, 3, -2)));
        tome.add(new TomeSpell(new Recipe(-5, 0, 3, 0)));
        tome.add(new TomeSpell(new Recipe(-2, 0, -1, 2)));
        tome.add(new TomeSpell(new Recipe(0, 0, -3, 3)));
        tome.add(new TomeSpell(new Recipe(0, -3, 3, 0)));
        tome.add(new TomeSpell(new Recipe(-3, 3, 0, 0)));
        tome.add(new TomeSpell(new Recipe(-2, 2, 0, 0)));
        tome.add(new TomeSpell(new Recipe(0, 0, -2, 2)));
        tome.add(new TomeSpell(new Recipe(0, -2, 2, 0)));
        tome.add(new TomeSpell(new Recipe(0, 0, 2, -1)));

        deliveries.add(new DeliverySpell(new Recipe(2, 2, 0, 0), 6));
        deliveries.add(new DeliverySpell(new Recipe(3, 2, 0, 0), 7));
        deliveries.add(new DeliverySpell(new Recipe(0, 4, 0, 0), 8));
        deliveries.add(new DeliverySpell(new Recipe(2, 0, 2, 0), 8));
        deliveries.add(new DeliverySpell(new Recipe(2, 3, 0, 0), 8));
        deliveries.add(new DeliverySpell(new Recipe(3, 0, 2, 0), 9));
        deliveries.add(new DeliverySpell(new Recipe(0, 2, 2, 0), 10));
        deliveries.add(new DeliverySpell(new Recipe(0, 5, 0, 0), 10));
        deliveries.add(new DeliverySpell(new Recipe(2, 0, 0, 2), 10));
        deliveries.add(new DeliverySpell(new Recipe(2, 0, 3, 0), 11));
        deliveries.add(new DeliverySpell(new Recipe(3, 0, 0, 2), 11));
        deliveries.add(new DeliverySpell(new Recipe(0, 0, 4, 0), 12));
        deliveries.add(new DeliverySpell(new Recipe(0, 2, 0, 2), 12));
        deliveries.add(new DeliverySpell(new Recipe(0, 3, 2, 0), 12));
        deliveries.add(new DeliverySpell(new Recipe(0, 2, 3, 0), 13));
        deliveries.add(new DeliverySpell(new Recipe(0, 0, 2, 2), 14));
        deliveries.add(new DeliverySpell(new Recipe(0, 3, 0, 2), 14));
        deliveries.add(new DeliverySpell(new Recipe(2, 0, 0, 3), 14));
        deliveries.add(new DeliverySpell(new Recipe(0, 0, 5, 0), 15));
        deliveries.add(new DeliverySpell(new Recipe(0, 0, 0, 4), 16));
        deliveries.add(new DeliverySpell(new Recipe(0, 2, 0, 3), 16));
        deliveries.add(new DeliverySpell(new Recipe(0, 0, 3, 2), 17));
        deliveries.add(new DeliverySpell(new Recipe(0, 0, 2, 3), 18));
        deliveries.add(new DeliverySpell(new Recipe(0, 0, 0, 5), 20));
        deliveries.add(new DeliverySpell(new Recipe(2, 1, 0, 1), 9));
        deliveries.add(new DeliverySpell(new Recipe(0, 2, 1, 1), 12));
        deliveries.add(new DeliverySpell(new Recipe(1, 0, 2, 1), 12));
        deliveries.add(new DeliverySpell(new Recipe(2, 2, 2, 0), 13));
        deliveries.add(new DeliverySpell(new Recipe(2, 2, 0, 2), 15));
        deliveries.add(new DeliverySpell(new Recipe(2, 0, 2, 2), 17));
        deliveries.add(new DeliverySpell(new Recipe(0, 2, 2, 2), 19));
        deliveries.add(new DeliverySpell(new Recipe(1, 1, 1, 1), 12));
        deliveries.add(new DeliverySpell(new Recipe(3, 1, 1, 1), 14));
        deliveries.add(new DeliverySpell(new Recipe(1, 3, 1, 1), 16));
        deliveries.add(new DeliverySpell(new Recipe(1, 1, 3, 1), 18));
        deliveries.add(new DeliverySpell(new Recipe(1, 1, 1, 3), 20));
    }
}
