<!-- LEAGUES level1 level2 level3 level4 -->
<div id="statement_back" class="statement_back" style="display: none"></div>
<div class="statement-body">
  <!-- LEAGUE ALERT -->
  <!-- BEGIN level1 level2 level3 -->
  <div style="color: #7cc576; 
  background-color: rgba( 124 , 197 , 118 , 0.1 );
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
      Ce challenge se déroule en <b>ligues</b>.
    </p>
    <span class="statement-league-alert-content">
      Pour ce challenge, plusieurs versions du même jeu seront disponibles. Quand vous aurez prouvé votre valeur dans la
      première version, vous accèderez à la ligue supérieure et débloquerez de nouvelles règles.
    </span>
    <!-- END -->
    <!-- BEGIN level2 -->
    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">
      Résumé des nouvelles règles.
    </p>
    <span class="statement-league-alert-content">
      Vous pouvez désormais lancer des sorts pour acquérir de nouveaux ingrédients&nbsp;!<br>
      <br> Consultez l'énoncé mis à jour pour plus de détails.</span>
    <!-- END -->
    <!-- BEGIN level3 -->
    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">
      Résumé des nouvelles règles.
    </p>
    <span class="statement-league-alert-content">
      Toutes les règles sont maintenant débloquées&nbsp;!
      <ul>
        <li>Vous pouvez maintenant apprendre de nouveaux sorts&nbsp;!</li>
        <li>Les premières commandes de la queue peuvent rapporter un bonus de rubis</li>
        <li>Certains sorts sont répétables, ils peuvent être lancés plusieurs fois pendant le même tour</li>
      </ul>
      <br> Consultez l'énoncé mis à jour pour plus de détails.</span>
    <!-- END -->
  </div>
  <!-- END -->

  <div style="padding: 20px;
    margin-right: 15px;
    margin-bottom: 10px;
    text-align: left;">
    <em>Vidéo tuto par Errichto: <a href="https://youtu.be/kGCAgaZv99M" rel="noopener" target="_blank" >https://youtu.be/kGCAgaZv99M</a></em>
  </div>

  <!-- GOAL -->
  <div class="statement-section statement-goal">
    <h2>
      <span class="icon icon-goal">&nbsp;</span>
      <span>Objectif</span>
    </h2>
    <div class="statement-goal-content">
      <div>
        Gagner plus de <b>rubis</b> que votre adversaire.
      </div>
      <div style="text-align: center; margin: 15px">
        <img src="https://static.codingame.com/servlet/fileservlet?id=52461989331356"
          alt="Earn more rupees than your opponent!" style="width: 400px; max-width: 100%" />
      </div>
    </div>
    <p style="margin-bottom: 10px">
      Le jeu se déroule dans un <b>magasin de potions</b> dans lequel se trouvent deux sœurs jumelles <b>sorcières</b>, chacune
      tentant de prouver qu'elle est plus douée que l'autre dans la préparation de potions.
      <br>
      Elles ont organisé un petit concours&nbsp;: gagner plus de rubis que sa sœur en vendant des potions.<br>
      Cependant, la <b>hutte de sorcière</b> où est situé leur magasin n'est pas très grande, elles doivent partager le même espace de travail
      et gérer les mêmes <b>commandes</b>.
    </p>
  </div>
  <!-- RULES -->
  <div class="statement-section statement-rules">
    <h2>
      <span class="icon icon-rules">&nbsp;</span>
      <span>Règles</span>
    </h2>

    <div class="statement-rules-content">


      <!-- BEGIN level1 -->
      <p style="margin-bottom: 10px">
        Chaque joueur contrôle une <b>sorcière</b>. Chaque sorcière a accès à son propre <b>inventaire</b>
        d'ingrédients.</p>
      <p style="margin-bottom: 10px">Chaque <b>commande</b> est une liste d'ingrédients nécessaires pour préparer une
        potion et gagner des rubis.</p>
      <!-- END -->

      <!-- BEGIN level2 level3 level4 -->
      <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <p style="margin-bottom: 10px">
          Chaque joueur contrôle une <b>sorcière</b>. Chaque sorcière a accès à son propre <b>inventaire</b>
          d'ingrédients ainsi qu'à une liste de <b>sorts</b> qu'elle a appris. Ces sorts sont utilisés pour
          transformer <b>un ensemble donné d'ingrédients en un autre</b>.<br>
          Chaque <b>commande</b> est une liste d'ingrédients nécessaires pour préparer une potion et gagner des rubis.
        </p>
        <!-- BEGIN level2 -->
      </div>
      <!-- END -->
      <!-- END -->
      <p style="margin-bottom: 10px">
        Une partie se déroule sur plusieurs tours. À chaque tour, les joueurs effectuent une action simultanément.
      </p>

      <h3 style="font-size: 14px;
    font-weight: 700;
    padding-top: 15px;
    color: #838891;
    padding-bottom: 15px;">
        Ingrédients</h3>

      <p style="margin-bottom: 10px">
        Il y a 4 types d'ingrédients, de valeur croissante. Les types sont indexés de <const>0</const> à <const>3
        </const>.
      </p>


      <div style="text-align: center; margin: 15px">
        <img src="https://static.codingame.com/servlet/fileservlet?id=53644389710672"
          style="width: 400px; max-width: 100%" />
        <div><em>Les types de plus haut index sont en général nécessaires pour préparer les potions les plus rentables mais sont
            plus difficiles à obtenir.</em></div>
      </div>


      <!-- BEGIN level1 -->
      <p style="margin-bottom: 10px">
        Chaque sorcière démarre avec un inventaire complet de <const>10</const> ingrédients de types différents.
      </p>
      <!-- END -->
      <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <!-- BEGIN level2 level3 level4 -->
        <p style="margin-bottom: 10px">
          L'inventaire peut contenir au maximum <const>10</const> ingrédients.
        </p>
        <p style="margin-bottom: 10px">
          Chaque sorcière démarre avec <const>3</const> ingrédients de type 0 dans son inventaire.
        </p>
        <!-- END -->
        <!-- BEGIN level2 -->
      </div>
      <!-- END -->


      <p>L'inventaire est représenté par <var>inv</var>: <b>4 entiers</b> représentant le nombre d'ingrédients de chaque
        type.</p>
      
        
      <div style="text-align: center; margin: 15px">
        <img src="https://static.codingame.com/servlet/fileservlet?id=53661988029913"
          style="width: 400px; max-width: 100%" />
        <div><em>Si <var>inv0</var> vaut <const>3</const> alors vous avez 3 ingrédients de type 0.</em></div>
      </div>


      <h3 style="font-size: 14px;
    font-weight: 700;
    padding-top: 15px;
    color: #838891;
    padding-bottom: 15px;">
        Actions</h3>



      <!-- BEGIN level1 -->
      <p style="margin-bottom: 10px">Pour cette ligue, vous devez préparer deux potions de la liste de commandes. La
        sorcière ayant gagné le plus de rubis remporte la partie.</p>
      <!-- END -->

      <!-- BEGIN level2 level3 level4 -->
      <p style="margin-bottom: 10px">Chaque tour, vous pouvez effectuer une des actions suivantes&nbsp;:</p>
      <!-- BEGIN level2 level3 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <ul>
          <!-- BEGIN level3 level4 -->
          <li>
            <action>LEARN</action>&nbsp;: <const>Apprendre</const> un nouveau sort dans le <b>grimoire</b>.
          </li>
          <!-- END -->
          <!-- BEGIN level3 level4 -->
          <li>
            <action>CAST</action>&nbsp;:  <const>Lancer</const> un des sorts que vous avez appris.
          </li>
          <!-- END -->
          <!-- BEGIN level2 -->
          <li>
            <action>CAST</action>&nbsp;: <const>Lancer</const> un de vos sorts.
          </li>
          <!-- END -->
          <li>
            <action>REST</action>&nbsp;: <const>Récupérer</const> pour rafraîchir tous les sorts déjà lancés.
          </li>
          <li>
            <action>BREW</action>&nbsp;: <const>Préparer</const> une potion pour marquer des points.
          </li>
        </ul>
        <!-- BEGIN level2 level3 -->
      </div>
      <!-- END -->
      <!-- END -->
      <!-- BEGIN level2 level3 level4 -->
      <p>Vous pouvez également passer votre tour avec l'instruction <action>WAIT</action>.</p>
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
          Lancer un sort</h3>


        <p style="margin-bottom: 10px">Les sorts ont un <var>delta</var>: <b>4 entiers</b>, un pour chaque type
          d'ingrédient.<br>
          Un entier positif représente le nombre d'ingrédients que le sort produit.<br>
          Un entier négatif représente le nombre d'ingrédients que le sort consomme.<br>
          Par exemple, un sort marqué <const>
            -1,1,0,0</const> peut transformer un ingrédient de type 0 en un ingrédient de type 1.</p>


        <div style="text-align: center; margin: 15px">

          <img src="https://static.codingame.com/servlet/fileservlet?id=52462040816416"
            style="width: 400px; max-width: 100%" />
          <div><em>Ce sort produit un ingrédient de <const>type 3</const> en consommant un <const>type 0</const> et un
              <const>
                type 1</const>.</em></div>
        </div>

        <!-- BEGIN level2 -->
        <p style="margin-bottom: 10px">
          Une fois qu'un sort est lancé, il devient
          <b>épuisé</b>. Vous ne pouvez pas lancer un sort <b>épuisé</b>.</p>
        <!-- END -->

        <!-- BEGIN level3 level4 -->
        <!-- BEGIN level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <p style="margin-bottom: 10px">
            Vous pouvez apprendre autant de sorts que vous voulez au cours de la partie, mais une fois qu'un sort est
            lancé, il devient
            <b>épuisé</b>. Vous ne pouvez pas lancer un sort <b>épuisé</b>.</p>
          <p style="margin-bottom: 10px">Certains sorts sont répétables, indiqués par la variable <var>repeatable</var>,
            ils peuvent être lancés <b>plusieurs fois dans le même tour</b> avant d'être épuisés.</p>
          <p style="margin-bottom: 10px">Il y a toujours les <b>quatre</b> mêmes sorts de base disponibles en début
            de partie.</p>

          <!-- BEGIN level3 -->
        </div>
        <!-- END -->
        <!-- END -->


        <p style="margin-bottom: 10px">Certains sorts ne consomment rien et produisent simplement de nouveaux
          ingrédients.</p>

        <p style="margin-bottom: 10px">
          Chaque sort a un identifiant unique <var>id</var> et peut être lancé avec l'instruction <action>CAST id
          </action>. </p>
        <!-- BEGIN level3 level4 -->
        <!-- BEGIN level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <p style="margin-bottom: 10px">Indiquer le nombre de fois que vous lancez un sort répétable avec
            <var>times</var> dans l'instruction
            <action>ACTION id times</action>.</p>
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
          Apprendre des sorts</h3>

        <p style="margin-bottom: 10px">Le <b>grimoire</b> magique des deux sorcières est assez volatile. Une fois
          qu'une sorcière a mémorisé un sort, celui-ci <b>disparaît</b> des pages du grimoire, et n'est plus disponible
          pour l'autre sorcière.</p>
        <p style="margin-bottom: 10px">
          Afin de garantir une compétition équitable, les sorcières se sont mises d'accord sur des règles de
          partage&nbsp;:</p>
        <ul>
          <li>Seuls les <const>6</const> premiers sorts disponibles seront accessibles à chaque tour.</li>
          <li>Le premier sort de la liste peut être appris librement.</li>

          <li>
            Pour gagner le droit d'apprendre les sorts plus loin dans la liste, elles doivent déposer
            une taxe de "lecture-d'avance" en plaçant <b>un ingrédient de type 0</b> sur chaque sort qui précède le sort
            désiré dans la liste.

            <br>Par exemple, pour apprendre le quatrième sort du grimoire, vous devez poser un ingredient de type 0 sur
            le premier, le deuxième et le troisième.<br>Vous pouvez faire ceci seulement si vous avez assez
            d'ingrédients de type 0.
          </li>
          <li>
            Lorsqu'une sorcière apprend un sort, elle récupère tous les ingrédients placés sur ce sort, utilisables dès le tour suivant. Si la
            sorcière n'a pas suffisamment de place dans son inventaire, le supplément est perdu.</li>
        </ul>


        <div style="text-align: center; margin: 15px">

          <img src="https://static.codingame.com/servlet/fileservlet?id=52922547578759"
            style="width: 400px; max-width: 100%" />
          <div><em>Exemple d'un apprentissage avec une taxe de lecture-d'avance.</em></div>
        </div>

        <p style="margin-bottom: 10px"> La taxe de lecture-d'avance est appliquée <b>après</b> que les sorts appris aient
          disparu du grimoire, il pourra donc y avoir des nouveaux sorts dans la liste des 6 disponibles au moment où
          les ingrédients sont posés.</p>

        <p style="margin-bottom: 10px">Le grimoire n'est pas infini, il renferme exactement <const>42</const> sorts.
        </p>

        <p style="margin-bottom: 10px">
          Chaque sort du grimoire a un identifiant unique <var>id</var> et peut être appris avec l'instruction <action>
            LEARN id</action>. </p>
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
          Récupérer</h3>

        <p style="margin-bottom: 10px">
          En récupérant, les sorcières canalisent leur magie, rendant ainsi tous leur sorts <b>épuisés</b> utilisables à
          nouveau.</p>

        <p style="margin-bottom: 10px">
          Faites récupérer votre sorcière avec l'instruction <action>REST</action>.
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
        Préparer des potions</h3>

      <p style="margin-bottom: 10px">
        Les <b>commandes</b> ont un <var>delta</var>: <b>4 entiers</b>, un pour chaque type
        d'ingrédient.<br>
        Un entier négatif représente le nombre d'ingrédients que la recette consomme.<br>
        Donc les entiers ne seront <b>jamais positifs</b> car ils représentent une perte d'ingrédients depuis votre
        inventaire.
      </p>
      <p>
        Par exemple, une commande avec <const><var>delta</var> = -2, -1, 0, 0</const> indique qu'il faudra consommer
        deux ingrédients de type 0 et un ingrédient de type 1 pour préparer la potion.</p>

      <p style="margin-bottom: 10px">Le prix de vente indiqué par la variable <var>price</var> de la commande est le
        nombre de rubis que vous gagnez en préparant la potion.</p>

      <div style="text-align: center; margin: 15px">

        <img src="https://static.codingame.com/servlet/fileservlet?id=53662009164687"
          style="width: 400px; max-width: 100%" />
        <div><em>
            Cette potion requiert cinq ingrédients et vaut 10 rubis. <var>delta0</var> vaut <const>-2</const>,
            donc il faut au moins <const>2</const> ingrédients de type 0 dans l'inventaire. Vérifiez cela avec la variable
            <var>inv0</var>.</em></div>
      </div>

      <p style="margin-bottom: 10px">Les commandes forment une queue de gauche à droite. Il y a suffisamment de place dans
        la hutte pour seulement cinq clients à la fois donc il y aura un maximum de <const>5</const> commandes
        disponibles à chaque tour.</p>

      <!-- BEGIN level3 level4 -->
      <!-- BEGIN level3 -->
      <div class="statement-new-league-rule">
        <!-- END -->

        <p style="margin-bottom: 10px">
          Vous pouvez préparer une potion pour n'importe lequel des clients dans la hutte, mais les clients en tête de
          queue
          (correspondant aux commandes les plus à gauche) peuvent vous octroyer un <b>bonus d'urgence</b>. Le bonus fonctionne ainsi&nbsp;:
        <ul>
          <li>
            Préparer une potion pour le tout premier client vous octroie un <const>bonus +3 rubis</const>, mais ceci ne
            peut se produire qu'au plus <const>4</const> fois dans une partie.</li>
          <li>
            Préparer une potion pour le second client vous octroie un <const>bonus +1 rubis</const>, mais ceci ne peut
            se produire qu'au plus <const>4</const> fois dans une partie.</li>

          <li>
            Si tous les <const>bonus +3 rubis</const> ont été donnés, les <const>bonus +1 rubis</const> seront donnés par
            le <b>premier</b> client plutôt que par le second.</li>
        </ul>
        <!-- BEGIN level3 -->
      </div>
      <!-- END -->
      <!-- END -->

      <!-- BEGIN level1 level2 -->
      Si les deux sorcières préparent la même potion, elles gagnent <b>toutes les deux</b> son prix en rubis.
      <!-- END -->

      <p style="margin-bottom: 10px">
        Au début de chaque tour, de nouvelles commandes apparaissent en fin de queue (à droite) pour combler les espaces libres.
      </p>


      <p style="margin-bottom: 10px">
        Chaque commande a un identifiant unique <var>id</var> et peut être préparée avec l'instruction
        <action>BREW id</action>. </p>
      </p>


      <!-- BEGIN level1 -->
      <p>Vous pouvez également passer votre tour avec l'instruction <action>WAIT</action>.</p>
      <!-- END -->

      <h3 style="font-size: 14px;
        font-weight: 700;
        padding-top: 5px;
        color: #838891;
        padding-bottom: 15px;">
        ⛔ Fin du jeu</h3>

      <!-- BEGIN level1 level2 level3 level4 -->
      <p style="margin-bottom: 10px">
        <!-- BEGIN level1 -->
        La partie prend fin lorsqu'au moins une sorcière a préparé <const>2</const> potions.
        <br>
        <!-- END -->
        <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        La partie prend fin lorsqu'au moins une sorcière a préparé <const>3</const> potions.
        <br>
      </div>
      <!-- END -->
      <!-- BEGIN level3 -->
      <div class="statement-new-league-rule">
        La partie prend fin lorsqu'au moins une sorcière a préparé <const>6</const> potions.
        <br>
      </div>
      <!-- END -->
      <!-- BEGIN level4 -->
      La partie prend fin lorsqu'au moins une sorcière a préparé <const>6</const> potions.
      <br>
      <!-- END -->
      <br>
      La partie se termine automatiquement après <const>100 tours</const>.
      </p>
      <!-- END -->


      <!-- BEGIN level2 level3 level4 -->
      <!-- BEGIN level2 -->
      <div class="statement-new-league-rule">
        <!-- END -->
        <p style="margin-bottom: 10px">
          Les joueurs gagnent <const>1 rubis</const> pour chaque ingrédient de type 1 ou plus présent dans leur
          inventaire en fin de partie.</p>
        <!-- BEGIN level2 -->
      </div>
      <!-- END -->
      <!-- END -->

      <!-- Victory conditions -->
      <div class="statement-victory-conditions">
        <div class="icon victory"></div>
        <div class="blk">
          <div class="title">Conditions de victoire</div>
          <div class="text">
            <ul style="padding-top:0; padding-bottom: 0;">
              Le gagnant est le joueur avec le plus de rubis.
            </ul>
          </div>
        </div>
      </div>
      <!-- Lose conditions -->
      <div class="statement-lose-conditions">
        <div class="icon lose"></div>
        <div class="blk">
          <div class="title">Conditions de défaite</div>
          <div class="text">
            <ul style="padding-top:0; padding-bottom: 0;">
              Votre programme n'a pas répondu dans le temps imparti ou l'une des instructions est invalide.
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
        🐞 Conseils de débogage</h3>
      <ul>
        <li>Survolez un sort ou une recette pour voir davantage d'informations</li>
        <li>Ajoutez du texte à la fin d'une instruction pour afficher ce texte à côté de votre sorcière</li>
        <li>Cliquez sur la roue dentée pour afficher des options supplémentaires</li>
        <li>Utilisez le clavier pour contrôler les actions&nbsp;: espace pour lire/mettre en pause, les flèches pour
          avancer pas à pas</li>
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
        <span>Détails techniques</span>
      </h2>
      <div class="statement-expert-rules-content">
        <ul style="padding-left: 20px;padding-bottom: 0">
          <li>
            Lorsque les deux sorcières effectuent la même action, elles gagnent toutes les deux les résultats de cette
            action. Ceci s'applique notamment à la vente de potions, au bonus d'urgence, la pose/collecte de la
            taxe de lecture-d'avance et l'apprentissage de sorts.</li>
          <li>
            Si les deux sorcières préparent la même commande avec un bonus d'urgence, deux des bonus de ce type seront
            consommés. S'il ne reste qu'un seul bonus, il est consommé et les deux sorcières reçoivent quand même ce
            bonus de rubis.</li>

          <li>
            L'ordre dans lequel arrivent les sorts dans le grimoire est aléatoire. Cependant, la liste des sorts
            possibles est toujours la même.</li>

          <li>
            Après avoir appris un sort, la version apprise du sort a un identifiant différent de la version dans le
            grimoire.</li>
          <li>
            Vous pouvez voir le code source sur
            <a rel="nofollow" target="_blank" href="https://github.com/CodinGame/FallChallenge2020">ce repo GitHub</a>.
            La liste des sorts possibles du grimoire s'y trouve.
          </li>
          <li>
            Une sorcière ne peut obtenir un ingrédient depuis le grimoire dans le même tour où l'ingrédient y est posé
            par l'autre sorcière.</li>
          <li>
            Si le tout dernier sort du grimoire est appris au même tour qu'une taxe de lecture-d'avance est posée,
            l'ingrédient de type 0 en trop est perdu.</li>
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
      <span>Protocole de jeu</span>
    </h2>

    <!-- Protocol block -->
    <div class="blk">
      <div class="title">Entrées pour un tour de jeu</div>
      <div class="text">

        <!-- BEGIN level1 -->
        <span class="statement-lineno">Ligne 1:</span> un entier <var>actionCount</var> pour le nombre de commandes
        disponibles.<br>
        <!-- END -->
        <!-- BEGIN level2 -->
        <span class="statement-lineno">Ligne 1:</span> un entier <var>actionCount</var> pour le total des deux ensembles
        de sorts des joueurs et des commandes disponibles.<br>
        <!-- END -->
        <!-- BEGIN level3 -->
        <span class="statement-lineno">Ligne 1:</span> un entier <var>actionCount</var> pour le total des sorts du
        grimoire, des deux ensembles de sorts des joueurs et des commandes disponibles.<br>
        <!-- END -->

        <span class="statement-lineno">Les <var>actionCount</var> lignes suivantes:</span>
        <const>11</const> valeurs pour décrire une action du jeu.<br>
        <!-- BEGIN level2 level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <ul>
            <li><var>actionId</var> l'identifiant de cette action</li>
            <li> <var>actionType</var>: une chaîne de caractères <ul>
                <!-- BEGIN level2 level3 level4 -->
                <li>
                  <const>CAST</const> pour l'un de vos sorts
                </li>
                <li>
                  <const>OPPONENT_CAST</const> pour l'un des sorts de votre adversaire
                </li>
                <!-- END -->

                <!-- BEGIN level3 level4 -->
                <li>
                  <const>LEARN</const> pour un sort du grimoire
                </li>
                <!-- END -->
                <li>
                  <const>BREW</const> pour une commande de potion
                </li>
              </ul>
            </li>
            <li> <var>delta0</var>, <var>delta1</var>, <var>delta2</var>, <var>delta3</var>: les quatre entiers décrivant la production/consommation de chaque type d'ingrédient.</li>
            <li> <var>price</var> le nombre de rubis que fera gagner cette action s'il s'agit d'une commande, <const>0</const>
              sinon.
              <!-- BEGIN level3 level4 -->
              Inclut le bonus d'urgence.
              <!-- END -->
              </li>

            <!-- BEGIN level1 level2 -->
            <li> <var>tomeIndex</var>: ignorer pour cette ligue.</li>
            <li> <var>taxCount</var>: ignorer pour cette ligue.</li>
            <!-- END -->
            <!-- BEGIN level1 -->
            <li> <var>castable</var>: ignorer pour cette ligue.</li>
            <!-- END -->
            <!-- BEGIN level1 -->
            <li><var>repeatable</var>: ignorer pour cette ligue.</li>
            <!-- END -->

            <!-- BEGIN level3 level4 -->
            <li> <var>tomeIndex</var> la position dans la liste des sorts disponibles dans le grimoire s'il s'agit d'un sort du grimoire, <const>-1</const>
              sinon.
              Est égal à la taxe de lecture-d'avance pour apprendre ce sort.<br>
            C'est aussi la <b>valeur</b> du bonus d'urgence s'il sagit d'une commande.</li>
            <li> <var>taxCount</var>
              la quantité d'ingrédients de type 0 que vous recevrez en apprenant ce sort, s'il s'agit d'un sort du grimoire, <const>0</const> sinon.
            <br>C'est aussi le <b>nombre</b> de fois que le bonus d'urgence peut encore être récupéré s'il s'agit d'une commande.</li>

            <!-- END -->
            <!-- BEGIN level2 level3 level4 -->

            <li> <var>castable</var>
              <const>1</const> si ceci est un sort d'un joueur qui n'est pas épuisé, <const>0</const> sinon.
            </li>
            <!-- END -->
            <!-- BEGIN level3 level4 -->
            <li><var>repeatable</var>: <const>1</const> si ce sort est répétable, <const>0</const> sinon</li>
            <!-- END -->
            <!-- BEGIN level2 -->
            <li><var>repeatable</var>: ignorer pour cette ligue.</li>
            <!-- END -->

          </ul>
          <!-- BEGIN level2 level3 -->
        </div>
        <!-- END -->
        <span class="statement-lineno">Les <const>2</const> lignes suivantes:</span>
        <const>5</const> entiers pour décrire chaque joueur, <b>vous</b> êtes toujours en premier&nbsp;:
        <ul>
          <li><var>inv0</var> pour le nombre d'ingrédients de type 0 dans l'inventaire</li>
          <li><var>inv1</var> pour le nombre d'ingrédients de type 1 dans l'inventaire</li>
          <li><var>inv2</var> pour le nombre d'ingrédients de type 2 dans l'inventaire</li>
          <li><var>inv3</var> pour le nombre d'ingrédients de type 3 dans l'inventaire</li>
          <li><var>score</var> pour le nombre de rubis gagnés</li>
        </ul>
      </div>
    </div>

    <!-- Protocol block -->
    <div class="blk">
      <div class="title">Sortie pour un tour de jeu</div>
      <div class="text">
        Une seule ligne contenant votre instruction&nbsp;:

        <!-- BEGIN level2 level3 -->
        <div class="statement-new-league-rule">
          <!-- END -->
          <ul style="padding-left: 20px;padding-top: 0">
            <li>
              <action>BREW id</action>: votre sorcière tente de préparer la potion avec l'identifiant donné.
            </li>
            <!-- BEGIN level2 level3 level4 -->
            <li>
              <action>CAST id</action>: votre sorcière tente de lancer le sort avec l'identifiant donné.
            </li>
            <!-- END -->
            <!-- BEGIN level3 level4 -->
            <li>
              <action>CAST id times</action>: votre sorcière tente de lancer un sort répétable le nombre donné de fois.
            </li>
            <li>
              <action>LEARN id</action>: votre sorcière tente d'apprendre le sort du grimoire avec l'identifiant donné.
            </li>
            <!-- END -->

            <!-- BEGIN level2 level3 level4 -->
            <li>
              <action>REST</action>: votre sorcière récupère, vos sorts épuisés redeviennent lançables.
            </li>
            <!-- END -->
            <li>
              <action>WAIT</action>: votre sorcière ne fait rien.
            </li>
          </ul>
          <!-- BEGIN level2 level3 -->
        </div>
        <!-- END -->
      </div>
    </div>

    <div class="blk">
      <div class="title">Contraintes</div>
      <div class="text">
        <const>0</const> &lt; <var>actionCount</var> ≤ <const>100</const><br>
        <const>6</const> ≤ <var>price</var> ≤ <const>23</const><br>
        Temps de réponse par tour ≤ <const>50</const>ms<br>
        Temps de réponse au premier tour ≤ <const>1000</const>ms
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

    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">
        Qu'est-ce qui m'attend dans les prochaines ligues&nbsp;?
    </p>
    Les nouvelles règles débloquées dans les prochaines ligues sont&nbsp;:
    <ul>
      <!-- BEGIN level1 -->
      <li>Lancer des sorts pour produire et transformer des ingrédients</li>
      <!-- END -->
      <li>Apprendre de nouveaux sorts grâce au grimoire</li>
    </ul>
  </div>
  <!-- END -->

</div>