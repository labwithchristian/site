---
title: "Writeups"
description: "Technical writeups: blue team lab projects, incident response reports, CTF challenges, public breach analysis, and detection rules."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: false
showWordCount: false
---

The formal register. Methodology, decisions, and evidence, written for practitioners and hiring managers rather than recruiters. The [lab]({{< ref "homelab" >}}) is where most of it starts, but not where it stops: incident response reports from retired Hack The Box Sherlocks and blue team labs, and public breaches worth taking apart, land here too. Sanitized configs, Sysmon settings and detection rules go on [GitHub](https://github.com/labwithchristian).

## What's planned

The lab's six projects follow keraattin's [Blue Team Roadmap](https://github.com/keraattin/Blue-Team-Roadmap#phase-9-build-your-portfolio), plus one of my own. Each project ends in at least one writeup here.

| Writeup | Covers | Source |
|---|---|---|
| Network segmentation | The three segments, the OPNsense rules between them, and why the malware segment has no way out | Lab |
| SIEM deployment and dashboards | Windows, Sysmon and network logs in Elastic Security and Security Onion, and the detections and dashboards built on top | Project 1 |
| Adversary emulation | Atomic Red Team techniques run on purpose, what the SIEM caught, and the rules written for what it missed | Project 2 |
| Phishing analysis | One email taken apart end to end, and the script that pulls out its IOCs | Project 3 |
| Incident response reports | Full investigations from retired Sherlocks and blue team labs: summary, timeline, IOCs, ATT&CK mapping, remediation | Project 4 |
| Threat intelligence brief | One threat group's techniques, turned into detections tested in the lab | Project 5 |
| Detection rules | Sigma and YARA rules, how they were tested, and the pull requests upstream | Project 6 |
| Vulnerability management | Qualys agent and network scans of the same hosts compared, and one finding followed from scan to verified fix | Added project |
| CTF writeups | Challenges from scored competitions: approach, tools and what I would do differently. Published after an event closes, and only where its rules allow | {{< ctf-link >}} |

{{< soon title="Nothing published yet" status="drafting" >}}
First up are incident response reports, since they need no lab build, then segmentation and the SIEM as the lab comes online.

In the meantime, the [Homelab]({{< ref "homelab" >}}) page tracks build status, and the [Blog]({{< ref "blog" >}}) will carry the shorter reasoning behind decisions.
{{< /soon >}}
