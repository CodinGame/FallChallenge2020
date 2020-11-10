package com.codingame.view;

import com.codingame.game.Referee;
import com.codingame.gameengine.core.AbstractPlayer;
import com.codingame.gameengine.core.GameManager;
import com.codingame.gameengine.core.Module;
import com.google.inject.Inject;

public class ViewModule implements Module {

    private GameManager<AbstractPlayer> gameManager;
    private Referee referee;

    @Inject
    ViewModule(GameManager<AbstractPlayer> gameManager) {
        this.gameManager = gameManager;
        gameManager.registerModule(this);
    }

    public void setReferee(Referee referee) {
        this.referee = referee;
    }

    @Override
    public final void onGameInit() {
        sendGlobalData();
        sendFrameData();
    }

    private void sendFrameData() {
        FrameViewData data = referee.getCurrentFrameData();
        gameManager.setViewData("graphics", Serializer.serialize(data));
    }

    private void sendGlobalData() {
        GlobalViewData data = referee.getGlobalData();
        gameManager.setViewGlobalData("graphics", Serializer.serialize(data));

    }

    @Override
    public final void onAfterGameTurn() {
        sendFrameData();
    }

    @Override
    public final void onAfterOnEnd() {
    }

}
