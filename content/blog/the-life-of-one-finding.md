---
title: "The Life of One Finding"
date: 2026-10-01
draft: true
tags: ["homelab", "vulnerability-management"]
description: "One vulnerability, followed from discovery to proof it is gone. Why the next phase of the lab is vulnerability management."
---

This is a story about a single row in a spreadsheet.

It is not an exciting row. It will never be a conference talk. But most of security, the part that actually keeps companies out of the news, is what happens to rows like this one.

## Monday: it exists

A server is running an old version of something. Nobody knows. Nobody decided this. It was fine when it was built, and then time happened.

At this point the finding is not a finding. It is just a fact nobody has written down.

## Tuesday: it gets found

A scanner runs and writes it down. Severity: High. The scanner is thrilled. It found 2,000 other things too.

This is where most people think the work is done. A tool found the problem. Security has occurred.

It has not. Security has been *detected*. Those are different verbs.

## Wednesday: nobody owns it

The finding sits in a report. The report goes to a distribution list. The distribution list has fourteen people on it, which means it has zero people on it.

The server belongs to a team. Which team? The inventory says one thing, the name of the server says another, and the person who built it left two years ago.

This is the real bottleneck in most programs. Not finding. Owning.

## Thursday: it has to compete

Now it has an owner, and the owner has 300 other findings. Which one first?

The score says High. So do 400 of its neighbors. A score tells you how bad something *could* be. It does not tell you whether anyone out there is actually using it.

So you ask better questions. Is this being exploited in the wild right now? How likely is it to be? Is this server reachable by anything that matters? Suddenly the list of 400 is a list of 12. That is a list a human can work.

## Friday: it gets fixed, maybe

The fix needs a change window. The change window needs approval. Approval needs someone to confirm nothing else depends on the old version. Something does, of course.

Eventually the patch goes in. The ticket gets closed. Everyone feels good.

## The following Tuesday: it gets proven

The scanner runs again. Either the row is gone or it is not.

This is the only step that counts, and it is the one most often skipped. A closed ticket is a claim. A clean rescan is evidence. I have a strong preference for evidence.

Finding the vulnerability is reading the recipe. Closing the ticket is saying dinner is ready. The rescan is someone actually eating it.

## Why I am building this

Most of my career has been on the operations side, the side that lives in Wednesday through Friday. Ownership, change windows, the one dependency nobody documented. That is where vulnerability management succeeds or fails, and it is the part the tools cannot do for you.

So the next phase of my lab is that whole week, run on purpose, end to end:

1. An inventory, so every finding has a home.
2. Two scanners, so I can see what each one misses.
3. Prioritization by real-world exploitation, not scores alone.
4. Fixes through automation, so they are repeatable and documented.
5. A rescan, every time, before anything is called closed.
6. One dashboard and one page a manager could actually read.

## Who this is for

If you work in IT operations and you have been on the receiving end of the spreadsheet, this is for you.

If you run a small team with no security staff, most of this is free tools and discipline. The discipline is also free. Just not easy.

If you are trying to figure out whether I know what I am doing, this is the answer. With receipts.

## Next

First is network segmentation, because I am about to host deliberately broken machines and would like them to stay in their room. Then the inventory, the least exciting step and the one most programs skip.

Later there is a second phase: an attack range, and just enough detection to see what each attack leaves behind. Kitchen gets cleaned before anyone starts a grease fire on purpose.

---

## Notes to self, delete before publishing

- Alternative to "A Scan Report Is Not a Fix." Pick one; do not publish both.
- The week in this post is a composite scenario, not a story from a past employer. Keep it that way, or sanitize any real detail: no employer systems, counts, or client names.
- The numbers (2,000, 400, 12, fourteen people) are illustrative. Fine for narrative, but do not let them read like claims about a real environment.
- Publish after "RAM ate my budget." Link back in the intro, forward to the segmentation writeup, and link "a second phase" to the Phase 2 section of /homelab/.
- Framing check: reads as operations discipline, which works for ops, change, and incident management roles too.
- OPSEC: no addresses, hostnames, or topology specifics.
- Likely runs a bit longer than the original. Check reading time lands around 4 minutes. Set `draft: false` and fix the date on publish.
