package com.codingame.view;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Serializer {
    static private String nullString = "_";
    static private String mainSeparator = "\n";
    static private String defaultSeparator = " ";

    static private String join(String separator, IntStream stream) {
        return stream.mapToObj(String::valueOf).collect(Collectors.joining(separator));
    }

    static private String join(IntStream stream) {
        return join(defaultSeparator, stream);
    }

    static private String join(String separator, Stream<? extends Object> stream) {
        return stream.map(obj -> obj == null ? nullString : String.valueOf(obj)).collect(Collectors.joining(separator));
    }

    static private String join(String separator, Object... args) {
        return join(separator, Stream.of(args));
    }

    static private String join(Object... args) {
        return join(defaultSeparator, args);
    }

    static private String join(Collection<? extends Object> collection) {
        return join(defaultSeparator, collection.stream());
    }

    static private String joinMap(String separator, Map<? extends Object, ? extends Object> map) {
        return map.entrySet().stream()
            .map(entry -> join(entry.getKey(), entry.getValue()))
            .collect(Collectors.joining(separator));
    }

    static private String joinMap(Map<? extends Object, ? extends Object> map) {
        return joinMap(defaultSeparator, map);
    }

    static private String animsSerialize(List<AnimationData> anims) {
        if (anims == null || anims.size() <= 0) {
            return "0";
        }

        return join(
            anims.size(),
            anims.stream()
                .map(
                    anim -> join(
                        anim.start,
                        anim.end,
                        anim.trigger,
                        anim.triggerEnd
                    )
                )
                .collect(Collectors.joining(defaultSeparator))
        );
    }

    static private String spellsSerialize(List<SpellData> spells) {
        if (spells == null || spells.size() <= 0) {
            return "0";
        }

        return join(
            spells.size(),
            spells.stream()
                .map(
                    spell -> join(
                        spell.id,
                        join(Arrays.stream(spell.delta)),
                        spell.repeatable,
                        spell.score
                    )
                )
                .collect(Collectors.joining(defaultSeparator))
        );
    }

    static private String spellsListsSerialize(List<List<SpellData>> spellsLists) {
        if (spellsLists == null || spellsLists.size() <= 0) {
            return "0";
        }

        return join(
            mainSeparator,
            spellsLists.size(),
            spellsLists.stream()
                .map(spells -> spellsSerialize(spells))
                .collect(Collectors.joining(mainSeparator))
        );
    }

    static private String eventsSerialize(List<EventData> events) {
        if (events == null || events.size() == 0) {
            return "0";
        }

        return join(
            mainSeparator,
            events.size(),
            events.stream()
                .map(
                    event -> join(
                        mainSeparator,
                        join(
                            event.type,
                            event.playerIdx,
                            event.spellId,
                            event.resultId,
                            event.tomeIdx,
                            event.acquired,
                            event.lost
                        ),
                        spellsSerialize(event.spells),
                        animsSerialize(event.animData)
                    )
                )
                .collect(Collectors.joining(mainSeparator))
        );
    }

    static private String playerSpellsSerialize(List<List<Integer>> playerSpells) {
        if (playerSpells == null || playerSpells.size() == 0) {
            return "0";
        }

        return join(
            mainSeparator,
            playerSpells.size(),
            playerSpells.stream()
                .map(spellsIds -> join(spellsIds))
                .collect(Collectors.joining(mainSeparator))
        );
    }

    static private String inventoriesSerialize(List<int[]> inventories) {
        if (inventories == null || inventories.size() == 0) {
            return "0";
        }

        return join(
            mainSeparator,
            inventories.size(),
            inventories.stream()
                .map(inventory -> join(Arrays.stream(inventory)))
                .collect(Collectors.joining(mainSeparator))
        );
    }

    private static Object bonusSerialize(Map<Integer, BonusData> bonus) {
        return bonus.entrySet().stream()
            .map(
                entry -> join(
                    defaultSeparator,
                    entry.getKey(),
                    join(",", entry.getValue().value, entry.getValue().amount)
                )
            )
            .collect(Collectors.joining(defaultSeparator));
    }

    static public String serialize(FrameViewData frameViewData) {
        return join(
            mainSeparator,
            eventsSerialize(frameViewData.events),
            join(frameViewData.scores),
            playerSpellsSerialize(frameViewData.playerSpells),
            join(frameViewData.tomeSpells),
            join(frameViewData.deliveries),
            inventoriesSerialize(frameViewData.inventories),
            join(frameViewData.active),
            joinMap(frameViewData.stock),
            bonusSerialize(frameViewData.bonus),
            joinMap(mainSeparator, frameViewData.messages)
        );
    }

    static public String serialize(GlobalViewData globalViewData) {
        return join(
            mainSeparator,
            spellsListsSerialize(globalViewData.playerSpells),
            spellsSerialize(globalViewData.tomeSpells),
            spellsSerialize(globalViewData.deliveries)
        );
    }
}
