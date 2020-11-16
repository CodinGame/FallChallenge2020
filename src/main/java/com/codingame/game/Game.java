
package com.codingame.game;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Random;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import com.codingame.game.action.Action;
import com.codingame.game.spell.DeliverySpell;
import com.codingame.game.spell.PlayerSpell;
import com.codingame.game.spell.Spell;
import com.codingame.game.spell.SpellType;
import com.codingame.game.spell.TomeSpell;
import com.codingame.gameengine.core.MultiplayerGameManager;
import com.codingame.gameengine.core.Tooltip;
import com.codingame.view.AnimationData;
import com.codingame.view.BonusData;
import com.codingame.view.EventData;
import com.codingame.view.SpellData;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class Game {

    public static final int READ_AHEAD_COST = 1;
    public static final int STARTING_SCORE = 0;
    public static final int MAX_SPACE = 10;
    public static final int INGREDIENT_TYPE_COUNT = 4;
    public static final int COUNTER_SIZE = 5;
    public static final int TOME_SIZE = 6;

    public static int[] STARTING_INGREDIENT_COUNT;
    public static int DELIVERY_GOAL;
    public static boolean ACTIVE_TOME;
    public static boolean ACTIVE_SPELLS;
    public static boolean ACTIVE_BONUS;
    public static boolean INVENTORY_BONUS;

    @Inject private MultiplayerGameManager<Player> gameManager;
    @Inject private GameSummaryManager gameSummaryManager;

    private List<TomeSpell> tome;
    private List<DeliverySpell> deliveries;
    private List<DeliverySpell> newDeliveries;
    private List<TomeSpell> newTomeSpells;
    private Random random;
    private int[] tomeStockGain;
    private Deck deck;
    private int[] bonus;
    private int[] bonusValue = new int[] { 3, 1 };
    private int frameDuration;
    Set<TomeSpell> learntSpells = new HashSet<>();
    Set<DeliveryCompletion> delivered = new HashSet<>();
    private List<EventData> viewerEvents;

    private void slideBonus() {
        if (bonus[0] <= 0) {
            bonus[0] = bonus[1];
            bonus[1] = 0;
            bonusValue[0] = 1;
            bonusValue[1] = 0;
        }
    }

    private int getScoreOf(DeliverySpell delivery) {
        int index = deliveries.indexOf(delivery);
        int bonusScore = 0;
        if (index < 2) {
            if (bonus[index] > 0) {
                bonusScore = bonusValue[index];
            }
        }

        return delivery.getScore() + bonusScore;
    }

    public void init(long seed) {
        deck = new Deck();

        switch (gameManager.getLeagueLevel()) {
        case 1:
            // Wood 2
            STARTING_INGREDIENT_COUNT = new int[] { 2, 2, 3, 3 };
            DELIVERY_GOAL = 2;
            ACTIVE_TOME = false;
            ACTIVE_SPELLS = false;
            ACTIVE_BONUS = false;
            INVENTORY_BONUS = false;
            deck.deliveries.stream()
                .filter(del -> {
                    return IntStream.of(del.getDelta())
                        .anyMatch(count -> count < -1);
                })
                .forEach(del -> {
                    for (int i = 0; i < INGREDIENT_TYPE_COUNT; ++i) {
                        del.getDelta()[i] /= 2;
                    }
                });
            Set<Recipe> deltas = new HashSet<>();
            deck.deliveries = deck.deliveries.stream()
                .filter(del -> deltas.add(del.recipe))
                .collect(Collectors.toCollection(LinkedList::new));
            break;
        case 2:
            // Wood 1
            STARTING_INGREDIENT_COUNT = new int[] { 3, 0, 0, 0 };
            DELIVERY_GOAL = 3;
            ACTIVE_TOME = false;
            ACTIVE_SPELLS = true;
            ACTIVE_BONUS = false;
            INVENTORY_BONUS = true;
            break;
        default:
            // Bronze+
            STARTING_INGREDIENT_COUNT = new int[] { 3, 0, 0, 0 };
            DELIVERY_GOAL = 6;
            ACTIVE_TOME = true;
            ACTIVE_SPELLS = true;
            ACTIVE_BONUS = true;
            INVENTORY_BONUS = true;
        }

        bonus = ACTIVE_BONUS ? new int[] { 4, 4 } : new int[] { 0, 0 };
        viewerEvents = new ArrayList<>();
        random = new Random(seed);

        Collections.shuffle(deck.tome, random);
        Collections.shuffle(deck.deliveries, random);

        tome = new ArrayList<>();
        deliveries = new ArrayList<>();
        newDeliveries = new ArrayList<>();
        newTomeSpells = new ArrayList<>();
        tomeStockGain = new int[Game.TOME_SIZE];

        if (ACTIVE_TOME) {
            for (int i = 0; i < TOME_SIZE; ++i) {
                tome.add(deck.tome.poll());
                tomeStockGain[i] = 0;
            }
        }
        for (int i = 0; i < COUNTER_SIZE; ++i) {
            deliveries.add(deck.deliveries.poll());
        }

        for (Player p : gameManager.getPlayers()) {
            for (int i = 0; i < INGREDIENT_TYPE_COUNT; ++i) {
                p.getInventory().delta[i] = STARTING_INGREDIENT_COUNT[i];
            }
            p.setScore(STARTING_SCORE);
            if (ACTIVE_SPELLS) {
                p.initSpells();
            }
        }
    }

    public int getBonusValue(DeliverySpell spell) {
        if (getBonusAmount(spell) == 0) {
            return 0;
        }

        int index = deliveries.indexOf(spell);

        if (index < 0 || index > 1) {
            return 0;
        }

        return bonusValue[index];
    }

    public int getBonusAmount(DeliverySpell spell) {
        int index = deliveries.indexOf(spell);

        if (index < 0 || index > 1) {
            return 0;
        }

        return bonus[index];
    }

    public List<String> getCurrentFrameInfoFor(Player player) {

        Player foe = gameManager.getPlayer(1 - player.getIndex());
        List<String> lines = new ArrayList<>();
        lines.add(
            String.valueOf(
                deliveries.size() + tome.size() + player.getSpells().size() + foe.getSpells().size()
            )
        );

        deliveries.stream()
            .forEach(spell -> {
                lines.add(
                    String.format(
                        "%d %s %s %d %d %d %d %d",
                        spell.getId(),
                        SpellType.BREW.name(),
                        spell.recipe.toPlayerString(),
                        getScoreOf(spell),
                        getBonusValue(spell),
                        getBonusAmount(spell),
                        spell.isActive() ? 1 : 0,
                        spell.isRepeatable() ? 1 : 0

                    )
                );
            });

        Stream.of(
            tome,
            player.getSpells(),
            foe.getSpells()
        )
            .flatMap(Collection::stream)
            .forEach(spell -> {
                lines.add(
                    String.format(
                        "%d %s %s %d %d %d %d %d",
                        spell.getId(),
                        getSpellType(spell, player).name(),
                        spell.recipe.toPlayerString(),
                        getScoreOf(spell),
                        tome.indexOf(spell),
                        spell.getStock(),
                        spell.isActive() ? 1 : 0,
                        spell.isRepeatable() ? 1 : 0

                    )
                );
            });

        // scores
        Stream.of(player, foe).forEach(p -> {
            lines.add(String.format("%s %d", p.getInventory().toPlayerString(), p.getScore()));
        });

        return lines;
    }

    private int getScoreOf(Spell spell) {
        if (spell instanceof DeliverySpell) {
            return getScoreOf((DeliverySpell) spell);
        }
        return spell.getScore();
    }

    private SpellType getSpellType(Spell spell, Player player) {
        if (spell instanceof TomeSpell) {
            return SpellType.LEARN;
        } else if (spell instanceof DeliverySpell) {
            return SpellType.BREW;
        } else {
            if (spell.isOwner(player)) {
                return SpellType.CAST;
            } else {
                return SpellType.OPPONENT_CAST;

            }
        }
    }

    public void checkSpellActionType(Action action, SpellType type) throws GameException {
        String expectedStr = null;

        switch (type) {
        case LEARN:
            expectedStr = "LEARN";
            break;
        case CAST:
            expectedStr = "CAST";
            break;
        case BREW:
            expectedStr = "BREW";
            break;
        case OPPONENT_CAST:
            throw new GameException("Tried to cast an opponent's spell...");
        }

        if (!action.getStr().equals(expectedStr)) {
            throw new GameException(String.format("Command does not match action, expected '%s' but got '%s'", expectedStr, action.getStr()));
        }
    }

    public void performGameUpdate() {
        for (Player player : gameManager.getPlayers()) {
            Optional<Spell> optSpell = Optional.empty();
            try {
                Action action = player.getAction();
                if (action.isSpell()) {
                    int id = action.spellId;
                    optSpell = getSpellById(id);
                    if (optSpell.isPresent()) {
                        Spell spell = optSpell.get();
                        checkSpellActionType(action, getSpellType(spell, player));
                        if (spell instanceof TomeSpell) {
                            doLearn(player, (TomeSpell) spell);
                            gameSummaryManager.addPlayerSpellLearn(player, spell);
                        } else if (spell instanceof DeliverySpell) {
                            DeliveryCompletion delComplete = doDelivery(player, (DeliverySpell) spell);
                            gameManager.addTooltip(
                                new Tooltip(
                                    player.getIndex(),
                                    String.format(
                                        "%s made a delivery!",
                                        player.getNicknameToken()
                                    )
                                )
                            );
                            gameSummaryManager.addPlayerDelivery(player, delComplete);
                        } else if (spell instanceof PlayerSpell) {
                            doPlayerSpell(player, (PlayerSpell) spell);
                            gameSummaryManager.addPlayerSpellAction(player, spell);
                        }
                    } else {
                        throw new GameException(String.format("Spell with id %d does not exist", id));
                    }
                } else if (action.isReset()) {
                    doReset(player);
                    gameSummaryManager.addPlayerResetAction(player);
                } else if (action.isWait()) {
                    gameSummaryManager.addPlayerWaitAction(player);
                }
            } catch (GameException gameException) {
                gameSummaryManager.addPlayerInvalidAction(player, gameException.getMessage());
            }

        }

        for (TomeSpell spell : learntSpells) {
            tome.remove(spell);
            if (!deck.tome.isEmpty()) {
                TomeSpell newSpell = deck.tome.poll();
                tome.add(newSpell);
                newTomeSpells.add(newSpell);
            }
        }

        for (DeliveryCompletion delCompletion : delivered) {
            if (delCompletion.getIndex() < bonus.length) {
                if (bonus[delCompletion.getIndex()] > 0) {
                    bonus[delCompletion.getIndex()]--;
                }
            }
        }
        delivered.stream()
            .map(DeliveryCompletion::getDelivery)
            .distinct()
            .forEach(delivery -> {
                deliveries.remove(delivery);

                if (!deck.deliveries.isEmpty()) {
                    DeliverySpell newDelivery = deck.deliveries.poll();
                    deliveries.add(newDelivery);
                    newDeliveries.add(newDelivery);
                }
            });

        slideBonus();

        for (int i = 0; i < tome.size(); i++) {
            tome.get(i).stock += tomeStockGain[i];
            tomeStockGain[i] = 0;
        }

        computeEvents();

        if (gameOver()) {
            gameManager.endGame();
        }

        gameManager.addToGameSummary(gameSummaryManager.getSummary());
    }

    private void chainAnims(
        int count, List<AnimationData> animData, int[] timeArray, int timeIdx, int duration, int separation, Integer triggerAfter, int triggerDuration
    ) {
        for (int i = 0; i < count; ++i) {
            animData.add(new AnimationData(timeArray[timeIdx], duration, triggerAfter, triggerDuration));

            if (i < count - 1) {
                timeArray[timeIdx] += separation;
            }
        }
        if (count > 0) {
            timeArray[timeIdx] += duration;
        }
    }

    private void chainAnims(int count, List<AnimationData> animData, int[] timeArray, int timeIdx, int duration, int separation) {
        for (int i = 0; i < count; ++i) {
            animData.add(new AnimationData(timeArray[timeIdx], duration));

            if (i < count - 1) {
                timeArray[timeIdx] += separation;
            }
        }
        if (count > 0) {
            timeArray[timeIdx] += duration;
        }
    }

    private void computeEvents() {
        int[] playerTime = new int[] { 0, 0 };

        Integer lastTriggerEnd = null;
        ArrayList<EventData> learnEvents = new ArrayList<>();

        for (EventData event : viewerEvents) {
            if (event.type == EventData.PLAYER_SPELL) {
                Spell spell = getSpellById(event.spellId).get();
                event.animData = new ArrayList<>();

                int loss = spell.recipe.getTotalLoss() * event.repeats;
                int gain = spell.recipe.getTotalGain() * event.repeats;

                chainAnims(
                    loss, event.animData, playerTime, event.playerIdx, AnimationData.SHELF_TO_POT_DURATION, AnimationData.SHELF_TO_POT_SEPERATION,
                    AnimationData.SHELF_TO_POT_DURATION, AnimationData.SPLASH_DURATION
                );
                waitForAnim(event.animData, playerTime, event.playerIdx, AnimationData.STIR_DURATION);
                chainAnims(
                    gain, event.animData, playerTime, event.playerIdx, AnimationData.POT_TO_SHELF_DURATION, AnimationData.POT_TO_SHELF_SEPERATION
                );

            } else if (event.type == EventData.DELIVERY) {
                Spell spell = getSpellById(event.spellId).get();
                event.animData = new ArrayList<>();

                int loss = spell.recipe.getTotalLoss();
                chainAnims(
                    loss, event.animData, playerTime, event.playerIdx, AnimationData.SHELF_TO_POT_DURATION, AnimationData.SHELF_TO_POT_SEPERATION,
                    AnimationData.SHELF_TO_POT_DURATION, AnimationData.SPLASH_DURATION
                );
                lastTriggerEnd = playerTime[event.playerIdx] + AnimationData.SPLASH_DURATION;
                waitForAnim(event.animData, playerTime, event.playerIdx, AnimationData.STIR_DURATION);
                waitForAnim(event.animData, playerTime, event.playerIdx, AnimationData.POTION_SPAWN_DURATION);
                waitForAnim(event.animData, playerTime, event.playerIdx, AnimationData.POTION_TO_DELIVERY_DURATION);
                waitForAnim(event.animData, playerTime, event.playerIdx, AnimationData.DELIVERY_FADE_DURATION);

            } else if (event.type == EventData.LEARN) {
                event.animData = new ArrayList<>();
                chainAnims(
                    event.tomeIdx, event.animData, playerTime, event.playerIdx, AnimationData.SHELF_TO_STOCK_DURATION,
                    AnimationData.SHELF_TO_STOCK_SEPARATION
                );
                waitForAnim(event.animData, playerTime, event.playerIdx, AnimationData.TOME_TO_LEARNT_DURATION);
                chainAnims(
                    event.acquired + event.lost, event.animData, playerTime, event.playerIdx, AnimationData.TOME_TO_SHELF_DURATION,
                    AnimationData.TOME_TO_SHELF_DURATION
                );

                learnEvents.add(event);
            } else if (event.type == EventData.RESET) {
                event.animData = new ArrayList<>();
                waitForAnim(event.animData, playerTime, event.playerIdx, AnimationData.RESET_DURATION);
            }
        }

        if (learnEvents.size() >= 2) {
            int currentTime = IntStream.of(playerTime).max().getAsInt();
            Arrays.fill(playerTime, currentTime);
        }

        if (!learnEvents.isEmpty()) {
            EventData newTomeSpellsEvent = new EventData();
            newTomeSpellsEvent.type = EventData.NEW_TOME_SPELLs;
            newTomeSpellsEvent.animData = new ArrayList<>();

            newTomeSpellsEvent.spells = newTomeSpells.stream()
                .map(newTomeSpell -> new SpellData(newTomeSpell.getId(), newTomeSpell.getDelta(), newTomeSpell.isRepeatable()))
                .collect(Collectors.toList());

            viewerEvents.add(newTomeSpellsEvent);

            learnEvents.stream().forEach(learnEvent -> {
                chainAnims(
                    1, newTomeSpellsEvent.animData, playerTime, learnEvent.playerIdx, AnimationData.NEW_SPELL_DURATION,
                    AnimationData.NEW_SPELL_SEPARATION
                );
            });
        }

        learnEvents.forEach(learnEvent -> {
            EventData newLearnPayEvent = new EventData();

            newLearnPayEvent.type = EventData.LEARN_PAY;
            newLearnPayEvent.animData = new ArrayList<>();
            newLearnPayEvent.playerIdx = learnEvent.playerIdx;
            newLearnPayEvent.tomeIdx = learnEvent.tomeIdx;

            viewerEvents.add(newLearnPayEvent);

            chainAnims(
                learnEvent.tomeIdx, newLearnPayEvent.animData, playerTime, learnEvent.playerIdx, AnimationData.SHELF_TO_TOME_DURATION,
                AnimationData.SHELF_TO_TOME_SEPARATION
            );
        });

        int currentTime = IntStream.of(playerTime).max().getAsInt();

        if (lastTriggerEnd != null && lastTriggerEnd > currentTime) {
            currentTime = lastTriggerEnd;
        }

        int[] postTurnEventsTime = new int[] { currentTime, currentTime };
        int newDeliveriesTimeIdx = 0;

        if (!newDeliveries.isEmpty()) {
            EventData newDeliveriesEvent = new EventData();
            newDeliveriesEvent.type = EventData.NEW_DELIVERIES;
            newDeliveriesEvent.animData = new ArrayList<>();
            newDeliveriesEvent.spells = newDeliveries.stream()
                .map(newDelivery -> new SpellData(newDelivery.getId(), newDelivery.getDelta(), newDelivery.getScore()))
                .collect(Collectors.toList());

            viewerEvents.add(newDeliveriesEvent);

            chainAnims(
                newDeliveries.size(), newDeliveriesEvent.animData, postTurnEventsTime, newDeliveriesTimeIdx, AnimationData.NEW_SPELL_DURATION,
                AnimationData.NEW_SPELL_SEPARATION
            );

            currentTime = IntStream.of(postTurnEventsTime).max().getAsInt();
        }

        int minTime = 1000;

        frameDuration = Math.max(
            currentTime,
            minTime
        );
        gameManager.setFrameDuration(frameDuration);

    }

    private void waitForAnim(List<AnimationData> eventAnimData, int[] playerTime, Integer playerIdx, int duration) {
        eventAnimData.add(new AnimationData(playerTime[playerIdx], duration));
        playerTime[playerIdx] += duration;
    }

    private boolean gameOver() {
        if (gameManager.getActivePlayers().size() <= 1) {
            return true;
        }
        for (Player player : gameManager.getPlayers()) {
            if (player.getDeliveriesCount() >= DELIVERY_GOAL) {
                return true;
            }
        }
        return false;
    }

    private Optional<Spell> getSpellById(int id) {
        return Stream.of(
            deliveries.stream(),
            tome.stream(),
            delivered.stream()
                .map(del -> del.getDelivery()),
            gameManager.getPlayers().stream()
                .flatMap(p -> p.getSpells().stream())
        )
            .flatMap(Function.identity())
            .filter(spell -> spell.getId() == id)
            .findFirst();
    }

    private void doReset(Player p) throws GameException {
        if (p.getSpells().stream().allMatch(spell -> spell.isActive())) {
            throw new GameException("All spells are already castable");
        }
        p.getSpells().stream().forEach(PlayerSpell::activate);

        EventData e = new EventData();
        e.type = EventData.RESET;
        e.playerIdx = p.getIndex();
        viewerEvents.add(e);

    }

    private DeliveryCompletion doDelivery(Player p, DeliverySpell del) throws GameException {
        if (!p.canDeliver(del.recipe)) {
            throw new GameException("Not enough ingredients for order " + del.getId());
        }
        for (int i = 0; i < INGREDIENT_TYPE_COUNT; ++i) {
            p.getInventory().add(i, del.recipe.delta[i]);
        }
        DeliveryCompletion delCompletion = new DeliveryCompletion(del, deliveries.indexOf(del), getScoreOf(del));
        delivered.add(delCompletion);
        p.addDelivery();
        p.addScore(getScoreOf(del));

        EventData e = new EventData();
        e.type = EventData.DELIVERY;
        e.playerIdx = p.getIndex();
        e.spellId = del.getId();
        viewerEvents.add(e);
        return delCompletion;
    }

    private void doLearn(Player p, TomeSpell spell) throws GameException {
        int index = tome.indexOf(spell);
        if (p.getInventory().delta[0] < index * READ_AHEAD_COST) {
            throw new GameException("Not enough ingredients to learn " + spell.getId());
        }
        for (int i = 0; i < index; ++i) {
            tomeStockGain[i] += READ_AHEAD_COST;
            p.getInventory().delta[0] -= READ_AHEAD_COST;
        }
        PlayerSpell learnt = new PlayerSpell(spell, p);
        p.getSpells().add(learnt);

        int maxToGet = MAX_SPACE - p.getInventory().getTotal();
        int ingredientsGot = Math.min(maxToGet, spell.stock);
        p.getInventory().delta[0] += ingredientsGot;

        learntSpells.add(spell);

        EventData e = new EventData();
        e.type = EventData.LEARN;
        e.playerIdx = p.getIndex();
        e.spellId = spell.getId();
        e.resultId = learnt.getId();
        e.tomeIdx = index;
        e.acquired = ingredientsGot;
        e.lost = spell.stock - ingredientsGot;
        viewerEvents.add(e);
    }

    private void doPlayerSpell(Player p, PlayerSpell spell) throws GameException {
        int repeats = p.getAction().getRepeats();
        if (repeats < 1) {
            throw new GameException("Repeat can't be zero (on " + spell.getId() + ")");
        }
        if (repeats > 1 && !spell.isRepeatable()) {
            throw new GameException("Spell " + spell.getId() + " is not repeatable");
        }
        if (!spell.isActive()) {
            throw new GameException("Spell " + spell.getId() + " is exhausted");
        }
        if (!p.canAfford(spell.recipe, repeats)) {
            throw new GameException("Not enough ingredients for spell " + spell.getId());
        }
        if (!p.enoughSpace(spell.recipe, repeats)) {
            throw new GameException("Not enough space in inventory for spell " + spell.getId());
        }

        //do spell
        for (int k = 0; k < repeats; ++k) {
            for (int i = 0; i < INGREDIENT_TYPE_COUNT; ++i) {
                p.getInventory().add(i, spell.getDelta()[i]);
            }
        }
        spell.deactivate();

        EventData e = new EventData();
        e.type = EventData.PLAYER_SPELL;
        e.playerIdx = p.getIndex();
        e.spellId = spell.getId();
        e.repeats = repeats;
        viewerEvents.add(e);

    }

    public List<String> getGlobalInfoFor(Player player) {
        return Collections.emptyList();
    }

    public void resetGameTurnData() {
        gameManager.getPlayers().stream().forEach(Player::reset);
        gameSummaryManager.clear();
        learntSpells.clear();
        delivered.clear();
        viewerEvents.clear();
        newDeliveries.clear();
    }

    public List<EventData> getViewerEvents() {
        return viewerEvents;
    }

    public List<TomeSpell> getTome() {
        return tome;
    }

    public List<DeliverySpell> getDeliveries() {
        return deliveries;
    }

    public static String getExpected() {
        if (!Game.ACTIVE_SPELLS) {
            return "BREW <id> | WAIT";
        }
        if (!Game.ACTIVE_TOME) {
            return "BREW <id> | CAST <id> | REST | WAIT";
        }
        return "BREW <id> | CAST <id> [<repeat>] | LEARN <id> | REST | WAIT";
    }

    public void onEnd() {
        if (INVENTORY_BONUS) {
            for (Player player : gameManager.getActivePlayers()) {
                for (int i = 1; i < INGREDIENT_TYPE_COUNT; i++) {
                    player.addScore(player.getInventory().delta[i]);
                }
            }
        }
    }

    public Map<Integer, BonusData> getBonusData() {
        Map<Integer, BonusData> bonusData = new HashMap<>();
        for (int i = 0; i < 2; ++i) {
            if (bonus[i] > 0) {
                bonusData.put(i, new BonusData(bonus[i], bonusValue[i]));
            }
        }

        return bonusData;
    }
}
