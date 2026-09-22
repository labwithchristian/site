---
title: "Homelab"
description: "A single-node blue team lab built on the Blue Team Roadmap's portfolio design: the architecture, the hardware, and the six projects it exists to produce."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: true
showWordCount: false
---

A single-node blue team lab built from a repurposed workstation. The design follows Phase 9 of the [Blue Team Roadmap](https://github.com/keraattin/Blue-Team-Roadmap#phase-9-build-your-portfolio): a small corporate network, a monitoring stack watching it, and an isolated room for malware. It exists to produce six portfolio projects, and every piece of it is here because one of them needs it.

## Build Status

{{< pipeline items="Lab foundation :: In progress :: Proxmox and OPNsense, then the three segments and the corporate network | Portfolio projects :: Planned :: Six projects from the roadmap, plus vulnerability management, each ending in a writeup" >}}

The lab is done when each project below has a published writeup, not when every tool is installed.

## Hardware

{{< specs >}}

{{< spec role="Host" title="Proxmox Node" rows="CPU: AMD Ryzen 9 5900X, 12 cores | Board: Gigabyte B550 AORUS ELITE V2 | Memory: 32GB G.Skill DDR4-3200, non-ECC | Power: EVGA SuperNOVA G3 1000W" tags="Proxmox VE 9.2, ZFS, Virtualization" >}}
A repurposed workstation rather than a used enterprise server, and already in service. Staying at 32GB is a deliberate call: memory pricing moved against the build, and the next dollar buys more in storage than in headroom. The roadmap asks for 16GB or more, so 32GB clears it, as long as each project runs only what it needs.
{{< /spec >}}

{{< spec role="Storage" title="NVMe and Expansion" rows="Boot and VMs: 1TB Seagate FireCuda 530 NVMe | State: in service, near capacity | Next: second NVMe or 2TB SATA SSD" tags="ZFS, Capacity" >}}
The expansion comes first. Security Onion alone asks for 200GB, and the Windows images and snapshots add up quickly. Bulk hard drives and an HBA are deferred on purpose: slot count, not budget, is the constraint.
{{< /spec >}}

{{< spec role="Network" title="Quad-Port Intel I350" rows="Vendor: NICGIGA | Ports: Four gigabit, plus the onboard NIC | State: planned" tags="Bridges, Segmentation" >}}
Separate ports mean the segments can be split at the NIC rather than only in software, with the onboard NIC kept for management.
{{< /spec >}}

{{< spec role="Access" title="Out-of-Band Management" rows="Device: Sipeed NanoKVM-PCIe (Basic) | Function: Remote KVM over IP | State: planned" tags="Remote Console, Recovery" >}}
Console access that survives the host being unreachable. A lab that detonates malware on purpose needs a way back in that does not depend on whatever just broke.
{{< /spec >}}

{{< spec role="Power" title="1000VA LiFePO4 UPS" rows="Vendor: GoldenMate | Output: 600W, pure sine wave | State: planned" tags="NUT, Graceful Shutdown" >}}
Lithium iron phosphate rather than sealed lead acid, for the cycle life. Sized for a graceful shutdown through NUT, not for riding out an outage.
{{< /spec >}}

{{< spec role="Open" title="GPU and Case" rows="GPU: RTX 3080 10GB, possible swap to RTX 3060 12GB | Case: Fractal Meshify 2 or SilverStone CS380 V2" tags="Decisions Open" >}}
The GPU trade is idle draw against local model work. The case decision waits on the storage expansion, since drive bays are the deciding factor.
{{< /spec >}}

{{< /specs >}}

Deferred on purpose: bulk hard drives, an HBA, a motherboard swap, and a second node. A refurbished rack server stays an option later as a storage node, not a replacement.

## Network

The roadmap's three segments, plus a management segment of my own, with OPNsense as the only path between them. Segmentation is built and verified before anything malicious runs.

{{< network-diagram >}}

| Segment | Purpose | Uplink |
|---|---|---|
| Management | Hypervisor, remote console, backups | Onboard NIC |
| VLAN 10, Corporate | The network being defended: a domain controller, Windows endpoints, a Linux workstation | Intel I350, outbound only |
| VLAN 20, SOC | The tools watching it: SIEM, network monitoring, case management | Intel I350 |
| VLAN 30, Malware | Untrusted samples and the tools that take them apart | None |

Endpoint agents in Corporate report to the SIEM in SOC through a single allowed rule. Security Onion sees Corporate traffic through a mirrored port on the Corporate bridge, so it watches the network without being part of it. Security Onion runs its own Elasticsearch internally, so here it is kept to network monitoring, and endpoint logs go to Elastic Security.

## What Runs Where

The stack is the roadmap's, with two choices made where it offers options. OPNsense stands in for pfSense: both are open source, and OPNsense was already running. For the SIEM, the roadmap names Wazuh or Splunk Free in its lab and lists Elastic alongside them in its SIEM table. Elastic Security is the pick: its free tier includes detection with alerting, it runs entirely inside the lab, and it is a commercial platform teams actually deploy, not only a lab tool.

| Segment | Tool | Role |
|---|---|---|
| All | Proxmox VE 9.2 with ZFS | Hypervisor, snapshots, and backups to the second disk |
| All | OPNsense | Routing, segmentation, rule enforcement |
| Corporate | Windows Server 2022 | Domain controller and Active Directory |
| Corporate | Windows 10 and 11 | Endpoints. Sysmon records process, network and file activity in the format most detection rules and IR datasets expect. Elastic Defend adds malware protection. Elastic Agent ships both |
| Corporate | Ubuntu | Linux workstation |
| SOC | Elastic Security | SIEM: Elasticsearch, Kibana and Fleet for collection, detection rules, alerts and dashboards |
| SOC | Security Onion | Network detection with Zeek and Suricata |
| SOC | TheHive | Case management for every investigation |
| Malware | FLARE-VM | Windows malware analysis |
| Malware | REMnux | Linux malware analysis and network simulation |

## The Six Projects

These are the roadmap's portfolio projects, in the order they come off the lab. Each one ends in a published writeup.

| Project | What it proves | Uses |
|---|---|---|
| 1. SIEM deployment and dashboards | Getting Windows, Sysmon and network logs into one place and making them readable | Corporate, Elastic Security, Security Onion |
| 2. Adversary emulation | Running MITRE ATT&CK techniques on purpose, checking what the SIEM saw, and writing rules for what it missed | Atomic Red Team on a Corporate endpoint, Elastic Security, with Elastic Defend set to detect rather than block |
| 3. Phishing analysis pipeline | Headers, URLs and attachments taken apart, with a script that pulls out the IOCs | REMnux, a small Python tool |
| 4. Incident response reports | A full investigation written the way it would be handed to a client: summary, timeline, IOCs, ATT&CK mapping, remediation | Retired HTB Sherlocks and CyberDefenders labs, FLARE-VM, TheHive |
| 5. Threat intelligence brief | One threat group's TTPs turned into detections I can test | Public reporting, Elastic Security |
| 6. Detection rules in the open | Sigma and YARA rules written, tested here, and submitted upstream | Elastic Security, REMnux |

### One addition: vulnerability management

The roadmap does not cover vulnerability management, and it is the role I am closest to. So the lab adds one project with no new target machines: the Corporate network is the scan target, which means the scanner is looking at the same hosts the SIEM is watching.

| Function | Tool | Role |
|---|---|---|
| Scanning | Qualys Community Edition | One platform, two views of the same hosts: the network scanner appliance and the Cloud Agent. The free tier covers 16 internal IPs and 16 agents, well past what Corporate needs |
| Findings | DefectDojo | System of record: ownership, status, deduplication |
| Prioritization | CISA KEV and FIRST EPSS | Rank by real-world exploitation, not CVSS alone |

ServiceNow Vulnerability Response is on hold as the system of record. It replaces DefectDojo only after it passes a test on a free ServiceNow developer instance.

{{< vm-loop >}}

A finding is closed when a rescan proves it, not when a ticket says so.

## Resource Plan {.h-minor}

The whole stack does not fit in 32GB at once, and it does not need to. Each project runs only its own set of machines, and everything else stays powered off.

| Project | Runs | Planned memory |
|---|---|---|
| SIEM and dashboards | OPNsense, domain controller, one Windows endpoint, Ubuntu, Elastic Security, Security Onion | About 27GB |
| Adversary emulation | OPNsense, domain controller, one Windows endpoint, Elastic Security | About 17GB |
| Phishing, IR reports, YARA | FLARE-VM or REMnux, TheHive when a case needs it | 8 to 20GB |
| Vulnerability management | OPNsense, the Corporate hosts, the Qualys scanner appliance, DefectDojo | About 19GB |

The heaviest pieces: Security Onion's evaluation mode asks for 8GB and TheHive about 4GB for each of its three services, both vendor minimums. Elastic Security is planned at 8GB for Elasticsearch, Kibana and Fleet Server on one VM. That figure is a planning allowance, since Elastic publishes no lab-sized minimum. The Qualys scanner appliance ships at 4 vCPU and 8GB but runs on as little as 2GB, so it is planned at 4GB.

## Operating Constraints {.h-minor}

- Projects are scheduled, not stacked. Nothing runs that the current project does not need.
- No inbound port forwards. The lab is never reachable from the internet.
- Qualys Community Edition keeps scan data for 90 days, so any scan worth writing up is exported the week it runs.
- The malware segment has no uplink, no shared folders and no shared clipboard, and every analysis VM reverts to a clean snapshot after use.
- Attack techniques are only run against machines in this lab, and Elastic Defend is switched to detect-only on the endpoint being tested so it records the technique instead of stopping it.
- No addresses, hostnames, or topology specifics are published here. That is deliberate.

<!--
## Changelog {.h-minor}

- **17 September 2026:** Restructured into two phases. Vulnerability management is Phase 1, with detection and the attack range moved to Phase 2.
- **20 September 2026:** Scanner stack set to Greenbone, Nessus Essentials Plus, and Qualys Community Edition.
- **22 September 2026:** Rebuilt as a blue team lab on the Blue Team Roadmap's Phase 9 design: three segments, the roadmap's tool stack, and its six portfolio projects. Elastic Security chosen as the SIEM over Wazuh and Splunk, with Elastic Defend beside Sysmon on the endpoints. Vulnerability management kept as one added project, scanning with Qualys Community Edition alone. ServiceNow Vulnerability Response on hold pending a test, with DefectDojo meanwhile. The offensive Phase 2 (Ludus, GOAD-Light) removed for now.
-->

{{< wip title="Still cooking" >}}
The lab is being built and documented as it lands, with sanitized configs, Sysmon settings and detection rules published alongside on [GitHub](https://github.com/labwithchristian).

Check the [Writeups]({{< ref "writeups" >}}) section for the projects that are done.
{{< /wip >}}
