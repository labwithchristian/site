---
title: "Homelab"
description: "The maintained reference for the lab: hardware, network design, and service layout."
showDate: false
showAuthor: false
showReadingTime: false
showTableOfContents: true
showWordCount: false
---

A living reference, not a dated post. The lab exists to keep the hands-on side current: segmentation designed like production, telemetry that actually lands somewhere, and detections written against behavior rather than signatures. This page changes as the build does.

## Build Status

{{< pipeline items="Host and hypervisor :: In progress :: Converting the desktop to a Proxmox host, parts sourced | Network segmentation :: Ongoing :: Management, services and detonation VLANs with policy between them | Telemetry and detection :: Queued :: Log pipeline first, then detection rules mapped to MITRE ATT&CK" >}}

## Hardware

{{< xp >}}

{{< xpitem year="Host" role="Proxmox Hypervisor" company="Ryzen 9 5900X, 12C/24T" location="64GB DDR4-3200" tags="Proxmox, KVM, Virtualization" >}}
A repurposed desktop rather than a used enterprise server. Gigabyte B550 AORUS ELITE V2 board, EVGA SuperNOVA G3 1000W supply. Enough cores and memory to run a segmented lab without a second box or a rack in the garage.
{{< /xpitem >}}

{{< xpitem year="Network" role="Quad-Port Intel I350" company="NICGIGA" location="Four gigabit ports" tags="VLANs, Trunking, Segmentation" >}}
Four ports means real segmentation instead of everything sharing one interface. Management, services, and the detonation network stay separate at the NIC rather than only in software.
{{< /xpitem >}}

{{< xpitem year="Access" role="Out-of-Band Management" company="Sipeed NanoKVM-PCIe" location="Remote KVM over IP" tags="Remote Console, Recovery" >}}
Console access that survives the host being unreachable. The point of a lab is breaking things on purpose, which means needing a way back in that does not depend on whatever just broke.
{{< /xpitem >}}

{{< xpitem year="Power" role="1000VA LiFePO4 UPS" company="GoldenMate" location="600W output" tags="Runtime, Graceful Shutdown" >}}
Lithium iron phosphate rather than sealed lead acid, for the cycle life and the absence of a replacement schedule. Sized for graceful shutdown, not for riding out an outage.
{{< /xpitem >}}

{{< /xp >}}

The GPU is still open: an RTX 3080 already on hand against an RTX 3060 12GB for lower idle draw, with local model work and hashcat on the other side of that tradeoff.

## Network Design

Three segments, with policy between them rather than a flat network and good intentions.

{{< network-diagram >}}

Management carries the hypervisor and out-of-band access. Services carries the things meant to stay up. The detonation segment is where anything untrusted runs, and it does not get to talk to the other two.

## Planned Services

The stack the lab is being built to support, and what each piece is there to prove.

| Guest | Role | Why it is here |
|---|---|---|
| Wazuh | SIEM and endpoint telemetry | Detection engineering against real host data |
| Grafana + Prometheus | Metrics and dashboards | Observability that predates the incident |
| OpenVAS / Greenbone | Vulnerability scanning | Assessment, then the harder half: remediation tracking |
| Ansible | Configuration management | Rebuilds that are repeatable rather than remembered |
| Documentation wiki | Runbooks and architecture | The artifact that outlives the lab |

{{< wip title="Still cooking" >}}
Resource allocation, backup targets, and the writeups that come out of each milestone are not finished yet. Everything above gets documented as it lands, with sanitized configs and playbooks published alongside on [GitHub](https://github.com/labwithchristian).

Check the [Writeups]({{< ref "writeups" >}}) section for the pieces that are done.
{{< /wip >}}
