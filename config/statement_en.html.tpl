<!-- LEAGUES level1 level2 level3 level4 -->
<div id="statement_back" class="statement_back" style="display: none"></div>
<div class="statement-body">
  <!-- LEAGUE ALERT -->
  <!-- BEGIN level1 level2 level3 -->
  <div style="color: #7cc576; 
  background-color: rgba(124, 197, 118,.1);
  padding: 20px;
  margin-right: 15px;
  margin-left: 15px;
  margin-bottom: 10px;
  text-align: left;">
    <div style="text-align: center; margin-bottom: 6px">
      <img src="//cdn.codingame.com/smash-the-code/statement/league_wood_04.png" />
    </div>

    <!-- BEGIN level1 -->
    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">
      This is a <b>league based</b> challenge.
    </p>
    <span class="statement-league-alert-content">
      For this challenge, multiple leagues for the same game are available. Once you have proven your skills against the
      first Boss, you will access a higher league and extra rules will be available.
    </span>
    <!-- END -->
    <!-- BEGIN level2 -->
    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">
      Summary of new rules
    </p>
    <span class="statement-league-alert-content">
      You can now cast spells to acquire new ingredients!<br>
      <br>See the updated statement for details.</span>
    <!-- END -->
    <!-- BEGIN level3 -->
    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">
      Summary of new rules
    </p>
    <span class="statement-league-alert-content">
      All the rules are now unlocked!
      <ul>
        <li>You can now learn new spells!</li>
        <li>The client orders at the top of the queue can now earn you a rupee bonus</li>
        <li>Some spells are now repeatable, they can be cast multiple times on the same turn</li>
      </ul>
      <br>See the updated statement for details.</span>
    <!-- END -->
  </div>
  <!-- END -->

  <div style="padding: 20px;
    margin-right: 15px;
    margin-bottom: 10px;
    text-align: left;">
    <em>Tutorial video by Errichto: <a href="https://youtu.be/kGCAgaZv99M" rel="noopener" target="_blank" >https://youtu.be/kGCAgaZv99M</a></em>
  </div>

  <!-- GOAL -->
  <div class="statement-section statement-goal">
    <h2>
      <span class="icon icon-goal">&nbsp;</span>
      <span>Goal</span>
    </h2>
    <div class="statement-goal-content">
      <div>
        End the game with more <b>rupees</b> than your opponent.
      </div>
      <div style="text-align: center; margin: 15px">
        <img src="https://static.codingame.com/servlet/fileservlet?id=52461989331356"
          alt="Earn more rupees than your opponent!" style="width: 400px; max-width: 100%" />
      </div>
    </div>
    <p style="margin-bottom: 10px">
      The game takes place in a <b>potion shop</b>, in which two twin-sister <b>witches</b> are trying to prove they
      are the better potion brewer.<br>
      They have set up a contest: make more rupees selling potions than your sister.<br>
      However, the <b>witch's hut</b> in which they set up shop is quite small, so they must share the same workspace, and deal with
      the same <b>client orders</b>.
    </p>
  </div>
  <!-- RULES -->
  <div class="statement-section statement-rules">
    <h2>
      <span class="icon icon-rules">&nbsp;</span>
      <span>Rules</span>
    </h2>

    <div class="statement-rules-content">


      <!-- BEGIN level1 -->
      <p style="margin-bottom: 10px">
        Each player controls a <b>witch</b>, each witch has access to their own <b>inventory</b> of potion ingredients.
      </p>
      <p style="margin-bottom: 10px">Each <b>client order</b> is a list of ingredients required to brew a potion and
        earn some rupees.</p>
      <!-- END -->

      <!-- BEGIN level2 level3 level4 -->
      <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <p style="margin-bottom: 10px">
          Each player controls a <b>witch</b>, each witch has access to their own <b>inventory</b> of potion ingredients
          and a list of <b>spells</b> they have learnt. These spells can be used to turn <b>a certain set of ingredients
            into another</b>.<br>
          Each <b>client order</b> is a list of ingredients required to brew a potion and earn some rupees.
        </p>
        <!-- BEGIN level2 -->
      </div>
      <!-- END -->
      <!-- END -->
      <p style="margin-bottom: 10px">
        The game is played over several rounds. Each player performs one action each turn, simultaneously.
      </p>

      <h3 style="font-size: 14px;
    font-weight: 700;
    padding-top: 15px;
    color: #838891;
    padding-bottom: 15px;">
        Ingredients</h3>

      <p style="margin-bottom: 10px">
        There are 4 tiers of ingredient, indexed from <const>0</const> to <const>3
        </const>
        .
      </p>


      <div style="text-align: center; margin: 15px">
        <img src="https://static.codingame.com/servlet/fileservlet?id=53644389710672"
          style="width: 400px; max-width: 100%" />
        <div><em>Higher tier ingredients are typically necessary in more expensive potion recipes but take longer to
            acquire.</em></div>
      </div>


      <!-- BEGIN level1 -->
      <p style="margin-bottom: 10px">
        Each witch starts with a full inventory of <const>10</const> ingredients.
      </p>
      <!-- END -->
      <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <!-- BEGIN level2 level3 level4 -->
        <p style="margin-bottom: 10px">
          A witch's <b>inventory</b> can contain up to <const>10</const> ingredients.
        </p>
        <p style="margin-bottom: 10px">
          Each witch starts with <const>3</const> tier-0 ingredients in their inventory.
        </p>
        <!-- END -->
        <!-- BEGIN level2 -->
      </div>
      <!-- END -->

      <p>The inventory is represented by <var>inv</var>: <b>4 numbers</b> each representing the amount of each
        ingredient tier.</p>

      <div style="text-align: center; margin: 15px">
        <img src="https://static.codingame.com/servlet/fileservlet?id=53661988029913"
          style="width: 400px; max-width: 100%" />
        <div><em>If <var>inv0</var> is <const>3</const> then you have 3 tier-0 ingredients.</em></div>
      </div>


      <h3 style="font-size: 14px;
    font-weight: 700;
    padding-top: 15px;
    color: #838891;
    padding-bottom: 15px;">
        Action overview</h3>



      <!-- BEGIN level1 -->
      <p style="margin-bottom: 10px">For this league, you must <const>Brew</const> two potions from the list of
        client orders. The witch
        having earned the most rupees wins.</p>
      <!-- END -->

      <!-- BEGIN level2 level3 level4 -->
      <p style="margin-bottom: 10px">Each round, you can perform one of the following actions:</p>
      <!-- BEGIN level2 level3 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <ul>
          <!-- BEGIN level3 level4 -->
          <li>
            <const>Learn</const> a new spell from the <b>magic tome</b>.
          </li>
          <!-- END -->
          <!-- BEGIN level3 level4 -->
          <li>
            <const>Cast</const> one of the spells you have learnt.
          </li>
          <!-- END -->
          <!-- BEGIN level2 -->
          <li>
            <const>Cast</const> one of your spells.
          </li>
          <!-- END -->
          <li>
            <const>Rest</const> to refresh all previously cast spells.
          </li>
          <li>
            <const>Brew</const> a potion to score points.
          </li>
        </ul>
        <!-- BEGIN level2 level3 -->
      </div>
      <!-- END -->
      <!-- END -->
      <!-- BEGIN level2 level3 level4 -->
      <p>You may also opt to skip a turn with the <action>WAIT</action> command.</p>
      <!-- END -->


      <!-- BEGIN level2 level3 level4 -->
      <!-- BEGIN level2  -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <h3 style="font-size: 14px;
      font-weight: 700;
      padding-top: 15px;
      color: #838891;
      padding-bottom: 15px;">
          Casting Spells</h3>


        <p style="margin-bottom: 10px">Spells have a <var>delta</var>: <b>4 numbers</b>, one for each ingredient
          tier.<br>
          Positive numbers represent the amount of ingredients that are produced by the recipe.<br>
          Negative numbers represent the amount of ingredients that are consumed by the recipe.<br>
          For instance, a spell marked <const>-1,1,0,0</const> means it can turn one
          tier-0 ingredient into a tier-1 ingredient.</p>


        <div style="text-align: center; margin: 15px">

          <img src="https://static.codingame.com/servlet/fileservlet?id=52462040816416"
            style="width: 400px; max-width: 100%" />
          <div><em>This spell produces a <const>tier-3</const> ingredient out of a <const>tier-0</const> and <const>
                tier-1</const> ingredient.</em></div>
        </div>

        <!-- BEGIN level2 -->
        Once you have cast a spell, it becomes <b>exhausted</b>. You may not cast exhausted spells.
        <!-- END -->

        <!-- BEGIN level3 level4 -->
        <!-- BEGIN level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <p style="margin-bottom: 10px">You may learn any number of spells during the game, but once you have cast a
            spell, it becomes
            <b>exhausted</b>. You may not cast exhausted spells.</p>
          <p style="margin-bottom: 10px">Some spells are <var>repeatable</var>, meaning they can be used <b>multiple
              times
              on the same turn</b> before
            becoming exhausted.</p>
          <p style="margin-bottom: 10px">The same <b>four</b> basic spells are always available at the start of the
            game.
            Use them to build up your
            repertoire of more efficient spells.</p>

          <!-- BEGIN level3 -->
        </div>
        <!-- END -->
        <!-- END -->


        <p style="margin-bottom: 10px">Some spells do not consume ingredients, they simply produce new ingredients.</p>

        <p style="margin-bottom: 10px">
          Each player spell has a unique <var>id</var> and can be cast with the <action>CAST id</action> command. </p>
        <!-- BEGIN level3 level4 -->
        <!-- BEGIN level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <p style="margin-bottom: 10px">Choose the number of <var>times</var> to cast a repeatable spell with the
            <action>CAST id times</action>
            command.</p>
          <!-- BEGIN level3 -->
        </div>
        <!-- END -->
        <!-- END -->
        </p>

        <br>
        <!-- BEGIN level2  -->
      </div>
      <!-- END -->
      <!-- END -->

      <!-- BEGIN level3 level4 -->
      <!-- BEGIN level3  -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <h3 style="font-size: 14px;
      font-weight: 700;
      padding-top: 15px;
    color: #838891;
      padding-bottom: 15px;">
          Learning Spells</h3>

        <p style="margin-bottom: 10px">The <b>magic tome</b> the witch sisters are using is quite volatile. Once a witch
          has memorised a spell, that
          spell <b>disappears</b> from the tome completely and is no longer available to the other witch.</p>
        <p style="margin-bottom: 10px">To preserve a sense of fairness in their sisterly spat, the witches have devised
          a system:</p>
        <ul>
          <li>They may only read from the first <const>6</const> available spells on each round.</li>
          <li>The first spell in the list may be learnt freely.</li>
          <li>
            To gain the right to memorise any spell further along in the list, they must put down a "read-ahead tax" by
            placing <b>one tier-0 ingredient</b> upon each spell that appears earlier in the tome.
            <br>For instance, if you want to learn the 4th spell in the tome, you must place a tier-0 ingredient on
            the
            first, second, and third.<br>You may only do this if you can afford it.
          </li>
          <li>Whenever they memorise a spell with ingredients placed upon it, they also acquire those ingredients, which become usable on the next turn. If
            the
            witch's inventory is full, the excess is discarded.</li>
        </ul>


        <div style="text-align: center; margin: 15px">

          <img src="https://static.codingame.com/servlet/fileservlet?id=52922547578759"
            style="width: 400px; max-width: 100%" />
          <div><em>Example of a learn action with a read-ahead tax.</em></div>
        </div>

        <p style="margin-bottom: 10px"> The read-ahead tax is applied <b>after</b> learnt spells have disappeared from
          the tome, meaning new spells may be present in the 6 available when the ingredients are placed.</p>

        <p style="margin-bottom: 10px">The tome is not infinite, there are exactly <const>42</const> spells within. </p>

        <p style="margin-bottom: 10px">
          Each tome spell has a unique <var>id</var> and can be learnt with the <action>LEARN id</action> command.
        </p>
        <!-- BEGIN level3  -->
      </div>
      <!-- END -->
      <!-- END -->

      <!-- BEGIN level2 level3 level4 -->
      <!-- BEGIN level2  -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <h3 style="font-size: 14px;
      font-weight: 700;
      padding-top: 15px;
      color: #838891;
      padding-bottom: 15px;">
          Resting</h3>

        <p style="margin-bottom: 10px">Resting lets you channel your magic, rendering all <b>exhausted</b> spells
          available again for casting.</p>

        <p style="margin-bottom: 10px">
          You can order your witch to rest with the <action>REST</action> command.
        </p>


        <!-- BEGIN level2  -->
      </div>
      <!-- END -->
      <!-- END -->

      <h3 style="font-size: 14px;
      font-weight: 700;
      padding-top: 15px;
      color: #838891;
      padding-bottom: 15px;">
        Brewing</h3>

      <p style="margin-bottom: 10px"><b>Client orders</b> have a <var>delta</var>: <b>4 numbers</b>, one for each
        ingredient tier.<br>
        Negative numbers represent the amount of ingredients that are consumed by the recipe.<br>
        Therefore, the numbers are <b>never positive</b> because they represent a loss of ingredients from your
        inventory.
      </p>

      <p>For instance, a client order with <const><var>delta</var> = -2, -1, 0, 0</const> means you have to consume 2
        tier-0 ingredients and 1 tier-1 ingredients from your inventory in order to brew the potion.</p>
      <p style="margin-bottom: 10px">The selling <var>price</var> of the client order is the amount of rupees will you
        earn by
        completing it.</p>



      <div style="text-align: center; margin: 15px">

        <img src="https://static.codingame.com/servlet/fileservlet?id=53662009164687"
          style="width: 400px; max-width: 100%" />
        <div><em>This potion requires five ingredients and is worth 10 rupees. <var>delta0</var> is <const>-2</const>,
            so you need at least <const>2</const> tier-0 ingredients in the inventory. Check this with the <var>inv0</var> variable.</em>
        </div>
      </div>

      <p style="margin-bottom: 10px">The client orders are queued up from left to right. Only five clients can fit
        inside the hut so a maximum of
        <const>5</const> orders will be available every turn.</p>

      <!-- BEGIN level3 level4 -->
      <!-- BEGIN level3 -->
      <div class="statement-new-league-rule">
        <!-- END -->

        <p style="margin-bottom: 10px">You may deliver a potion for any of the clients within the hut, but the clients
          near the end of the
          queue (the left-most client orders) may
          earn you an <b>urgency bonus</b>. The bonus works as follows:</p>
        <ul>
          <li>Brewing a potion for the very first client awards a <const>+3 rupee bonus</const>, but this can only
            happen <const>4</const> times
            during
            the game.</li>
          <li>Brewing a potion for the second client awards a <const>+1 rupee bonus</const>, but this also can only
            happen <const>4</const> times
            during
            the game.</li>
          <li>If all <const>+3 bonuses</const> have been used up, the <const>+1 bonus</const> will be awarded by the
            <b>first</b> client instead of the
            second
            client.</li>
        </ul>
        <!-- BEGIN level3 -->
      </div>
      <!-- END -->
      <!-- END -->

      <!-- BEGIN level1 level2 -->
      If both witches brew the same potion, they <b>both</b> earn its price in rupees.
      <!-- END -->


      <p style="margin-bottom: 10px">At the start of each new turn, new orders are queued up to fill the missing
        spaces.</p>


      <p style="margin-bottom: 10px">
        Each order has a unique <var>id</var> and can be undertaken with the <action>BREW id</action> command.
      </p>


      <!-- BEGIN level1 -->
      <p>You may also opt to skip a turn with the <action>WAIT</action> command.</p>
      <!-- END -->

      <h3 style="font-size: 14px;
                      font-weight: 700;
                      padding-top: 15px;
                      color: #838891;
                      padding-bottom: 15px;">
        ⛔ Game end</h3>

      <!-- BEGIN level1 level2 level3 level4 -->
      <p style="margin-bottom: 10px">
        <!-- BEGIN level1 -->
        The game ends once at least one witch has brewed <const>2</const> potions.
        <br>
        <!-- END -->
        <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        The game ends once at least one witch has brewed <const>3</const> potions.
        <br>
      </div>
      <!-- END -->
      <!-- BEGIN level3 -->
      <div class="statement-new-league-rule">
        The game ends once at least one witch has brewed <const>6</const> potions.
        <br>
      </div>
      <!-- END -->
      <!-- BEGIN level4 -->
      The game ends once at least one witch has brewed <const>6</const> potions.
      <br>
      <!-- END -->
      <br>
      The game stops automatically after <const>100 rounds</const>.<br>
      <br>
      </p>
      <!-- END -->


      <!-- BEGIN level2 level3 level4 -->
      <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <p style="margin-bottom: 10px">Players gain <const>1 rupee</const> for each tier-1 ingredient or higher in their
          inventory.</p>
        <!-- BEGIN level2 -->
      </div>
      <!-- END -->
      <!-- END -->

      <!-- Victory conditions -->
      <div class="statement-victory-conditions">
        <div class="icon victory"></div>
        <div class="blk">
          <div class="title">Victory Conditions</div>
          <div class="text">
            <ul style="padding-top:0; padding-bottom: 0;">
              The winner is the player with the most rupees.
            </ul>
          </div>
        </div>
      </div>
      <!-- Lose conditions -->
      <div class="statement-lose-conditions">
        <div class="icon lose"></div>
        <div class="blk">
          <div class="title">Defeat Conditions</div>
          <div class="text">
            <ul style="padding-top:0; padding-bottom: 0;">
              Your program does not provide a command in the alloted time or one of the commands is unrecognized.
            </ul>
          </div>
        </div>
      </div>
      <br>
      <h3 style="font-size: 14px;
                      font-weight: 700;
                      padding-top: 15px;
    color: #838891;
                      padding-bottom: 15px;">
        🐞 Debugging tips</h3>
      <ul>
        <li>Hover over a spell or recipe to see extra information about it</li>
        <li>Append text after any command and that text will appear next to your witch</li>
        <li>Press the gear icon on the viewer to access extra display options</li>
        <li>Use the keyboard to control the action: space to play/pause, arrows to step 1 frame at a time</li>
      </ul>

    </div>
  </div>

  <!-- EXPERT RULES -->
  <!-- BEGIN level3 level4 -->
  <!-- BEGIN level3 -->
  <div class="statement-new-league-rule">
    <!-- END -->
    <div class="statement-section statement-expertrules">
      <h2>
        <span class="icon icon-expertrules">&nbsp;</span>
        <span>Technical Details</span>
      </h2>
      <div class="statement-expert-rules-content">
        <ul style="padding-left: 20px;padding-bottom: 0">
          <li>When both witches perform the same action, they both reap the rewards for that action. This applies namely
            to potion prices, the urgency bonus, the read-ahead tax, and learning spells.</li>
          <li>If both witches complete an order with an urgency bonus, two bonuses of that bonus level are consumed. If
            there is only one, it is consumed and both witches still get the same rewards.</li>
          <li>The order in which spells appear in the tome is random. However, the list of all possible spells
            is always the same.</li>
          <li>After learning a spell, the learnt version of the spell has a different id from the one previously within
            the tome.</li>
          <li>
            You can check out the source code of this game <a rel="nofollow" target="_blank"
              href="https://github.com/CodinGame/FallChallenge2020">on this GitHub repo</a>. You can find a list of all
            possible spells in the tome.
          </li>
          <li>A witch cannot obtain an ingredient from the tome on the same turn as it is placed there by the other
            witch.</li>
          <li>If the absolute final spell is learnt on the same turn as a read-ahead tax is applied, the extra tier-0
            ingredient
            is discarded.</li>
        </ul>
      </div>
    </div>
    <!-- BEGIN level3 -->
  </div>
  <!-- END -->

  <!-- END -->

  <!-- PROTOCOL -->
  <div class="statement-section statement-protocol">
    <h2>
      <span class="icon icon-protocol">&nbsp;</span>
      <span>Game Protocol</span>
    </h2>

    <!-- Protocol block -->
    <div class="blk">
      <div class="title">Input for One Game Turn</div>
      <div class="text">
        <!-- BEGIN level1 -->
        <span class="statement-lineno">Line 1:</span> one integer <var>actionCount</var> for the number of all
        available client orders.<br>
        <!-- END -->
        <!-- BEGIN level2 -->
        <span class="statement-lineno">Line 1:</span> one integer <var>actionCount</var> for the sum total of both sets
        of player spells, and every available client order.<br>
        <!-- END -->
        <!-- BEGIN level3 -->
        <span class="statement-lineno">Line 1:</span> one integer <var>actionCount</var> for the sum total of all
        available tome spells, both sets of player spells, and every available client order.<br>
        <!-- END -->

        <span class="statement-lineno">Next <var>actionCount</var> lines:</span>
        <const>11</const> space-separated values to describe a game action.<br>
        <!-- BEGIN level2 level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <ul>
            <li><var>actionId</var>the id of this action</li>
            <li> <var>actionType</var>: a string <ul>
                <!-- BEGIN level2 level3 level4 -->
                <li>
                  <const>CAST</const> for one of your learnt spells
                </li>
                <li>
                  <const>OPPONENT_CAST</const> for one of your opponent's learnt spells
                </li>
                <!-- END -->

                <!-- BEGIN level3 level4 -->
                <li>
                  <const>LEARN</const> for a tome spell
                </li>
                <!-- END -->
                <li>
                  <const>BREW</const> for a potion recipe
                </li>
              </ul>
            </li>
            <li> <var>delta0</var>, <var>delta1</var>, <var>delta2</var>, <var>delta3</var>: the four numbers describing
              the consumption/producion of ingredients for each tier.</li>
            <li> <var>price</var> the amount of rupees this will win you if this is a potion recipe, <const>0</const>
              otherwise.
            <!-- BEGIN level3 level4 -->
            This includes the urgency bonus.
            <!-- END -->
            </li>

            <!-- BEGIN level1 level2 -->
            <li> <var>tomeIndex</var>: ignore for this league.</li>
            <li> <var>taxCount</var>: ignore for this league.</li>
            <!-- END -->
            <!-- BEGIN level1 -->
            <li> <var>castable</var>: ignore for this league.</li>
            <li><var>repeatable</var>: ignore for this league.</li>
            <!-- END -->

            <!-- BEGIN level3 level4 -->
            <li> <var>tomeIndex</var> the index in the tome of this action if this is a tome spell, <const>-1</const>
              otherwise.
              Is
              equal to the read-ahead tax to learn this spell.<br>
            This is also the <b>value</b> of the urgency bonus if this is a potion recipe.</li>
            <li> <var>taxCount</var> the amount of tier-0 ingredients you will gain by learning this spell if this is a
              tome spell, <const>0</const> otherwise.
              <br>
              This is also the <b>amount</b> of times an urgency bonus can still be gained if this is a potion recipe.
            </li>
            <!-- END -->
            <!-- BEGIN level2 level3 level4 -->

            <li> <var>castable</var>
              <const>1</const> if this is a player spell that is not exhausted, <const>0</const> otherwise.
            </li>
            <!-- END -->
            <!-- BEGIN level3 level4 -->
            <li><var>repeatable</var>: <const>1</const> if this is a repeatable spell, <const>0</const> otherwise</li>
            <!-- END -->
            <!-- BEGIN level2 -->
            <li><var>repeatable</var>: ignore for this league.</li>
            <!-- END -->

          </ul>
          <!-- BEGIN level2 level3 -->
        </div>
        <!-- END -->
        <span class="statement-lineno">Next <const>2</const> lines:</span>
        <const>5</const> integers to describe each player, <b>your</b> data is always first:
        <ul>
          <li><var>inv0</var> for the amount of tier-0 ingredients in their inventory</li>
          <li><var>inv1</var> for the amount of tier-1 ingredients in their inventory</li>
          <li><var>inv2</var> for the amount of tier-2 ingredients in their inventory</li>
          <li><var>inv3</var> for the amount of tier-3 ingredients in their inventory</li>
          <li><var>score</var> for the amount of rupees earned so far</li>
        </ul>
      </div>
    </div>

    <!-- Protocol block -->
    <div class="blk">
      <div class="title">Output</div>
      <div class="text">
        A single line with your command:

        <!-- BEGIN level2 level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <ul style="padding-left: 20px;padding-top: 0">
            <li>
              <action>BREW id</action>: your witch attempts to brew the potion with the given id.
            </li>
            <!-- BEGIN level2 level3 level4 -->
            <li>
              <action>CAST id</action>: your witch attempts to cast the spell with the given id.
            </li>
            <!-- END -->
            <!-- BEGIN level3 level4 -->
            <li>
              <action>CAST id times</action>: your witch casts a repeatable spell the given amount of times.
            </li>
            <li>
              <action>LEARN id</action>: your witch attempts to learn the tome spell with the given id.
            </li>
            <!-- END -->

            <!-- BEGIN level2 level3 level4 -->
            <li>
              <action>REST</action>: your witch channels her magic and your exhausted spells become castable
              again.
            </li>
            <!-- END -->
            <li>
              <action>WAIT</action>: your witch does nothing.
            </li>
          </ul>
          <!-- BEGIN level2 level3 -->
        </div>
        <!-- END -->
      </div>
    </div>

    <div class="blk">
      <div class="title">Constraints</div>
      <div class="text">
        <const>0</const> &lt; <var>actionCount</var> ≤ <const>100</const><br>
        <const>6</const> ≤ <var>price</var> ≤ <const>23</const><br>
        Response time per turn ≤ <const>50</const>ms
        <br>Response time for the first turn ≤ <const>1000</const>ms
      </div>
    </div>
  </div>

  <!-- BEGIN level1 level2 -->
  <!-- LEAGUE ALERT -->
  <div style="color: #7cc576; 
                      background-color: rgba(124, 197, 118,.1);
                      padding: 20px;
                      margin-top: 10px;
                      text-align: left;">
    <div style="text-align: center; margin-bottom: 6px"><img
        src="//cdn.codingame.com/smash-the-code/statement/league_wood_04.png" /></div>

    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">What is in store for me in the higher leagues ?
    </p>
    The extra rules available in higher leagues are:<ul>
      <!-- BEGIN level1 -->
      <li>Cast spells to generate and transform ingredients</li>
      <!-- END -->
      <li>Learn new spells from the magic tome</li>
    </ul>
  </div>
  <!-- END -->

</div>