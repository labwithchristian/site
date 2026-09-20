---
title: "Writeups"
description: "Technical writeups: lab builds, vulnerability management end to end, public breach analysis, and offensive practice."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: false
showWordCount: false
---

The formal register. Methodology, decisions, and evidence, written for practitioners and hiring managers rather than recruiters. The [lab]({{< ref "homelab" >}}) is where a lot of it starts, but not where it stops: public breaches worth taking apart, CTFs, and Hack The Box and TryHackMe machines land here too. Sanitized configs and playbooks go on [GitHub](https://github.com/labwithchristian).

## What's planned

Each writeup follows a milestone in the lab, so they land in build order.

| Writeup | Covers | Phase |
|---|---|---|
| Network segmentation | The Proxmox bridges, the OPNsense policy between them, and what the target segment is allowed to reach | 1 |
| Asset inventory | NetBox as the source of truth, because nothing can be managed before it is counted | 1 |
| Scanning and scoping | Greenbone, Nessus, and Qualys, credentialed and unauthenticated, kept inside the segments the rules allow | 1 |
| Triage and prioritization | DefectDojo as the system of record, ranked with CISA KEV and FIRST EPSS rather than CVSS alone | 1 |
| Remediation and verification | Ansible fixes, rescans that prove them, and findings tracked to closure | 1 |
| Running it as a program | The vulnerability management standard, the exception process, and the false-positive procedure | 1 |
| CIS Controls v8 mapping | The capstone. Controls mapped to implemented evidence | 1 |
| Attack range | Ludus with GOAD-Light, and the rules that keep the range from reaching anything else | 2 |
| Detection from attacks | Sysmon and Wazuh: what each technique left behind, paired with the attack that caused it | 2 |

{{< soon title="Nothing published yet" status="drafting" >}}
The lab has to run before the writeups mean anything. First pieces land as each Phase 1 milestone completes, starting with segmentation, then inventory and the first scan.

In the meantime, the [Homelab]({{< ref "homelab" >}}) page tracks build status, and the [Blog]({{< ref "blog" >}}) will carry the shorter reasoning behind decisions.
{{< /soon >}}
