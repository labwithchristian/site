---
title: "Homelab"
description: "Architecture, hardware, and software for the home lab. A maintained reference, updated as the build changes."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: true
showWordCount: false
---

A single-node lab built from a repurposed workstation. Phase 1 runs a vulnerability management program end to end: know what exists, find what is wrong, fix it, and prove the fix. Phase 2 adds an attack range and just enough detection to see what each attack leaves behind.

## Build Status

{{< pipeline items="Phase 1: Infrastructure and vulnerability management :: In progress :: Inventory, scanning, triage, remediation, and the evidence at every step | Phase 2: Attack range and detection :: Planned :: Validation range, with the telemetry each technique leaves behind" >}}

Phase 1 is complete when a finding can travel the whole loop, from inventory to verified fix to report, with evidence at every step.

## Hardware

{{< specs >}}

{{< spec role="Host" title="Proxmox Node" rows="CPU: AMD Ryzen 9 5900X, 12 cores | Board: Gigabyte B550 AORUS ELITE V2 | Memory: 32GB G.Skill DDR4-3200, non-ECC | Power: EVGA SuperNOVA G3 1000W" tags="Proxmox VE 9.2, ZFS, Virtualization" >}}
A repurposed workstation rather than a used enterprise server. In service, with Phase 1 sized to fit inside 32GB. Staying at 32GB is a deliberate call: memory pricing moved against the build, and the next dollar buys more program value in storage than in headroom.
{{< /spec >}}

{{< spec role="Storage" title="NVMe and Expansion" rows="Boot and VMs: 1TB Seagate FireCuda 530 NVMe | State: in service, near capacity | Next: second NVMe or 2TB SATA SSD" tags="ZFS, Capacity" >}}
The expansion is required before the Phase 1 workloads land. Bulk hard drives and an HBA are deferred on purpose: slot count, not budget, is the constraint.
{{< /spec >}}

{{< spec role="Network" title="Quad-Port Intel I350" rows="Vendor: NICGIGA | Ports: Four gigabit, plus the onboard NIC | State: planned" tags="Bridges, Segmentation" >}}
Separate ports mean the segments are split at the NIC rather than only in software, with the onboard NIC kept for management.
{{< /spec >}}

{{< spec role="Access" title="Out-of-Band Management" rows="Device: Sipeed NanoKVM-PCIe (Basic) | Function: Remote KVM over IP | State: planned" tags="Remote Console, Recovery" >}}
Console access that survives the host being unreachable. The point of a lab is breaking things on purpose, which means needing a way back in that does not depend on whatever just broke.
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

Traffic is split across isolated Proxmox bridges, with OPNsense as the only path between them. Segmentation is built and verified before the first scan runs, because Phase 1 deliberately hosts vulnerable systems.

{{< network-diagram >}}

| Segment | Purpose | Uplink | Phase |
|---|---|---|---|
| Management | Hypervisor, remote console, documentation, backups | Onboard NIC | 1 |
| Lab | Services, dashboards, and scanners | Intel I350 | 1 |
| Target | Deliberately unpatched hosts for scanning and remediation | None | 1 |
| Attack | Attacker hosts for the validation range | None | 2 |
| Detonation | Untrusted samples and range hosts | None | 2 |

Scanners reach only the hosts that OPNsense rules explicitly allow. Nothing scans outside the lab and my own cloud project.

## Phase 1 Software

### Foundation

| Layer | Tool | Role |
|---|---|---|
| Hypervisor | Proxmox VE 9.2 with ZFS | Virtualization and storage |
| Firewall | OPNsense | Routing, segmentation, rule enforcement |
| Backup | Proxmox Backup Server, plus an off-box copy | Restore points before every remediation, so configs and documentation survive a dead host |
| Remote access | Tailscale or WireGuard | Access from outside without exposing anything |
| Power | NUT | Graceful shutdown on UPS events |
| Configuration | Ansible | Builds, hardening, and remediation |
| Documentation | BookStack or Wiki.js | Runbooks and change records |
| Monitoring | Prometheus and Grafana | Infrastructure health and program dashboards |

### Vulnerability management

| Function | Tool | Why it is here |
|---|---|---|
| Asset inventory | NetBox | You cannot manage what you have not counted |
| Network scanning | Greenbone (OpenVAS) | Open-source scanner, full coverage of the target segment, credentialed and unauthenticated |
| Network scanning | Nessus Essentials Plus | The commercial scanner most employers run, 20 IP limit, credentialed |
| Network scanning | Qualys Community Edition | Second enterprise platform, with configuration assessment and one web app |
| Container scanning | Trivy | Image and dependency findings |
| Cloud | GCP free-tier project | Cloud findings alongside on-prem |
| Findings management | DefectDojo | System of record: ownership, status, SLAs, deduplication |
| Prioritization | CISA KEV and FIRST EPSS feeds | Rank by real-world exploitation, not CVSS alone |
| Workflow | Ticket queue with change records | Findings become owned, scheduled work |
| Remediation | Ansible | Repeatable, documented fixes |
| Reporting | Grafana | Open findings by severity, time to remediate |

### Program documents

A tool stack is not a program. Phase 1 also produces the documents a real program runs on.

- **Vulnerability management standard:** remediation SLAs by severity, scan cadence, and scope.
- **Exception process:** how risk is accepted, by whom, and for how long.
- **False-positive procedure:** how a finding is validated before it is suppressed.

{{< vm-loop >}}

The loop matters more than any single tool. A finding is closed when a rescan proves it, not when a ticket says so.

## Phase 2 {.h-minor}

Phase 2 exists to support offensive practice, not to build a security operations center.

| Function | Tool | Role |
|---|---|---|
| Attack range | Ludus with GOAD-Light | Multi-domain Active Directory range |
| Endpoint telemetry | Sysmon | What each technique leaves on the host |
| Collection | Wazuh | Central view of range telemetry |
| Local AI | Ollama with Open WebUI | Local inference for lab tooling |

Every Phase 2 writeup pairs an attack with the evidence it left behind.

## Operating Constraints {.h-minor}

- 32GB cannot run the Phase 2 range and the full Phase 1 stack at the same time. Workloads are scheduled, not stacked.
- No inbound port forwards. The lab is never reachable from the internet.
- Offensive tooling is only pointed at systems I own or am explicitly authorized to test.
- No addresses, hostnames, or topology specifics are published here. That is deliberate.

<!--
## Changelog {.h-minor}

- **17 September 2026:** Restructured into two phases. Vulnerability management is Phase 1, with detection and the attack range moved to Phase 2. Added the storage expansion requirement, the target segment, scanner scoping rules, credentialed scanning, cloud scope, ticket workflow, program documents, off-box backups, and remote access.
- **20 September 2026:** Scanner stack set to Greenbone, Nessus Essentials Plus, and Qualys Community Edition. -->

{{< wip title="Still cooking" >}}
Phase 1 is being built and documented as it lands, with sanitized configs and playbooks published alongside on [GitHub](https://github.com/labwithchristian).

Check the [Writeups]({{< ref "writeups" >}}) section for the pieces that are done.
{{< /wip >}}
