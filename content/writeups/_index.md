---
title: "Writeups"
description: "Technical writeups: network segmentation, telemetry, detection engineering, vulnerability management, and control mapping."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: false
showWordCount: false
---

The formal register. Methodology, decisions, and evidence, written for practitioners rather than recruiters. Each piece comes out of a milestone in the [lab]({{< ref "homelab" >}}), with sanitized configs and playbooks published alongside on [GitHub](https://github.com/labwithchristian).

## What's planned

| Writeup | Covers |
|---|---|
| Network segmentation | VLAN design, inter-segment policy, and what the detonation network is allowed to reach |
| Asset and software inventory | Knowing what is on the network before trying to defend it |
| Telemetry pipeline | Log sources, collection, retention, and the cost of keeping everything |
| Detection engineering | Rules written against behavior, mapped to MITRE ATT&CK, tuned for signal |
| Vulnerability assessment | Scanning, scoping, and reading output without drowning in it |
| Vulnerability management | The harder half: ownership, remediation, and tracking to closure |
| CIS Controls v8 mapping | The capstone. Controls mapped to implemented evidence |

{{< soon title="Nothing published yet" status="drafting" >}}
The lab has to run before the writeups mean anything. First pieces land as each milestone completes, starting with segmentation.

In the meantime, the [Homelab]({{< ref "homelab" >}}) page tracks build status, and the [Blog]({{< ref "blog" >}}) will carry the shorter reasoning behind decisions.
{{< /soon >}}
