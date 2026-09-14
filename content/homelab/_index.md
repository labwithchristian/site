---
title: "Homelab"
description: "The maintained reference for the lab: hardware, network design, and service layout."
showDate: false
showAuthor: true
showReadingTime: false
showTableOfContents: true
showWordCount: false
---

{{< lead >}}
A living reference, not a dated post. This page changes as the lab does.
{{< /lead >}}

## Hardware

| Component | Spec |
|---|---|
| Host | Ryzen 9 5900X, 12C/24T |
| Board | Gigabyte B550 AORUS ELITE V2 |
| Memory | 64GB DDR4-3200 |
| PSU | EVGA SuperNOVA G3 1000W |
| GPU | _pending: RTX 3080 vs RTX 3060 12GB_ |
| NIC | NICGIGA quad-port Intel I350 |
| Out-of-band | Sipeed NanoKVM-PCIe |
| Power | GoldenMate 1000VA LiFePO4 |

## Network design

{{< mermaid >}}
flowchart LR
  WAN((Internet)) --> RTR[Router / Firewall]
  RTR --> MGMT[Management VLAN]
  RTR --> SVC[Services VLAN]
  RTR --> LAB[Lab / Detonation VLAN]
  MGMT --> PVE[Proxmox Host]
  SVC --> PVE
  LAB --> PVE
{{< /mermaid >}}

## Services

_Pending: final vCPU and memory allocation per guest, carried over from the build plan._

| Guest | Role | vCPU | RAM |
|---|---|---|---|
| | | | |

## Backup

_Pending: Proxmox Backup Server target._
