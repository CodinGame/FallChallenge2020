package com.codingame.game;

import com.codingame.game.spell.DeliverySpell;

public class DeliveryCompletion {
    private DeliverySpell delivery;
    private int index;

    public DeliveryCompletion(DeliverySpell delivery, int index) {
        this.delivery = delivery;
        this.index = index;
    }

    public DeliverySpell getDelivery() {
        return delivery;
    }

    public int getIndex() {
        return index;
    }

}
