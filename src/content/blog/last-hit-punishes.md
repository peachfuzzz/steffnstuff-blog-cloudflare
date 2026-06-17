---
title: "How to Last-Hit Punish"
author: Peachfuzzz
pubDatetime: 2026-06-16T16:30:12.000+00:00
slug: last-hit-punish
featured: false
draft: false
tags:
  - league of legends
description: "How to implement last-hit punishes, a commonly misunderstood piece of advice for newer players"
---
A common piece of laning advice parroted by experienced players is to "throw your skillshot when the enemy is last hitting." It also makes logical sense: when the opponent is trying to last hit, they will inevitably stop in place to use their basic attack or spells. Why wouldn't you take advantage of this window? It seems so straightforward. Wait for your target to last hit, press your button, claim your profits. Unfortunately, the same pithiness that keeps this adage alive is also what makes it tricky to implement. Let's walk through the implementation of this idea, what we'll call a "last-hit punish."
## The opponent is predictable, not immobile

The traditional explanation of why last-hit punishes work is incomplete. Skillshots are hard to land in League not just because your target can move, but also because you don't know *how* they'll move. Absent of something to fight over, players tend to click (and move) unpredictably. Throwing a skillshot when an opponent a) knows you can hit them and b) doesn't have anything else holding their attention leaves much to pure chance. You'd need to effectively read their mind to have a good shot. 

Fortunately, we don't need to read minds! The structure of lane gives both you and your opponent something besides combat to think about: last-hits. Everybody loves killing minions. At some point in lane, you know your opponent will predictably be in range of one of your minions to secure a last-hit. You also know, without much guesswork, *when* they will behave predictably. Players think hardest about securing minions when they get low. The lower health any of your minions are, the more predictable your opponent becomes. If you keep an eye on your minion healthbars, you can guess with pretty high confidence when your opponent will behave like clockwork. The last-hit punish takes advantage of this simple idea: every so often, you know what your opponent will want, and so you can guess with higher confidence where they'll be.
## Press your buttons in anticipation, not reaction

You can break down the process of securing a last-hit into three steps.
1. Walk-up step: The opponent walks into range of the dying minion.
2. Attack step: The opponent spends a basic attack or spell on the minion to kill it.
3. Back step: The opponent walks away back to safety out of your effective range.

There's actually a zeroth step you can include: the opponent deciding whether or not they actually want to commit to securing a last-hit. Your opponent (and you!) will constantly engage in all of these behaviors every time they look for a minion like clockwork. 

However, League is a very fast game. All of these steps take less than a second. If you only watch for the attack step to try your last-hit punish, you'll often find yourself firing spells at blank space. This game is too fast for these sorts of pure reaction responses. Instead, you want to throw your harass right before the opponent initiates their attack animation, **reacting to the walk-up instead of their attack animation**. As mentioned, you're taking advantage of the opponent's predictability more than their lack of movement. If your spell is already in the air before the opponent's attack has finished collecting the minion gold, you're timing it right. 
## Last-hit punishes create pressure, not just damage

Remember, your goal with last-hit punishes is broader than just landing skillshots—you want to make your lane opponent's job as hard as possible. When you constantly engage in last-hit punishes, you force them to consider every minion as a tradeoff with real costs.
- If they want a last-hit, they'll likely take damage for it
- If they want to maintain their HP, they're giving up minion gold

Beyond forcing your opponent into considering the simple calculus of HP vs minion gold, you're also conditioning your opponent into constantly thinking about the threat of your damage. This too has its own tradeoffs for them!
- If they stay very far away from the wave to prevent any interaction until they're under the safety of their tower, you now have full control over the wave without needing to spend resources fighting them.
- If they spend their abilities, which generally are more effective (longer range, higher damage) for killing minions, they're sacrificing a significant amount of their combat potential, especially their mana. In a situation like this, you're free to trade with them much more aggressively after they secure their cs with abilities, since they can't fight back at all.
- If they constantly take the damage-for-minion trade, they'll eventually fall into your kill range, after which they have a much harder and more costly version of the question to answer for themselves. Do they risk death to catch whatever scraps of gold and experience they can scrounge up, or do they recall and guarantee a significant loss of resources?

If your opponent starts fighting back against your last-hit punishes, now you've got a game on your hands. Unfortunately, navigating a scrappier lane like that is out of the scope of this piece, but we'll get around to it eventually!
## Counterplay: bluffing your approach

Last-hit punishes are not infallible. While your opponent is more predictable when they go for last-hits, they do not have to kill every minion at the same time, nor in the same way. A minion secured at 80 HP has the same value as a minion secured at 8 HP, so your opponent is free to mix up the exact timing of when they secure a minion relative to how much damage a minion is taking from your own wave. If you're reacting to their walk-up motion to time your last-hit punish, the opponent could attempt a walk-up when the minion is still higher HP, dodge your ability, and then secure the minion without risk of your main punish. 

The same (for all of the above, but especially the counterplay) can all be reversed if you're on the receiving end of last-hit punishes. If you find that your opponent is constantly landing harass as you walk up to secure your minions, try mixing up your last-hit approaches. Fake a move in early, approach from different angles in the lane, ignore the minion completely to trade back, etc. Last-hit punishes prey on moments of predictability. The less predictable you or your target are, the less reliable last-hit punishes become.