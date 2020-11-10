package com.codingame.game;

import java.util.Arrays;
import java.util.stream.IntStream;

public class Recipe {
    public int[] delta;

    public static final String[] CHARS = new String[] { "A", "B", "C", "D" };

    public Recipe(int a, int b, int c, int d) {
        this.delta = new int[] { a, b, c, d };
    }

    public Recipe() {
        this.delta = new int[] { 0, 0, 0, 0 };
    }

    public Recipe(Recipe other) {
        this(other.delta[0], other.delta[1], other.delta[2], other.delta[3]);
    }

    @Override
    public String toString() {
        StringBuffer sb = new StringBuffer();
        if (IntStream.of(this.delta).allMatch(b -> b == 0)) {
            return "∅";
        }

        if (IntStream.of(this.delta).anyMatch(b -> b > 0)) {
            sb.append("+");
            for (int i = 0; i < 4; ++i) {
                for (int k = 0; k < this.delta[i]; ++k) {
                    sb.append(CHARS[i]);
                }
            }
        }

        if (IntStream.of(this.delta).anyMatch(b -> b < 0)) {
            if (IntStream.of(this.delta).anyMatch(b -> b > 0)) {
                sb.append('\n');
            }
            sb.append("-");
            for (int i = 0; i < 4; ++i) {
                for (int k = this.delta[i]; k < 0; ++k) {
                    sb.append(CHARS[i]);
                }
            }
        }

        return sb.toString();
    }

    public String toPlayerString() {
        return String.format("%d %d %d %d", delta[0], delta[1], delta[2], delta[3]);
    }

    public void add(int idx, int x) {
        this.delta[idx] += x;
    }

    public int getTotal() {
        return IntStream.of(delta).sum();
    }

    public int getTotalLoss() {
        return -IntStream.of(delta)
            .filter(i -> i < 0)
            .sum();
    }

    public int getTotalGain() {
        return IntStream.of(delta)
            .filter(i -> i > 0)
            .sum();
    }

    @Override
    public int hashCode() {
        return Arrays.hashCode(this.delta);
    }

    @Override
    public boolean equals(Object object) {
        if (this == object) {
            return true;
        }

        if (!(object instanceof Recipe)) {
            return false;
        }

        Recipe other = (Recipe) object;

        return Arrays.equals(this.delta, other.delta);
    }
}
